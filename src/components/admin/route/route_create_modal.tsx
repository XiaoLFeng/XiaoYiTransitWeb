import type { CreateRouteDTO } from '../../../models/dto/route_dto';

interface RouteCreateModalProps {
    formData: CreateRouteDTO;
    setFormData: (data: CreateRouteDTO) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * # 创建线路模态框组件
 * 用于显示创建新线路的表单
 */
export function RouteCreateModal({ formData, setFormData, onConfirm, onCancel }: RouteCreateModalProps) {
    const handleInputChange = (field: keyof CreateRouteDTO, value: string | number) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSubmit = () => {
        // 验证必填字段
        if (!formData.route_number.trim()) {
            alert('请输入线路编号');
            return;
        }
        
        if (!formData.name.trim()) {
            alert('请输入线路名称');
            return;
        }
        
        if (!formData.start_station.trim()) {
            alert('请输入起始站点');
            return;
        }
        
        if (!formData.end_station.trim()) {
            alert('请输入终点站点');
            return;
        }
        
        if (!formData.fare || formData.fare <= 0) {
            alert('请输入有效的票价');
            return;
        }
        
        onConfirm();
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">添加新线路</h3>
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
                                    <span className="label-text font-medium border-l-4 border-error pl-3">线路编号</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.route_number}
                                    onChange={(e) => handleInputChange('route_number', e.target.value)}
                                    placeholder="请输入线路编号，如：001"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">线路名称</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="请输入线路名称，如：市中心环线"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">起始站点</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.start_station}
                                    onChange={(e) => handleInputChange('start_station', e.target.value)}
                                    placeholder="请输入起始站点名称"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">终点站点</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.end_station}
                                    onChange={(e) => handleInputChange('end_station', e.target.value)}
                                    placeholder="请输入终点站点名称"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">票价 (元)</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    className="input input-bordered w-full"
                                    value={formData.fare}
                                    onChange={(e) => handleInputChange('fare', parseFloat(e.target.value) || 0)}
                                    placeholder="2.0"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">运营状态</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', parseInt(e.target.value) as 0 | 1)}
                                >
                                    <option value={1}>运营中</option>
                                    <option value={0}>停运</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 运营信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">⏰</span>运营信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">线路长度 (km)</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    className="input input-bordered w-full"
                                    value={formData.distance || ''}
                                    onChange={(e) => handleInputChange('distance', parseFloat(e.target.value) || 0)}
                                    placeholder="0.0"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">运营时间</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.operation_hours || ''}
                                    onChange={(e) => handleInputChange('operation_hours', e.target.value)}
                                    placeholder="如：06:00-22:00"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">发车频率</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.frequency || ''}
                                    onChange={(e) => handleInputChange('frequency', e.target.value)}
                                    placeholder="如：5-10分钟"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">备注</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-32 w-full"
                                    value={formData.notes || ''}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                    placeholder="请输入备注信息..."
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
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        确认添加
                    </button>
                </div>
            </div>
        </div>
    );
} 