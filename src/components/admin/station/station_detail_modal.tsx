import type { StationDetailEntity } from '../../../models/entity/station_entity';

/**
 * # 站点详情模态框组件属性接口
 */
interface StationDetailModalProps {
    /** 关闭模态框回调 */
    onClose: () => void;
    /** 站点详情数据 */
    station: StationDetailEntity;
}

/**
 * # 站点详情模态框组件
 * 用于展示站点的详细信息
 */
export function StationDetailModal({
    onClose,
    station
}: StationDetailModalProps) {

    /**
     * 格式化状态显示
     */
    const formatStatus = (status: number) => {
        return status === 1 ? (
            <div className="badge badge-success">启用</div>
        ) : (
            <div className="badge badge-error">停用</div>
        );
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">站点详细信息</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                <div className="space-y-6">
                    {/* 基本信息 */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h4 className="card-title text-lg mb-4 flex items-center">
                                <span className="mr-2">🚏</span>基本信息
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">站点名称</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg">
                                        {station.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">站点编码</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg font-mono">
                                        {station.code}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">运营状态</span>
                                    </label>
                                    <div className="p-3">
                                        {formatStatus(station.status)}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">站点地址</span>
                                </label>
                                <div className="bg-base-100 p-3 rounded-lg">
                                    {station.address}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 位置信息 */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h4 className="card-title text-lg mb-4 flex items-center">
                                <span className="mr-2">📍</span>位置信息
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">经度</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg font-mono">
                                        {station.longitude.toFixed(6)}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">纬度</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg font-mono">
                                        {station.latitude.toFixed(6)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 时间信息 */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h4 className="card-title text-lg mb-4 flex items-center">
                                <span className="mr-2">⏰</span>时间信息
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">创建时间</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg">
                                        {new Date(station.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">更新时间</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg">
                                        {new Date(station.updated_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="modal-action">
                    <button
                        className="btn btn-primary"
                        onClick={onClose}
                    >
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
} 