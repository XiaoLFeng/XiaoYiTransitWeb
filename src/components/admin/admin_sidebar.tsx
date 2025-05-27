import { useNavigate, useLocation } from 'react-router';

/**
 * # 菜单项接口定义
 */
interface MenuItem {
    id: string;
    name: string;
    icon: string;
    path: string;
}

/**
 * # 侧边栏组件属性接口
 */
interface AdminSidebarProps {
    /** 侧边栏是否折叠 */
    collapsed: boolean;
    /** 切换折叠状态的回调函数 */
    onToggleCollapse: () => void;
}

/**
 * # 管理员侧边栏组件
 * 管理员后台的侧边栏导航组件，包含菜单项和折叠功能
 * @param props - 组件属性
 * @returns 侧边栏组件
 */
export function AdminSidebar({ collapsed, onToggleCollapse }: AdminSidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // 菜单项配置
    const menuItems: MenuItem[] = [
        { id: 'dashboard', name: '仪表板', icon: '📊', path: '/admin/dashboard' },
        { id: 'vehicles', name: '车辆管理', icon: '🚌', path: '/admin/vehicles' },
        { id: 'insurance', name: '保险管理', icon: '🛡️', path: '/admin/insurance' },
        { id: 'inspection', name: '年检管理', icon: '🔍', path: '/admin/inspection' },
        { id: 'routes', name: '线路管理', icon: '🗺️', path: '/admin/routes' },
        { id: 'drivers', name: '司机管理', icon: '👨‍💼', path: '/admin/drivers' },
        { id: 'maintenance', name: '维护记录', icon: '🔧', path: '/admin/maintenance' },
        { id: 'reports', name: '统计报表', icon: '📈', path: '/admin/reports' },
        { id: 'users', name: '用户管理', icon: '👥', path: '/admin/users' },
        { id: 'settings', name: '系统设置', icon: '⚙️', path: '/admin/settings' },
    ];

    // 获取当前激活的菜单项
    const getActiveMenuItem = (): string => {
        const currentPath = location.pathname;
        
        const activeItem = menuItems.find(item => item.path === currentPath);
        return activeItem?.id || 'dashboard';
    };

    // 处理菜单点击
    const handleMenuClick = (path: string): void => {
        navigate(path);
    };

    return (
        <div className={`fixed inset-y-0 left-0 z-50 bg-base-200 transition-all duration-300 ${
            collapsed ? 'w-16' : 'w-64'
        }`}>
            {/* 侧边栏头部 */}
            <div className="flex items-center justify-between p-4 border-b border-base-300">
                {!collapsed && (
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">🚌</span>
                        <h1 className="text-lg font-bold text-primary">小易出行</h1>
                    </div>
                )}
                <button
                    onClick={onToggleCollapse}
                    className="btn btn-ghost btn-sm"
                    title={collapsed ? '展开侧边栏' : '折叠侧边栏'}
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>

            {/* 导航菜单 */}
            <nav className="p-2">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleMenuClick(item.path)}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                    getActiveMenuItem() === item.id
                                        ? 'bg-primary text-primary-content'
                                        : 'hover:bg-base-300'
                                }`}
                                title={collapsed ? item.name : ''}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {!collapsed && (
                                    <span className="font-medium">{item.name}</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* 侧边栏底部信息（折叠时隐藏） */}
            {!collapsed && (
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-center p-3 bg-base-300/50 rounded-lg">
                        <p className="text-xs text-base-content/60">
                            小易出行管理系统
                        </p>
                        <p className="text-xs text-base-content/40 mt-1">
                            v1.0.0
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * # 获取菜单项信息的工具函数
 * 根据当前路径获取对应的菜单项信息
 * @param pathname - 当前路径
 * @returns 菜单项信息或默认值
 */
export function getMenuItemByPath(pathname: string): { id: string; name: string } {
    const menuItems: MenuItem[] = [
        { id: 'dashboard', name: '仪表板', icon: '📊', path: '/admin/dashboard' },
        { id: 'vehicles', name: '车辆管理', icon: '🚌', path: '/admin/vehicles' },
        { id: 'insurance', name: '保险管理', icon: '🛡️', path: '/admin/insurance' },
        { id: 'inspection', name: '年检管理', icon: '🔍', path: '/admin/inspection' },
        { id: 'routes', name: '线路管理', icon: '🗺️', path: '/admin/routes' },
        { id: 'drivers', name: '司机管理', icon: '👨‍💼', path: '/admin/drivers' },
        { id: 'maintenance', name: '维护记录', icon: '🔧', path: '/admin/maintenance' },
        { id: 'reports', name: '统计报表', icon: '📈', path: '/admin/reports' },
        { id: 'users', name: '用户管理', icon: '👥', path: '/admin/users' },
        { id: 'settings', name: '系统设置', icon: '⚙️', path: '/admin/settings' },
    ];

    const activeItem = menuItems.find(item => item.path === pathname);
    return {
        id: activeItem?.id || 'dashboard',
        name: activeItem?.name || '管理后台'
    };
} 