// ==UserScript==
// @name         YouTube Enhancer (Subtitle Downloader)
// @description  Allows you to download available subtitles for YouTube videos in various languages directly from the video page.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.1
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function xmlToSrt(xmlText) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const textNodes = xmlDoc.getElementsByTagName("text");
        let srtContent = '';

        for (let i = 0; i < textNodes.length; i++) {
            const node = textNodes[i];
            const start = parseFloat(node.getAttribute("start"));
            const duration = parseFloat(node.getAttribute("dur") || "0");
            const end = start + duration;

            const formatTime = (time) => {
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor((time % 3600) / 60);
                const seconds = Math.floor(time % 60);
                const milliseconds = Math.floor((time % 1) * 1000);

                return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`;
            };

            srtContent += `${i + 1}\n`;
            srtContent += `${formatTime(start)} --> ${formatTime(end)}\n`;
            srtContent += `${node.textContent}\n\n`;
        }

        return srtContent;
    }

    function createSVGIcon(className, isHover = false) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        svg.setAttribute("viewBox", "0 0 576 512");
        svg.classList.add(className);

        path.setAttribute("d", isHover
            ? "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 208l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm256 0l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM120 336l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm160 0l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
            : "M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l448 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM120 240l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm256 0l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM120 336l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm160 0l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
        );

        svg.appendChild(path);
        return svg;
    }

    function getVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    function createDropdown(languages, videoTitle) {
        const dropdown = document.createElement('div');
        dropdown.className = 'subtitle-dropdown';
    
        const titleDiv = document.createElement('div');
        titleDiv.className = 'subtitle-dropdown-title';
        titleDiv.textContent = `Download Subtitles (${languages.length})`;
        dropdown.appendChild(titleDiv);
    
        languages.forEach((lang) => {
            const option = document.createElement('div');
            option.className = 'subtitle-option';
            option.dataset.url = lang.url;
            option.textContent = lang.label;
            dropdown.appendChild(option);
        });
    
        return dropdown;
    }

    async function handleSubtitleDownload(e) {
        e.preventDefault();
        const videoId = getVideoId();
    
        if (!videoId) {
            console.error('Video ID not found');
            return;
        }
    
        try {
            const player = document.querySelector('#movie_player');
            if (!player || !player.getPlayerResponse) {
                console.error('Player not found or API not available');
                return;
            }
    
            const playerResponse = player.getPlayerResponse();
            const captions = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    
            if (!captions || captions.length === 0) {
                alert('No subtitles available for this video');
                return;
            }
    
            const languages = captions.map(caption => ({
                label: caption.name.simpleText,
                url: caption.baseUrl
            }));
    
            const backdrop = document.createElement('div');
            backdrop.className = 'subtitle-backdrop';
            document.body.appendChild(backdrop);
    
            const videoTitleElement = document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata');
            const videoTitle = videoTitleElement ? videoTitleElement.textContent.trim() : 'video';
    
            const dropdown = createDropdown(languages, videoTitle);
            document.body.appendChild(dropdown);
    
            const closeDropdown = (e) => {
                if (!dropdown.contains(e.target) && !e.target.closest('.custom-subtitle-btn')) {
                    dropdown.remove();
                    backdrop.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            };
    
            dropdown.addEventListener('click', async (event) => {
                const option = event.target.closest('.subtitle-option');
                if (!option) return;
    
                const url = option.dataset.url;
                const langLabel = option.textContent.trim();
    
                try {
                    option.classList.add('loading');
    
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Network response was not ok');
    
                    const xmlContent = await response.text();
                    const srtContent = xmlToSrt(xmlContent);
    
                    const blob = new Blob([srtContent], { type: 'text/plain' });
                    const downloadUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = `${videoTitle} - ${langLabel}.srt`;
    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(downloadUrl);
    
                    dropdown.remove();
                    backdrop.remove();
                } catch (error) {
                    console.error('Error downloading subtitles:', error);
                    option.classList.remove('loading');
                    alert('Error downloading subtitles. Please try again.');
                }
            });
    
            setTimeout(() => {
                document.addEventListener('click', closeDropdown);
            }, 100);
    
        } catch (error) {
            console.error('Error handling subtitle download:', error);
            alert('Error accessing video subtitles. Please try again.');
        }
    }

    function initializeStyles(computedStyle) {
        if (document.querySelector('#yt-subtitle-downloader-styles')) return;

        const style = document.createElement('style');
        style.id = 'yt-subtitle-downloader-styles';
        style.textContent = `
            .custom-subtitle-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                width: ${computedStyle.width};
                height: ${computedStyle.height};
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            .custom-subtitle-btn svg {
                width: 24px;
                height: 24px;
                fill: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 1;
                transition: opacity 0.2s ease-in-out;
            }
            .custom-subtitle-btn .hover-icon { 
                opacity: 0;
            }
            .custom-subtitle-btn:hover .default-icon { 
                opacity: 0;
            }
            .custom-subtitle-btn:hover .hover-icon { 
                opacity: 1;
            }
            .subtitle-dropdown {
                position: fixed;
                background: rgba(28, 28, 28, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 12px;
                z-index: 9999;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                min-width: 200px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
            }
            .subtitle-dropdown-title {
                color: #fff;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 8px;
                padding: 0 8px;
                text-align: center;
            }
            .subtitle-option {
                color: #fff;
                padding: 8px 12px;
                margin: 2px 0;
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                font-size: 13px;
                white-space: nowrap;
            }
            .subtitle-option:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            .subtitle-option::before {
                content: "●";
                margin-right: 8px;
                font-size: 8px;
                color: #aaa;
            }
            .subtitle-option.loading {
                opacity: 0.5;
                pointer-events: none;
            }
            .subtitle-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9998;
            }
        `;
        document.head.appendChild(style);
    }

    function initializeButton() {
        if (document.querySelector('.custom-subtitle-btn')) return;

        const originalButton = document.querySelector('.ytp-subtitles-button');
        if (!originalButton) return;

        const newButton = document.createElement('button');
        const computedStyle = window.getComputedStyle(originalButton);

        Object.assign(newButton, {
            className: 'ytp-button custom-subtitle-btn',
            title: 'Download Subtitles'
        });

        newButton.setAttribute('aria-pressed', 'false');
        initializeStyles(computedStyle);

        newButton.append(
            createSVGIcon('default-icon', false),
            createSVGIcon('hover-icon', true)
        );

        newButton.addEventListener('click', (e) => {
            const existingDropdown = document.querySelector('.subtitle-dropdown');
            existingDropdown ? existingDropdown.remove() : handleSubtitleDownload(e);
        });
        
        originalButton.insertAdjacentElement('afterend', newButton);
    }

    function initializeObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const isVideoPage = window.location.pathname === '/watch';
                    if (isVideoPage && !document.querySelector('.custom-subtitle-btn')) {
                        initializeButton();
                    }
                }
            });
        });

        function startObserving() {
            const playerContainer = document.getElementById('player-container');
            const contentContainer = document.getElementById('content');

            if (playerContainer) {
                observer.observe(playerContainer, {
                    childList: true,
                    subtree: true
                });
            }

            if (contentContainer) {
                observer.observe(contentContainer, {
                    childList: true,
                    subtree: true
                });
            }

            if (window.location.pathname === '/watch') {
                initializeButton();
            }
        }

        startObserving();

        if (!document.getElementById('player-container')) {
            const retryInterval = setInterval(() => {
                if (document.getElementById('player-container')) {
                    startObserving();
                    clearInterval(retryInterval);
                }
            }, 1000);

            setTimeout(() => clearInterval(retryInterval), 10000);
        }

        const handleNavigation = () => {
            if (window.location.pathname === '/watch') {
                initializeButton();
            }
        };

        window.addEventListener('yt-navigate-finish', handleNavigation);

        return () => {
            observer.disconnect();
            window.removeEventListener('yt-navigate-finish', handleNavigation);
        };
    }

    addSubtitleButton();
    
    function addSubtitleButton() {
        initializeObserver();
    }
    console.log('YouTube Enhancer (Subtitle Downloader) is running');
})();
