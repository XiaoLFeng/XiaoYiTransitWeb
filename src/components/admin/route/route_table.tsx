import type { RouteListItemEntity } from '../../../models/entity/route_entity';

interface RouteTableProps {
    routes: RouteListItemEntity[];
    total: number;
    currentPage: number;
    pageSize: number;
    loading: boolean;
    onEdit: (route: RouteListItemEntity) => void;
    onDelete: (routeUuid: string, routeName: string) => void;
    onViewDetail: (routeUuid: string) => void;
    onViewStations: (routeUuid: string) => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

/**
 * # 线路表格组件
 * 展示线路列表，支持操作和分页
 */
export function RouteTable({
    routes,
    total,
    currentPage,
    pageSize,
    loading,
    onEdit,
    onDelete,
    onViewDetail,
    onViewStations,
    onPageChange,
    onPageSizeChange
}: RouteTableProps) {
    /**
     * 格式化运营状态
     */
    const formatStatus = (status: 0 | 1) => {
        return status === 1 ? (
            <span className="badge badge-success">运营中</span>
        ) : (
            <span className="badge badge-error">停运</span>
        );
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

    /**
     * 计算总页数
     */
    const totalPages = Math.ceil(total / pageSize);

    /**
     * 生成分页按钮
     */
    const renderPagination = () => {
        const pages = [];
        const showPages = 5;
        const startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
        const endPage = Math.min(totalPages, startPage + showPages - 1);

        // 上一页
        pages.push(
            <button
                key="prev"
                className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : 'btn-outline'}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ‹
            </button>
        );

        // 页码按钮
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            );
        }

        // 下一页
        pages.push(
            <button
                key="next"
                className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : 'btn-outline'}`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                ›
            </button>
        );

        return pages;
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="card-title text-lg">
                        <span className="text-primary">🚌</span>
                        线路列表
                        {total > 0 && (
                            <span className="badge badge-primary badge-lg ml-2">
                                {total}
                            </span>
                        )}
                    </h3>
                    
                    {/* 每页显示数量选择 */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-base-content/70">每页显示</span>
                        <select
                            className="select select-sm select-bordered"
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-sm text-base-content/70">条</span>
                    </div>
                </div>

                {/* 表格 */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>线路编号</th>
                                <th>线路名称</th>
                                <th>起点站</th>
                                <th>终点站</th>
                                <th>距离</th>
                                <th>票价</th>
                                <th>运营时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-8">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                        <div className="mt-2 text-base-content/60">加载中...</div>
                                    </td>
                                </tr>
                            ) : routes.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-8">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <div className="text-base-content/60">暂无线路数据</div>
                                    </td>
                                </tr>
                            ) : (
                                routes.map((route) => (
                                    <tr key={route.route_uuid} className="hover">
                                        <td>
                                            <div className="font-medium text-primary">
                                                {route.route_number}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-medium">
                                                {route.name}
                                            </div>
                                        </td>
                                        <td>{route.start_station}</td>
                                        <td>{route.end_station}</td>
                                        <td>{formatDistance(route.distance)}</td>
                                        <td>{formatFare(route.fare)}</td>
                                        <td>
                                            <div className="text-sm">
                                                {route.operation_hours || '暂无'}
                                            </div>
                                        </td>
                                        <td>{formatStatus(route.status)}</td>
                                        <td>
                                            <div className="flex gap-1">
                                                {/* 查看详情 */}
                                                <button
                                                    className="btn btn-ghost btn-xs"
                                                    onClick={() => onViewDetail(route.route_uuid)}
                                                    title="查看详情"
                                                >
                                                    👁️
                                                </button>
                                                
                                                {/* 查看站点 */}
                                                <button
                                                    className="btn btn-ghost btn-xs"
                                                    onClick={() => onViewStations(route.route_uuid)}
                                                    title="查看站点"
                                                >
                                                    🗺️
                                                </button>
                                                
                                                {/* 编辑 */}
                                                <button
                                                    className="btn btn-ghost btn-xs"
                                                    onClick={() => onEdit(route)}
                                                    title="编辑线路"
                                                >
                                                    ✏️
                                                </button>
                                                
                                                {/* 删除 */}
                                                <button
                                                    className="btn btn-ghost btn-xs text-error"
                                                    onClick={() => onDelete(route.route_uuid, route.name)}
                                                    title="删除线路"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 分页 */}
                {!loading && routes.length > 0 && totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-base-content/60">
                            显示第 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, total)} 条，共 {total} 条记录
                        </div>
                        <div className="join">
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 