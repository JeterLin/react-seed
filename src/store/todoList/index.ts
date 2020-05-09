import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemType, StateType } from './types';

const todoSlice = createSlice<StateType, SliceCaseReducers<StateType>>({
    name: 'todoApp',
    initialState: {
        todoList: [
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
    },
    reducers: {
        addItem(state, action: PayloadAction<TodoItemType>) {
            state.todoList.push(action.payload);
        },
        clearItems(state) {
            // state = [];
            state.todoList.splice(0, state.todoList.length);
        },
        delItem(state, action: PayloadAction<TodoItemType>) {
            const { id } = action.payload;
            // state.splice(state.indexOf());
            state.todoList = state.todoList.filter((item) => item.id !== id);
        },
    },
});

export default todoSlice.reducer;
export const actions = todoSlice.actions;
export { TodoItemType, StateType };
