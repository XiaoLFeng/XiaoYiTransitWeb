import type { DriverScheduleEntity } from '../../../models/entity/driver_entity';

interface DriverScheduleModalProps {
    schedule: DriverScheduleEntity;
    onClose: () => void;
}

/**
 * # 司机排班模态框组件
 */
export function DriverScheduleModal({ schedule, onClose }: DriverScheduleModalProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('zh-CN');
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case '正常':
                return 'badge-success';
            case '迟到':
                return 'badge-warning';
            case '缺勤':
                return 'badge-error';
            default:
                return 'badge-info';
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">{schedule.driver_name} - 排班信息</h3>
                        <p className="text-sm opacity-60 mt-1">
                            排班期间：{formatDate(schedule.start_date)} 至 {formatDate(schedule.end_date)}
                        </p>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                {/* 排班统计 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">总排班天数</div>
                        <div className="stat-value text-primary">{schedule.shifts?.length || 0}</div>
                    </div>
                    
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">正常出勤</div>
                        <div className="stat-value text-success">
                            {schedule.shifts?.filter(s => s.status === '正常' || !s.status).length || 0}
                        </div>
                    </div>
                    
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">异常情况</div>
                        <div className="stat-value text-warning">
                            {schedule.shifts?.filter(s => s.status && s.status !== '正常').length || 0}
                        </div>
                    </div>
                    
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-title">出勤率</div>
                        <div className="stat-value text-info">
                            {schedule.shifts?.length ? 
                                Math.round((schedule.shifts.filter(s => s.status !== '缺勤').length / schedule.shifts.length) * 100) : 0}%
                        </div>
                    </div>
                </div>

                {/* 排班详情表格 */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="mr-2">📋</span>排班详情
                    </h4>
                    
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>日期</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>线路信息</th>
                                    <th>车辆信息</th>
                                    <th>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.shifts && schedule.shifts.length > 0 ? (
                                    schedule.shifts.map((shift, index) => (
                                        <tr key={index}>
                                            <td className="font-medium">{formatDate(shift.date)}</td>
                                            <td>
                                                <span className="font-mono text-sm">
                                                    {shift.start_time || '-'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="font-mono text-sm">
                                                    {shift.end_time || '-'}
                                                </span>
                                            </td>
                                            <td>{shift.route_info || '-'}</td>
                                            <td>{shift.vehicle_info || '-'}</td>
                                            <td>
                                                <span className={`badge ${getStatusColor(shift.status)}`}>
                                                    {shift.status || '正常'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8">
                                            <div className="flex flex-col items-center space-y-2">
                                                <span className="text-2xl opacity-50">📋</span>
                                                <span className="opacity-60">暂无排班信息</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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