import React from 'react';

import ss from './BtnGroup.less';
type IProps = Partial<{ children: (JSX.Element | null)[] }>;
export function BtnGroup(props: IProps): JSX.Element {
    return <div className={ss.btnGroup}>{props.children}</div>;
}
