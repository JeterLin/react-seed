import React, { useState, useCallback } from 'react';
import { Checkbox } from '@view/baseComponent';
import { TodoItemType } from '@store/todoList';
import cn from 'classnames';
import '@styles/reset.less';

import ss from './TodoItem.less';

// type PropTypesBase = { item: TodoItemType } & Partial<{ onToggleTodo: (item: TodoItemType, nextState: boolean) => void }>;
type IProps = { item: TodoItemType } & Partial<{ onToggleTodo: (item: TodoItemType, nextState: boolean) => void }>;
export function TodoItem(props: IProps): JSX.Element | null {
    const { item, onToggleTodo } = props;
    const handleCheck = useCallback(() => {
        onToggleTodo && onToggleTodo(item, !item.done);
    }, [item]);
    return item ? (
        <p>
            <Checkbox checked={item.done} onChange={handleCheck} />
            <span className={cn(ss.taskText, { [ss.taskDone]: item.done })}>{item.title}</span>
        </p>
    ) : null;
}
