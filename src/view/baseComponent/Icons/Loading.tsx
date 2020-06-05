import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { IconProps } from './types';

export function Loading(props: IconProps): JSX.Element {
    return <LoadingOutlined {...props} />;
}
