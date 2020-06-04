/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
export interface BaseRespType {
    code: number;
    data: any;
    msg?: string;
}
export type CommonMapType = Record<string, unknown>;
export type ServiceHandlerType = (payload?: CommonMapType) => Promise<BaseRespType>;

export type IBaseService<T extends CommonMapType = CommonMapType> = {
    [K in keyof T]: (...args: any[]) => any;
};
export type ServiceType<T extends CommonMapType> = {
    [K in keyof IBaseService<T>]: T[K] extends ServiceHandlerType ? T[K] : never;
};
export type AxiosServiceType<T extends CommonMapType> = {
    [K in keyof IBaseService<T>]: T[K] extends (payload?: CommonMapType) => Promise<AxiosResponse<BaseRespType>> ? T[K] : never;
};

export type ToServiceType<T extends CommonMapType> = {
    [K in keyof AxiosServiceType<T>]: T[K] extends AxiosServiceType<T>[K] ? ServiceHandlerType : never;
};
