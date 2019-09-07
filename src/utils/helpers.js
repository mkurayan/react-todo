
var helpers = {
    debounce: function (func, wait, scope, immediate) {
        var timeout;
    
        var debounced = function () {
            var context = scope || this, args = arguments;

            var later = function () {
                timeout = null;
                func.apply(context, args);
            };

            if(immediate && timeout == null) {
                func.apply(context, args);
                timeout = setTimeout(() => timeout = null, wait);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            } 
        };

        debounced.cancel = function() {
            clearTimeout(timeout);
            timeout = null;
        };

        return debounced;
    }, 
    
    uuid: function () {
        /*jshint bitwise:false */
        var i, random;
        var uuid = '';
    
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }
    
        return uuid;
    }
}

export default helpers;

