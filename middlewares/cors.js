const cors = {
    allowAll: function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);

        // 只对预检OPTIONS请求发送200状态码，并结束请求处理
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            // 对于非OPTIONS请求，继续后续中间件处理
            next();
        }

    }
}

module.exports = cors;

