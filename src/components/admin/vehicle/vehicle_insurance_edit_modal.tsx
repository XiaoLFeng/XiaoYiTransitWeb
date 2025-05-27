import type { CreateVehicleInsuranceDTO } from '../../../models/dto/vehicle_dto';
import type { VehicleListItemEntity } from '../../../models/entity/vehicle_entity';

interface VehicleInsuranceEditModalProps {
    formData: CreateVehicleInsuranceDTO;
    setFormData: (data: CreateVehicleInsuranceDTO) => void;
    vehicles: VehicleListItemEntity[];
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * # 保险类型选项
 */
const INSURANCE_TYPE_OPTIONS = [
    '交强险',
    '商业险',
    '车损险',
    '第三者责任险',
    '车上人员责任险',
    '盗抢险',
    '自燃险',
    '玻璃单独破碎险',
    '不计免赔险'
];

/**
 * # 编辑车辆保险模态框组件
 */
export function VehicleInsuranceEditModal({ formData, setFormData, vehicles, onConfirm, onCancel }: VehicleInsuranceEditModalProps) {
    const handleInputChange = (field: keyof CreateVehicleInsuranceDTO, value: string | number) => {
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
                    <h3 className="text-xl font-bold">编辑保险记录</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🛡️</span>保险信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">选择车辆</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.vehicle_uuid}
                                    onChange={(e) => handleInputChange('vehicle_uuid', e.target.value)}
                                >
                                    <option value="">请选择车辆</option>
                                    {vehicles.map(vehicle => (
                                        <option key={vehicle.vehicle_uuid} value={vehicle.vehicle_uuid}>
                                            {vehicle.plate_number} - {vehicle.model}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">保险类型</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.insurance_type}
                                    onChange={(e) => handleInputChange('insurance_type', e.target.value)}
                                >
                                    {INSURANCE_TYPE_OPTIONS.map(type => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">保险公司</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.insurance_company}
                                    onChange={(e) => handleInputChange('insurance_company', e.target.value)}
                                    placeholder="请输入保险公司"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">保单号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.policy_number}
                                    onChange={(e) => handleInputChange('policy_number', e.target.value)}
                                    placeholder="请输入保单号"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 详细信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📅</span>保险详情
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">生效日期</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.start_date}
                                    onChange={(e) => handleInputChange('start_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">到期日期</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.end_date}
                                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">保费（元）</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={formData.premium}
                                    onChange={(e) => handleInputChange('premium', Number(e.target.value))}
                                    placeholder="请输入保费"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">保额（元）</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={formData.coverage_amount}
                                    onChange={(e) => handleInputChange('coverage_amount', Number(e.target.value))}
                                    placeholder="请输入保额"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">备注</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    rows={3}
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
                    <button className="btn btn-primary" onClick={onConfirm}>
                        确认更新
                    </button>
                </div>
            </div>
        </div>
    );
} 