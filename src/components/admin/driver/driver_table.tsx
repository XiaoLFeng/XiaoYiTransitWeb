import { DriverStatus, DriverGender } from '../../../models/dto/driver_dto';
import type { DriverListItemEntity } from '../../../models/entity/driver_entity';

/**
 * # 司机状态选项
 */
const DRIVER_STATUS_OPTIONS = [
    { value: DriverStatus.ACTIVE, label: '在职', color: 'badge-success' },
    { value: DriverStatus.ON_LEAVE, label: '休假', color: 'badge-warning' },
    { value: DriverStatus.SUSPENDED, label: '停职', color: 'badge-error' },
    { value: DriverStatus.RESIGNED, label: '离职', color: 'badge-neutral' },
];

interface DriverTableProps {
    drivers: DriverListItemEntity[];
    total: number;
    currentPage: number;
    pageSize: number;
    loading: boolean;
    onEdit: (driver: DriverListItemEntity) => void;
    onDelete: (driverUuid: string, driverName: string) => void;
    onViewDetail: (driverUuid: string) => void;
    onViewSchedule: (driverUuid: string) => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

/**
 * # 司机列表表格组件
 */
export function DriverTable({
    drivers,
    total,
    currentPage,
    pageSize,
    loading,
    onEdit,
    onDelete,
    onViewDetail,
    onViewSchedule,
    onPageChange,
    onPageSizeChange
}: DriverTableProps) {
    /**
     * 获取状态显示
     */
    const getStatusDisplay = (status: DriverStatus) => {
        const option = DRIVER_STATUS_OPTIONS.find(opt => opt.value === status);
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
                    <h3 className="card-title">司机列表</h3>
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
                                        <th>工号</th>
                                        <th>姓名</th>
                                        <th>性别</th>
                                        <th>联系电话</th>
                                        <th>驾驶证号</th>
                                        <th>驾照到期</th>
                                        <th>状态</th>
                                        <th>入职日期</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drivers.length > 0 ? (
                                        drivers.map((driver) => {
                                            const statusDisplay = getStatusDisplay(driver.status);
                                            return (
                                                <tr key={driver.driver_uuid}>
                                                    <td className="font-medium">{driver.employee_id}</td>
                                                    <td>{driver.name}</td>
                                                    <td>{driver.gender === DriverGender.MALE ? '男' : '女'}</td>
                                                    <td>{driver.phone}</td>
                                                    <td className="font-mono text-sm">{driver.license_number}</td>
                                                    <td>{formatDate(driver.license_expiry_date)}</td>
                                                    <td>
                                                        <span className={`badge ${statusDisplay.color}`}>
                                                            {statusDisplay.label}
                                                        </span>
                                                    </td>
                                                    <td>{formatDate(driver.entry_date)}</td>
                                                    <td>
                                                        <div className="flex space-x-1">
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onViewDetail(driver.driver_uuid)}
                                                                title="查看详情"
                                                            >
                                                                👁️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onViewSchedule(driver.driver_uuid)}
                                                                title="查看排班"
                                                            >
                                                                📅
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs"
                                                                onClick={() => onEdit(driver)}
                                                                title="编辑"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button 
                                                                className="btn btn-ghost btn-xs text-error"
                                                                onClick={() => onDelete(driver.driver_uuid, driver.name)}
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