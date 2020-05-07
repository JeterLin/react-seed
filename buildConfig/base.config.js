const path = require("path");
const rootPath = require("./rootPath");
module.exports = {
  alias: {
    "react-dom": "@hot-loader/react-dom",
    "@view": path.join(rootPath, "/src/view"),
    "@router": path.join(rootPath, "/src/view/router"),
    "@store": path.join(rootPath, "/src/store"),
    "@service": path.join(rootPath, "/src/service"),
    "@assets": path.join(rootPath, "/src/assets"),
  },
  extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  loaders: {
    fileLoader: {
      test: /\.(png|svg|jpg|gif)$/,
      loader: "file-loader",
    },
    lessLoader:  {
      test: /\.less$/,
      loader: 'less-loader'
    },
  },
  entry: {
    app: [
      // polyfill Promise is not iterable on ie11
      "core-js/modules/es6.array.iterator",
      "core-js/modules/es6.object.assign",
      "./src/index.js",
    ],
  },
};
