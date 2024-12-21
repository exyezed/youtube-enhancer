// ==UserScript==
// @name         YouTube Enhancer (Full-Sized Image Preview)
// @description  Viewing original video thumbnails, avatars, and channel banners, with a thumbnail preview above the panel.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.4
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .YouTubeEnhancerFullSized-button {
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
        .YouTubeEnhancerFullSized-container {
            position: relative;
        }
        .YouTubeEnhancerFullSized-container:hover .YouTubeEnhancerFullSized-button {
            opacity: 1;
        }
        #YouTubeEnhancerFullSized-custom-image {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
            box-sizing: border-box;
            border-radius: 10px;
            cursor: pointer;
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

    const defaultIconPath = "M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4";
    const hoverIconPath = "M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4l2 3l3-4l4 5z";
    
    let YouTubeEnhancerFullSizedCurrentVideoId = '';
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

    function YouTubeEnhancerFullSizedOpenImage(url) {
        window.open(url, '_blank');
    }

    function YouTubeEnhancerFullSizedAddButton(element, getFullSizeUrl) {
        if (!element.closest('.YouTubeEnhancerFullSized-container')) {
            const container = document.createElement('div');
            container.className = 'YouTubeEnhancerFullSized-container';
            element.parentNode.insertBefore(container, element);
            container.appendChild(element);

            const button = document.createElement('button');
            button.className = 'YouTubeEnhancerFullSized-button';
            
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
            
            button.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                YouTubeEnhancerFullSizedOpenImage(getFullSizeUrl(element.src));
            };
            container.appendChild(button);
        }
    }

    function YouTubeEnhancerFullSizedProcessAvatars() {
        const avatars = document.querySelectorAll('yt-avatar-shape img, yt-img-shadow#avatar img');
        avatars.forEach(img => {
            if (!img.closest('.YouTubeEnhancerFullSized-container')) {
                YouTubeEnhancerFullSizedAddButton(img, (src) => src.replace(/=s\d+-c-k-c0x00ffffff-no-rj.*/, '=s0'));
                
                if (isWatchPage()) {
                    const button = img.closest('.YouTubeEnhancerFullSized-container').querySelector('.YouTubeEnhancerFullSized-button');
                    if (button) {
                        button.style.display = 'none';
                    }
                }
            }
        });
    }

    function YouTubeEnhancerFullSizedProcessChannelBanners() {
        const banners = document.querySelectorAll('yt-image-banner-view-model img');
        banners.forEach(img => {
            if (!img.closest('.YouTubeEnhancerFullSized-container')) {
                YouTubeEnhancerFullSizedAddButton(img, (src) => src.replace(/=w\d+-.*/, '=s0'));
            }
        });
    }

    function YouTubeEnhancerFullSizedProcessVideoThumbnails() {
        const thumbnails = document.querySelectorAll('ytd-thumbnail img, ytd-playlist-thumbnail img');
        thumbnails.forEach(img => {
            if (!img.closest('.YouTubeEnhancerFullSized-container')) {
                YouTubeEnhancerFullSizedAddButton(img, (src) => {
                    const videoId = src.match(/\/vi\/([^\/]+)/)[1];
                    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
                });
            }
        });
    }

    function YouTubeEnhancerFullSizedAddOrUpdateImage() {
        const newVideoId = new URLSearchParams(window.location.search).get('v');
        
        if (!newVideoId || newVideoId === YouTubeEnhancerFullSizedCurrentVideoId) {
            return;
        }

        YouTubeEnhancerFullSizedCurrentVideoId = newVideoId;

        function attemptInsertion() {
            const targetElement = document.querySelector('#secondary-inner #panels');
            const existingImg = document.getElementById('YouTubeEnhancerFullSized-custom-image');
            
            if (existingImg) {
                existingImg.src = `https://i.ytimg.com/vi/${YouTubeEnhancerFullSizedCurrentVideoId}/mqdefault.jpg`;
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
            img.id = 'YouTubeEnhancerFullSized-custom-image';
            img.src = `https://i.ytimg.com/vi/${YouTubeEnhancerFullSizedCurrentVideoId}/mqdefault.jpg`;
            img.addEventListener('click', () => {
                const maxResUrl = `https://i.ytimg.com/vi/${YouTubeEnhancerFullSizedCurrentVideoId}/maxresdefault.jpg`;
                window.open(maxResUrl, '_blank');
            });

            targetElement.parentNode.insertBefore(img, targetElement);
            thumbnailInsertionAttempts = 0;
        }

        attemptInsertion();
    }

    function YouTubeEnhancerFullSizedObservePageChanges() {
        const contentObserver = new MutationObserver(() => {
            YouTubeEnhancerFullSizedProcessAvatars();
            YouTubeEnhancerFullSizedProcessChannelBanners();
            YouTubeEnhancerFullSizedProcessVideoThumbnails();
        });

        const panelObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && 
                    (mutation.target.id === 'secondary' || 
                     mutation.target.id === 'secondary-inner')) {
                    YouTubeEnhancerFullSizedAddOrUpdateImage();
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

    YouTubeEnhancerFullSizedProcessAvatars();
    YouTubeEnhancerFullSizedProcessChannelBanners();
    YouTubeEnhancerFullSizedProcessVideoThumbnails();
    YouTubeEnhancerFullSizedAddOrUpdateImage();
    YouTubeEnhancerFullSizedObservePageChanges();

    window.addEventListener('yt-navigate-finish', () => {
        YouTubeEnhancerFullSizedAddOrUpdateImage();
    });
    console.log('YouTube Enhancer (Full-Sized Image Preview) is running');
})();
