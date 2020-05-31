import React, { useMemo, useCallback } from 'react';
import { Menu as AntdMenu } from 'antd';
import { MenuProps, ClickParam } from 'antd/lib/menu';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';
import { SubMenuProps } from 'antd/lib/menu/SubMenu';

import { arrayNotEmpty } from '@utils';

const AntdMenuItem = AntdMenu.Item;
const AntdSubMenu = AntdMenu.SubMenu;

export type SubMenuConfigType = SubMenuProps & { title: string; children?: ItemConfig[]; key: string };
export type MenuItemConfigType = MenuItemProps & { title: string; children?: ItemConfig[]; key: string };
export type ItemConfig = SubMenuConfigType | MenuItemConfigType;
interface IPropsExt {
    menuItems?: ItemConfig[];
    onClick?: (params: ClickParam & { itemConfig: ItemConfig }) => void;
}
function isSubmenu(item: ItemConfig): item is SubMenuConfigType {
    return arrayNotEmpty(item.children);
}

function renderMenus(menuItems?: ItemConfig[]): JSX.Element[] | null {
    if (arrayNotEmpty(menuItems)) {
        return menuItems.map((item) => renderMenuItem(item));
    }
    return null;
}
function renderMenuItem(menuItem: ItemConfig): JSX.Element {
    if (isSubmenu(menuItem)) {
        return (
            <AntdSubMenu key={menuItem.key} title={menuItem.title} icon={menuItem.icon} disabled={menuItem.disabled} onTitleClick={menuItem.onTitleClick}>
                {renderMenus(menuItem.children)}
            </AntdSubMenu>
        );
    }
    return (
        <AntdMenuItem key={menuItem.key} icon={menuItem.icon} disabled={menuItem.disabled}>
            {menuItem.title}
        </AntdMenuItem>
    );
}

function dropMenuProps(props: MenuProps & IPropsExt, filterdKeys: string[]): Pick<typeof props, keyof MenuProps> {
    const nextPropsKeys = Object.keys(props).filter((key) => filterdKeys.indexOf(key) === -1) as (keyof MenuProps)[];
    return nextPropsKeys.reduce((pre, nextKey) => {
        return Object.assign(pre, { [nextKey]: props[nextKey] });
    }, {});
}

export function Menu(props: MenuProps & IPropsExt): JSX.Element {
    const menus = useMemo(() => renderMenus(props.menuItems), [props.menuItems]);
    const handleClickMenu = useCallback<(params: ClickParam) => void>(
        (params) => {
            const { key } = params;
            if (arrayNotEmpty(props.menuItems)) {
                const [clickedItem] = props.menuItems.filter((item) => item.key === key);
                props.onClick && props.onClick({...params, itemConfig: clickedItem});
            }
        },
        [props.menuItems]
    );
    const antdMenuProps: MenuProps = dropMenuProps(props, ['menuItems']);
    return (
        <AntdMenu {...antdMenuProps} onClick={handleClickMenu}>
            {menus}
        </AntdMenu>
    );
}
