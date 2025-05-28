import { useState } from 'react';
import type { AddRouteStationDTO } from '../../../models/dto/route_dto';

interface RouteAddStationModalProps {
    routeUuid: string;
    routeName: string;
    existingStations: Array<{ sequence: number; name: string; }>;
    onConfirm: (data: AddRouteStationDTO) => void;
    onCancel: () => void;
}

/**
 * # 线路添加站点模态框组件
 * 用于向线路添加新的站点
 */
export function RouteAddStationModal({ 
    routeUuid, 
    routeName, 
    existingStations,
    onConfirm, 
    onCancel 
}: RouteAddStationModalProps) {
    const [formData, setFormData] = useState<Omit<AddRouteStationDTO, 'route_uuid'>>({
        station_uuid: '',
        sequence: existingStations.length + 1,
        distance_from_start: 0,
        estimated_time: 0
    });

    const [stationInfo, setStationInfo] = useState({
        name: '',
        code: '',
        address: '',
        longitude: 0,
        latitude: 0
    });

    const handleInputChange = (field: keyof typeof formData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleStationInfoChange = (field: keyof typeof stationInfo, value: string | number) => {
        setStationInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // 验证必填字段
        if (!stationInfo.name.trim()) {
            alert('请输入站点名称');
            return;
        }
        
        if (formData.sequence <= 0) {
            alert('请输入有效的站点顺序');
            return;
        }
        
        if (formData.distance_from_start < 0) {
            alert('距起点距离不能为负数');
            return;
        }
        
        if (formData.estimated_time < 0) {
            alert('预计到达时间不能为负数');
            return;
        }

        // 检查序号是否已存在
        const sequenceExists = existingStations.some(station => station.sequence === formData.sequence);
        if (sequenceExists) {
            const confirmed = confirm(`站点顺序 ${formData.sequence} 已存在，确定要插入到这个位置吗？这将会调整其他站点的顺序。`);
            if (!confirmed) {
                return;
            }
        }

        // 生成临时的站点UUID（实际应用中可能需要先创建站点）
        const tempStationUuid = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const addStationData: AddRouteStationDTO = {
            route_uuid: routeUuid,
            station_uuid: tempStationUuid,
            sequence: formData.sequence,
            distance_from_start: formData.distance_from_start,
            estimated_time: formData.estimated_time
        };

        onConfirm(addStationData);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-3xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">添加站点到线路</h3>
                        <p className="text-sm text-base-content/60 mt-1">线路: {routeName}</p>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="space-y-6">
                    {/* 站点基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚏</span>站点信息
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">站点名称</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={stationInfo.name}
                                    onChange={(e) => handleStationInfoChange('name', e.target.value)}
                                    placeholder="请输入站点名称，如：市政府站"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">站点编码</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={stationInfo.code}
                                    onChange={(e) => handleStationInfoChange('code', e.target.value)}
                                    placeholder="如：S001"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">站点地址</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={stationInfo.address}
                                    onChange={(e) => handleStationInfoChange('address', e.target.value)}
                                    placeholder="请输入站点地址"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">经度</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    className="input input-bordered w-full"
                                    value={stationInfo.longitude || ''}
                                    onChange={(e) => handleStationInfoChange('longitude', parseFloat(e.target.value) || 0)}
                                    placeholder="116.397128"
                                />
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium">纬度</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    className="input input-bordered w-full"
                                    value={stationInfo.latitude || ''}
                                    onChange={(e) => handleStationInfoChange('latitude', parseFloat(e.target.value) || 0)}
                                    placeholder="39.916527"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 线路位置信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📍</span>线路位置
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
                                        当前已有 {existingStations.length} 个站点
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">距起点距离 (km)</span>
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
                                        从线路起点到此站点的距离
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">预计到达时间 (分钟)</span>
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
                                        从起点到此站点的预计时间
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* 现有站点预览 */}
                    {existingStations.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="mr-2">📋</span>现有站点
                                <span className="badge badge-primary ml-2">{existingStations.length} 个</span>
                            </h4>
                            <div className="bg-base-200 p-4 rounded-lg max-h-32 overflow-y-auto">
                                <div className="space-y-1">
                                    {existingStations
                                        .sort((a, b) => a.sequence - b.sequence)
                                        .map((station) => (
                                            <div key={station.sequence} className="flex items-center gap-2 text-sm">
                                                <span className="badge badge-primary badge-sm">
                                                    {station.sequence}
                                                </span>
                                                <span>{station.name}</span>
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
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        添加站点
                    </button>
                </div>
            </div>
        </div>
    );
} 