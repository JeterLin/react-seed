import React from 'react';
import { Input as AntdInput } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';

export function Input(props: InputProps): JSX.Element {
    return <AntdInput {...props}/>
}

export function TextArea(props: TextAreaProps):JSX.Element{
    return <AntdInput.TextArea {...props}/>;
}