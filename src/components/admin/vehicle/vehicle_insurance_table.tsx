import type { VehicleInsuranceListItemEntity } from '../../../models/entity/vehicle_entity';

interface VehicleInsuranceTableProps {
    insurances: VehicleInsuranceListItemEntity[];
    total: number;
    currentPage: number;
    pageSize: number;
    loading: boolean;
    onEdit: (insurance: VehicleInsuranceListItemEntity) => void;
    onDelete: (insuranceUuid: string, insuranceType: string) => void;
    onViewDetail: (insurance: VehicleInsuranceListItemEntity) => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

/**
 * # 车辆保险列表表格组件
 */
export function VehicleInsuranceTable({
    insurances,
    total,
    currentPage,
    pageSize,
    loading,
    onEdit,
    onDelete,
    onViewDetail,
    onPageChange,
    onPageSizeChange
}: VehicleInsuranceTableProps) {
    /**
     * 格式化日期
     */
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('zh-CN');
    };

    /**
     * 格式化价格
     */
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

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="card-title">保险记录列表</h3>
                    <div className="text-sm text-base-content/60">
                        共 {total} 条记录，第 {currentPage} 页
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        {/* 表格 */}
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>车牌号</th>
                                        <th>保险类型</th>
                                        <th>保险公司</th>
                                        <th>保单号</th>
                                        <th>生效日期</th>
                                        <th>到期日期</th>
                                        <th>保费</th>
                                        <th>保额</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {insurances.length > 0 ? (
                                        insurances.map((insurance) => {
                                            const expiringSoon = isExpiringSoon(insurance.end_date);
                                            const expired = isExpired(insurance.end_date);
                                            
                                            return (
                                                <tr key={insurance.insurance_uuid}>
                                                    <td className="font-medium text-primary">{insurance.plate_number}</td>
                                                    <td>
                                                        <span className="badge badge-outline">{insurance.insurance_type}</span>
                                                    </td>
                                                    <td>{insurance.insurance_company}</td>
                                                    <td className="font-mono text-sm">{insurance.policy_number}</td>
                                                    <td>{formatDate(insurance.start_date)}</td>
                                                    <td>
                                                        <div className="flex items-center space-x-2">
                                                            <span className={expired ? 'text-error' : expiringSoon ? 'text-warning' : ''}>
                                                                {formatDate(insurance.end_date)}
                                                            </span>
                                                            {expired && <span className="badge badge-error badge-xs">已过期</span>}
                                                            {!expired && expiringSoon && <span className="badge badge-warning badge-xs">即将到期</span>}
                                                        </div>
                                                    </td>
                                                    <td className="text-success font-medium">{formatPrice(insurance.premium)}</td>
                                                    <td className="text-info font-medium">{formatPrice(insurance.coverage_amount)}</td>
                                                    <td>
                                                        <div className="flex space-x-1">
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onViewDetail(insurance)}
                                                                title="查看详情"
                                                            >
                                                                👁️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onEdit(insurance)}
                                                                title="编辑"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs text-error"
                                                                onClick={() => onDelete(insurance.insurance_uuid, insurance.insurance_type)}
                                                                title="删除"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center text-base-content/60 py-8">
                                                暂无数据
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* 分页 */}
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm">每页显示</span>
                                <select 
                                    className="select select-bordered select-sm"
                                    value={pageSize}
                                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                                <span className="text-sm">条</span>
                            </div>

                            <div className="join">
                                <button 
                                    className="join-item btn btn-sm"
                                    disabled={currentPage <= 1}
                                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                >
                                    上一页
                                </button>
                                <button className="join-item btn btn-sm">
                                    {currentPage} / {Math.ceil(total / pageSize) || 1}
                                </button>
                                <button 
                                    className="join-item btn btn-sm"
                                    disabled={currentPage >= Math.ceil(total / pageSize)}
                                    onClick={() => onPageChange(currentPage + 1)}
                                >
                                    下一页
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 