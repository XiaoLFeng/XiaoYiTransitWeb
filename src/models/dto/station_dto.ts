/**
 * # 站点管理相关 DTO 类型定义
 * > 该文件定义了站点管理模块中所有 API 接口的数据传输对象类型
 * > 包含创建、更新、删除、查询等操作的请求和查询参数类型
 */

/**
 * # CreateStationDTO
 * > 创建站点请求数据传输对象
 * > 用于新建公交站点时传递的参数
 */
export interface CreateStationDTO extends Record<string, unknown> {
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
    status: 0 | 1;
}

/**
 * # UpdateStationDTO
 * > 更新站点请求数据传输对象
 * > 用于更新站点信息时传递的参数，包含站点UUID
 */
export interface UpdateStationDTO extends Record<string, unknown> {
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
    status: 0 | 1;
}

/**
 * # GetStationDetailQueryDTO
 * > 获取站点详情查询参数数据传输对象
 * > 用于获取单个站点详细信息的查询参数
 */
export interface GetStationDetailQueryDTO extends Record<string, unknown> {
    /** 站点UUID */
    station_uuid: string;
}

/**
 * # DeleteStationQueryDTO
 * > 删除站点查询参数数据传输对象
 * > 用于删除站点时传递的查询参数
 */
export interface DeleteStationQueryDTO extends Record<string, unknown> {
    /** 站点UUID */
    station_uuid: string;
}

/**
 * # GetStationListQueryDTO
 * > 获取站点列表查询参数数据传输对象
 * > 用于分页获取站点列表时传递的查询参数，支持多种筛选条件
 */
export interface GetStationListQueryDTO extends Record<string, unknown> {
    /** 站点名称，用于模糊查询 */
    name?: string;
    /** 站点编码，用于模糊查询 */
    code?: string;
    /** 状态: 0-停用, 1-启用 */
    status?: 0 | 1;
    /** 页码，默认为1 */
    page?: number;
    /** 每页数量，默认为10 */
    size?: number;
}

/**
 * # 获取简单站点列表查询参数
 */
export interface GetStationSimpleListQueryDTO extends Record<string, unknown> {
    /** 状态: 0-停用, 1-启用，默认为1（启用） */
    status?: number;
} 