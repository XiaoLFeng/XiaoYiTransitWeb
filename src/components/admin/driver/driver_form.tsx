import { DriverStatus, DriverGender } from '../../../models/dto/driver_dto';
import type { CreateDriverDTO } from '../../../models/dto/driver_dto';

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

interface DriverFormProps {
    formData: CreateDriverDTO;
    setFormData: (data: CreateDriverDTO) => void;
}

/**
 * # 司机表单组件
 */
export function DriverForm({ formData, setFormData }: DriverFormProps) {
    const handleInputChange = (field: keyof CreateDriverDTO, value: string | number) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 基本信息 */}
            <div className="space-y-4">
                <h4 className="font-semibold">基本信息</h4>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">工号 *</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={formData.employee_id}
                        onChange={(e) => handleInputChange('employee_id', e.target.value)}
                        placeholder="请输入工号"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">姓名 *</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="请输入姓名"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">性别 *</span>
                    </label>
                    <select
                        className="select select-bordered"
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

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">身份证号 *</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={formData.id_card}
                        onChange={(e) => handleInputChange('id_card', e.target.value)}
                        placeholder="请输入身份证号"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">联系电话 *</span>
                    </label>
                    <input
                        type="tel"
                        className="input input-bordered"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="请输入联系电话"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">紧急联系人</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={formData.emergency_contact}
                        onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                        placeholder="请输入紧急联系人"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">紧急联系电话</span>
                    </label>
                    <input
                        type="tel"
                        className="input input-bordered"
                        value={formData.emergency_phone}
                        onChange={(e) => handleInputChange('emergency_phone', e.target.value)}
                        placeholder="请输入紧急联系电话"
                    />
                </div>
            </div>

            {/* 职业信息 */}
            <div className="space-y-4">
                <h4 className="font-semibold">职业信息</h4>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">驾驶证号 *</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={formData.license_number}
                        onChange={(e) => handleInputChange('license_number', e.target.value)}
                        placeholder="请输入驾驶证号"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">驾驶证类型 *</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={formData.license_type}
                        onChange={(e) => handleInputChange('license_type', e.target.value)}
                    >
                        <option value="">请选择驾驶证类型</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">驾驶证到期日期</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered"
                        value={formData.license_expiry_date}
                        onChange={(e) => handleInputChange('license_expiry_date', e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">入职日期</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered"
                        value={formData.entry_date}
                        onChange={(e) => handleInputChange('entry_date', e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">状态 *</span>
                    </label>
                    <select
                        className="select select-bordered"
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

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">住址</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="请输入住址"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">备注</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="请输入备注信息"
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );
} 