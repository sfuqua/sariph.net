"use strict";

// The 'Compat' namepsace contains functions to aid in cross-browser support
(function(Compat, undefined) {
    // Helper function to wrap classList.contains if it exists
    Compat.hasClass = function(obj, className) {
        if (obj.classList) {
            return obj.classList.contains(className);
        }
        else {
            return obj.className.split(' ').indexOf(className) >= 0;
        }
    };

    // Helper function to wrap classList.add if it exists
    Compat.addClass = function(obj, className) {
        if (obj.classList) {
            obj.classList.add(className);
        }
        else {
            var classes = obj.className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] == className) {
                    return;
                }
            }

            obj.className += ' ' + className;
        }
    };

    // Helper function to wrap classList.remove if it exists
    Compat.removeClass = function(obj, className) {
        if (obj.classList) {
            obj.classList.remove(className);
        }
        else {
            var classes = obj.className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] == className) {
                    classes.splice(i, 1);
                    obj.className = classes.join(' ');
                    return;
                }
            }
        }
    };

    // Given a list of CSS property strings, returns the first supported value
    Compat.getSupportedPropertyName = function(propertyNames) {
        // Create a temporary element to style.
        var temp = document.createElement("div");
        for (var i = 0; i < propertyNames.length; i++) {
            // See if this property exists on the temp element.
            if (typeof temp.style[propertyNames[i]] != 'undefined')
                return propertyNames[i];
        }

        // Not found :(
        return null;
    };

    // Shortcut for getSupportedPropertyName to get the 'transform' property
    Compat.getSupportedTransformProperty = function() {
        return Compat.getSupportedPropertyName(['transform', 'msTransform', 'MozTransform', 'WebkitTransform', 'OTransform']);
    };

    // Shortcut for getSupportedPropertyName to get the 'transition' property
    Compat.getSupportedTransitionProperty = function() {
        return Compat.getSupportedPropertyName(['transition', 'MozTransition', '-webkit-transition', 'OTransition']);
    };

    // Uses the supported transition property to find the right event
    Compat.getSupportedTransitionEndEvent = function() {
        switch (Compat.getSupportedTransitionProperty()) {
            case 'transition':
            case 'MozTransition':
                return 'transitionend';
            case '-webkit-transition':
                return 'webkitTransitionEnd';
            case 'OTransition':
                return 'oTransitionEnd';
            default:
                return null;
        }
    };

    // Uses the supported animation property to find the right event
    Compat.getSupportedAnimationEndEvent = function() {
        switch (Compat.getSupportedPropertyName(['animation', 'MozAnimation', '-webkit-animation', 'OAnimation'])) {
            case 'animation':
            case 'MozAnimation':
                return 'animationend';
            case '-webkit-animation':
                return 'webkitAnimationEnd';
            case 'OAnimation':
                return 'oAnimationEnd';
            default:
                return null;
        }
    };

    // Returns true if the browser supports CSS 3D transforms
    Compat.supports3DTransforms = function() {
        // If transforms aren't supported at all, shortcircuit.
        var property = Compat.getSupportedTransformProperty();
        if (!property) {
            return false;
        }

        // Create a temporary element.
        var temp = document.createElement('div');
        // Try to apply a 3D transform value (perspective).
        var style = 'perspective(500px)';
        temp.style[property] = style;
        // Return true if the transform stuck.
        return temp.style[property] == style;
    };

    // Returns true if the browser supports the HTML5 history API
    Compat.supportsHistory = function() {
        return !!window.history && !!window.history.pushState;
    };

    // Provides a compatibility report at the bottom of the page
    Compat.insertCompatWarnings = function() {
        var footer = document.getElementsByTagName('footer')[0];
        var container = document.createElement('div');
        container.className = 'compat';

        var header = document.createElement('h1');
        header.textContent = 'Site compatibility report';

        var list = document.createElement('ul');
        /*if (!Compat.getSupportedTransformProperty)
        {
        var item = document.createElement('li');
        item.textContent = 'Your browser does not support CSS transforms. ' +
        'This site relies on transforms for some visual effects, and your experience ' +
        'will be slightly degraded.';
            
        list.appendChild(item);
        }
        else if (!Compat.supports3DTransforms())
        {
        var item = document.createElement('li');
        item.textContent = 'Your browser does not properly support CSS 3D transforms. ' +
        'This site relies on 3D transforms for some visual effects, and your experience ' +
        'will be slightly degraded. Please note that while WebKit browsers like Chrome and Safari ' +
        'support 3D transforms, a bug in mouse event handling prevents the site from functioning properly, ' +
        'so the feature has been disabled.';
            
        list.appendChild(item);
        }*/

        if (list.childNodes.length == 0) {
            return;
        }

        container.appendChild(header);
        container.appendChild(list);
        footer.appendChild(container);
    }
})(window.Compat = (window.Compat || {}));

HTMLElement.prototype.hasClass = function(className) { return Compat.hasClass(this, className); };
HTMLElement.prototype.addClass = function(className) { Compat.addClass(this, className); };
HTMLElement.prototype.removeClass = function(className) { Compat.removeClass(this, className); };