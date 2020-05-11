import React, { useCallback, useState } from 'react';
import { Input } from '@view/baseComponent';
import ss from './AddTodo.less';

type PropsType = Partial<{
    onSubmit: (event: string) => void;
}>;
export function AddTodo(props: PropsType): JSX.Element {
    const [text, setText] = useState<string>('');
    const handleSubmit = useCallback((e) => {
        props.onSubmit && props.onSubmit(text);
        setText('');
    }, [text]);
    const handleChange = useCallback((e) => {
        setText(e.target.value);
    }, []);
    return (
        <div className={ss.todoWrapper}>
            <Input onPressEnter={handleSubmit} onChange={handleChange} value={text} size="large" placeholder="Press enter to submit"/>
        </div>
    );
}
