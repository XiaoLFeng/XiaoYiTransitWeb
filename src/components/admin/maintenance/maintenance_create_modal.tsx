import type { CreateMaintenanceDTO } from '../../../models/dto/maintenance_dto';
import type { SimpleVehicleListEntity } from '../../../models/entity/vehicle_entity';

/**
 * # 维修记录创建模态框组件属性接口
 */
interface MaintenanceCreateModalProps {
    /** 表单数据 */
    formData: CreateMaintenanceDTO;
    /** 设置表单数据回调 */
    setFormData: (data: CreateMaintenanceDTO) => void;
    /** 车辆列表 */
    vehicles: SimpleVehicleListEntity | null;
    /** 确认回调 */
    onConfirm: () => void;
    /** 取消回调 */
    onCancel: () => void;
}

/**
 * # 维修记录创建模态框组件
 * 用于创建新的维修记录
 */
export function MaintenanceCreateModal({
    formData,
    setFormData,
    vehicles,
    onConfirm,
    onCancel
}: MaintenanceCreateModalProps) {

    const handleInputChange = (field: keyof CreateMaintenanceDTO, value: string | number) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    /**
     * 处理表单提交
     */
    const handleSubmit = () => {
        // 验证必填字段
        if (!formData.vehicle_uuid.trim()) {
            alert('请选择车辆');
            return;
        }
        if (!formData.description.trim()) {
            alert('请输入维修描述');
            return;
        }
        if (!formData.maintenance_date.trim()) {
            alert('请选择维修日期');
            return;
        }

        onConfirm();
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">添加维修记录</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🔧</span>基本信息
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
                                    {vehicles?.list?.map((vehicle) => (
                                        <option key={vehicle.vehicle_uuid} value={vehicle.vehicle_uuid}>
                                            {vehicle.plate_number} - {vehicle.model}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-warning pl-3">维修类型</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.maintenance_type}
                                    onChange={(e) => handleInputChange('maintenance_type', Number(e.target.value))}
                                >
                                    <option value={1}>常规保养</option>
                                    <option value={2}>故障维修</option>
                                    <option value={3}>事故维修</option>
                                    <option value={4}>年检维修</option>
                                </select>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">维修描述</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full h-24 resize-none"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="请详细描述维修内容和故障情况..."
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-warning pl-3">维修状态</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', Number(e.target.value))}
                                >
                                    <option value={1}>待维修</option>
                                    <option value={2}>维修中</option>
                                    <option value={3}>已完成</option>
                                    <option value={0}>已取消</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 详细信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📋</span>详细信息
                        </h4>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label mb-0.5">
                                        <span className="label-text font-medium border-l-4 border-error pl-3">维修日期</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="input input-bordered w-full"
                                        value={formData.maintenance_date}
                                        onChange={(e) => handleInputChange('maintenance_date', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="label mb-0.5">
                                        <span className="label-text font-medium border-l-4 border-info pl-3">完成日期</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="input input-bordered w-full"
                                        value={formData.completion_date}
                                        onChange={(e) => handleInputChange('completion_date', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label mb-0.5">
                                        <span className="label-text font-medium border-l-4 border-info pl-3">维修费用</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="input input-bordered w-full pl-8"
                                            value={formData.cost || ''}
                                            onChange={(e) => handleInputChange('cost', Number(e.target.value))}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label mb-0.5">
                                        <span className="label-text font-medium border-l-4 border-info pl-3">里程数</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            className="input input-bordered w-full pr-12"
                                            value={formData.mileage || ''}
                                            onChange={(e) => handleInputChange('mileage', Number(e.target.value))}
                                            placeholder="0"
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">km</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-info pl-3">维修地点</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.maintenance_location}
                                    onChange={(e) => handleInputChange('maintenance_location', e.target.value)}
                                    placeholder="如：公司维修厂"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-info pl-3">维修人员</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.maintenance_staff}
                                    onChange={(e) => handleInputChange('maintenance_staff', e.target.value)}
                                    placeholder="如：张师傅"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 补充信息 */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="mr-2">📝</span>补充信息
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="label mb-0.5">
                                <span className="label-text font-medium border-l-4 border-info pl-3">更换零部件</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full h-20 resize-none"
                                value={formData.parts_replaced}
                                onChange={(e) => handleInputChange('parts_replaced', e.target.value)}
                                placeholder="列出更换的零部件名称和型号..."
                            />
                        </div>

                        <div>
                            <label className="label mb-0.5">
                                <span className="label-text font-medium border-l-4 border-info pl-3">备注说明</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full h-20 resize-none"
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                placeholder="其他需要备注的信息..."
                            />
                        </div>
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="modal-action">
                    <button
                        className="btn btn-ghost"
                        onClick={onCancel}
                    >
                        取消
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        <span className="mr-1">💾</span>
                        创建维修记录
                    </button>
                </div>
            </div>
        </div>
    );
} 