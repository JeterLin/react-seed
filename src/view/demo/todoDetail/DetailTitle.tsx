import React, { useState, useCallback, memo } from 'react';
import { Dropdown, Ellipsis, Menu, ItemConfig } from '@view/baseComponent';

import ss from './DetailTitle.less';

const MenuItemsConfig: ItemConfig[] = [
    { title: 'Detail', key: 'todo-detail' },
    { title: 'Log', key: 'todo-log' },
];

interface IProps {
    onTitleChange?: (nextTitle: string) => void;
}

export function DetailTitle(props: IProps): JSX.Element {
    const [title, setTitle] = useState<string>(MenuItemsConfig[0].title);
    const handleTitleChange = useCallback((params) => {
        setTitle(params.itemConfig.title);
    }, []);
    const menu = <Menu menuItems={MenuItemsConfig} onClick={handleTitleChange} />;
    return (
        <div className={ss.wrapper}>
            <span className={ss.detailTitle}>{title}</span>
            <Dropdown placement="bottomCenter" overlay={menu}>
                <Ellipsis className={ss.ellipsisBtn}/>
            </Dropdown>
        </div>
    );
}
