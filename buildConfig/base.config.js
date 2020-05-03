const path = require("path");
const rootPath = require("./rootPath");
module.exports = {
  alias: {
    "react-dom": "@hot-loader/react-dom",
    "@view": path.join(rootPath, "/src/view"),
    "@router": path.join(rootPath, "/src/view/router"),
    "@store": path.join(rootPath, "/src/store"),
    "@service": path.join(rootPath, "/src/service"),
  },
};
