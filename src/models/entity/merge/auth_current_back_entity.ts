import type { TokenEntity } from "../token_entity";
import type { UserInfoEntity } from "../user_info_entity";

/**
 * # 当前用户信息返回数据实体
 * 当前用户信息返回的数据结构
 */
export interface AuthCurrentBackEntity {
    /** 用户基本信息 */
    user: UserInfoEntity;
    /** 用户登录凭证 */
    token: TokenEntity;
    /** 自定义扩展 */
    [key: string]: unknown;
}