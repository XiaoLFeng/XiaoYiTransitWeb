import type { MaintenanceDetailEntity } from '../../../models/entity/maintenance_entity';

/**
 * # 维修记录详情模态框组件属性接口
 */
interface MaintenanceDetailModalProps {
    /** 关闭模态框回调 */
    onClose: () => void;
    /** 维修记录详情数据 */
    maintenance: MaintenanceDetailEntity;
}

/**
 * # 维修记录详情模态框组件
 * 用于展示维修记录的详细信息
 */
export function MaintenanceDetailModal({
    onClose,
    maintenance
}: MaintenanceDetailModalProps) {

    /**
     * 格式化维修类型显示
     */
    const formatMaintenanceType = (type: number) => {
        const typeMap = {
            1: { name: '常规保养', class: 'badge-info' },
            2: { name: '故障维修', class: 'badge-warning' },
            3: { name: '事故维修', class: 'badge-error' },
            4: { name: '年检维修', class: 'badge-accent' }
        };
        const typeInfo = typeMap[type as keyof typeof typeMap] || { name: '未知', class: 'badge-ghost' };
        return (
            <div className={`badge ${typeInfo.class}`}>{typeInfo.name}</div>
        );
    };

    /**
     * 格式化状态显示
     */
    const formatStatus = (status: number) => {
        const statusMap = {
            0: { name: '已取消', class: 'badge-error' },
            1: { name: '待维修', class: 'badge-info' },
            2: { name: '维修中', class: 'badge-warning' },
            3: { name: '已完成', class: 'badge-success' }
        };
        const statusInfo = statusMap[status as keyof typeof statusMap] || { name: '未知', class: 'badge-ghost' };
        return (
            <div className={`badge ${statusInfo.class}`}>{statusInfo.name}</div>
        );
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">维修记录详细信息</h3>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
                </div>

                <div className="space-y-6">
                    {/* 基本信息 */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h4 className="card-title text-lg mb-4 flex items-center">
                                <span className="mr-2">🔧</span>基本信息
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">车牌号</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg font-medium text-primary">
                                        {maintenance.plate_number}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">维修类型</span>
                                    </label>
                                    <div className="p-3">
                                        {formatMaintenanceType(maintenance.maintenance_type)}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">维修状态</span>
                                    </label>
                                    <div className="p-3">
                                        {formatStatus(maintenance.status)}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">维修费用</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg font-medium text-success">
                                        ¥{maintenance.cost?.toFixed(2) || '0.00'}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">维修描述</span>
                                </label>
                                <div className="bg-base-100 p-3 rounded-lg">
                                    {maintenance.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 时间和地点信息 */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h4 className="card-title text-lg mb-4 flex items-center">
                                <span className="mr-2">📅</span>时间和地点
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">维修日期</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg">
                                        {new Date(maintenance.maintenance_date).toLocaleString('zh-CN')}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">完成日期</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg">
                                        {maintenance.completion_date 
                                            ? new Date(maintenance.completion_date).toLocaleString('zh-CN')
                                            : '未完成'
                                        }
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">维修地点</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg">
                                        {maintenance.maintenance_location || '未填写'}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">维修人员</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg">
                                        {maintenance.maintenance_staff || '未填写'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 技术信息 */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h4 className="card-title text-lg mb-4 flex items-center">
                                <span className="mr-2">🔩</span>技术信息
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">里程数</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg font-mono">
                                        {maintenance.mileage ? `${maintenance.mileage.toLocaleString()} km` : '未记录'}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">更换零部件</span>
                                </label>
                                <div className="bg-base-100 p-3 rounded-lg min-h-[60px]">
                                    {maintenance.parts_replaced || '无'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 备注信息 */}
                    {maintenance.notes && (
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h4 className="card-title text-lg mb-4 flex items-center">
                                    <span className="mr-2">📝</span>备注信息
                                </h4>
                                <div className="bg-base-100 p-3 rounded-lg min-h-[60px]">
                                    {maintenance.notes}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 系统信息 */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h4 className="card-title text-lg mb-4 flex items-center">
                                <span className="mr-2">⏰</span>系统信息
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">创建时间</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg text-sm">
                                        {new Date(maintenance.created_at).toLocaleString('zh-CN')}
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-medium">更新时间</span>
                                    </label>
                                    <div className="bg-base-100 p-3 rounded-lg text-sm">
                                        {new Date(maintenance.updated_at).toLocaleString('zh-CN')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="modal-action">
                    <button
                        className="btn btn-primary"
                        onClick={onClose}
                    >
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
} 