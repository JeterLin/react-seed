import React, { cloneElement } from "react";
import { Table as AntdTable } from "antd";

export function Table(props) {
  return cloneElement(<AntdTable />, props);
}
