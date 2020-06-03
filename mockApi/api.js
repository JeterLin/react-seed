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

const todoDetails = [
    { id: 1, description: 'this is item 1', timeRange: [1591063516497, 1591063515497] },
    { id: 2, description: 'this is item 2', timeRange: [1591063515499, 1591063514499] },
    { id: 3, description: 'this is item 3', timeRange: [1591063514500, 1591063513500] },
    { id: 4, description: 'this is item 4', timeRange: [1591063513502, 1591063512502] },
];
var apis = {
    GET: {
        '/mockapi/todo/list': (req, res) => {
            return res.status(200).json({
                code: 0,
                data: todoList,
            });
        },
        '/mockapi/todo/detail': (req, res) => {
            const { id } = req.query;
            const [listItem] = todoList.filter((item) => item.id === id);
            const [detailItem] = todoDetails.filter((item) => item.id === id);
            if (listItem && detailItem) {
                return res.status(200).json({
                    code: 0,
                    data: {
                        id,
                        title: listItem.title,
                        description: detailItem.description,
                        timeRange: detailItem.timeRange,
                    },
                });
            }
            return res.status(204).json({ code: -1, data: false, msg: 'content not found' });
        },
    },
    POST: {
        '/mockapi/todo/add': (req, res) => {
            if (req.body) {
                const { title } = req.body;
                if (title) {
                    const id = Math.floor(Math.random() * 1e6);
                    todoList.push({ id, title });
                    todoDetails.push({ id, description: '', timeRange: [] });
                    return res.status(200).json({
                        code: 0,
                        data: {id},
                    });
                }
            }
            return res.status(400).json({
                code: -1,
                data: false,
                msg: 'wrong payload with todo/add, please check your request',
            });
        },
    },
    // PUT: {},
    DELETE: {
        '/mockapi/todo/delete': (req, res) => {
            const { id } = req.query;
            if (id) {
                return res.status(200).json({
                    code: 0,
                    data: true,
                });
            }
            return res.status(400).json({
                code: -1,
                data: false,
                msg: 'wrong request params in the url, please check your url',
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
