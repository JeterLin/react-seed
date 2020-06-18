// 这个文件的类型定义，只允许在todo list的相关业务逻辑代码中使用
export type TodoItemType = Partial<{
    title: string;
    id: number | string;
    done: boolean;
}>;

export type ToggleItemType = { id: string | number; done: boolean };
export type ITodoState = { todoList: Array<TodoItemType> , listLoading: boolean; addLoading: boolean;};
