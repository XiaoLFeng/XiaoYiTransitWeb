import { VehicleStatus } from '../../../models/dto/vehicle_dto';
import type { VehicleListItemEntity } from '../../../models/entity/vehicle_entity';

/**
 * # 车辆状态选项
 */
const VEHICLE_STATUS_OPTIONS = [
    { value: VehicleStatus.OPERATING, label: '运营', color: 'badge-success' },
    { value: VehicleStatus.MAINTENANCE, label: '维修', color: 'badge-warning' },
    { value: VehicleStatus.OUT_OF_SERVICE, label: '停运', color: 'badge-error' },
    { value: VehicleStatus.SCRAPPED, label: '报废', color: 'badge-neutral' },
];

interface VehicleTableProps {
    vehicles: VehicleListItemEntity[];
    total: number;
    currentPage: number;
    pageSize: number;
    loading: boolean;
    onEdit: (vehicle: VehicleListItemEntity) => void;
    onDelete: (vehicleUuid: string, plateNumber: string) => void;
    onViewDetail: (vehicleUuid: string) => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

/**
 * # 车辆列表表格组件
 */
export function VehicleTable({
    vehicles,
    total,
    currentPage,
    pageSize,
    loading,
    onEdit,
    onDelete,
    onViewDetail,
    onPageChange,
    onPageSizeChange
}: VehicleTableProps) {
    /**
     * 获取状态显示
     */
    const getStatusDisplay = (status: VehicleStatus) => {
        const option = VEHICLE_STATUS_OPTIONS.find(opt => opt.value === status);
        return option ? { label: option.label, color: option.color } : { label: '未知', color: 'badge-neutral' };
    };

    /**
     * 格式化日期
     */
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('zh-CN');
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="card-title">车辆列表</h3>
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
                                        <th>型号</th>
                                        <th>制造商</th>
                                        <th>制造年份</th>
                                        <th>座位数</th>
                                        <th>状态</th>
                                        <th>购置日期</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.length > 0 ? (
                                        vehicles.map((vehicle) => {
                                            const statusDisplay = getStatusDisplay(vehicle.status);
                                            return (
                                                <tr key={vehicle.vehicle_uuid}>
                                                    <td className="font-medium text-primary">{vehicle.plate_number}</td>
                                                    <td>{vehicle.model}</td>
                                                    <td>{vehicle.manufacturer || '-'}</td>
                                                    <td>{vehicle.manufacture_year || '-'}</td>
                                                    <td>{vehicle.seats ? `${vehicle.seats}座` : '-'}</td>
                                                    <td>
                                                        <span className={`badge ${statusDisplay.color}`}>
                                                            {statusDisplay.label}
                                                        </span>
                                                    </td>
                                                    <td>{formatDate(vehicle.purchase_date)}</td>
                                                    <td>
                                                        <div className="flex space-x-1">
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onViewDetail(vehicle.vehicle_uuid)}
                                                                title="查看详情"
                                                            >
                                                                👁️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onEdit(vehicle)}
                                                                title="编辑"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs text-error"
                                                                onClick={() => onDelete(vehicle.vehicle_uuid, vehicle.plate_number)}
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
                                            <td colSpan={8} className="text-center text-base-content/60 py-8">
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