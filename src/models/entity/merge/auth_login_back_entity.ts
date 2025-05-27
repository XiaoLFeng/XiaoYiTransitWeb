import type { RoleEntity } from "../role_entity";
import type { TokenEntity } from "../token_entity";
import type { UserInfoEntity } from "../user_info_entity";

/**
 * # 登录返回数据实体
 * 用户登录成功后返回的数据结构
 */
export interface AuthLoginBackEntity {
    /** 用户基本信息 */
    user: UserInfoEntity;
    /** 用户角色信息 */
    role: RoleEntity;
    /** 用户登录凭证 */
    token: TokenEntity;
    /** 自定义扩展 */
    [key: string]: unknown;
}