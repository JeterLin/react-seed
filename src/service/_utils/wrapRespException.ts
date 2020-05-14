import { ServiceType, ExceptionHandlerType } from '../types';

// 对toService方法返回的对象，进行异常响应数据处理
export function wrapRespException(service: ServiceType, handleException?: ExceptionHandlerType): ServiceType {
    const result: ServiceType = {};
    Object.keys(service).forEach((key) => {
        const nextHandler: ServiceType[typeof key] = (url, payload) => {
            return service[key](url, payload).catch((err) => {
                handleException && handleException(err, url, payload);
                return Promise.reject(err);
            });
        };
        service[key] = nextHandler;
    });
    return result;
}
