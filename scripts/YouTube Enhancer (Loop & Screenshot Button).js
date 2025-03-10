// ==UserScript==
// @name         YouTube Enhancer (Loop & Screenshot Button)
// @description  Integrating loop and screenshot buttons into the video and shorts player to enhance user functionality.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.4
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const YouTubeEnhancerLoopScreenshotConfig = {
        screenshotFormat: "png",
        extension: 'png',
        screenshotFunctionality: 2,
        clickDuration: 200
    };

    const YouTubeEnhancerLoopScreenshotCSS = `
    a.YouTubeEnhancerLoopScreenshot-loop-button, 
    a.YouTubeEnhancerLoopScreenshot-screenshot-button {
        text-align: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
    }

    a.YouTubeEnhancerLoopScreenshot-loop-button svg, 
    a.YouTubeEnhancerLoopScreenshot-screenshot-button svg {
        width: 24px;
        height: 24px;
        vertical-align: middle;
    }

    a.YouTubeEnhancerLoopScreenshot-loop-button.active svg {
        fill: url(#buttonGradient);
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button .icon-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button .default-icon,
    .YouTubeEnhancerLoopScreenshot-screenshot-button .hover-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 0.2s ease;
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button .default-icon {
        opacity: 1;
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button .hover-icon {
        opacity: 0;
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button:hover .default-icon {
        opacity: 0;
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button:hover .hover-icon {
        opacity: 1;
    }

    .YouTubeEnhancerLoopScreenshot-screenshot-button.clicked .hover-icon {
        fill: url(#buttonGradient);
    }

    .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button svg {
        width: 24px;
        height: 24px;
        transition: fill 0.1s ease;
    }

    .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button svg path {
        transition: fill 0.1s ease;
    }

    .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button.clicked svg path {
        fill: url(#shortsButtonGradient) !important;
    }

    html[dark] .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button {
        background-color: rgba(255, 255, 255, 0.1);
    }

    html[dark] .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    html[dark] .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button svg path {
        fill: white;
    }

    html:not([dark]) .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button {
        background-color: rgba(0, 0, 0, 0.05);
    }

    html:not([dark]) .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    html:not([dark]) .YouTubeEnhancerLoopScreenshot-shorts-screenshot-button svg path {
        fill: #030303;
    }
    `;
    
    const YouTubeEnhancerLoopScreenshotUtils = {
        addStyle(styleString) {
            const style = document.createElement('style');
            style.textContent = styleString;
            document.head.append(style);
        },

        getYouTubeVideoLoopSVG() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('height', '24px');
            svg.setAttribute('viewBox', '0 -960 960 960');
            svg.setAttribute('width', '24px');
            svg.setAttribute('fill', '#e8eaed');
            
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'buttonGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#f03');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', 'stop-color:#ff2791');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M220-260q-92 0-156-64T0-480q0-92 64-156t156-64q37 0 71 13t61 37l68 62-60 54-62-56q-16-14-36-22t-42-8q-58 0-99 41t-41 99q0 58 41 99t99 41q22 0 42-8t36-22l310-280q27-24 61-37t71-13q92 0 156 64t64 156q0 92-64 156t-156 64q-37 0-71-13t-61-37l-68-62 60-54 62 56q16 14 36 22t42 8q58 0 99-41t41-99q0-58-41-99t-99-41q-22 0-42 8t-36 22L352-310q-27 24-61 37t-71 13Z');
            
            svg.appendChild(path);
            return svg;
        },

        getYouTubeVideoScreenshotSVG() {
            const container = document.createElement('div');
            container.className = 'icon-container';
            
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('height', '24px');
            svg.setAttribute('viewBox', '0 -960 960 960');
            svg.setAttribute('width', '24px');
            svg.setAttribute('fill', '#e8eaed');
            svg.classList.add('default-icon');
            
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'buttonGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#f03');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', 'stop-color:#ff2791');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M240-280h480L570-480 450-320l-90-120-120 160Zm-80 160q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z');
            svg.appendChild(path);
    
            const hoverSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            hoverSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            hoverSvg.setAttribute('height', '24px');
            hoverSvg.setAttribute('viewBox', '0 0 24 24');
            hoverSvg.setAttribute('width', '24px');
            hoverSvg.setAttribute('fill', '#e8eaed');
            hoverSvg.classList.add('hover-icon');
    
            const hoverPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            hoverPath.setAttribute('d', 'M20 5h-3.17l-1.24-1.35A2 2 0 0 0 14.12 3H9.88c-.56 0-1.1.24-1.47.65L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-3 12H7a.5.5 0 0 1-.4-.8l2-2.67c.2-.27.6-.27.8 0L11.25 16l2.6-3.47c.2-.27.6-.27.8 0l2.75 3.67a.5.5 0 0 1-.4.8');
    
            hoverSvg.appendChild(defs.cloneNode(true));
            hoverSvg.appendChild(hoverPath);
    
            container.appendChild(svg);
            container.appendChild(hoverSvg);
            
            return container;
        },

        getShortsScreenshotSVG() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('height', '24px');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('width', '24px');
            
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'shortsButtonGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#f03');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', 'stop-color:#ff2791');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M20 5h-3.17l-1.24-1.35A2 2 0 0 0 14.12 3H9.88c-.56 0-1.1.24-1.47.65L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-3 12H7a.5.5 0 0 1-.4-.8l2-2.67c.2-.27.6-.27.8 0L11.25    16l2.6-3.47c.2-.27.6-.27.8 0l2.75 3.67a.5.5 0 0 1-.4.8');
            
            svg.appendChild(path);
            return svg;
        },

        getVideoId() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('v') || window.location.pathname.split('/').pop();
        },

        getVideoTitle(callback) {
            const videoId = this.getVideoId();
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://exyezed.vercel.app/api/video/${videoId}`,
                onload: function(response) {
                    if (response.status === 200) {
                        const data = JSON.parse(response.responseText);
                        callback(data.title);
                    } else {
                        callback('YouTube Video');
                    }
                },
                onerror: function() {
                    callback('YouTube Video');
                }
            });
        },

        formatTime(time) {
            const date = new Date();
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const timeString = [
                Math.floor(time / 3600),
                Math.floor((time % 3600) / 60),
                Math.floor(time % 60)
            ].map(v => v.toString().padStart(2, '0')).join('-');
            return `${dateString} ${timeString}`;
        },

        async copyToClipboard(blob) {
            const clipboardItem = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([clipboardItem]);
        },

        downloadScreenshot(blob, filename) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },

        captureScreenshot(player) {
            if (!player) return;
            
            const canvas = document.createElement("canvas");
            canvas.width = player.videoWidth;
            canvas.height = player.videoHeight;
            canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);
            
            this.getVideoTitle((title) => {
                const time = player.currentTime;
                const filename = `${title} ${this.formatTime(time)}.${YouTubeEnhancerLoopScreenshotConfig.extension}`;
                
                canvas.toBlob(async (blob) => {
                    const { screenshotFunctionality } = YouTubeEnhancerLoopScreenshotConfig;
                    if (screenshotFunctionality >= 1) {
                        await this.copyToClipboard(blob);
                    }
                    if (screenshotFunctionality !== 1) {
                        this.downloadScreenshot(blob, filename);
                    }
                }, `image/${YouTubeEnhancerLoopScreenshotConfig.screenshotFormat}`);
            });
        }
    };

    const YouTubeEnhancerLoopScreenshotRegularVideo = {
        init() {
            this.waitForControls().then(() => {
                this.insertLoopElement();
                this.insertScreenshotElement();
                this.addObserver();
                this.addContextMenuListener();
            }).catch(error => {
                console.error('Failed to initialize YouTube Enhancer:', error);
            });
        },

        waitForControls() {
            return new Promise((resolve, reject) => {
                let attempts = 0;
                const maxAttempts = 50;
                
                const checkControls = () => {
                    const controls = document.querySelector('div.ytp-left-controls');
                    if (controls) {
                        resolve(controls);
                    } else if (attempts >= maxAttempts) {
                        reject(new Error('Controls not found after maximum attempts'));
                    } else {
                        attempts++;
                        setTimeout(checkControls, 100);
                    }
                };
                
                checkControls();
            });
        },

        insertLoopElement() {
            const controls = document.querySelector('div.ytp-left-controls');
            if (!controls) return;

            if (document.querySelector('.YouTubeEnhancerLoopScreenshot-loop-button')) return;

            const newButton = document.createElement('a');
            newButton.classList.add('ytp-button', 'YouTubeEnhancerLoopScreenshot-loop-button');
            newButton.title = 'Loop Video';
            newButton.appendChild(YouTubeEnhancerLoopScreenshotUtils.getYouTubeVideoLoopSVG());
            newButton.addEventListener('click', this.toggleLoopState);

            controls.appendChild(newButton);
        },

        insertScreenshotElement() {
            const controls = document.querySelector('div.ytp-left-controls');
            if (!controls) return;

            if (document.querySelector('.YouTubeEnhancerLoopScreenshot-screenshot-button')) return;

            const newButton = document.createElement('a');
            newButton.classList.add('ytp-button', 'YouTubeEnhancerLoopScreenshot-screenshot-button');
            newButton.title = 'Take Screenshot';
            newButton.appendChild(YouTubeEnhancerLoopScreenshotUtils.getYouTubeVideoScreenshotSVG());
            newButton.addEventListener('click', this.handleScreenshotClick);

            const loopButton = document.querySelector('.YouTubeEnhancerLoopScreenshot-loop-button');
            if (loopButton) {
                loopButton.parentNode.insertBefore(newButton, loopButton.nextSibling);
            } else {
                controls.appendChild(newButton);
            }
        },

        toggleLoopState() {
            const video = document.querySelector('video');
            video.loop = !video.loop;
            if (video.loop) video.play();

            YouTubeEnhancerLoopScreenshotRegularVideo.updateToggleControls();
        },

        updateToggleControls() {
            const youtubeVideoLoop = document.querySelector('.YouTubeEnhancerLoopScreenshot-loop-button');
            youtubeVideoLoop.classList.toggle('active');
            youtubeVideoLoop.setAttribute('title', this.isActive() ? 'Stop Looping' : 'Loop Video');
        },

        isActive() {
            const youtubeVideoLoop = document.querySelector('.YouTubeEnhancerLoopScreenshot-loop-button');
            return youtubeVideoLoop.classList.contains('active');
        },

        addObserver() {
            const video = document.querySelector('video');
            new MutationObserver((mutations) => {
                mutations.forEach(() => {
                    if ((video.getAttribute('loop') === null && this.isActive()) ||
                        (video.getAttribute('loop') !== null && !this.isActive())) this.updateToggleControls();
                });
            }).observe(video, { attributes: true, attributeFilter: ['loop'] });
        },

        addContextMenuListener() {
            const video = document.querySelector('video');
            video.addEventListener('contextmenu', () => {
                setTimeout(() => {
                    const checkbox = document.querySelector('[role=menuitemcheckbox]');
                    checkbox.setAttribute('aria-checked', this.isActive());
                    checkbox.addEventListener('click', this.toggleLoopState);
                }, 50);
            });
        },

        handleScreenshotClick(event) {
            const button = event.currentTarget;
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, YouTubeEnhancerLoopScreenshotConfig.clickDuration);

            const player = document.querySelector('video');
            YouTubeEnhancerLoopScreenshotUtils.captureScreenshot(player);
        }
    };

    const YouTubeEnhancerLoopScreenshotShorts = {
        init() {
            this.insertScreenshotElement();
        },
    
        insertScreenshotElement() {
            const shortsContainer = document.querySelector('ytd-reel-video-renderer[is-active] #actions');
            if (shortsContainer && !shortsContainer.querySelector('.YouTubeEnhancerLoopScreenshot-shorts-screenshot-button')) {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'YouTubeEnhancerLoopScreenshot-shorts-screenshot-button';
                iconDiv.appendChild(YouTubeEnhancerLoopScreenshotUtils.getShortsScreenshotSVG());
                
                const customShortsIcon = shortsContainer.querySelector('#custom-shorts-icon');
                if (customShortsIcon) {
                    customShortsIcon.parentNode.insertBefore(iconDiv, customShortsIcon);
                } else {
                    shortsContainer.insertBefore(iconDiv, shortsContainer.firstChild);
                }
    
                iconDiv.addEventListener('click', (event) => {
                    const button = event.currentTarget;
                    button.classList.add('clicked');
                    
                    const path = button.querySelector('svg path');
                    if (path) {
                        path.style.fill = 'url(#shortsButtonGradient)';
                    }
                    
                    setTimeout(() => {
                        button.classList.remove('clicked');
                        if (path) {
                            path.style.fill = '';
                        }
                    }, YouTubeEnhancerLoopScreenshotConfig.clickDuration);
                    
                    this.captureScreenshot();
                });
            }
        },

        captureScreenshot() {
            const player = document.querySelector('ytd-reel-video-renderer[is-active] video');
            YouTubeEnhancerLoopScreenshotUtils.captureScreenshot(player);
        }
    };

    const YouTubeEnhancerLoopScreenshotTheme = {
        init() {
            this.updateStyles();
            this.addObserver();
        },

        updateStyles() {
            const isDarkTheme = document.documentElement.hasAttribute('dark');
            document.documentElement.classList.toggle('dark-theme', isDarkTheme);
        },

        addObserver() {
            const observer = new MutationObserver(() => this.updateStyles());
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['dark']
            });
        }
    };

    function YouTubeEnhancerLoopScreenshotInit() {
        YouTubeEnhancerLoopScreenshotUtils.addStyle(YouTubeEnhancerLoopScreenshotCSS);
        waitForVideo().then(initializeWhenReady);
    }

    function waitForVideo() {
        return new Promise((resolve) => {
            const checkVideo = () => {
                if (document.querySelector('video')) {
                    resolve();
                } else {
                    setTimeout(checkVideo, 100);
                }
            };
            checkVideo();
        });
    }

    function initializeWhenReady() {
        YouTubeEnhancerLoopScreenshotInitializeFeatures();
    }

    function YouTubeEnhancerLoopScreenshotInitializeFeatures() {
        YouTubeEnhancerLoopScreenshotRegularVideo.init();
        YouTubeEnhancerLoopScreenshotTheme.init();
        YouTubeEnhancerLoopScreenshotInitializeShortsFeatures();
    }

    function YouTubeEnhancerLoopScreenshotInitializeShortsFeatures() {
        if (window.location.pathname.includes('/shorts/')) {
            setTimeout(YouTubeEnhancerLoopScreenshotShorts.init.bind(YouTubeEnhancerLoopScreenshotShorts), 500);
        }
    }

    const YouTubeEnhancerLoopScreenshotShortsObserver = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                YouTubeEnhancerLoopScreenshotInitializeShortsFeatures();
            }
        }
    });

    YouTubeEnhancerLoopScreenshotShortsObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('yt-navigate-finish', YouTubeEnhancerLoopScreenshotInitializeShortsFeatures);

    document.addEventListener('yt-action', function(event) {
        if (event.detail && event.detail.actionName === 'yt-reload-continuation-items-command') {
            YouTubeEnhancerLoopScreenshotInitializeShortsFeatures();
        }
    });

    YouTubeEnhancerLoopScreenshotInit();
    console.log('YouTube Enhancer (Loop & Screenshot Button) is running');
})();
