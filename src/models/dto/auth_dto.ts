/**
 * # 用户登录请求DTO
 * 用于用户登录的请求数据结构
 */
export interface AuthLoginDTO extends Record<string, unknown> {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
}

/**
 * # 修改密码请求DTO
 * 用于用户在已登录的环境下修改自己的密码
 */
export interface AuthChangePasswordDTO extends Record<string, unknown> {
    /** 原密码 */
    origin_password: string;
    /** 新密码 */
    new_password: string;
    /** 确认新密码 */
    new_password_confirm: string;
} 