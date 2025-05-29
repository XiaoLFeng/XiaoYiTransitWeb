/**
 * # MaintenanceDetailEntity
 * > 维修记录详情实体
 */
export interface MaintenanceDetailEntity extends Record<string, unknown> {
    /** 维修UUID */
    maintenance_uuid: string;
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number: string;
    /** 维修类型: 1-常规保养, 2-故障维修, 3-事故维修, 4-年检维修 */
    maintenance_type: number;
    /** 维修类型名称 */
    maintenance_type_name: string;
    /** 维修描述 */
    description: string;
    /** 维修日期 */
    maintenance_date: string;
    /** 完成日期 */
    completion_date?: string;
    /** 维修费用 */
    cost?: number;
    /** 维修时里程数 */
    mileage?: number;
    /** 维修地点 */
    maintenance_location?: string;
    /** 维修人员 */
    maintenance_staff?: string;
    /** 更换的零部件 */
    parts_replaced?: string;
    /** 状态: 0-已取消, 1-待维修, 2-维修中, 3-已完成 */
    status: number;
    /** 状态名称 */
    status_name: string;
    /** 备注 */
    notes?: string;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
}

/**
 * # MaintenanceListItemEntity
 * > 维修记录列表项实体
 */
export interface MaintenanceListItemEntity extends Record<string, unknown> {
    /** 维修UUID */
    maintenance_uuid: string;
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number: string;
    /** 维修类型: 1-常规保养, 2-故障维修, 3-事故维修, 4-年检维修 */
    maintenance_type: number;
    /** 维修类型名称 */
    maintenance_type_name: string;
    /** 维修描述 */
    description: string;
    /** 维修日期 */
    maintenance_date: string;
    /** 完成日期 */
    completion_date?: string;
    /** 维修费用 */
    cost?: number;
    /** 状态: 0-已取消, 1-待维修, 2-维修中, 3-已完成 */
    status: number;
    /** 状态名称 */
    status_name: string;
}

/**
 * # PagedMaintenanceListEntity
 * > 分页维修记录列表实体
 */
export interface PagedMaintenanceListEntity extends Record<string, unknown> {
    /** 维修记录列表 */
    list: MaintenanceListItemEntity[];
    /** 当前页码 */
    page: number;
    /** 每页数量 */
    size: number;
    /** 总数量 */
    total: number;
} 