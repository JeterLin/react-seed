/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';
import { IRouteChildrenProps } from '@router';
import { IRootState } from '@store';
import { ITodoDetailState, actions as todoDetailActions } from '@store/todoDetail';
import { ArrowLeft, Form, FormItem, Input, TextArea, Button, RangePicker } from '@view/baseComponent';

import ss from './TodoDetail.less';

import { DetailTitle } from './DetailTitle';

function toFormField(todoDetail: ITodoDetailState) {
    return [
        { name: ['title'], value: todoDetail.title },
        { name: ['description'], value: todoDetail.description },
        { name: ['dateRange'], value: [moment(todoDetail.startDate), moment(todoDetail.endDate)] },
    ];
}
type IProps = IRouteChildrenProps;
const FormTitle: FC<{ title: string }> = (props) => {
    return <span className={ss.labelText}>{props.title}</span>;
};
const isTitle = (fieldName: string, fields: any): fields is { title: string } => fields && fieldName === 'title';
const isDescription = (fieldName: string, fields: any): fields is { description: string } => fields && fieldName === 'description';
const isDateRange = (fieldName: string, fields: any): fields is { dateRange: [Moment, Moment] } => fields && fieldName === 'dateRange';
// TodoDetail编辑表单的功能会使用普通的redux数据流程更新store
function TodoDetail(props: IProps): JSX.Element {
    const labelCol = { span: 6 };
    const wrapperCol = { span: 14 };
    const handleClickBackToList = useCallback(() => {
        props.history.push('/todo');
    }, []);
    // 与todolist组件不一样的是，这里使用react-redux中的hooks连接视图层组件与store的数据

    // 使用store.dispatch方法
    const dispatch = useDispatch();
    const todoDetail = useSelector<IRootState, ITodoDetailState>((state) => state.todoDetail);
    const formFields = useMemo(() => toFormField(todoDetail), [todoDetail]);
    const handleFieldsChange = useCallback((changedFields) => {
        const [field] = Object.keys(changedFields);
        if (field) {
            if (isTitle(field, changedFields)) {
                const { title } = changedFields;
                dispatch(todoDetailActions.todoTitleChange(title));
            }
            if (isDescription(field, changedFields)) {
                const { description } = changedFields;
                dispatch(todoDetailActions.todoDescriptionChange(description));
            }
            if (isDateRange(field, changedFields)) {
                const [startDate, endDate] = changedFields['dateRange'];
                dispatch(
                    todoDetailActions.todoDateChange({
                        startDate: startDate ? startDate.valueOf() : undefined,
                        endDate: endDate ? endDate.valueOf() : undefined,
                    })
                );
            }
        }
    }, []);
    return (
        <div className={ss.wrapper}>
            <header className={ss.header}>
                <ArrowLeft onClick={handleClickBackToList} />
                <DetailTitle />
            </header>
            <div className={ss.content}>
                <Form name="detailForm" labelCol={labelCol} wrapperCol={wrapperCol} fields={formFields} onValuesChange={handleFieldsChange}>
                    <FormItem className={ss.formItemVerticalGap} label={<FormTitle title="Title" />} name="title" required>
                        <Input placeholder="add todo title" size="large" className={ss.control} />
                    </FormItem>
                    <FormItem label={<FormTitle title="Description" />} name="description">
                        <TextArea placeholder="add todo description" className={ss.control} rows={6} />
                    </FormItem>
                    <FormItem label={<FormTitle title="Time" />} name="dateRange">
                        <RangePicker className={ss.control} />
                    </FormItem>
                </Form>
            </div>
            <footer className={ss.footer}>
                <Button className={ss.footerBtn} type="primary" size="large">
                    Submit
                </Button>
            </footer>
        </div>
    );
}

export { TodoDetail as default };
