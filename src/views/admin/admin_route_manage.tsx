import { useState, useEffect } from 'react';
import { 
    CreateRouteAPI, 
    UpdateRouteAPI, 
    DeleteRouteAPI, 
    GetRouteDetailAPI, 
    GetRouteListAPI,
    GetRouteStationsAPI
} from '../../apis/route_api';
import type { 
    CreateRouteDTO, 
    UpdateRouteDTO, 
    GetRouteListQueryDTO 
} from '../../models/dto/route_dto';
import type { 
    RouteDetailEntity, 
    RouteListItemEntity,
    RouteStationsEntity
} from '../../models/entity/route_entity';

// 导入组件
import { RouteSearchForm } from '../../components/admin/route/route_search_form';
import { RouteTable } from '../../components/admin/route/route_table';
import { RouteCreateModal } from '../../components/admin/route/route_create_modal';
import { RouteEditModal } from '../../components/admin/route/route_edit_modal';
import { RouteDetailModal } from '../../components/admin/route/route_detail_modal';
import { RouteStationsModal } from '../../components/admin/route/route_stations_modal';

/**
 * # 线路管理页面
 * 管理线路信息的主页面，负责状态管理和API调用
 */
export function AdminRouteManage() {
    // 状态管理
    const [routes, setRoutes] = useState<RouteListItemEntity[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<GetRouteListQueryDTO>({});
    
    // 模态框状态
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showStationsModal, setShowStationsModal] = useState(false);
    
    // 当前操作的线路
    const [currentRoute, setCurrentRoute] = useState<RouteDetailEntity | null>(null);
    const [currentRouteStations, setCurrentRouteStations] = useState<RouteStationsEntity | null>(null);
    
    // 表单数据
    const [formData, setFormData] = useState<CreateRouteDTO>({
        route_number: '',
        name: '',
        start_station: '',
        end_station: '',
        distance: 0,
        fare: 2.0,
        operation_hours: '',
        frequency: '',
        status: 1,
        notes: ''
    });

    /**
     * 获取线路列表
     */
    const fetchRoutes = async () => {
        setLoading(true);
        try {
            const params: GetRouteListQueryDTO = {
                page: currentPage,
                size: pageSize,
                ...searchParams
            };
            
            console.log('🔍 获取线路列表 - 参数:', params);
            const response = await GetRouteListAPI(params);
            console.log('📋 线路列表响应:', response);
            
            if (response?.code === 200) {
                const routeList = response.data?.list || [];
                const totalCount = response.data?.total || 0;
                
                console.log(`✅ 获取到 ${routeList.length} 条线路记录，总计 ${totalCount} 条`);
                setRoutes(routeList);
                setTotal(totalCount);
            } else {
                console.error('❌ 获取线路列表失败:', response?.message);
                alert(`获取线路列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取线路列表异常:', error);
            alert('获取线路列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 创建线路
     */
    const handleCreate = async () => {
        try {
            const response = await CreateRouteAPI(formData);
            if (response?.code === 200) {
                setShowCreateModal(false);
                fetchRoutes();
                resetFormData();
                alert('线路创建成功！');
            } else {
                alert(`创建失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('创建线路错误:', error);
            alert('创建失败，请稍后重试');
        }
    };

    /**
     * 更新线路
     */
    const handleUpdate = async () => {
        if (!currentRoute) return;
        
        try {
            const updateData: UpdateRouteDTO = {
                route_uuid: currentRoute.route_uuid,
                ...formData
            };
            
            const response = await UpdateRouteAPI(currentRoute.route_uuid, updateData);
            if (response?.code === 200) {
                setShowEditModal(false);
                fetchRoutes();
                resetFormData();
                setCurrentRoute(null);
                alert('线路信息更新成功！');
            } else {
                alert(`更新失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('更新线路错误:', error);
            alert('更新失败，请稍后重试');
        }
    };

    /**
     * 删除线路
     */
    const handleDelete = async (routeUuid: string, routeName: string) => {
        if (!confirm(`确定要删除线路 ${routeName} 吗？此操作无法撤销。`)) {
            return;
        }
        
        try {
            const response = await DeleteRouteAPI(routeUuid, { route_uuid: routeUuid });
            if (response?.code === 200) {
                fetchRoutes();
                alert('线路删除成功！');
            } else {
                alert(`删除失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('删除线路错误:', error);
            alert('删除失败，请稍后重试');
        }
    };

    /**
     * 查看线路详情
     */
    const handleViewDetail = async (routeUuid: string) => {
        try {
            const response = await GetRouteDetailAPI(routeUuid, { route_uuid: routeUuid });
            if (response?.code === 200) {
                setCurrentRoute(response.data || null);
                setShowDetailModal(true);
            } else {
                alert(`获取详情失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取线路详情错误:', error);
            alert('获取详情失败，请稍后重试');
        }
    };

    /**
     * 查看线路站点
     */
    const handleViewStations = async (routeUuid: string) => {
        try {
            const response = await GetRouteStationsAPI(routeUuid, { route_uuid: routeUuid });
            if (response?.code === 200) {
                setCurrentRouteStations(response.data || null);
                setShowStationsModal(true);
            } else {
                alert(`获取站点信息失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取线路站点错误:', error);
            alert('获取站点信息失败，请稍后重试');
        }
    };

    /**
     * 编辑线路
     */
    const handleEdit = (route: RouteListItemEntity) => {
        handleViewDetailForEdit(route.route_uuid);
    };

    /**
     * 获取线路详情用于编辑
     */
    const handleViewDetailForEdit = async (routeUuid: string) => {
        try {
            console.log('🚀 获取线路详情 - UUID:', routeUuid);
            const response = await GetRouteDetailAPI(routeUuid, { route_uuid: routeUuid });
            console.log('📡 API响应:', response);
            
            if (response?.code === 200) {
                const routeDetail = response.data;
                console.log('🚌 线路详情数据:', routeDetail);
                
                if (routeDetail) {
                    setCurrentRoute(routeDetail);
                    
                    // 准备表单数据，确保所有必填字段都有值
                    const formDataToSet: CreateRouteDTO = {
                        route_number: routeDetail.route_number || '',
                        name: routeDetail.name || '',
                        start_station: routeDetail.start_station || '',
                        end_station: routeDetail.end_station || '',
                        distance: routeDetail.distance || 0,
                        fare: routeDetail.fare || 2.0,
                        operation_hours: routeDetail.operation_hours || '',
                        frequency: routeDetail.frequency || '',
                        status: routeDetail.status ?? 1,
                        notes: routeDetail.notes || ''
                    };
                    
                    console.log('📝 设置表单数据:', formDataToSet);
                    setFormData(formDataToSet);
                    setShowEditModal(true);
                } else {
                    console.error('❌ 线路详情数据为空');
                    alert('获取线路详情失败：数据为空');
                }
            } else {
                console.error('❌ API响应错误:', response);
                alert(`获取详情失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取线路详情异常:', error);
            alert('获取详情失败，请稍后重试。详情请查看控制台');
        }
    };

    /**
     * 重置表单数据
     */
    const resetFormData = () => {
        setFormData({
            route_number: '',
            name: '',
            start_station: '',
            end_station: '',
            distance: 0,
            fare: 2.0,
            operation_hours: '',
            frequency: '',
            status: 1,
            notes: ''
        });
    };

    /**
     * 搜索处理
     */
    const handleSearch = (params: GetRouteListQueryDTO) => {
        setSearchParams(params);
        setCurrentPage(1);
    };

    /**
     * 重置搜索
     */
    const handleResetSearch = () => {
        setSearchParams({});
        setCurrentPage(1);
    };

    /**
     * 分页处理
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    // 组件挂载时获取数据
    useEffect(() => {
        fetchRoutes();
    }, [currentPage, pageSize, searchParams]);

    return (
        <div className="space-y-6">
            {/* 页面标题和操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">线路管理</h1>
                    <p className="text-base-content/60 mt-1">管理线路信息、查看站点分布</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetFormData();
                        setShowCreateModal(true);
                    }}
                >
                    <span className="text-lg mr-2">🚌</span>
                    添加线路
                </button>
            </div>

            {/* 搜索表单 */}
            <RouteSearchForm
                onSearch={handleSearch}
                onReset={handleResetSearch}
                initialParams={searchParams}
            />

            {/* 线路列表表格 */}
            <RouteTable
                routes={routes}
                total={total}
                currentPage={currentPage}
                pageSize={pageSize}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetail={handleViewDetail}
                onViewStations={handleViewStations}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />

            {/* 创建线路模态框 */}
            {showCreateModal && (
                <RouteCreateModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleCreate}
                    onCancel={() => {
                        setShowCreateModal(false);
                        resetFormData();
                    }}
                />
            )}

            {/* 编辑线路模态框 */}
            {showEditModal && currentRoute && (
                <RouteEditModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleUpdate}
                    onCancel={() => {
                        setShowEditModal(false);
                        setCurrentRoute(null);
                        resetFormData();
                    }}
                />
            )}

            {/* 线路详情模态框 */}
            {showDetailModal && currentRoute && (
                <RouteDetailModal
                    route={currentRoute}
                    onClose={() => {
                        setShowDetailModal(false);
                        setCurrentRoute(null);
                    }}
                />
            )}

            {/* 线路站点模态框 */}
            {showStationsModal && currentRouteStations && (
                <RouteStationsModal
                    routeStations={currentRouteStations}
                    onClose={() => {
                        setShowStationsModal(false);
                        setCurrentRouteStations(null);
                    }}
                />
            )}
        </div>
    );
} 