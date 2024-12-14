// ==UserScript==
// @name         YouTube Enhancer (Reveal Channel ID)
// @description  Revealing the channel ID, displayed next to the channel handle.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.3
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    
    let lastProcessedChannelName = '';
    let isRequestInProgress = false;
    let channelIdCache = {};

    const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

    function loadCacheFromStorage() {
        try {
            const cachedData = localStorage.getItem('youtubeEnhancerCache');
            if (cachedData) {
                const parsedCache = JSON.parse(cachedData);
                const now = Date.now();
                Object.keys(parsedCache).forEach(key => {
                    if (now - parsedCache[key].timestamp > CACHE_DURATION) {
                        delete parsedCache[key];
                    }
                });
                channelIdCache = parsedCache;
                return parsedCache;
            }
        } catch (error) {
            console.error('Error loading cache:', error);
        }
        return {};
    }

    function saveToCache(channelName, channelId) {
        try {
            channelIdCache[channelName] = {
                id: channelId,
                timestamp: Date.now()
            };
            localStorage.setItem('youtubeEnhancerCache', JSON.stringify(channelIdCache));
        } catch (error) {
            console.error('Error saving to cache:', error);
        }
    }

    function getFromCache(channelName) {
        const cached = channelIdCache[channelName];
        if (cached) {
            const now = Date.now();
            if (now - cached.timestamp <= CACHE_DURATION) {
                return cached.id;
            } else {
                delete channelIdCache[channelName];
                localStorage.setItem('youtubeEnhancerCache', JSON.stringify(channelIdCache));
            }
        }
        return null;
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

    function isChannelPage() {
        const path = window.location.pathname;
        const channelTabs = [
            '/featured', '/videos', '/streams', '/shorts', '/courses', 
            '/playlists', '/community', '/podcasts', '/store', '/about', 
            '/membership', '/channels', '/search', '/@'
        ];
        
        return channelTabs.some(tab => path.includes(tab));
    }

    function isWatchPage() {
        return window.location.pathname.startsWith('/watch');
    }

    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = getChannelNameElement();
            if (element) {
                return resolve(element);
            }

            const observer = new MutationObserver((mutations, obs) => {
                const element = getChannelNameElement();
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject('Timeout waiting for element');
            }, timeout);
        });
    }

    function createLoadingElement() {
        const loadingSpan = document.createElement('span');
        loadingSpan.className = 'YouTubeEnhancerLoading';
        loadingSpan.textContent = ' (Loading...)';
        loadingSpan.style.fontSize = '1em';
        loadingSpan.style.color = '#aaaaaa';
        return loadingSpan;
    }

    async function addChannelId() {
        if (isWatchPage()) {
            return;
        }

        try {
            const channelNameElement = await waitForElement();
            
            if (!channelNameElement || !channelNameElement.textContent || 
                channelNameElement.querySelector('.YouTubeEnhancerRevealChannelID')) {
                return;
            }

            const channelName = channelNameElement.textContent.trim().replace('@', '');
            
            if (channelName.length === 0) {
                return;
            }

            const cachedChannelId = getFromCache(channelName);
            if (cachedChannelId) {
                appendChannelIdToElement(channelNameElement, cachedChannelId);
                return;
            }

            if (channelName === lastProcessedChannelName || isRequestInProgress) {
                return;
            }

            isRequestInProgress = true;
            lastProcessedChannelName = channelName;
            
            const loadingElement = createLoadingElement();
            channelNameElement.appendChild(loadingElement);
            
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://exyezed.vercel.app/api/channel/${channelName}`,
                onload: function(response) {
                    isRequestInProgress = false;
                    try {
                        const loadingIndicator = channelNameElement.querySelector('.YouTubeEnhancerLoading');
                        if (loadingIndicator) {
                            loadingIndicator.remove();
                        }
                        
                        const data = JSON.parse(response.responseText);
                        const channelId = data.channel_id;
                        
                        saveToCache(channelName, channelId);
                        
                        appendChannelIdToElement(channelNameElement, channelId);
                    } catch (error) {
                        console.error('Error parsing API response:', error);
                        const loadingIndicator = channelNameElement.querySelector('.YouTubeEnhancerLoading');
                        if (loadingIndicator) {
                            loadingIndicator.remove();
                        }
                    }
                },
                onerror: function(error) {
                    isRequestInProgress = false;
                    console.error('Error fetching channel ID:', error);
                    const loadingIndicator = channelNameElement.querySelector('.YouTubeEnhancerLoading');
                    if (loadingIndicator) {
                        loadingIndicator.remove();
                    }
                }
            });
        } catch (error) {
            console.error('Error in addChannelId:', error);
        }
    }

    function appendChannelIdToElement(element, channelId) {
        if (!element.querySelector('.YouTubeEnhancerRevealChannelID')) {
            const channelIdLink = document.createElement('a');
            channelIdLink.className = 'YouTubeEnhancerRevealChannelID';
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

    function handleNavigation() {
        lastProcessedChannelName = '';
        isRequestInProgress = false;
        
        if (isChannelPage() && !isWatchPage()) {
            addChannelId();
        }
    }

    loadCacheFromStorage();

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.target.nodeName === 'YTD-APP') {
                handleNavigation();
            }
            else if (isChannelPage() && !isWatchPage()) {
                addChannelId();
            }
        }
    });

    const urlObserver = new MutationObserver((mutations) => {
        handleNavigation();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    urlObserver.observe(document.querySelector('title'), {
        childList: true
    });

    handleNavigation();

    document.addEventListener('yt-navigate-start', handleNavigation);
    document.addEventListener('yt-navigate-finish', handleNavigation);
    console.log('YouTube Enhancer (Reveal Channel ID) is running');
})();
