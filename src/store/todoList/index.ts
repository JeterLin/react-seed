import { createSlice, SliceCaseReducers, PayloadAction, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { todoService} from '@service';
import { TodoItemType, ITodoState, ToggleItemType } from './types';

function initTodoList(state: ITodoState, action: PayloadAction<TodoItemType[]>) {
    state.todoList = action.payload;
    state.listLoading = false;
}

const fetchTodoList = createAsyncThunk('todoApp/fetchTodoList', async () => {
    const { data: todoList } = await todoService.listTodo();
    return todoList;
});
const addTodoItem = createAsyncThunk<{ id: string; title: string }, string>('todoApp/addTodo', async (title, thunkApi) => {
    const { data: okPayload } = await todoService.addTodo({ title });
    thunkApi.dispatch({ type: 'serv/success', payload: { title: '创建成功', msg: '添加待办成功' } });
    return { id: okPayload.id, title };
});
const removeTodoItem = createAsyncThunk('todoApp/removeTodo', async (todoItem: TodoItemType, thunkApi) => {
    return todoService
        .deleteTodo({ id: todoItem.id })
        .then(() => {
            return Promise.resolve({ id: todoItem.id });
        })
        .catch((data) => {
            thunkApi.dispatch({ type: 'serv/error', payload: { title: '删除失败', msg: data.msg } });
            return data;
        });
});
const initialState: ITodoState = {
    todoList: [],
    listLoading: false,
    addLoading: false,
};
const resetTodoList = createAction('todoApp/resetList');
const todoSlice = createSlice<ITodoState, SliceCaseReducers<ITodoState>>({
    name: 'todoApp',
    initialState,
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
        resetList(state) {
            state.todoList = initialState.todoList;
        },
    },
    extraReducers: {
        [fetchTodoList.fulfilled.type]: initTodoList,
        [fetchTodoList.pending.type](state) {
            state.listLoading = true;
        },
        [fetchTodoList.rejected.type](state) {
            state.listLoading = false;
        },
        [addTodoItem.pending.type](state) {
            state.addLoading = true;
        },
        [addTodoItem.fulfilled.type](state, action: PayloadAction<{ id: string; title: string }>) {
            state.addLoading = false;
            state.todoList.push(action.payload);
        },
        [addTodoItem.rejected.type](state) {
            state.addLoading = false;
        },
        [removeTodoItem.pending.type](state) {
            state.listLoading = true;
        },
        [removeTodoItem.fulfilled.type](state, action: PayloadAction<{ id: string }>) {
            state.listLoading = false;
            state.todoList = state.todoList.filter((item) => item.id !== action.payload.id);
        },
        [removeTodoItem.rejected.type](state) {
            state.listLoading = false;
        },
    },
});

export default todoSlice.reducer;
export const actions = Object.assign({}, todoSlice.actions, { fetchTodoList, addTodoItem, removeTodoItem, resetTodoList });
export { TodoItemType, ITodoState as StateType, ToggleItemType };
