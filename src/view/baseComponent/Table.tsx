import React from 'react';
import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/lib/table';

export function Table<RecordType extends Record<string, unknown> = any>(props: TableProps<RecordType>): JSX.Element {
    return <AntdTable {...props} />;
}
