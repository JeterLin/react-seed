import { createSlice, SliceCaseReducers, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { todoService } from '@service/todoService/todo';
import { TodoItemType, StateType, ToggleItemType } from './types';

function initTodoList(state: StateType, action: PayloadAction<TodoItemType[]>) {
    state.todoList = action.payload;
    state.listLoading = false;
}

const fetchTodoList = createAsyncThunk('todoApp/fetchTodoList', async () => {
    const { data: todoList } = await todoService.listTodo();
    return todoList;
});
const addTodoItem = createAsyncThunk('todoApp/addTodo', async (title) => {
    const { data: okPayload } = await todoService.addTodo({ title });
    return { id: okPayload.id, title };
});
const removeTodoItem = createAsyncThunk('todoApp/removeTodo', async (todoItem: TodoItemType) => {
    await todoService.deleteTodo({ id: todoItem.id });
    return { id: todoItem.id };
});
const todoSlice = createSlice<StateType, SliceCaseReducers<StateType>>({
    name: 'todoApp',
    initialState: {
        todoList: [],
        listLoading: false,
        addLoading: false,
    },
    reducers: {
        clearItems(state, action: PayloadAction<boolean>) {
            if (action.payload) {
                state.todoList = state.todoList.filter((item) => typeof item.done !== 'boolean' || !item.done);
            } else {
                state.todoList.splice(0, state.todoList.length);
            }
        },
        // delItem(state, action: PayloadAction<TodoItemType>) {
        //     const { id } = action.payload;
        //     state.todoList = state.todoList.filter((item) => item.id !== id);
        // },
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
            state.listLoading = true;
        },
        [String(fetchTodoList.rejected)](state) {
            state.listLoading = false;
        },
        [String(addTodoItem.pending)](state) {
            state.addLoading = true;
        },
        [String(addTodoItem.fulfilled)](state, action: PayloadAction<{ id: string; title: string }>) {
            state.addLoading = false;
            state.todoList.push(action.payload);
        },
        [String(addTodoItem.rejected)](state) {
            state.addLoading = false;
        },
        [String(removeTodoItem.pending)](state) {
            state.listLoading = true;
        },
        [String(removeTodoItem.fulfilled)](state, action: PayloadAction<{ id: string }>) {
            state.listLoading = false;
            state.todoList = state.todoList.filter((item) => item.id !== action.payload.id);
        },
        [String(removeTodoItem.rejected)](state) {
            state.listLoading = false;
        },
    },
});

export default todoSlice.reducer;
export const actions = Object.assign({}, todoSlice.actions, { fetchTodoList, addTodoItem, removeTodoItem });
export { TodoItemType, StateType, ToggleItemType };
