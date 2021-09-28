// ==UserScript==
// @name         Grab WP Plugin info
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */wp-admin/plugins.php
// @require http://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

const getHostname = (url) => {
    // use URL constructor and return hostname
    return new URL(url).hostname;
}

(function() {
    'use strict';
    $( document ).ready(function() {

        // initilize variables.
        var plugin_version;
        var plugin_title;
        var data = "";

    });
})();