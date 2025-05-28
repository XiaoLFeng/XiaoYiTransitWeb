/**
 * # 站点管理相关 Entity 类型定义
 * > 该文件定义了站点管理模块中所有 API 接口的响应数据实体类型
 * > 包含站点详情、站点列表等数据结构定义
 */

/**
 * # StationDetailEntity
 * > 站点详情实体
 * > 表示单个站点的完整信息，包含所有字段和时间戳
 */
export interface StationDetailEntity {
    /** 站点UUID */
    station_uuid: string;
    /** 站点名称 */
    name: string;
    /** 站点编码 */
    code: string;
    /** 站点地址 */
    address: string;
    /** 经度 */
    longitude: number;
    /** 纬度 */
    latitude: number;
    /** 状态: 0-停用, 1-启用 */
    status: number;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
}

/**
 * # StationListItemEntity
 * > 站点列表项实体
 * > 表示站点列表中的单个项目信息，与详情实体相同
 */
export interface StationListItemEntity {
    /** 站点UUID */
    station_uuid: string;
    /** 站点名称 */
    name: string;
    /** 站点编码 */
    code: string;
    /** 站点地址 */
    address: string;
    /** 经度 */
    longitude: number;
    /** 纬度 */
    latitude: number;
    /** 状态: 0-停用, 1-启用 */
    status: number;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
}

/**
 * # PagedStationListEntity
 * > 分页站点列表实体
 * > 表示分页查询返回的站点列表数据结构，包含分页信息和站点数组
 */
export interface PagedStationListEntity {
    /** 总数 */
    total: number;
    /** 页码 */
    page: number;
    /** 每页数量 */
    size: number;
    /** 站点列表 */
    stations: StationListItemEntity[];
} 