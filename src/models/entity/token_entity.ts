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