import React from 'react';
import { Input } from '@view/baseComponent';

type ReactEventHandlerType = (event: React.KeyboardEvent<HTMLInputElement>) => void;
type PropsType = Partial<{
    onSubmit: ReactEventHandlerType;
}>;
export default function AddTodo(props: PropsType): JSX.Element {
    return (
        <div>
            <Input onPressEnter={props.onSubmit} />
        </div>
    );
}
