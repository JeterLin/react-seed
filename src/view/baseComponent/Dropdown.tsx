import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

interface IPropsExt {
    children?: JSX.Element[] | JSX.Element;
}
export function Dropdown(props: DropDownProps & IPropsExt): JSX.Element {
    return <AntdDropdown {...props} />;
}
