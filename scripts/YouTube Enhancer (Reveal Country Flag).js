// ==UserScript==
// @name         YouTube Enhancer (Reveal Country Flag)
// @description  Display country flags for YouTube channels, videos and shorts.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.3
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const FLAG_CONFIG = {
        BASE_URL: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/7.2.3/flags/4x3/',
        SIZES: {
            channel: '28px',
            video: '22px',
            shorts: '20px'
        },
        MARGINS: {
            channel: '12px',
            video: '10px',
            shorts: '8px'
        }
    };

    const COUNTRY_NAMES = {
        'id': 'Indonesia'
    };    

    const CACHE_CONFIG = {
        PREFIX: 'yt_enhancer_',
        EXPIRATION: 7 * 24 * 60 * 60 * 1000
    };

    const processedElements = new Set();

    function getCacheKey(type, id) {
        return `${CACHE_CONFIG.PREFIX}${type}_${id}`;
    }

    function getFromCache(type, id) {
        const cacheKey = getCacheKey(type, id);
        const cachedData = GM_getValue(cacheKey);
        
        if (!cachedData) return null;

        const { value, timestamp } = JSON.parse(cachedData);
        const now = Date.now();

        if (now - timestamp > CACHE_CONFIG.EXPIRATION) {
            GM_setValue(cacheKey, null);
            return null;
        }

        return value;
    }

    function setToCache(type, id, value) {
        const cacheKey = getCacheKey(type, id);
        const cacheData = {
            value: value,
            timestamp: Date.now()
        };
        GM_setValue(cacheKey, JSON.stringify(cacheData));
    }

    async function getCountryCode(type, id) {
        const cachedValue = getFromCache(type, id);
        if (cachedValue) {
            return cachedValue;
        }

        const url = `https://exyezed.vercel.app/api/${type}/${id}`;

        if (typeof GM_xmlhttpRequest !== 'undefined') {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            try {
                                const data = JSON.parse(response.responseText);
                                const countryCode = data.country.toLowerCase() || 'unknown';
                                setToCache(type, id, countryCode);
                                resolve(countryCode);
                            } catch (error) {
                                console.error('Error parsing JSON:', error);
                                resolve('unknown');
                            }
                        } else {
                            console.error('Request failed:', response.status);
                            resolve('unknown');
                        }
                    },
                    onerror: function(error) {
                        console.error('Request error:', error);
                        resolve('unknown');
                    }
                });
            });
        } else {
            return 'unknown';
        }
    }

    function createFlag(size, margin, className, countryCode) {
        const flag = document.createElement('img');
        flag.src = `${FLAG_CONFIG.BASE_URL}${countryCode === 'unknown' ? 'xx' : countryCode}.svg`;
        flag.className = `country-flag ${className}`;
        flag.style.width = size;
        flag.style.height = 'auto';
        flag.style.marginLeft = margin;
        flag.style.verticalAlign = 'middle';
        flag.style.cursor = 'pointer';
        flag.title = countryCode === 'unknown' 
            ? 'Country Not Set'
            : (COUNTRY_NAMES[countryCode] || countryCode.toUpperCase());
        
        return flag;
    }

    function removeExistingFlags(element) {
        const existingFlags = element.querySelectorAll('.country-flag');
        existingFlags.forEach(flag => flag.remove());
    }

    async function addFlag() {
        // Channel
        const channelElement = document.querySelector('.dynamic-text-view-model-wiz__h1 .yt-core-attributed-string');
        if (channelElement && !processedElements.has(channelElement)) {
            removeExistingFlags(channelElement.parentElement);
            processedElements.add(channelElement);
            const channelUrl = window.location.pathname;
            const channelId = channelUrl.includes('@')
                ? channelUrl.split('@')[1].split('/')[0]
                : channelUrl.split('/')[2];

            const countryCode = await getCountryCode('channel', channelId);
            channelElement.appendChild(
                createFlag(FLAG_CONFIG.SIZES.channel, FLAG_CONFIG.MARGINS.channel, 'channel-flag', countryCode)
            );
        }

        // Video
        const videoElement = document.querySelector('#title yt-formatted-string');
        if (videoElement && !processedElements.has(videoElement)) {
            const videoParent = videoElement.closest('#title h1');
            if (videoParent) {
                removeExistingFlags(videoParent);
                processedElements.add(videoElement);
                const videoId = new URLSearchParams(window.location.search).get('v');
                if (videoId) {
                    const countryCode = await getCountryCode('video', videoId);
                    videoParent.style.display = 'flex';
                    videoParent.style.alignItems = 'center';
                    videoParent.appendChild(
                        createFlag(FLAG_CONFIG.SIZES.video, FLAG_CONFIG.MARGINS.video, 'video-flag', countryCode)
                    );
                }
            }
        }

        // Shorts
        const shortsChannelElements = document.querySelectorAll('.YtReelChannelBarViewModelChannelName');
        shortsChannelElements.forEach(async element => {
            if (!processedElements.has(element)) {
                removeExistingFlags(element);
                processedElements.add(element);
                const shortsId = window.location.pathname.split('/').pop();
                const countryCode = await getCountryCode('video', shortsId);
                element.appendChild(
                    createFlag(FLAG_CONFIG.SIZES.shorts, FLAG_CONFIG.MARGINS.shorts, 'shorts-flag', countryCode)
                );
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length || mutation.type === 'childList' || mutation.type === 'subtree') {
                addFlag();
            }
        });
    });

    function startObserver() {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function init() {
        processedElements.clear();
        startObserver();
        addFlag();

        window.addEventListener('yt-navigate-finish', () => {
            observer.disconnect();
            processedElements.clear();
            startObserver();
            addFlag();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    console.log('YouTube Enhancer (Reveal Country Flag) is running');
})();
