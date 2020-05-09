import React, { useCallback } from 'react';
import { Button } from '@view/baseComponent';
import { TodoItemType } from '@store/todoList';

import ss from './DetailTodo.less';

export function DetailTodo<PropTypes extends Partial<{ onDetail: (item: TodoItemType | undefined) => void; item: TodoItemType }>>(props: PropTypes): JSX.Element | null {
    const handleClick = useCallback(() => props.onDetail && props.onDetail(props.item), [props.item]);
    return (
        <Button onClick={handleClick} className={ss.detailBtn} type="primary">
            Detail
        </Button>
    );
}
