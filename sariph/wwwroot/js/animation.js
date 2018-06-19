"use strict";

// The 'Animation' namespace contains functions required for the visual effects of the site
// Dependencies:
// - Compat

(function(Animation, undefined) {
    // Locally tracks the property names of 'transform', 'transition', and 'transitionend'
    Animation.transformProperty = Compat.getSupportedTransformProperty();
    Animation.transitionProperty = Compat.getSupportedTransitionProperty();
    Animation.transitionendEvent = Compat.getSupportedTransitionEndEvent();

    // The maximum number of degrees to rotate on click
    var MAX_SKEW = 15;

    //
    // Subtlely rotates the specified element around its center,
    // using the coordinates of the specified mouse event.
    //
    // Params
    //  obj: The element to transform
    //  e: The mouse event to use for coordinates
    Animation.skewBasedOnMouseEvent = function(obj, e) {
        // No matter how we rotate, we can to scale the object down by
        // 5% to give the illusion of being "pressed".
        var transScale = 'scale(0.95)';

        // If 3D transforms aren't supported (IE9), scale is all we do.
        if (!Compat.supports3DTransforms()) {
            obj.style[Animation.transformProperty] = transScale;
            return;
        }

        // If 3D transforms ARE supported, the fun starts...
        // Get the coordinates of the mouse event relative to the object.
        var mouseX = e.clientX - obj.offsetLeft;
        var mouseY = e.clientY - obj.offsetTop;

        // Get the coordinates relative to the center of the object.
        var halfWidth = obj.offsetWidth / 2;
        var halfHeight = obj.offsetHeight / 2;
        var x = mouseX - halfWidth;
        var y = mouseY - halfHeight;

        // Now, we scale the max rotation based on the difference from the center.
        var magX = MAX_SKEW * Math.min(1, (x == 0 ? 0 : (Math.abs(x) / halfWidth)));
        var magY = MAX_SKEW * Math.min(1, (y == 0 ? 0 : (Math.abs(y) / halfHeight)));
        // Then we get the appropriate rotations (scaled) based on the quadrant of the mouse event.
        var rx = (y < 0 ? 1 : -1) * magY;
        var ry = (x < 0 ? -1 : 1) * magX;

        // Construct the actual transform strings.
        var transRx = 'rotateX(' + rx + 'deg)';
        var transRy = 'rotateY(' + ry + 'deg)';

        // Set the actual transform property to apply the effect.
        obj.style[Animation.transformProperty] = 'perspective(500px) ' + transScale + ' ' + transRx + ' ' + transRy;
    };

    // Resets the transform property of 'obj' to no transform
    Animation.resetTransform = function(obj) {
        obj.style[Animation.transformProperty] = '';
    };
})(window.Animation = (window.Animation || {}));