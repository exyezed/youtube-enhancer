// ==UserScript==
// @name         YouTube Enhancer (Reveal Video Category)
// @description  Revealing the video category.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.0
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    let currentVideoId = '';

    function addOrUpdateCategoriesElement() {
        let categoriesElement = document.getElementById('YouTubeEnhancerRevealVideoCategory');
        if (!categoriesElement) {
            const viewCountElement = document.querySelector('#view-count');
            if (viewCountElement) {
                categoriesElement = document.createElement('span');
                categoriesElement.id = 'YouTubeEnhancerRevealVideoCategory';
                categoriesElement.className = 'style-scope ytd-watch-info-text';
                categoriesElement.style.fontWeight = 'bold';
                categoriesElement.style.color = '#3ea6ff';
                categoriesElement.style.marginRight = '4px';
                viewCountElement.parentNode.insertBefore(categoriesElement, viewCountElement);
            }
        }
        return categoriesElement;
    }

    function getVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    function fetchVideoCategory(videoId, categoriesElement, isShorts = false) {
        const apiUrl = `https://exyezed.vercel.app/api/video/${videoId}`;

        GM_xmlhttpRequest({
            method: 'GET',
            url: apiUrl,
            onload: function(response) {
                if (response.status === 200) {
                    const data = JSON.parse(response.responseText);
                    if (data.category_name) {
                        if (isShorts) {
                            categoriesElement.textContent = `${data.category_name} • `;
                        } else {
                            categoriesElement.textContent = `${data.category_name} •`;
                        }
                    }
                } else {
                    console.error('Failed to fetch video category:', response.status);
                }
            }
        });
    }

    function checkForVideoChange() {
        const newVideoId = getVideoId();
        if (newVideoId && newVideoId !== currentVideoId) {
            currentVideoId = newVideoId;
            const categoriesElement = addOrUpdateCategoriesElement();
            if (categoriesElement) {
                fetchVideoCategory(currentVideoId, categoriesElement);
            }
        }
    }

    function addCategoryToShortsTitles() {
        const titleElements = document.querySelectorAll('yt-shorts-video-title-view-model');
        titleElements.forEach(element => {
            if (!element.querySelector('.YouTubeEnhancerRevealShortsCategory')) {
                const titleElement = element.querySelector('.YtShortsVideoTitleViewModelShortsVideoTitle');
                if (titleElement) {
                    const categoryElement = document.createElement('span');
                    categoryElement.className = 'YouTubeEnhancerRevealShortsCategory';
                    categoryElement.style.fontWeight = 'bold';
                    categoryElement.style.color = '#fff';
                    titleElement.insertBefore(categoryElement, titleElement.firstChild);
                    
                    // Fetch and update category for Shorts
                    const shortsVideoId = getShortsVideoId();
                    if (shortsVideoId) {
                        fetchVideoCategory(shortsVideoId, categoryElement, true);
                    }
                }
            }
        });
    }

    function addCategoryToNewShortsTitle() {
        const reelPlayerHeader = document.querySelector('reel-player-header-renderer');
        if (reelPlayerHeader) {
            const titleElement = reelPlayerHeader.querySelector('#stamped-title');
            if (titleElement && !titleElement.querySelector('.YouTubeEnhancerRevealShortsCategory')) {
                const categoryElement = document.createElement('span');
                categoryElement.className = 'YouTubeEnhancerRevealShortsCategory';
                categoryElement.style.fontWeight = 'bold';
                categoryElement.style.color = '#fff';
                categoryElement.style.marginRight = '4px';
                titleElement.insertBefore(categoryElement, titleElement.firstChild);

                const shortsVideoId = getShortsVideoId();
                if (shortsVideoId) {
                    fetchVideoCategory(shortsVideoId, categoryElement, true);
                }
            }
        }
    }

    function getShortsVideoId() {
        const path = window.location.pathname;
        const shortsMatch = path.match(/\/shorts\/([^/?]+)/);
        return shortsMatch ? shortsMatch[1] : null;
    }

    function observePageChanges() {
        const observer = new MutationObserver(() => {
            checkForVideoChange();
            addCategoryToShortsTitles();
            addCategoryToNewShortsTitle();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function init() {
        checkForVideoChange();
        addCategoryToShortsTitles();
        addCategoryToNewShortsTitle();
        observePageChanges();
    }

    // Run the script when the page is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
