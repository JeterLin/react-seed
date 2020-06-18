import { createSlice, SliceCaseReducers, PayloadAction, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { todoService } from '@service/todoService/todo';
import { TodoItemType, ITodoState, ToggleItemType } from './types';

function initTodoList(state: ITodoState, action: PayloadAction<TodoItemType[]>) {
    state.todoList = action.payload;
    state.listLoading = false;
}

const fetchTodoList = createAsyncThunk('todoApp/fetchTodoList', async () => {
    const { data: todoList } = await todoService.listTodo();
    return todoList;
});
const addTodoItem = createAsyncThunk('todoApp/addTodo', async (title, thunkApi) => {
    const { data: okPayload } = await todoService.addTodo({ title });
    thunkApi.dispatch({ type: 'serv/success', payload: { title: '创建成功', msg: '添加待办成功' } });
    return { id: okPayload.id, title };
});
const removeTodoItem = createAsyncThunk('todoApp/removeTodo', async (todoItem: TodoItemType, thunkApi) => {
    await todoService.deleteTodo({ id: todoItem.id }).catch((data) => {
        thunkApi.dispatch({ type: 'serv/error', payload: { title: '删除失败', msg: data.msg } });
    });
    return { id: todoItem.id };
});
const resetState = createAction('todoApp/reset-state');
// const
const todoSlice = createSlice<ITodoState, SliceCaseReducers<ITodoState>>({
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
        toggleItem(state, action: PayloadAction<ToggleItemType>) {
            const { id, done: nextDone } = action.payload;
            const [selectedItem] = state.todoList.filter((item) => item.id === id);
            if (selectedItem) {
                selectedItem.done = nextDone;
            }
        },
        [resetState.type]() {
            return {
                todoList: [],
                listLoading: false,
                addLoading: false,
            };
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
export { TodoItemType, ITodoState as StateType, ToggleItemType };
