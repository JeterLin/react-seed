import React, { useCallback } from 'react';
import { Button } from '@view/baseComponent';
import { TodoItemType } from '@store/todoList';

import ss from './DeleteTodo.less';

type IProps = Partial<{ onDelete: (item: TodoItemType | undefined) => void; item: TodoItemType }>;
export function DeleteTodo(props: IProps): JSX.Element | null {
    const handleClick = useCallback(() => props.onDelete && props.onDelete(props.item), [props.item]);
    return (
        <Button onClick={handleClick} className={ss.delBtn} danger type="primary">
            Delete
        </Button>
    );
}
