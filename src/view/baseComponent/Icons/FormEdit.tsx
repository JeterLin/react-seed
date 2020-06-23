import React from 'react';
import { FormOutlined as AntdFormEdit } from '@ant-design/icons';
import { IconProps } from './types';

export function FormEdit(props: IconProps): JSX.Element {
    return <AntdFormEdit {...props} />;
}
