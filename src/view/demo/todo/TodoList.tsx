import React, { useCallback, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { List, ListItem } from '@view/baseComponent';
import { IRouteChildrenProps } from '@router';

import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { ClearTodo, OnClearType } from './ClearTodo';
import { DeleteTodo } from './DeleteTodo';
import { DetailTodo } from './DetailTodo';
import { BtnGroup } from './BtnGroup';
import { StateType as ToDoStateType, TodoItemType, ToggleItemType, actions as todoActions } from '@store/todoList';
import { RootStateType } from '@store';
import ss from './TodoList.less';
type PropsFromWrapper = Partial<
    ToDoStateType & {
        addTodoItem: (text: string) => void;
        clearItems: (clearDone?: boolean) => void;
        removeTodoItem: (item: TodoItemType) => void;
        toggleItem: (item: ToggleItemType) => void;
        fetchTodoList: () => void;
    } & IRouteChildrenProps
>;
function TodoList<PropTypes extends PropsFromWrapper>(props: PropTypes) {
    const { addTodoItem, clearItems, removeTodoItem: delItem, toggleItem, history, fetchTodoList } = props;
    const handleAddTodo = useCallback((text) => {
        addTodoItem && addTodoItem(text);
    }, []);
    const handleClearTodo = useCallback<OnClearType>((clearDone) => {
        clearItems && clearItems(clearDone);
    }, []);
    const handleDelItem = useCallback((item) => {
        delItem && delItem(item);
    }, []);
    const handleToggleItem = useCallback((item, nextDone) => {
        toggleItem && toggleItem({ ...item, done: nextDone });
    }, []);
    const handleClickDetail = useCallback((item?: TodoItemType) => {
        history && history.push(`/todo/detailView?id=${item ? item.id : ''}`);
    }, []);
    // componentDidUpdate
    useEffect(() => {
        fetchTodoList && fetchTodoList();
    }, []);
    const isEmptyList = Array.isArray(props.todoList) && props.todoList.length === 0;
    return (
        <div className={ss.wrapper}>
            <List
                bordered
                loading={props.listLoading}
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
                <AddTodo onSubmit={handleAddTodo} inputLoading={props.addLoading} />
                {!isEmptyList ? <ClearTodo onClear={handleClearTodo} /> : null}
            </div>
        </div>
    );
}
type NecessaryTodoState = Pick<ToDoStateType, 'todoList' | 'listLoading' | 'addLoading'>;
const mapStateToProps: MapStateToProps<NecessaryTodoState & IRouteChildrenProps, IRouteChildrenProps, RootStateType> = (rootState, ownProps) => {
    const { todo } = rootState;
    return { todoList: todo.todoList, listLoading: todo.listLoading, addLoading: todo.addLoading, ...ownProps };
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
