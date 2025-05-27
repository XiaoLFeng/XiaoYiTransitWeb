import { useState, useEffect } from 'react';
import { 
    CreateVehicleInsuranceAPI, 
    UpdateVehicleInsuranceAPI, 
    DeleteVehicleInsuranceAPI, 
    GetVehicleInsuranceListAPI,
    GetVehicleListAPI
} from '../../apis/vehicle_api';
import type { 
    CreateVehicleInsuranceDTO, 
    UpdateVehicleInsuranceDTO, 
    GetVehicleInsuranceListQueryDTO 
} from '../../models/dto/vehicle_dto';
import type { 
    VehicleInsuranceDetailEntity, 
    VehicleInsuranceListItemEntity,
    VehicleListItemEntity
} from '../../models/entity/vehicle_entity';

// 导入组件
import { VehicleInsuranceSearchForm } from '../../components/admin/vehicle/vehicle_insurance_search_form';
import { VehicleInsuranceTable } from '../../components/admin/vehicle/vehicle_insurance_table';
import { VehicleInsuranceCreateModal } from '../../components/admin/vehicle/vehicle_insurance_create_modal';
import { VehicleInsuranceEditModal } from '../../components/admin/vehicle/vehicle_insurance_edit_modal';
import { VehicleInsuranceDetailModal } from '../../components/admin/vehicle/vehicle_insurance_detail_modal';

/**
 * # 保险管理页面
 * 管理车辆保险记录的主页面，负责状态管理和API调用
 */
