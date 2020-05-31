import React from 'react';
import {IRouteChildrenProps} from '@router';
import {ArrowLeft} from '@view/baseComponent';

import ss from './TodoDetail.less';
import {DetailTitle} from './DetailTitle';

type IProps = IRouteChildrenProps;
function TodoDetail(props: IProps) {
    return (
        <div className={ss.wrapper}>
            <header className={ss.header}>
                <ArrowLeft/>
                <DetailTitle/>
            </header>
        </div>
    );
}

export { TodoDetail as default };
