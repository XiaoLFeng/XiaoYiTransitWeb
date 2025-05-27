import type { DriverStatus, DriverGender } from "../dto/driver_dto";

/**
 * # 司机详情实体
 * 司机的详细信息
 */
export interface DriverDetailEntity {
    /** 司机UUID */
    driver_uuid: string;
    /** 工号 */
    employee_id: string;
    /** 姓名 */
    name: string;
    /** 性别: 1-男, 2-女 */
    gender: DriverGender;
    /** 身份证号 */
    id_card: string;
    /** 联系电话 */
    phone: string;
    /** 紧急联系人 */
    emergency_contact?: string;
    /** 紧急联系电话 */
    emergency_phone?: string;
    /** 驾驶证号 */
    license_number: string;
    /** 驾驶证类型 */
    license_type: string;
    /** 驾驶证到期日期 */
    license_expiry_date?: string;
    /** 入职日期 */
    entry_date?: string;
    /** 状态: 0-离职, 1-在职, 2-休假, 3-停职 */
    status: DriverStatus;
    /** 住址 */
    address?: string;
    /** 备注 */
    notes?: string;
    /** 创建时间 */
    created_at?: string;
    /** 更新时间 */
    updated_at?: string;
}

/**
 * # 司机列表项实体
 * 司机列表中的单个项目信息
 */
export interface DriverListItemEntity {
    /** 司机UUID */
    driver_uuid: string;
    /** 工号 */
    employee_id: string;
    /** 姓名 */
    name: string;
    /** 性别: 1-男, 2-女 */
    gender: DriverGender;
    /** 联系电话 */
    phone: string;
    /** 驾驶证号 */
    license_number: string;
    /** 驾驶证到期日期 */
    license_expiry_date?: string;
    /** 状态: 0-离职, 1-在职, 2-休假, 3-停职 */
    status: DriverStatus;
    /** 入职日期 */
    entry_date?: string;
}

/**
 * # 分页司机列表实体
 * 分页查询司机列表的响应数据
 */
export interface PagedDriverListEntity {
    /** 司机列表 */
    list: DriverListItemEntity[];
    /** 当前页码 */
    page: number;
    /** 每页数量 */
    size: number;
    /** 总数量 */
    total: number;
}

/**
 * # 司机班次项实体
 * 司机单个班次的详细信息
 */
export interface DriverShiftItemEntity {
    /** 班次ID */
    shift_id?: string;
    /** 日期 */
    date?: string;
    /** 开始时间 */
    start_time?: string;
    /** 结束时间 */
    end_time?: string;
    /** 线路信息 */
    route_info?: string;
    /** 车辆信息 */
    vehicle_info?: string;
    /** 班次状态 */
    status?: string;
}

/**
 * # 司机排班实体
 * 司机的排班信息
 */
export interface DriverScheduleEntity {
    /** 司机UUID */
    driver_uuid: string;
    /** 司机姓名 */
    driver_name: string;
    /** 开始日期 */
    start_date?: string;
    /** 结束日期 */
    end_date?: string;
    /** 排班列表 */
    shifts: DriverShiftItemEntity[];
}

/**
 * # 司机简易信息实体
 * 用于选择组件的简化司机信息
 */
export interface SimpleDriverItemEntity {
    /** 司机UUID */
    driver_uuid: string;
    /** 工号 */
    employee_id: string;
    /** 姓名 */
    name: string;
}

/**
 * # 司机简易列表实体
 * 司机简易列表的响应数据
 */
export interface SimpleDriverListEntity {
    /** 司机列表 */
    list: SimpleDriverItemEntity[];
} 