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