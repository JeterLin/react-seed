import React, { useState } from 'react';
import { Checkbox } from 'antd';
import cn from 'classnames';
import '@styles/reset.less';

import ss from './TodoItem.less';

type PropTypes = Partial<{
    item: Partial<{
        title: string;
        id: number | string
    }>;
}>;
export function TodoItem(props: PropTypes): JSX.Element | null {
    const [done, setTaskDone] = useState<boolean>(false);
    return props.item ? (
        <p>
            <Checkbox checked={done} />
            <span className={cn({ [ss.taskDone]: done })}>{props.item.title}</span>
        </p>
    ) : null;
}
