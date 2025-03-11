// ==UserScript==
// @name         YouTube Enhancer (Stats)
// @description  Add a Stats Button.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.5
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const styles = `
        .videoStats {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-left: 8px;
        }
        html[dark] .videoStats {
            background-color: #ffffff1a;
        }
        html:not([dark]) .videoStats {
            background-color: #0000000d;
        }
        html[dark] .videoStats:hover {
            background-color: #ffffff33;
        }
        html:not([dark]) .videoStats:hover {
            background-color: #00000014;
        }
        .videoStats svg {
            width: 18px;
            height: 18px;
        }
        html[dark] .videoStats svg {
            fill: var(--yt-spec-text-primary, #fff);
        }
        html:not([dark]) .videoStats svg {
            fill: var(--yt-spec-text-primary, #030303);
        }

        .shortsStats {
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

        html[dark] .shortsStats {
            background-color: rgba(255, 255, 255, 0.1);
        }

        html:not([dark]) .shortsStats {
            background-color: rgba(0, 0, 0, 0.05);
        }

        html[dark] .shortsStats:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        html:not([dark]) .shortsStats:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .shortsStats svg {
            width: 24px;
            height: 24px;
        }

        html[dark] .shortsStats svg {
            fill: white;
        }

        html:not([dark]) .shortsStats svg {
            fill: black;
        }
        
        .stats-menu-container {
            position: relative;
            display: inline-block;
        }

        .stats-horizontal-menu {
            position: absolute;
            display: flex;
            left: 100%;
            top: 0;
            height: 100%;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.2s linear;
            z-index: 100;
        }

        .stats-menu-container:hover .stats-horizontal-menu {
            visibility: visible;
            opacity: 1;
        }

        .stats-menu-button {
            margin-left: 8px;
            white-space: nowrap;
        }
    `;

    let previousUrl = location.href;
    let isChecking = false;
    let channelFeatures = {
        hasStreams: false,
        hasShorts: false
    };

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

    function getChannelIdentifier() {
        const url = window.location.href;
        let identifier = '';

        if (url.includes('/channel/')) {
            identifier = url.split('/channel/')[1].split('/')[0];
        } else if (url.includes('/@')) {
            identifier = url.split('/@')[1].split('/')[0];
        }

        return identifier;
    }

    async function checkChannelTabs(url) {
        if (isChecking) return;
        isChecking = true;
        
        try {
            const response = await fetch(url, {
                credentials: 'same-origin'
            });
            
            if (!response.ok) {
                isChecking = false;
                return;
            }
            
            const html = await response.text();
            const match = html.match(/var ytInitialData = (.+?);<\/script>/);
            
            if (!match || !match[1]) {
                isChecking = false;
                return;
            }
            
            const data = JSON.parse(match[1]);
            const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
            
            let hasStreams = false;
            let hasShorts = false;
            
            tabs.forEach(tab => {
                const tabUrl = tab?.tabRenderer?.endpoint?.commandMetadata?.webCommandMetadata?.url;
                if (tabUrl) {
                    if (/\/streams$/.test(tabUrl)) hasStreams = true;
                    if (/\/shorts$/.test(tabUrl)) hasShorts = true;
                }
            });
            
            channelFeatures = {
                hasStreams: hasStreams,
                hasShorts: hasShorts
            };
            
            const existingMenu = document.querySelector('.stats-menu-container');
            if (existingMenu) {
                existingMenu.remove();
                createStatsMenu();
            }
        } catch (e) {
        } finally {
            isChecking = false;
        }
    }

    function isChannelPage(url) {
        return url.includes('youtube.com/') && 
               (url.includes('/channel/') || url.includes('/@')) && 
               !url.includes('/video/') && 
               !url.includes('/watch');
    }

    function checkUrlChange() {
        const currentUrl = location.href;
        if (currentUrl !== previousUrl) {
            previousUrl = currentUrl;
            if (isChannelPage(currentUrl)) {
                setTimeout(() => checkChannelTabs(currentUrl), 500);
            }
        }
    }

    function createStatsIcon(isShorts = false) {
        const icon = document.createElement('div');
        icon.className = isShorts ? 'shortsStats' : 'videoStats';

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 512 512");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M500 89c13.8-11 16-31.2 5-45s-31.2-16-45-5L319.4 151.5 211.2 70.4c-11.7-8.8-27.8-8.5-39.2 .6L12 199c-13.8 11-16 31.2-5 45s31.2 16 45 5L192.6 136.5l108.2 81.1c11.7 8.8 27.8 8.5 39.2-.6L500 89zM160 256l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32zM32 352l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32zm288-64c-17.7 0-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32zm96-32l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32z");
        
        svg.appendChild(path);
        icon.appendChild(svg);

        icon.addEventListener('click', redirectToStatsAPI);

        return icon;
    }

    function redirectToStatsAPI() {
        const videoId = getVideoId();
        if (videoId) {
            const apiUrl = `https://afkarxyzstats.vercel.app/?directVideo=${videoId}`;
            window.open(apiUrl, '_blank');
        }
    }

    function insertIconForRegularVideo() {
        const targetSelector = '#owner';
        const target = document.querySelector(targetSelector);

        if (target && !document.querySelector('.videoStats')) {
            const statsIcon = createStatsIcon();
            target.appendChild(statsIcon);
        }
    }

    function insertIconForShorts() {
        const shortsContainer = document.querySelector('ytd-reel-video-renderer[is-active] #actions');
        
        if (shortsContainer && !shortsContainer.querySelector('.shortsStats')) {
            const iconDiv = createStatsIcon(true);
            shortsContainer.insertBefore(iconDiv, shortsContainer.firstChild);
            return true;
        }
        return false;
    }

    function createButton(text, svgPath, viewBox, className, onClick) {
        const buttonViewModel = document.createElement('button-view-model');
        buttonViewModel.className = `yt-spec-button-view-model ${className}-view-model`;

        const button = document.createElement('button');
        button.className = `yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment ${className}-button`;
        button.setAttribute('aria-disabled', 'false');
        button.setAttribute('aria-label', text);
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.gap = '8px';

        button.addEventListener('click', onClick);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", viewBox);
        svg.style.width = "20px";
        svg.style.height = "20px";
        svg.style.fill = "currentColor";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", svgPath);
        svg.appendChild(path);

        const buttonText = document.createElement('div');
        buttonText.className = `yt-spec-button-shape-next__button-text-content ${className}-text`;
        buttonText.textContent = text;
        buttonText.style.display = 'flex';
        buttonText.style.alignItems = 'center';

        const touchFeedback = document.createElement('yt-touch-feedback-shape');
        touchFeedback.style.borderRadius = 'inherit';

        const touchFeedbackDiv = document.createElement('div');
        touchFeedbackDiv.className = 'yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response';
        touchFeedbackDiv.setAttribute('aria-hidden', 'true');

        const strokeDiv = document.createElement('div');
        strokeDiv.className = 'yt-spec-touch-feedback-shape__stroke';

        const fillDiv = document.createElement('div');
        fillDiv.className = 'yt-spec-touch-feedback-shape__fill';

        touchFeedbackDiv.appendChild(strokeDiv);
        touchFeedbackDiv.appendChild(fillDiv);
        touchFeedback.appendChild(touchFeedbackDiv);

        button.appendChild(svg);
        button.appendChild(buttonText);
        button.appendChild(touchFeedback);
        buttonViewModel.appendChild(button);

        return buttonViewModel;
    }

    function createStatsMenu() {
        if (document.querySelector('.stats-menu-container')) {
            return;
        }

        const containerDiv = document.createElement('div');
        containerDiv.className = 'yt-flexible-actions-view-model-wiz__action stats-menu-container';

        const mainButtonViewModel = document.createElement('button-view-model');
        mainButtonViewModel.className = 'yt-spec-button-view-model main-stats-view-model';

        const mainButton = document.createElement('button');
        mainButton.className = 'yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment main-stats-button';
        mainButton.setAttribute('aria-disabled', 'false');
        mainButton.setAttribute('aria-label', 'Stats');
        mainButton.style.display = 'flex';
        mainButton.style.alignItems = 'center';
        mainButton.style.justifyContent = 'center';
        mainButton.style.gap = '8px';

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 512 512");
        svg.style.width = "20px";
        svg.style.height = "20px";
        svg.style.fill = "currentColor";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M500 89c13.8-11 16-31.2 5-45s-31.2-16-45-5L319.4 151.5 211.2 70.4c-11.7-8.8-27.8-8.5-39.2 .6L12 199c-13.8 11-16 31.2-5 45s31.2 16 45 5L192.6 136.5l108.2 81.1c11.7 8.8 27.8 8.5 39.2-.6L500 89zM160 256l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32zM32 352l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32zm288-64c-17.7 0-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32zm96-32l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32z");
        svg.appendChild(path);

        const buttonText = document.createElement('div');
        buttonText.className = 'yt-spec-button-shape-next__button-text-content main-stats-text';
        buttonText.textContent = 'Stats';
        buttonText.style.display = 'flex';
        buttonText.style.alignItems = 'center';

        const touchFeedback = document.createElement('yt-touch-feedback-shape');
        touchFeedback.style.borderRadius = 'inherit';

        const touchFeedbackDiv = document.createElement('div');
        touchFeedbackDiv.className = 'yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response';
        touchFeedbackDiv.setAttribute('aria-hidden', 'true');

        const strokeDiv = document.createElement('div');
        strokeDiv.className = 'yt-spec-touch-feedback-shape__stroke';

        const fillDiv = document.createElement('div');
        fillDiv.className = 'yt-spec-touch-feedback-shape__fill';

        touchFeedbackDiv.appendChild(strokeDiv);
        touchFeedbackDiv.appendChild(fillDiv);
        touchFeedback.appendChild(touchFeedbackDiv);

        mainButton.appendChild(svg);
        mainButton.appendChild(buttonText);
        mainButton.appendChild(touchFeedback);
        mainButtonViewModel.appendChild(mainButton);
        containerDiv.appendChild(mainButtonViewModel);

        const horizontalMenu = document.createElement('div');
        horizontalMenu.className = 'stats-horizontal-menu';

        const channelButtonContainer = document.createElement('div');
        channelButtonContainer.className = 'stats-menu-button channel-stats-container';
        
        const channelButton = createButton(
            'Channel', 
            "M64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l512 0c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48zM0 64C0 28.7 28.7 0 64 0L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 416c-35.3 0-64-28.7-64-64L0 64zM120 464l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-400 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z",
            "0 0 640 512",
            'channel-stats',
            () => {
                const channelId = getChannelIdentifier();
                if (channelId) {
                    const url = `https://afkarxyzstats.vercel.app/?directChannel=${channelId}`;
                    window.open(url, '_blank');
                }
            }
        );
        
        channelButtonContainer.appendChild(channelButton);
        horizontalMenu.appendChild(channelButtonContainer);

        if (channelFeatures.hasStreams) {
            const liveButtonContainer = document.createElement('div');
            liveButtonContainer.className = 'stats-menu-button live-stats-container';
            
            const liveButton = createButton(
                'Live', 
                "M99.8 69.4c10.2 8.4 11.6 23.6 3.2 33.8C68.6 144.7 48 197.9 48 256s20.6 111.3 55 152.8c8.4 10.2 7 25.3-3.2 33.8s-25.3 7-33.8-3.2C24.8 389.6 0 325.7 0 256S24.8 122.4 66 72.6c8.4-10.2 23.6-11.6 33.8-3.2zm376.5 0c10.2-8.4 25.3-7 33.8 3.2c41.2 49.8 66 113.8 66 183.4s-24.8 133.6-66 183.4c-8.4 10.2-23.6 11.6-33.8 3.2s-11.6-23.6-3.2-33.8c34.3-41.5 55-94.7 55-152.8s-20.6-111.3-55-152.8c-8.4-10.2-7-25.3 3.2-33.8zM248 256a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-61.1-78.5C170 199.2 160 226.4 160 256s10 56.8 26.9 78.5c8.1 10.5 6.3 25.5-4.2 33.7s-25.5 6.3-33.7-4.2c-23.2-29.8-37-67.3-37-108s13.8-78.2 37-108c8.1-10.5 23.2-12.3 33.7-4.2s12.3 23.2 4.2 33.7zM427 148c23.2 29.8 37 67.3 37 108s-13.8 78.2-37 108c-8.1 10.5-23.2 12.3-33.7 4.2s-12.3-23.2-4.2-33.7C406 312.8 416 285.6 416 256s-10-56.8-26.9-78.5c-8.1-10.5-6.3-25.5 4.2-33.7s25.5-6.3 33.7 4.2z",
                "0 0 576 512",
                'live-stats',
                () => {
                    const channelId = getChannelIdentifier();
                    if (channelId) {
                        const url = `https://afkarxyzstats.vercel.app/?directStream=${channelId}`;
                        window.open(url, '_blank');
                    }
                }
            );
            
            liveButtonContainer.appendChild(liveButton);
            horizontalMenu.appendChild(liveButtonContainer);
        }

        if (channelFeatures.hasShorts) {
            const shortsButtonContainer = document.createElement('div');
            shortsButtonContainer.className = 'stats-menu-button shorts-stats-container';
            
            const shortsButton = createButton(
                'Shorts', 
                "M80 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l224 0c8.8 0 16-7.2 16-16l0-384c0-8.8-7.2-16-16-16L80 48zM16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM160 400l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z",
                "0 0 384 512",
                'shorts-stats',
                () => {
                    const channelId = getChannelIdentifier();
                    if (channelId) {
                        const url = `https://afkarxyzstats.vercel.app/?directShorts=${channelId}`;
                        window.open(url, '_blank');
                    }
                }
            );
            
            shortsButtonContainer.appendChild(shortsButton);
            horizontalMenu.appendChild(shortsButtonContainer);
        }

        containerDiv.appendChild(horizontalMenu);

        const joinButton = document.querySelector('.yt-flexible-actions-view-model-wiz__action:not(.stats-menu-container)');
        if (joinButton) {
            joinButton.parentNode.appendChild(containerDiv);
        } else {
            const buttonContainer = document.querySelector('#subscribe-button + #buttons');
            if (buttonContainer) {
                buttonContainer.appendChild(containerDiv);
            }
        }

        return containerDiv;
    }

    function checkAndAddMenu() {
        const joinButton = document.querySelector('.yt-flexible-actions-view-model-wiz__action:not(.stats-menu-container)');
        const statsMenu = document.querySelector('.stats-menu-container');

        if (joinButton && !statsMenu) {
            createStatsMenu();
        }
    }

    function checkAndInsertIcon() {
        const isShorts = window.location.pathname.includes('/shorts/');
        if (isShorts) {
            const shortsObserver = new MutationObserver((_mutations, observer) => {
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
        checkAndAddMenu();
        
        history.pushState = (function(f) {
            return function() {
                const result = f.apply(this, arguments);
                checkUrlChange();
                return result;
            };
        })(history.pushState);

        history.replaceState = (function(f) {
            return function() {
                const result = f.apply(this, arguments);
                checkUrlChange();
                return result;
            };
        })(history.replaceState);

        window.addEventListener('popstate', checkUrlChange);
        
        if (isChannelPage(location.href)) {
            checkChannelTabs(location.href);
        }
    }

    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                checkAndInsertIcon();
                checkAndAddMenu();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('yt-navigate-finish', () => {
        checkAndInsertIcon();
        checkAndAddMenu();
        if (isChannelPage(location.href)) {
            checkChannelTabs(location.href);
        }
    });

    document.addEventListener('yt-action', function(event) {
        if (event.detail && event.detail.actionName === 'yt-reload-continuation-items-command') {
            checkAndInsertIcon();
            checkAndAddMenu();
        }
    });
})();