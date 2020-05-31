import React from 'react';
import { Popover as AntdPopover } from 'antd';
import { PopoverProps } from 'antd/lib/popover';
export function Popover(props: PopoverProps): JSX.Element {
    return <AntdPopover {...props}/>;
}
