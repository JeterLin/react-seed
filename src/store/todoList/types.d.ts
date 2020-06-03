export type TodoItemType = Partial<{
    title: string;
    id: number | string;
    done: boolean;
}>;

export type ToggleItemType = { id: string | number; done: boolean };
export type StateType = { todoList: Array<TodoItemType> , listLoading: boolean; addLoading: boolean;};
