import React from 'react';
import { List } from 'antd';

import { TodoItem } from './TodoItem';
const dataSource = [
    {
        id: 1,
        title: 'item 1',
    },
    {
        id: 2,
        title: 'item 2',
    },
    {
        id: 3,
        title: 'item 3',
    },
    {
        id: 4,
        title: 'item 4',
    },
    {
        id: 5,
        title: 'item 5',
    },
    {
        id: 6,
        title: 'item 6',
    },
];
export default function TodoList() {
    return (
        <List
            size="small"
            bordered
            dataSource={dataSource}
            renderItem={(item) => (
                <List.Item>
                    <TodoItem item={item} />
                </List.Item>
            )}
        ></List>
    );
}
