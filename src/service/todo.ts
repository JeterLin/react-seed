import axios from 'axios';
import { ServiceType, BaseRespType, ExceptionHandlerType } from './types';
import { toService, wrapRespException, getStore } from './_utils';

const handleExceptionToStore: ExceptionHandlerType = (err, url, payload) => {
    getStore().dispatch({
        type: 'SERVICE_ERROR',
        payload: {
            err,
            url,
            payload,
        },
    });
};

export const todoService: ServiceType = {
    ...toService({
        addTodo(url, payload) {
            return axios.post<BaseRespType>(url, payload);
        },
        listTodo(url, payload) {
            return axios.get<BaseRespType>(url, { params: payload });
        },
    }),
    ...wrapRespException(
        toService({
            deleteTodo(url, payload) {
                return axios.delete(url, { params: payload });
            },
        }),
        handleExceptionToStore
    ),
};
