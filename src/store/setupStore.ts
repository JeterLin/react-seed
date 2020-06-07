import { configureStore, Reducer, combineReducers } from '@reduxjs/toolkit';
import todo from './todoList';
import todoDetail from './todoDetail';

const customeReducer: Reducer<Record<string, unknown>> = (state = {}) => state;
const rootReducer = combineReducers({ todo, test: customeReducer, todoDetail });
export default function setupStore(): typeof store {
    const store = configureStore({
        reducer: rootReducer,
    });
    return store;
}
export type StoreType = ReturnType<typeof setupStore>;
export type AppDispatch = StoreType['dispatch'];
export type IRootState = ReturnType<typeof rootReducer>;
