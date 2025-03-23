// ==UserScript==
// @name         YouTube Enhancer (Thumbnail Preview)
// @description  View Original Avatar, Banner, Video and Shorts Thumbnails.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.5
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    let GM_addStyle;
    if (typeof GM_addStyle === 'undefined') {
        GM_addStyle = function(css) {
            let style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    let GM_openInTab;
    if (typeof GM_openInTab === 'undefined') {
        GM_openInTab = function(url) {
            window.open(url, '_blank');
        }
    }

    GM_addStyle(`
        .thumbnailPreview-button {
            position: absolute;
            bottom: 10px;
            left: 5px;
            background-color: rgba(0, 0, 0, 0.75);
            color: white;
            border: none;
            border-radius: 3px;
            padding: 3px;
            font-size: 18px;
            cursor: pointer;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .thumbnailPreview-container {
            position: relative;
        }
        .thumbnailPreview-container:hover .thumbnailPreview-button {
            opacity: 1;
        }
        #thumbnailPreview-custom-image {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
            box-sizing: border-box;
            border-radius: 10px;
            cursor: pointer;
        }
        .thumbnailShortsPreview {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 2000;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            padding: 0;
            transition: background-color 0.3s ease;
        }
        .thumbnailShortsPreview:hover {
            background-color: rgba(0, 0, 0, 0.75) !important;
        }
        .youtube-enhancer-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
        }
        .youtube-enhancer-icon svg {
            width: 100%;
            height: 100%;
        }
    `);

    function createSVGElement(pathD) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "1em");
        svg.setAttribute("height", "1em");
        svg.setAttribute("viewBox", "0 0 24 24");
        
        path.setAttribute("fill", "currentColor");
        path.setAttribute("d", pathD);
        
        svg.appendChild(path);
        return svg;
    }

    function openImageInNewTab(url) {
        if (!url) return;
        
        try {
            if (typeof GM_openInTab !== 'undefined') {
                GM_openInTab(url, { active: true, insert: true, setParent: true });
            } else {
                const newWindow = window.open(url, '_blank');
                if (newWindow) {
                    newWindow.focus();
                }
            }
        } catch (e) {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
            }, 100);
        }
    }

    const defaultIconPath = "M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4";
    const hoverIconPath = "M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4l2 3l3-4l4 5z";

    let thumbnailPreviewCurrentVideoId = '';
    let thumbnailInsertionAttempts = 0;
    const MAX_ATTEMPTS = 10;
    const RETRY_DELAY = 500;

    function isWatchPage() {
        const url = new URL(window.location.href);
        return url.pathname === '/watch' && (
            url.searchParams.has('v') || 
            url.searchParams.has('list') || 
            url.searchParams.has('start_radio')
        );
    }

    function addButtonToElement(element, getFullSizeUrl) {
        if (!element.closest('.thumbnailPreview-container')) {
            const container = document.createElement('div');
            container.className = 'thumbnailPreview-container';
            element.parentNode.insertBefore(container, element);
            container.appendChild(element);

            const button = document.createElement('button');
            button.className = 'thumbnailPreview-button';
            
            const defaultIcon = createSVGElement(defaultIconPath);
            button.appendChild(defaultIcon);
            
            button.addEventListener('mouseenter', () => {
                button.textContent = '';
                button.appendChild(createSVGElement(hoverIconPath));
            });
            
            button.addEventListener('mouseleave', () => {
                button.textContent = '';
                button.appendChild(createSVGElement(defaultIconPath));
            });
            
            button.addEventListener('click', function(e) {
                if (e.stopPropagation) e.stopPropagation();
                if (e.preventDefault) e.preventDefault();
                e.cancelBubble = true;
                
                const url = getFullSizeUrl(element.src);
                if (url) {
                    openImageInNewTab(url);
                }
                return false;
            }, true);
            
            container.appendChild(button);
        }
    }

    function processAvatars() {
        const avatars = document.querySelectorAll('yt-avatar-shape img, yt-img-shadow#avatar img');
        avatars.forEach(img => {
            if (!img.closest('.thumbnailPreview-container')) {
                addButtonToElement(img, (src) => src.replace(/=s\d+-c-k-c0x00ffffff-no-rj.*/, '=s0'));
                
                if (isWatchPage()) {
                    const button = img.closest('.thumbnailPreview-container').querySelector('.thumbnailPreview-button');
                    if (button) {
                        button.style.display = 'none';
                    }
                }
            }
        });
    }

    function processChannelBanners() {
        const banners = document.querySelectorAll('yt-image-banner-view-model img');
        banners.forEach(img => {
            if (!img.closest('.thumbnailPreview-container')) {
                addButtonToElement(img, (src) => src.replace(/=w\d+-.*/, '=s0'));
            }
        });
    }

    function processVideoThumbnails() {
        const thumbnails = document.querySelectorAll('ytd-thumbnail img, ytd-playlist-thumbnail img');
        thumbnails.forEach(img => {
            if (!img.closest('.thumbnailPreview-container')) {
                addButtonToElement(img, (src) => {
                    const videoId = src.match(/\/vi\/([^\/]+)/);
                    if (videoId && videoId[1]) {
                        return `https://i.ytimg.com/vi/${videoId[1]}/maxresdefault.jpg`;
                    }
                    return src;
                });
            }
        });
    }

    function addOrUpdateThumbnailImage() {
        const newVideoId = new URLSearchParams(window.location.search).get('v');
        
        if (!newVideoId || newVideoId === thumbnailPreviewCurrentVideoId) {
            return;
        }

        thumbnailPreviewCurrentVideoId = newVideoId;

        function attemptInsertion() {
            const targetElement = document.querySelector('#secondary-inner #panels');
            const existingImg = document.getElementById('thumbnailPreview-custom-image');
            
            if (existingImg) {
                existingImg.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;
                thumbnailInsertionAttempts = 0;
                return;
            }

            if (!targetElement) {
                thumbnailInsertionAttempts++;
                if (thumbnailInsertionAttempts < MAX_ATTEMPTS) {
                    setTimeout(attemptInsertion, RETRY_DELAY);
                } else {
                    thumbnailInsertionAttempts = 0;
                }
                return;
            }

            const img = document.createElement('img');
            img.id = 'thumbnailPreview-custom-image';
            img.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;
            
            img.addEventListener('click', function(e) {
                if (e.stopPropagation) e.stopPropagation();
                if (e.preventDefault) e.preventDefault();
                e.cancelBubble = true;
                
                const maxResUrl = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/maxresdefault.jpg`;
                openImageInNewTab(maxResUrl);
                return false;
            }, true);

            targetElement.parentNode.insertBefore(img, targetElement);
            thumbnailInsertionAttempts = 0;
        }

        attemptInsertion();
    }

    function getVideoIdFromShorts(href) {
        const match = href.match(/\/shorts\/([^/?]+)/);
        return match ? match[1] : null;
    }

    function findShortsContainers() {
        let containers = [];
        
        const reelItems = document.querySelectorAll('ytd-reel-item-renderer');
        if (reelItems.length > 0) {
            containers = Array.from(reelItems);
        } else {
            const shortsLockup = document.querySelectorAll('ytm-shorts-lockup-view-model.ShortsLockupViewModelHost');
            if (shortsLockup.length > 0) {
                containers = Array.from(shortsLockup);
            } else {
                const gridVideos = document.querySelectorAll('ytd-grid-video-renderer');
                containers = Array.from(gridVideos).filter(container => {
                    const link = container.querySelector('a[href*="/shorts/"]');
                    return link !== null;
                });
                
                if (containers.length === 0) {
                    const richItems = document.querySelectorAll('ytd-rich-item-renderer');
                    containers = Array.from(richItems).filter(container => {
                        const link = container.querySelector('a[href*="/shorts/"]');
                        return link !== null;
                    });
                }
            }
        }
        
        return containers;
    }

    function addShortsThumbnailButton(container) {
        if (container.querySelector('.thumbnailShortsPreview') || container.dataset.shortsButtonAdded === 'true') {
            return;
        }
        
        let linkElement = container.querySelector('a[href*="/shorts/"]');
        
        if (!linkElement && container.tagName === 'A' && container.href && container.href.includes('/shorts/')) {
            linkElement = container;
        }
        
        if (!linkElement) {
            return;
        }
        
        const videoId = getVideoIdFromShorts(linkElement.href);
        if (!videoId) {
            return;
        }

        let thumbnailContainer = container.querySelector('#thumbnail');
        
        if (!thumbnailContainer) {
            thumbnailContainer = container.querySelector('.thumbnail');
        }
        
        if (!thumbnailContainer) {
            thumbnailContainer = container;
        }

        const button = document.createElement('button');
        button.className = 'thumbnailShortsPreview';
        button.title = 'View original thumbnail';
        
        const iconContainer = document.createElement('span');
        iconContainer.className = 'youtube-enhancer-icon';
        
        const defaultIcon = createSVGElement(defaultIconPath);
        iconContainer.appendChild(defaultIcon);
        
        button.appendChild(iconContainer);
        
        button.addEventListener('mouseenter', () => {
            iconContainer.removeChild(iconContainer.firstChild);
            iconContainer.appendChild(createSVGElement(hoverIconPath));
        });

        button.addEventListener('mouseleave', () => {
            iconContainer.removeChild(iconContainer.firstChild);
            iconContainer.appendChild(createSVGElement(defaultIconPath));
        });

        button.addEventListener('click', function(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            e.cancelBubble = true;
            
            const url = `https://i.ytimg.com/vi/${videoId}/oardefault.jpg`;
            openImageInNewTab(url);
            return false;
        }, true);

        thumbnailContainer.style.position = 'relative';
        thumbnailContainer.appendChild(button);
        container.dataset.shortsButtonAdded = 'true';
    }

    function observePageChanges() {
        const contentObserver = new MutationObserver((mutations) => {
            let shouldProcessRegular = false;
            let shouldProcessShorts = false;
            
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    shouldProcessRegular = true;
                    shouldProcessShorts = true;
                }
            });
            
            if (shouldProcessRegular) {
                processAvatars();
                processChannelBanners();
                processVideoThumbnails();
            }
            
            if (shouldProcessShorts) {
                const shortsContainers = findShortsContainers();
                shortsContainers.forEach(addShortsThumbnailButton);
            }
        });

        const panelObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && 
                    (mutation.target.id === 'secondary' || 
                     mutation.target.id === 'secondary-inner')) {
                    addOrUpdateThumbnailImage();
                }
            }
        });

        contentObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        const observeSecondary = () => {
            const secondary = document.getElementById('secondary');
            if (secondary) {
                panelObserver.observe(secondary, {
                    childList: true,
                    subtree: true
                });
            } else {
                setTimeout(observeSecondary, 1000);
            }
        };
        
        observeSecondary();
    }

    function initialize() {
        processAvatars();
        processChannelBanners();
        processVideoThumbnails();
        addOrUpdateThumbnailImage();
        
        const shortsContainers = findShortsContainers();
        shortsContainers.forEach(addShortsThumbnailButton);
        
        observePageChanges();
        
        window.addEventListener('yt-navigate-finish', () => {
            addOrUpdateThumbnailImage();
            
            setTimeout(() => {
                const shortsContainers = findShortsContainers();
                shortsContainers.forEach(addShortsThumbnailButton);
            }, 1000);
        });
        
        setInterval(() => {
            const shortsContainers = findShortsContainers();
            shortsContainers.forEach(addShortsThumbnailButton);
        }, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();