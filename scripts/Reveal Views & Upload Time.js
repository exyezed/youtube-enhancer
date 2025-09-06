// ==UserScript==
// @name         YouTube Enhancer (Reveal Views & Upload Time)
// @description  Reveal Views & Upload Time for videos and Shorts.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.4
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';    
    const badgeStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        
        #secondary-inner .revealViewsAndUploadTime {
            height: 36px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            padding: 0 16px;
            font-family: inherit;
            border: 1px solid transparent;
            margin-bottom: 10px;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
        }

        html[dark] #secondary-inner .revealViewsAndUploadTime {
            background-color: #ffffff1a;
            color: var(--yt-spec-text-primary, #fff);
        }

        html:not([dark]) #secondary-inner .revealViewsAndUploadTime {
            background-color: #0000000d;
            color: var(--yt-spec-text-primary, #030303);
        }

        html[dark] #secondary-inner .revealViewsAndUploadTime:hover {
            background-color: #ffffff33;
        }

        html:not([dark]) #secondary-inner .revealViewsAndUploadTime:hover {
            background-color: #00000014;
        }

        #secondary-inner .revealViewsAndUploadTime .separator {
            margin: 0 2px;
            width: 1px;
            height: 24px;
            opacity: 0.3;
        }

        html[dark] #secondary-inner .revealViewsAndUploadTime .separator {
            background-color: var(--yt-spec-text-secondary, #aaa);
        }

        html:not([dark]) #secondary-inner .revealViewsAndUploadTime .separator {
            background-color: var(--yt-spec-text-secondary, #606060);
        }
            
        .shorts-upload-date-injected {
            color: rgb(255, 255, 255);
            font-family: "Roboto", Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 8px;
            padding: 4px 12px;
            opacity: 0.8;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            backdrop-filter: blur(8px);
            width: fit-content;
            max-width: 90%;
            word-wrap: break-word;
            display: flex;
            align-items: center;
            gap: 6px;
        }
          
        .shorts-upload-date-injected .material-symbols-outlined {
            font-size: 18px;
            opacity: 0.9;
        }

        .shorts-views-injected {
            color: rgb(255, 255, 255);
            font-family: "Roboto", Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 8px;
            padding: 4px 12px;
            opacity: 0.8;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            backdrop-filter: blur(8px);
            width: fit-content;
            max-width: 90%;
            word-wrap: break-word;
            display: flex;
            align-items: center;
            gap: 6px;
        }
          
        .shorts-views-injected .material-symbols-outlined {
            font-size: 18px;
            opacity: 0.9;
        }

        .shorts-age-injected {
            color: rgb(255, 255, 255);
            font-family: "Roboto", Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 8px;
            padding: 4px 12px;
            opacity: 0.8;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            backdrop-filter: blur(8px);
            width: fit-content;
            max-width: 90%;
            word-wrap: break-word;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .shorts-age-injected .material-symbols-outlined {
            font-size: 18px;
            opacity: 0.9;
        }

        .material-symbols-outlined {
            font-size: 24px;
            line-height: 1;
            font-variation-settings:
                'FILL' 0,
                'wght' 150,
                'GRAD' 0,
                'opsz' 24;
        }
    `;

    function createBadge(viewCount, uploadTime, uploadDate) {
        const badge = document.createElement('div');
        badge.className = 'revealViewsAndUploadTime';

        const mainIcon = document.createElement('span');
        mainIcon.className = 'material-symbols-outlined';
        mainIcon.textContent = 'visibility';

        const dataSpan = document.createElement('span');
        dataSpan.textContent = viewCount;

        const separator = document.createElement('div');
        separator.className = 'separator';

        const timeIcon = document.createElement('span');
        timeIcon.className = 'material-symbols-outlined';
        timeIcon.textContent = 'schedule';

        const timeSpan = document.createElement('span');
        timeSpan.textContent = uploadTime;

        badge.appendChild(mainIcon);
        badge.appendChild(dataSpan);
        badge.appendChild(separator);
        badge.appendChild(timeIcon);
        badge.appendChild(timeSpan);

        let isShowingViews = true;
        badge.addEventListener('click', () => {
            if (isShowingViews) {
                mainIcon.textContent = 'calendar_month';
                dataSpan.textContent = uploadDate;
                timeIcon.textContent = 'schedule';
                timeIcon.style.display = '';
            } else {
                mainIcon.textContent = 'visibility';
                dataSpan.textContent = viewCount;
                timeIcon.textContent = 'schedule';
                timeIcon.style.display = '';
            }
            isShowingViews = !isShowingViews;
        });

        return badge;
    }    
    
    function getVideoId() {
        const urlObj = new URL(window.location.href);
        if (urlObj.pathname.includes('/watch')) {
            return urlObj.searchParams.get('v');
        } else if (urlObj.pathname.includes('/video/')) {
            return urlObj.pathname.split('/video/')[1];
        } else if (urlObj.pathname.includes('/shorts/')) {
            return urlObj.pathname.split('/shorts/')[1];
        }
        return null;
    }

    function isOnShortsPage() {
        return window.location.pathname.includes('/shorts/');
    }

    function formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }    
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            const options = {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };
            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
            const [dayName, datePart] = formattedDate.split(', ');
            return `${dayName}, ${datePart.replace(/\//g, '/')}`;
        }
    }    
    
    function formatDateForShorts(dateString) {
        const date = new Date(dateString);
        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
        const formattedTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);
        
        return `${formattedDate} • ${formattedTime}`;
    }

    function formatUploadAge(dateString) {
        const uploadDate = new Date(dateString);
        const now = new Date();
        const diffInMs = now - uploadDate;
        
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);
        
        if (diffInYears > 0) {
            return `${diffInYears}y ago`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths}mo ago`;
        } else if (diffInWeeks > 0) {
            return `${diffInWeeks}w ago`;
        } else if (diffInDays > 0) {
            const remainingHours = diffInHours % 24;
            if (remainingHours > 0) {
                return `${diffInDays}d ${remainingHours}h ago`;
            } else {
                return `${diffInDays}d ago`;
            }
        } else if (diffInHours > 0) {
            const remainingMinutes = diffInMinutes % 60;
            if (remainingMinutes > 0) {
                return `${diffInHours}h ${remainingMinutes}m ago`;
            } else {
                return `${diffInHours}h ago`;
            }
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes}m ago`;
        } else {
            return 'Just now';
        }
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    function getApiKey() {
        const scripts = document.getElementsByTagName('script');
        for (const script of scripts) {
            const match = script.textContent.match(/"INNERTUBE_API_KEY":\s*"([^"]+)"/);
            if (match && match[1]) return match[1];
        }
        return null;
    }

    function getClientInfo() {
        const scripts = document.getElementsByTagName('script');
        let clientName = null;
        let clientVersion = null;
        
        for (const script of scripts) {
            const nameMatch = script.textContent.match(/"INNERTUBE_CLIENT_NAME":\s*"([^"]+)"/);
            const versionMatch = script.textContent.match(/"INNERTUBE_CLIENT_VERSION":\s*"([^"]+)"/);
            
            if (nameMatch && nameMatch[1]) clientName = nameMatch[1];
            if (versionMatch && versionMatch[1]) clientVersion = versionMatch[1];
        }
        
        return { clientName, clientVersion };
    }

    async function fetchVideoInfo(videoId) {
        try {
            const apiKey = getApiKey();
            if (!apiKey) return null;
            
            const { clientName, clientVersion } = getClientInfo();
            if (!clientName || !clientVersion) return null;
            
            const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videoId: videoId,
                    context: {
                        client: {
                            clientName: clientName,
                            clientVersion: clientVersion,
                        }
                    }
                })
            });
            
            if (!response.ok) return null;
            const data = await response.json();
            
            let viewCount = "Unknown";
            if (data.videoDetails?.viewCount) {
                viewCount = formatNumber(data.videoDetails.viewCount);
            }
            
            let publishDate = "Unknown";
            if (data.microformat?.playerMicroformatRenderer?.publishDate) {
                publishDate = data.microformat.playerMicroformatRenderer.publishDate;
            }
            
            return {
                viewCount,
                uploadDate: publishDate
            };
        } catch (error) {
            return null;
        }
    }

    function updateBadge(viewCount, uploadTime, uploadDate) {
        let badge = document.querySelector('.revealViewsAndUploadTime');
        if (badge) {
            badge.remove();
        }
        insertBadge(viewCount, uploadTime, uploadDate);
    }

    function insertBadge(viewCount, uploadTime, uploadDate) {
        const targetElement = document.querySelector('#secondary-inner #panels');
        if (targetElement && !document.querySelector('.revealViewsAndUploadTime')) {
            const badge = createBadge(viewCount, uploadTime, uploadDate);
            targetElement.parentNode.insertBefore(badge, targetElement);
        }
    }    
    
    function addStyles() {
        if (!document.querySelector('#revealViewsAndUploadTime-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'revealViewsAndUploadTime-styles';
            styleElement.textContent = badgeStyles;
            document.head.appendChild(styleElement);
        }
    }

    const state = {
        currentVideoId: null,
        injectionInProgress: false,
        shortsObserver: null,
        lastUrl: location.href,
        wasOnShortsPage: isOnShortsPage()
    };

    const SHORTS_CONFIG = {
        className: 'shorts-upload-date-injected',
        viewsClassName: 'shorts-views-injected',
        ageClassName: 'shorts-age-injected',
        selectors: {
            metapanel: '#metapanel, .ytReelMetapanelViewModelHost, yt-reel-metapanel-view-model'
        }
    };

    const utils = {
        log: (message, type = 'info') => {
            const prefix = '[YouTube Enhancer]';
            console[type](`${prefix} ${message}`);
        },
        
        querySelector: (selectors) => {
            return selectors.split(', ').reduce((found, selector) => {
                return found || document.querySelector(selector.trim());
            }, null);
        },

        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    const createElement = (type, className, iconName, text) => {
        const element = document.createElement('div');
        element.className = className;
        
        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.textContent = iconName;
        
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        
        element.appendChild(icon);
        element.appendChild(textSpan);
        
        return element;
    };

    const createShortsUploadElement = (uploadDate) => createElement('shorts', SHORTS_CONFIG.className, 'calendar_clock', uploadDate);
    const createShortsViewsElement = (viewCount) => createElement('shorts', SHORTS_CONFIG.viewsClassName, 'visibility', viewCount);
    const createShortsAgeElement = (uploadAge) => createElement('shorts', SHORTS_CONFIG.ageClassName, 'schedule', uploadAge);
    const getShortsElements = () => ({
        upload: document.querySelector(`.${SHORTS_CONFIG.className}`),
        views: document.querySelector(`.${SHORTS_CONFIG.viewsClassName}`),
        age: document.querySelector(`.${SHORTS_CONFIG.ageClassName}`)
    });

    const isShortsAlreadyInjected = () => getShortsElements().upload !== null;    const injectShortsUploadDate = async () => {
        const videoId = getVideoId();
        
        if (!videoId) {
            utils.log('No video ID found', 'warn');
            return false;
        }
        
        if (state.injectionInProgress && state.currentVideoId === videoId) {
            utils.log('Injection already in progress for this video');
            return false;
        }
        
        const targetElement = utils.querySelector(SHORTS_CONFIG.selectors.metapanel);
        
        if (!targetElement) {
            utils.log('Target element not found, retrying...', 'warn');
            setTimeout(() => injectShortsUploadDate(), 200);
            return false;
        }

        if (state.currentVideoId === videoId && isShortsAlreadyInjected()) {
            utils.log('Elements already exist for current video');
            return true;
        }
        
        if (state.currentVideoId !== videoId) {
            cleanupShortsElements();
            state.currentVideoId = videoId;
        }
        
        if (!isShortsAlreadyInjected()) {
            const uploadElement = createShortsUploadElement('Loading...');
            const ageElement = createShortsAgeElement('Loading...');
            const viewsElement = createShortsViewsElement('Loading...');
            
            targetElement.insertBefore(uploadElement, targetElement.firstChild);
            targetElement.insertBefore(ageElement, uploadElement.nextSibling);
            targetElement.insertBefore(viewsElement, ageElement.nextSibling);
            
            utils.log('Loading elements created');
        }
        
        state.injectionInProgress = true;

        try {
            const videoInfo = await fetchVideoInfo(videoId);
            const elements = getShortsElements();
            
            if (videoInfo && videoInfo.uploadDate !== "Unknown") {
                if (elements.upload) {
                    const formattedDate = formatDateForShorts(videoInfo.uploadDate);
                    elements.upload.querySelector('span:last-child').textContent = formattedDate;
                }
                
                if (elements.age) {
                    const uploadAge = formatUploadAge(videoInfo.uploadDate);
                    elements.age.querySelector('span:last-child').textContent = uploadAge;
                }
                
                if (elements.views && videoInfo.viewCount && videoInfo.viewCount !== "Unknown") {
                    elements.views.querySelector('span:last-child').textContent = videoInfo.viewCount;
                }
                
                utils.log('Upload date and views successfully updated');
                state.injectionInProgress = false;
                return true;
            } else {
                Object.values(elements).forEach(element => {
                    if (element) element.querySelector('span:last-child').textContent = 'Error';
                });
                
                utils.log('Could not fetch video info', 'warn');
                state.injectionInProgress = false;
                return false;
            }
        } catch (error) {
            const elements = getShortsElements();
            Object.values(elements).forEach(element => {
                if (element) element.querySelector('span:last-child').textContent = 'Error';
            });
            
            utils.log('Error fetching video info: ' + error.message, 'error');
            state.injectionInProgress = false;
            return false;
        }
    };    
    
    const handleShortsMutations = utils.debounce((mutations) => {
        const videoId = getVideoId();
        if (!videoId) return;
        
        let shouldInject = false;
        
        if (state.currentVideoId !== videoId) {
            shouldInject = true;
        } else {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const hasMetapanel = node.matches?.(SHORTS_CONFIG.selectors.metapanel.split(', ')[0]) ||
                                               node.querySelector?.(SHORTS_CONFIG.selectors.metapanel);
                            if (hasMetapanel) shouldInject = true;
                        }
                    });
                }
            });
        }
        
        if (shouldInject) {
            setTimeout(() => injectShortsUploadDate(), 200);
        }
    }, 100);    
    
    const startShortsObserver = () => {
        if (state.shortsObserver) return;
        
        state.shortsObserver = new MutationObserver(handleShortsMutations);
        state.shortsObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false
        });
        
        utils.log('MutationObserver started');
    };

    const stopShortsObserver = () => {
        if (state.shortsObserver) {
            state.shortsObserver.disconnect();
            state.shortsObserver = null;
            utils.log('MutationObserver stopped');
        }
    };

    const cleanupShortsElements = () => {
        const selectors = [
            `.${SHORTS_CONFIG.className}`,
            `.${SHORTS_CONFIG.viewsClassName}`,
            `.${SHORTS_CONFIG.ageClassName}`
        ];
        
        let cleanedCount = 0;
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => element.remove());
            cleanedCount += elements.length;
        });
        
        utils.log(`Cleaned up ${cleanedCount} existing elements`);
        state.currentVideoId = null;
        state.injectionInProgress = false;
    };

    const initShortsFeature = () => {
        utils.log('Starting Shorts Upload Date Feature');
        
        state.injectionInProgress = false;
        state.currentVideoId = null;
        
        cleanupShortsElements();
        setTimeout(() => injectShortsUploadDate(), 300);
        startShortsObserver();
    };

    const stopShortsFeature = () => {
        utils.log('Stopping Shorts Upload Date Feature');
        stopShortsObserver();
        cleanupShortsElements();
    };
    
    async function updateBadgeWithInfo(videoId) {
        updateBadge('Loading...', 'Loading...', 'Loading...');
        
        try {
            const videoInfo = await fetchVideoInfo(videoId);
            if (videoInfo) {
                const uploadTime = formatTime(videoInfo.uploadDate);
                const formattedUploadDate = formatDate(videoInfo.uploadDate);
                updateBadge(videoInfo.viewCount, uploadTime, formattedUploadDate);
            } else {
                updateBadge('Error', 'Error', 'Error');
            }
        } catch (error) {
            updateBadge('Error', 'Error', 'Error');
        }
    }
    
    function init() {
        addStyles();
        
        if (isOnShortsPage()) {
            initShortsFeature();
        } else {
            const videoId = getVideoId();
            if (videoId) {
                updateBadgeWithInfo(videoId);
            } else {
                updateBadge('N/A', 'N/A', 'N/A');
            }
        }
    }        
    
    function observePageChanges() {
        let lastVideoId = getVideoId();

        const observer = new MutationObserver(() => {
            if (location.href !== state.lastUrl) {
                state.lastUrl = location.href;
                const currentVideoId = getVideoId();
                const isCurrentlyOnShortsPage = isOnShortsPage();
                
                if (state.wasOnShortsPage !== isCurrentlyOnShortsPage) {
                    if (state.wasOnShortsPage) {
                        stopShortsFeature();
                    } else {
                        updateBadge('', '', '');
                    }
                    state.wasOnShortsPage = isCurrentlyOnShortsPage;
                    lastVideoId = null;
                }
                
                if (isCurrentlyOnShortsPage) {
                    if (currentVideoId && currentVideoId !== lastVideoId) {
                        lastVideoId = currentVideoId;
                        state.injectionInProgress = false;
                        setTimeout(() => injectShortsUploadDate(), 300);
                    }
                } else {
                    if (currentVideoId && currentVideoId !== lastVideoId) {
                        lastVideoId = currentVideoId;
                        updateBadgeWithInfo(currentVideoId);
                    } else if (!currentVideoId) {
                        updateBadge('Not a video', 'Not a video', 'Not a video');
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            observePageChanges();
        });
    } else {
        init();
        observePageChanges();
    }    
    
    window.addEventListener('yt-navigate-start', function() {
        if (isOnShortsPage()) {
            cleanupShortsElements();
        } else {
            updateBadge('Loading...', 'Loading...', 'Loading...');
        }
    });    
    
    window.addEventListener('yt-navigate-finish', function() {
        setTimeout(() => {
            if (isOnShortsPage()) {
                state.injectionInProgress = false;
                setTimeout(() => injectShortsUploadDate(), 300);
            } else {
                const videoId = getVideoId();
                if (videoId) {
                    updateBadgeWithInfo(videoId);
                } else {
                    updateBadge('Not a video', 'Not a video', 'Not a video');
                }
            }
        }, 100);
    });
})();
