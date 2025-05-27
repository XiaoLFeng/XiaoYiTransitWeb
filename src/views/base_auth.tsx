import { Routes, Route } from 'react-router';
import { AuthLogin } from './auth/auth_login';

/**
 * # 基础认证页面
 * 基础认证页面，用于显示认证页面
 * @returns 认证页面
 */
export function BaseAuth() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
            {/* 背景装饰 */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>
            
            {/* 主要内容区域 */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    {/* 头部信息 */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                            <span className="text-3xl">🚌</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary mb-2">小易出行</h1>
                        <p className="text-base-content/70">公交车辆信息管理系统</p>
                    </div>
                    
                    {/* 子路由内容 */}
                    <Routes>
                        <Route path="login" element={<AuthLogin />} />
                        <Route path="*" element={<AuthLogin />} />
                    </Routes>
                    
                    {/* 底部信息 */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-base-content/50">
                            © 2024 小易出行. 保留所有权利.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
