// ==UserScript==
// @name         YouTube Enhancer (Reveal Country Flag)
// @description  Reveal Country Flag.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      2.0
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    /* ----------------------------- CONFIG -------------------------------- */

    const FLAG_CONFIG = {
        BASE_URL: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/flags/4x3/',
        SIZES: { channel: '28px', video: '22px', shorts: '20px' },
        MARGINS: { channel: '12px', video: '10px', shorts: '8px' }
    };

    const CACHE_CONFIG = {
        PREFIX: 'yt_enhancer_',
        EXPIRATION: 7 * 24 * 60 * 60 * 1000
    };

    /* ------------------------ STATE (GLOBAL REFS) ------------------------- */

    const processedElements = new Set();
    let channelAgeEl = null;

    /* ---------------------------- UTILITIES ------------------------------- */

    function getCacheKey(type, id) {
        return `${CACHE_CONFIG.PREFIX}${type}_${id}`;
    }

    function getFromCache(type, id) {
        try {
            const cacheKey = getCacheKey(type, id);
            const cachedData = GM_getValue(cacheKey);
            if (!cachedData) return null;
            const { value, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp > CACHE_CONFIG.EXPIRATION) {
                GM_setValue(cacheKey, null);
                return null;
            }
            return value;
        } catch {
            return null;
        }
    }

    function setToCache(type, id, value) {
        const cacheKey = getCacheKey(type, id);
        GM_setValue(cacheKey, JSON.stringify({ value, timestamp: Date.now() }));
    }

    function waitFor(checkFn, { timeout = 6000, interval = 120 } = {}) {
        return new Promise(resolve => {
            const start = performance.now();
            const tick = () => {
                try {
                    if (checkFn()) return resolve(true);
                } catch {}
                if (performance.now() - start >= timeout) return resolve(false);
                setTimeout(tick, interval);
            };
            tick();
        });
    }

    /* --------------------------- DATA FETCHING ---------------------------- */

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
                url,
                onload: function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        try {
                            const data = JSON.parse(response.responseText);
                            const countryData = {
                                code: (data.country || '').toLowerCase(),
                                name: data.countryName || '',
                                creationDate: data.creationDate || '',
                                channelAge: data.creationDate
                                    ? calculateChannelAge(data.creationDate)
                                    : (data.channelAge || '')
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

    /* ---------------------- CHANNEL AGE (NO DEPENDENCY) ------------------- */

    function calculateChannelAge(creationDateStr) {
        try {
            const creationDate = new Date(creationDateStr);
            const now = new Date();
            if (isNaN(creationDate.getTime())) return "";

            let temp = new Date(creationDate);
            let years = 0, months = 0, days = 0, hours = 0, minutes = 0;

            const add = (d, { y = 0, m = 0, dd = 0, hh = 0, mm = 0 } = {}) => {
                const nd = new Date(d);
                if (y) nd.setFullYear(nd.getFullYear() + y);
                if (m) nd.setMonth(nd.getMonth() + m);
                if (dd) nd.setDate(nd.getDate() + dd);
                if (hh) nd.setHours(nd.getHours() + hh);
                if (mm) nd.setMinutes(nd.getMinutes() + mm);
                return nd;
            };

            while (add(temp, { y: 1 }) <= now) { temp = add(temp, { y: 1 }); years++; }
            while (add(temp, { m: 1 }) <= now) { temp = add(temp, { m: 1 }); months++; }
            while (add(temp, { dd: 1 }) <= now) { temp = add(temp, { dd: 1 }); days++; }
            while (add(temp, { hh: 1 }) <= now) { temp = add(temp, { hh: 1 }); hours++; }
            while (add(temp, { mm: 1 }) <= now) { temp = add(temp, { mm: 1 }); minutes++; }

            let ageString = "";

            if (years > 0) {
                ageString += `${years}y`;
                if (months > 0) ageString += ` ${months}m`;
            } else if (months > 0) {
                ageString += `${months}m`;
                if (days > 0) ageString += ` ${days}d`;
            } else if (days > 0) {
                ageString += `${days}d`;
                if (hours > 0) ageString += ` ${hours}h`;
            } else if (hours > 0) {
                ageString += `${hours}h`;
                if (minutes > 0) ageString += ` ${minutes}m`;
            } else if (minutes > 0) {
                ageString += `${minutes}m`;
            } else {
                ageString += "<1m";
            }

            return ageString + " ago";
        } catch (error) {
            console.error('Error calculating channel age:', error);
            return "";
        }
    }

    /* --------------------------- DOM HELPERS ------------------------------ */

    function createFlag(size, margin, className, countryData) {
        const flag = document.createElement('img');
        flag.src = `${FLAG_CONFIG.BASE_URL}${countryData.code}.svg`;
        flag.className = `country-flag ${className}`;
        flag.style.width = size;
        flag.style.height = 'auto';
        flag.style.marginLeft = margin;
        flag.style.verticalAlign = 'middle';
        flag.style.cursor = 'pointer';
        flag.title = countryData.name || '';
        return flag;
    }

    function removeExistingFlags(element) {
        element.querySelectorAll('.country-flag').forEach(flag => flag.remove());
    }

    function removeExistingChannelAge() {
        document.querySelectorAll('.channel-age-element').forEach(el => el.remove());
        document.querySelectorAll('.channel-age-delimiter').forEach(el => el.remove());
        channelAgeEl = null;
    }

    function findMetadataRows() {
        let rows = document.querySelectorAll('.yt-content-metadata-view-model__metadata-row');
        if (rows && rows.length) return rows;
        rows = document.querySelectorAll('.yt-content-metadata-view-model-wiz__metadata-row');
        return rows || [];
    }

    function getPreferredMetadataRow(rows) {
        for (const r of rows) {
            if (r.querySelector('a[href*="/videos"]')) return r;
        }
        const byWord = Array.from(rows).find(r =>
            (r.textContent || '').toLowerCase().includes('video')
        );
        if (byWord) return byWord;

        return rows[0];
    }

    async function waitForMetadataRowReady() {
        const ok = await waitFor(() => {
            const rows = findMetadataRows();
            if (!rows.length) return false;
            const target = getPreferredMetadataRow(rows);
            if (!target) return false;

            const hasOriginal = Array
                .from(target.children)
                .some(ch => !ch.classList?.contains('channel-age-element') && !ch.classList?.contains('channel-age-delimiter'));
            return hasOriginal;
        }, { timeout: 8000, interval: 150 });

        if (!ok) return null;
        const rows = findMetadataRows();
        return getPreferredMetadataRow(rows);
    }

    async function ensureChannelAgePlaceholder() {
        const targetRow = await waitForMetadataRowReady();
        if (!targetRow) return null;

        const all = document.querySelectorAll('.channel-age-element');
        if (all.length > 1) {
            for (let i = 0; i < all.length - 1; i++) all[i].remove();
        }

        let ageSpan = targetRow.querySelector('.channel-age-element');
        if (!ageSpan) {
            const isNew = targetRow.classList.contains('yt-content-metadata-view-model__metadata-row');

            const delimiter = document.createElement('span');
            delimiter.className = (isNew
                ? 'yt-content-metadata-view-model__delimiter'
                : 'yt-content-metadata-view-model-wiz__delimiter') + ' channel-age-delimiter';
            delimiter.setAttribute('aria-hidden', 'true');
            delimiter.textContent = '•';

            ageSpan = document.createElement('span');
            ageSpan.className = (isNew
                ? 'yt-core-attributed-string yt-content-metadata-view-model__metadata-text yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--link-inherit-color'
                : 'yt-core-attributed-string yt-content-metadata-view-model-wiz__metadata-text yt-core-attributed-string--white-space-pre-wrap yt-core-attributed-string--link-inherit-color'
            ) + ' channel-age-element';
            ageSpan.setAttribute('dir', 'auto');
            ageSpan.setAttribute('role', 'text');

            const inner = document.createElement('span');
            inner.setAttribute('dir', 'auto');
            inner.textContent = ' Calculating...';

            ageSpan.appendChild(inner);
            targetRow.appendChild(delimiter);
            targetRow.appendChild(ageSpan);
        }

        channelAgeEl = ageSpan;
        return ageSpan;
    }

    function setChannelAgeText(text) {
        const el = channelAgeEl || document.querySelector('.channel-age-element');
        if (!el) return;
        const inner = el.querySelector('span[dir="auto"]') || el;
        inner.textContent = ' ' + (text && text.trim() ? text : '—');
    }

    async function addChannelAge(countryData) {
        if (!channelAgeEl) await ensureChannelAgePlaceholder();
        if (!countryData) {
            setChannelAgeText('—');
            return;
        }
        setChannelAgeText(countryData.channelAge || '—');
    }

    /* ---------------------------- MAIN ACTION ----------------------------- */

    async function addFlag() {
        let channelElement = document.querySelector('h1.dynamicTextViewModelH1 > span.yt-core-attributed-string')
            || document.querySelector('#channel-name #text')
            || document.querySelector('yt-formatted-string.style-scope.ytd-channel-name');

        if (channelElement && !processedElements.has(channelElement)) {
            removeExistingFlags(channelElement.parentElement || channelElement);
            processedElements.add(channelElement);

            let channelId = null;
            const channelUrl = window.location.pathname;
            if (channelUrl.includes('@')) {
                channelId = channelUrl.split('@')[1].split('/')[0];
            } else if (channelUrl.includes('/channel/')) {
                channelId = channelUrl.split('/channel/')[1].split('/')[0];
            }
            if (!channelId) {
                const canonicalLink = document.querySelector('link[rel="canonical"]');
                if (canonicalLink && canonicalLink.href.includes('/channel/')) {
                    channelId = canonicalLink.href.split('/channel/')[1].split('/')[0];
                }
            }

            if (channelId) {
                await ensureChannelAgePlaceholder();

                const countryData = await getCountryData('channel', channelId);

                if (countryData && countryData.code) {
                    channelElement.appendChild(
                        createFlag(FLAG_CONFIG.SIZES.channel, FLAG_CONFIG.MARGINS.channel, 'channel-flag', countryData)
                    );
                }

                await addChannelAge(countryData);
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
                    if (countryData && countryData.code) {
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
                if (countryData && countryData.code) {
                    element.appendChild(
                        createFlag(FLAG_CONFIG.SIZES.shorts, FLAG_CONFIG.MARGINS.shorts, 'shorts-flag', countryData)
                    );
                }
            }
        }
    }

    /* ------------------------------ OBSERVER ------------------------------ */

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

        observer.observe(targetNode, { childList: true, subtree: true });
    }

    /* ------------------------------- INIT -------------------------------- */

    async function init() {
        await new Promise(resolve => setTimeout(resolve, 120));

        processedElements.clear();
        removeExistingChannelAge();

        startObserver();
        addFlag();

        window.addEventListener('yt-navigate-finish', () => {
            observer.disconnect();
            processedElements.clear();
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
