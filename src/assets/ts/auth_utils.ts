import cookie from 'react-cookies';
import type { UserInfoEntity } from '../../models/entity/auth_entity';

/**
 * # 检查用户是否已登录
 * 通过检查cookie中的token来判断用户是否已登录
 * @returns {boolean} 是否已登录
 */
export const isAuthenticated = (): boolean => {
    const token = cookie.load('token');
    return !!token;
};

/**
 * # 获取当前用户信息
 * 从localStorage中获取用户信息
 * @returns {UserInfoEntity | null} 用户信息或null
 */
export const getCurrentUser = (): UserInfoEntity | null => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error('获取用户信息失败:', error);
        return null;
    }
};

/**
 * # 获取用户Token
 * 从cookie中获取用户token
 * @returns {string | null} token或null
 */
export const getAuthToken = (): string | null => {
    return cookie.load('token') || null;
};

/**
 * # 用户登出
 * 清除所有认证相关的数据
 */
export const logout = (): void => {
    // 清除cookie中的token
    cookie.remove('token', { path: '/' });
    
    // 清除localStorage中的用户信息
    localStorage.removeItem('userInfo');
    
    // 可以在这里添加其他清理逻辑
    console.log('用户已登出');
};

/**
 * # 保存用户登录信息
 * 保存token到cookie和用户信息到localStorage
 * @param {string} token - 用户token
 * @param {UserInfoEntity} userInfo - 用户信息
 * @param {Date} expiresAt - token过期时间
 */
export const saveAuthData = (token: string, userInfo: UserInfoEntity, expiresAt: Date): void => {
    // 保存token到cookie
    cookie.save('token', token, {
        path: '/',
        expires: expiresAt,
        secure: process.env.NODE_ENV === 'production', // 生产环境使用https
        httpOnly: false
    });
    
    // 保存用户信息到localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

/**
 * # 检查token是否即将过期
 * 检查token是否在指定时间内过期（默认30分钟）
 * @param {number} minutesBefore - 提前多少分钟检查（默认30分钟）
 * @returns {boolean} 是否即将过期
 */
export const isTokenExpiringSoon = (minutesBefore: number = 30): boolean => {
    const user = getCurrentUser();
    if (!user) return true;
    
    // 这里需要根据实际的token过期时间来判断
    // 由于当前的entity中没有直接的过期时间字段，这里先返回false
    // 在实际使用中，可能需要从token中解析过期时间或者从其他地方获取
    // minutesBefore 参数预留给未来使用
    console.log(`检查token是否在${minutesBefore}分钟内过期`);
    return false;
};

/**
 * # 格式化用户显示名称
 * 优先显示真实姓名，如果没有则显示用户名
 * @param {UserInfoEntity} user - 用户信息
 * @returns {string} 格式化后的显示名称
 */
export const formatUserDisplayName = (user: UserInfoEntity): string => {
    return user.real_name || user.username || '未知用户';
};

/**
 * # 检查用户状态是否正常
 * 检查用户账户状态是否为启用状态
 * @param {UserInfoEntity} user - 用户信息
 * @returns {boolean} 用户状态是否正常
 */
export const isUserActive = (user: UserInfoEntity): boolean => {
    return user.status === 1;
}; 