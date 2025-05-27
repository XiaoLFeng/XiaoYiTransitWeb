/**
 * # 角色信息实体
 * 用户角色数据实体
 */
export interface RoleEntity {
    /** 角色UUID */
    role_uuid: string;
    /** 角色名称 */
    name: string;
    /** 角色编码 */
    code: string;
}