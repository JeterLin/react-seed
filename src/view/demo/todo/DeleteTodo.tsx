import React, { useCallback } from 'react';
import { TodoItemType } from '@store/todoList';
import { Delete } from '@view/baseComponent/Icons';
import ss from './DeleteTodo.less';

type IProps = Partial<{ onDelete: (item: TodoItemType | undefined) => void; item: TodoItemType }>;
export function DeleteTodo(props: IProps): JSX.Element | null {
    const handleClick = useCallback(() => props.onDelete && props.onDelete(props.item), [props.item]);
    return (
        <div className={ss.delBtn} onClick={handleClick}>
            <Delete className={ss.icon}/>
        </div>
    );
}
