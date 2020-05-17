import { AxiosResponse } from 'axios';
export interface BaseRespType {
    code: number;
    data: any;
    errMsg?: string;
}
export type ServiceHandlerType = (payload?: object) => Promise<BaseRespType>;

export type IBaseService<T extends object = object> = {
    [K in keyof T]: Function;
};
export type ServiceType<T extends object> = {
    [K in keyof IBaseService<T>]: T[K] extends ServiceHandlerType ? T[K] : never;
};
export type AxiosServiceType<T extends object> = {
    [K in keyof IBaseService<T>]: T[K] extends (payload?: object) => Promise<AxiosResponse<BaseRespType>> ? T[K] : never;
};

export type ToServiceType<T extends object> = {
    [K in keyof AxiosServiceType<T>]: T[K] extends AxiosServiceType<T>[K] ? ServiceHandlerType : never;
};
