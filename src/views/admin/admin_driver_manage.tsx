import { useState, useEffect } from 'react';
import { 
    CreateDriverAPI, 
    UpdateDriverAPI, 
    DeleteDriverAPI, 
    GetDriverDetailAPI, 
    GetDriverListAPI, 
    GetDriverScheduleAPI 
} from '../../apis/driver_api';
import { DriverStatus, DriverGender } from '../../models/dto/driver_dto';
import type { 
    CreateDriverDTO, 
    UpdateDriverDTO, 
    GetDriverListQueryDTO 
} from '../../models/dto/driver_dto';
import type { 
    DriverDetailEntity, 
    DriverListItemEntity, 
    DriverScheduleEntity 
} from '../../models/entity/driver_entity';

// 导入组件
import { DriverSearchForm } from '../../components/admin/driver/driver_search_form';
import { DriverTable } from '../../components/admin/driver/driver_table';
import { DriverCreateModal } from '../../components/admin/driver/driver_create_modal';
import { DriverEditModal } from '../../components/admin/driver/driver_edit_modal';
import { DriverDetailModal } from '../../components/admin/driver/driver_detail_modal';
import { DriverScheduleModal } from '../../components/admin/driver/driver_schedule_modal';

/**
 * # 司机管理页面
 * 管理司机信息的主页面，负责状态管理和API调用
 */
