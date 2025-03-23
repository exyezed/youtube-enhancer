// ==UserScript==
// @name         YouTube Enhancer (Reveal Channel ID)
// @description  Reveal Channel ID.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.4
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @exclude      https://www.youtube.com/watch*
// @exclude      https://youtu.be/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    
    let lastProcessedChannelName = '';
    let isRequestInProgress = false;
    const channelCache = {};
    let processingLock = false;
    
    function throttle(func, limit) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                return func.apply(this, args);
            }
        };
    }
    
    function loadCache() {
        try {
            const savedCache = GM_getValue('ytEnhancerChannelCache', null);
            if (savedCache) {
                Object.assign(channelCache, JSON.parse(savedCache));
            }
        } catch (e) {
            console.error('Error loading cache:', e);
        }
    }
    
    function saveCache() {
        try {
            GM_setValue('ytEnhancerChannelCache', JSON.stringify(channelCache));
        } catch (e) {
            console.error('Error saving cache:', e);
        }
    }

    async function fetchChannelData(url) {
        if (isRequestInProgress) return null;
        isRequestInProgress = true;
        
        try {
            const response = await fetch(url, {
                credentials: 'same-origin'
            });
            
            if (!response.ok) {
                isRequestInProgress = false;
                return null;
            }
            
            const html = await response.text();
            const match = html.match(/var ytInitialData = (.+?);<\/script>/);
            isRequestInProgress = false;
            return match && match[1] ? JSON.parse(match[1]) : null;
        } catch (error) {
            isRequestInProgress = false;
            return null;
        }
    }

    async function getChannelInfo(url) {
        const urlMatch = url.match(/@([^/]+)/);
        const channelHandle = urlMatch ? urlMatch[1] : null;
        
        if (channelHandle && channelCache[channelHandle]) {
            return channelCache[channelHandle];
        }
        
        const data = await fetchChannelData(url);
        if (!data) return null;
        
        try {
            const channelName = data?.metadata?.channelMetadataRenderer?.title || null;
            const channelId = data?.metadata?.channelMetadataRenderer?.externalId || null;
            
            const channelInfo = { channelName, channelId };
            
            if (channelHandle && channelId) {
                channelCache[channelHandle] = channelInfo;
                saveCache();
            }
            
            return channelInfo;
        } catch (e) {
            return null;
        }
    }

    function getChannelNameElement() {
        const selectors = [
            'yt-content-metadata-view-model .yt-core-attributed-string',
            '#channel-header #channel-name .ytd-channel-name',
            '#channel-header #text.ytd-channel-name',
            '#owner-name a',
            '#channel-name.ytd-video-owner-renderer'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        return null;
    }

    function waitForElement(timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = getChannelNameElement();
            if (element) {
                return resolve(element);
            }

            const observer = new MutationObserver((_mutations, obs) => {
                const element = getChannelNameElement();
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: false,
                attributes: false
            });

            setTimeout(() => {
                observer.disconnect();
                reject('Timeout waiting for element');
            }, timeout);
        });
    }

    function createLoadingElement() {
        const loadingSpan = document.createElement('span');
        loadingSpan.className = 'revealChannelIDLoading';
        loadingSpan.textContent = ' (Loading...)';
        loadingSpan.style.fontSize = '1em';
        loadingSpan.style.color = '#aaaaaa';
        return loadingSpan;
    }

    async function addChannelId() {
        if (processingLock) {
            return;
        }
        
        processingLock = true;
        
        try {
            const channelNameElement = await waitForElement();
            
            if (!channelNameElement || !channelNameElement.textContent || 
                channelNameElement.querySelector('.revealChannelID')) {
                processingLock = false;
                return;
            }

            const channelName = channelNameElement.textContent.trim().replace('@', '');
            
            if (channelName.length === 0) {
                processingLock = false;
                return;
            }

            if (channelName === lastProcessedChannelName || isRequestInProgress) {
                processingLock = false;
                return;
            }

            lastProcessedChannelName = channelName;
            
            const urlPath = window.location.pathname;
            const handleMatch = urlPath.match(/@([^/]+)/);
            const channelHandle = handleMatch ? handleMatch[1] : null;
            
            if (channelHandle && channelCache[channelHandle]) {
                appendChannelIdToElement(channelNameElement, channelCache[channelHandle].channelId);
                processingLock = false;
                return;
            }
            
            const loadingElement = createLoadingElement();
            channelNameElement.appendChild(loadingElement);
            
            const channelInfo = await getChannelInfo(window.location.href);
            
            const loadingIndicator = channelNameElement.querySelector('.revealChannelIDLoading');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            if (channelInfo && channelInfo.channelId) {
                appendChannelIdToElement(channelNameElement, channelInfo.channelId);
            }
        } catch (error) {
            const channelNameElement = getChannelNameElement();
            if (channelNameElement) {
                const loadingIndicator = channelNameElement.querySelector('.revealChannelIDLoading');
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
            }
        }
        
        processingLock = false;
    }

    function appendChannelIdToElement(element, channelId) {
        if (!element.querySelector('.revealChannelID')) {
            const channelIdLink = document.createElement('a');
            channelIdLink.className = 'revealChannelID';
            channelIdLink.textContent = ` (${channelId})`;
            channelIdLink.href = `https://www.youtube.com/channel/${channelId}`;
            channelIdLink.style.fontSize = '1em';
            channelIdLink.style.color = '#3ea6ff';
            channelIdLink.style.textDecoration = 'none';
            channelIdLink.style.cursor = 'pointer';
            
            channelIdLink.addEventListener('mouseover', function() {
                this.style.textDecoration = 'none';
            });
            
            element.appendChild(channelIdLink);
        }
    }

    const handleNavigation = throttle(function() {
        lastProcessedChannelName = '';
        addChannelId();
    }, 500);

    const handleDomMutation = throttle(function() {
        addChannelId();
    }, 300);

    const observer = new MutationObserver((mutations) => {
        let shouldProcess = false;
        
        for (const mutation of mutations) {
            if (mutation.target.nodeName === 'YTD-APP') {
                shouldProcess = true;
                break;
            }
        }
        
        if (shouldProcess) {
            handleNavigation();
        } else {
            handleDomMutation();
        }
    });

    const urlObserver = new MutationObserver(() => {
        handleNavigation();
    });
    
    loadCache();

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: false,
        attributes: false
    });

    urlObserver.observe(document.querySelector('title'), {
        childList: true
    });

    handleNavigation();

    document.addEventListener('yt-navigate-start', handleNavigation);
    document.addEventListener('yt-navigate-finish', handleNavigation);
})();