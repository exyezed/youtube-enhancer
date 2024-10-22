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
            #owner.ytd-watch-metadata {
                min-width: calc(60% - 6px) !important;
                flex: 1;
                flex-basis: 0.000000001px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            ytd-menu-renderer[has-flexible-items] {
                width: 80% !important;
                max-height: 36px;
                overflow-y: hidden;
                flex-wrap: wrap;
            }
        `;
        document.head.appendChild(styleElement);
    }

    function setupTrustedTypes() {
        if (window.trustedTypes && trustedTypes.createPolicy && !trustedTypes.defaultPolicy) {
            const passThroughFn = (x) => x;
            trustedTypes.createPolicy('default', {
                createHTML: passThroughFn,
                createScriptURL: passThroughFn,
                createScript: passThroughFn,
            });
        }
    }

    function modifyYouTubeUI(ytIcons) {
        ytIcons.forEach(ytIcon => {
          ytIcon.setAttribute('viewBox', '0 0 93 20');
          ytIcon.closest('ytd-logo').setAttribute('is-red-logo', '');
          ytIcon.innerHTML = `
            <?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 93 20">
              <defs>
                <style>
                  .st0 {
                    fill: #fff;
                  }
                  .st1 {
                    display: none;
                  }
                  .st2 {
                    fill: #f03;
                  }
                </style>
              </defs>
              <g id="yt-ringo2-svg_yt14" focusable="false">
                <g>
                  <path class="st2" d="M13.8,19.5s8.6,0,10.8-.6c1.2-.3,2.1-1.3,2.4-2.4.6-2.1.6-6.6.6-6.6,0,0,0-4.4-.6-6.5-.3-1.2-1.2-2.1-2.4-2.4-2.1-.6-10.8-.6-10.8-.6,0,0-8.6,0-10.8.6C1.8,1.4.9,2.3.6,3.5c-.6,2.1-.6,6.5-.6,6.5,0,0,0,4.4.6,6.6.3,1.2,1.3,2.1,2.5,2.4,2.1.6,10.8.6,10.8.6Z"/>
                  <path class="st0" d="M18.1,10l-7.1-4v8.1l7.1-4Z"/>
                </g>
                <g id="youtube-paths_yt14" class="st1">
                  <path d="M37.1,18.9v-5.5l3.5-11.3h-2.6l-1.3,5.1c-.3,1.2-.6,2.4-.8,3.5h-.2c-.1-1-.4-2.3-.8-3.6l-1.3-5.1h-2.6l3.4,11.3v5.5h2.6Z"/>
                  <path d="M44.1,6.3c-3,0-4.1,1.8-4.1,5.5v1.8c0,3.4.7,5.5,4,5.5s4-2,4-5.5v-1.8c0-3.4-.7-5.5-4-5.5ZM45.4,14.7c0,1.6-.3,2.7-1.3,2.7s-1.3-1-1.3-2.7v-4c0-1.4.2-2.6,1.3-2.6s1.3,1.3,1.3,2.6v4Z"/>
                  <path d="M52.3,19.1c1.5,0,2.4-.6,3.1-1.7h.1v1.5h2.1V6.5h-2.6v9.9c-.3.5-.9.9-1.5.9s-1-.6-1-1.6V6.5h-2.6v9.3c0,2,.6,3.3,2.5,3.3Z"/>
                  <path d="M62.8,18.9V4.1h3v-2h-8.7v2h3v14.7h2.6Z"/>
                  <path d="M67.9,19.1c1.5,0,2.4-.6,3.1-1.7h.1v1.5h2.1V6.5h-2.6v9.9c-.3.5-.9.9-1.5.9s-1-.6-1-1.6V6.5h-2.6v9.3c0,2,.6,3.3,2.5,3.3Z"/>
                  <path d="M80.7,6.3c-1.3,0-2.2.6-2.8,1.5h-.1c0-1.2.1-2.2.1-3V1.4h-2.5v10.7s0,6.7,0,6.7h2.2l.2-1.2h0c.6.8,1.5,1.3,2.7,1.3,2,0,2.9-1.7,2.9-5.4v-1.9c0-3.4-.4-5.4-2.7-5.4ZM80.8,13.6c0,2.3-.3,3.7-1.4,3.7s-1.2-.2-1.5-.7v-7.3c.3-.7.9-1.2,1.5-1.2,1.1,0,1.4,1.3,1.4,3.7v1.9Z"/>
                  <path d="M92.7,11.5c0-3-.3-5.2-3.7-5.2s-3.9,2.2-3.9,5.3v2.2c0,3.1.7,5.3,3.9,5.3s3.9-1.3,3.7-3.7h-2.2c0,1.4-.4,2-1.4,2s-1.3-1.2-1.3-3v-.8h5.1v-2.1ZM88.9,8c1.2,0,1.3,1.1,1.3,3.1v1h-2.6v-1c0-1.9,0-3.1,1.3-3.1Z"/>
                </g>
                <g>
                  <path d="M28.9,17.8V1.9h7.3v2.4h-4.6v4.1h3.5v2.4h-3.5v4.7h4.9v2.4h-7.6Z"/>
                  <path d="M36.9,17.8V6h2.3v1.2c.3-.2.5-.4.7-.6.2-.2.4-.3.6-.4.2-.1.5-.2.7-.3.3,0,.6,0,.9,0,.7,0,1.2.2,1.5.7s.5,1,.5,1.8v9.6h-2.5v-9.2c0-.3,0-.5-.2-.6-.2-.1-.4-.2-.6-.2s-.5,0-.8.2c-.2.1-.5.3-.8.5v9.3h-2.5Z"/>
                  <path d="M45,17.8V1.9h2.5v5.1c.2-.2.4-.4.6-.5s.4-.3.6-.4c.2-.1.4-.2.7-.3.3,0,.6,0,.9,0,.7,0,1.2.2,1.5.7s.5,1,.5,1.8v9.6h-2.5v-9.2c0-.3,0-.5-.2-.6-.2-.1-.4-.2-.6-.2s-.5,0-.8.2c-.2.1-.5.3-.8.5v9.3h-2.5Z"/>
                  <path d="M52.9,9.5c0-1.2.5-2.1,1.2-2.8.7-.6,1.6-.9,2.8-.9s2,.3,2.7.8c.6.5.9,1.3.9,2.4v7.6c0,.2,0,.4,0,.6,0,.2,0,.4,0,.6h-2.4c0-.2,0-.3,0-.5,0-.2,0-.3,0-.5-.5.4-.9.7-1.3.9s-.9.3-1.5.3-1.5-.3-1.9-.8-.6-1.1-.6-1.9.1-1.2.3-1.7.5-1,1-1.4c.4-.4,1-.8,1.7-1.2s1.4-.7,2.3-1v-.7c0-1-.4-1.5-1.2-1.5s-.9.2-1.1.5c-.2.3-.3.7-.3,1.2h-2.5ZM58,11.8c-.6.3-1,.6-1.4.9s-.7.5-.9.8c-.2.2-.3.5-.4.7s-.1.5-.1.7c0,.4,0,.7.3.8.2.2.5.3.9.3s.6-.1.9-.3.5-.5.7-.8v-3.1Z"/>
                  <path d="M61.3,17.8V6h2.3v1.2c.3-.2.5-.4.7-.6.2-.2.4-.3.6-.4.2-.1.5-.2.7-.3s.6,0,.9,0c.7,0,1.2.2,1.5.7s.5,1,.5,1.8v9.6h-2.5v-9.2c0-.3,0-.5-.2-.6-.2-.1-.4-.2-.6-.2s-.5,0-.8.2c-.2.1-.5.3-.8.5v9.3h-2.5Z"/>
                  <path d="M74.4,10v-.3c0-.7-.1-1.2-.4-1.5-.2-.3-.6-.5-1-.5s-.8.2-1,.5c-.2.3-.4.8-.4,1.5v4.4c0,.7.1,1.2.4,1.5s.6.5,1,.5.8-.2,1-.5c.2-.3.4-.8.4-1.5v-.7h2.5v.3c0,.6,0,1.2-.2,1.8-.1.5-.4,1-.7,1.4-.3.4-.7.7-1.2.9-.5.2-1.1.3-1.8.3s-1.3-.1-1.8-.3c-.5-.2-.9-.5-1.2-.9s-.5-.9-.7-1.4c-.1-.5-.2-1.1-.2-1.8v-3.5c0-.6,0-1.2.2-1.8.1-.5.4-1,.7-1.4s.7-.7,1.2-.9c.5-.2,1.1-.3,1.8-.3s1.3.1,1.8.3c.5.2.9.5,1.2.9.3.4.5.8.7,1.4.1.5.2,1.1.2,1.7h-2.5Z"/>
                  <path d="M85,12.4h-5.2v1.7c0,.7.1,1.2.4,1.5s.6.5,1,.5.8-.2,1-.5c.2-.3.4-.8.4-1.5v-.3h2.5c0,.6,0,1.2-.2,1.7-.1.5-.4,1-.7,1.3-.3.4-.7.7-1.2.9s-1.1.3-1.7.3-1.3-.1-1.8-.3c-.5-.2-.9-.5-1.2-.9s-.5-.9-.7-1.4c-.1-.5-.2-1.1-.2-1.8v-3.5c0-.6,0-1.2.2-1.8.1-.5.4-1,.7-1.4s.7-.7,1.2-.9c.5-.2,1.1-.3,1.8-.3s1.3.1,1.8.3.9.5,1.2.9c.3.4.5.9.7,1.4.1.5.2,1.1.2,1.8v2.2ZM82.6,10.4v-.6c0-.7-.1-1.2-.4-1.5-.2-.3-.6-.5-1-.5s-.8.2-1,.5c-.2.3-.4.8-.4,1.5v.6h2.7Z"/>
                  <path d="M90.7,17.8v-1.2h0c-.4.5-.8.9-1.2,1.1-.4.2-.9.3-1.5.3s-1.4-.3-1.8-.8c-.4-.6-.7-1.4-.7-2.5v-5.7c0-1.1.2-1.9.7-2.5.4-.6,1.1-.8,1.8-.8s.5,0,.7,0c.2,0,.4.1.6.2.2.1.4.2.6.4.2.2.4.3.7.5V1.9h2.5v15.9h-2.3ZM90.5,8.4c-.2-.2-.5-.3-.7-.4-.2-.1-.5-.2-.7-.2s-.6.1-.8.4c-.2.2-.3.8-.3,1.5v4.4c0,.8.1,1.3.3,1.5.2.2.5.4.8.4s.5,0,.7-.2c.2-.1.5-.3.7-.4v-7Z"/>
                </g>
              </g>
            </svg>
          `;
        });

        document.querySelectorAll("#country-code").forEach(el => el.removeAttribute('hidden'));
        document.querySelectorAll(".ytd-topbar-logo-renderer[hidden]").forEach(el => el.removeAttribute('hidden'));
        document.querySelectorAll("ytd-yoodle-renderer").forEach(el => el.setAttribute('hidden', ''));
        document.querySelectorAll("a#logo").forEach(el => el.setAttribute("title", "© YouTube Enhancer"));
    }

    function checkAndModifyYouTubeIcons() {
        const ytIcons = document.querySelectorAll('ytd-topbar-logo-renderer a > div svg');
        if (ytIcons.length === 2) {
            modifyYouTubeUI(ytIcons);
            observer.disconnect();
        }
    }

    const observer = new MutationObserver(checkAndModifyYouTubeIcons);

    function init() {
        setupTrustedTypes();
        adjustStyles();
        checkAndModifyYouTubeIcons();
        observer.observe(document.querySelector('ytd-topbar-logo-renderer'), { childList: true, subtree: true });
    }

    window.addEventListener('load', init);
})();
