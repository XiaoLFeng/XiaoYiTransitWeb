import { BaseApi, MethodType, GetAuthorizationToken } from "../assets/ts/base_api";
import type { AuthLoginDTO, AuthChangePasswordDTO } from "../models/dto/auth_dto";
import type { AuthLoginBackEntity } from "../models/entity/auth_entity";
import type { BaseResponse } from "../models/base_response";

/**
 * # AuthLoginAPI
 * > 该函数用于处理用户登录请求，通过向指定的后端接口发送包含登录信息的数据包，获取用户的登录状态。
 *
 * @param data - {AuthLoginDTO} 用户提供的登录凭据，如用户名和密码等信息。
 * @returns {Promise<BaseResponse | undefined>} - 返回一个 Promise 对象，解析为 AuthLoginResponseEntity 类型或者 undefined。其中包含了用户登录后的相关信息或登录失败的原因。
 * @throws 当网络请求失败、服务器响应异常或传入参数不符合要求时，可能会抛出错误。
 */
const AuthLoginAPI = async (data: AuthLoginDTO): Promise<BaseResponse<AuthLoginBackEntity> | undefined> => {
    return BaseApi<BaseResponse<AuthLoginBackEntity>>(
        MethodType.POST,
        "/api/v1/auth/login",
        data,
        null,
        null,
        null
    );
}

/**
 * # AuthChangePasswordAPI
 * > 该函数用于处理用户修改密码请求，通过向指定的后端接口发送包含原密码和新密码的数据包，实现密码修改功能。
 * > 注意：此接口需要用户已登录状态，会自动添加授权头信息。
 *
 * @param data - {AuthChangePasswordDTO} 用户提供的密码修改信息，包含原密码、新密码和确认新密码。
 * @returns {Promise<BaseResponse<null> | undefined>} - 返回一个 Promise 对象，解析为 AuthChangePasswordResponseEntity 类型或者 undefined。其中包含了密码修改的结果信息。
 * @throws 当网络请求失败、服务器响应异常、用户未登录或传入参数不符合要求时，可能会抛出错误。
 */
const AuthChangePasswordAPI = async (data: AuthChangePasswordDTO): Promise<BaseResponse<void> | undefined> => {
    return BaseApi<BaseResponse<void>>(
        MethodType.PUT,
        "/api/v1/auth/password/change",
        data,
        null,
        null,
        { "Authorization": `Bearer ${GetAuthorizationToken()}` }
    );
}

export {
    AuthLoginAPI,
    AuthChangePasswordAPI
};
