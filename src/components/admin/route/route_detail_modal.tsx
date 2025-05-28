import type { RouteDetailEntity } from '../../../models/entity/route_entity';

interface RouteDetailModalProps {
    route: RouteDetailEntity;
    onClose: () => void;
}

/**
 * # 线路详情模态框组件
 * 用于显示线路的详细信息
 */
export function RouteDetailModal({ route, onClose }: RouteDetailModalProps) {
    /**
     * 格式化运营状态
     */
    const getStatusDisplay = (status: 0 | 1) => {
        return status === 1 ? 
            { label: '运营中', color: 'badge-success' } : 
            { label: '停运', color: 'badge-error' };
    };

    /**
     * 格式化距离
     */
    const formatDistance = (distance: number) => {
        return `${distance.toFixed(1)} km`;
    };

    /**
     * 格式化票价
     */
    const formatFare = (fare: number) => {
        return `￥${fare.toFixed(2)}`;
    };

    const statusDisplay = getStatusDisplay(route.status);

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">{route.name} - 详细信息</h3>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className="text-sm opacity-60">线路编号: {route.route_number}</span>
                            <span className={`badge ${statusDisplay.color}`}>
                                {statusDisplay.label}
                            </span>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                {/* 详情内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🚌</span>基本信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">线路编号</span>
                                <span className="text-primary font-bold">{route.route_number}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">线路名称</span>
                                <span>{route.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">起始站点</span>
                                <span>{route.start_station}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">终点站点</span>
                                <span>{route.end_station}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">线路长度</span>
                                <span className="badge badge-outline">{formatDistance(route.distance)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">票价</span>
                                <span className="text-success font-bold">{formatFare(route.fare)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">运营状态</span>
                                <span className={`badge ${statusDisplay.color}`}>
                                    {statusDisplay.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 运营信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">⏰</span>运营信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">运营时间</span>
                                <span>{route.operation_hours || '暂无'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">发车频率</span>
                                <span>{route.frequency || '暂无'}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">线路UUID</span>
                                <span className="text-xs font-mono text-base-content/60 max-w-xs truncate">
                                    {route.route_uuid}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 途经站点 */}
                {route.stops && route.stops.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🗺️</span>途经站点
                            <span className="badge badge-primary ml-2">{route.stops.length} 个站点</span>
                        </h4>
                        <div className="bg-base-200 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {route.stops
                                    .sort((a, b) => a.sequence - b.sequence)
                                    .map((stop) => (
                                        <div key={stop.station_uuid} className="flex items-center gap-2 p-2 bg-base-100 rounded">
                                            <span className="badge badge-primary badge-sm">
                                                {stop.sequence}
                                            </span>
                                            <span className="text-sm">{stop.name}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 备注信息 */}
                {route.notes && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📝</span>备注信息
                        </h4>
                        <div className="bg-base-200 p-4 rounded-lg">
                            <p className="whitespace-pre-wrap">{route.notes}</p>
                        </div>
                    </div>
                )}

                {/* 底部按钮 */}
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={onClose}>
                        关闭
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
} 