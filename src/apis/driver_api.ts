import { BaseApi, MethodType, GetAuthorizationToken } from "../assets/ts/base_api";
import type { 
    CreateDriverDTO, 
    UpdateDriverDTO, 
    GetDriverListQueryDTO, 
    GetDriverDetailQueryDTO, 
    DeleteDriverQueryDTO,
    GetDriverScheduleQueryDTO
} from "../models/dto/driver_dto";
import type { 
    DriverDetailEntity, 
    PagedDriverListEntity, 
    DriverScheduleEntity,
    SimpleDriverListEntity
} from "../models/entity/driver_entity";
import type { BaseResponse } from "../models/base_response";

/**
 * # CreateDriverAPI
 * > 该函数用于创建新的司机信息，通过向指定的后端接口发送包含司机详细信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {CreateDriverDTO} 司机的详细信息，包含工号、姓名、身份证号、联系方式、驾驶证信息等。
 * @returns {Promise<BaseResponse<DriverDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含创建的司机详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const CreateDriverAPI = async (data: CreateDriverDTO): Promise<BaseResponse<DriverDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<DriverDetailEntity>>(
        MethodType.POST,
        "/api/v1/driver",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateDriverAPI
 * > 该函数用于更新司机信息，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {UpdateDriverDTO} 司机的更新信息，包含司机UUID和需要更新的字段。
 * @returns {Promise<BaseResponse<DriverDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含更新后的司机详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateDriverAPI = async (data: UpdateDriverDTO): Promise<BaseResponse<DriverDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<DriverDetailEntity>>(
        MethodType.PUT,
        "/api/v1/driver",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteDriverAPI
 * > 该函数用于删除司机信息，通过向指定的后端接口发送包含司机UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {DeleteDriverQueryDTO} 包含要删除的司机UUID的查询参数。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteDriverAPI = async (params: DeleteDriverQueryDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        "/api/v1/driver",
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetDriverDetailAPI
 * > 该函数用于获取司机的详细信息，通过向指定的后端接口发送包含司机UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetDriverDetailQueryDTO} 包含司机UUID的查询参数。
 * @returns {Promise<BaseResponse<DriverDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含司机详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetDriverDetailAPI = async (params: GetDriverDetailQueryDTO): Promise<BaseResponse<DriverDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<DriverDetailEntity>>(
        MethodType.GET,
        "/api/v1/driver/detail",
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetDriverListAPI
 * > 该函数用于获取司机列表信息，支持分页和筛选功能，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetDriverListQueryDTO} 包含分页和筛选参数的查询对象，如页码、每页数量、工号、姓名、状态等。
 * @returns {Promise<BaseResponse<PagedDriverListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含分页司机列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetDriverListAPI = async (params?: GetDriverListQueryDTO): Promise<BaseResponse<PagedDriverListEntity> | undefined> => {
    return BaseApi<BaseResponse<PagedDriverListEntity>>(
        MethodType.GET,
        "/api/v1/driver/list",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetDriverScheduleAPI
 * > 该函数用于获取司机的排班信息，通过向指定的后端接口发送包含司机UUID和日期范围的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetDriverScheduleQueryDTO} 包含司机UUID、开始日期和结束日期的查询参数。
 * @returns {Promise<BaseResponse<DriverScheduleEntity> | undefined>} - 返回一个 Promise 对象，解析为包含司机排班信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetDriverScheduleAPI = async (params: GetDriverScheduleQueryDTO): Promise<BaseResponse<DriverScheduleEntity> | undefined> => {
    return BaseApi<BaseResponse<DriverScheduleEntity>>(
        MethodType.GET,
        "/api/v1/driver/schedule",
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetDriverSimpleListAPI
 * > 该函数用于获取司机简易列表信息，主要用于选择组件，通过向指定的后端接口发送请求。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @returns {Promise<BaseResponse<SimpleDriverListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含司机简易列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录时，可能会抛出错误。
 */
const GetDriverSimpleListAPI = async (): Promise<BaseResponse<SimpleDriverListEntity> | undefined> => {
    return BaseApi<BaseResponse<SimpleDriverListEntity>>(
        MethodType.GET,
        "/api/v1/driver/list/simple",
        null,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

export {
    CreateDriverAPI,
    UpdateDriverAPI,
    DeleteDriverAPI,
    GetDriverDetailAPI,
    GetDriverListAPI,
    GetDriverSimpleListAPI,
    GetDriverScheduleAPI
}; 