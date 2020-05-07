import { configureStore, Action, Reducer } from '@reduxjs/toolkit';
// import {} from './todoList';
type RootStateType = Partial<{ [key: string]: any }>;
// const rootReducer = (state: RootStateType, action: Action): RootStateType => state;
const rootReducer: Reducer<RootStateType, Action> = (state = {}, action) => state;
type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
    reducer: rootReducer,
});

type AppDispatch = typeof store.dispatch;
