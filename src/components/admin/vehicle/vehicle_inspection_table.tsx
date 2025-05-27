import type { VehicleInspectionListItemEntity } from '../../../models/entity/vehicle_entity';

interface VehicleInspectionTableProps {
    inspections: VehicleInspectionListItemEntity[];
    total: number;
    currentPage: number;
    pageSize: number;
    loading: boolean;
    onEdit: (inspection: VehicleInspectionListItemEntity) => void;
    onDelete: (inspectionUuid: string, inspectionDate: string) => void;
    onViewDetail: (inspection: VehicleInspectionListItemEntity) => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

/**
 * # 年检结果状态选项
 */
const INSPECTION_RESULT_OPTIONS = [
    { value: '合格', label: '合格', color: 'badge-success' },
    { value: '不合格', label: '不合格', color: 'badge-error' },
    { value: '待检', label: '待检', color: 'badge-warning' },
];

/**
 * # 车辆年检列表表格组件
 */
export function VehicleInspectionTable({
    inspections,
    total,
    currentPage,
    pageSize,
    loading,
    onEdit,
    onDelete,
    onViewDetail,
    onPageChange,
    onPageSizeChange
}: VehicleInspectionTableProps) {
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
     * 获取年检结果显示
     */
    const getResultDisplay = (result: string) => {
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

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="card-title">年检记录列表</h3>
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
                                        <th>年检日期</th>
                                        <th>年检结果</th>
                                        <th>检测机构</th>
                                        <th>下次年检</th>
                                        <th>费用</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inspections.length > 0 ? (
                                        inspections.map((inspection) => {
                                            const resultDisplay = getResultDisplay(inspection.result);
                                            const inspectionDue = isInspectionDue(inspection.next_inspection_date);
                                            const inspectionOverdue = isInspectionOverdue(inspection.next_inspection_date);
                                            
                                            return (
                                                <tr key={inspection.inspection_uuid}>
                                                    <td className="font-medium text-primary">{inspection.plate_number}</td>
                                                    <td>{formatDate(inspection.inspection_date)}</td>
                                                    <td>
                                                        <span className={`badge ${resultDisplay.color}`}>
                                                            {resultDisplay.label}
                                                        </span>
                                                    </td>
                                                    <td>{inspection.agency}</td>
                                                    <td>
                                                        <div className="flex items-center space-x-2">
                                                            <span className={inspectionOverdue ? 'text-error' : inspectionDue ? 'text-warning' : ''}>
                                                                {formatDate(inspection.next_inspection_date)}
                                                            </span>
                                                            {inspectionOverdue && <span className="badge badge-error badge-xs">已超期</span>}
                                                            {!inspectionOverdue && inspectionDue && <span className="badge badge-warning badge-xs">即将到期</span>}
                                                        </div>
                                                    </td>
                                                    <td className="text-success font-medium">{formatPrice(inspection.cost)}</td>
                                                    <td>
                                                        <div className="flex space-x-1">
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onViewDetail(inspection)}
                                                                title="查看详情"
                                                            >
                                                                👁️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onEdit(inspection)}
                                                                title="编辑"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs text-error"
                                                                onClick={() => onDelete(inspection.inspection_uuid, formatDate(inspection.inspection_date))}
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
                                            <td colSpan={7} className="text-center text-base-content/60 py-8">
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