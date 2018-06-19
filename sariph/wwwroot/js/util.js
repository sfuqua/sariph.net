"use strict";

// The 'Util' namespace contains helper functions used across the site

(function(Util, undefined) {
    //
    // Sets all external hyperlinks (those beginning with http) to open
    // in a new window.
    //
    // Params
    //  className (optional): A class (without period) used to filter the anchor tags
    //
    // Returns
    //  Nothing
    //
    Util.externalizeHyperlinks = function(className) {
        if (className === undefined) {
            className = '';
        }

        // Select all anchor tags with href attributes that begin with http.
        // Optionally, filter by the className param.
        var attrSelector = '[href^="http"]';
        var selector = 'a' + (className.length > 0 ? '.' + className : '') + attrSelector;

        // Set <a>.target to open in a new window for each anchor.
        Array.prototype.slice.call(document.querySelectorAll(selector))
            .map(
                function(a) {
                    a.target = '_blank';
                }
            );
    };

    // Attaches a listener and then detaches item when it triggers
    Util.registerOneshotEventListener = function(obj, event, listener) {
        var tempListener = function(e) {
            e.currentTarget.removeEventListener(e.type, tempListener);
            listener(e);
        }

        obj.addEventListener(event, tempListener);
    };

    Util.clickOnMouseup = function(obj) {
        var origX = null;
        var origY = null;

        var windowMouseUp = function(e) {
            if (e.screenX == origX && e.screenY == origY) {
                obj.click();
            }
        };

        obj.addEventListener('mousedown', function(e) {
            origX = e.screenX;
            origY = e.screenY;

            window.removeEventListener('mouseup', windowMouseUp);
            window.addEventListener('mouseup', windowMouseUp);
            obj.registerOneshotEventListener('mouseup',
                function(e) {
                    window.removeEventListener('mouseup', windowMouseUp);
                }
            );
        });
    }
})(window.Util = (window.Util || {}));

Object.prototype.registerOneshotEventListener = function(event, listener) {
    Util.registerOneshotEventListener(this, event, listener);
};