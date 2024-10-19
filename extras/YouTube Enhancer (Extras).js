// ==UserScript==
// @name         YouTube Enhancer (Extras)
// @description  Addition for the YouTube Enhancer script (Reveal Views & Upload Time).
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.0
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function adjustStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Modifications for #owner.ytd-watch-metadata */
            #owner.ytd-watch-metadata {
                min-width: calc(60% - 6px) !important; /* Changed from 50% to 60% */
                flex: 1;
                flex-basis: 0.000000001px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            /* Modifications for ytd-menu-renderer[has-flexible-items] */
            ytd-menu-renderer[has-flexible-items] {
                width: 80% !important; /* Changed from 100% to 80% */
                max-height: 36px;
                overflow-y: hidden;
                flex-wrap: wrap;
            }
        `;
        document.head.appendChild(styleElement);
    }

    // Run the function when the page loads
    adjustStyles();

    // Run the function again when navigation occurs (for single-page application)
    const observer = new MutationObserver(adjustStyles);
    observer.observe(document.body, { childList: true, subtree: true });
})();