import type { VehicleInsuranceDetailEntity } from '../../../models/entity/vehicle_entity';

interface VehicleInsuranceDetailModalProps {
    insurance: VehicleInsuranceDetailEntity;
    onClose: () => void;
}

/**
 * # 车辆保险详情模态框组件
 */
export function VehicleInsuranceDetailModal({ insurance, onClose }: VehicleInsuranceDetailModalProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('zh-CN');
    };

    const formatPrice = (price?: number) => {
        if (price === undefined || price === null) return '-';
        return `￥${price.toLocaleString('zh-CN')}`;
    };

    /**
     * 检查保险是否即将到期（30天内）
     */
    const isExpiringSoon = (endDate?: string) => {
        if (!endDate) return false;
        const end = new Date(endDate);
        const now = new Date();
        const diffDays = (end.getTime() - now.getTime()) / (1000 * 3600 * 24);
        return diffDays > 0 && diffDays <= 30;
    };

    /**
     * 检查保险是否已过期
     */
    const isExpired = (endDate?: string) => {
        if (!endDate) return false;
        const end = new Date(endDate);
        const now = new Date();
        return end.getTime() < now.getTime();
    };

    const expiringSoon = isExpiringSoon(insurance.end_date);
    const expired = isExpired(insurance.end_date);

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">{insurance.plate_number} - 保险详情</h3>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className="text-sm opacity-60">保险类型: {insurance.insurance_type}</span>
                            <span className="badge badge-outline">{insurance.insurance_company}</span>
                            {expired && <span className="badge badge-error">已过期</span>}
                            {!expired && expiringSoon && <span className="badge badge-warning">即将到期</span>}
                        </div>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                {/* 详情内容 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🛡️</span>保险信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">车牌号</span>
                                <span className="font-bold text-primary">{insurance.plate_number}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">保险类型</span>
                                <span className="badge badge-outline">{insurance.insurance_type}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">保险公司</span>
                                <span>{insurance.insurance_company}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">保单号</span>
                                <span className="font-mono text-sm">{insurance.policy_number}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">生效日期</span>
                                <span>{formatDate(insurance.start_date)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="font-medium">到期日期</span>
                                <div className="flex items-center space-x-2">
                                    <span className={expired ? 'text-error' : expiringSoon ? 'text-warning' : ''}>
                                        {formatDate(insurance.end_date)}
                                    </span>
                                    {expired && <span className="badge badge-error badge-xs">已过期</span>}
                                    {!expired && expiringSoon && <span className="badge badge-warning badge-xs">即将到期</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 费用信息 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">💰</span>费用信息
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">保费</span>
                                <span className="font-bold text-success text-lg">{formatPrice(insurance.premium)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-base-200">
                                <span className="font-medium">保额</span>
                                <span className="font-bold text-info text-lg">{formatPrice(insurance.coverage_amount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 保险期限状态 */}
                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="mr-2">📅</span>保险状态
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="stat bg-base-200 rounded-lg">
                            <div className="stat-title">保险期限</div>
                            <div className="stat-value text-sm">
                                {formatDate(insurance.start_date)} 至 {formatDate(insurance.end_date)}
                            </div>
                        </div>
                        
                        <div className="stat bg-base-200 rounded-lg">
                            <div className="stat-title">剩余天数</div>
                            <div className={`stat-value text-2xl ${expired ? 'text-error' : expiringSoon ? 'text-warning' : 'text-success'}`}>
                                {insurance.end_date ? 
                                    Math.max(0, Math.ceil((new Date(insurance.end_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))) 
                                    : '-'
                                } 天
                            </div>
                        </div>
                        
                        <div className="stat bg-base-200 rounded-lg">
                            <div className="stat-title">状态</div>
                            <div className="stat-value text-lg">
                                {expired ? (
                                    <span className="text-error">已过期</span>
                                ) : expiringSoon ? (
                                    <span className="text-warning">即将到期</span>
                                ) : (
                                    <span className="text-success">正常</span>
                                )}
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