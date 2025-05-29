/**
 * # CreateMaintenanceDTO
 * > 创建维修记录的数据传输对象
 */
export interface CreateMaintenanceDTO extends Record<string, unknown> {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 维修类型: 1-常规保养, 2-故障维修, 3-事故维修, 4-年检维修 */
    maintenance_type: 1 | 2 | 3 | 4;
    /** 维修描述 */
    description: string;
    /** 维修日期 */
    maintenance_date: string;
    /** 完成日期（可选） */
    completion_date?: string;
    /** 维修费用（可选） */
    cost?: number;
    /** 维修时里程数（可选） */
    mileage?: number;
    /** 维修地点（可选） */
    maintenance_location?: string;
    /** 维修人员（可选） */
    maintenance_staff?: string;
    /** 更换的零部件（可选） */
    parts_replaced?: string;
    /** 状态: 0-已取消, 1-待维修, 2-维修中, 3-已完成 */
    status: 0 | 1 | 2 | 3;
    /** 备注（可选） */
    notes?: string;
}

/**
 * # UpdateMaintenanceDTO
 * > 更新维修记录的数据传输对象
 */
export interface UpdateMaintenanceDTO extends Record<string, unknown> {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 维修类型: 1-常规保养, 2-故障维修, 3-事故维修, 4-年检维修 */
    maintenance_type: 1 | 2 | 3 | 4;
    /** 维修描述 */
    description: string;
    /** 维修日期 */
    maintenance_date: string;
    /** 完成日期（可选） */
    completion_date?: string;
    /** 维修费用（可选） */
    cost?: number;
    /** 维修时里程数（可选） */
    mileage?: number;
    /** 维修地点（可选） */
    maintenance_location?: string;
    /** 维修人员（可选） */
    maintenance_staff?: string;
    /** 更换的零部件（可选） */
    parts_replaced?: string;
    /** 状态: 0-已取消, 1-待维修, 2-维修中, 3-已完成 */
    status: 0 | 1 | 2 | 3;
    /** 备注（可选） */
    notes?: string;
}

/**
 * # GetMaintenanceListQueryDTO
 * > 获取维修记录列表的查询参数数据传输对象
 */
export interface GetMaintenanceListQueryDTO extends Record<string, unknown> {
    /** 页码，从1开始，默认为1 */
    page?: number;
    /** 每页数量，默认为10 */
    size?: number;
    /** 车辆UUID，可为空 */
    vehicle_uuid?: string;
    /** 维修类型，可为0（表示不筛选） */
    maintenance_type?: number;
    /** 状态，可为0（表示不筛选） */
    status?: number;
    /** 开始日期，可为空 */
    start_date?: string;
    /** 结束日期，可为空 */
    end_date?: string;
}

/**
 * # GetMaintenanceDetailQueryDTO
 * > 获取维修记录详情的查询参数数据传输对象
 */
export interface GetMaintenanceDetailQueryDTO extends Record<string, unknown> {
    /** 维修记录UUID */
    maintenance_uuid: string;
}

/**
 * # DeleteMaintenanceQueryDTO
 * > 删除维修记录的查询参数数据传输对象
 */
export interface DeleteMaintenanceQueryDTO extends Record<string, unknown> {
    /** 维修记录UUID */
    maintenance_uuid: string;
} 