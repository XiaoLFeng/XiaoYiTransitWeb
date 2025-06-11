/**
 * # 管理员仪表板页面
 * 管理员仪表板的核心内容，显示统计数据、快速操作和最近活动
 * @returns 管理员仪表板内容
 */
export function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* 假页面提示 */}
            <div className="alert alert-warning shadow-lg">
                <div>
                    <h3 className="font-bold">🚧 演示页面</h3>
                    <div className="text-xs">这是一个演示页面，所有数据均为模拟数据。（作者：筱锋【昵称】）</div>
                </div>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <span className="text-3xl">🚌</span>
                        </div>
                        <div className="stat-title">总车辆数</div>
                        <div className="stat-value text-primary">156</div>
                        <div className="stat-desc">↗︎ 12 (8%)</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <span className="text-3xl">🗺️</span>
                        </div>
                        <div className="stat-title">运营线路</div>
                        <div className="stat-value text-secondary">28</div>
                        <div className="stat-desc">↗︎ 3 (12%)</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <span className="text-3xl">👨‍💼</span>
                        </div>
                        <div className="stat-title">在职司机</div>
                        <div className="stat-value text-accent">312</div>
                        <div className="stat-desc">↘︎ 5 (2%)</div>
                    </div>
                </div>

                <div className="stats shadow bg-white">
                    <div className="stat">
                        <div className="stat-figure text-info">
                            <span className="text-3xl">🔧</span>
                        </div>
                        <div className="stat-title">维护任务</div>
                        <div className="stat-value text-info">23</div>
                        <div className="stat-desc">待处理</div>
                    </div>
                </div>
            </div>

            {/* 快速操作 */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title">快速操作</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <button className="btn btn-outline btn-primary">
                            <span className="text-lg mr-2">➕</span>
                            添加车辆
                        </button>
                        <button className="btn btn-outline btn-secondary">
                            <span className="text-lg mr-2">🗺️</span>
                            新建线路
                        </button>
                        <button className="btn btn-outline btn-accent">
                            <span className="text-lg mr-2">👨‍💼</span>
                            添加司机
                        </button>
                        <button className="btn btn-outline btn-info">
                            <span className="text-lg mr-2">📊</span>
                            生成报表
                        </button>
                    </div>
                </div>
            </div>

            {/* 最近活动 */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h3 className="card-title">最近活动</h3>
                    <div className="space-y-3 mt-4">
                        <div className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                            <span className="text-lg">🚌</span>
                            <div className="flex-1">
                                <p className="font-medium">车辆 B001 完成例行检查</p>
                                <p className="text-sm text-base-content/60">2 小时前</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                            <span className="text-lg">👨‍💼</span>
                            <div className="flex-1">
                                <p className="font-medium">新司机张三完成入职培训</p>
                                <p className="text-sm text-base-content/60">4 小时前</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                            <span className="text-lg">🗺️</span>
                            <div className="flex-1">
                                <p className="font-medium">线路 L15 调整运营时间</p>
                                <p className="text-sm text-base-content/60">6 小时前</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 系统状态 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 车辆状态分布 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">车辆状态分布</h3>
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                    <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                                    运营中
                                </span>
                                <span className="font-semibold">128 辆</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                    <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
                                    维护中
                                </span>
                                <span className="font-semibold">23 辆</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center">
                                    <div className="w-3 h-3 bg-error rounded-full mr-2"></div>
                                    故障
                                </span>
                                <span className="font-semibold">5 辆</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 今日概览 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">今日概览</h3>
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-between">
                                <span>出车数量</span>
                                <span className="font-semibold text-primary">145 辆</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>运营班次</span>
                                <span className="font-semibold text-secondary">1,256 班</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>载客人次</span>
                                <span className="font-semibold text-accent">28,456 人</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>准点率</span>
                                <span className="font-semibold text-success">96.8%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
