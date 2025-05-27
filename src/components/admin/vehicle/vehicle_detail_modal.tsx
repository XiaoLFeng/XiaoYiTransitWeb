import { VehicleStatus } from '../../../models/dto/vehicle_dto';
import type { VehicleDetailEntity } from '../../../models/entity/vehicle_entity';

/**
 * # 车辆状态选项
 */
const VEHICLE_STATUS_OPTIONS = [
    { value: VehicleStatus.OPERATING, label: '运营', color: 'badge-success' },
    { value: VehicleStatus.MAINTENANCE, label: '维修', color: 'badge-warning' },
    { value: VehicleStatus.OUT_OF_SERVICE, label: '停运', color: 'badge-error' },
    { value: VehicleStatus.SCRAPPED, label: '报废', color: 'badge-neutral' },
];

interface VehicleDetailModalProps {
    vehicle: VehicleDetailEntity;
    onClose: () => void;
}

/**
 * # 车辆详情模态框组件
 */
export function VehicleDetailModal({ vehicle, onClose }: VehicleDetailModalProps) {
    const getStatusDisplay = (status: VehicleStatus) => {
        const option = VEHICLE_STATUS_OPTIONS.find(opt => opt.value === status);
        return option ? { label: option.label, color: option.color } : { label: '未知', color: 'badge-neutral' };
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('zh-CN');
    };

    const formatPrice = (price?: number) => {
        if (price === undefined || price === null) return '-';
        return `￥${price.toLocaleString('zh-CN')}`;
    };

    const statusDisplay = getStatusDisplay(vehicle.status);

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">{vehicle.plate_number} - 详细信息</h3>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className="text-sm opacity-60">型号: {vehicle.model}</span>
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
                                <span className="font-medium">车牌号</span>
                                <span className="font-bold text-primary">{vehicle.plate_number}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">车辆型号</span>
                                <span>{vehicle.model}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">制造商</span>
                                <span>{vehicle.manufacturer || '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">制造年份</span>
                                <span>{vehicle.manufacture_year ? `${vehicle.manufacture_year}年` : '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">座位数</span>
                                <span className="badge badge-outline">{vehicle.seat_count ? `${vehicle.seat_count}座` : '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">当前状态</span>
                                <span className={`badge ${statusDisplay.color}`}>
                                    {statusDisplay.label}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">购置日期</span>
                                <span>{formatDate(vehicle.purchase_date)}</span>
                            </div>
                        </div>
                    </div>

                    {/* 详细信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🔧</span>详细信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">发动机号</span>
                                <span className="font-mono text-sm">{vehicle.engine_number || '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">车架号</span>
                                <span className="font-mono text-sm">{vehicle.chassis_number || '-'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">购置价格</span>
                                <span className="font-bold text-success">{formatPrice(vehicle.purchase_price)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">创建时间</span>
                                <span className="text-sm">{formatDate(vehicle.created_at)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">更新时间</span>
                                <span className="text-sm">{formatDate(vehicle.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 备注信息 */}
                {vehicle.notes && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📝</span>备注信息
                        </h4>
                        <div className="bg-base-200 p-4 rounded-lg">
                            <p className="whitespace-pre-wrap">{vehicle.notes}</p>
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
        </div>
    );
} 