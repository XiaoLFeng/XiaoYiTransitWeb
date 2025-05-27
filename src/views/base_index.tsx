import { useState } from 'react';

export function BaseIndex() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const features = [
        {
            icon: "👤",
            title: "用户认证",
            description: "安全的登录系统，支持验证码验证，密码修改等功能"
        },
        {
            icon: "🚗",
            title: "司机管理",
            description: "完整的司机信息管理，包括创建、查询、更新和排班管理"
        },
        {
            icon: "🚌",
            title: "车辆管理",
            description: "车辆信息管理，年检记录，保险记录等全方位管理"
        },
        {
            icon: "🗺️",
            title: "线路管理",
            description: "公交线路管理，站点管理，路线规划等功能"
        },
        {
            icon: "🔧",
            title: "维保管理",
            description: "车辆维护保养记录管理，确保车辆安全运行"
        },
        {
            icon: "📊",
            title: "数据统计",
            description: "实时数据统计分析，为决策提供数据支持"
        }
    ];

    const stats = [
        { number: "500+", label: "管理车辆" },
        { number: "1000+", label: "注册司机" },
        { number: "200+", label: "运营线路" },
        { number: "99.9%", label: "系统稳定性" }
    ];

    return (
        <div className="min-h-screen bg-base-100">
            {/* 导航栏 */}
            <div className="navbar bg-base-100 shadow-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div 
                            tabIndex={0} 
                            role="button" 
                            className="btn btn-ghost lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
                            </svg>
                        </div>
                        {isMenuOpen && (
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>功能特性</a></li>
                                <li><a>关于我们</a></li>
                                <li><a>联系我们</a></li>
                            </ul>
                        )}
                    </div>
                    <a className="btn btn-ghost text-xl font-bold text-primary">
                        🚌 小易出行
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a className="hover:text-primary">功能特性</a></li>
                        <li><a className="hover:text-primary">关于我们</a></li>
                        <li><a className="hover:text-primary">联系我们</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a href="/auth/login" className="btn btn-primary">登录系统</a>
                </div>
            </div>

            {/* 英雄区域 */}
            <div className="hero min-h-[80vh] bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="hero-content text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            智慧公交管理系统
                        </h1>
                        <p className="text-xl mb-8 text-base-content/80 leading-relaxed">
                            小易出行为您提供全方位的公交管理解决方案，涵盖用户认证、司机管理、车辆管理、线路管理和维保管理等核心功能，让公交运营更加智能化、高效化。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn btn-primary btn-lg">
                                立即体验
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </button>
                            <button className="btn btn-outline btn-lg">
                                了解更多
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 统计数据 */}
            <div className="py-16 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-base-content/70">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 功能特性 */}
            <div className="py-20 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">核心功能</h2>
                        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                            我们提供完整的公交管理解决方案，助力您的公交运营数字化转型
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="card-body text-center">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="card-title justify-center text-xl mb-3">{feature.title}</h3>
                                    <p className="text-base-content/70">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 技术栈展示 */}
            <div className="py-20 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">技术栈</h2>
                        <p className="text-xl text-base-content/70">
                            采用现代化技术栈，确保系统稳定性和可扩展性
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">⚛️</span>
                            </div>
                            <h4 className="font-semibold">React</h4>
                            <p className="text-sm text-base-content/70">前端框架</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🎨</span>
                            </div>
                            <h4 className="font-semibold">DaisyUI</h4>
                            <p className="text-sm text-base-content/70">UI组件库</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🔷</span>
                            </div>
                            <h4 className="font-semibold">TypeScript</h4>
                            <p className="text-sm text-base-content/70">类型安全</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h4 className="font-semibold">GoFrame</h4>
                            <p className="text-sm text-base-content/70">后端框架</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA区域 */}
            <div className="py-20 bg-gradient-to-r from-primary to-secondary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        准备开始您的智慧公交之旅？
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        立即体验小易出行管理系统，让您的公交运营更加智能高效
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn btn-white btn-lg">
                            免费试用
                        </button>
                        <button className="btn btn-outline btn-white btn-lg">
                            联系销售
                        </button>
                    </div>
                </div>
            </div>

            {/* 页脚 */}
            <footer className="footer footer-center p-10 bg-base-200 text-base-content">
                <aside>
                    <div className="text-2xl font-bold text-primary mb-4">🚌 小易出行</div>
                    <p className="font-bold">
                        智慧公交管理系统
                    </p>
                    <p>提供专业的公交运营管理解决方案</p>
                    <p>Copyright © 2024 - All right reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a className="link link-hover">关于我们</a>
                        <a className="link link-hover">联系我们</a>
                        <a className="link link-hover">隐私政策</a>
                        <a className="link link-hover">服务条款</a>
                    </div>
                </nav>
            </footer>
        </div>
    );
}