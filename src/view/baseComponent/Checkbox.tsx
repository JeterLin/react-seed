import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
export function Checkbox(props: CheckboxProps): JSX.Element {
    return <AntdCheckbox {...props} />;
}
