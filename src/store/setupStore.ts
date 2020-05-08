import { configureStore, Reducer, combineReducers } from '@reduxjs/toolkit';
import todo from './todoList';

const customeReducer: Reducer<{}> = (state = {}, action) => state;
const rootReducer = combineReducers({ todo, test: customeReducer });
const store = configureStore({
    reducer: rootReducer,
});
export default store;
export type AppDispatch = typeof store.dispatch;
