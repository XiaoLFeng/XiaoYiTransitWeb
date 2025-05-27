import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthLoginAPI } from '../../apis/auth_api';
import type { AuthLoginDTO } from '../../models/dto/auth_dto';
import type { AuthLoginBackEntity } from '../../models/entity/merge/auth_login_back_entity';
import type { BaseResponse } from '../../models/base_response';
import { saveAuthData } from '../../assets/ts/auth_utils';

export function AuthLogin() {
    const [formData, setFormData] = useState<AuthLoginDTO>({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // 清除错误信息
        if (error) {
            setError('');
        }
    };

    // 处理登录提交
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // 表单验证
        if (!formData.username.trim()) {
            setError('请输入用户名');
            return;
        }
        if (!formData.password.trim()) {
            setError('请输入密码');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response: BaseResponse<AuthLoginBackEntity> | undefined = await AuthLoginAPI(formData);

            if (response && response.code === 200) {
                // 登录成功，保存认证数据
                const token = response.data.token;
                const expiresDate = new Date(token.expires_at);

                saveAuthData(
                    `Bearer ${token.token_uuid}`,
                    response.data.user,
                    expiresDate
                );

                // 登录成功提示
                alert('登录成功！');

                // 跳转到管理员仪表板
                navigate('/admin/dashboard');

            } else {
                if (response?.code === 40007) {
                    setError(response.data.message as string);
                } else {
                    setError(response?.message || '登录失败，请检查用户名和密码');
                }
            }
        } catch (err) {
            console.error('登录错误:', err);
            setError('网络错误，请稍后重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* 登录表单 */}
            <form onSubmit={handleLogin} className="space-y-4">
                {/* 用户名输入 */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">用户名</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="请输入用户名"
                            className="input input-bordered w-full pl-10"
                            disabled={isLoading}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 密码输入 */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">密码</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="请输入密码"
                            className="input input-bordered w-full pl-10 pr-10"
                            disabled={isLoading}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <svg className="h-5 w-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* 错误提示 */}
                {error && (
                    <div className="alert alert-error">
                        <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* 登录按钮 */}
                <div className="form-control mt-6">
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                登录中...
                            </>
                        ) : (
                            '登录'
                        )}
                    </button>
                </div>
            </form>

            {/* 底部链接 */}
            <div className="text-center mt-6 space-y-2">
                <p className="text-sm text-base-content/60">
                    忘记密码？
                    <a href="#" className="link link-primary ml-1">
                        联系管理员
                    </a>
                </p>
                <div className="divider text-xs text-base-content/40">或</div>
                <p className="text-sm text-base-content/60">
                    还没有账号？
                    <a href="#" className="link link-primary ml-1">
                        申请注册
                    </a>
                </p>
            </div>
        </div>
    );
}
