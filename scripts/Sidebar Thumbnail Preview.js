// ==UserScript==
// @name         YouTube Enhancer (Sidebar Thumbnail Preview)
// @description  View various resolutions of video and Shorts thumbnails in the recommendation sidebar.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.0
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const css = `
        .thumbnail-overlay-container {
            position: absolute;
            bottom: 8px;
            left: 8px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.2s ease;
        }        
            
        .thumbnail-overlay-button {
            width: 28px;
            height: 28px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
        }

        .thumbnail-overlay-button:hover {
            background: rgba(0, 0, 0, 0.9);
        }

        .thumbnail-overlay-button svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .thumbnail-dropdown {
            position: absolute;
            bottom: 100%;
            left: 0;
            background: rgba(0, 0, 0, 0.9);
            border-radius: 4px;
            padding: 4px;
            margin-bottom: 4px;
            display: none;
            flex-direction: column;
            min-width: 120px;
        }

        .thumbnail-dropdown.show {
            display: flex;
        }

        .thumbnail-dropdown-item {
            background: none;
            border: none;
            color: white;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 2px;
            font-size: 12px;
            text-align: left;
            white-space: nowrap;
        }

        .thumbnail-dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }        
            
        .yt-lockup-view-model-wiz__content-image:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        .yt-lockup-view-model-wiz__content-image {
            position: relative;
        }
            
        .shortsLockupViewModelHostEndpoint:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        .shortsLockupViewModelHostEndpoint {
            position: relative;
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    function extractVideoId(url) {
        const regularMatch = url.match(/[?&]v=([^&]+)/);
        if (regularMatch) {
            return regularMatch[1];
        }
        
        const shortsMatch = url.match(/\/shorts\/([^?&]+)/);
        if (shortsMatch) {
            return shortsMatch[1];
        }
        
        return null;
    }

    function createOverlayButton(videoId, isShorts = false) {
        const container = document.createElement('div');
        container.className = 'thumbnail-overlay-container';
        const button = document.createElement('button');
        button.className = 'thumbnail-overlay-button';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4');
        
        svg.appendChild(path);
        button.appendChild(svg);

        const dropdown = document.createElement('div');
        dropdown.className = 'thumbnail-dropdown';

        let thumbnailOptions;
        
        if (isShorts) {
            thumbnailOptions = [
                { name: 'Default', filename: 'oardefault.jpg' },
                { name: 'Alternative', filename: 'oar2.jpg' }
            ];
        } else {
            thumbnailOptions = [
                { name: 'Default (120x90)', filename: 'default.jpg' },
                { name: 'Medium (320x180)', filename: 'mqdefault.jpg' },
                { name: 'High (480x360)', filename: 'hqdefault.jpg' },
                { name: 'Standard (640x480)', filename: 'sddefault.jpg' },
                { name: 'Max Res (1280x720)', filename: 'maxresdefault.jpg' }
            ];
        }

        thumbnailOptions.forEach(option => {
            const item = document.createElement('button');
            item.className = 'thumbnail-dropdown-item';
            item.textContent = option.name;
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${option.filename}`;
                window.open(thumbnailUrl, '_blank');
                dropdown.classList.remove('show');
            });
            
            dropdown.appendChild(item);
        });

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        container.appendChild(dropdown);
        container.appendChild(button);

        return container;
    }
    
    function addOverlayButtons() {
        const thumbnailContainers = document.querySelectorAll('.yt-lockup-view-model-wiz__content-image:not([data-overlay-added])');
        
        thumbnailContainers.forEach(container => {
            const href = container.getAttribute('href');
            if (href) {
                const videoId = extractVideoId(href);
                if (videoId) {
                    const overlayButton = createOverlayButton(videoId, false);
                    container.appendChild(overlayButton);
                    container.setAttribute('data-overlay-added', 'true');
                }
            }
        });

        const shortsContainers = document.querySelectorAll('.shortsLockupViewModelHostEndpoint:not([data-overlay-added])');
        
        shortsContainers.forEach(container => {
            const href = container.getAttribute('href');
            if (href) {
                const videoId = extractVideoId(href);
                if (videoId) {
                    const overlayButton = createOverlayButton(videoId, true);
                    container.appendChild(overlayButton);
                    container.setAttribute('data-overlay-added', 'true');
                }
            }
        });
    }    function observeChanges() {
        const observer = new MutationObserver(function(mutations) {
            let shouldCheck = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {                        
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.querySelector && 
                                (node.querySelector('.yt-lockup-view-model-wiz__content-image') || 
                                 node.classList.contains('yt-lockup-view-model-wiz__content-image') ||
                                 node.querySelector('.shortsLockupViewModelHostEndpoint') ||
                                 node.classList.contains('shortsLockupViewModelHostEndpoint'))) {
                                shouldCheck = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldCheck) {
                setTimeout(addOverlayButtons, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Improved URL change detection
    function setupUrlChangeDetection() {
        let currentUrl = location.href;
        
        // Override pushState and replaceState to detect programmatic navigation
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function() {
            originalPushState.apply(history, arguments);
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOverlayButtons, 500);
                }
            }, 100);
        };
        
        history.replaceState = function() {
            originalReplaceState.apply(history, arguments);
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOverlayButtons, 500);
                }
            }, 100);
        };
        
        // Listen for popstate events (back/forward button)
        window.addEventListener('popstate', function() {
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOverlayButtons, 500);
                }
            }, 100);
        });
        
        // Fallback polling for cases where other methods don't work
        setInterval(function() {
            if (location.href !== currentUrl) {
                currentUrl = location.href;
                setTimeout(addOverlayButtons, 300);
            }
        }, 500);
        
        // Listen for YouTube's specific navigation events
        document.addEventListener('yt-navigate-start', function() {
            setTimeout(addOverlayButtons, 1000);
        });
        
        document.addEventListener('yt-navigate-finish', function() {
            setTimeout(addOverlayButtons, 500);
        });
    }    function init() {
        addOverlayButtons();
        
        observeChanges();
        
        setupUrlChangeDetection();
        
        setTimeout(addOverlayButtons, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
