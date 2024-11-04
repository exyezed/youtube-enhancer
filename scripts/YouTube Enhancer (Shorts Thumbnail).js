// ==UserScript==
// @name         YouTube Enhancer (Shorts Thumbnail)
// @description  Viewing original shorts thumbnails.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.1
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const BUTTON_SIZE = '24px';
    const ICON_SIZE = '20px';

    function createSVGIcon(isHoverIcon = false) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        svg.setAttribute("width", "1em");
        svg.setAttribute("height", "1em");
        svg.setAttribute("viewBox", "0 0 24 24");
        
        path.setAttribute("fill", "currentColor");
        
        if (isHoverIcon) {
            path.setAttribute("d", "M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4l2 3l3-4l4 5z");
        } else {
            path.setAttribute("d", "M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4z");
        }
        
        svg.appendChild(path);
        return svg;
    }

    function getVideoId(href) {
        const match = href.match(/\/shorts\/([^/?]+)/);
        return match ? match[1] : null;
    }

    function addThumbnailButton(container) {
        if (container.querySelector('.YouTubeEnhancerShortsThumbnail')) {
            return;
        }

        const linkElement = container.querySelector('a.ShortsLockupViewModelHostEndpoint');
        if (!linkElement) return;

        const videoId = getVideoId(linkElement.href);
        if (!videoId) return;

        const button = document.createElement('button');
        button.className = 'YouTubeEnhancerShortsThumbnail';
        
        const iconContainer = document.createElement('span');
        iconContainer.className = 'youtube-enhancer-icon';
        
        const defaultIcon = createSVGIcon(false);
        iconContainer.appendChild(defaultIcon);
        
        button.appendChild(iconContainer);
        
        button.style.cssText = `
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
            width: ${BUTTON_SIZE};
            height: ${BUTTON_SIZE};
            padding: 0;
        `;

        button.addEventListener('mouseenter', () => {
            iconContainer.removeChild(iconContainer.firstChild);
            iconContainer.appendChild(createSVGIcon(true));
        });

        button.addEventListener('mouseleave', () => {
            iconContainer.removeChild(iconContainer.firstChild);
            iconContainer.appendChild(createSVGIcon(false));
        });

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(`https://i.ytimg.com/vi/${videoId}/oardefault.jpg`, '_blank');
        });

        container.insertBefore(button, linkElement);
    }

    function observeNewElements() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const containers = node.querySelectorAll('ytm-shorts-lockup-view-model.ShortsLockupViewModelHost');
                        containers.forEach(addThumbnailButton);
                        
                        if (node.matches('ytm-shorts-lockup-view-model.ShortsLockupViewModelHost')) {
                            addThumbnailButton(node);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .YouTubeEnhancerShortsThumbnail {
                transition: background-color 0.3s ease;
            }
            .YouTubeEnhancerShortsThumbnail:hover {
                background-color: rgba(0, 0, 0, 0.75) !important;
            }
            .youtube-enhancer-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: ${ICON_SIZE};
                height: ${ICON_SIZE};
            }
            .youtube-enhancer-icon svg {
                width: 100%;
                height: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    function initialize() {
        addStyles();
        const containers = document.querySelectorAll('ytm-shorts-lockup-view-model.ShortsLockupViewModelHost');
        containers.forEach(addThumbnailButton);
        observeNewElements();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    console.log('YouTube Enhancer (Shorts Thumbnail) is running');
})();
