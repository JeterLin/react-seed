import React from 'react';

import ss from './BtnGroup.less';
export function BtnGroup<PropTypes extends Partial<{ children: (JSX.Element | null)[] }>>(props: PropTypes) {
    return <div className={ss.btnGroup}>{props.children}</div>;
}
