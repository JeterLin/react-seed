import React from 'react';
import { List as AntdList } from 'antd';
import { ListProps } from 'antd/lib/list';
import { DefaultEmptyList } from './DefaultEmptyList';

type ExtPropTypes = Partial<{
    emptyListPlaceholder: JSX.Element | null | boolean;
}>;

export function List<ItemType extends Record<string, unknown>, PropTypes extends ListProps<ItemType> & ExtPropTypes>(props: PropTypes): JSX.Element | null {
    const { emptyListPlaceholder, ...listProps } = props;
    if (emptyListPlaceholder) {
        if (Array.isArray(props.dataSource) && props.dataSource.length > 0) {
            return <AntdList {...listProps} />;
        }
        if (typeof emptyListPlaceholder === 'boolean') {
            return <DefaultEmptyList />;
        }
        return emptyListPlaceholder;
    }
    return <AntdList {...props} />;
}

export const ListItem = AntdList.Item;
