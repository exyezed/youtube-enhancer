// ==UserScript==
// @name         YouTube Enhancer (Reveal Channel ID)
// @description  Revealing the channel ID, displayed next to the channel handle.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.1
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

    async function addChannelId() {
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

            if (channelIdCache[channelName]) {
                appendChannelIdToElement(channelNameElement, channelIdCache[channelName]);
                return;
            }

            if (channelName === lastProcessedChannelName || isRequestInProgress) {
                return;
            }

            isRequestInProgress = true;
            lastProcessedChannelName = channelName;
            
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://exyezed.vercel.app/api/channel/${channelName}`,
                onload: function(response) {
                    isRequestInProgress = false;
                    try {
                        const data = JSON.parse(response.responseText);
                        const channelId = data.channel_id;
                        
                        channelIdCache[channelName] = channelId;
                        
                        appendChannelIdToElement(channelNameElement, channelId);
                    } catch (error) {
                        console.error('Error parsing API response:', error);
                    }
                },
                onerror: function(error) {
                    isRequestInProgress = false;
                    console.error('Error fetching channel ID:', error);
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
        
        if (isChannelPage() || document.querySelector('ytd-watch-flexy')) {
            addChannelId();
        }
    }

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.target.nodeName === 'YTD-APP') {
                handleNavigation();
            }
            else if (isChannelPage() || document.querySelector('ytd-watch-flexy')) {
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
