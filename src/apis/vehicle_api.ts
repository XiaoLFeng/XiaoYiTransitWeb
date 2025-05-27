import { BaseApi, MethodType, GetAuthorizationToken } from "../assets/ts/base_api";
import type { 
    CreateVehicleDTO, 
    UpdateVehicleDTO, 
    GetVehicleListQueryDTO, 
    GetVehicleDetailQueryDTO, 
    DeleteVehicleQueryDTO,
    CreateVehicleInspectionDTO,
    UpdateVehicleInspectionDTO,
    GetVehicleInspectionListQueryDTO,
    DeleteVehicleInspectionQueryDTO,
    CreateVehicleInsuranceDTO,
    UpdateVehicleInsuranceDTO,
    GetVehicleInsuranceListQueryDTO,
    DeleteVehicleInsuranceQueryDTO
} from "../models/dto/vehicle_dto";
import type { 
    VehicleDetailEntity, 
    PagedVehicleListEntity,
    VehicleInspectionDetailEntity,
    PagedVehicleInspectionListEntity,
    VehicleInsuranceDetailEntity,
    PagedVehicleInsuranceListEntity
} from "../models/entity/vehicle_entity";
import type { BaseResponse } from "../models/base_response";

/**
 * # CreateVehicleAPI
 * > 该函数用于创建新的车辆信息，通过向指定的后端接口发送包含车辆详细信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {CreateVehicleDTO} 车辆的详细信息，包含车牌号、型号、制造商、状态等。
 * @returns {Promise<BaseResponse<VehicleDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含创建的车辆详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const CreateVehicleAPI = async (data: CreateVehicleDTO): Promise<BaseResponse<VehicleDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<VehicleDetailEntity>>(
        MethodType.POST,
        "/api/v1/vehicle",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateVehicleAPI
 * > 该函数用于更新车辆信息，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param vehicleUuid - {string} 车辆UUID，用于指定要更新的车辆。
 * @param data - {UpdateVehicleDTO} 车辆的更新信息，包含车辆UUID和需要更新的字段。
 * @returns {Promise<BaseResponse<VehicleDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含更新后的车辆详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateVehicleAPI = async (vehicleUuid: string, data: UpdateVehicleDTO): Promise<BaseResponse<VehicleDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<VehicleDetailEntity>>(
        MethodType.PUT,
        `/api/v1/vehicle/${vehicleUuid}`,
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteVehicleAPI
 * > 该函数用于删除车辆信息，通过向指定的后端接口发送包含车辆UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param vehicleUuid - {string} 车辆UUID，用于指定要删除的车辆。
 * @param params - {DeleteVehicleQueryDTO} 包含要删除的车辆UUID的查询参数。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteVehicleAPI = async (vehicleUuid: string, params: DeleteVehicleQueryDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        `/api/v1/vehicle/${vehicleUuid}`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetVehicleDetailAPI
 * > 该函数用于获取车辆的详细信息，通过向指定的后端接口发送包含车辆UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param vehicleUuid - {string} 车辆UUID，用于指定要获取详情的车辆。
 * @param params - {GetVehicleDetailQueryDTO} 包含车辆UUID的查询参数。
 * @returns {Promise<BaseResponse<VehicleDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含车辆详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetVehicleDetailAPI = async (vehicleUuid: string, params: GetVehicleDetailQueryDTO): Promise<BaseResponse<VehicleDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<VehicleDetailEntity>>(
        MethodType.GET,
        `/api/v1/vehicle/${vehicleUuid}`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetVehicleListAPI
 * > 该函数用于获取车辆列表信息，支持分页和筛选功能，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetVehicleListQueryDTO} 包含分页和筛选参数的查询对象，如页码、每页数量、车牌号、型号、状态等。
 * @returns {Promise<BaseResponse<PagedVehicleListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含分页车辆列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetVehicleListAPI = async (params?: GetVehicleListQueryDTO): Promise<BaseResponse<PagedVehicleListEntity> | undefined> => {
    return BaseApi<BaseResponse<PagedVehicleListEntity>>(
        MethodType.GET,
        "/api/v1/vehicles",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # CreateVehicleInspectionAPI
 * > 该函数用于创建新的车辆年检记录，通过向指定的后端接口发送包含年检详细信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {CreateVehicleInspectionDTO} 年检记录的详细信息，包含车辆UUID、年检日期、结果等。
 * @returns {Promise<BaseResponse<VehicleInspectionDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含创建的年检记录详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const CreateVehicleInspectionAPI = async (data: CreateVehicleInspectionDTO): Promise<BaseResponse<VehicleInspectionDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<VehicleInspectionDetailEntity>>(
        MethodType.POST,
        "/api/v1/vehicle/inspection",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateVehicleInspectionAPI
 * > 该函数用于更新车辆年检记录，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param inspectionUuid - {string} 年检记录UUID，用于指定要更新的年检记录。
 * @param data - {UpdateVehicleInspectionDTO} 年检记录的更新信息，包含年检UUID和需要更新的字段。
 * @returns {Promise<BaseResponse<VehicleInspectionDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含更新后的年检记录详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateVehicleInspectionAPI = async (inspectionUuid: string, data: UpdateVehicleInspectionDTO): Promise<BaseResponse<VehicleInspectionDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<VehicleInspectionDetailEntity>>(
        MethodType.PUT,
        `/api/v1/vehicle/inspection/${inspectionUuid}`,
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteVehicleInspectionAPI
 * > 该函数用于删除车辆年检记录，通过向指定的后端接口发送包含年检UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param inspectionUuid - {string} 年检记录UUID，用于指定要删除的年检记录。
 * @param params - {DeleteVehicleInspectionQueryDTO} 包含要删除的年检UUID的查询参数。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteVehicleInspectionAPI = async (inspectionUuid: string, params: DeleteVehicleInspectionQueryDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        `/api/v1/vehicle/inspection/${inspectionUuid}`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetVehicleInspectionListAPI
 * > 该函数用于获取车辆年检记录列表信息，支持分页和筛选功能，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetVehicleInspectionListQueryDTO} 包含分页和筛选参数的查询对象，如页码、每页数量、车辆UUID、日期范围等。
 * @returns {Promise<BaseResponse<PagedVehicleInspectionListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含分页年检记录列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetVehicleInspectionListAPI = async (params?: GetVehicleInspectionListQueryDTO): Promise<BaseResponse<PagedVehicleInspectionListEntity> | undefined> => {
    return BaseApi<BaseResponse<PagedVehicleInspectionListEntity>>(
        MethodType.GET,
        "/api/v1/vehicle/inspections",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # CreateVehicleInsuranceAPI
 * > 该函数用于创建新的车辆保险记录，通过向指定的后端接口发送包含保险详细信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {CreateVehicleInsuranceDTO} 保险记录的详细信息，包含车辆UUID、保险类型、保险公司等。
 * @returns {Promise<BaseResponse<VehicleInsuranceDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含创建的保险记录详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const CreateVehicleInsuranceAPI = async (data: CreateVehicleInsuranceDTO): Promise<BaseResponse<VehicleInsuranceDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<VehicleInsuranceDetailEntity>>(
        MethodType.POST,
        "/api/v1/vehicle/insurance",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateVehicleInsuranceAPI
 * > 该函数用于更新车辆保险记录，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param insuranceUuid - {string} 保险记录UUID，用于指定要更新的保险记录。
 * @param data - {UpdateVehicleInsuranceDTO} 保险记录的更新信息，包含保险UUID和需要更新的字段。
 * @returns {Promise<BaseResponse<VehicleInsuranceDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含更新后的保险记录详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateVehicleInsuranceAPI = async (insuranceUuid: string, data: UpdateVehicleInsuranceDTO): Promise<BaseResponse<VehicleInsuranceDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<VehicleInsuranceDetailEntity>>(
        MethodType.PUT,
        `/api/v1/vehicle/insurance/${insuranceUuid}`,
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteVehicleInsuranceAPI
 * > 该函数用于删除车辆保险记录，通过向指定的后端接口发送包含保险UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param insuranceUuid - {string} 保险记录UUID，用于指定要删除的保险记录。
 * @param params - {DeleteVehicleInsuranceQueryDTO} 包含要删除的保险UUID的查询参数。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteVehicleInsuranceAPI = async (insuranceUuid: string, params: DeleteVehicleInsuranceQueryDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        `/api/v1/vehicle/insurance/${insuranceUuid}`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetVehicleInsuranceListAPI
 * > 该函数用于获取车辆保险记录列表信息，支持分页和筛选功能，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetVehicleInsuranceListQueryDTO} 包含分页和筛选参数的查询对象，如页码、每页数量、车辆UUID、保险类型、日期范围等。
 * @returns {Promise<BaseResponse<PagedVehicleInsuranceListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含分页保险记录列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetVehicleInsuranceListAPI = async (params?: GetVehicleInsuranceListQueryDTO): Promise<BaseResponse<PagedVehicleInsuranceListEntity> | undefined> => {
    return BaseApi<BaseResponse<PagedVehicleInsuranceListEntity>>(
        MethodType.GET,
        "/api/v1/vehicle/insurances",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

export {
    CreateVehicleAPI,
    UpdateVehicleAPI,
    DeleteVehicleAPI,
    GetVehicleDetailAPI,
    GetVehicleListAPI,
    CreateVehicleInspectionAPI,
    UpdateVehicleInspectionAPI,
    DeleteVehicleInspectionAPI,
    GetVehicleInspectionListAPI,
    CreateVehicleInsuranceAPI,
    UpdateVehicleInsuranceAPI,
    DeleteVehicleInsuranceAPI,
    GetVehicleInsuranceListAPI
}; 