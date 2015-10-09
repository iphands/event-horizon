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
            if ((time - timeArray[index]) < conf.window) {
                break; // we reached the window again
            }
        }

        return timeArray.slice(index);
    }

    return {
        run: function (func, eat) {
            var time = new Date().getTime();

            if (timeArray.length === 0) {
                register(time);
                func();
                return;
            }

            timeArray = gc(time);

            if (timeArray.length >= conf.max) {
                eat();
                return;
            }

            register(time);
            func();
        }
    };
};

