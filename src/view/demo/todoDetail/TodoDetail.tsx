import React, { FC } from 'react';
import { IRouteChildrenProps } from '@router';
import { ArrowLeft, Form, FormItem, Input, TextArea, Button } from '@view/baseComponent';

import ss from './TodoDetail.less';
import { DetailTitle } from './DetailTitle';

type IProps = IRouteChildrenProps;
const FormTitle: FC<{ title: string }> = (props) => {
    return <span className={ss.labelText}>{props.title}</span>;
};
function TodoDetail(props: IProps) {
    const labelCol = { span: 6 };
    const wrapperCol = { span: 14 };

    return (
        <div className={ss.wrapper}>
            <header className={ss.header}>
                <ArrowLeft />
                <DetailTitle />
            </header>
            <div className={ss.content}>
                <Form name="detailForm" labelCol={labelCol} wrapperCol={wrapperCol}>
                    <FormItem className={ss.formItemVerticalGap} label={<FormTitle title="title" />} required>
                        <Input placeholder="add todo title" size="large" className={ss.control} />
                    </FormItem>
                    <FormItem label={<FormTitle title="description" />}>
                        <TextArea placeholder="add todo description" className={ss.control} rows={6}/>
                    </FormItem>
                    <FormItem label={<FormTitle title="comment" />}>
                        <TextArea placeholder="add todo comment" className={ss.control} rows={6}/>
                    </FormItem>
                </Form>
            </div>
            <footer className={ss.footer}>
                <Button className={ss.footerBtn} type="primary" size="large">Submit</Button>
            </footer>
        </div>
    );
}

export { TodoDetail as default };
