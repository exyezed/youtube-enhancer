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
            ytIcon.setAttribute('viewBox', '0 0 97 20');
            ytIcon.closest('ytd-logo').setAttribute('is-red-logo', '');
            ytIcon.innerHTML = `
                <g viewBox="0 0 97 20" preserveAspectRatio="xMidYMid meet" class="style-scope yt-icon">
                    <g class="style-scope yt-icon">
                        <path d="M27.9,3.6c-.3-1.1-1.3-2.1-2.5-2.4-2.2-.6-10.9-.6-10.9-.6,0,0-8.7,0-10.9.6-1.2.3-2.1,1.2-2.5,2.4-.6,2.1-.6,6.4-.6,6.4,0,0,0,4.3.6,6.4.3,1.1,1.3,2.1,2.5,2.4,2.2.6,10.9.6,10.9.6,0,0,8.7,0,10.9-.6,1.2-.3,2.1-1.2,2.5-2.4.6-2.1.6-6.4.6-6.4,0,0,0-4.3-.6-6.4Z" fill="#FF0000" class="style-scope yt-icon"></path>
                        <path d="M11.8,14l7.2-4-7.2-4v8Z" fill="white" class="style-scope yt-icon"></path>
                    </g>
                    <g id="youtube-red-paths" class="style-scope yt-icon">
                        <path d="M30.7,18V2.1h2.2v15.9h-2.2ZM31.8,4v-2h6v2h-6ZM31.8,11.1v-2h5.4v2h-5.4ZM31.8,18v-2h6v2h-6Z" class="style-scope yt-icon"></path>
                        <path d="M38.8,18V6.6h2.2v11.4h-2.2ZM43.9,18v-7.9c0-.6-.1-1-.4-1.3-.2-.3-.6-.4-1.1-.4s-.8.1-1.1.4c-.2.3-.4.8-.4,1.4l-.2-1.6c.3-.7.6-1.3,1.1-1.6.5-.3,1-.5,1.6-.5s1.5.3,1.9.8.7,1.3.7,2.3v8.5h-2.2Z" class="style-scope yt-icon"></path>
                        <path d="M47.4,18V2.1h2.2v15.9h-2.2ZM52.4,18v-7.9c0-.6-.1-1-.4-1.3-.2-.3-.6-.4-1.1-.4s-.8.1-1.1.4c-.2.3-.4.7-.4,1.3l-.2-1.6c.3-.7.6-1.3,1.1-1.6.5-.3,1-.5,1.6-.5s1.5.3,1.9.8c.4.5.7,1.3.7,2.3v8.5h-2.2Z" class="style-scope yt-icon"></path>
                        <path d="M58.7,18.2c-1,0-1.7-.3-2.2-.8-.5-.5-.7-1.3-.7-2.4s.3-2.2.9-2.9c.6-.6,1.5-.9,2.7-.9h1.5l.2,1.9h-1.7c-.5,0-.9.2-1.2.5-.3.3-.4.8-.4,1.5s.1.8.3,1c.2.2.6.3,1,.3s.9-.1,1.2-.4c.3-.3.4-.7.4-1.3l.2,1.1c0,.6-.1,1-.3,1.4s-.4.7-.8.8c-.4.2-.8.3-1.3.3ZM60.8,18v-8.3c0-.5-.1-.8-.4-1.1-.3-.3-.6-.4-1.1-.4s-.7.1-.9.4c-.2.3-.3.6-.3,1.1h-2.1c0-1,.3-1.8.9-2.4.6-.6,1.4-.8,2.5-.8s2,.3,2.6.8c.6.6.9,1.4.9,2.4v8.3h-2.1Z" class="style-scope yt-icon"></path>
                        <path d="M64.3,18V6.6h2.2v11.4h-2.2ZM69.4,18v-7.9c0-.6-.1-1-.4-1.3-.2-.3-.6-.4-1.1-.4s-.8.1-1.1.4c-.2.3-.4.8-.4,1.4l-.2-1.6c.3-.7.6-1.3,1.1-1.6.5-.3,1-.5,1.6-.5s1.5.3,1.9.8c.4.5.7,1.3.7,2.3v8.5h-2.2Z" class="style-scope yt-icon"></path>
                        <path d="M76.3,18.2c-1.1,0-2-.3-2.6-.9-.6-.6-.9-1.4-.9-2.5v-4.8c0-1.1.3-2,.9-2.6.6-.6,1.5-.9,2.6-.9s2,.3,2.7.9c.6.6.9,1.5.9,2.6v.4h-2.1v-.4c0-.5-.1-.9-.4-1.2-.3-.3-.6-.4-1-.4s-.8.1-1.1.4c-.3.3-.4.7-.4,1.2v4.8c0,.5.1.8.4,1.1s.6.4,1.1.4.8-.1,1.1-.4.4-.6.4-1.1v-.4h2.2v.4c0,1.1-.3,1.9-.9,2.5-.6.6-1.5.9-2.7.9Z" class="style-scope yt-icon"></path>
                        <path d="M84.3,18.2c-1.1,0-2-.3-2.7-1s-.9-1.6-.9-2.8v-4c0-1.3.3-2.3.9-2.9.6-.7,1.5-1,2.6-1s2,.3,2.6,1c.6.6.9,1.6.9,2.7v3h-5.5v-1.7h3.5v-1.2c0-.6-.1-1-.4-1.4s-.6-.5-1.1-.5-.8.2-1.1.5-.4.8-.4,1.5v4.2c0,.6.1,1,.4,1.3.3.3.6.5,1.1.5s.8-.1,1-.3c.2-.2.4-.6.4-1h0c0,0,2.1,0,2.1,0h0c0,1.1-.3,1.9-.9,2.5s-1.5.9-2.6.9Z" class="style-scope yt-icon"></path>
                        <path d="M91.5,18.2c-.8,0-1.5-.3-1.9-.9-.5-.6-.7-1.4-.7-2.5v-4.9c0-1.1.2-2,.7-2.6.5-.6,1.1-.9,1.9-.9s1,.2,1.5.5.8.8,1.1,1.5l-.2,1.6c0-.4,0-.7-.2-.9-.1-.2-.3-.4-.5-.6s-.5-.2-.8-.2c-.4,0-.8.1-1,.4s-.4.7-.4,1.3v4.6c0,.5.1.9.4,1.1.2.3.6.4,1,.4s.5,0,.8-.2.4-.3.5-.6c.1-.2.2-.5.2-.9l.2,1.6c-.2.6-.5,1.1-1,1.5s-.9.5-1.5.5ZM93.8,18V2.1h2.2v15.9h-2.2Z" class="style-scope yt-icon"></path>
                    </g>
                </g>
            `;
        });

        document.querySelectorAll("#country-code").forEach(el => el.removeAttribute('hidden'));
        document.querySelectorAll(".ytd-topbar-logo-renderer[hidden]").forEach(el => el.removeAttribute('hidden'));
        document.querySelectorAll("ytd-yoodle-renderer").forEach(el => el.setAttribute('hidden', ''));
        document.querySelectorAll("a#logo").forEach(el => el.setAttribute("title", "YouTube Enhanced"));
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
