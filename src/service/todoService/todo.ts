import { BaseRespType } from '../types';
import { axios, toService, makeUrl } from '../_utils';
const config = {
    addTodo(payload: { title: string }) {
        return axios.post<BaseRespType>(makeUrl('todo/add'), payload);
    },
    listTodo() {
        return axios.get<BaseRespType>(makeUrl('todo/list'));
    },
    deleteTodo(payload: { id: string }) {
        return axios.delete<BaseRespType>(makeUrl('todo/delete'), { params: payload });
    },
};
export const todoService = toService(config);
