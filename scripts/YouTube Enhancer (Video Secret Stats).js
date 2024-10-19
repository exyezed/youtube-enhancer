// ==UserScript==
// @name         YouTube Enhancer (Video Secret Stats)
// @description  Integrating clickable badges on video and shorts pages that direct users to detailed statistics for each video.
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

    // Styles
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

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
        .YouTubeEnhancerVideoStats .material-symbols-outlined {
            font-size: 24px;
            font-variation-settings:
                'FILL' 0,
                'wght' 150,
                'GRAD' 0,
                'opsz' 24;
        }
        html[dark] .YouTubeEnhancerVideoStats .material-symbols-outlined {
            color: var(--yt-spec-text-primary, #fff);
        }
        html:not([dark]) .YouTubeEnhancerVideoStats .material-symbols-outlined {
            color: var(--yt-spec-text-primary, #030303);
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

        .YouTubeEnhancerShortsStats .material-symbols-outlined {
            font-size: 24px;
            font-variation-settings:
                'FILL' 1;
        }

        html[dark] .YouTubeEnhancerShortsStats .material-symbols-outlined {
            color: white;
        }

        html:not([dark]) .YouTubeEnhancerShortsStats .material-symbols-outlined {
            color: black;
        }
    `;

    // Helper Functions
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

    // Icon Creation and Functionality
    function createLockIcon(isShorts = false) {
        const icon = document.createElement('div');
        icon.className = isShorts ? 'YouTubeEnhancerShortsStats' : 'YouTubeEnhancerVideoStats';

        const lockSymbol = document.createElement('span');
        lockSymbol.className = 'material-symbols-outlined';
        lockSymbol.textContent = 'lock_open';

        icon.appendChild(lockSymbol);

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

    // DOM Manipulation
    function insertIconForRegularVideo() {
        const targetSelector = '#owner';
        const target = document.querySelector(targetSelector);

        if (target && !document.querySelector('.YouTubeEnhancerVideoStats')) {
            const lockIcon = createLockIcon();
            target.appendChild(lockIcon);
        }
    }

    function insertIconForShorts() {
        const shortsContainer = document.querySelector('ytd-reel-video-renderer[is-active] #actions');
        if (shortsContainer && !shortsContainer.querySelector('.YouTubeEnhancerShortsStats')) {
            const iconDiv = createLockIcon(true);
            shortsContainer.insertBefore(iconDiv, shortsContainer.firstChild);
        }
    }

    function checkAndInsertIcon() {
        const isShorts = window.location.pathname.includes('/shorts/');
        if (isShorts) {
            setTimeout(insertIconForShorts, 500); // Delay to ensure DOM is ready
        } else if (getVideoId()) {
            insertIconForRegularVideo();
        }
    }

    // Initialization and Event Listeners
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
})();