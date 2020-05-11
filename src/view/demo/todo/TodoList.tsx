import React, { useCallback } from 'react';
import { List, ListItem } from '@view/baseComponent';

import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { ClearTodo,OnClearType } from './ClearTodo';
import { DeleteTodo } from './DeleteTodo';
import { DetailTodo } from './DetailTodo';
import { BtnGroup } from './BtnGroup';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { StateType, TodoItemType, ToggleItemType, actions as todoActions } from '@store/todoList';
import { RootStateType, AppDispatch } from '@store';
import ss from './TodoList.less';
type PropsFromWrapper = Partial<{
    todoList: Array<TodoItemType>;
    addItem: Function;
    clearItems: (clearDone?: boolean) => void;
    delItem: Function;
    toggleItem: (item: ToggleItemType) => void;
}>;
function TodoList<PropTypes extends PropsFromWrapper>(props: PropTypes) {
    const handleAddTodo = useCallback((text) => {
        props.addItem && props.addItem({ id: Date.now(), title: text });
    }, []);
    const handleClearTodo = useCallback<OnClearType>((clearDone) => {
        props.clearItems && props.clearItems(clearDone);
    }, []);
    const handleDelItem = useCallback((item) => {
        props.delItem && props.delItem(item);
    }, []);
    const handleToggleItem = useCallback((item, nextDone) => {
        props.toggleItem && props.toggleItem({ ...item, done: nextDone });
    }, []);
    const isEmptyList = Array.isArray(props.todoList) && props.todoList.length === 0;
    return (
        <div className={ss.wrapper}>
            <List
                bordered
                emptyListPlaceholder
                dataSource={props.todoList}
                className={ss.listWrapper}
                renderItem={(item) => (
                    <ListItem>
                        <TodoItem item={item} onToggleTodo={handleToggleItem} />
                        <BtnGroup>
                            <DetailTodo item={item} />
                            <DeleteTodo onDelete={handleDelItem} item={item} />
                        </BtnGroup>
                    </ListItem>
                )}
            />
            <div className={ss.footer}>
                {isEmptyList ? <span>Add item from here : </span> : null}
                <AddTodo onSubmit={handleAddTodo} />
                {!isEmptyList ? <ClearTodo onClear={handleClearTodo} /> : null}
            </div>
        </div>
    );
}

const mapStateToProps: MapStateToProps<{ todoList: TodoItemType[] }, {}, RootStateType> = (rootState) => {
    return { todoList: rootState.todo.todoList };
};
// method 1:
// const mapDispatchToProps: MapDispatchToProps<{ addItem: (todo: TodoItemType) => void }, {}> = (dispatch, ownProps) => ({
//     addItem(todo) {
//         dispatch(todoActions.addItem(todo));
//     },
// });
// const TodoListWrapper = connect(mapStateToProps, mapDispatchToProps)(TodoList);
// method 2:
const TodoListWrapper = connect(mapStateToProps, todoActions)(TodoList);
export { TodoListWrapper as default };
