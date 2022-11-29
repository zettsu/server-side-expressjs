let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

exports.customTimeout = function (timeout= 1000 ) {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
}

exports.interval= jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

exports.HTTP_OK = 200;
exports.headers = {'content-type':'application/json'}