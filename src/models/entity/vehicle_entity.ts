import type { VehicleStatus } from "../dto/vehicle_dto";

/**
 * # 车辆详情实体
 * 车辆的详细信息
 */
export interface VehicleDetailEntity {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number: string;
    /** 车辆型号 */
    model: string;
    /** 制造商 */
    manufacturer?: string;
    /** 制造年份 */
    manufacture_year?: number;
    /** 座位数 */
    seat_count?: number;
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
    /** 创建时间 */
    created_at?: string;
    /** 更新时间 */
    updated_at?: string;
}

/**
 * # 车辆列表项实体
 * 车辆列表中的单个项目信息
 */
export interface VehicleListItemEntity {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number: string;
    /** 车辆型号 */
    model: string;
    /** 制造商 */
    manufacturer?: string;
    /** 制造年份 */
    manufacture_year?: number;
    /** 座位数 */
    seat_count?: number;
    /** 状态: 1-运营, 2-维修, 3-停运, 4-报废 */
    status: VehicleStatus;
    /** 购置日期 */
    purchase_date?: string;
}

/**
 * # 分页车辆列表实体
 * 分页查询车辆列表的响应数据
 */
export interface PagedVehicleListEntity {
    /** 车辆列表 */
    list: VehicleListItemEntity[];
    /** 当前页码 */
    page: number;
    /** 每页数量 */
    size: number;
    /** 总数量 */
    total: number;
}

/**
 * # 车辆年检记录详情实体
 * 车辆年检记录的详细信息
 */
export interface VehicleInspectionDetailEntity {
    /** 年检记录UUID */
    inspection_uuid: string;
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number?: string;
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
    /** 创建时间 */
    created_at?: string;
    /** 更新时间 */
    updated_at?: string;
}

/**
 * # 车辆年检记录列表项实体
 * 车辆年检记录列表中的单个项目信息
 */
export interface VehicleInspectionListItemEntity {
    /** 年检记录UUID */
    inspection_uuid: string;
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number?: string;
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
}

/**
 * # 分页车辆年检记录列表实体
 * 分页查询车辆年检记录列表的响应数据
 */
export interface PagedVehicleInspectionListEntity {
    /** 年检记录列表 */
    list: VehicleInspectionListItemEntity[];
    /** 当前页码 */
    page: number;
    /** 每页数量 */
    size: number;
    /** 总数量 */
    total: number;
}

/**
 * # 车辆保险记录详情实体
 * 车辆保险记录的详细信息
 */
export interface VehicleInsuranceDetailEntity {
    /** 保险记录UUID */
    insurance_uuid: string;
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number?: string;
    /** 保险类型 */
    insurance_type: string;
    /** 保险公司 */
    insurance_company?: string;
    /** 保单号 */
    policy_number?: string;
    /** 保险开始日期 */
    start_date: string;
    /** 保险结束日期 */
    end_date: string;
    /** 保险费用 */
    premium?: number;
    /** 保险金额 */
    coverage_amount?: number;
    /** 备注 */
    notes?: string;
    /** 创建时间 */
    created_at?: string;
    /** 更新时间 */
    updated_at?: string;
}

/**
 * # 车辆保险记录列表项实体
 * 车辆保险记录列表中的单个项目信息
 */
export interface VehicleInsuranceListItemEntity {
    /** 保险记录UUID */
    insurance_uuid: string;
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number?: string;
    /** 保险类型 */
    insurance_type: string;
    /** 保险公司 */
    insurance_company?: string;
    /** 保单号 */
    policy_number?: string;
    /** 保险开始日期 */
    start_date: string;
    /** 保险结束日期 */
    end_date: string;
    /** 保险费用 */
    premium?: number;
    /** 保险金额 */
    coverage_amount?: number;
}

/**
 * # 分页车辆保险记录列表实体
 * 分页查询车辆保险记录列表的响应数据
 */
export interface PagedVehicleInsuranceListEntity {
    /** 保险记录列表 */
    list: VehicleInsuranceListItemEntity[];
    /** 当前页码 */
    page: number;
    /** 每页数量 */
    size: number;
    /** 总数量 */
    total: number;
}

/**
 * # 车辆简易信息实体
 * 用于选择组件的简化车辆信息
 */
export interface SimpleVehicleItemEntity {
    /** 车辆UUID */
    vehicle_uuid: string;
    /** 车牌号 */
    plate_number: string;
    /** 车辆型号 */
    model: string;
}

/**
 * # 车辆简易列表实体
 * 车辆简易列表的响应数据
 */
export interface SimpleVehicleListEntity {
    /** 车辆列表 */
    list: SimpleVehicleItemEntity[];
} 