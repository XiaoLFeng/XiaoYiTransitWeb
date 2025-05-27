import type { CreateVehicleDTO } from '../../../models/dto/vehicle_dto';
import { VehicleStatus } from '../../../models/dto/vehicle_dto';

interface VehicleCreateModalProps {
    formData: CreateVehicleDTO;
    setFormData: (data: CreateVehicleDTO) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * # 车辆状态选项
 */
const VEHICLE_STATUS_OPTIONS = [
    { value: VehicleStatus.OPERATING, label: '运营' },
    { value: VehicleStatus.MAINTENANCE, label: '维修' },
    { value: VehicleStatus.OUT_OF_SERVICE, label: '停运' },
    { value: VehicleStatus.SCRAPPED, label: '报废' },
];

/**
 * # 创建车辆模态框组件
 */
export function VehicleCreateModal({ formData, setFormData, onConfirm, onCancel }: VehicleCreateModalProps) {
    const handleInputChange = (field: keyof CreateVehicleDTO, value: string | number) => {
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
                    <h3 className="text-xl font-bold">添加新车辆</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚌</span>基本信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">车牌号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.plate_number}
                                    onChange={(e) => handleInputChange('plate_number', e.target.value)}
                                    placeholder="请输入车牌号"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">车辆型号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.model}
                                    onChange={(e) => handleInputChange('model', e.target.value)}
                                    placeholder="请输入车辆型号"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">制造商</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.manufacturer}
                                    onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                                    placeholder="请输入制造商"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">制造年份</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={formData.manufacture_year}
                                    onChange={(e) => handleInputChange('manufacture_year', Number(e.target.value))}
                                    placeholder="请输入制造年份"
                                    min="1990"
                                    max={new Date().getFullYear() + 1}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">座位数</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={formData.seat_count}
                                    onChange={(e) => handleInputChange('seat_count', Number(e.target.value))}
                                    placeholder="请输入座位数"
                                    min="1"
                                    max="200"
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
                                    {VEHICLE_STATUS_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 详细信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🔧</span>详细信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">发动机号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.engine_number}
                                    onChange={(e) => handleInputChange('engine_number', e.target.value)}
                                    placeholder="请输入发动机号"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">车架号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.chassis_number}
                                    onChange={(e) => handleInputChange('chassis_number', e.target.value)}
                                    placeholder="请输入车架号"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">购置日期</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={formData.purchase_date}
                                    onChange={(e) => handleInputChange('purchase_date', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">购置价格（元）</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full"
                                    value={formData.purchase_price}
                                    onChange={(e) => handleInputChange('purchase_price', Number(e.target.value))}
                                    placeholder="请输入购置价格"
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