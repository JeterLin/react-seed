import React from 'react';
import { Spin as AntdSpin } from 'antd';
import { SpinProps } from 'antd/lib/spin';
export function Spin (props: SpinProps):JSX.Element {
    return <AntdSpin {...props}/>;
}