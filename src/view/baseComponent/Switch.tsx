import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

export function Switch(props: SwitchProps) {
    return <AntdSwitch {...props} />;
}
