import type { CreateStationDTO } from '../../../models/dto/station_dto';

/**
 * # 站点创建模态框组件属性接口
 */
interface StationCreateModalProps {
    /** 表单数据 */
    formData: CreateStationDTO;
    /** 设置表单数据回调 */
    setFormData: (data: CreateStationDTO) => void;
    /** 确认回调 */
    onConfirm: () => void;
    /** 取消回调 */
    onCancel: () => void;
}

/**
 * # 站点创建模态框组件
 * 用于创建新的站点信息
 */
export function StationCreateModal({
    formData,
    setFormData,
    onConfirm,
    onCancel
}: StationCreateModalProps) {

    const handleInputChange = (field: keyof CreateStationDTO, value: string | number) => {
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
        if (!formData.name.trim()) {
            alert('请输入站点名称');
            return;
        }
        if (!formData.code.trim()) {
            alert('请输入站点编码');
            return;
        }
        if (!formData.address.trim()) {
            alert('请输入站点地址');
            return;
        }
        if (formData.longitude === 0 || formData.latitude === 0) {
            alert('请输入有效的经纬度坐标');
            return;
        }

        onConfirm();
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">添加新站点</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚏</span>基本信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">站点名称</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="请输入站点名称，如：火车站"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">站点编码</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.code}
                                    onChange={(e) => handleInputChange('code', e.target.value)}
                                    placeholder="请输入站点编码，如：ST001"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">站点地址</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="请输入站点详细地址"
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
                                    <option value={1}>启用</option>
                                    <option value={0}>停用</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 位置信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📍</span>位置信息
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">经度</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    className="input input-bordered w-full"
                                    value={formData.longitude || ''}
                                    onChange={(e) => handleInputChange('longitude', e.target.value ? parseFloat(e.target.value) : 0)}
                                    placeholder="如：116.397128"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/60">范围: -180 到 180</span>
                                </label>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">纬度</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    className="input input-bordered w-full"
                                    value={formData.latitude || ''}
                                    onChange={(e) => handleInputChange('latitude', e.target.value ? parseFloat(e.target.value) : 0)}
                                    placeholder="如：39.916527"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/60">范围: -90 到 90</span>
                                </label>
                            </div>
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
                        创建站点
                    </button>
                </div>
            </div>
        </div>
    );
} 