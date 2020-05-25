const delay = require('mocker-api/lib/delay');
function toApiConfig(apis) {
    const result = {};
    const methods = Object.keys(apis);
    for (let method of methods) {
        const urls = Object.keys(apis[method]);
        for (let url of urls) {
            const key = `${method} ${url}`;
            Object.assign(result, { [key]: apis[method][url] });
        }
    }
    return result;
}
const todoList = [
    { id: 1, title: 'item 1' },
    { id: 2, title: 'item 2' },
    { id: 3, title: 'item 3' },
    { id: 4, title: 'item 4' },
];
var apis = {
    GET: {
        '/mockapi/todo/list': (req, res) => {
            return res.status(200).json({
                code: 0,
                data: todoList,
            });
        },
    },
    POST: {
        '/mockapi/todo/add': (req, res) => {
            if (req.body) {
                const { id, title } = req.body;
                if (id && title) {
                    todoList.push({id, title});
                    return res.status(200).json({
                        code: 0,
                        data: true,
                    });
                }
            }
            return res.status(400).json({
                code: -1,
                data: false,
                errMsg: 'wrong payload with todo/add, please check your request',
            });
        },
    },
    // PUT: {},
    DELETE: {
        '/mockapi/todo/delete': (req, res) => {
            const { id } = req.query;
            if (id) {
                return res.status(200).json({
                    code : 0,
                    data: true
                });
            }
            return res.status(400).json({
                code: -1,
                data: false,
                errMsg: 'wrong request params in the url, please check your url'
            });
        },
    },
};
var proxy = {
    _proxy: {
        proxy: {
            '/repos/(.*)': 'https://api.github.com/',
            '/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:2018',
        },
        changeHost: true,
        // modify the http-proxy options
        httpProxy: {
            options: {
                ignorePath: true,
            },
            listeners: {
                proxyReq: function (proxyReq, req, res, options) {
                    console.log('proxyReq');
                },
            },
        },
    },
    ...toApiConfig(apis),
};
module.exports = delay(proxy, 1000);
