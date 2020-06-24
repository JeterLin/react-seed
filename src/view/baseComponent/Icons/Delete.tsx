import React from 'react';
import { DeleteOutlined as AntdDelete } from '@ant-design/icons';
import { IconProps } from './types';

export function Delete(props: IconProps): JSX.Element {
    return <AntdDelete {...props}/>;
}
