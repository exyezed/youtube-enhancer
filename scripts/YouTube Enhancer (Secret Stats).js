// ==UserScript==
// @name         YouTube Enhancer (Secret Stats)
// @description  Integrating "Secret Stats" and "Stream Stats" buttons into the channel page, directing users to detailed analytics pages for insights into the channel.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.1
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createSVGIcon(type) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        svg.setAttribute("viewBox", type === 'stream' ? "0 0 576 512" : "0 0 448 512");
        svg.style.width = "20px";
        svg.style.height = "20px";
        
        path.setAttribute("fill", "currentColor");
        path.setAttribute("d", type === 'stream' 
            ? "M108.2 71c13.8 11.1 16 31.2 5 45C82.4 154.4 64 203 64 256s18.4 101.6 49.1 140c11.1 13.8 8.8 33.9-5 45s-33.9 8.8-45-5C23.7 386.7 0 324.1 0 256S23.7 125.3 63.2 76c11.1-13.8 31.2-16 45-5zm359.7 0c13.8-11.1 33.9-8.8 45 5C552.3 125.3 576 187.9 576 256s-23.7 130.7-63.2 180c-11.1 13.8-31.2 16-45 5s-16-31.2-5-45c30.7-38.4 49.1-87 49.1-140s-18.4-101.6-49.1-140c-11.1-13.8-8.8-33.9 5-45zM232 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm-27.5-74.7c-17.8 19.8-28.5 46-28.5 74.7s10.8 54.8 28.5 74.7c11.8 13.2 10.7 33.4-2.5 45.2s-33.4 10.7-45.2-2.5C129 342.2 112 301.1 112 256s17-86.2 44.8-117.3c11.8-13.2 32-14.3 45.2-2.5s14.3 32 2.5 45.2zm214.7-42.7C447 169.8 464 210.9 464 256s-17 86.2-44.8 117.3c-11.8 13.2-32 14.3-45.2 2.5s-14.3-32-2.5-45.2c17.8-19.8 28.5-46 28.5-74.7s-10.8-54.8-28.5-74.7c-11.8-13.2-10.7-33.4 2.5-45.2s33.4-10.7 45.2 2.5z"
            : "M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48l-59.9 0C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4l-59.9 0c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208l-12.4 0c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2L168 224c-22.1 0-40-17.9-40-40l0-14.4c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4l0 14.4c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z");
        
        svg.appendChild(path);
        return svg;
    }

    function createButton(text, iconType, id) {
        const button = document.createElement('button');
        button.id = id;
        button.className = 'yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m';
        
        Object.assign(button.style, {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'auto',
            padding: '0 12px',
            height: '36px',
            fontSize: '14px',
            lineHeight: '36px',
            fontWeight: '500',
            gap: '6px'
        });

        const svgIcon = createSVGIcon(iconType);
        const buttonText = document.createTextNode(text);

        button.appendChild(svgIcon);
        button.appendChild(buttonText);

        return button;
    }

    function createButtonWrapper(button) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'yt-flexible-actions-view-model-wiz__action';
        buttonWrapper.appendChild(button);
        return buttonWrapper;
    }

    function addStatsButtons() {
        const targetElement = document.querySelector('yt-flexible-actions-view-model');
        const lastAction = targetElement ? targetElement.querySelector('div.yt-flexible-actions-view-model-wiz__action:last-child') : null;

        if (lastAction && !document.querySelector('#YouTubeEnhancerChannelSecretStats')) {
            const secretStatsButton = createButton('Secret Stats', 'secret', 'YouTubeEnhancerChannelSecretStats');
            const streamStatsButton = createButton('Stream Stats', 'stream', 'YouTubeEnhancerStreamStats');

            secretStatsButton.addEventListener('click', function() {
                const channelIdentifier = getChannelIdentifier();
                if (channelIdentifier) {
                    const statsUrl = `https://exyezed.vercel.app/stats/secret/${channelIdentifier}`;
                    window.open(statsUrl, '_blank');
                } else {
                    alert('Could not determine channel identifier. Please try again on a channel page.');
                }
            });

            streamStatsButton.addEventListener('click', function() {
                const channelIdentifier = getChannelIdentifier();
                if (channelIdentifier) {
                    const statsUrl = `https://exyezed.vercel.app/stats/stream/${channelIdentifier}`;
                    window.open(statsUrl, '_blank');
                } else {
                    alert('Could not determine channel identifier. Please try again on a channel page.');
                }
            });

            const secretStatsWrapper = createButtonWrapper(secretStatsButton);
            const streamStatsWrapper = createButtonWrapper(streamStatsButton);

            lastAction.insertAdjacentElement('afterend', streamStatsWrapper);
            lastAction.insertAdjacentElement('afterend', secretStatsWrapper);
        }
    }

    function getChannelIdentifier() {
        const channelId = getChannelId();
        if (channelId) return channelId;
        return getChannelHandle();
    }

    function getChannelId() {
        const channelIdMeta = document.querySelector('meta[itemprop="channelId"]');
        if (channelIdMeta) {
            return channelIdMeta.content;
        }

        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('channel') || extractChannelIdFromUrl();
    }

    function getChannelHandle() {
        const path = window.location.pathname;
        const matches = path.match(/\/@([^/]+)/);
        return matches ? matches[1] : null;
    }

    function extractChannelIdFromUrl() {
        const path = window.location.pathname;
        const matches = path.match(/\/(channel|user|c)\/([^/]+)/);
        return matches ? matches[2] : null;
    }

    function init() {
        if (window.location.pathname.includes('/channel/') ||
            window.location.pathname.includes('/@') ||
            window.location.pathname.includes('/c/') ||
            window.location.pathname.includes('/user/')) {
            observePageChanges();
        }
    }

    function observePageChanges() {
        const observer = new MutationObserver((mutations) => {
            const targetElement = document.querySelector('yt-flexible-actions-view-model');
            if (targetElement && targetElement.querySelector('div.yt-flexible-actions-view-model-wiz__action')) {
                addStatsButtons();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    init();

    window.addEventListener('yt-navigate-finish', init);
    console.log('YouTube Enhancer (Secret Stats) is running');
})();
