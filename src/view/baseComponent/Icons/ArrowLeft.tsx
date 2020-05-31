import React from 'react';
import { LeftOutlined as AntdArrowLeft } from '@ant-design/icons';
import { IconProps } from './types';

export function ArrowLeft(props: IconProps): JSX.Element {
    return <AntdArrowLeft {...props}/>;
}
