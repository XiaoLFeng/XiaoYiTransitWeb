/**
 * # 车辆状态枚举
 * 车辆的运营状态
 */
export enum VehicleStatus {
    /** 运营 */
    OPERATING = 1,
    /** 维修 */
    MAINTENANCE = 2,
    /** 停运 */
    OUT_OF_SERVICE = 3,
    /** 报废 */
    SCRAPPED = 4
}

/**
 * # 创建车辆请求DTO
 * 用于创建新车辆的请求数据结构
 */
export interface CreateVehicleDTO extends Record<string, unknown> {
    /** 车牌号 */
    plate_number: string;
    /** 车辆型号 */
    model: string;
    /** 制造商 */
    manufacturer?: string;
    /** 制造年份 */
    manufacture_year?: number;
    /** 座位数 */
    seats?: number;
    /** 发动机号 */
    engine_number?: string;
    /** 车架号 */
    chassis_number?: string;
    /** 购置日期 */
    purchase_date?: string;
    /** 购置价格 */
    purchase_price?: number;
    /** 状态: 1-运营, 2-维修, 3-停运, 4-报废 */
    status: VehicleStatus;
    /** 备注 */
    notes?: string;
}

/**
 * # 更新车辆请求DTO
 * 用于更新车辆信息的请求数据结构
 */
export interface UpdateVehicleDTO extends CreateVehicleDTO {
    /** 车辆UUID */
    vehicle_uuid: string;
}

/**
 * # 获取车辆列表查询参数DTO
 * 用于查询车辆列表的筛选参数
 */
export interface GetVehicleListQueryDTO extends Record<string, unknown> {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 车牌号（可选，用于筛选） */
    plate_number?: string;
    /** 车辆型号（可选，用于筛选） */
    model?: string;
    /** 状态（可选，用于筛选）: 1-运营, 2-维修, 3-停运, 4-报废 */
    status?: VehicleStatus;
}

/**
 * # 获取车辆详情查询参数DTO
 * 用于获取车辆详细信息的查询参数
 */
export interface GetVehicleDetailQueryDTO extends Record<string, unknown> {
    /** 车辆UUID */
    vehicle_uuid: string;
}

/**
 * # 删除车辆查询参数DTO
 * 用于删除车辆的查询参数
 */
export interface DeleteVehicleQueryDTO extends Record<string, unknown> {
    /** 车辆UUID */
    vehicle_uuid: string;
}

/**
 * # 创建车辆年检记录请求DTO
 * 用于创建新的车辆年检记录的请求数据结构
 */
export interface CreateVehicleInspectionDTO extends Record<string, unknown> {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 年检日期 */
    inspection_date: string;
    /** 年检结果 */
    result: string;
    /** 年检机构 */
    agency?: string;
    /** 下次年检日期 */
    next_inspection_date?: string;
    /** 费用 */
    cost?: number;
    /** 备注 */
    notes?: string;
}

/**
 * # 更新车辆年检记录请求DTO
 * 用于更新车辆年检记录的请求数据结构
 */
export interface UpdateVehicleInspectionDTO extends CreateVehicleInspectionDTO {
    /** 年检记录UUID */
    inspection_uuid: string;
}

/**
 * # 获取车辆年检记录列表查询参数DTO
 * 用于查询车辆年检记录列表的筛选参数
 */
export interface GetVehicleInspectionListQueryDTO extends Record<string, unknown> {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 车辆UUID（可选，用于筛选） */
    vehicle_uuid?: string;
    /** 开始日期（可选，用于筛选） */
    start_date?: string;
    /** 结束日期（可选，用于筛选） */
    end_date?: string;
}

/**
 * # 删除车辆年检记录查询参数DTO
 * 用于删除车辆年检记录的查询参数
 */
export interface DeleteVehicleInspectionQueryDTO extends Record<string, unknown> {
    /** 年检记录UUID */
    inspection_uuid: string;
}

/**
 * # 创建车辆保险记录请求DTO
 * 用于创建新的车辆保险记录的请求数据结构
 */
export interface CreateVehicleInsuranceDTO extends Record<string, unknown> {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 保险类型 */
    insurance_type: string;
    /** 保险公司 */
    insurer?: string;
    /** 保单号 */
    policy_number?: string;
    /** 保险开始日期 */
    start_date: string;
    /** 保险结束日期 */
    expiry_date: string;
    /** 保险费用 */
    premium?: number;
    /** 保险金额 */
    coverage_amount?: number;
    /** 备注 */
    notes?: string;
}

/**
 * # 更新车辆保险记录请求DTO
 * 用于更新车辆保险记录的请求数据结构
 */
export interface UpdateVehicleInsuranceDTO extends CreateVehicleInsuranceDTO {
    /** 保险记录UUID */
    insurance_uuid: string;
}

/**
 * # 获取车辆保险记录列表查询参数DTO
 * 用于查询车辆保险记录列表的筛选参数
 */
export interface GetVehicleInsuranceListQueryDTO extends Record<string, unknown> {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    size?: number;
    /** 车辆UUID（可选，用于筛选） */
    vehicle_uuid?: string;
    /** 保险类型（可选，用于筛选） */
    insurance_type?: string;
    /** 开始日期（可选，用于筛选） */
    start_date?: string;
    /** 结束日期（可选，用于筛选） */
    expiry_date?: string;
    /** 保险公司 */
    insurer?: string;
}

/**
 * # 删除车辆保险记录查询参数DTO
 * 用于删除车辆保险记录的查询参数
 */
export interface DeleteVehicleInsuranceQueryDTO extends Record<string, unknown> {
    /** 保险记录UUID */
    insurance_uuid: string;
}

/**
 * # 车辆简易信息DTO
 * 用于选择组件的简化车辆信息
 */
export interface SimpleVehicleItemDTO extends Record<string, unknown> {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number: string;
    /** 车辆型号 */
    model: string;
}

/**
 * # 车辆简易列表DTO
 * 车辆简易列表的数据结构
 */
export interface SimpleVehicleListDTO extends Record<string, unknown> {
    /** 车辆列表 */
    list: SimpleVehicleItemDTO[];
} 