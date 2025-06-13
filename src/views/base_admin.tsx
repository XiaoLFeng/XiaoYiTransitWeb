import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { AuthCurrentAPI } from '../apis/auth_api';
import type { AuthCurrentBackEntity } from '../models/entity/merge/auth_current_back_entity';
import type { UserInfoEntity } from '../models/entity/user_info_entity';
import type { BaseResponse } from '../models/base_response';
import { logout, formatUserDisplayName, isUserActive } from '../assets/ts/auth_utils';
import { AdminDashboard } from './admin/admin_dashboard';
import { AdminDriverManage } from './admin/admin_driver_manage';
import { AdminVehicleManage } from './admin/admin_vehicle_manage';
import { AdminVehicleInsuranceManage } from './admin/admin_vehicle_insurance_manage';
import { AdminVehicleInspectionManage } from './admin/admin_vehicle_inspection_manage';
import { AdminRouteManage } from './admin/admin_route_manage';
import { AdminStationManage } from './admin/admin_station_manage';
import { AdminMaintenanceManage } from './admin/admin_maintenance_manage';
import { AdminSidebar, getMenuItemByPath } from '../components/admin/admin_sidebar';

/**
 * # 管理员基础布局页面
 * 管理员区域的基础布局，包含登录验证、导航和子路由
 * @returns 管理员基础布局页面
 */
export function BaseAdmin() {
    const [currentUser, setCurrentUser] = useState<UserInfoEntity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // 获取当前用户信息
    const fetchCurrentUser = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response: BaseResponse<AuthCurrentBackEntity> | undefined = await AuthCurrentAPI();

            if (response && response.code === 200) {
                const userData = response.data.user;
                
                // 检查用户状态是否正常
                if (!isUserActive(userData)) {
                    setError('账户已被禁用，请联系管理员');
                    return;
                }

                setCurrentUser(userData);
            } else {
                setError(response?.message || '获取用户信息失败');
                // 如果获取用户信息失败，可能是token过期，执行登出
                setTimeout(() => {
                    logout();
                    navigate('/auth/login');
                }, 2000);
            }
        } catch (err) {
            console.error('获取用户信息错误:', err);
            setError('网络错误，请稍后重试');
        } finally {
            setIsLoading(false);
        }
    };

    // 处理登出
    const handleLogout = () => {
        if (confirm('确定要退出登录吗？')) {
            logout();
            navigate('/auth/login');
        }
    };

    // 切换侧边栏状态
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // 组件挂载时获取用户信息
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    // 加载状态
    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-base-content/70">正在验证用户身份...</p>
                </div>
            </div>
        );
    }

    // 错误状态
    if (error) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="alert alert-error mb-4">
                        <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{error}</span>
                    </div>
                    <button 
                        className="btn btn-primary"
                        onClick={fetchCurrentUser}
                    >
                        重新验证
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100">
            {/* 侧边栏 */}
            <AdminSidebar 
                collapsed={sidebarCollapsed} 
                onToggleCollapse={toggleSidebar} 
            />

            {/* 主要内容区域 */}
            <div className={`transition-all duration-300 flex flex-col h-screen ${
                sidebarCollapsed ? 'ml-16' : 'ml-64'
            }`}>
                {/* 顶部导航栏 */}
                <header className="bg-base-100 border-b border-base-300 px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* 页面标题 */}
                        <div>
                            <h2 className="text-2xl font-bold text-base-content">
                                {getMenuItemByPath(location.pathname).name}
                            </h2>
                            <p className="text-sm text-base-content/60 mt-1">
                                欢迎使用公交车辆信息管理系统
                            </p>
                        </div>

                        {/* 用户信息和操作 */}
                        <div className="flex items-center space-x-4">
                            {/* 通知按钮 */}
                            <button className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25l2.25 2.25v2.25h-15v-2.25l2.25-2.25v-2.25a6 6 0 0 1 6-6z"></path>
                                    </svg>
                                    <span className="badge badge-xs badge-primary indicator-item"></span>
                                </div>
                            </button>

                            {/* 用户下拉菜单 */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {currentUser?.avatar ? (
                                            <img 
                                                src={currentUser.avatar} 
                                                alt={formatUserDisplayName(currentUser)}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-bold">
                                                    {formatUserDisplayName(currentUser || {} as UserInfoEntity).charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="menu-title">
                                        <span>{formatUserDisplayName(currentUser || {} as UserInfoEntity)}</span>
                                    </li>
                                    <li><a>个人资料</a></li>
                                    <li><a>修改密码</a></li>
                                    <li><a>系统设置</a></li>
                                    <div className="divider my-1"></div>
                                    <li>
                                        <button onClick={handleLogout} className="text-error">
                                            退出登录
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                </div>
                </header>

                {/* 子路由内容 */}
                <main className="p-6 bg-base-200/25 flex-1">
                    <Routes>
                        <Route path="/dashboard" element={<AdminDashboard />} />
                        {/* 车辆管理路由 */}
                        <Route path="/vehicles" element={<AdminVehicleManage />} />
                        {/* 保险管理路由 */}
                        <Route path="/insurance" element={<AdminVehicleInsuranceManage />} />
                        {/* 年检管理路由 */}
                        <Route path="/inspection" element={<AdminVehicleInspectionManage />} />
                        <Route path="/routes" element={<AdminRouteManage />} />
                        <Route path="/drivers" element={<AdminDriverManage />} />
                        <Route path="/maintenance" element={<AdminMaintenanceManage />} />
                        <Route path="/stations" element={<AdminStationManage />} />
                        {/* 默认重定向到仪表板 */}
                        <Route path="/" element={<AdminDashboard />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
