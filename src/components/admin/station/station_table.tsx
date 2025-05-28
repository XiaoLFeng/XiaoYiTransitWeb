import type { StationListItemEntity } from '../../../models/entity/station_entity';

/**
 * # 站点表格组件属性接口
 */
interface StationTableProps {
    /** 站点列表数据 */
    stations: StationListItemEntity[];
    /** 总数 */
    total: number;
    /** 当前页码 */
    currentPage: number;
    /** 每页大小 */
    pageSize: number;
    /** 加载状态 */
    loading: boolean;
    /** 编辑回调 */
    onEdit: (station: StationListItemEntity) => void;
    /** 删除回调 */
    onDelete: (stationUuid: string, stationName: string) => void;
    /** 查看详情回调 */
    onViewDetail: (stationUuid: string) => void;
    /** 页码变化回调 */
    onPageChange: (page: number) => void;
    /** 页面大小变化回调 */
    onPageSizeChange: (size: number) => void;
}

/**
 * # 站点表格组件
 * 展示站点列表，支持操作和分页
 */
export function StationTable({
    stations,
    total,
    currentPage,
    pageSize,
    loading,
    onEdit,
    onDelete,
    onViewDetail,
    onPageChange,
    onPageSizeChange
}: StationTableProps) {
    
    /**
     * 格式化状态显示
     */
    const formatStatus = (status: number) => {
        return status === 1 ? (
            <span className="badge badge-success">启用</span>
        ) : (
            <span className="badge badge-error">停用</span>
        );
    };

    /**
     * 格式化坐标显示
     */
    const formatCoordinate = (longitude: number, latitude: number) => {
        return (
            <div className="text-sm">
                <div>经度: {longitude.toFixed(6)}</div>
                <div>纬度: {latitude.toFixed(6)}</div>
            </div>
        );
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
                        <span className="text-primary">🚏</span>
                        站点列表
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
                                <th>站点名称</th>
                                <th>站点编码</th>
                                <th>地址</th>
                                <th>坐标</th>
                                <th>状态</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8">
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                        <div className="mt-2 text-base-content/60">加载中...</div>
                                    </td>
                                </tr>
                            ) : stations.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <div className="text-base-content/60">暂无站点数据</div>
                                    </td>
                                </tr>
                            ) : (
                                stations.map((station) => (
                                    <tr key={station.station_uuid} className="hover">
                                        <td>
                                            <div className="font-medium text-primary">
                                                {station.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-mono text-sm">
                                                {station.code}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="max-w-xs truncate" title={station.address}>
                                                {station.address}
                                            </div>
                                        </td>
                                        <td>
                                            {formatCoordinate(station.longitude, station.latitude)}
                                        </td>
                                        <td>
                                            {formatStatus(station.status)}
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                {new Date(station.created_at).toLocaleString()}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-1">
                                                {/* 查看详情 */}
                                                <button
                                                    className="btn btn-ghost btn-xs"
                                                    onClick={() => onViewDetail(station.station_uuid)}
                                                    title="查看详情"
                                                >
                                                    👁️
                                                </button>
                                                {/* 编辑 */}
                                                <button
                                                    className="btn btn-ghost btn-xs"
                                                    onClick={() => onEdit(station)}
                                                    title="编辑"
                                                >
                                                    ✏️
                                                </button>
                                                {/* 删除 */}
                                                <button
                                                    className="btn btn-ghost btn-xs text-error"
                                                    onClick={() => onDelete(station.station_uuid, station.name)}
                                                    title="删除"
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

                {/* 分页器 */}
                {!loading && total > 0 && (
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-base-content/70">
                            显示第 {(currentPage - 1) * pageSize + 1} 到{' '}
                            {Math.min(currentPage * pageSize, total)} 条，共 {total} 条记录
                        </div>
                        
                        <div className="flex gap-1">
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 