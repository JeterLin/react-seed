import React, { useCallback, useState } from 'react';
import { Input, Loading } from '@view/baseComponent';
import ss from './AddTodo.less';

type IProps = Partial<{
    onSubmit: (event: string) => void;
    inputLoading: boolean;
}>;
export function AddTodo(props: IProps): JSX.Element {
    const [text, setText] = useState<string>('');
    const { inputLoading, onSubmit } = props;
    const handleSubmit = useCallback(
        () => {
            onSubmit && onSubmit(text);
            setText('');
        },
        [text]
    );
    const handleChange = useCallback((e) => {
        setText(e.target.value);
    }, []);
    const loadingSuffix = inputLoading ? <Loading /> : null;
    return (
        <div className={ss.todoWrapper}>
            <Input onPressEnter={handleSubmit} onChange={handleChange} value={text} disabled={inputLoading} suffix={loadingSuffix} size="large" placeholder="Press enter to submit" />
        </div>
    );
}
