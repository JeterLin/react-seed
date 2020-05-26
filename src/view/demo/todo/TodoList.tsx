import React, { useCallback, useEffect } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { List, ListItem } from '@view/baseComponent';
import { IRouteChildrenProps } from '@router';

import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { ClearTodo, OnClearType } from './ClearTodo';
import { DeleteTodo } from './DeleteTodo';
import { DetailTodo } from './DetailTodo';
import { BtnGroup } from './BtnGroup';
import { StateType, TodoItemType, ToggleItemType, actions as todoActions } from '@store/todoList';
import { RootStateType, AppDispatch } from '@store';
import ss from './TodoList.less';
type PropsFromWrapper = Partial<
    {
        todoList: Array<TodoItemType>;
        loading: boolean;
        addItem: Function;
        clearItems: (clearDone?: boolean) => void;
        delItem: Function;
        toggleItem: (item: ToggleItemType) => void;
        fetchTodoList: () => void;
    } & IRouteChildrenProps
>;
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
    const handleClickDetail = useCallback((item?: TodoItemType) => {
        props.history && props.history.push(`/todo/detailView?id=${item ? item.id : ''}`);
    }, []);
    // componentDidUpdate
    useEffect(() => {
        props.fetchTodoList && props.fetchTodoList();
    }, []);
    const isEmptyList = Array.isArray(props.todoList) && props.todoList.length === 0;
    return (
        <div className={ss.wrapper}>
            <List
                bordered
                loading={props.loading}
                emptyListPlaceholder
                dataSource={props.todoList}
                className={ss.listWrapper}
                renderItem={(item) => (
                    <ListItem>
                        <TodoItem item={item} onToggleTodo={handleToggleItem} />
                        <BtnGroup>
                            <DetailTodo item={item} onDetail={handleClickDetail} />
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

const mapStateToProps: MapStateToProps<{ todoList: TodoItemType[]; loading: boolean } & IRouteChildrenProps, IRouteChildrenProps, RootStateType> = (rootState, ownProps) => {
    const { todo } = rootState;
    return { todoList: todo.todoList, loading: todo.loading, ...ownProps };
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
