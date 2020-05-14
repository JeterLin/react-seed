import { AxiosResponse } from 'axios';
export interface BaseRespType {
    code: number;
    data: any;
}
export type ServiceHandlerType = (url: string, payload: object) => Promise<BaseRespType>;
export type ServiceType = {
    [FuncName: string]: ServiceHandlerType;
};

export type AxiosServiceType = {
    [FuncName: string]: (url: string, payload: object) => Promise<AxiosResponse<BaseRespType>>;
};

export type ExceptionHandlerType = (err: any, url: string, payload: object) => void;
