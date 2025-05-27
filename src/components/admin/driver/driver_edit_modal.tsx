import type { CreateDriverDTO } from '../../../models/dto/driver_dto';
import { DriverStatus, DriverGender } from '../../../models/dto/driver_dto';

interface DriverEditModalProps {
    formData: CreateDriverDTO;
    setFormData: (data: CreateDriverDTO) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * # 司机状态选项
 */
const DRIVER_STATUS_OPTIONS = [
    { value: DriverStatus.ACTIVE, label: '在职' },
    { value: DriverStatus.ON_LEAVE, label: '休假' },
    { value: DriverStatus.SUSPENDED, label: '停职' },
    { value: DriverStatus.RESIGNED, label: '离职' },
];

/**
 * # 司机性别选项
 */
const DRIVER_GENDER_OPTIONS = [
    { value: DriverGender.MALE, label: '男' },
    { value: DriverGender.FEMALE, label: '女' },
];

/**
 * # 编辑司机模态框组件
 */
export function DriverEditModal({ formData, setFormData, onConfirm, onCancel }: DriverEditModalProps) {
    const handleInputChange = (field: keyof CreateDriverDTO, value: string | number) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">编辑司机信息 - {formData.name}</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">👤</span>基本信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">工号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.employee_id}
                                    onChange={(e) => handleInputChange('employee_id', e.target.value)}
                                    placeholder="请输入工号"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">姓名</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="请输入姓名"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">性别</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange('gender', Number(e.target.value))}
                                >
                                    {DRIVER_GENDER_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">身份证号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.id_card}
                                    onChange={(e) => handleInputChange('id_card', e.target.value)}
                                    placeholder="请输入身份证号"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">联系电话</span>
                                </label>
                                <input
                                    type="tel"
                                    className="input input-bordered w-full"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="请输入联系电话"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">紧急联系人</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.emergency_contact}
                                    onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                                    placeholder="请输入紧急联系人"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">紧急联系电话</span>
                                </label>
                                <input
                                    type="tel"
                                    className="input input-bordered w-full"
                                    value={formData.emergency_phone}
                                    onChange={(e) => handleInputChange('emergency_phone', e.target.value)}
                                    placeholder="请输入紧急联系电话"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">住址</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="请输入住址"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 职业信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚗</span>职业信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">驾驶证号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.license_number}
                                    onChange={(e) => handleInputChange('license_number', e.target.value)}
                                    placeholder="请输入驾驶证号"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">驾驶证类型</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.license_type}
                                    onChange={(e) => handleInputChange('license_type', e.target.value)}
                                >
                                    <option value="">请选择驾驶证类型</option>
                                    <option value="A1">A1 - 大型客车</option>
                                    <option value="A2">A2 - 牵引车</option>
                                    <option value="A3">A3 - 城市公交车</option>
                                    <option value="B1">B1 - 中型客车</option>
                                    <option value="B2">B2 - 大型货车</option>
                                    <option value="C1">C1 - 小型汽车</option>
                                    <option value="C2">C2 - 小型自动挡汽车</option>
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">驾驶证到期日期</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.license_expiry_date}
                                    onChange={(e) => handleInputChange('license_expiry_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">入职日期</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.entry_date}
                                    onChange={(e) => handleInputChange('entry_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">状态</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', Number(e.target.value))}
                                >
                                    {DRIVER_STATUS_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">备注</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-24 w-full"
                                    value={formData.notes}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                    placeholder="请输入备注信息"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部按钮 */}
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onCancel}>
                        取消
                    </button>
                    <button className="btn btn-warning" onClick={onConfirm}>
                        确认更新
                    </button>
                </div>
            </div>
        </div>
    );
} 