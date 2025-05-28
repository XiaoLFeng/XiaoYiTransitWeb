import { useState, useEffect } from 'react';
import { 
    CreateStationAPI, 
    UpdateStationAPI, 
    DeleteStationAPI, 
    GetStationDetailAPI, 
    GetStationListAPI
} from '../../apis/station_api';
import type { 
    CreateStationDTO, 
    UpdateStationDTO, 
    GetStationListQueryDTO 
} from '../../models/dto/station_dto';
import type { 
    StationDetailEntity, 
    StationListItemEntity
} from '../../models/entity/station_entity';

// 导入组件
import { StationSearchForm } from '../../components/admin/station/station_search_form';
import { StationTable } from '../../components/admin/station/station_table';
import { StationCreateModal } from '../../components/admin/station/station_create_modal';
import { StationEditModal } from '../../components/admin/station/station_edit_modal';
import { StationDetailModal } from '../../components/admin/station/station_detail_modal';

/**
 * # 站点管理页面
 * 管理站点信息的主页面，负责状态管理和API调用
 */
export function AdminStationManage() {
    // 状态管理
    const [stations, setStations] = useState<StationListItemEntity[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<GetStationListQueryDTO>({});
    
    // 模态框状态
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    // 当前操作的站点
    const [currentStation, setCurrentStation] = useState<StationDetailEntity | null>(null);
    
    // 表单数据
    const [formData, setFormData] = useState<CreateStationDTO>({
        name: '',
        code: '',
        address: '',
        longitude: 0,
        latitude: 0,
        status: 1 // 默认启用
    });

    /**
     * 获取站点列表
     */
    const fetchStations = async () => {
        setLoading(true);
        try {
            const params: GetStationListQueryDTO = {
                page: currentPage,
                size: pageSize,
                ...searchParams
            };
            
            console.log('🔍 获取站点列表 - 参数:', params);
            const response = await GetStationListAPI(params);
            console.log('📋 站点列表响应:', response);
            
            if (response?.code === 200) {
                const stationList = response.data?.stations || [];
                const totalCount = response.data?.total || 0;
                
                console.log(`✅ 获取到 ${stationList.length} 条站点记录，总计 ${totalCount} 条`);
                setStations(stationList);
                setTotal(totalCount);
            } else {
                console.error('❌ 获取站点列表失败:', response?.message);
                alert(`获取站点列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取站点列表异常:', error);
            alert('获取站点列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 创建站点
     */
    const handleCreate = async () => {
        try {
            const response = await CreateStationAPI(formData);
            if (response?.code === 200) {
                setShowCreateModal(false);
                fetchStations();
                resetFormData();
                alert('站点创建成功！');
            } else {
                alert(`创建失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('创建站点错误:', error);
            alert('创建失败，请稍后重试');
        }
    };

    /**
     * 更新站点
     */
    const handleUpdate = async () => {
        if (!currentStation) return;
        
        try {
            const updateData: UpdateStationDTO = {
                station_uuid: currentStation.station_uuid,
                ...formData
            };
            
            const response = await UpdateStationAPI(updateData);
            if (response?.code === 200) {
                setShowEditModal(false);
                fetchStations();
                resetFormData();
                setCurrentStation(null);
                alert('站点信息更新成功！');
            } else {
                alert(`更新失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('更新站点错误:', error);
            alert('更新失败，请稍后重试');
        }
    };

    /**
     * 删除站点
     */
    const handleDelete = async (stationUuid: string, stationName: string) => {
        if (!confirm(`确定要删除站点 ${stationName} 吗？此操作无法撤销。`)) {
            return;
        }
        
        try {
            const response = await DeleteStationAPI({ station_uuid: stationUuid });
            if (response?.code === 200) {
                fetchStations();
                alert('站点删除成功！');
            } else {
                alert(`删除失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('删除站点错误:', error);
            alert('删除失败，请稍后重试');
        }
    };

    /**
     * 查看站点详情
     */
    const handleViewDetail = async (stationUuid: string) => {
        try {
            const response = await GetStationDetailAPI({ station_uuid: stationUuid });
            if (response?.code === 200) {
                setCurrentStation(response.data || null);
                setShowDetailModal(true);
            } else {
                alert(`获取详情失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取站点详情错误:', error);
            alert('获取详情失败，请稍后重试');
        }
    };

    /**
     * 编辑站点
     */
    const handleEdit = (station: StationListItemEntity) => {
        setFormData({
            name: station.name,
            code: station.code,
            address: station.address,
            longitude: station.longitude,
            latitude: station.latitude,
            status: station.status as 0 | 1
        });
        setCurrentStation(station);
        setShowEditModal(true);
    };

    /**
     * 重置表单数据
     */
    const resetFormData = () => {
        setFormData({
            name: '',
            code: '',
            address: '',
            longitude: 0,
            latitude: 0,
            status: 1
        });
    };

    /**
     * 搜索处理
     */
    const handleSearch = (params: GetStationListQueryDTO) => {
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
        fetchStations();
    }, [currentPage, pageSize, searchParams]);

    return (
        <div className="space-y-6">
            {/* 页面标题和操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">站点管理</h1>
                    <p className="text-base-content/60 mt-1">管理公交站点信息、查看位置分布</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetFormData();
                        setShowCreateModal(true);
                    }}
                >
                    <span className="text-lg mr-2">🚏</span>
                    添加站点
                </button>
            </div>

            {/* 搜索表单 */}
            <StationSearchForm
                onSearch={handleSearch}
                onReset={handleResetSearch}
                initialParams={searchParams}
            />

            {/* 站点列表表格 */}
            <StationTable
                stations={stations}
                total={total}
                currentPage={currentPage}
                pageSize={pageSize}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetail={handleViewDetail}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />

            {/* 创建站点模态框 */}
            {showCreateModal && (
                <StationCreateModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleCreate}
                    onCancel={() => {
                        setShowCreateModal(false);
                        resetFormData();
                    }}
                />
            )}

            {/* 编辑站点模态框 */}
            {showEditModal && currentStation && (
                <StationEditModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleUpdate}
                    onCancel={() => {
                        setShowEditModal(false);
                        setCurrentStation(null);
                        resetFormData();
                    }}
                />
            )}

            {/* 站点详情模态框 */}
            {showDetailModal && currentStation && (
                <StationDetailModal
                    station={currentStation}
                    onClose={() => {
                        setShowDetailModal(false);
                        setCurrentStation(null);
                    }}
                />
            )}
        </div>
    );
} 