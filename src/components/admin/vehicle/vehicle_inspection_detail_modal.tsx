import type { VehicleInspectionDetailEntity } from '../../../models/entity/vehicle_entity';

interface VehicleInspectionDetailModalProps {
    inspection: VehicleInspectionDetailEntity;
    onClose: () => void;
}

/**
 * # 年检结果状态选项
 */
const INSPECTION_RESULT_OPTIONS = [
    { value: 1, label: '合格', color: 'badge-success' },
    { value: 2, label: '不合格', color: 'badge-error' },
];

/**
 * # 车辆年检详情模态框组件
 */
export function VehicleInspectionDetailModal({ inspection, onClose }: VehicleInspectionDetailModalProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('zh-CN');
    };

    const formatPrice = (price?: number) => {
        if (price === undefined || price === null) return '-';
        return `￥${price.toLocaleString('zh-CN')}`;
    };

    /**
     * 获取年检结果显示
     */
    const getResultDisplay = (result: number) => {
        const option = INSPECTION_RESULT_OPTIONS.find(opt => opt.value === result);
        return option ? { label: option.label, color: option.color } : { label: result, color: 'badge-neutral' };
    };

    /**
     * 检查年检是否即将到期（30天内）
     */
    const isInspectionDue = (nextDate?: string) => {
        if (!nextDate) return false;
        const next = new Date(nextDate);
        const now = new Date();
        const diffDays = (next.getTime() - now.getTime()) / (1000 * 3600 * 24);
        return diffDays > 0 && diffDays <= 30;
    };

    /**
     * 检查年检是否已过期
     */
    const isInspectionOverdue = (nextDate?: string) => {
        if (!nextDate) return false;
        const next = new Date(nextDate);
        const now = new Date();
        return next.getTime() < now.getTime();
    };

    const resultDisplay = getResultDisplay(inspection.inspection_result);
    const inspectionDue = isInspectionDue(inspection.expiry_date);
    const inspectionOverdue = isInspectionOverdue(inspection.expiry_date);

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">{inspection.plate_number} - 年检详情</h3>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className="text-sm opacity-60">年检日期: {formatDate(inspection.inspection_date)}</span>
                            <span className={`badge ${resultDisplay.color}`}>{resultDisplay.label}</span>
                            {inspectionOverdue && <span className="badge badge-error">已超期</span>}
                            {!inspectionOverdue && inspectionDue && <span className="badge badge-warning">即将到期</span>}
                        </div>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                {/* 详情内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 年检信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🔍</span>年检信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">车牌号</span>
                                <span className="font-bold text-primary">{inspection.plate_number}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">年检日期</span>
                                <span>{formatDate(inspection.inspection_date)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">年检结果</span>
                                <span className={`badge ${resultDisplay.color}`}>
                                    {resultDisplay.label}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">检测机构</span>
                                <span>{inspection.inspection_agency}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">年检费用</span>
                                <span className="font-bold text-success">{formatPrice(inspection.cost)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">下次年检</span>
                                <div className="flex items-center space-x-2">
                                    <span className={inspectionOverdue ? 'text-error' : inspectionDue ? 'text-warning' : ''}>
                                        {formatDate(inspection.expiry_date)}
                                    </span>
                                    {inspectionOverdue && <span className="badge badge-error badge-xs">已超期</span>}
                                    {!inspectionOverdue && inspectionDue && <span className="badge badge-warning badge-xs">即将到期</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 年检状态 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">📅</span>年检状态
                        </h4>
                        <div className="space-y-4">
                            <div className="stat bg-base-200 rounded-lg p-4">
                                <div className="stat-title">年检周期</div>
                                <div className="stat-value text-sm">
                                    {formatDate(inspection.inspection_date)} 至 {formatDate(inspection.expiry_date)}
                                </div>
                                <div className="stat-desc">
                                    {inspection.inspection_result === 1 ? '本次年检合格' : inspection.inspection_result === 2 ? '本次年检不合格' : '待检'}
                                </div>
                            </div>
                            
                            <div className="stat bg-base-200 rounded-lg p-4">
                                <div className="stat-title">距下次年检</div>
                                <div className={`stat-value text-2xl ${inspectionOverdue ? 'text-error' : inspectionDue ? 'text-warning' : 'text-success'}`}>
                                    {inspection.expiry_date ? 
                                        Math.max(0, Math.ceil((new Date(inspection.expiry_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))) 
                                        : '-'
                                    } 天
                                </div>
                                <div className="stat-desc">
                                    {inspectionOverdue ? (
                                        <span className="text-error">年检已超期，请尽快年检</span>
                                    ) : inspectionDue ? (
                                        <span className="text-warning">年检即将到期，请提前安排</span>
                                    ) : (
                                        <span className="text-success">年检状态正常</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 年检时间线 */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="mr-2">⏱️</span>年检时间线
                    </h4>
                    <div className="timeline">
                        <div className="timeline-start">上次年检</div>
                        <div className="timeline-middle">
                            <div className={`w-4 h-4 rounded-full ${resultDisplay.color.includes('success') ? 'bg-success' : resultDisplay.color.includes('error') ? 'bg-error' : 'bg-warning'}`}></div>
                        </div>
                        <div className="timeline-end timeline-box">
                            <div className="font-bold">{formatDate(inspection.inspection_date)}</div>
                            <div className="text-sm opacity-60">{inspection.inspection_agency}</div>
                            <div className={`badge ${resultDisplay.color} badge-sm mt-1`}>
                                {resultDisplay.label}
                            </div>
                        </div>
                        <hr className={inspectionOverdue ? 'bg-error' : inspectionDue ? 'bg-warning' : 'bg-success'} />
                        <div className="timeline-start">下次年检</div>
                        <div className="timeline-middle">
                            <div className={`w-4 h-4 rounded-full ${inspectionOverdue ? 'bg-error' : inspectionDue ? 'bg-warning' : 'bg-success'}`}></div>
                        </div>
                        <div className="timeline-end timeline-box">
                            <div className="font-bold">{formatDate(inspection.expiry_date)}</div>
                            <div className={`text-sm ${inspectionOverdue ? 'text-error' : inspectionDue ? 'text-warning' : 'text-success'}`}>
                                {inspectionOverdue ? '已超期' : inspectionDue ? '即将到期' : '正常'}
                            </div>
                        </div>
                    </div>
                </div>

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