// ==UserScript==
// @name         YouTube Enhancer (Reveal Country Flag)
// @description  Reveal Country Flag.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.6
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
        BASE_URL: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/4x3/',
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

    async function getCountryData(type, id) {
        const cachedValue = getFromCache(type, id);
        if (cachedValue) {
            return cachedValue;
        }

        const url = `https://flagscountry.vercel.app/api/${type}/${id}`;

        if (typeof GM_xmlhttpRequest !== 'undefined') {
            return new Promise((resolve) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            try {
                                const data = JSON.parse(response.responseText);
                                const countryData = {
                                    code: data.country.toLowerCase(),
                                    name: data.countryName
                                };
                                setToCache(type, id, countryData);
                                resolve(countryData);
                            } catch (error) {
                                console.error('Error parsing JSON:', error);
                                resolve(null);
                            }
                        } else {
                            console.error('Request failed:', response.status);
                            resolve(null);
                        }
                    },
                    onerror: function(error) {
                        console.error('Request error:', error);
                        resolve(null);
                    },
                    ontimeout: function() {
                        console.error('Request timed out');
                        resolve(null);
                    }
                });
            });
        } else {
            return null;
        }
    }

    function createFlag(size, margin, className, countryData) {
        const flag = document.createElement('img');
        flag.src = `${FLAG_CONFIG.BASE_URL}${countryData.code}.svg`;
        flag.className = `country-flag ${className}`;
        flag.style.width = size;
        flag.style.height = 'auto';
        flag.style.marginLeft = margin;
        flag.style.verticalAlign = 'middle';
        flag.style.cursor = 'pointer';
        flag.title = countryData.name;
        
        return flag;
    }

    function removeExistingFlags(element) {
        const existingFlags = element.querySelectorAll('.country-flag');
        existingFlags.forEach(flag => flag.remove());
    }

    async function addFlag() {
        const channelElement = document.querySelector('.dynamic-text-view-model-wiz__h1 .yt-core-attributed-string');
        if (channelElement && !processedElements.has(channelElement)) {
            removeExistingFlags(channelElement.parentElement);
            processedElements.add(channelElement);
            const channelUrl = window.location.pathname;
            const channelId = channelUrl.includes('@')
                ? channelUrl.split('@')[1].split('/')[0]
                : channelUrl.split('/')[2];

            const countryData = await getCountryData('channel', channelId);
            if (countryData) {
                channelElement.appendChild(
                    createFlag(FLAG_CONFIG.SIZES.channel, FLAG_CONFIG.MARGINS.channel, 'channel-flag', countryData)
                );
            }
        }

        const videoElement = document.querySelector('#title yt-formatted-string');
        if (videoElement && !processedElements.has(videoElement)) {
            const videoParent = videoElement.closest('#title h1');
            if (videoParent) {
                removeExistingFlags(videoParent);
                processedElements.add(videoElement);
                const videoId = new URLSearchParams(window.location.search).get('v');
                if (videoId) {
                    const countryData = await getCountryData('video', videoId);
                    if (countryData) {
                        videoParent.style.display = 'flex';
                        videoParent.style.alignItems = 'center';
                        videoParent.appendChild(
                            createFlag(FLAG_CONFIG.SIZES.video, FLAG_CONFIG.MARGINS.video, 'video-flag', countryData)
                        );
                    }
                }
            }
        }

        const shortsChannelElements = document.querySelectorAll('.ytReelChannelBarViewModelChannelName');
        shortsChannelElements.forEach(async element => {
            if (!processedElements.has(element)) {
                removeExistingFlags(element);
                processedElements.add(element);
                const shortsId = window.location.pathname.split('/').pop();
                const countryData = await getCountryData('video', shortsId);
                if (countryData) {
                    element.appendChild(
                        createFlag(FLAG_CONFIG.SIZES.shorts, FLAG_CONFIG.MARGINS.shorts, 'shorts-flag', countryData)
                    );
                }
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
})();