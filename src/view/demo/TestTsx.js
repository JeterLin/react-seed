"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
function TestTsx(props) {
    return react_1["default"].createElement("h2", null,
        "hello tsx !!! ",
        props.title);
}
exports["default"] = TestTsx;
var MyTsx = /** @class */ (function (_super) {
    __extends(MyTsx, _super);
    function MyTsx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyTsx.prototype.componentDidMount = function () {
        this.setState({ greet: "hello world !!!" });
    };
    MyTsx.prototype.render = function () {
        return (react_1["default"].createElement("div", null,
            "name: ",
            this.props.name,
            " age: ",
            this.props.age,
            " greet: ",
            this.state.greet));
    };
    return MyTsx;
}(react_1["default"].Component));
exports.MyTsx = MyTsx;
