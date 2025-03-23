// ==UserScript==
// @name         YouTube Enhancer (Reveal Video & Shorts Category)
// @description  Reveal Video & Shorts Category.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.2
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let isChecking = false;
    let previousUrl = location.href;
    let shortsCheckInterval = null;
    let shortsElementsFound = false;

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

    function getVideoId(url) {
        try {
            const urlObj = new URL(url);
            if (urlObj.pathname.includes('/watch')) {
                return urlObj.searchParams.get('v');
            } else if (urlObj.pathname.includes('/video/')) {
                return urlObj.pathname.split('/video/')[1].split('/')[0];
            } else if (urlObj.pathname.includes('/shorts/')) {
                return urlObj.pathname.split('/shorts/')[1].split('/')[0];
            }
        } catch (e) {
        }
        return null;
    }

    async function fetchVideoDetails(videoId) {
        if (!videoId || isChecking) return null;
        isChecking = true;
        
        try {
            const apiKey = getApiKey();
            if (!apiKey) {
                return null;
            }
            
            const { clientName, clientVersion } = getClientInfo();
            if (!clientName || !clientVersion) {
                return null;
            }
            
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
            
            if (!response.ok) {
                return null;
            }
            
            return await response.json();
        } catch (error) {
            return null;
        } finally {
            isChecking = false;
        }
    }

    async function getVideoCategory(videoId) {
        const data = await fetchVideoDetails(videoId);
        if (!data) return null;
        
        try {
            let category = null;
            if (data.microformat?.playerMicroformatRenderer?.category) {
                category = data.microformat.playerMicroformatRenderer.category;
            }
            
            return category;
        } catch (e) {
            return null;
        }
    }

    function addOrUpdateCategoriesElement() {
        let categoriesElement = document.getElementById('revealVideoCategory');
        if (!categoriesElement) {
            const viewCountElement = document.querySelector('#view-count');
            if (viewCountElement) {
                categoriesElement = document.createElement('span');
                categoriesElement.id = 'revealVideoCategory';
                categoriesElement.className = 'style-scope ytd-watch-info-text';
                categoriesElement.style.fontWeight = 'bold';
                categoriesElement.style.color = '#3ea6ff';
                categoriesElement.style.marginRight = '4px';
                viewCountElement.parentNode.insertBefore(categoriesElement, viewCountElement);
            }
        }
        return categoriesElement;
    }

    async function updateRegularVideoCategory(videoId) {
        if (!videoId) return;
        
        const categoriesElement = addOrUpdateCategoriesElement();
        if (categoriesElement) {
            categoriesElement.textContent = 'Loading...';
            const category = await getVideoCategory(videoId);
            if (category) {
                categoriesElement.textContent = `${category} •`;
            } else {
                categoriesElement.textContent = '';
            }
        }
    }

    function isShortsElementProcessed(element) {
        return element.hasAttribute('data-enhancer-processed');
    }

    function markShortsElementProcessed(element) {
        element.setAttribute('data-enhancer-processed', 'true');
    }

    async function addCategoryToShorts(videoId) {
        if (!videoId) return;
        
        let found = false;
        
        const titleElements = document.querySelectorAll('.ytShortsVideoTitleViewModelShortsVideoTitle');
        
        if (titleElements.length > 0) {
            found = true;
            shortsElementsFound = true;
            
            for (const element of titleElements) {
                if (isShortsElementProcessed(element)) continue;
                
                markShortsElementProcessed(element);
                
                const attributedString = element.querySelector('.yt-core-attributed-string');
                if (attributedString) {
                    const categoryElement = document.createElement('span');
                    categoryElement.className = 'revealShortsCategory';
                    categoryElement.style.fontWeight = 'bold';
                    categoryElement.style.color = '#fff';
                    categoryElement.style.marginRight = '4px';
                    
                    attributedString.insertBefore(categoryElement, attributedString.firstChild);
                    
                    categoryElement.textContent = 'Loading...';
                    const category = await getVideoCategory(videoId);
                    if (category) {
                        categoryElement.textContent = `${category} • `;
                    } else {
                        categoryElement.remove();
                    }
                }
            }
        }
        
        const metapanelItems = document.querySelectorAll('.ytReelMetapanelViewModelMetapanelItem');
        
        if (metapanelItems.length > 0) {
            found = true;
            shortsElementsFound = true;
            
            for (const item of metapanelItems) {
                if (isShortsElementProcessed(item)) continue;
                
                markShortsElementProcessed(item);
                
                const titleContainer = item.querySelector('yt-shorts-video-title-view-model');
                if (!titleContainer) continue;
                
                const titleElement = titleContainer.querySelector('h2');
                if (titleElement) {
                    const stringElement = titleElement.querySelector('.yt-core-attributed-string');
                    if (stringElement) {
                        const categoryElement = document.createElement('span');
                        categoryElement.className = 'revealShortsCategory';
                        categoryElement.style.fontWeight = 'bold';
                        categoryElement.style.color = '#fff';
                        categoryElement.style.marginRight = '4px';
                        
                        stringElement.insertBefore(categoryElement, stringElement.firstChild);
                        
                        const category = await getVideoCategory(videoId);
                        if (category) {
                            categoryElement.textContent = `${category} • `;
                        } else {
                            categoryElement.remove();
                        }
                    }
                }
            }
        }
        
        if (shortsElementsFound && !found && shortsCheckInterval) {
            clearInterval(shortsCheckInterval);
            shortsCheckInterval = null;
            shortsElementsFound = false;
        }
        
        return found;
    }

    function handleUrlChange(currentUrl) {
        if (shortsCheckInterval) {
            clearInterval(shortsCheckInterval);
            shortsCheckInterval = null;
        }
        
        const videoId = getVideoId(currentUrl);
        if (!videoId) {
            return;
        }
        
        if (currentUrl.includes('/shorts/')) {
            setTimeout(async () => {
                const found = await addCategoryToShorts(videoId);
                
                if (!found && !shortsCheckInterval) {
                    let attemptCount = 0;
                    shortsCheckInterval = setInterval(async () => {
                        attemptCount++;
                        const success = await addCategoryToShorts(videoId);
                        
                        if (success || attemptCount > 10 || !location.href.includes('/shorts/')) {
                            clearInterval(shortsCheckInterval);
                            shortsCheckInterval = null;
                        }
                    }, 1000);
                }
            }, 1500);
        } else {
            setTimeout(() => {
                updateRegularVideoCategory(videoId);
            }, 1000);
        }
    }

    function checkForVideoChange() {
        const currentUrl = location.href;
        
        if (currentUrl !== previousUrl) {
            previousUrl = currentUrl;
            handleUrlChange(currentUrl);
        }
    }

    function observeShortsChanges() {
        const observer = new MutationObserver((_mutations) => {
            if (location.href.includes('/shorts/')) {
                const videoId = getVideoId(location.href);
                if (videoId) {
                    addCategoryToShorts(videoId);
                }
            }
        });

        observer.observe(document.body, { 
            childList: true,
            subtree: true,
            attributeFilter: ['class'],
            characterData: false
        });
    }

    history.pushState = (function(f) {
        return function() {
            const result = f.apply(this, arguments);
            checkForVideoChange();
            return result;
        };
    })(history.pushState);

    history.replaceState = (function(f) {
        return function() {
            const result = f.apply(this, arguments);
            checkForVideoChange();
            return result;
        };
    })(history.replaceState);

    window.addEventListener('popstate', checkForVideoChange);

    function init() {
        checkForVideoChange();
        observeShortsChanges();
        
        setInterval(checkForVideoChange, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();