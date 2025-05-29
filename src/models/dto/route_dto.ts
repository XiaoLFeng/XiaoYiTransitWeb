/**
 * # 线路管理相关的数据传输对象 (DTO) 类型定义
 * > 该文件包含线路管理功能中用于API请求和响应的数据传输对象类型定义
 * > 包含线路的创建、更新、查询、删除等操作的DTO类型
 * > 以及线路站点的添加、更新、删除、查询等操作的DTO类型
 */

// ================================
// 基础类型定义
// ================================

/**
 * # RouteStopsData
 * > 线路途经站点数据结构
 */
export interface RouteStopsData {
    /** 站点列表 */
    stations?: Array<{
        /** 站点UUID */
        station_uuid: string;
        /** 站点名称 */
        name: string;
        /** 站点顺序 */
        sequence: number;
    }>;
    /** 其他扩展字段 */
    [key: string]: unknown;
}

// ================================
// 线路相关 DTO 类型定义
// ================================

/**
 * # CreateRouteDTO
 * > 创建线路时的数据传输对象
 */
export interface CreateRouteDTO extends Record<string, unknown> {
    /** 线路编号 */
    route_number: string;
    /** 线路名称 */
    name: string;
    /** 起始站点 */
    start_station: string;
    /** 终点站点 */
    end_station: string;
    /** 途经站点(JSON格式) */
    stops?: RouteStopsData;
    /** 线路长度(km) */
    distance?: number;
    /** 票价(元) */
    fare: number;
    /** 运营时间 */
    operation_hours?: string;
    /** 发车频率 */
    frequency?: string;
    /** 状态: 0-停运, 1-运营 */
    status: 0 | 1;
    /** 备注 */
    notes?: string;
}

/**
 * # UpdateRouteDTO
 * > 更新线路时的数据传输对象
 */
export interface UpdateRouteDTO extends Record<string, unknown> {
    /** 线路UUID */
    route_uuid: string;
    /** 线路编号 */
    route_number: string;
    /** 线路名称 */
    name: string;
    /** 起始站点 */
    start_station: string;
    /** 终点站点 */
    end_station: string;
    /** 途经站点(JSON格式) */
    stops?: RouteStopsData;
    /** 线路长度(km) */
    distance?: number;
    /** 票价(元) */
    fare: number;
    /** 运营时间 */
    operation_hours?: string;
    /** 发车频率 */
    frequency?: string;
    /** 状态: 0-停运, 1-运营 */
    status: 0 | 1;
    /** 备注 */
    notes?: string;
}

/**
 * # GetRouteListQueryDTO
 * > 获取线路列表时的查询参数
 */
export interface GetRouteListQueryDTO extends Record<string, unknown> {
    /** 页码，默认为1 */
    page?: number;
    /** 每页数量，默认为10 */
    size?: number;
    /** 线路编号（可选，用于筛选） */
    route_number?: string;
    /** 线路名称（可选，用于筛选） */
    name?: string;
    /** 状态（可选，用于筛选）: 0-停运, 1-运营 */
    status?: 0 | 1;
}

/**
 * # GetRouteDetailQueryDTO
 * > 获取线路详情时的查询参数
 */
export interface GetRouteDetailQueryDTO extends Record<string, unknown> {
    /** 线路UUID */
    route_uuid: string;
}

/**
 * # DeleteRouteQueryDTO
 * > 删除线路时的查询参数
 */
export interface DeleteRouteQueryDTO extends Record<string, unknown> {
    /** 线路UUID */
    route_uuid: string;
}

// ================================
// 线路站点相关 DTO 类型定义
// ================================

/**
 * # AddRouteStationDTO
 * > 向线路添加站点时的数据传输对象
 */
export interface AddRouteStationDTO extends Record<string, unknown> {
    /** 线路UUID */
    route_uuid: string;
    /** 站点UUID */
    station_uuid: string;
    /** 站点顺序 */
    sequence: number;
    /** 距上一站距离(km)，首站为0 */
    distance_from_start: number;
    /** 从上一站到此站的预计用时(分钟)，首站为0 */
    estimated_time: number;
}

/**
 * # UpdateRouteStationDTO
 * > 更新线路站点时的数据传输对象
 */
export interface UpdateRouteStationDTO extends Record<string, unknown> {
    /** 线路站点UUID */
    route_station_uuid: string;
    /** 站点顺序 */
    sequence: number;
    /** 距上一站距离(km)，首站为0 */
    distance_from_start: number;
    /** 从上一站到此站的预计用时(分钟)，首站为0 */
    estimated_time: number;
}

/**
 * # GetRouteStationsQueryDTO
 * > 获取线路站点列表时的查询参数
 */
export interface GetRouteStationsQueryDTO extends Record<string, unknown> {
    /** 线路UUID */
    route_uuid: string;
}

/**
 * # DeleteRouteStationQueryDTO
 * > 删除线路站点时的查询参数
 */
export interface DeleteRouteStationQueryDTO extends Record<string, unknown> {
    /** 线路站点UUID */
    route_station_uuid: string;
} 