/**
 * # 用户基本信息实体
 * 用户的基本信息数据实体
 */
export interface UserInfoEntity {
    /** 用户ID */
    user_uuid: string;
    /** 用户名 */
    username: string;
    /** 真实姓名 */
    real_name: string;
    /** 邮箱 */
    email: string;
    /** 手机号 */
    phone: string;
    /** 头像 */
    avatar: string;
    /** 角色ID */
    role_uuid: string;
    /** 状态: 0-禁用, 1-启用 */
    status: number;
}

/**
 * # Token信息实体
 * 用户登录凭证数据实体
 */
export interface TokenEntity {
    /** Token唯一标识UUID */
    token_uuid: string;
    /** 用户UUID */
    user_uuid: string;
    /** 创建时间 */
    created_at: string;
    /** 过期时间 */
    expires_at: string;
}

/**
 * # 登录返回数据实体
 * 用户登录成功后返回的数据结构
 */
export interface AuthLoginBackEntity {
    /** 用户基本信息 */
    user: UserInfoEntity;
    /** 用户登录凭证 */
    token: TokenEntity;
    /** 自定义扩展 */
    [key: string]: unknown;
}