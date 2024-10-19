// ==UserScript==
// @name         YouTube Enhancer (Full-Sized Image Preview)
// @description  Viewing original video thumbnails, avatars, and channel banners, with a thumbnail preview above the panel.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.0
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Add styles for the fullsize button and clickable images
    GM_addStyle(`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
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
        .YouTubeEnhancerFullSized-clickable-image {
            cursor: pointer;
        }
        #YouTubeEnhancerFullSized-custom-image {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
            box-sizing: border-box;
            border-radius: 10px;
            cursor: pointer;
        }
    `);

    let YouTubeEnhancerFullSizedCurrentVideoId = '';

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
            button.className = 'YouTubeEnhancerFullSized-button material-symbols-outlined';
            button.textContent = 'add_photo_alternate';
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
                const isWatchPage = window.location.pathname.startsWith('/watch');
                YouTubeEnhancerFullSizedAddButton(img, (src) => src.replace(/=s\d+-c-k-c0x00ffffff-no-rj.*/, '=s0'));
                
                // Hide button on watch pages for avatars
                if (isWatchPage) {
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

    function YouTubeEnhancerFullSizedGetVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    function YouTubeEnhancerFullSizedAddOrUpdateImage() {
        const newVideoId = YouTubeEnhancerFullSizedGetVideoId();
        if (newVideoId && newVideoId !== YouTubeEnhancerFullSizedCurrentVideoId) {
            YouTubeEnhancerFullSizedCurrentVideoId = newVideoId;
            const targetElement = document.querySelector('#secondary-inner #panels');
            if (targetElement) {
                let img = document.getElementById('YouTubeEnhancerFullSized-custom-image');
                if (!img) {
                    img = document.createElement('img');
                    img.id = 'YouTubeEnhancerFullSized-custom-image';
                    targetElement.parentNode.insertBefore(img, targetElement);
                    
                    // Add click event listener to the custom image
                    img.addEventListener('click', () => {
                        const maxResUrl = `https://i.ytimg.com/vi/${YouTubeEnhancerFullSizedCurrentVideoId}/maxresdefault.jpg`;
                        YouTubeEnhancerFullSizedOpenImage(maxResUrl);
                    });
                }
                img.src = `https://i.ytimg.com/vi/${YouTubeEnhancerFullSizedCurrentVideoId}/mqdefault.jpg`;
            }
        }
    }

    function YouTubeEnhancerFullSizedObservePageChanges() {
        const observer = new MutationObserver((mutations) => {
            YouTubeEnhancerFullSizedProcessAvatars();
            YouTubeEnhancerFullSizedProcessChannelBanners();
            YouTubeEnhancerFullSizedProcessVideoThumbnails();
            YouTubeEnhancerFullSizedAddOrUpdateImage();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initial processing
    YouTubeEnhancerFullSizedProcessAvatars();
    YouTubeEnhancerFullSizedProcessChannelBanners();
    YouTubeEnhancerFullSizedProcessVideoThumbnails();
    YouTubeEnhancerFullSizedAddOrUpdateImage();

    // Observe for future changes
    YouTubeEnhancerFullSizedObservePageChanges();

    // Check when URL changes
    window.addEventListener('yt-navigate-finish', () => {
        YouTubeEnhancerFullSizedProcessAvatars();
        YouTubeEnhancerFullSizedProcessChannelBanners();
        YouTubeEnhancerFullSizedProcessVideoThumbnails();
        YouTubeEnhancerFullSizedAddOrUpdateImage();
    });
})();