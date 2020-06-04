import { AxiosServiceType, BaseRespType,  ServiceHandlerType, ToServiceType , CommonMapType} from '../types';
// 只处理响应状态为200或304的响应数据，并把service每一个函数的返回类型由Promise<AxiosResponse<BaseRespType>>转化为Promise<BaseRespType>返回
export function toService<T extends CommonMapType>(service: AxiosServiceType<T>): ToServiceType<T> {
    const result: { [K: string]: ServiceHandlerType } = {};
    Object.keys(service).forEach((key) => {
        const nextHandler: ServiceHandlerType = (payload) => {
            return service[key as keyof T](payload).then<BaseRespType>((axiosRespMeta) => {
                if (axiosRespMeta.status === 200 || axiosRespMeta.status === 304) {
                    return Promise.resolve(axiosRespMeta.data);
                }
                return Promise.reject({ err: 'something went wrong' });
            });
        };
        result[key] = nextHandler;
    });

    return result as ToServiceType<T>;
}