export function AdminVehicleInsuranceManage() {
    // 状态管理
    const [insurances, setInsurances] = useState<VehicleInsuranceListItemEntity[]>([]);
    const [vehicles, setVehicles] = useState<VehicleListItemEntity[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<GetVehicleInsuranceListQueryDTO>({});
    
    // 模态框状态
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    // 当前操作的保险记录
    const [currentInsurance, setCurrentInsurance] = useState<VehicleInsuranceDetailEntity | null>(null);
    
    // 表单数据
    const [formData, setFormData] = useState<CreateVehicleInsuranceDTO>({
        vehicle_uuid: '',
        insurance_type: '交强险',
        insurance_company: '',
        policy_number: '',
        start_date: '',
        end_date: '',
        premium: 0,
        coverage_amount: 0,
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
     * 获取保险记录列表
     */
    const fetchInsurances = async () => {
        setLoading(true);
        try {
            const params: GetVehicleInsuranceListQueryDTO = {
                page: currentPage,
                size: pageSize,
                ...searchParams
            };
            
            console.log('🔍 获取保险记录列表 - 参数:', params);
            const response = await GetVehicleInsuranceListAPI(params);
            console.log('📋 保险记录列表响应:', response);
            
            if (response?.code === 200) {
                const insuranceList = response.data?.list || [];
                const totalCount = response.data?.total || 0;
                
                console.log(`✅ 获取到 ${insuranceList.length} 条保险记录，总计 ${totalCount} 条`);
                setInsurances(insuranceList);
                setTotal(totalCount);
            } else {
                console.error('❌ 获取保险记录列表失败:', response?.message);
                alert(`获取保险记录列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取保险记录列表异常:', error);
            alert('获取保险记录列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 创建保险记录
     */
    const handleCreate = async () => {
        try {
            const response = await CreateVehicleInsuranceAPI(formData);
            if (response?.code === 200) {
                setShowCreateModal(false);
                fetchInsurances();
                resetFormData();
                alert('保险记录创建成功！');
            } else {
                alert(`创建失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('创建保险记录错误:', error);
            alert('创建失败，请稍后重试');
        }
    };

    /**
     * 更新保险记录
     */
    const handleUpdate = async () => {
        if (!currentInsurance) return;
        
        try {
            const updateData: UpdateVehicleInsuranceDTO = {
                insurance_uuid: currentInsurance.insurance_uuid,
                ...formData
            };
            
            const response = await UpdateVehicleInsuranceAPI(currentInsurance.insurance_uuid, updateData);
            if (response?.code === 200) {
                setShowEditModal(false);
                fetchInsurances();
                resetFormData();
                setCurrentInsurance(null);
                alert('保险记录更新成功！');
            } else {
                alert(`更新失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('更新保险记录错误:', error);
            alert('更新失败，请稍后重试');
        }
    };

    /**
     * 删除保险记录
     */
    const handleDelete = async (insuranceUuid: string, insuranceType: string) => {
        if (!confirm(`确定要删除保险记录 ${insuranceType} 吗？此操作无法撤销。`)) {
            return;
        }
        
        try {
            const response = await DeleteVehicleInsuranceAPI(insuranceUuid, { insurance_uuid: insuranceUuid });
            if (response?.code === 200) {
                fetchInsurances();
                alert('保险记录删除成功！');
            } else {
                alert(`删除失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('删除保险记录错误:', error);
            alert('删除失败，请稍后重试');
        }
    };

    /**
     * 查看保险记录详情
     */
    const handleViewDetail = (insurance: VehicleInsuranceListItemEntity) => {
        // 将列表项转换为详情实体格式
        const insuranceDetail: VehicleInsuranceDetailEntity = {
            insurance_uuid: insurance.insurance_uuid,
            vehicle_uuid: insurance.vehicle_uuid,
            plate_number: insurance.plate_number,
            insurance_type: insurance.insurance_type,
            insurance_company: insurance.insurance_company,
            policy_number: insurance.policy_number,
            start_date: insurance.start_date,
            end_date: insurance.end_date,
            premium: insurance.premium,
            coverage_amount: insurance.coverage_amount
        };
        setCurrentInsurance(insuranceDetail);
        setShowDetailModal(true);
    };

    /**
     * 编辑保险记录
     */
    const handleEdit = (insurance: VehicleInsuranceListItemEntity) => {
        // 将列表项转换为详情实体格式并设置表单数据
        const insuranceDetail: VehicleInsuranceDetailEntity = {
            insurance_uuid: insurance.insurance_uuid,
            vehicle_uuid: insurance.vehicle_uuid,
            plate_number: insurance.plate_number,
            insurance_type: insurance.insurance_type,
            insurance_company: insurance.insurance_company,
            policy_number: insurance.policy_number,
            start_date: insurance.start_date,
            end_date: insurance.end_date,
            premium: insurance.premium,
            coverage_amount: insurance.coverage_amount
        };
        
        setCurrentInsurance(insuranceDetail);
        
        // 准备表单数据
        const formDataToSet = {
            vehicle_uuid: insurance.vehicle_uuid || '',
            insurance_type: insurance.insurance_type || '',
            insurance_company: insurance.insurance_company || '',
            policy_number: insurance.policy_number || '',
            start_date: insurance.start_date || '',
            end_date: insurance.end_date || '',
            premium: insurance.premium ?? 0,
            coverage_amount: insurance.coverage_amount ?? 0,
            notes: ''
        };
        
        console.log('📝 设置保险记录表单数据:', formDataToSet);
        setFormData(formDataToSet);
        setShowEditModal(true);
    };

    /**
     * 重置表单数据
     */
    const resetFormData = () => {
        setFormData({
            vehicle_uuid: '',
            insurance_type: '交强险',
            insurance_company: '',
            policy_number: '',
            start_date: '',
            end_date: '',
            premium: 0,
            coverage_amount: 0,
            notes: ''
        });
    };

    /**
     * 搜索处理
     */
    const handleSearch = (params: GetVehicleInsuranceListQueryDTO) => {
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
        fetchInsurances();
    }, [currentPage, pageSize, searchParams]);

    return (
        <div className="space-y-6">
            {/* 页面标题和操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">车辆保险管理</h1>
                    <p className="text-base-content/60 mt-1">管理车辆保险记录、到期提醒</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetFormData();
                        setShowCreateModal(true);
                    }}
                >
                    <span className="text-lg mr-2">🛡️</span>
                    添加保险记录
                </button>
            </div>

            {/* 搜索表单 */}
            <VehicleInsuranceSearchForm
                onSearch={handleSearch}
                onReset={handleResetSearch}
                initialParams={searchParams}
                vehicles={vehicles}
            />

            {/* 保险记录列表表格 */}
            <VehicleInsuranceTable
                insurances={insurances}
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

            {/* 创建保险记录模态框 */}
            {showCreateModal && (
                <VehicleInsuranceCreateModal
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

            {/* 编辑保险记录模态框 */}
            {showEditModal && currentInsurance && (
                <VehicleInsuranceEditModal
                    formData={formData}
                    setFormData={setFormData}
                    vehicles={vehicles}
                    onConfirm={handleUpdate}
                    onCancel={() => {
                        setShowEditModal(false);
                        setCurrentInsurance(null);
                        resetFormData();
                    }}
                />
            )}

            {/* 保险记录详情模态框 */}
            {showDetailModal && currentInsurance && (
                <VehicleInsuranceDetailModal
                    insurance={currentInsurance}
                    onClose={() => {
                        setShowDetailModal(false);
                        setCurrentInsurance(null);
                    }}
                />
            )}
        </div>
    );
} 