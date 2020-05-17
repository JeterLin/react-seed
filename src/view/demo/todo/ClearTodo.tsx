import React, { useCallback, useState } from 'react';
import { Button, Switch } from '@view/baseComponent';

import ss from './ClearTodo.less';
export type OnClearType = (clearDone?: boolean) => void;
type IProps = Partial<{ onClear: OnClearType }>;
export function ClearTodo(props: IProps): JSX.Element | null {
    const [clearDone, setClearDone] = useState<boolean>(false);
    const handleCheckedChange = useCallback(() => {
        setClearDone((preClearDone) => !preClearDone);
    }, []);
    const handleClearClick = useCallback(() => {
        props.onClear && props.onClear(clearDone);
    }, [clearDone]);
    return (
        <div>
            Clear Done: <Switch size="small" checked={clearDone} onChange={handleCheckedChange} />
            <Button type="primary" onClick={handleClearClick} danger className={ss.clearBtn}>
                Clear
            </Button>
        </div>
    );
}
