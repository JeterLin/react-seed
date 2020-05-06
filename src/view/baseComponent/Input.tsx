import React from 'react';
import { Input as AntdInput } from 'antd';
import { InputProps } from 'antd/lib/input';

export function Input(props: InputProps): JSX.Element {
    return <AntdInput {...props}/>
}
