// ==UserScript==
// @name         YouTube Enhancer (Subtitle Downloader)
// @description  Allows you to download available subtitles for YouTube videos in various languages directly from the video page.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.0
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

    // Utility function to convert XML subtitles to SRT format
    function xmlToSrt(xmlText) {
        const textElements = xmlText.match(/<text[^>]*>(.*?)<\/text>/g) || [];
        let srtContent = '';
        let counter = 1;

        textElements.forEach((element) => {
            try {
                const startMatch = element.match(/start="([^"]+)"/);
                const durMatch = element.match(/dur="([^"]+)"/);
                const textMatch = element.match(/<text[^>]*>(.*?)<\/text>/);

                if (startMatch && textMatch) {
                    const start = parseFloat(startMatch[1]);
                    const duration = durMatch ? parseFloat(durMatch[1]) : 0;
                    const end = start + duration;
                    const text = textMatch[1]
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/\n/g, ' ')
                        .trim();

                    if (text) {
                        srtContent += `${counter}\n`;
                        srtContent += `${formatTime(start)} --> ${formatTime(end)}\n`;
                        srtContent += `${text}\n\n`;
                        counter++;
                    }
                }
            } catch (error) {
                console.error('Error parsing text element:', error);
            }
        });

        return srtContent;
    }

    // Helper function to format time for SRT
    function formatTime(time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 1000);

        return `${String(hours).padStart(2, '0')}:${
            String(minutes).padStart(2, '0')}:${
            String(seconds).padStart(2, '0')},${
            String(milliseconds).padStart(3, '0')}`;
    }

    // Function to sanitize filename
    function sanitizeFilename(filename) {
        return filename
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Create SVG icon for the button
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

    // Create styles for the UI
    function createStyles(computedStyle) {
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
            }
            .custom-subtitle-btn .hover-icon { display: none; }
            .custom-subtitle-btn:hover .default-icon { display: none; }
            .custom-subtitle-btn:hover .hover-icon { display: block; }
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
        return style;
    }

    // Create dropdown menu for subtitle languages
    function createDropdown(languages) {
        const dropdown = document.createElement('div');
        dropdown.className = 'subtitle-dropdown';

        const title = document.createElement('div');
        title.className = 'subtitle-dropdown-title';
        title.textContent = 'Download Subtitles';
        dropdown.appendChild(title);

        languages.forEach(lang => {
            const option = document.createElement('div');
            option.className = 'subtitle-option';
            option.dataset.url = lang.url;
            option.textContent = lang.label;
            dropdown.appendChild(option);
        });

        return dropdown;
    }

    // Get video title with fallback options
    function getVideoTitle(videoId) {
        const titleElement = document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata');
        if (titleElement) return titleElement.textContent.trim();

        const fallbackSelectors = [
            'h1.title.style-scope.ytd-video-primary-info-renderer',
            'h1.watch-title',
            '.ytd-watch-metadata #title h1'
        ];

        for (const selector of fallbackSelectors) {
            const element = document.querySelector(selector);
            if (element) return element.textContent.trim();
        }

        return videoId ? `video_${videoId}` : 'untitled_video';
    }

    // Get video ID from URL
    function getVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    // Handle subtitle download process
    async function handleSubtitleDownload(e) {
        e.preventDefault();
        const videoId = getVideoId();

        if (!videoId) {
            alert('Could not detect video ID. Please try refreshing the page.');
            return;
        }

        try {
            const player = document.querySelector('#movie_player');
            let playerResponse;

            try {
                playerResponse = player.getPlayerResponse();
            } catch (error) {
                playerResponse = window.ytInitialPlayerResponse;
            }

            if (!playerResponse) {
                alert('Could not access video data. Please try refreshing the page.');
                return;
            }

            const captions = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks ||
                           playerResponse?.captions?.captionTracks;

            if (!captions || captions.length === 0) {
                alert('No subtitles available for this video');
                return;
            }

            const languages = captions.map(caption => ({
                label: caption.name?.simpleText || 
                       caption.name?.runs?.[0]?.text || 
                       caption.languageCode || 
                       'Unknown Language',
                url: caption.baseUrl || caption.url
            }));

            const backdrop = document.createElement('div');
            backdrop.className = 'subtitle-backdrop';
            document.body.appendChild(backdrop);

            const videoTitle = getVideoTitle(videoId);
            const dropdown = createDropdown(languages);
            document.body.appendChild(dropdown);

            const closeDropdown = (e) => {
                if (!dropdown.contains(e.target) && !e.target.closest('.custom-subtitle-btn')) {
                    dropdown.remove();
                    backdrop.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            };

            let downloadInProgress = false;

            dropdown.addEventListener('click', async (event) => {
                const option = event.target.closest('.subtitle-option');
                if (!option || downloadInProgress) return;

                downloadInProgress = true;
                option.classList.add('loading');
                const url = option.dataset.url;
                const langLabel = option.textContent.trim();

                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    
                    const xmlContent = await response.text();
                    const srtContent = xmlToSrt(xmlContent);

                    if (!srtContent) {
                        throw new Error('Failed to convert subtitles');
                    }

                    const blob = new Blob([srtContent], { type: 'text/plain' });
                    const downloadUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;

                    const fileName = sanitizeFilename(`${videoTitle} - ${langLabel}.srt`);
                    link.download = fileName;
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(downloadUrl);

                    dropdown.remove();
                    backdrop.remove();
                } catch (error) {
                    console.error('Download error:', error);
                    alert(`Error downloading subtitles: ${error.message}`);
                    option.classList.remove('loading');
                } finally {
                    downloadInProgress = false;
                }
            });

            setTimeout(() => {
                document.addEventListener('click', closeDropdown);
            }, 100);

        } catch (error) {
            console.error('Error in handleSubtitleDownload:', error);
            alert(`Error accessing video subtitles: ${error.message}`);
        }
    }

    // Initialize the download button
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

        if (!document.querySelector('#yt-subtitle-downloader-styles')) {
            const style = createStyles(computedStyle);
            document.head.appendChild(style);
        }

        newButton.append(
            createSVGIcon('default-icon', false),
            createSVGIcon('hover-icon', true)
        );

        newButton.addEventListener('click', (e) => {
            const existingDropdown = document.querySelector('.subtitle-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            } else {
                handleSubtitleDownload(e);
            }
        });
        
        originalButton.insertAdjacentElement('afterend', newButton);
    }

    // Initialize observer to watch for YouTube navigation
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

        let observerActive = false;
        let retryInterval = null;

        function startObserving() {
            if (observerActive) return;

            const playerContainer = document.getElementById('player-container');
            const contentContainer = document.getElementById('content');

            if (playerContainer) {
                observer.observe(playerContainer, {
                    childList: true,
                    subtree: true
                });
                observerActive = true;
            }

            if (contentContainer) {
                observer.observe(contentContainer, {
                    childList: true,
                    subtree: true
                });
                observerActive = true;
            }

            if (window.location.pathname === '/watch') {
                initializeButton();
            }
        }

        startObserving();

        // Retry mechanism for slow-loading pages
        if (!document.getElementById('player-container')) {
            retryInterval = setInterval(() => {
                if (document.getElementById('player-container')) {
                    startObserving();
                    clearInterval(retryInterval);
                }
            }, 1000);

            // Cleanup after 10 seconds to prevent infinite retries
            setTimeout(() => {
                if (retryInterval) {
                    clearInterval(retryInterval);
                    retryInterval = null;
                }
            }, 10000);
        }

        // Handle YouTube spa navigation
        const handleNavigation = debounce(() => {
            if (window.location.pathname === '/watch') {
                initializeButton();
            }
        }, 250);

        window.addEventListener('yt-navigate-finish', handleNavigation);

        // Cleanup function
        return () => {
            observer.disconnect();
            window.removeEventListener('yt-navigate-finish', handleNavigation);
            if (retryInterval) {
                clearInterval(retryInterval);
            }
            observerActive = false;
        };
    }

    // Debounce utility function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Start the script
    initializeObserver();
    console.log('YouTube Enhancer (Subtitle Downloader) is running');
})();
