import type { CreateVehicleInspectionDTO } from '../../../models/dto/vehicle_dto';
import type { SimpleVehicleItemEntity } from '../../../models/entity/vehicle_entity';

interface VehicleInspectionCreateModalProps {
    formData: CreateVehicleInspectionDTO;
    setFormData: (data: CreateVehicleInspectionDTO) => void;
    vehicles: SimpleVehicleItemEntity[];
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * # 年检结果选项
 */
const INSPECTION_RESULT_OPTIONS = [
    [1,'合格'],
    [2,'不合格']
];

/**
 * # 创建车辆年检模态框组件
 */
export function VehicleInspectionCreateModal({ formData, setFormData, vehicles, onConfirm, onCancel }: VehicleInspectionCreateModalProps) {
    const handleInputChange = (field: keyof CreateVehicleInspectionDTO, value: string | number) => {
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
                    <h3 className="text-xl font-bold">添加年检记录</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🔍</span>年检信息
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
                                    <span className="label-text font-medium border-l-4 border-error pl-3">年检日期</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.inspection_date}
                                    onChange={(e) => handleInputChange('inspection_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">年检结果</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.inspection_result}
                                    onChange={(e) => handleInputChange('inspection_result', e.target.value)}
                                >
                                    {INSPECTION_RESULT_OPTIONS.map(result => (
                                        <option key={result[0]} value={result[0]}>
                                            {result[1]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">检测机构</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.inspection_agency}
                                    onChange={(e) => handleInputChange('inspection_agency', e.target.value)}
                                    placeholder="请输入检测机构"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 详细信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📅</span>年检详情
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">下次年检日期</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.expiry_date}
                                    onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">年检费用（元）</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={formData.cost}
                                    onChange={(e) => handleInputChange('cost', Number(e.target.value))}
                                    placeholder="请输入年检费用"
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
                                    rows={4}
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
                        确认添加
                    </button>
                </div>
            </div>
        </div>
    );
} 