// import axios from 'axios';
import { BaseRespType } from '../types';
import { axios, toService, makeUrl } from '../_utils';
export const todoService = toService({
    addTodo(payload) {
        return axios.post<BaseRespType>(makeUrl('todo/add'), payload);
    },
    listTodo() {
        return axios.get<BaseRespType>(makeUrl('todo/list'));
    },
    deleteTodo(payload) {
        return axios.delete<BaseRespType>(makeUrl('todo/delete'), { params: payload });
    },
});
