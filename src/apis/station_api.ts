import { BaseApi, MethodType, GetAuthorizationToken } from "../assets/ts/base_api";
import type { 
    CreateStationDTO, 
    UpdateStationDTO, 
    GetStationListQueryDTO, 
    GetStationDetailQueryDTO, 
    DeleteStationQueryDTO,
    GetStationSimpleListQueryDTO
} from "../models/dto/station_dto";
import type { 
    StationDetailEntity, 
    PagedStationListEntity,
    StationSimpleListEntity
} from "../models/entity/station_entity";
import type { BaseResponse } from "../models/base_response";

/**
 * # CreateStationAPI
 * > 该函数用于创建新的站点信息，通过向指定的后端接口发送包含站点详细信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {CreateStationDTO} 站点的详细信息，包含名称、编码、地址、经纬度、状态等。
 * @returns {Promise<BaseResponse<StationDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含创建的站点详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const CreateStationAPI = async (data: CreateStationDTO): Promise<BaseResponse<StationDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<StationDetailEntity>>(
        MethodType.POST,
        "/api/v1/station",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateStationAPI
 * > 该函数用于更新站点信息，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {UpdateStationDTO} 站点的更新信息，包含站点UUID和需要更新的字段。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateStationAPI = async (data: UpdateStationDTO): Promise<BaseResponse<void> | undefined> => {
    const { station_uuid, ...updateData } = data;
    return BaseApi<BaseResponse<void>>(
        MethodType.PUT,
        `/api/v1/station/${station_uuid}`,
        updateData,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteStationAPI
 * > 该函数用于删除站点信息，通过向指定的后端接口发送包含站点UUID的路径参数和查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {DeleteStationQueryDTO} 包含要删除的站点UUID的查询参数。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteStationAPI = async (params: DeleteStationQueryDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        `/api/v1/station/${params.station_uuid}`,
        null,
        { station_uuid: params.station_uuid },
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetStationDetailAPI
 * > 该函数用于获取站点的详细信息，通过向指定的后端接口发送包含站点UUID的路径参数和查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetStationDetailQueryDTO} 包含站点UUID的查询参数。
 * @returns {Promise<BaseResponse<StationDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含站点详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetStationDetailAPI = async (params: GetStationDetailQueryDTO): Promise<BaseResponse<StationDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<StationDetailEntity>>(
        MethodType.GET,
        `/api/v1/station/${params.station_uuid}`,
        null,
        { station_uuid: params.station_uuid },
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetStationListAPI
 * > 该函数用于获取站点列表信息，支持分页和筛选功能，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetStationListQueryDTO} 包含分页和筛选参数的查询对象，如页码、每页数量、名称、编码、状态等。
 * @returns {Promise<BaseResponse<PagedStationListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含分页站点列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetStationListAPI = async (params?: GetStationListQueryDTO): Promise<BaseResponse<PagedStationListEntity> | undefined> => {
    return BaseApi<BaseResponse<PagedStationListEntity>>(
        MethodType.GET,
        "/api/v1/stations",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetStationSimpleListAPI
 * > 该函数用于获取站点简单列表信息，适用于下拉框选择等场景，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetStationSimpleListQueryDTO} 包含筛选参数的查询对象，如状态筛选等。
 * @returns {Promise<BaseResponse<StationSimpleListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含站点简单列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetStationSimpleListAPI = async (params?: GetStationSimpleListQueryDTO): Promise<BaseResponse<StationSimpleListEntity> | undefined> => {
    return BaseApi<BaseResponse<StationSimpleListEntity>>(
        MethodType.GET,
        "/api/v1/stations/simple",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

export {
    CreateStationAPI,
    UpdateStationAPI,
    DeleteStationAPI,
    GetStationDetailAPI,
    GetStationListAPI,
    GetStationSimpleListAPI
}; 