import React, { useCallback } from 'react';
import { Button } from '@view/baseComponent';
import { TodoItemType } from '@store/todoList';

import ss from './DetailTodo.less';

type IProps = Partial<{ onDetail: (item?: TodoItemType ) => void; item: TodoItemType }>;
export function DetailTodo(props: IProps): JSX.Element | null {
    const handleClick = useCallback(() => props.onDetail && props.onDetail(props.item), [props.item]);
    return (
        <Button onClick={handleClick} className={ss.detailBtn} type="primary">
            Detail
        </Button>
    );
}
