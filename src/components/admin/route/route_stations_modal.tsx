import type { RouteStationsEntity } from '../../../models/entity/route_entity';

interface RouteStationsModalProps {
    routeStations: RouteStationsEntity;
    onClose: () => void;
}

/**
 * # 线路站点模态框组件
 * 用于显示线路的站点列表
 */
export function RouteStationsModal({ routeStations, onClose }: RouteStationsModalProps) {
    /**
     * 格式化距离
     */
    const formatDistance = (distance: number) => {
        return `${distance.toFixed(1)} km`;
    };

    /**
     * 格式化时间
     */
    const formatTime = (minutes: number) => {
        return `${minutes} 分钟`;
    };

    const stations = routeStations.stations.sort((a, b) => a.sequence - b.sequence);
    const totalDistance = stations.length > 0 ? Math.max(...stations.map(s => s.distance_from_start)) : 0;
    const totalTime = stations.length > 0 ? Math.max(...stations.map(s => s.estimated_time)) : 0;

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-base-100 pt-4">
                    <div>
                        <h3 className="text-xl font-bold">线路站点信息</h3>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className="badge badge-primary badge-lg">
                                {stations.length} 个站点
                            </span>
                            <span className="badge badge-success badge-outline">
                                总距离: {formatDistance(totalDistance)}
                            </span>
                            <span className="badge badge-warning badge-outline">
                                总用时: {formatTime(totalTime)}
                            </span>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                {/* 空状态 */}
                {stations.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🚏</div>
                        <h4 className="text-lg font-semibold mb-2">该线路暂无站点信息</h4>
                        <p className="text-base-content/60">请联系管理员添加站点信息</p>
                    </div>
                ) : (
                    <>
                        {/* 站点列表 */}
                        <div className="space-y-3">
                            {stations.map((station, index) => (
                                <div key={station.route_station_uuid} className="card bg-base-200 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="badge badge-primary badge-lg">
                                                    第 {station.sequence} 站
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-lg">{station.name}</h5>
                                                    <p className="text-sm text-base-content/70">{station.code || '暂无编码'}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <div className="badge badge-outline">
                                                    {formatDistance(station.distance_from_start)}
                                                </div>
                                                <div className="badge badge-info badge-outline">
                                                    {formatTime(station.estimated_time)}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* 站点详细信息 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-base-300">
                                            <div>
                                                <span className="text-sm font-medium text-base-content/70">站点地址:</span>
                                                <p className="text-sm mt-1">{station.address || '暂无地址信息'}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-base-content/70">坐标位置:</span>
                                                <p className="text-xs font-mono mt-1">
                                                    经度: {station.longitude.toFixed(6)}<br />
                                                    纬度: {station.latitude.toFixed(6)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* 连接线 */}
                                        {index < stations.length - 1 && (
                                            <div className="flex justify-center mt-2">
                                                <div className="text-2xl text-primary">↓</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 统计信息卡片 */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="stat bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                                <div className="stat-figure text-primary">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="stat-title">总站点数</div>
                                <div className="stat-value text-primary">{stations.length}</div>
                                <div className="stat-desc">个停靠站点</div>
                            </div>
                            
                            <div className="stat bg-gradient-to-r from-success/10 to-success/5 rounded-lg border border-success/20">
                                <div className="stat-figure text-success">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="stat-title">总距离</div>
                                <div className="stat-value text-success">{formatDistance(totalDistance)}</div>
                                <div className="stat-desc">线路全长</div>
                            </div>
                            
                            <div className="stat bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg border border-warning/20">
                                <div className="stat-figure text-warning">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="stat-title">总用时</div>
                                <div className="stat-value text-warning">{formatTime(totalTime)}</div>
                                <div className="stat-desc">预计行程时间</div>
                            </div>
                        </div>
                    </>
                )}

                {/* 底部按钮 */}
                <div className="modal-action sticky bottom-0 bg-base-100 pt-4">
                    <button className="btn btn-primary" onClick={onClose}>
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
} 