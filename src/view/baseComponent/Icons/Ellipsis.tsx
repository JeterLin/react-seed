import React from 'react';
import { EllipsisOutlined as AntdEllipsis } from '@ant-design/icons';
import { IconProps } from './types';

export function Ellipsis(props: IconProps): JSX.Element {
    return <AntdEllipsis {...props}/>;
}
