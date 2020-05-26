import { createSlice, SliceCaseReducers, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { todoService } from '@service/todoService/todo';
import { TodoItemType, StateType, ToggleItemType } from './types';
function addItem(state: StateType, action: PayloadAction<TodoItemType>) {
    state.todoList.push(action.payload);
}

function initTodoList(state: StateType, action: PayloadAction<TodoItemType[]>) {
    state.todoList = action.payload;
    state.loading = false;
}

const fetchTodoList = createAsyncThunk('todoApp/fetchTodoList', async () => {
    const { data: todoList } = await todoService.listTodo();
    return todoList;
});

const todoSlice = createSlice<StateType, SliceCaseReducers<StateType>>({
    name: 'todoApp',
    initialState: {
        todoList: [],
        loading: false,
    },
    reducers: {
        addItem,
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
    extraReducers: {
        [String(fetchTodoList.fulfilled)]: initTodoList,
        [String(fetchTodoList.pending)](state) {
            state.loading = true;
        },
        [String(fetchTodoList.rejected)](state) {
            state.loading = false;
        },
    },
});

export default todoSlice.reducer;
export const actions = Object.assign({}, todoSlice.actions, { fetchTodoList });
export { TodoItemType, StateType, ToggleItemType };
