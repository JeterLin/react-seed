import React, { useCallback, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import {Modal} from 'antd';
import { List, ListItem } from '@view/baseComponent';
import { IRouteChildrenProps } from '@router';

import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { ClearTodo, OnClearType } from './ClearTodo';
import { DeleteTodo } from './DeleteTodo';
import { DetailTodo } from './DetailTodo';
import { BtnGroup } from './BtnGroup';
import { StateType as ToDoStateType, TodoItemType, actions as todoActions } from '@store/todoList';
import { actions as todoDetailActions } from '@store/todoDetail';
import { IRootState } from '@store';
import ss from './TodoList.less';
type PropsFromWrapper = Partial<ToDoStateType & typeof todoActions & IRouteChildrenProps & Pick<typeof todoDetailActions, 'todoTitleChange'>>;
function TodoList<PropTypes extends PropsFromWrapper>(props: PropTypes) {
    const { addTodoItem, clearItems, removeTodoItem: delItem, toggleItem, history, fetchTodoList, todoTitleChange, resetTodoList } = props;
    const handleAddTodo = useCallback((text) => {
        addTodoItem && addTodoItem(text);
    }, []);
    const handleClearTodo = useCallback<OnClearType>((clearDone) => {
        if (clearDone) {
            clearItems && clearItems(clearDone);
        } else {
            resetTodoList && resetTodoList();
        }
    }, []);
    const handleDelItem = useCallback((item) => {
        // delItem && delItem(item);
        Modal.error({title: '测试删除失败',content: '测试删除失败 '});
    }, []);
    const handleToggleItem = useCallback((item, nextDone) => {
        toggleItem && toggleItem({ ...item, done: nextDone });
    }, []);
    const handleClickDetail = useCallback((item?: TodoItemType) => {
        history && history.push(`/todo/detailView?id=${item ? item.id : ''}`);
        todoTitleChange && todoTitleChange(item?.title);
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
                        <div className={ss.listItemWrapper}>
                            <TodoItem item={item} onToggleTodo={handleToggleItem} />
                            <BtnGroup>
                                <DetailTodo item={item} onDetail={handleClickDetail} />
                                <DeleteTodo onDelete={handleDelItem} item={item} />
                            </BtnGroup>
                        </div>
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
const mapStateToProps: MapStateToProps<NecessaryTodoState & IRouteChildrenProps, IRouteChildrenProps, IRootState> = (rootState, ownProps) => {
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
// 使用react-redux的connect方法，连接绑定视图层与store层的数据
const TodoListWrapper = connect(mapStateToProps, { ...todoActions, todoTitleChange: todoDetailActions.todoTitleChange })(TodoList);
export { TodoListWrapper as default };
