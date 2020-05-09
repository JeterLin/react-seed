import React from 'react';
import { Button } from '@view/baseComponent';

import ss from './ClearTodo.less';
export function ClearTodo<PropsTypes extends Partial<{ onClear: () => void }>>(props: PropsTypes): JSX.Element | null {
    return (
        <Button type="primary" onClick={props.onClear} danger className={ss.clearBtn}>
            Clear
        </Button>
    );
}
