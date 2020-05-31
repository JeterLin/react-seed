import React from 'react';
import { Form as AntdForm } from 'antd';
import { FormProps, FormItemProps } from 'antd/lib/form';
export const AntdFormItem = AntdForm.Item;

export function FormItem(props: FormItemProps): JSX.Element {
    return <AntdFormItem {...props} />;
}
export function Form(props: FormProps): JSX.Element {
    return <AntdForm {...props} />;
}
