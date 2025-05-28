/**
 * # 线路管理相关的实体对象 (Entity) 类型定义
 * > 该文件包含线路管理功能中API响应数据的实体对象类型定义
 * > 包含线路详情、线路列表、站点信息等实体类型
 */

// ================================
// 站点相关 Entity 类型定义
// ================================

/**
 * # StationEntity
 * > 站点信息实体
 */
export interface StationEntity {
    /** 站点UUID */
    station_uuid: string;
    /** 站点名称 */
    name: string;
    /** 站点顺序 */
    sequence: number;
    /** 距起点距离(km) */
    distance_from_start: number;
    /** 预计到达时间(分钟) */
    estimated_time: number;
}

/**
 * # RouteStationItemEntity
 * > 线路站点项实体（包含更详细的站点信息）
 */
export interface RouteStationItemEntity {
    /** 线路站点UUID */
    route_station_uuid: string;
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
    /** 站点顺序 */
    sequence: number;
    /** 距起点距离(km) */
    distance_from_start: number;
    /** 预计到达时间(分钟) */
    estimated_time: number;
}

/**
 * # RouteStationsEntity
 * > 线路站点列表实体
 */
export interface RouteStationsEntity {
    /** 线路UUID */
    route_uuid: string;
    /** 站点列表 */
    stations: RouteStationItemEntity[];
}

// ================================
// 线路相关 Entity 类型定义
// ================================

/**
 * # RouteDetailEntity
 * > 线路详情实体
 */
export interface RouteDetailEntity {
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
    /** 途经站点 */
    stops: StationEntity[];
    /** 线路长度(km) */
    distance: number;
    /** 票价(元) */
    fare: number;
    /** 运营时间 */
    operation_hours: string;
    /** 发车频率 */
    frequency: string;
    /** 状态: 0-停运, 1-运营 */
    status: 0 | 1;
    /** 备注 */
    notes: string;
}

/**
 * # RouteListItemEntity
 * > 线路列表项实体
 */
export interface RouteListItemEntity {
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
    /** 线路长度(km) */
    distance: number;
    /** 票价(元) */
    fare: number;
    /** 运营时间 */
    operation_hours: string;
    /** 状态: 0-停运, 1-运营 */
    status: 0 | 1;
}

/**
 * # PagedRouteListEntity
 * > 分页线路列表实体
 */
export interface PagedRouteListEntity {
    /** 线路列表 */
    list: RouteListItemEntity[];
    /** 当前页码 */
    page: number;
    /** 每页数量 */
    size: number;
    /** 总数量 */
    total: number;
} 