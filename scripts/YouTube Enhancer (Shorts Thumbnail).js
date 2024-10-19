// ==UserScript==
// @name         YouTube Enhancer (Shorts Thumbnail)
// @description  Viewing original video shorts.
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

    // Configuration
    const BUTTON_SIZE = '24px';  // Adjust this value to change button size
    const ICON_SIZE = '20px';    // Adjust this value to change icon size

    // Function to extract video ID from href
    function getVideoId(href) {
        const match = href.match(/\/shorts\/([^/?]+)/);
        return match ? match[1] : null;
    }

    // Function to create and insert thumbnail button
    function addThumbnailButton(container) {
        // Check if button already exists
        if (container.querySelector('.YouTubeEnhancerShortsThumbnail')) {
            return;
        }

        const linkElement = container.querySelector('a.ShortsLockupViewModelHostEndpoint');
        if (!linkElement) return;

        const videoId = getVideoId(linkElement.href);
        if (!videoId) return;

        // Create button
        const button = document.createElement('button');
        button.className = 'YouTubeEnhancerShortsThumbnail';
        
        // Create and append the Material Symbols icon
        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.textContent = 'add_photo_alternate';
        button.appendChild(icon);
        
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

        // Style the icon
        icon.style.cssText = `
            font-size: ${ICON_SIZE};
        `;

        // Add click event
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(`https://i.ytimg.com/vi/${videoId}/oardefault.jpg`, '_blank');
        });

        // Insert button
        container.insertBefore(button, linkElement);
    }

    // Function to handle new elements being added to the page
    function observeNewElements() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check for shorts container in added node
                        const containers = node.querySelectorAll('ytm-shorts-lockup-view-model.ShortsLockupViewModelHost');
                        containers.forEach(addThumbnailButton);
                        
                        // Check if node itself is a shorts container
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

    // Function to add necessary styles and font link
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .material-symbols-outlined {
                font-variation-settings:
                'FILL' 0,
                'wght' 200,
                'GRAD' 0,
                'opsz' 24
            }
            .YouTubeEnhancerShortsThumbnail {
                transition: background-color 0.3s ease;
            }
            .YouTubeEnhancerShortsThumbnail:hover {
                background-color: rgba(0, 0, 0, 0.75) !important;
            }
        `;
        document.head.appendChild(style);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=aspect_ratio';
        document.head.appendChild(link);
    }

    // Initial setup for existing elements
    function initialize() {
        addStyles();
        const containers = document.querySelectorAll('ytm-shorts-lockup-view-model.ShortsLockupViewModelHost');
        containers.forEach(addThumbnailButton);
        observeNewElements();
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();