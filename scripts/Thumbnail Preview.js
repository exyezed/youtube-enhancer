// ==UserScript==
// @name         YouTube Enhancer (Thumbnail Preview)
// @description  View Original Avatar, Banner, Video and Shorts Thumbnails.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.7
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @match        https://m.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function extractVideoId(thumbnailSrc) {
        const match = thumbnailSrc.match(/\/vi\/([^\/]+)\//);
        return match ? match[1] : null;
    }

    function extractShortsId(href) {
        const match = href.match(/\/shorts\/([^\/\?]+)/);
        return match ? match[1] : null;
    }

    async function checkImageExists(url) {
        try { 
            const corsTest = await fetch(url, { method: 'HEAD' }).catch(() => null);
            
            if (corsTest) {
                return corsTest.ok;
            } else {
                return true;
            }
            
        } catch (error) {
            return new Promise((resolve) => {
                const img = document.createElement('img');
                img.style.display = 'none';
                
                const timeout = setTimeout(() => {
                    document.body.removeChild(img);
                    resolve(false);
                }, 2000);
                
                img.onload = () => {
                    clearTimeout(timeout);
                    document.body.removeChild(img);
                    resolve(true);
                };
                
                img.onerror = () => {
                    clearTimeout(timeout);
                    document.body.removeChild(img);
                    resolve(false);
                };
                
                document.body.appendChild(img);
                img.src = url;
            });
        }
    }

    function createSpinner() {
        const spinner = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        spinner.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        spinner.setAttribute('width', '16');
        spinner.setAttribute('height', '16');
        spinner.setAttribute('viewBox', '0 0 24 24');
        spinner.setAttribute('fill', 'none');
        spinner.setAttribute('stroke', 'white');
        spinner.setAttribute('stroke-width', '2');
        spinner.setAttribute('stroke-linecap', 'round');
        spinner.setAttribute('stroke-linejoin', 'round');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M21 12a9 9 0 1 1-6.219-8.56');
        spinner.appendChild(path);
        
        spinner.style.animation = 'spin 1s linear infinite';
        
        if (!document.querySelector('#spinner-keyframes')) {
            const style = document.createElement('style');
            style.id = 'spinner-keyframes';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        return spinner;
    }

    async function openThumbnail(videoId, isShorts, overlayElement) {
        if (isShorts) {
            const originalSvg = overlayElement.querySelector('svg');
            const spinner = createSpinner();
            overlayElement.replaceChild(spinner, originalSvg);
            
            try {
                const oardefaultUrl = `https://i.ytimg.com/vi/${videoId}/oardefault.jpg`;
                const isOarDefaultAvailable = await checkImageExists(oardefaultUrl);
                
                if (isOarDefaultAvailable) {
                    window.open(oardefaultUrl, '_blank');
                } else {
                    window.open(`https://i.ytimg.com/vi/${videoId}/oar2.jpg`, '_blank');
                }
            } finally {
                overlayElement.replaceChild(originalSvg, spinner);
            }
        } else {
            window.open(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`, '_blank');
        }
    }

    let thumbnailPreviewCurrentVideoId = "";
    let thumbnailPreviewClosed = false;
    let thumbnailInsertionAttempts = 0;
    const MAX_ATTEMPTS = 10;
    const RETRY_DELAY = 500;

    function isWatchPage() {
        const url = new URL(window.location.href);
        return url.pathname === "/watch" && url.searchParams.has("v");
    }

    function addOrUpdateThumbnailImage() {
        if (!isWatchPage()) return;

        const newVideoId = new URLSearchParams(window.location.search).get("v");

        if (newVideoId !== thumbnailPreviewCurrentVideoId) {
            thumbnailPreviewClosed = false;
        }

        if (!newVideoId || newVideoId === thumbnailPreviewCurrentVideoId || thumbnailPreviewClosed) {
            return;
        }

        thumbnailPreviewCurrentVideoId = newVideoId;

        function attemptInsertion() {
            const targetElement = document.querySelector("#secondary-inner #panels");
            const existingContainer = document.getElementById("thumbnailPreview-custom-container");

            if (existingContainer) {
                const existingImg = existingContainer.querySelector("img");
                if (existingImg) {
                    existingImg.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;
                }
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

            const container = document.createElement("div");
            container.id = "thumbnailPreview-custom-container";
            container.style.cssText = `
                position: relative;
                width: 100%;
                margin-bottom: 10px;
                box-sizing: border-box;
            `;

            const img = document.createElement("img");
            img.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;
            img.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 10px;
                cursor: pointer;
                display: block;
            `;

            img.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                const maxResUrl = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/maxresdefault.jpg`;
                window.open(maxResUrl, '_blank');
            });

            const closeButton = document.createElement("div");
            closeButton.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 1001;
                transition: all 0.2s ease;
            `;

            const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            closeSvg.setAttribute('width', '20');
            closeSvg.setAttribute('height', '20');
            closeSvg.setAttribute('viewBox', '0 0 24 24');
            closeSvg.setAttribute('fill', 'none');
            closeSvg.setAttribute('stroke', 'currentColor');
            closeSvg.setAttribute('stroke-width', '2');
            closeSvg.setAttribute('stroke-linecap', 'round');
            closeSvg.setAttribute('stroke-linejoin', 'round');

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '12');
            circle.setAttribute('cy', '12');
            circle.setAttribute('r', '10');
            closeSvg.appendChild(circle);

            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttribute('d', 'm15 9-6 6');
            closeSvg.appendChild(path1);

            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', 'm9 9 6 6');
            closeSvg.appendChild(path2);

            closeButton.appendChild(closeSvg);

            closeButton.onmouseenter = () => closeSvg.style.stroke = '#f50057';
            closeButton.onmouseleave = () => closeSvg.style.stroke = 'currentColor';
            
            closeButton.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                thumbnailPreviewClosed = true;
                container.remove();
            });

            container.appendChild(img);
            container.appendChild(closeButton);
            targetElement.parentNode.insertBefore(container, targetElement);
            thumbnailInsertionAttempts = 0;
        }

        attemptInsertion();
    }

    function createThumbnailOverlay(videoId, container) {
        const overlay = document.createElement('div');
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'white');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.transition = 'stroke 0.2s ease';
        
        const mainRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        mainRect.setAttribute('width', '18');
        mainRect.setAttribute('height', '18');
        mainRect.setAttribute('x', '3');
        mainRect.setAttribute('y', '3');
        mainRect.setAttribute('rx', '2');
        mainRect.setAttribute('ry', '2');
        svg.appendChild(mainRect);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '9');
        circle.setAttribute('cy', '9');
        circle.setAttribute('r', '2');
        svg.appendChild(circle);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21');
        svg.appendChild(path);
        
        overlay.appendChild(svg);
        
        overlay.style.cssText = `
            position: absolute;
            bottom: 8px;
            left: 8px;
            background: rgba(0, 0, 0, 0.7);
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1000;
            transition: background 0.2s ease;
        `;
        
        overlay.onmouseenter = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            svg.style.stroke = '#f50057';
        };
        overlay.onmouseleave = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.7)';
            svg.style.stroke = 'white';
        };
        
        overlay.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isShorts = container.closest('ytm-shorts-lockup-view-model') || 
                           container.closest('.shortsLockupViewModelHost') ||
                           container.closest('[class*="shortsLockupViewModelHost"]') ||
                           container.querySelector('a[href*="/shorts/"]');
            
            await openThumbnail(videoId, !!isShorts, overlay);
        };
        
        return overlay;
    }

    function addThumbnailOverlay(container) {
        if (container.querySelector('.thumb-overlay')) return;

        let videoId = null;
        let thumbnailContainer = null;
        
        const img = container.querySelector('img[src*="ytimg.com"]');
        if (img?.src) {
            videoId = extractVideoId(img.src);
            thumbnailContainer = img.closest('yt-thumbnail-view-model') || img.parentElement;
        }
        
        if (!videoId) {
            const link = container.querySelector('a[href*="/shorts/"]');
            if (link?.href) {
                videoId = extractShortsId(link.href);
                
                const shortsImg = container.querySelector('img[src*="ytimg.com"]');
                if (shortsImg) {
                    thumbnailContainer = shortsImg.closest('.ytCoreImageHost') || 
                                       shortsImg.closest('[class*="ThumbnailContainer"]') ||
                                       shortsImg.closest('[class*="ImageHost"]') ||
                                       shortsImg.parentElement;
                }
            }
        }

        if (!videoId || !thumbnailContainer) return;

        if (getComputedStyle(thumbnailContainer).position === 'static') {
            thumbnailContainer.style.position = 'relative';
        }
        
        const overlay = createThumbnailOverlay(videoId, container);
        overlay.className = 'thumb-overlay';
        thumbnailContainer.appendChild(overlay);
    }

    function createAvatarOverlay() {
        const overlay = document.createElement('div');
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'white');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.transition = 'stroke 0.2s ease';
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '8');
        circle.setAttribute('r', '5');
        svg.appendChild(circle);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M20 21a8 8 0 0 0-16 0');
        svg.appendChild(path);
        
        overlay.appendChild(svg);
        
        overlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.7);
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.2s ease;
        `;
        
        overlay.onmouseenter = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            svg.style.stroke = '#f50057';
        };
        overlay.onmouseleave = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.7)';
            svg.style.stroke = 'white';
        };
        
        return overlay;
    }

    function addAvatarOverlay(img) {
        const container = img.parentElement;
        if (container.querySelector('.avatar-overlay')) return;

        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        const overlay = createAvatarOverlay();
        overlay.className = 'avatar-overlay';
        
        overlay.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const highResUrl = img.src.replace(/=s\d+-c-k-c0x00ffffff-no-rj.*/, '=s0');
            window.open(highResUrl, '_blank');
        };

        container.appendChild(overlay);

        container.onmouseenter = () => overlay.style.opacity = '1';
        container.onmouseleave = () => overlay.style.opacity = '0';
    }

    function createBannerOverlay() {
        const overlay = document.createElement('div');
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'white');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.transition = 'stroke 0.2s ease';
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '3');
        rect.setAttribute('y', '3');
        rect.setAttribute('width', '18');
        rect.setAttribute('height', '18');
        rect.setAttribute('rx', '2');
        rect.setAttribute('ry', '2');
        svg.appendChild(rect);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '9');
        circle.setAttribute('cy', '9');
        circle.setAttribute('r', '2');
        svg.appendChild(circle);
        
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '21,15 16,10 5,21');
        svg.appendChild(polyline);
        
        overlay.appendChild(svg);
        
        overlay.style.cssText = `
            position: absolute;
            bottom: 8px;
            left: 8px;
            background: rgba(0, 0, 0, 0.7);
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.2s ease;
        `;
        
        overlay.onmouseenter = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            svg.style.stroke = '#f50057';
        };
        overlay.onmouseleave = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.7)';
            svg.style.stroke = 'white';
        };
        
        return overlay;
    }

    function addBannerOverlay(img) {
        const container = img.parentElement;
        if (container.querySelector('.banner-overlay')) return;

        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        const overlay = createBannerOverlay();
        overlay.className = 'banner-overlay';
        
        overlay.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const highResUrl = img.src.replace(/=w\d+-.*/, '=s0');
            window.open(highResUrl, '_blank');
        };

        container.appendChild(overlay);

        container.onmouseenter = () => overlay.style.opacity = '1';
        container.onmouseleave = () => overlay.style.opacity = '0';
    }

    function processAvatars() {
        const avatarSelectors = [
            'yt-avatar-shape img',
            '#avatar img',
            'ytd-channel-avatar-editor img',
            '.ytd-video-owner-renderer img[src*="yt"]'
        ];

        avatarSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                if (img.src && img.src.includes('yt') && !img.closest('.avatar-overlay')) {
                    addAvatarOverlay(img);
                }
            });
        });
    }

    function processBanners() {
        const bannerSelectors = [
            'yt-image-banner-view-model img',
            'ytd-c4-tabbed-header-renderer img[src*="yt"]',
            '#channel-header img[src*="banner"]'
        ];

        bannerSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                if (img.src && (img.src.includes('banner') || img.src.includes('yt')) && !img.closest('.banner-overlay')) {
                    addBannerOverlay(img);
                }
            });
        });
    }

    function processThumbnails() {
        document.querySelectorAll('yt-thumbnail-view-model').forEach(addThumbnailOverlay);
        document.querySelectorAll('.ytd-thumbnail').forEach(addThumbnailOverlay);
        
        document.querySelectorAll('ytm-shorts-lockup-view-model').forEach(addThumbnailOverlay);
        document.querySelectorAll('.shortsLockupViewModelHost').forEach(addThumbnailOverlay);
        document.querySelectorAll('[class*="shortsLockupViewModelHost"]').forEach(addThumbnailOverlay);
    }

    function processAll() {
        processThumbnails();
        processAvatars();
        processBanners();
        addOrUpdateThumbnailImage();
    }

    function setupMutationObserver() {
        const observer = new MutationObserver(() => {
            setTimeout(processAll, 50);
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function setupUrlChangeDetection() {
        let currentUrl = location.href;

        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function () {
            originalPushState.apply(history, arguments);
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOrUpdateThumbnailImage, 500);
                }
            }, 100);
        };

        history.replaceState = function () {
            originalReplaceState.apply(history, arguments);
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOrUpdateThumbnailImage, 500);
                }
            }, 100);
        };

        window.addEventListener("popstate", function () {
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOrUpdateThumbnailImage, 500);
                }
            }, 100);
        });

        setInterval(function () {
            if (location.href !== currentUrl) {
                currentUrl = location.href;
                setTimeout(addOrUpdateThumbnailImage, 300);
            }
        }, 500);
    }

    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(init, 100);
            });
        } else {
            setTimeout(init, 100);
        }
    }

    function init() {
        setupUrlChangeDetection();
        setupMutationObserver();
        processAll();
        setTimeout(processAll, 500);
        setTimeout(processAll, 1000);
        setTimeout(processAll, 2000);
    }

    initialize();
    
})();
