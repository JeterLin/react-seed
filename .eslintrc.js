module.exports = {
    parser: '@typescript-eslint/parser', //定义ESLint的解析器
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended'], //定义文件继承的子规范
    plugins: ['@typescript-eslint', 'react'], //定义了该eslint文件所依赖的插件
    env: {
        //指定代码的运行环境
        browser: true,
        node: true,
    },
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        
    }
};
