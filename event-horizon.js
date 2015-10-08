/*global module*/
'use strict';

module.exports.instance = function (conf) {
    var counter = 0,
        startTime = new Date().getTime();

    return {
        run: function (func, eatenCB) {
            var diff = new Date().getTime() - startTime;
            if (diff < conf.window) {
                if (counter < conf.max) {
                    func();
                } else {
                    eatenCB();
                }
            } else {
                startTime = new Date().getTime();
                counter = 0;
                func();
            }
            counter += 1;
        }
    };
};

