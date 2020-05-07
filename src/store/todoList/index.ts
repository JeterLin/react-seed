import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemType } from './types';

type StateType = Array<TodoItemType>;
const todoSlice = createSlice<StateType, SliceCaseReducers<StateType>>({
    name: 'todoApp',
    initialState: [],
    reducers: {
        addItem(state, action: PayloadAction<TodoItemType>) {
            state.push(action.payload);
        },
    },
});