export function AdminDriverManage() {
    // 状态管理
    const [drivers, setDrivers] = useState<DriverListItemEntity[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<GetDriverListQueryDTO>({});
    
    // 模态框状态
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    
    // 当前操作的司机
    const [currentDriver, setCurrentDriver] = useState<DriverDetailEntity | null>(null);
    const [currentSchedule, setCurrentSchedule] = useState<DriverScheduleEntity | null>(null);
    
    // 表单数据
    const [formData, setFormData] = useState<CreateDriverDTO>({
        employee_id: '',
        name: '',
        gender: DriverGender.MALE,
        id_card: '',
        phone: '',
        emergency_contact: '',
        emergency_phone: '',
        license_number: '',
        license_type: 'A3', // 默认选择城市公交车驾照
        license_expiry_date: '',
        entry_date: '',
        status: DriverStatus.ACTIVE,
        address: '',
        notes: ''
    });

    /**
     * 获取司机列表
     */
    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const params: GetDriverListQueryDTO = {
                page: currentPage,
                size: pageSize,
                ...searchParams
            };
            
            console.log('🔍 获取司机列表 - 参数:', params);
            const response = await GetDriverListAPI(params);
            console.log('📋 司机列表响应:', response);
            
            if (response?.code === 200) {
                const driverList = response.data?.list || [];
                const totalCount = response.data?.total || 0;
                
                console.log(`✅ 获取到 ${driverList.length} 条司机记录，总计 ${totalCount} 条`);
                setDrivers(driverList);
                setTotal(totalCount);
            } else {
                console.error('❌ 获取司机列表失败:', response?.message);
                alert(`获取司机列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取司机列表异常:', error);
            alert('获取司机列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 创建司机
     */
    const handleCreate = async () => {
        try {
            const response = await CreateDriverAPI(formData);
            if (response?.code === 200) {
                setShowCreateModal(false);
                fetchDrivers();
                resetFormData();
                alert('司机创建成功！');
            } else {
                alert(`创建失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('创建司机错误:', error);
            alert('创建失败，请稍后重试');
        }
    };

    /**
     * 更新司机
     */
    const handleUpdate = async () => {
        if (!currentDriver) return;
        
        try {
            const updateData: UpdateDriverDTO = {
                driver_uuid: currentDriver.driver_uuid,
                ...formData
            };
            
            const response = await UpdateDriverAPI(updateData);
            if (response?.code === 200) {
                setShowEditModal(false);
                fetchDrivers();
                resetFormData();
                setCurrentDriver(null);
                alert('司机信息更新成功！');
            } else {
                alert(`更新失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('更新司机错误:', error);
            alert('更新失败，请稍后重试');
        }
    };

    /**
     * 删除司机
     */
    const handleDelete = async (driverUuid: string, driverName: string) => {
        if (!confirm(`确定要删除司机 ${driverName} 吗？此操作无法撤销。`)) {
            return;
        }
        
        try {
            const response = await DeleteDriverAPI({ driver_uuid: driverUuid });
            if (response?.code === 200) {
                fetchDrivers();
                alert('司机删除成功！');
            } else {
                alert(`删除失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('删除司机错误:', error);
            alert('删除失败，请稍后重试');
        }
    };

    /**
     * 查看司机详情
     */
    const handleViewDetail = async (driverUuid: string) => {
        try {
            const response = await GetDriverDetailAPI({ driver_uuid: driverUuid });
            if (response?.code === 200) {
                setCurrentDriver(response.data || null);
                setShowDetailModal(true);
            } else {
                alert(`获取详情失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取司机详情错误:', error);
            alert('获取详情失败，请稍后重试');
        }
    };

    /**
     * 查看司机排班
     */
    const handleViewSchedule = async (driverUuid: string) => {
        try {
            const response = await GetDriverScheduleAPI({
                driver_uuid: driverUuid,
                start_date: new Date().toISOString().split('T')[0],
                end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            });
            if (response?.code === 200) {
                setCurrentSchedule(response.data || null);
                setShowScheduleModal(true);
            } else {
                alert(`获取排班失败: ${response?.message}`);
            }
        } catch (error) {
            console.error('获取司机排班错误:', error);
            alert('获取排班失败，请稍后重试');
        }
    };

    /**
     * 编辑司机
     */
    const handleEdit = (driver: DriverListItemEntity) => {
        // 先获取完整的司机详情
        handleViewDetailForEdit(driver.driver_uuid);
    };

    /**
     * 获取司机详情用于编辑
     */
    const handleViewDetailForEdit = async (driverUuid: string) => {
        try {
            console.log('🚀 获取司机详情 - UUID:', driverUuid);
            const response = await GetDriverDetailAPI({ driver_uuid: driverUuid });
            console.log('📡 API响应:', response);
            
            if (response?.code === 200) {
                const driverDetail = response.data;
                console.log('👤 司机详情数据:', driverDetail);
                
                if (driverDetail) {
                    setCurrentDriver(driverDetail);
                    
                    // 准备表单数据，确保所有必填字段都有值
                    const formDataToSet = {
                        employee_id: driverDetail.employee_id || '',
                        name: driverDetail.name || '',
                        gender: driverDetail.gender ?? DriverGender.MALE,
                        id_card: driverDetail.id_card || '',
                        phone: driverDetail.phone || '',
                        emergency_contact: driverDetail.emergency_contact || '',
                        emergency_phone: driverDetail.emergency_phone || '',
                        license_number: driverDetail.license_number || '',
                        license_type: driverDetail.license_type || 'A3',
                        license_expiry_date: driverDetail.license_expiry_date || '',
                        entry_date: driverDetail.entry_date || '',
                        status: driverDetail.status ?? DriverStatus.ACTIVE,
                        address: driverDetail.address || '',
                        notes: driverDetail.notes || ''
                    };
                    
                    console.log('📝 设置表单数据:', formDataToSet);
                    setFormData(formDataToSet);
                    setShowEditModal(true);
                } else {
                    console.error('❌ 司机详情数据为空');
                    alert('获取司机详情失败：数据为空');
                }
            } else {
                console.error('❌ API响应错误:', response);
                alert(`获取详情失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取司机详情异常:', error);
            alert('获取详情失败，请稍后重试。详情请查看控制台');
        }
    };

    /**
     * 重置表单数据
     */
    const resetFormData = () => {
        setFormData({
            employee_id: '',
            name: '',
            gender: DriverGender.MALE,
            id_card: '',
            phone: '',
            emergency_contact: '',
            emergency_phone: '',
            license_number: '',
            license_type: 'A3', // 默认选择城市公交车驾照
            license_expiry_date: '',
            entry_date: '',
            status: DriverStatus.ACTIVE,
            address: '',
            notes: ''
        });
    };

    /**
     * 搜索处理
     */
    const handleSearch = (params: GetDriverListQueryDTO) => {
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
        fetchDrivers();
    }, [currentPage, pageSize, searchParams]);

    return (
        <div className="space-y-6">
            {/* 页面标题和操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">司机管理</h1>
                    <p className="text-base-content/60 mt-1">管理司机信息、查看排班情况</p>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        resetFormData();
                        setShowCreateModal(true);
                    }}
                >
                    <span className="text-lg mr-2">👨‍💼</span>
                    添加司机
                </button>
            </div>

            {/* 搜索表单 */}
            <DriverSearchForm
                onSearch={handleSearch}
                onReset={handleResetSearch}
                initialParams={searchParams}
            />

            {/* 司机列表表格 */}
            <DriverTable
                drivers={drivers}
                total={total}
                currentPage={currentPage}
                pageSize={pageSize}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetail={handleViewDetail}
                onViewSchedule={handleViewSchedule}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />

            {/* 创建司机模态框 */}
            {showCreateModal && (
                <DriverCreateModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleCreate}
                    onCancel={() => {
                        setShowCreateModal(false);
                        resetFormData();
                    }}
                />
            )}

            {/* 编辑司机模态框 */}
            {showEditModal && currentDriver && (
                <DriverEditModal
                    formData={formData}
                    setFormData={setFormData}
                    onConfirm={handleUpdate}
                    onCancel={() => {
                        setShowEditModal(false);
                        setCurrentDriver(null);
                        resetFormData();
                    }}
                />
            )}

            {/* 司机详情模态框 */}
            {showDetailModal && currentDriver && (
                <DriverDetailModal
                    driver={currentDriver}
                    onClose={() => {
                        setShowDetailModal(false);
                        setCurrentDriver(null);
                    }}
                />
            )}

            {/* 司机排班模态框 */}
            {showScheduleModal && currentSchedule && (
                <DriverScheduleModal
                    schedule={currentSchedule}
                    onClose={() => {
                        setShowScheduleModal(false);
                        setCurrentSchedule(null);
                    }}
                />
            )}
        </div>
    );
} 