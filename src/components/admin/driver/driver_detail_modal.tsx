import { DriverStatus, DriverGender } from '../../../models/dto/driver_dto';
import type { DriverDetailEntity } from '../../../models/entity/driver_entity';

/**
 * # 司机状态选项
 */
const DRIVER_STATUS_OPTIONS = [
    { value: DriverStatus.ACTIVE, label: '在职', color: 'badge-success' },
    { value: DriverStatus.ON_LEAVE, label: '休假', color: 'badge-warning' },
    { value: DriverStatus.SUSPENDED, label: '停职', color: 'badge-error' },
    { value: DriverStatus.RESIGNED, label: '离职', color: 'badge-neutral' },
];

interface DriverDetailModalProps {
    driver: DriverDetailEntity;
    onClose: () => void;
}

/**
 * # 司机详情模态框组件
 */
export function DriverDetailModal({ driver, onClose }: DriverDetailModalProps) {
    const getStatusDisplay = (status: DriverStatus) => {
        const option = DRIVER_STATUS_OPTIONS.find(opt => opt.value === status);
        return option ? { label: option.label, color: option.color } : { label: '未知', color: 'badge-neutral' };
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('zh-CN');
    };

    const statusDisplay = getStatusDisplay(driver.status);

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">{driver.name} - 详细信息</h3>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className="text-sm opacity-60">工号: {driver.employee_id}</span>
                            <span className={`badge ${statusDisplay.color}`}>
                                {statusDisplay.label}
                            </span>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                {/* 详情内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">👤</span>基本信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">姓名</span>
                                <span>{driver.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">性别</span>
                                <span>{driver.gender === DriverGender.MALE ? '男' : '女'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">身份证号</span>
                                <span className="font-mono text-sm">{driver.id_card || '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">联系电话</span>
                                <span className="font-mono">{driver.phone}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">紧急联系人</span>
                                <span>{driver.emergency_contact || '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">紧急联系电话</span>
                                <span className="font-mono">{driver.emergency_phone || '-'}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">住址</span>
                                <span className="text-right max-w-xs truncate">{driver.address || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* 职业信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚗</span>职业信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">驾驶证号</span>
                                <span className="font-mono text-sm">{driver.license_number}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">驾驶证类型</span>
                                <span className="badge badge-outline">{driver.license_type || '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">驾照到期日期</span>
                                <span>{formatDate(driver.license_expiry_date)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">入职日期</span>
                                <span>{formatDate(driver.entry_date)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">当前状态</span>
                                <span className={`badge ${statusDisplay.color}`}>
                                    {statusDisplay.label}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">创建时间</span>
                                <span className="text-sm">{formatDate(driver.created_at)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">更新时间</span>
                                <span className="text-sm">{formatDate(driver.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 备注信息 */}
                {driver.notes && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📝</span>备注信息
                        </h4>
                        <div className="bg-base-200 p-4 rounded-lg">
                            <p className="whitespace-pre-wrap">{driver.notes}</p>
                        </div>
                    </div>
                )}

                {/* 底部按钮 */}
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={onClose}>
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
} 