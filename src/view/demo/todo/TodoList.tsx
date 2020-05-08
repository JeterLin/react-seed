import React, { useCallback } from 'react';
import { List } from 'antd';

import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { connect, MapStateToProps } from 'react-redux';
import { StateType, TodoItemType, actions as todoActions } from '@store/todoList';
import { RootStateType, AppDispatch } from '@store';
import ss from './TodoList.less';

function TodoList<PropTypes extends Partial<{ todoList: Array<TodoItemType>; addItem: Function }>>(props: PropTypes) {
    const handleAddTodo = useCallback((text) => {
        props.addItem && props.addItem({ id: Math.floor(Math.random() * 10), title: text });
    }, []);
    return (
        <div>
            <List
                size="small"
                bordered
                dataSource={props.todoList}
                className={ss.listWrapper}
                renderItem={(item) => (
                    <List.Item>
                        <TodoItem item={item} />
                    </List.Item>
                )}
            />
            <AddTodo onSubmit={handleAddTodo} />
        </div>
    );
}

const mapStateToProps: MapStateToProps<{ todoList: TodoItemType[] }, {}, RootStateType> = (state) => {
    return { todoList: state.todo };
};
const TodoListWrapper = connect(mapStateToProps, todoActions)(TodoList);
export { TodoListWrapper as default };
