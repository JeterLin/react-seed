import React from 'react';
import { LeftOutlined as AntdArrowLeft } from '@ant-design/icons';
import { IconProps } from './types';
type IPropsExt = { onClick: () => void };
export function ArrowLeft(props: IconProps & IPropsExt): JSX.Element {
    return <AntdArrowLeft {...props} />;
}
