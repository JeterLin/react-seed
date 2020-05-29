import React from 'react';
import {IRouteChildrenProps} from '@router';

import ss from './TodoDetail.less';

type IProps = IRouteChildrenProps;
function TodoDetail(props: IProps) {
    return (
        <div className={ss.wrapper}>
            <header className={ss.header}></header>
        </div>
    );
}

export { TodoDetail as default };
