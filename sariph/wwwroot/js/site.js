"use strict";

// The 'Site' namespace handles functions used by the actual website.

(function(Site, undefined) {
    Site.activeTile = null;
    Site.origin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
    Site.loadedOnce = false;

    // Sets up tiles with mouse listeners for animation
    Site.setupTiles = function() {
        function skewWhileDragging(e) {
            Animation.skewBasedOnMouseEvent(Site.activeTile, e);
        }

        Array.prototype.slice.call(document.getElementsByClassName('tile'))
            .map(
                function (tile) {
                    // Set the tile to activate on click even 
                    // if the transform moves it out from under the mouse.
                    Util.clickOnMouseup(tile);

                    // Set up the animation.
                    tile.addEventListener(
                        'mousedown',
                        function (e) {
                            Site.activeTile = e.currentTarget;
                            Site.activeTile.registerOneshotEventListener(
                                Animation.transitionendEvent,
                                function (e_inner) {
                                    e_inner.currentTarget.removeClass('transitioning');
                                }
                            );

                            // Add the transition class
                            Site.activeTile.addClass('transitioning');
                            // Transform the tile
                            Animation.skewBasedOnMouseEvent(Site.activeTile, e);

                            // 0.1 seconds later, set up the mousemove stuff
                            window.setTimeout(
                                function () {
                                    if (!Site.activeTile)
                                    {
                                        return;
                                    }

                                    Site.activeTile.removeClass('transitioning');
                                    window.addEventListener('mousemove', skewWhileDragging);
                                },
                                100
                            );

                            window.registerOneshotEventListener(
                                'mouseup',
                                function (e_inner) {
                                    window.removeEventListener('mousemove', skewWhileDragging);
                                    Site.activeTile.addClass('transitioning');
                                    Site.activeTile.registerOneshotEventListener(
                                        Animation.transitionendEvent,
                                        function (e_inner) {
                                            e_inner.currentTarget.removeClass('transitioning');
                                        }
                                    );
                                    Animation.resetTransform(Site.activeTile);

                                    Site.activeTile = null;
                                }
                            );
                        });
                }
            );
    };

    var getContent = function(href, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', href + '?X-Requested-With=XMLHttpRequest', /* async */ true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                callback(xhr.response);
            }
        };
        xhr.send();
    }

    var updateContent = function(html) {
        var content = document.getElementById('content-frame');
        content.removeClass('entering');
        content.addClass('exiting');
        content.registerOneshotEventListener(
            Compat.getSupportedAnimationEndEvent(),
            function(e) {
                content.removeClass('exiting');
                content.innerHTML = html;

                Site.init();
            }
        );
    }

    var historyClickHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var callback = function(response) {
            if (typeof (response) === 'string') {
                response = JSON.parse(response);
            }

            updateContent(response.content, e.target.href);
            window.history.pushState(
                {
                    content: response.content,
                    title: response.title
                },
                response.title,
                e.target.href
            );

            document.title = response.title;
        };

        getContent(e.target.href, callback);
    };

    Site.setupHistory = function() {
        // We're only modifiying tiles and back buttons
        Array.prototype.slice.call(document.querySelectorAll('.tile, .back-button'))
            .map(
                function(link) {
                    // Only modifying links that are on the same domain
                    if (link.href.indexOf(Site.origin) != 0) {
                        return;
                    }

                    //link.addEventListener('click', historyClickHandler);
                }
            );
    };

    // Sets up event handlers and other cool stuff
    Site.init = function() {
        Util.externalizeHyperlinks();
        Site.setupTiles();

        var backButtons = document.getElementsByClassName('back-button');
        for (var i = 0; i < backButtons.length; i++) {
            Util.clickOnMouseup(backButtons[i]);
        }

        var content = document.getElementById('content-frame');
        content.addClass('entering');
        content.registerOneshotEventListener(Compat.getSupportedAnimationEndEvent(),
            function(e) {
                e.currentTarget.removeClass('entering');
            }
        );

        if (Compat.supportsHistory()) {
            Site.setupHistory();
        }

        if (!Site.loadedOnce) {
            window.addEventListener('dragstart', function(e) { e.preventDefault(); });
            if (Compat.supportsHistory()) {
                window.addEventListener('popstate', function(e) {
                    if (e.state) {
                        updateContent(e.state.content)
                        document.title = (e.state.title ? e.state.title : "Steven Fuqua");
                    }
                });

                window.history.replaceState(
                    {
                        content: document.getElementById('content-frame').innerHTML
                    },
                    document.title,
                    location.href
                );
            }
            Compat.insertCompatWarnings();
            Site.loadedOnce = true;
        }
    };
})(window.Site = (window.Site || {}));