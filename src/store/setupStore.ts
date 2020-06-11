import { configureStore, Reducer, combineReducers , getDefaultMiddleware} from '@reduxjs/toolkit';
import {values} from 'lodash';
// reducers
import * as mainReducers from './mainReducers';
// middlewares
import * as middlewares from '@mw';

const customeReducer: Reducer<Record<string, unknown>> = (state = {}) => state;
const rootReducer = combineReducers({ test: customeReducer, ...mainReducers });
export default function setupStore(): typeof store {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [...values(middlewares), ...getDefaultMiddleware()]
    });
    return store;
}
export type StoreType = ReturnType<typeof setupStore>;
export type AppDispatch = StoreType['dispatch'];
export type IRootState = ReturnType<typeof rootReducer>;
