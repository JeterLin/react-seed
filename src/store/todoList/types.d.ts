export type TodoItemType = Partial<{
    title: string;
    id: number | string;
    done: boolean;
}>;

export type StateType = { todoList: Array<TodoItemType> };
