/**
 * # 基础响应结构
 * 所有API响应的基础结构
 */
export interface BaseResponse<T> {
    /** 上下文 */
    context: string;
    /** 状态码 */
    code: number;
    /** 消息返回 */
    message: string;
    /** 时间 */
    time: number;
    /** 耗时 */
    overhead?: number;
    /** 数据返回 */
    data: T;
}