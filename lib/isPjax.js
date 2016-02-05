module.exports = function (req) {
    return req.header('X-PJAX') ? true : false;
};