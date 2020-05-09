import React, { useCallback } from 'react';
import { Button } from '@view/baseComponent';
import { TodoItemType } from '@store/todoList';

import ss from './DeleteTodo.less';

export function DeleteTodo<PropTypes extends Partial<{ onDelete: (item: TodoItemType | undefined) => void; item: TodoItemType }>>(props: PropTypes): JSX.Element | null {
    const handleClick = useCallback(() => props.onDelete && props.onDelete(props.item), [props.item]);
    return (
        <Button onClick={handleClick} className={ss.delBtn} danger type="primary">
            Delete
        </Button>
    );
}
