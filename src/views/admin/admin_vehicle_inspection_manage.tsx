import { useState, useEffect } from 'react';
import { 
    CreateVehicleInspectionAPI, 
    UpdateVehicleInspectionAPI, 
    DeleteVehicleInspectionAPI, 
    GetVehicleInspectionListAPI,
    GetVehicleListAPI
} from '../../apis/vehicle_api';
import type { 
    CreateVehicleInspectionDTO, 
    UpdateVehicleInspectionDTO, 
    GetVehicleInspectionListQueryDTO 
} from '../../models/dto/vehicle_dto';
import type { 
    VehicleInspectionDetailEntity, 
    VehicleInspectionListItemEntity,
    VehicleListItemEntity
} from '../../models/entity/vehicle_entity';

// 导入组件
import { VehicleInspectionSearchForm } from '../../components/admin/vehicle/vehicle_inspection_search_form';
import { VehicleInspectionTable } from '../../components/admin/vehicle/vehicle_inspection_table';
import { VehicleInspectionCreateModal } from '../../components/admin/vehicle/vehicle_inspection_create_modal';
import { VehicleInspectionEditModal } from '../../components/admin/vehicle/vehicle_inspection_edit_modal';
import { VehicleInspectionDetailModal } from '../../components/admin/vehicle/vehicle_inspection_detail_modal';

/**
 * # 年检管理页面
 * 管理车辆年检记录的主页面，负责状态管理和API调用
 */
