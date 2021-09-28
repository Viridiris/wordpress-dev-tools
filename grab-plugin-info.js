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

        // Loop through the plugin list ignoring update messages
        $( "#the-list tr:not(.plugin-update-tr)" ).each(function (index) {

            // Get plugin title
            plugin_title = $(this).find( ".plugin-title strong" ).html();
            // Update line
            data += plugin_title + " ";

            // Get the section of the plugin row with the version info
            plugin_version = $(this).find( ".column-description .plugin-version-author-uri" ).html();
            // Extract the version number text from the full row
            plugin_version = plugin_version.substring(0, plugin_version.indexOf('|'));
            // Update line
            data+=plugin_version;

            // Check that the plugin is active and update row with info
            if ($( this ).hasClass( "active" )) {
                data += " - Active";
            } else {
                data += " - Inactive";
            }

            // Add newline
            data+="\n";
        });

        // Get Domain
        var domain_string = getHostname(window.location.href)
        // Strip period from domain string
        domain_string = domain_string.replace('.', '');
        // encode the full data string so that the newlines work on the text file
        data = encodeURI(data);

        // initialize anchor tag
        var a = document.createElement("a");
        // Set anchor tag data
        a.href = "data:text," + data;
        // Set anchor tag download file name
        a.download = domain_string + "_current_plugins.txt";

        // Check with user before download
        var confirm_i = confirm("Download the plugin list?");
        if (confirm_i == true) {
            a.click();
        }

    });
})();