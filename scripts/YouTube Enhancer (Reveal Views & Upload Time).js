// ==UserScript==
// @name         YouTube Enhancer (Reveal Views & Upload Time)
// @description  Reveal Views & Upload Time.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.2
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

        .revealViewsAndUploadTime-shorts {
            height: 48px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 36px;
            padding: 0 16px;
            font-family: inherit;
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .revealViewsAndUploadTime-shorts .separator {
            margin: 0 2px;
            width: 1px;
            height: 36px;
            opacity: 0.3;
            background-color: #fff;
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

    function createBadge(viewCount, uploadTime, uploadDate, isShorts = false) {
        if (isShorts) {
            const badge = document.createElement('div');
            badge.className = 'revealViewsAndUploadTime-shorts';
    
            const viewIcon = document.createElement('span');
            viewIcon.className = 'material-symbols-outlined';
            viewIcon.textContent = 'visibility';
    
            const viewSpan = document.createElement('span');
            viewSpan.textContent = viewCount;
    
            const separator1 = document.createElement('div');
            separator1.className = 'separator';
    
            const dateIcon = document.createElement('span');
            dateIcon.className = 'material-symbols-outlined';
            dateIcon.textContent = 'calendar_month';
    
            const dateSpan = document.createElement('span');
            dateSpan.textContent = uploadDate;
    
            const separator2 = document.createElement('div');
            separator2.className = 'separator';
    
            const timeIcon = document.createElement('span');
            timeIcon.className = 'material-symbols-outlined';
            timeIcon.textContent = 'schedule';
    
            const timeSpan = document.createElement('span');
            timeSpan.textContent = uploadTime;
    
            badge.appendChild(viewIcon);
            badge.appendChild(viewSpan);
            badge.appendChild(separator1);
            badge.appendChild(dateIcon);
            badge.appendChild(dateSpan);
            badge.appendChild(separator2);
            badge.appendChild(timeIcon);
            badge.appendChild(timeSpan);
    
            return badge;
        } else {
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

    function updateBadge(viewCount, uploadTime, uploadDate, isShorts = false) {
        let badge = document.querySelector(isShorts ? '.revealViewsAndUploadTime-shorts' : '.revealViewsAndUploadTime');
        if (badge) {
            badge.remove();
        }
        insertBadge(viewCount, uploadTime, uploadDate, isShorts);
    }

    function insertBadge(viewCount, uploadTime, uploadDate, isShorts = false) {
        if (isShorts) {
            const target = document.querySelector('ytd-reel-video-renderer[is-active]');
            if (target && !document.querySelector('.revealViewsAndUploadTime-shorts')) {
                const badge = createBadge(viewCount, uploadTime, uploadDate, isShorts);
                target.appendChild(badge);
            }
        } else {
            const targetElement = document.querySelector('#secondary-inner #panels');
            if (targetElement && !document.querySelector('.revealViewsAndUploadTime')) {
                const badge = createBadge(viewCount, uploadTime, uploadDate, isShorts);
                targetElement.parentNode.insertBefore(badge, targetElement);
            }
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

    async function updateBadgeWithInfo(videoId, isShorts = false) {
        updateBadge('Loading...', 'Loading...', 'Loading...', isShorts);
        try {
            const videoInfo = await fetchVideoInfo(videoId);
            if (videoInfo) {
                const uploadTime = formatTime(videoInfo.uploadDate);
                const formattedUploadDate = formatDate(videoInfo.uploadDate);
                updateBadge(videoInfo.viewCount, uploadTime, formattedUploadDate, isShorts);
            } else {
                updateBadge('Error', 'Error', 'Error', isShorts);
            }
        } catch (error) {
            updateBadge('Error', 'Error', 'Error', isShorts);
        }
    }

    function init() {
        addStyles();
        const videoId = getVideoId();
        const isShorts = window.location.pathname.startsWith('/shorts/');
        if (videoId) {
            updateBadgeWithInfo(videoId, isShorts);
        } else {
            updateBadge('N/A', 'N/A', 'N/A', isShorts);
        }
    }

    function observePageChanges() {
        let lastVideoId = getVideoId();
        let lastUrl = location.href;

        const observer = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                const isShorts = window.location.pathname.startsWith('/shorts/');
                const currentVideoId = getVideoId();
                if (currentVideoId && currentVideoId !== lastVideoId) {
                    lastVideoId = currentVideoId;
                    updateBadgeWithInfo(currentVideoId, isShorts);
                } else if (!currentVideoId) {
                    updateBadge('Not a video', 'Not a video', 'Not a video', isShorts);
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
        const isShorts = window.location.pathname.startsWith('/shorts/');
        updateBadge('Loading...', 'Loading...', 'Loading...', isShorts);
    });

    window.addEventListener('yt-navigate-finish', function() {
        const isShorts = window.location.pathname.startsWith('/shorts/');
        const videoId = getVideoId();
        if (videoId) {
            updateBadgeWithInfo(videoId, isShorts);
        } else {
            updateBadge('Not a video', 'Not a video', 'Not a video', isShorts);
        }
    });
})();