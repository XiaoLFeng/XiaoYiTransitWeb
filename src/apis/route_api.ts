import { BaseApi, MethodType, GetAuthorizationToken } from "../assets/ts/base_api";
import type { 
    CreateRouteDTO, 
    UpdateRouteDTO, 
    GetRouteListQueryDTO, 
    GetRouteDetailQueryDTO, 
    DeleteRouteQueryDTO,
    AddRouteStationDTO,
    UpdateRouteStationDTO,
    GetRouteStationsQueryDTO,
    DeleteRouteStationQueryDTO
} from "../models/dto/route_dto";
import type { 
    RouteDetailEntity, 
    PagedRouteListEntity,
    RouteStationsEntity
} from "../models/entity/route_entity";
import type { BaseResponse } from "../models/base_response";

// ================================
// 线路管理相关 API 接口
// ================================

/**
 * # CreateRouteAPI
 * > 该函数用于创建新的线路信息，通过向指定的后端接口发送包含线路详细信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {CreateRouteDTO} 线路的详细信息，包含线路编号、名称、起终点站、票价、状态等。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为包含创建结果的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const CreateRouteAPI = async (data: CreateRouteDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.POST,
        "/api/v1/route",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateRouteAPI
 * > 该函数用于更新线路信息，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param routeUuid - {string} 线路UUID，用于路径参数。
 * @param data - {UpdateRouteDTO} 线路的更新信息，包含线路UUID和需要更新的字段。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为包含更新结果的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateRouteAPI = async (routeUuid: string, data: UpdateRouteDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.PUT,
        `/api/v1/route/${routeUuid}`,
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteRouteAPI
 * > 该函数用于删除线路信息，通过向指定的后端接口发送包含线路UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param routeUuid - {string} 线路UUID，用于路径参数。
 * @param params - {DeleteRouteQueryDTO} 包含要删除的线路UUID的查询参数。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteRouteAPI = async (routeUuid: string, params: DeleteRouteQueryDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        `/api/v1/route/${routeUuid}`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetRouteDetailAPI
 * > 该函数用于获取线路的详细信息，通过向指定的后端接口发送包含线路UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param routeUuid - {string} 线路UUID，用于路径参数。
 * @param params - {GetRouteDetailQueryDTO} 包含线路UUID的查询参数。
 * @returns {Promise<BaseResponse<RouteDetailEntity> | undefined>} - 返回一个 Promise 对象，解析为包含线路详细信息的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetRouteDetailAPI = async (routeUuid: string, params: GetRouteDetailQueryDTO): Promise<BaseResponse<RouteDetailEntity> | undefined> => {
    return BaseApi<BaseResponse<RouteDetailEntity>>(
        MethodType.GET,
        `/api/v1/route/${routeUuid}`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetRouteListAPI
 * > 该函数用于获取线路列表信息，支持分页和筛选功能，通过向指定的后端接口发送查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param params - {GetRouteListQueryDTO} 包含分页和筛选参数的查询对象，如页码、每页数量、线路编号、名称、状态等。
 * @returns {Promise<BaseResponse<PagedRouteListEntity> | undefined>} - 返回一个 Promise 对象，解析为包含分页线路列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetRouteListAPI = async (params?: GetRouteListQueryDTO): Promise<BaseResponse<PagedRouteListEntity> | undefined> => {
    return BaseApi<BaseResponse<PagedRouteListEntity>>(
        MethodType.GET,
        "/api/v1/routes",
        null,
        params || {},
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

// ================================
// 线路站点管理相关 API 接口
// ================================

/**
 * # AddRouteStationAPI
 * > 该函数用于向线路添加站点，通过向指定的后端接口发送包含站点信息的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param routeUuid - {string} 线路UUID，用于路径参数。
 * @param data - {AddRouteStationDTO} 站点的详细信息，包含站点UUID、顺序、距离、预计到达时间等。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为包含添加结果的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const AddRouteStationAPI = async (routeUuid: string, data: AddRouteStationDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.POST,
        `/api/v1/route/${routeUuid}/station`,
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # UpdateRouteStationAPI
 * > 该函数用于更新线路站点信息，通过向指定的后端接口发送包含更新数据的数据包。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param routeStationUuid - {string} 线路站点UUID，用于路径参数。
 * @param data - {UpdateRouteStationDTO} 线路站点的更新信息，包含顺序、距离、预计到达时间等。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为包含更新结果的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const UpdateRouteStationAPI = async (routeStationUuid: string, data: UpdateRouteStationDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.PUT,
        `/api/v1/route/station/${routeStationUuid}`,
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # DeleteRouteStationAPI
 * > 该函数用于从线路中删除站点，通过向指定的后端接口发送包含站点UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param routeStationUuid - {string} 线路站点UUID，用于路径参数。
 * @param params - {DeleteRouteStationQueryDTO} 包含要删除的线路站点UUID的查询参数。
 * @returns {Promise<BaseResponse<void> | undefined>} - 返回一个 Promise 对象，解析为 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const DeleteRouteStationAPI = async (routeStationUuid: string, params: DeleteRouteStationQueryDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.DELETE,
        `/api/v1/route/station/${routeStationUuid}`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

/**
 * # GetRouteStationsAPI
 * > 该函数用于获取线路的站点列表，通过向指定的后端接口发送包含线路UUID的查询参数。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param routeUuid - {string} 线路UUID，用于路径参数。
 * @param params - {GetRouteStationsQueryDTO} 包含线路UUID的查询参数。
 * @returns {Promise<BaseResponse<RouteStationsEntity> | undefined>} - 返回一个 Promise 对象，解析为包含线路站点列表的 BaseResponse 类型或者 undefined。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const GetRouteStationsAPI = async (routeUuid: string, params: GetRouteStationsQueryDTO): Promise<BaseResponse<RouteStationsEntity> | undefined> => {
    return BaseApi<BaseResponse<RouteStationsEntity>>(
        MethodType.GET,
        `/api/v1/route/${routeUuid}/stations`,
        null,
        params,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

export {
    CreateRouteAPI,
    UpdateRouteAPI,
    DeleteRouteAPI,
    GetRouteDetailAPI,
    GetRouteListAPI,
    AddRouteStationAPI,
    UpdateRouteStationAPI,
    DeleteRouteStationAPI,
    GetRouteStationsAPI
}; 