import React from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';

const { RangePicker: AntdRangePicker } = DatePicker;

export function RangePicker(props: RangePickerProps): JSX.Element {
    return <AntdRangePicker {...props}/>;
}
