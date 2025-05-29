import { BaseApi, MethodType, GetAuthorizationToken } from "../assets/ts/base_api";
import type { 
    CreateMaintenanceDTO, 
    UpdateMaintenanceDTO, 
    GetMaintenanceListQueryDTO, 
} from "../models/dto/maintenance_dto";
import type { 
    MaintenanceDetailEntity, 
    PagedMaintenanceListEntity
} from "../models/entity/maintenance_entity";
import type { BaseResponse } from "../models/base_response";

/**
 * # CreateMaintenanceAPI
 * > 该函数用于创建新的维修记录，通过向指定的后端接口发送包含维修详细信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {CreateMaintenanceDTO} 维修记录的详细信息，包含车辆UUID、维修类型、维修描述等。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const CreateMaintenanceAPI = async (data: CreateMaintenanceDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.POST,
        "/api/v1/maintenance",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateMaintenanceAPI
 * > 该函数用于更新维修记录，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param maintenanceUuid - {string} 维修记录UUID，用于指定要更新的维修记录。
 * @param data - {UpdateMaintenanceDTO} 维修记录的更新信息，包含维修UUID和需要更新的字段。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateMaintenanceAPI = async (maintenanceUuid: string, data: UpdateMaintenanceDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.PUT,
        `/api/v1/maintenance/${maintenanceUuid}`,
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteMaintenanceAPI
 * > 该函数用于删除维修记录，通过向指定的后端接口发送包含维修UUID的路径参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param maintenanceUuid - {string} 维修记录UUID，用于指定要删除的维修记录。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteMaintenanceAPI = async (maintenanceUuid: string): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        `/api/v1/maintenance/${maintenanceUuid}`,
        null,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetMaintenanceDetailAPI
 * > 该函数用于获取维修记录的详细信息，通过向指定的后端接口发送包含维修UUID的路径参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param maintenanceUuid - {string} 维修记录UUID，用于指定要获取详情的维修记录。
 * @returns {Promise<BaseResponse<MaintenanceDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含维修记录详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetMaintenanceDetailAPI = async (maintenanceUuid: string): Promise<BaseResponse<MaintenanceDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<MaintenanceDetailEntity>>(
        MethodType.GET,
        `/api/v1/maintenance/${maintenanceUuid}`,
        null,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetMaintenanceListAPI
 * > 该函数用于获取维修记录列表信息，支持分页和筛选功能，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetMaintenanceListQueryDTO} 包含分页和筛选参数的查询对象，如页码、每页数量、车辆UUID、维修类型、状态、日期范围等。
 * @returns {Promise<BaseResponse<PagedMaintenanceListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含分页维修记录列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetMaintenanceListAPI = async (params?: GetMaintenanceListQueryDTO): Promise<BaseResponse<PagedMaintenanceListEntity> | undefined> => {
    return BaseApi<BaseResponse<PagedMaintenanceListEntity>>(
        MethodType.GET,
        "/api/v1/maintenance",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

export {
    CreateMaintenanceAPI,
    UpdateMaintenanceAPI,
    DeleteMaintenanceAPI,
    GetMaintenanceDetailAPI,
    GetMaintenanceListAPI
}; 