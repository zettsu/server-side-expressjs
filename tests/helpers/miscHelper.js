exports.isIterable = (obj) => {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

exports.HTTP_OK = 200;
exports.headers = {'content-type':'application/json'}