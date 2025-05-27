import { useNavigate } from 'react-router';

/**
 * # 全局 404 页面
 * 当用户访问不存在的页面时显示的错误页面
 * @returns 全局 404 错误页面
 */
export function Global404() {
    const navigate = useNavigate();

    // 返回上一页
    const handleGoBack = () => {
        navigate(-1);
    };

    // 返回首页
    const handleGoHome = () => {
        navigate('/');
    };

    // 返回登录页
    const handleGoLogin = () => {
        navigate('/auth/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
            {/* 背景装饰 */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>

            {/* 主要内容区域 */}
            <div className="relative z-10 text-center max-w-lg mx-auto">
                {/* 404 图标和数字 */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-error/10 rounded-full mb-6">
                        <span className="text-5xl">🚌</span>
                    </div>
                    <h1 className="text-8xl font-bold text-primary mb-4 tracking-tight">404</h1>
                </div>

                {/* 错误信息 */}
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-base-content mb-4">
                        页面走丢了
                    </h2>
                    <p className="text-lg text-base-content/70 leading-relaxed">
                        抱歉，您访问的页面不存在或已被移动。<br />
                        这辆公交车可能开错了路线。
                    </p>
                </div>

                {/* 错误详情卡片 */}
                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body p-6">
                        <div className="flex items-center justify-center mb-4">
                            <div className="badge badge-error gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                                页面未找到
                            </div>
                        </div>
                        <p className="text-sm text-base-content/60">
                            请检查 URL 是否正确，或者尝试以下操作：
                        </p>
                        <div className="mt-4">
                            <ul className="text-sm text-base-content/60 space-y-1">
                                <li>• 检查网址拼写是否正确</li>
                                <li>• 返回上一页重新导航</li>
                                <li>• 访问首页重新开始</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="space-y-4">
                    <button 
                        onClick={handleGoBack}
                        className="btn btn-primary btn-wide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        返回上一页
                    </button>
                    
                    <div className="flex gap-3 justify-center">
                        <button 
                            onClick={handleGoHome}
                            className="btn btn-outline"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            返回首页
                        </button>
                        
                        <button 
                            onClick={handleGoLogin}
                            className="btn btn-outline"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                            </svg>
                            登录系统
                        </button>
                    </div>
                </div>

                {/* 底部信息 */}
                <div className="mt-12 pt-8 border-t border-base-content/10">
                    <div className="flex items-center justify-center mb-4">
                        <div className="text-2xl mr-3">🚌</div>
                        <div>
                            <h3 className="font-semibold text-primary">小易出行</h3>
                            <p className="text-xs text-base-content/60">公交车辆信息管理系统</p>
                        </div>
                    </div>
                    <p className="text-xs text-base-content/50">
                        如果问题持续存在，请联系系统管理员
                    </p>
                </div>
            </div>
        </div>
    );
} 