import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemType, StateType } from './types';

const todoSlice = createSlice<StateType, SliceCaseReducers<StateType>>({
    name: 'todoApp',
    initialState: [
        {
            id: 1,
            title: 'item 1',
        },
        {
            id: 2,
            title: 'item 2',
        },
        {
            id: 3,
            title: 'item 3',
        },
        {
            id: 4,
            title: 'item 4',
        },
        {
            id: 5,
            title: 'item 5',
        },
        {
            id: 6,
            title: 'item 6',
        },
    ],
    reducers: {
        addItem(state, action: PayloadAction<TodoItemType>) {
            state.push(action.payload);
        },
    },
});

export default todoSlice.reducer;
export const actions = todoSlice.actions;
export { TodoItemType, StateType };
