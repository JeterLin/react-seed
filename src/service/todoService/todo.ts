import { BaseRespType } from '../types';
import { axios, toService } from '../_utils';
const config = {
    addTodo(payload: { title: string }) {
        return axios.post<BaseRespType>('todo/add', payload);
    },
    listTodo() {
        return axios.get<BaseRespType>('todo/list');
    },
    deleteTodo(payload: { id: string }) {
        return axios.delete<BaseRespType>('todo/delete', { params: payload });
    },
};
export const todoService = toService(config);
