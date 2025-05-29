import { useState, useEffect } from 'react';
import { 
    CreateMaintenanceAPI, 
    UpdateMaintenanceAPI, 
    DeleteMaintenanceAPI, 
    GetMaintenanceDetailAPI, 
    GetMaintenanceListAPI 
} from '../../apis/maintenance_api';
import { GetVehicleSimpleListAPI } from '../../apis/vehicle_api';
import type { 
    CreateMaintenanceDTO, 
    UpdateMaintenanceDTO, 
    GetMaintenanceListQueryDTO 
} from '../../models/dto/maintenance_dto';
import type { 
    MaintenanceDetailEntity, 
    MaintenanceListItemEntity 
} from '../../models/entity/maintenance_entity';
import type { SimpleVehicleListEntity } from '../../models/entity/vehicle_entity';
import { MaintenanceCreateModal } from '../../components/admin/maintenance/maintenance_create_modal';
import { MaintenanceEditModal } from '../../components/admin/maintenance/maintenance_edit_modal';
import { MaintenanceDetailModal } from '../../components/admin/maintenance/maintenance_detail_modal';

/**
 * # 维修管理页面
 * 管理维修记录信息的主页面，负责状态管理和API调用
 */
export function AdminMaintenanceManage() {
    // 状态管理
    const [maintenances, setMaintenances] = useState<MaintenanceListItemEntity[]>([]);
    const [vehicles, setVehicles] = useState<SimpleVehicleListEntity | null>(null);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<GetMaintenanceListQueryDTO>({});
    
    // 模态框状态
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    // 当前操作的维修记录
    const [currentMaintenance, setCurrentMaintenance] = useState<MaintenanceDetailEntity | null>(null);
    
    // 表单数据
    const [formData, setFormData] = useState<CreateMaintenanceDTO>({
        vehicle_uuid: '',
        maintenance_type: 1,
        description: '',
        maintenance_date: '',
        completion_date: '',
        cost: 0,
        mileage: 0,
        maintenance_location: '',
        maintenance_staff: '',
        parts_replaced: '',
        status: 1,
        notes: ''
    });

    /**
     * 获取车辆简单列表
     */
    const fetchVehicles = async () => {
        try {
            const response = await GetVehicleSimpleListAPI();
            if (response?.code === 200) {
                setVehicles(response.data || null);
            }
        } catch (error) {
            console.error('获取车辆列表失败:', error);
        }
    };

    /**
     * 获取维修记录列表
     */
    const fetchMaintenances = async () => {
        setLoading(true);
        try {
            const params: GetMaintenanceListQueryDTO = {
                page: currentPage,
                size: pageSize,
                ...searchParams
            };
            
            console.log('🔍 获取维修记录列表 - 参数:', params);
            const response = await GetMaintenanceListAPI(params);
            console.log('📋 维修记录列表响应:', response);
            
            if (response?.code === 200) {
                const maintenanceList = response.data?.list || [];
                const totalCount = response.data?.total || 0;
                
                console.log(`✅ 获取到 ${maintenanceList.length} 条维修记录，总计 ${totalCount} 条`);
                setMaintenances(maintenanceList);
                setTotal(totalCount);
            } else {
                console.error('❌ 获取维修记录列表失败:', response?.message);
                alert(`获取维修记录列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取维修记录列表异常:', error);
            alert('获取维修记录列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 创建维修记录
     */
    const handleCreate = async () => {
        try {
            const response = await CreateMaintenanceAPI(formData);
            if (response?.code === 200) {
                setShowCreateModal(false);
                fetchMaintenances();
                resetFormData();
                alert('维修记录创建成功！');
            } else {
                alert(`创建失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('创建维修记录错误:', error);
            alert('创建失败，请稍后重试');
        }
    };

    /**
     * 更新维修记录
     */
    const handleUpdate = async () => {
        if (!currentMaintenance) return;
        
        try {
            const updateData: UpdateMaintenanceDTO = {
                ...formData
            };
            
            const response = await UpdateMaintenanceAPI(currentMaintenance.maintenance_uuid, updateData);
            if (response?.code === 200) {
                setShowEditModal(false);
                fetchMaintenances();
                resetFormData();
                setCurrentMaintenance(null);
                alert('维修记录更新成功！');
            } else {
                alert(`更新失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('更新维修记录错误:', error);
            alert('更新失败，请稍后重试');
        }
    };

    /**
     * 删除维修记录
     */
    const handleDelete = async (maintenanceUuid: string, description: string) => {
        if (!confirm(`确定要删除维修记录"${description}"吗？此操作无法撤销。`)) {
            return;
        }
        
        try {
            const response = await DeleteMaintenanceAPI(maintenanceUuid);
            if (response?.code === 200) {
                fetchMaintenances();
                alert('维修记录删除成功！');
            } else {
                alert(`删除失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('删除维修记录错误:', error);
            alert('删除失败，请稍后重试');
        }
    };

    /**
     * 查看维修记录详情
     */
    const handleViewDetail = async (maintenanceUuid: string) => {
        try {
            const response = await GetMaintenanceDetailAPI(maintenanceUuid);
            if (response?.code === 200) {
                setCurrentMaintenance(response.data || null);
                setShowDetailModal(true);
            } else {
                alert(`获取详情失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取维修记录详情错误:', error);
            alert('获取详情失败，请稍后重试');
        }
    };

    /**
     * 编辑维修记录
     */
    const handleEdit = async (maintenanceUuid: string) => {
        try {
            const response = await GetMaintenanceDetailAPI(maintenanceUuid);
            if (response?.code === 200) {
                const maintenanceDetail = response.data;
                if (maintenanceDetail) {
                    setCurrentMaintenance(maintenanceDetail);
                    
                    const formDataToSet: CreateMaintenanceDTO = {
                        vehicle_uuid: maintenanceDetail.vehicle_uuid || '',
                        maintenance_type: maintenanceDetail.maintenance_type as 1 | 2 | 3 | 4,
                        description: maintenanceDetail.description || '',
                        maintenance_date: maintenanceDetail.maintenance_date || '',
                        completion_date: maintenanceDetail.completion_date || '',
                        cost: maintenanceDetail.cost || 0,
                        mileage: maintenanceDetail.mileage || 0,
                        maintenance_location: maintenanceDetail.maintenance_location || '',
                        maintenance_staff: maintenanceDetail.maintenance_staff || '',
                        parts_replaced: maintenanceDetail.parts_replaced || '',
                        status: maintenanceDetail.status as 0 | 1 | 2 | 3,
                        notes: maintenanceDetail.notes || ''
                    };
                    
                    setFormData(formDataToSet);
                    setShowEditModal(true);
                }
            } else {
                alert(`获取详情失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取维修记录详情错误:', error);
            alert('获取详情失败，请稍后重试');
        }
    };

    /**
     * 重置表单数据
     */
    const resetFormData = () => {
        setFormData({
            vehicle_uuid: '',
            maintenance_type: 1,
            description: '',
            maintenance_date: '',
            completion_date: '',
            cost: 0,
            mileage: 0,
            maintenance_location: '',
            maintenance_staff: '',
            parts_replaced: '',
            status: 1,
            notes: ''
        });
    };

    /**
     * 搜索处理
     */
    const handleSearch = (params: GetMaintenanceListQueryDTO) => {
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
        fetchVehicles();
    }, []);

    useEffect(() => {
        fetchMaintenances();
    }, [currentPage, pageSize, searchParams]);

    return (
        <div className="space-y-6">
            {/* 页面标题和操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">维修管理</h1>
                    <p className="text-base-content/60 mt-1">管理车辆维修记录、查看维修状态</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetFormData();
                        setShowCreateModal(true);
                    }}
                >
                    <span className="text-lg mr-2">🔧</span>
                    添加维修记录
                </button>
            </div>

            {/* 搜索表单 */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title text-lg mb-4">
                        <span className="text-primary">🔍</span>
                        搜索维修记录
                    </h3>
                    
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* 车辆选择 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">选择车辆</span>
                                </label>
                                <select 
                                    className="select select-bordered w-full"
                                    value={searchParams.vehicle_uuid || ''}
                                    onChange={(e) => handleSearch({...searchParams, vehicle_uuid: e.target.value || undefined})}
                                >
                                    <option value="">全部车辆</option>
                                    {vehicles?.list?.map((vehicle) => (
                                        <option key={vehicle.vehicle_uuid} value={vehicle.vehicle_uuid}>
                                            {vehicle.plate_number} - {vehicle.model}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* 维修类型 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">维修类型</span>
                                </label>
                                <select 
                                    className="select select-bordered w-full"
                                    value={searchParams.maintenance_type || 0}
                                    onChange={(e) => handleSearch({...searchParams, maintenance_type: Number(e.target.value) || undefined})}
                                >
                                    <option value={0}>全部类型</option>
                                    <option value={1}>常规保养</option>
                                    <option value={2}>故障维修</option>
                                    <option value={3}>事故维修</option>
                                    <option value={4}>年检维修</option>
                                </select>
                            </div>
                            
                            {/* 状态筛选 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">维修状态</span>
                                </label>
                                <select 
                                    className="select select-bordered w-full"
                                    value={searchParams.status || 0}
                                    onChange={(e) => handleSearch({...searchParams, status: Number(e.target.value) || undefined})}
                                >
                                    <option value={0}>全部状态</option>
                                    <option value={1}>待维修</option>
                                    <option value={2}>维修中</option>
                                    <option value={3}>已完成</option>
                                </select>
                            </div>
                            
                            {/* 操作按钮 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">&nbsp;</span>
                                </label>
                                <div className="flex gap-2">
                                    <button 
                                        type="button" 
                                        className="btn btn-outline flex-1"
                                        onClick={handleResetSearch}
                                    >
                                        <span className="text-sm">🔄</span>
                                        重置
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* 维修记录列表表格 */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="card-title text-lg">
                            <span className="text-primary">📋</span>
                            维修记录列表
                        </h3>
                        <div className="text-sm text-base-content/60">
                            共 {total} 条记录
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="text-center">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                                <p className="mt-4 text-base-content/70">正在加载维修记录...</p>
                            </div>
                        </div>
                    ) : maintenances.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-lg font-medium mb-2">暂无维修记录</h3>
                            <p className="text-base-content/60 mb-4">还没有任何维修记录，点击上方按钮添加第一条记录</p>
                            <button 
                                className="btn btn-primary"
                                onClick={() => {
                                    resetFormData();
                                    setShowCreateModal(true);
                                }}
                            >
                                <span className="mr-2">🔧</span>
                                添加维修记录
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr className="bg-base-200">
                                        <th className="font-semibold">车牌号</th>
                                        <th className="font-semibold">维修类型</th>
                                        <th className="font-semibold">维修描述</th>
                                        <th className="font-semibold">维修日期</th>
                                        <th className="font-semibold">状态</th>
                                        <th className="font-semibold">费用</th>
                                        <th className="font-semibold text-center">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maintenances.map((maintenance) => (
                                        <tr key={maintenance.maintenance_uuid} className="hover">
                                            <td>
                                                <div className="font-medium text-primary">
                                                    {maintenance.plate_number}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${
                                                    maintenance.maintenance_type === 1 ? 'badge-info' :
                                                    maintenance.maintenance_type === 2 ? 'badge-warning' :
                                                    maintenance.maintenance_type === 3 ? 'badge-error' :
                                                    'badge-accent'
                                                }`}>
                                                    {maintenance.maintenance_type_name}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="max-w-xs truncate" title={maintenance.description}>
                                                    {maintenance.description}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-sm">
                                                    {new Date(maintenance.maintenance_date).toLocaleDateString('zh-CN')}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${
                                                    maintenance.status === 3 ? 'badge-success' :
                                                    maintenance.status === 2 ? 'badge-warning' :
                                                    maintenance.status === 1 ? 'badge-info' :
                                                    'badge-error'
                                                }`}>
                                                    {maintenance.status_name}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="font-medium text-green-600">
                                                    ¥{maintenance.cost?.toFixed(2) || '0.00'}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-center gap-1">
                                                    <div className="tooltip" data-tip="查看详情">
                                                        <button 
                                                            className="btn btn-ghost btn-xs text-info"
                                                            onClick={() => handleViewDetail(maintenance.maintenance_uuid)}
                                                        >
                                                            👁️
                                                        </button>
                                                    </div>
                                                    <div className="tooltip" data-tip="编辑记录">
                                                        <button 
                                                            className="btn btn-ghost btn-xs text-warning"
                                                            onClick={() => handleEdit(maintenance.maintenance_uuid)}
                                                        >
                                                            ✏️
                                                        </button>
                                                    </div>
                                                    <div className="tooltip" data-tip="删除记录">
                                                        <button 
                                                            className="btn btn-ghost btn-xs text-error"
                                                            onClick={() => handleDelete(maintenance.maintenance_uuid, maintenance.description)}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {/* 分页控制 */}
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-base-300">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-base-content/70">每页显示:</span>
                                    <select 
                                        className="select select-bordered select-sm w-20"
                                        value={pageSize}
                                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                    <span className="text-sm text-base-content/70">条记录</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-base-content/70">
                                        第 {currentPage} / {Math.ceil(total / pageSize)} 页，共 {total} 条记录
                                    </span>
                                </div>
                                
                                <div className="join">
                                    <button 
                                        className="join-item btn btn-sm"
                                        disabled={currentPage <= 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <span className="text-sm">«</span>
                                    </button>
                                    <button className="join-item btn btn-sm btn-active">
                                        {currentPage}
                                    </button>
                                    <button 
                                        className="join-item btn btn-sm"
                                        disabled={currentPage >= Math.ceil(total / pageSize)}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <span className="text-sm">»</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 创建维修记录模态框 */}
            {showCreateModal && (
                <MaintenanceCreateModal
                    formData={formData}
                    setFormData={setFormData}
                    vehicles={vehicles}
                    onConfirm={handleCreate}
                    onCancel={() => setShowCreateModal(false)}
                />
            )}
            
            {/* 编辑维修记录模态框 */}
            {showEditModal && currentMaintenance && (
                <MaintenanceEditModal
                    formData={formData}
                    setFormData={setFormData}
                    vehicles={vehicles}
                    onConfirm={handleUpdate}
                    onCancel={() => setShowEditModal(false)}
                />
            )}

            {/* 维修记录详情模态框 */}
            {showDetailModal && currentMaintenance && (
                <MaintenanceDetailModal
                    maintenance={currentMaintenance}
                    onClose={() => setShowDetailModal(false)}
                />
            )}
        </div>
    );
} 