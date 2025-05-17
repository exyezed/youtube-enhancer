// ==UserScript==
// @name         YouTube Enhancer (Reveal Country Flag)
// @description  Reveal Country Flag.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.8
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.jsdelivr.net/npm/date-fns@4.1.0/cdn.min.js
// ==/UserScript==

(function () {
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
    const processedChannelAge = new Set();

    function getCacheKey(type, id) {
        return `${CACHE_CONFIG.PREFIX}${type}_${id}`;
    }

    function getFromCache(type, id) {
        const cacheKey = getCacheKey(type, id);
        const cachedData = GM_getValue(cacheKey);
        if (!cachedData) return null;
        const { value, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp > CACHE_CONFIG.EXPIRATION) {
            GM_setValue(cacheKey, null);
            return null;
        }
        return value;
    }

    function setToCache(type, id, value) {
        const cacheKey = getCacheKey(type, id);
        GM_setValue(cacheKey, JSON.stringify({ value, timestamp: Date.now() }));
    }

    async function getCountryData(type, id) {
        const cachedValue = getFromCache(type, id);
        if (cachedValue) {
            if (cachedValue.creationDate) {
                cachedValue.channelAge = calculateChannelAge(cachedValue.creationDate);
            }
            return cachedValue;
        }

        const url = `https://flagscountry.vercel.app/api/${type}/${id}`;
        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        try {
                            const data = JSON.parse(response.responseText);
                            const countryData = {
                                code: data.country.toLowerCase(),
                                name: data.countryName,
                                creationDate: data.creationDate,
                                channelAge: data.creationDate ? calculateChannelAge(data.creationDate) : data.channelAge
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
                onerror: function (error) {
                    console.error('Request error:', error);
                    resolve(null);
                },
                ontimeout: function () {
                    console.error('Request timed out');
                    resolve(null);
                }
            });
        });
    }

    function calculateChannelAge(creationDateStr) {
        try {
            const creationDate = new Date(creationDateStr);
            const now = new Date();

            if (!creationDate || isNaN(creationDate.getTime())) {
                return "";
            }

            const years = dateFns.differenceInYears(now, creationDate);
            let tempDate = dateFns.addYears(creationDate, years);

            const months = dateFns.differenceInMonths(now, tempDate);
            tempDate = dateFns.addMonths(tempDate, months);

            const days = dateFns.differenceInDays(now, tempDate);
            tempDate = dateFns.addDays(tempDate, days);

            const hours = dateFns.differenceInHours(now, tempDate);
            tempDate = dateFns.addHours(tempDate, hours);

            const minutes = dateFns.differenceInMinutes(now, tempDate);

            let ageString = "";

            if (years > 0) {
                ageString += `${years}y`;

                if (months > 0) {
                    ageString += ` ${months}m`;
                }
            } else if (months > 0) {
                ageString += `${months}m`;

                if (days > 0) {
                    ageString += ` ${days}d`;
                }
            } else if (days > 0) {
                ageString += `${days}d`;

                if (hours > 0) {
                    ageString += ` ${hours}h`;
                }
            } else if (hours > 0) {
                ageString += `${hours}h`;

                if (minutes > 0) {
                    ageString += ` ${minutes}m`;
                }
            } else if (minutes > 0) {
                ageString += `${minutes}m`;
            } else {
                ageString += "<1m";
            }

            ageString += " ago";
            return ageString;
        } catch (error) {
            console.error('Error calculating channel age:', error);
            return "";
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

    function removeExistingChannelAge() {
        const ageElements = document.querySelectorAll('.channel-age-element');
        ageElements.forEach(el => el.remove());

        const delimiterElements = document.querySelectorAll('.channel-age-delimiter');
        delimiterElements.forEach(el => el.remove());
    }

    function addChannelAge(countryData) {
        if (!countryData || !countryData.channelAge) return;

        removeExistingChannelAge();

        const metadataRows = document.querySelectorAll('.yt-content-metadata-view-model-wiz__metadata-row');
        if (!metadataRows.length) return;

        for (const row of metadataRows) {
            if (row.textContent.includes('video') && !processedChannelAge.has(row)) {
                processedChannelAge.add(row);

                const delimiter = document.createElement('span');
                delimiter.className = 'yt-content-metadata-view-model-wiz__delimiter channel-age-delimiter';
                delimiter.setAttribute('aria-hidden', 'true');
                delimiter.textContent = '•';

                const ageSpan = document.createElement('span');
                ageSpan.className = 'yt-core-attributed-string yt-content-metadata-view-model-wiz__metadata-text yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--link-inherit-color channel-age-element';
                ageSpan.setAttribute('dir', 'auto');
                ageSpan.setAttribute('role', 'text');

                const innerSpan = document.createElement('span');
                innerSpan.setAttribute('dir', 'auto');
                innerSpan.textContent = ` ${countryData.channelAge}`;

                ageSpan.appendChild(innerSpan);

                row.appendChild(delimiter);
                row.appendChild(ageSpan);

                break;
            }
        }
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

                addChannelAge(countryData);
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
        for (const element of shortsChannelElements) {
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
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedAddFlag = debounce(addFlag, 500);

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length || mutation.type === 'childList') {
                debouncedAddFlag();
                break;
            }
        }
    });

    function startObserver() {
        const watchPage = document.querySelector('ytd-watch-flexy');
        const browsePage = document.querySelector('ytd-browse');
        const content = document.querySelector('#content');

        const targetNode = watchPage || browsePage || content || document.body;

        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
    }

    async function init() {
        await new Promise(resolve => setTimeout(resolve, 100));

        processedElements.clear();
        processedChannelAge.clear();
        removeExistingChannelAge();
        startObserver();
        addFlag();

        window.addEventListener('yt-navigate-finish', () => {
            observer.disconnect();
            processedElements.clear();
            processedChannelAge.clear();
            removeExistingChannelAge();
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
