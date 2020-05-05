import React from 'react';
import { Table } from "@view/baseComponent";
export function TestTable() {
  const columns = [
    {
      title: "name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "age",
      key: "age",
      dataIndex: "age",
    },
    {
      title: "gender",
      key: "gender",
      dataIndex: "gender",
    },
    {
      title: "description",
      key: "description",
      dataIndex: "description",
    },
  ];
  const tableData = [
    {
      name: "Jimmy",
      age: 20,
      gender: "female",
      description: "she is a nurse and loves cooking",
    },
    {
      name: "Tom",
      age: 28,
      gender: "male",
      description: "He is a programmer",
    },
    {
      name: "Jerry",
      age: 28,
      gender: "female",
      description: "She is a dancer",
    },
  ];
  return <Table columns={columns} dataSource={tableData} rowKey="name" />;
}