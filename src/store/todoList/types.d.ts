export type TodoItemType = Partial<{
    title: string;
    id: number | string;
}>;

export type StateType = Array<TodoItemType>;
