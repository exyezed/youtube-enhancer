// ==UserScript==
// @name         YouTube Enhancer (Video Secret Stats)
// @description  Integrating clickable badges on video and shorts pages that direct users to detailed statistics for each video.
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

    const styles = `
        .YouTubeEnhancerVideoStats {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-left: 8px;
        }
        html[dark] .YouTubeEnhancerVideoStats {
            background-color: #ffffff1a;
        }
        html:not([dark]) .YouTubeEnhancerVideoStats {
            background-color: #0000000d;
        }
        html[dark] .YouTubeEnhancerVideoStats:hover {
            background-color: #ffffff33;
        }
        html:not([dark]) .YouTubeEnhancerVideoStats:hover {
            background-color: #00000014;
        }
        .YouTubeEnhancerVideoStats svg {
            width: 18px;
            height: 18px;
        }
        html[dark] .YouTubeEnhancerVideoStats svg {
            fill: var(--yt-spec-text-primary, #fff);
        }
        html:not([dark]) .YouTubeEnhancerVideoStats svg {
            fill: var(--yt-spec-text-primary, #030303);
        }

        .YouTubeEnhancerShortsStats {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 16px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        html[dark] .YouTubeEnhancerShortsStats {
            background-color: rgba(255, 255, 255, 0.1);
        }

        html:not([dark]) .YouTubeEnhancerShortsStats {
            background-color: rgba(0, 0, 0, 0.05);
        }

        html[dark] .YouTubeEnhancerShortsStats:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        html:not([dark]) .YouTubeEnhancerShortsStats:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .YouTubeEnhancerShortsStats svg {
            width: 24px;
            height: 24px;
        }

        html[dark] .YouTubeEnhancerShortsStats svg {
            fill: white;
        }

        html:not([dark]) .YouTubeEnhancerShortsStats svg {
            fill: black;
        }
    `;

    function addStyles() {
        if (!document.querySelector('#youtube-enhancer-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'youtube-enhancer-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }
    }

    function getVideoId() {
        const url = window.location.href;
        const urlParams = new URLSearchParams(window.location.search);
        const normalVideoId = urlParams.get('v');
        const shortsMatch = url.match(/\/shorts\/([^?]+)/);
        return normalVideoId || (shortsMatch ? shortsMatch[1] : null);
    }

    function createCupcakeIcon(isShorts = false) {
        const icon = document.createElement('div');
        icon.className = isShorts ? 'YouTubeEnhancerShortsStats' : 'YouTubeEnhancerVideoStats';

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 448 512");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48l-59.9 0C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4l-59.9 0c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208l-12.4 0c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2L168 224c-22.1 0-40-17.9-40-40l0-14.4c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4l0 14.4c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z");
        
        svg.appendChild(path);
        icon.appendChild(svg);

        icon.addEventListener('click', redirectToStatsAPI);

        return icon;
    }

    function redirectToStatsAPI() {
        const videoId = getVideoId();
        if (videoId) {
            const isShorts = window.location.pathname.includes('/shorts/');
            const apiUrl = isShorts
                ? `https://exyezed.vercel.app/stats/shorts/youtu.be/${videoId}`
                : `https://exyezed.vercel.app/stats/secret/youtu.be/${videoId}`;
            window.open(apiUrl, '_blank');
        }
    }

    function insertIconForRegularVideo() {
        const targetSelector = '#owner';
        const target = document.querySelector(targetSelector);

        if (target && !document.querySelector('.YouTubeEnhancerVideoStats')) {
            const cupcakeIcon = createCupcakeIcon();
            target.appendChild(cupcakeIcon);
        }
    }

    function insertIconForShorts() {
        const shortsContainer = document.querySelector('ytd-reel-video-renderer[is-active] #actions');
        
        if (shortsContainer && !shortsContainer.querySelector('.YouTubeEnhancerShortsStats')) {
            const iconDiv = createCupcakeIcon(true);
            shortsContainer.insertBefore(iconDiv, shortsContainer.firstChild);
            return true;
        }
        return false;
    }

    function checkAndInsertIcon() {
        const isShorts = window.location.pathname.includes('/shorts/');
        if (isShorts) {
            const shortsObserver = new MutationObserver((mutations, observer) => {
                if (insertIconForShorts()) {
                    observer.disconnect();
                }
            });

            const shortsContainer = document.querySelector('ytd-shorts');
            if (shortsContainer) {
                shortsObserver.observe(shortsContainer, { 
                    childList: true, 
                    subtree: true 
                });
                insertIconForShorts();
            }
        } else if (getVideoId()) {
            insertIconForRegularVideo();
        }
    }

    function init() {
        addStyles();
        checkAndInsertIcon();
    }

    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                checkAndInsertIcon();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('yt-navigate-finish', checkAndInsertIcon);

    document.addEventListener('yt-action', function(event) {
        if (event.detail && event.detail.actionName === 'yt-reload-continuation-items-command') {
            checkAndInsertIcon();
        }
    });
    console.log('YouTube Enhancer (Video Secret Stats) is running');
})();
