import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemType, StateType, ToggleItemType } from './types';

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
        clearItems(state, action: PayloadAction<boolean>) {
            if (action.payload) {
                state.todoList = state.todoList.filter((item) => typeof item.done !== 'boolean' || !item.done);
            } else {
                state.todoList.splice(0, state.todoList.length);
            }
        },
        delItem(state, action: PayloadAction<TodoItemType>) {
            const { id } = action.payload;
            state.todoList = state.todoList.filter((item) => item.id !== id);
        },
        toggleItem(state, action: PayloadAction<ToggleItemType>) {
            const { id, done: nextDone } = action.payload;
            const [selectedItem] = state.todoList.filter((item) => item.id === id);
            if (selectedItem) {
                selectedItem.done = nextDone;
            }
        },
    },
});

export default todoSlice.reducer;
export const actions = todoSlice.actions;
export { TodoItemType, StateType, ToggleItemType };
