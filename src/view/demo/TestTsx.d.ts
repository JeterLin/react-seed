import React from "react";
declare type TsxProps = {
    title: String;
};
export default function TestTsx(props: TsxProps): React.ReactElement;
interface MyPropsType {
    name: String;
    age: Number;
}
interface MyStateType {
    greet: String;
}
export declare class MyTsx extends React.Component<MyPropsType, MyStateType> {
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
