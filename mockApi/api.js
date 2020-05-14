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
var apis = {
    GET: {
        '/mockapi/todolist': {
            data: [
                { id: 1, title: 'item 1' },
                { id: 2, title: 'item 2' },
                { id: 3, title: 'item 3' },
                { id: 4, title: 'item 4' },
            ],
            code: 0,
        },
    },
    // POST: {},
    // PUT: {},
    // DELETE: {},
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
module.exports = proxy;
