import React, { useState, useCallback } from 'react';
import { Checkbox } from '@view/baseComponent';
import { TodoItemType } from '@store/todoList';
import cn from 'classnames';
import '@styles/reset.less';

import ss from './TodoItem.less';

type PropTypesBase = Partial<{ item: TodoItemType; toggleTodo: (nextState: boolean) => void }>;
export function TodoItem<PropTypes extends PropTypesBase>(props: PropTypes): JSX.Element | null {
    const [done, setTaskDone] = useState<boolean>(false);
    const handleCheck = useCallback(() => {
        setTaskDone((preState) => {
            const nextState = !preState;
            props.toggleTodo && props.toggleTodo(nextState);
            return nextState;
        });
    }, []);
    return props.item ? (
        <p>
            <Checkbox checked={done} onChange={handleCheck} />
            <span className={cn(ss.taskText, { [ss.taskDone]: done })}>{props.item.title}</span>
        </p>
    ) : null;
}
