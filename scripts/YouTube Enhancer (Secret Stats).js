// ==UserScript==
// @name         YouTube Enhancer (Secret Stats)
// @description  Integrating "Secret Stats" and "Stream Stats" buttons into the channel page, directing users to detailed analytics pages for insights into the channel.
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

    // Button Creation and Manipulation
    function createButton(text, iconName, id) {
        const button = document.createElement('button');
        button.id = id;
        button.className = 'yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m';
        button.style.display = 'inline-flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.minWidth = 'auto';
        button.style.padding = '0 16px';
        button.style.height = '36px';
        button.style.fontSize = '14px';
        button.style.lineHeight = '36px';
        button.style.fontWeight = '500';

        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.textContent = iconName;
        icon.style.marginRight = '4px';
        icon.style.fontSize = '24px';
        icon.style.fontWeight = '100';

        const buttonText = document.createTextNode(text);

        button.appendChild(icon);
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
            const secretStatsButton = createButton('Secret Stats', 'lock_open', 'YouTubeEnhancerChannelSecretStats');
            const streamStatsButton = createButton('Stream Stats', 'cell_tower', 'YouTubeEnhancerStreamStats');

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

    // Channel Identifier Functions
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

    // Utility Functions
    function addMaterialIconsStylesheet() {
        if (!document.querySelector('#material-icons-stylesheet')) {
            const link = document.createElement('link');
            link.id = 'material-icons-stylesheet';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,150,0,0&icon_names=cell_tower,lock_open';
            document.head.appendChild(link);
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

    // Initialization
    function init() {
        if (window.location.pathname.includes('/channel/') ||
            window.location.pathname.includes('/@') ||
            window.location.pathname.includes('/c/') ||
            window.location.pathname.includes('/user/')) {
            addMaterialIconsStylesheet();
            observePageChanges();
        }
    }

    // Run on initial page load
    init();

    // Listen for YouTube spa navigation events
    window.addEventListener('yt-navigate-finish', init);
})();