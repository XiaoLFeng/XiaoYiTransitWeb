import { useState, useEffect } from 'react';
import type { AddRouteStationDTO } from '../../../models/dto/route_dto';
import type { StationSimpleEntity } from '../../../models/entity/station_entity';
import { GetStationSimpleListAPI } from '../../../apis/station_api';

interface RouteAddStationModalProps {
    routeUuid: string;
    routeName: string;
    existingStations: Array<{ sequence: number; name: string; station_uuid: string; }>;
    onConfirm: (data: AddRouteStationDTO) => void;
    onCancel: () => void;
}

/**
 * # 线路添加站点模态框组件
 * 用于向线路添加现有的站点
 */
export function RouteAddStationModal({ 
    routeUuid, 
    routeName, 
    existingStations,
    onConfirm, 
    onCancel 
}: RouteAddStationModalProps) {
    // 表单数据状态
    const [formData, setFormData] = useState({
        station_uuid: '',
        sequence: existingStations.length + 1,
        distance_from_start: 0,
        estimated_time: 0
    });

    // 站点列表状态
    const [stations, setStations] = useState<StationSimpleEntity[]>([]);
    const [loadingStations, setLoadingStations] = useState(true);
    const [selectedStation, setSelectedStation] = useState<StationSimpleEntity | null>(null);

    // 获取可用站点列表
    useEffect(() => {
        const fetchStations = async () => {
            try {
                setLoadingStations(true);
                const response = await GetStationSimpleListAPI({ status: 1 }); // 只获取启用的站点
                
                if (response?.code === 200 && response.data?.stations) {
                    // 过滤掉已经添加到线路的站点
                    const existingStationUuids = existingStations.map(s => s.station_uuid);
                    const availableStations = response.data.stations.filter(
                        station => !existingStationUuids.includes(station.station_uuid)
                    );
                    setStations(availableStations);
                } else {
                    console.error('获取站点列表失败:', response?.message);
                    setStations([]);
                }
            } catch (error) {
                console.error('获取站点列表异常:', error);
                setStations([]);
            } finally {
                setLoadingStations(false);
            }
        };

        fetchStations();
    }, [existingStations]);

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleStationSelect = (stationUuid: string) => {
        const station = stations.find(s => s.station_uuid === stationUuid);
        setSelectedStation(station || null);
        handleInputChange('station_uuid', stationUuid);
    };

    const handleSubmit = () => {
        // 验证必填字段
        if (!formData.station_uuid) {
            alert('请选择要添加的站点');
            return;
        }
        
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

        // 检查序号是否已存在
        const sequenceExists = existingStations.some(station => station.sequence === formData.sequence);
        if (sequenceExists) {
            const confirmed = confirm(`站点顺序 ${formData.sequence} 已存在，确定要插入到这个位置吗？这将会调整其他站点的顺序。`);
            if (!confirmed) {
                return;
            }
        }

        const addStationData: AddRouteStationDTO = {
            route_uuid: routeUuid,
            station_uuid: formData.station_uuid,
            sequence: Number(formData.sequence),
            distance_from_start: Number(formData.distance_from_start),
            estimated_time: Number(formData.estimated_time)
        };

        onConfirm(addStationData);
    };

    return (
        <div className="modal modal-open" style={{ zIndex: 60 }}>
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">关联站点到线路</h3>
                        <p className="text-sm text-base-content/60 mt-1">线路: {routeName}</p>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onCancel}>✕</button>
                </div>

                {/* 表单内容 */}
                <div className="space-y-6">
                    {/* 选择站点 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚏</span>选择站点
                        </h4>
                        
                        {loadingStations ? (
                            <div className="flex items-center justify-center py-8">
                                <span className="loading loading-spinner loading-md"></span>
                                <span className="ml-2">正在加载站点列表...</span>
                            </div>
                        ) : stations.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-2">🚫</div>
                                <p className="text-base-content/60">暂无可用站点</p>
                                <p className="text-sm text-base-content/40 mt-1">所有站点都已添加到该线路</p>
                            </div>
                        ) : (
                            <div>
                                <label className="label mb-0.5">
                                    <span className="label-text font-medium border-l-4 border-error pl-3">选择站点</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.station_uuid}
                                    onChange={(e) => handleStationSelect(e.target.value)}
                                >
                                    <option value="">请选择要添加的站点</option>
                                    {stations.map((station) => (
                                        <option key={station.station_uuid} value={station.station_uuid}>
                                            {station.name} ({station.code})
                                        </option>
                                    ))}
                                </select>
                                
                                {/* 选中站点预览 */}
                                {selectedStation && (
                                    <div className="mt-3 p-3 bg-base-200 rounded-lg">
                                        <h5 className="font-semibold text-sm mb-2">选中站点预览</h5>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-base-content/70">站点名称：</span>
                                                <span className="font-medium">{selectedStation.name}</span>
                                            </div>
                                            <div>
                                                <span className="text-base-content/70">站点编码：</span>
                                                <span className="font-medium">{selectedStation.code}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
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
                                        从上一站点到此站点的距离，首站填0
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
                                        从上一站点到此站点的预计用时，首站填0
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
                    <button 
                        className="btn btn-primary" 
                        onClick={handleSubmit}
                        disabled={!formData.station_uuid || loadingStations}
                    >
                        关联站点
                    </button>
                </div>
            </div>
        </div>
    );
} 