import { useState } from 'react';
import type { UpdateRouteStationDTO } from '../../../models/dto/route_dto';
import type { RouteStationItemEntity } from '../../../models/entity/route_entity';

interface RouteEditStationModalProps {
    station: RouteStationItemEntity;
    existingStations: Array<{ sequence: number; name: string; station_uuid: string; route_station_uuid: string; }>;
    onConfirm: (data: UpdateRouteStationDTO) => void;
    onCancel: () => void;
}

/**
 * # 线路站点编辑模态框组件
 * 用于编辑线路中现有站点的信息
 */
export function RouteEditStationModal({
    station,
    existingStations,
    onConfirm,
    onCancel
}: RouteEditStationModalProps) {
    // 表单数据状态
    const [formData, setFormData] = useState({
        route_station_uuid: station.route_station_uuid,
        sequence: station.sequence,
        distance_from_start: station.distance_from_start,
        estimated_time: station.estimated_time
    });

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // 验证必填字段
        if (formData.sequence <= 0) {
            alert('请输入有效的站点顺序');
            return;
        }

        if (formData.distance_from_start < 0) {
            alert('距上一站距离不能为负数');
            return;
        }

        if (formData.estimated_time < 0) {
            alert('从上一站用时不能为负数');
            return;
        }

        // 检查序号是否与其他站点冲突（排除当前站点）
        const otherStations = existingStations.filter(s => s.route_station_uuid !== station.route_station_uuid);
        const sequenceExists = otherStations.some(s => s.sequence === formData.sequence);
        if (sequenceExists) {
            const confirmed = confirm(`站点顺序 ${formData.sequence} 已被其他站点占用，确定要调整到这个位置吗？这将会影响其他站点的顺序。`);
            if (!confirmed) {
                return;
            }
        }

        const updateStationData: UpdateRouteStationDTO = {
            route_station_uuid: formData.route_station_uuid,
            sequence: Number(formData.sequence),
            distance_from_start: Number(formData.distance_from_start),
            estimated_time: Number(formData.estimated_time)
        };

        onConfirm(updateStationData);
    };

    return (
        <div className="modal modal-open" style={{ zIndex: 60 }}>
            <div className="modal-box w-11/12 max-w-3xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">编辑线路站点</h3>
                        <p className="text-sm text-base-content/60 mt-1">站点: {station.name} ({station.code})</p>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="space-y-6">
                    {/* 站点基本信息 (只读) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚏</span>站点信息
                        </h4>
                        <div className="bg-base-200 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-base-content/70">站点名称:</span>
                                    <p className="font-medium">{station.name}</p>
                                </div>
                                <div>
                                    <span className="text-base-content/70">站点编码:</span>
                                    <p className="font-medium">{station.code}</p>
                                </div>
                                <div>
                                    <span className="text-base-content/70">站点地址:</span>
                                    <p className="font-medium">{station.address || '暂无地址信息'}</p>
                                </div>
                                <div>
                                    <span className="text-base-content/70">坐标位置:</span>
                                    <p className="font-medium text-xs font-mono">
                                        {station.longitude.toFixed(6)}, {station.latitude.toFixed(6)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 线路位置信息 (可编辑) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📍</span>线路位置设置
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">站点顺序</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    className="input input-bordered w-full"
                                    value={formData.sequence}
                                    onChange={(e) => handleInputChange('sequence', parseInt(e.target.value) || 1)}
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/60">
                                        原顺序: {station.sequence}
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">距上一站距离 (km)</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    className="input input-bordered w-full"
                                    value={formData.distance_from_start}
                                    onChange={(e) => handleInputChange('distance_from_start', parseFloat(e.target.value) || 0)}
                                    placeholder="0.0"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/60">
                                        原距离: {station.distance_from_start} km
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">从上一站用时 (分钟)</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="input input-bordered w-full"
                                    value={formData.estimated_time}
                                    onChange={(e) => handleInputChange('estimated_time', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/60">
                                        原用时: {station.estimated_time} 分钟
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* 其他站点参考 */}
                    {existingStations.length > 1 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="mr-2">📋</span>其他站点参考
                                <span className="badge badge-primary ml-2">{existingStations.length - 1} 个</span>
                            </h4>
                            <div className="bg-base-200 p-4 rounded-lg max-h-32 overflow-y-auto">
                                <div className="space-y-1">
                                    {existingStations
                                        .filter(s => s.route_station_uuid !== station.route_station_uuid)
                                        .sort((a, b) => a.sequence - b.sequence)
                                        .map((otherStation) => (
                                            <div key={otherStation.route_station_uuid} className="flex items-center gap-2 text-sm">
                                                <span className="badge badge-primary badge-sm">
                                                    {otherStation.sequence}
                                                </span>
                                                <span>{otherStation.name}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 底部按钮 */}
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onCancel}>
                        取消
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        保存修改
                    </button>
                </div>
            </div>
        </div>
    );
} 