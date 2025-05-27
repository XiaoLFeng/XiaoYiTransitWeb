/**
 * # 司机状态枚举
 * 司机的工作状态
 */
export enum DriverStatus {
    /** 离职 */
    RESIGNED = 0,
    /** 在职 */
    ACTIVE = 1,
    /** 休假 */
    ON_LEAVE = 2,
    /** 停职 */
    SUSPENDED = 3
}

/**
 * # 司机性别枚举
 * 司机的性别
 */
export enum DriverGender {
    /** 男 */
    MALE = 1,
    /** 女 */
    FEMALE = 2
}

/**
 * # 创建司机请求DTO
 * 用于创建新司机的请求数据结构
 */
export interface CreateDriverDTO extends Record<string, unknown> {
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
}

/**
 * # 更新司机请求DTO
 * 用于更新司机信息的请求数据结构
 */
export interface UpdateDriverDTO extends CreateDriverDTO {
    /** 司机UUID */
    driver_uuid: string;
}

/**
 * # 获取司机列表查询参数DTO
 * 用于查询司机列表的筛选参数
 */
export interface GetDriverListQueryDTO extends Record<string, unknown> {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 工号（可选，用于筛选） */
    employee_id?: string;
    /** 姓名（可选，用于筛选） */
    name?: string;
    /** 状态（可选，用于筛选）: 0-离职, 1-在职, 2-休假, 3-停职 */
    status?: DriverStatus;
}

/**
 * # 获取司机详情查询参数DTO
 * 用于获取司机详细信息的查询参数
 */
export interface GetDriverDetailQueryDTO extends Record<string, unknown> {
    /** 司机UUID */
    driver_uuid: string;
}

/**
 * # 删除司机查询参数DTO
 * 用于删除司机的查询参数
 */
export interface DeleteDriverQueryDTO extends Record<string, unknown> {
    /** 司机UUID */
    driver_uuid: string;
}

/**
 * # 获取司机排班查询参数DTO
 * 用于获取司机排班信息的查询参数
 */
export interface GetDriverScheduleQueryDTO extends Record<string, unknown> {
    /** 司机UUID */
    driver_uuid: string;
    /** 开始日期（可选，默认为当前日期） */
    start_date?: string;
    /** 结束日期（可选，默认为开始日期后7天） */
    end_date?: string;
}

/**
 * # 司机简易信息DTO
 * 用于选择组件的简化司机信息
 */
export interface SimpleDriverItemDTO extends Record<string, unknown> {
    /** 司机UUID */
    driver_uuid: string;
    /** 工号 */
    employee_id: string;
    /** 姓名 */
    name: string;
}

/**
 * # 司机简易列表DTO
 * 司机简易列表的数据结构
 */
export interface SimpleDriverListDTO extends Record<string, unknown> {
    /** 司机列表 */
    list: SimpleDriverItemDTO[];
} 