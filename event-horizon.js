/*global module*/
'use strict';

module.exports.instance = function (conf) {
    var timeArray = [];

    function register(time) {
        timeArray.push(time);
    }

    function gc(time) {
        var max   = timeArray.length,
            index = 0;

        for (index = 0; index < max; index += 1) {
            if (time - timeArray[index] < conf.max) {
                break; // we reached the window again
            }
        }

        return timeArray.slice(index);
    }

    return {
        run: function (func, eatenCB) {
            var time = new Date().getTime();

            if (timeArray.length === 0) {
                register(time);
                func();
                return;
            }

            timeArray = gc(time);

            if (timeArray.length >= conf.max) {
                eatenCB();
                return;
            }

            register(time);
            func();
        }
    };
};

