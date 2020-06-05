import React from 'react';
import { Button as AntdButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export function Button(props: ButtonProps): JSX.Element {
    return <AntdButton {...props} />;
}
