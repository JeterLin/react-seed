import React from "react";
type TsxProps = {
  title: String;
};
export default function TestTsx(props: TsxProps): React.ReactElement {
  return <h2>hello tsx !!! {props.title}</h2>;
}

interface MyPropsType {
  name: String;
  age: Number;
}
interface MyStateType {
  greet?: String;
}
export class MyTsx extends React.Component<MyPropsType, MyStateType> {
  constructor(props: MyPropsType) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState({ greet: "hello world !!!" });
  }
  render() {
    return (
      <h2>
        name: {this.props.name} age: {this.props.age} greet: {this.state.greet}
      </h2>
    );
  }
}
