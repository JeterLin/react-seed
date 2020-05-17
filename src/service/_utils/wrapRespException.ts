import { ServiceType , ServiceHandlerType} from '../types';

// 对toService方法返回的对象，进行异常响应数据处理
export function wrapRespException<T extends object>(service: ServiceType<T>): ServiceType<T> {
    const result: {[K : string]: ServiceHandlerType} = {};
    Object.keys(service).forEach((key) => {
        const nextHandler: ServiceHandlerType = (payload) => {
            return service[key as keyof T](payload).catch((err) => {
                return Promise.reject(err);
            });
        };
        result[key] = nextHandler;
    });
    return result as ServiceType<T>;
}