export function AdminVehicleInspectionManage() {
    // 状态管理
    const [inspections, setInspections] = useState<VehicleInspectionListItemEntity[]>([]);
    const [vehicles, setVehicles] = useState<VehicleListItemEntity[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<GetVehicleInspectionListQueryDTO>({});
    
    // 模态框状态
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    // 当前操作的年检记录
    const [currentInspection, setCurrentInspection] = useState<VehicleInspectionDetailEntity | null>(null);
    
    // 表单数据
    const [formData, setFormData] = useState<CreateVehicleInspectionDTO>({
        vehicle_uuid: '',
        inspection_date: '',
        result: '合格',
        agency: '',
        next_inspection_date: '',
        cost: 0,
        notes: ''
    });

    /**
     * 获取车辆列表 - 用于下拉选择
     */
    const fetchVehicles = async () => {
        try {
            const response = await GetVehicleListAPI({ page: 1, size: 1000 }); // 获取所有车辆
            if (response?.code === 200) {
                setVehicles(response.data?.list || []);
            }
        } catch (error) {
            console.error('获取车辆列表错误:', error);
        }
    };

    /**
     * 获取年检记录列表
     */
    const fetchInspections = async () => {
        setLoading(true);
        try {
            const params: GetVehicleInspectionListQueryDTO = {
                page: currentPage,
                size: pageSize,
                ...searchParams
            };
            
            console.log('🔍 获取年检记录列表 - 参数:', params);
            const response = await GetVehicleInspectionListAPI(params);
            console.log('📋 年检记录列表响应:', response);
            
            if (response?.code === 200) {
                const inspectionList = response.data?.list || [];
                const totalCount = response.data?.total || 0;
                
                console.log(`✅ 获取到 ${inspectionList.length} 条年检记录，总计 ${totalCount} 条`);
                setInspections(inspectionList);
                setTotal(totalCount);
            } else {
                console.error('❌ 获取年检记录列表失败:', response?.message);
                alert(`获取年检记录列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取年检记录列表异常:', error);
            alert('获取年检记录列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 创建年检记录
     */
    const handleCreate = async () => {
        try {
            const response = await CreateVehicleInspectionAPI(formData);
            if (response?.code === 200) {
                setShowCreateModal(false);
                fetchInspections();
                resetFormData();
                alert('年检记录创建成功！');
            } else {
                alert(`创建失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('创建年检记录错误:', error);
            alert('创建失败，请稍后重试');
        }
    };

    /**
     * 更新年检记录
     */
    const handleUpdate = async () => {
        if (!currentInspection) return;
        
        try {
            const updateData: UpdateVehicleInspectionDTO = {
                inspection_uuid: currentInspection.inspection_uuid,
                ...formData
            };
            
            const response = await UpdateVehicleInspectionAPI(currentInspection.inspection_uuid, updateData);
            if (response?.code === 200) {
                setShowEditModal(false);
                fetchInspections();
                resetFormData();
                setCurrentInspection(null);
                alert('年检记录更新成功！');
            } else {
                alert(`更新失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('更新年检记录错误:', error);
            alert('更新失败，请稍后重试');
        }
    };

    /**
     * 删除年检记录
     */
    const handleDelete = async (inspectionUuid: string, inspectionDate: string) => {
        if (!confirm(`确定要删除年检记录 ${inspectionDate} 吗？此操作无法撤销。`)) {
            return;
        }
        
        try {
            const response = await DeleteVehicleInspectionAPI(inspectionUuid, { inspection_uuid: inspectionUuid });
            if (response?.code === 200) {
                fetchInspections();
                alert('年检记录删除成功！');
            } else {
                alert(`删除失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('删除年检记录错误:', error);
            alert('删除失败，请稍后重试');
        }
    };

    /**
     * 查看年检记录详情
     */
    const handleViewDetail = (inspection: VehicleInspectionListItemEntity) => {
        // 将列表项转换为详情实体格式
        const inspectionDetail: VehicleInspectionDetailEntity = {
            inspection_uuid: inspection.inspection_uuid,
            vehicle_uuid: inspection.vehicle_uuid,
            plate_number: inspection.plate_number,
            inspection_date: inspection.inspection_date,
            result: inspection.result,
            agency: inspection.agency,
            next_inspection_date: inspection.next_inspection_date,
            cost: inspection.cost
        };
        setCurrentInspection(inspectionDetail);
        setShowDetailModal(true);
    };

    /**
     * 编辑年检记录
     */
    const handleEdit = (inspection: VehicleInspectionListItemEntity) => {
        // 将列表项转换为详情实体格式并设置表单数据
        const inspectionDetail: VehicleInspectionDetailEntity = {
            inspection_uuid: inspection.inspection_uuid,
            vehicle_uuid: inspection.vehicle_uuid,
            plate_number: inspection.plate_number,
            inspection_date: inspection.inspection_date,
            result: inspection.result,
            agency: inspection.agency,
            next_inspection_date: inspection.next_inspection_date,
            cost: inspection.cost
        };
        
        setCurrentInspection(inspectionDetail);
        
        // 准备表单数据
        const formDataToSet = {
            vehicle_uuid: inspection.vehicle_uuid || '',
            inspection_date: inspection.inspection_date || '',
            result: inspection.result || '合格',
            agency: inspection.agency || '',
            next_inspection_date: inspection.next_inspection_date || '',
            cost: inspection.cost ?? 0,
            notes: ''
        };
        
        console.log('📝 设置年检记录表单数据:', formDataToSet);
        setFormData(formDataToSet);
        setShowEditModal(true);
    };

    /**
     * 重置表单数据
     */
    const resetFormData = () => {
        setFormData({
            vehicle_uuid: '',
            inspection_date: '',
            result: '合格',
            agency: '',
            next_inspection_date: '',
            cost: 0,
            notes: ''
        });
    };

    /**
     * 搜索处理
     */
    const handleSearch = (params: GetVehicleInspectionListQueryDTO) => {
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
        fetchInspections();
    }, [currentPage, pageSize, searchParams]);

    return (
        <div className="space-y-6">
            {/* 页面标题和操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">车辆年检管理</h1>
                    <p className="text-base-content/60 mt-1">管理车辆年检记录、到期提醒</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetFormData();
                        setShowCreateModal(true);
                    }}
                >
                    <span className="text-lg mr-2">🔍</span>
                    添加年检记录
                </button>
            </div>

            {/* 搜索表单 */}
            <VehicleInspectionSearchForm
                onSearch={handleSearch}
                onReset={handleResetSearch}
                initialParams={searchParams}
                vehicles={vehicles}
            />

            {/* 年检记录列表表格 */}
            <VehicleInspectionTable
                inspections={inspections}
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

            {/* 创建年检记录模态框 */}
            {showCreateModal && (
                <VehicleInspectionCreateModal
                    formData={formData}
                    setFormData={setFormData}
                    vehicles={vehicles}
                    onConfirm={handleCreate}
                    onCancel={() => {
                        setShowCreateModal(false);
                        resetFormData();
                    }}
                />
            )}

            {/* 编辑年检记录模态框 */}
            {showEditModal && currentInspection && (
                <VehicleInspectionEditModal
                    formData={formData}
                    setFormData={setFormData}
                    vehicles={vehicles}
                    onConfirm={handleUpdate}
                    onCancel={() => {
                        setShowEditModal(false);
                        setCurrentInspection(null);
                        resetFormData();
                    }}
                />
            )}

            {/* 年检记录详情模态框 */}
            {showDetailModal && currentInspection && (
                <VehicleInspectionDetailModal
                    inspection={currentInspection}
                    onClose={() => {
                        setShowDetailModal(false);
                        setCurrentInspection(null);
                    }}
                />
            )}
        </div>
    );
} 