import { useState, useEffect } from 'react';
import { 
    CreateVehicleAPI, 
    UpdateVehicleAPI, 
    DeleteVehicleAPI, 
    GetVehicleDetailAPI, 
    GetVehicleListAPI 
} from '../../apis/vehicle_api';
import { VehicleStatus } from '../../models/dto/vehicle_dto';
import type { 
    CreateVehicleDTO, 
    UpdateVehicleDTO, 
    GetVehicleListQueryDTO 
} from '../../models/dto/vehicle_dto';
import type { 
    VehicleDetailEntity, 
    VehicleListItemEntity 
} from '../../models/entity/vehicle_entity';

// 导入组件
import { VehicleSearchForm } from '../../components/admin/vehicle/vehicle_search_form';
import { VehicleTable } from '../../components/admin/vehicle/vehicle_table';
import { VehicleCreateModal } from '../../components/admin/vehicle/vehicle_create_modal';
import { VehicleEditModal } from '../../components/admin/vehicle/vehicle_edit_modal';
import { VehicleDetailModal } from '../../components/admin/vehicle/vehicle_detail_modal';

/**
 * # 车辆管理页面
 * 管理车辆信息的主页面，负责状态管理和API调用
 */
export function AdminVehicleManage() {
    // 状态管理
    const [vehicles, setVehicles] = useState<VehicleListItemEntity[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<GetVehicleListQueryDTO>({});
    
    // 模态框状态
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    // 当前操作的车辆
    const [currentVehicle, setCurrentVehicle] = useState<VehicleDetailEntity | null>(null);
    
    // 表单数据
    const [formData, setFormData] = useState<CreateVehicleDTO>({
        plate_number: '',
        model: '',
        manufacturer: '',
        manufacture_year: new Date().getFullYear(),
        seats: 40, // 默认公交车座位数
        engine_number: '',
        chassis_number: '',
        purchase_date: '',
        purchase_price: 0,
        status: VehicleStatus.OPERATING,
        notes: ''
    });

    /**
     * 获取车辆列表
     */
    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const params: GetVehicleListQueryDTO = {
                page: currentPage,
                size: pageSize,
                ...searchParams
            };
            
            console.log('🔍 获取车辆列表 - 参数:', params);
            const response = await GetVehicleListAPI(params);
            console.log('📋 车辆列表响应:', response);
            
            if (response?.code === 200) {
                const vehicleList = response.data?.list || [];
                const totalCount = response.data?.total || 0;
                
                console.log(`✅ 获取到 ${vehicleList.length} 条车辆记录，总计 ${totalCount} 条`);
                setVehicles(vehicleList);
                setTotal(totalCount);
            } else {
                console.error('❌ 获取车辆列表失败:', response?.message);
                alert(`获取车辆列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取车辆列表异常:', error);
            alert('获取车辆列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 创建车辆
     */
    const handleCreate = async () => {
        try {
            const response = await CreateVehicleAPI(formData);
            if (response?.code === 200) {
                setShowCreateModal(false);
                fetchVehicles();
                resetFormData();
                alert('车辆创建成功！');
            } else {
                alert(`创建失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('创建车辆错误:', error);
            alert('创建失败，请稍后重试');
        }
    };

    /**
     * 更新车辆
     */
    const handleUpdate = async () => {
        if (!currentVehicle) return;
        
        try {
            const updateData: UpdateVehicleDTO = {
                vehicle_uuid: currentVehicle.vehicle_uuid,
                ...formData
            };
            
            const response = await UpdateVehicleAPI(currentVehicle.vehicle_uuid, updateData);
            if (response?.code === 200) {
                setShowEditModal(false);
                fetchVehicles();
                resetFormData();
                setCurrentVehicle(null);
                alert('车辆信息更新成功！');
            } else {
                alert(`更新失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('更新车辆错误:', error);
            alert('更新失败，请稍后重试');
        }
    };

    /**
     * 删除车辆
     */
    const handleDelete = async (vehicleUuid: string, plateNumber: string) => {
        if (!confirm(`确定要删除车辆 ${plateNumber} 吗？此操作无法撤销。`)) {
            return;
        }
        
        try {
            const response = await DeleteVehicleAPI(vehicleUuid, { vehicle_uuid: vehicleUuid });
            if (response?.code === 200) {
                fetchVehicles();
                alert('车辆删除成功！');
            } else {
                alert(`删除失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('删除车辆错误:', error);
            alert('删除失败，请稍后重试');
        }
    };

    /**
     * 查看车辆详情
     */
    const handleViewDetail = async (vehicleUuid: string) => {
        try {
            const response = await GetVehicleDetailAPI(vehicleUuid, { vehicle_uuid: vehicleUuid });
            if (response?.code === 200) {
                setCurrentVehicle(response.data || null);
                setShowDetailModal(true);
            } else {
                alert(`获取详情失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取车辆详情错误:', error);
            alert('获取详情失败，请稍后重试');
        }
    };

    /**
     * 编辑车辆
     */
    const handleEdit = (vehicle: VehicleListItemEntity) => {
        // 先获取完整的车辆详情
        handleViewDetailForEdit(vehicle.vehicle_uuid);
    };

    /**
     * 获取车辆详情用于编辑
     */
    const handleViewDetailForEdit = async (vehicleUuid: string) => {
        try {
            console.log('🚀 获取车辆详情 - UUID:', vehicleUuid);
            const response = await GetVehicleDetailAPI(vehicleUuid, { vehicle_uuid: vehicleUuid });
            console.log('📡 API响应:', response);
            
            if (response?.code === 200) {
                const vehicleDetail = response.data;
                console.log('🚗 车辆详情数据:', vehicleDetail);
                
                if (vehicleDetail) {
                    setCurrentVehicle(vehicleDetail);
                    
                    // 准备表单数据，确保所有必填字段都有值
                    const formDataToSet = {
                        plate_number: vehicleDetail.plate_number || '',
                        model: vehicleDetail.model || '',
                        manufacturer: vehicleDetail.manufacturer || '',
                        manufacture_year: vehicleDetail.manufacture_year ?? new Date().getFullYear(),
                        seats: vehicleDetail.seats ?? 40,
                        engine_number: vehicleDetail.engine_number || '',
                        chassis_number: vehicleDetail.chassis_number || '',
                        purchase_date: vehicleDetail.purchase_date || '',
                        purchase_price: vehicleDetail.purchase_price ?? 0,
                        status: vehicleDetail.status ?? VehicleStatus.OPERATING,
                        notes: vehicleDetail.notes || ''
                    };
                    
                    console.log('📝 设置表单数据:', formDataToSet);
                    setFormData(formDataToSet);
                    setShowEditModal(true);
                } else {
                    console.error('❌ 车辆详情数据为空');
                    alert('获取车辆详情失败：数据为空');
                }
            } else {
                console.error('❌ API响应错误:', response);
                alert(`获取详情失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取车辆详情异常:', error);
            alert('获取详情失败，请稍后重试。详情请查看控制台');
        }
    };

    /**
     * 重置表单数据
     */
    const resetFormData = () => {
        setFormData({
            plate_number: '',
            model: '',
            manufacturer: '',
            manufacture_year: new Date().getFullYear(),
            seats: 40, // 默认公交车座位数
            engine_number: '',
            chassis_number: '',
            purchase_date: '',
            purchase_price: 0,
            status: VehicleStatus.OPERATING,
            notes: ''
        });
    };

    /**
     * 搜索处理
     */
    const handleSearch = (params: GetVehicleListQueryDTO) => {
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
    }, [currentPage, pageSize, searchParams]);

    return (
        <div className="space-y-6">
            {/* 页面标题和操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">车辆管理</h1>
                    <p className="text-base-content/60 mt-1">管理车辆信息、查看车辆状态</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetFormData();
                        setShowCreateModal(true);
                    }}
                >
                    <span className="text-lg mr-2">🚌</span>
                    添加车辆
                </button>
            </div>

            {/* 搜索表单 */}
            <VehicleSearchForm
                onSearch={handleSearch}
                onReset={handleResetSearch}
                initialParams={searchParams}
            />

            {/* 车辆列表表格 */}
            <VehicleTable
                vehicles={vehicles}
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

            {/* 创建车辆模态框 */}
            {showCreateModal && (
                <VehicleCreateModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleCreate}
                    onCancel={() => {
                        setShowCreateModal(false);
                        resetFormData();
                    }}
                />
            )}

            {/* 编辑车辆模态框 */}
            {showEditModal && currentVehicle && (
                <VehicleEditModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleUpdate}
                    onCancel={() => {
                        setShowEditModal(false);
                        setCurrentVehicle(null);
                        resetFormData();
                    }}
                />
            )}

            {/* 车辆详情模态框 */}
            {showDetailModal && currentVehicle && (
                <VehicleDetailModal
                    vehicle={currentVehicle}
                    onClose={() => {
                        setShowDetailModal(false);
                        setCurrentVehicle(null);
                    }}
                />
            )}
        </div>
    );
} 