/**
 * @author Allen Liu
 * @desc An extension that supports lazy loading of image.
 */
(function() {
    var lazyload = function(obj) {
        if (obj instanceof lazyload) return obj;
        if (!(this instanceof lazyload)) return new lazyload(obj);
        this.lazyloadWrapped = obj;
    }
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = lazyload;
        }
        exports.lazyload = lazyload;
    } else {
        this.lazyload = lazyload;
    }
    lazyload.listener = null;//scroll event listener
    /**
     * @method Limit the execution frequency of the target function
     * @param {Function} func => target function.(required)
     * @param {Number} delay => delay time.(required)
     * @param {Number} limitTime => limit time, execute only once during this time.(required)
     */
    lazyload.throttle = function(func, delay, limitTime) {
        var timer, startTime = new Date();
        return function() {
            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timer);
            if (curTime - startTime >= limitTime) {
                func.apply(context, args);
                startTime = curTime;
            } else {
                timer = setTimeout(func, delay);
            }
        };
    }
    /**
     * @method load img tag item
     * @param {DOMElement} DOM => DOM element.(required)
     */
    lazyload.loadItem = function(DOM) {
        var url = DOM.getAttribute(lazyload.options.attribute);
        var status = DOM.getAttribute('data-status');
        if (url && status !== 'load') {
            DOM.setAttribute('data-status', 'load');
            DOM.onload = function() {
                DOM.setAttribute(lazyload.options.attribute, '');
                DOM.className = DOM.className.replace(lazyload.options.className, '');
            }
            DOM.onerror = function() {
                DOM.setAttribute(lazyload.options.attribute, '');
                DOM.className = DOM.className.replace(lazyload.options.className, '');
            }
            DOM.src = url;
        }
    }
    /**
     * @method lazyload execute function
     */
    lazyload.run = function() {
        var images = lazyload.options.className ? document.getElementsByClassName(lazyload.options.className) : document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            if (images[i].getBoundingClientRect().top <= window.innerHeight) {
                lazyload.loadItem(images[i]);
            }
        }
    }
    /**
     * @method Initialize lazyload extension
     * @param {Object} options => lazyload configs.(required)
     */
    lazyload.init = function(options) {
        lazyload.options = {
            className: options.className || '',
            attribute: options.attribute || ''
        };
        if (lazyload.options.attribute) {
            lazyload.run();
            lazyload.listener = lazyload.throttle(lazyload.run, 150, 500);
            window.addEventListener('scroll', lazyload.listener, false);
        }
    }
    /**
     * @method remove scroll event listener
     */
    lazyload.remove = function() {
        lazyload.listener && window.removeEventListener('scroll', lazyload.listener, false);
    }
}.call(this))
