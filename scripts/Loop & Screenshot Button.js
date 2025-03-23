// ==UserScript==
// @name         YouTube Enhancer (Loop & Screenshot Buttons)
// @description  Add Loop, Save and Copy Screenshot Buttons.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.5
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const buttonConfig = {
        screenshotFormat: "png",
        extension: 'png',
        clickDuration: 500
    };

    const buttonCSS = `
    a.buttonLoopAndScreenshot-loop-button, 
    a.buttonLoopAndScreenshot-save-screenshot-button,
    a.buttonLoopAndScreenshot-copy-screenshot-button {
        text-align: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
    }

    a.buttonLoopAndScreenshot-loop-button svg, 
    a.buttonLoopAndScreenshot-save-screenshot-button svg,
    a.buttonLoopAndScreenshot-copy-screenshot-button svg {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        transition: fill 0.2s ease;
    }

    a.buttonLoopAndScreenshot-loop-button:hover svg,
    a.buttonLoopAndScreenshot-save-screenshot-button:hover svg,
    a.buttonLoopAndScreenshot-copy-screenshot-button:hover svg {
        fill: url(#buttonGradient);
    }

    a.buttonLoopAndScreenshot-loop-button.active svg,
    a.buttonLoopAndScreenshot-save-screenshot-button.clicked svg,
    a.buttonLoopAndScreenshot-copy-screenshot-button.clicked svg {
        fill: url(#successGradient);
    }

    .buttonLoopAndScreenshot-shorts-save-button,
    .buttonLoopAndScreenshot-shorts-copy-button {
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

    .buttonLoopAndScreenshot-shorts-save-button svg,
    .buttonLoopAndScreenshot-shorts-copy-button svg {
        width: 24px;
        height: 24px;
        transition: fill 0.1s ease;
    }

    .buttonLoopAndScreenshot-shorts-save-button svg path,
    .buttonLoopAndScreenshot-shorts-copy-button svg path {
        transition: fill 0.1s ease;
    }

    .buttonLoopAndScreenshot-shorts-save-button:hover svg path,
    .buttonLoopAndScreenshot-shorts-copy-button:hover svg path {
        fill: url(#shortsButtonGradient) !important;
    }

    .buttonLoopAndScreenshot-shorts-save-button.clicked svg path,
    .buttonLoopAndScreenshot-shorts-copy-button.clicked svg path {
        fill: url(#shortsSuccessGradient) !important;
    }

    html[dark] .buttonLoopAndScreenshot-shorts-save-button,
    html[dark] .buttonLoopAndScreenshot-shorts-copy-button {
        background-color: rgba(255, 255, 255, 0.1);
    }

    html[dark] .buttonLoopAndScreenshot-shorts-save-button:hover,
    html[dark] .buttonLoopAndScreenshot-shorts-copy-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    html[dark] .buttonLoopAndScreenshot-shorts-save-button svg path,
    html[dark] .buttonLoopAndScreenshot-shorts-copy-button svg path {
        fill: white;
    }

    html:not([dark]) .buttonLoopAndScreenshot-shorts-save-button,
    html:not([dark]) .buttonLoopAndScreenshot-shorts-copy-button {
        background-color: rgba(0, 0, 0, 0.05);
    }

    html:not([dark]) .buttonLoopAndScreenshot-shorts-save-button:hover,
    html:not([dark]) .buttonLoopAndScreenshot-shorts-copy-button:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    html:not([dark]) .buttonLoopAndScreenshot-shorts-save-button svg path,
    html:not([dark]) .buttonLoopAndScreenshot-shorts-copy-button svg path {
        fill: #030303;
    }
    `;
    
    const iconUtils = {
        createGradientDefs(isShortsButton = false) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            
            const hoverGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            hoverGradient.setAttribute('id', isShortsButton ? 'shortsButtonGradient' : 'buttonGradient');
            hoverGradient.setAttribute('x1', '0%');
            hoverGradient.setAttribute('y1', '0%');
            hoverGradient.setAttribute('x2', '100%');
            hoverGradient.setAttribute('y2', '100%');
            
            const hoverStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            hoverStop1.setAttribute('offset', '0%');
            hoverStop1.setAttribute('style', 'stop-color:#f03');
            
            const hoverStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            hoverStop2.setAttribute('offset', '100%');
            hoverStop2.setAttribute('style', 'stop-color:#ff2791');
            
            hoverGradient.appendChild(hoverStop1);
            hoverGradient.appendChild(hoverStop2);
            defs.appendChild(hoverGradient);
            
            const successGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            successGradient.setAttribute('id', isShortsButton ? 'shortsSuccessGradient' : 'successGradient');
            successGradient.setAttribute('x1', '0%');
            successGradient.setAttribute('y1', '0%');
            successGradient.setAttribute('x2', '100%');
            successGradient.setAttribute('y2', '100%');
            
            const successStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            successStop1.setAttribute('offset', '0%');
            successStop1.setAttribute('style', 'stop-color:#0f9d58');
            
            const successStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            successStop2.setAttribute('offset', '100%');
            successStop2.setAttribute('style', 'stop-color:#00c853');
            
            successGradient.appendChild(successStop1);
            successGradient.appendChild(successStop2);
            defs.appendChild(successGradient);
            
            return defs;
        },
        
        createBaseSVG(viewBox, fill = '#e8eaed', isShortsButton = false) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('height', '24px');
            svg.setAttribute('viewBox', viewBox);
            svg.setAttribute('width', '24px');
            svg.setAttribute('fill', fill);
            svg.appendChild(this.createGradientDefs(isShortsButton));
            return svg;
        },
        
        paths: {
            loopPath: 'M220-260q-92 0-156-64T0-480q0-92 64-156t156-64q37 0 71 13t61 37l68 62-60 54-62-56q-16-14-36-22t-42-8q-58 0-99 41t-41 99q0 58 41 99t99 41q22 0 42-8t36-22l310-280q27-24 61-37t71-13q92 0 156 64t64 156q0 92-64 156t-156 64q-37 0-71-13t-61-37l-68-62 60-54 62 56q16 14 36 22t42 8q58 0 99-41t41-99q0-58-41-99t-99-41q-22 0-42 8t-36 22L352-310q-27 24-61 37t-71 13Z',
            screenshotPath: 'M20 5h-3.17l-1.24-1.35A2 2 0 0 0 14.12 3H9.88c-.56 0-1.1.24-1.47.65L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-3 12H7a.5.5 0 0 1-.4-.8l2-2.67c.2-.27.6-.27.8 0L11.25 16l2.6-3.47c.2-.27.6-.27.8 0l2.75 3.67a.5.5 0 0 1-.4.8',
            copyScreenshotPath: 'M9 14h10l-3.45-4.5l-2.3 3l-1.55-2zm-1 4q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V6h2v14h14v2zM8 4h12v12H8z'
        },
        
        createLoopIcon() {
            const svg = this.createBaseSVG('0 -960 960 960');
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', this.paths.loopPath);
            
            svg.appendChild(path);
            return svg;
        },
        
        createSaveScreenshotIcon(isShortsButton = false) {
            const svg = this.createBaseSVG('0 0 24 24', '#e8eaed', isShortsButton);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', this.paths.screenshotPath);
            
            svg.appendChild(path);
            return svg;
        },
        
        createCopyScreenshotIcon(isShortsButton = false) {
            const svg = this.createBaseSVG('0 0 24 24', '#e8eaed', isShortsButton);
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', this.paths.copyScreenshotPath);
            
            svg.appendChild(path);
            return svg;
        }
    };
    
    const buttonUtils = {
        addStyle(styleString) {
            const style = document.createElement('style');
            style.textContent = styleString;
            document.head.append(style);
        },

        getVideoId() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('v') || window.location.pathname.split('/').pop();
        },

        getApiKey() {
            const scripts = document.getElementsByTagName('script');
            for (const script of scripts) {
                const match = script.textContent.match(/"INNERTUBE_API_KEY":\s*"([^"]+)"/);
                if (match && match[1]) return match[1];
            }
            return null;
        },

        getClientInfo() {
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
        },

        async fetchVideoDetails(videoId) {
            try {
                const apiKey = this.getApiKey();
                if (!apiKey) return null;
                
                const { clientName, clientVersion } = this.getClientInfo();
                if (!clientName || !clientVersion) return null;
                
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
                
                if (!response.ok) return null;
                const data = await response.json();
                if (data && data.videoDetails && data.videoDetails.title) {
                    return data.videoDetails.title;
                }
                return 'YouTube Video';
            } catch (error) {
                return 'YouTube Video';
            }
        },

        async getVideoTitle(callback) {
            const videoId = this.getVideoId();
            const title = await this.fetchVideoDetails(videoId);
            callback(title || 'YouTube Video');
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

        captureScreenshot(player, action = 'download') {
            if (!player) return;
            
            const canvas = document.createElement("canvas");
            canvas.width = player.videoWidth;
            canvas.height = player.videoHeight;
            canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);
            
            this.getVideoTitle((title) => {
                const time = player.currentTime;
                const filename = `${title} ${this.formatTime(time)}.${buttonConfig.extension}`;
                
                canvas.toBlob(async (blob) => {
                    if (action === 'copy') {
                        await this.copyToClipboard(blob);
                    } else {
                        this.downloadScreenshot(blob, filename);
                    }
                }, `image/${buttonConfig.screenshotFormat}`);
            });
        }
    };

    const regularVideo = {
        init() {
            this.waitForControls().then(() => {
                this.insertLoopElement();
                this.insertSaveScreenshotElement();
                this.insertCopyScreenshotElement();
                this.addObserver();
                this.addContextMenuListener();
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

            if (document.querySelector('.buttonLoopAndScreenshot-loop-button')) return;

            const newButton = document.createElement('a');
            newButton.classList.add('ytp-button', 'buttonLoopAndScreenshot-loop-button');
            newButton.title = 'Loop Video';
            newButton.appendChild(iconUtils.createLoopIcon());
            newButton.addEventListener('click', this.toggleLoopState);

            controls.appendChild(newButton);
        },

        insertSaveScreenshotElement() {
            const controls = document.querySelector('div.ytp-left-controls');
            if (!controls) return;

            if (document.querySelector('.buttonLoopAndScreenshot-save-screenshot-button')) return;

            const newButton = document.createElement('a');
            newButton.classList.add('ytp-button', 'buttonLoopAndScreenshot-save-screenshot-button');
            newButton.title = 'Save Screenshot';
            newButton.appendChild(iconUtils.createSaveScreenshotIcon());
            newButton.addEventListener('click', this.handleSaveScreenshotClick);

            const loopButton = document.querySelector('.buttonLoopAndScreenshot-loop-button');
            if (loopButton) {
                loopButton.parentNode.insertBefore(newButton, loopButton.nextSibling);
            } else {
                controls.appendChild(newButton);
            }
        },
        
        insertCopyScreenshotElement() {
            const controls = document.querySelector('div.ytp-left-controls');
            if (!controls) return;

            if (document.querySelector('.buttonLoopAndScreenshot-copy-screenshot-button')) return;

            const newButton = document.createElement('a');
            newButton.classList.add('ytp-button', 'buttonLoopAndScreenshot-copy-screenshot-button');
            newButton.title = 'Copy Screenshot to Clipboard';
            newButton.appendChild(iconUtils.createCopyScreenshotIcon());
            newButton.addEventListener('click', this.handleCopyScreenshotClick);

            const saveButton = document.querySelector('.buttonLoopAndScreenshot-save-screenshot-button');
            if (saveButton) {
                saveButton.parentNode.insertBefore(newButton, saveButton.nextSibling);
            } else {
                controls.appendChild(newButton);
            }
        },

        toggleLoopState() {
            const video = document.querySelector('video');
            video.loop = !video.loop;
            if (video.loop) video.play();

            regularVideo.updateToggleControls();
        },

        updateToggleControls() {
            const youtubeVideoLoop = document.querySelector('.buttonLoopAndScreenshot-loop-button');
            youtubeVideoLoop.classList.toggle('active');
            youtubeVideoLoop.setAttribute('title', this.isActive() ? 'Stop Looping' : 'Loop Video');
        },

        isActive() {
            const youtubeVideoLoop = document.querySelector('.buttonLoopAndScreenshot-loop-button');
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

        handleSaveScreenshotClick(event) {
            const button = event.currentTarget;
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, buttonConfig.clickDuration);

            const player = document.querySelector('video');
            buttonUtils.captureScreenshot(player, 'download');
        },
        
        handleCopyScreenshotClick(event) {
            const button = event.currentTarget;
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, buttonConfig.clickDuration);

            const player = document.querySelector('video');
            buttonUtils.captureScreenshot(player, 'copy');
        }
    };

    const shortsVideo = {
        init() {
            this.insertSaveScreenshotElement();
            this.insertCopyScreenshotElement();
        },
    
        insertSaveScreenshotElement() {
            const shortsContainer = document.querySelector('ytd-reel-video-renderer[is-active] #actions');
            if (shortsContainer && !shortsContainer.querySelector('.buttonLoopAndScreenshot-shorts-save-button')) {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'buttonLoopAndScreenshot-shorts-save-button';
                iconDiv.title = 'Save Screenshot';
                iconDiv.appendChild(iconUtils.createSaveScreenshotIcon(true));
                
                const customShortsIcon = shortsContainer.querySelector('#custom-shorts-icon');
                if (customShortsIcon) {
                    customShortsIcon.parentNode.insertBefore(iconDiv, customShortsIcon);
                } else {
                    shortsContainer.insertBefore(iconDiv, shortsContainer.firstChild);
                }
    
                iconDiv.addEventListener('click', (event) => {
                    const button = event.currentTarget;
                    button.classList.add('clicked');
                    
                    setTimeout(() => {
                        button.classList.remove('clicked');
                    }, buttonConfig.clickDuration);
                    
                    this.captureScreenshot('download');
                });
            }
        },
        
        insertCopyScreenshotElement() {
            const shortsContainer = document.querySelector('ytd-reel-video-renderer[is-active] #actions');
            if (shortsContainer && !shortsContainer.querySelector('.buttonLoopAndScreenshot-shorts-copy-button')) {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'buttonLoopAndScreenshot-shorts-copy-button';
                iconDiv.title = 'Copy Screenshot to Clipboard';
                iconDiv.appendChild(iconUtils.createCopyScreenshotIcon(true));
                
                const saveButton = shortsContainer.querySelector('.buttonLoopAndScreenshot-shorts-save-button');
                if (saveButton) {
                    saveButton.parentNode.insertBefore(iconDiv, saveButton.nextSibling);
                } else {
                    const customShortsIcon = shortsContainer.querySelector('#custom-shorts-icon');
                    if (customShortsIcon) {
                        customShortsIcon.parentNode.insertBefore(iconDiv, customShortsIcon);
                    } else {
                        shortsContainer.insertBefore(iconDiv, shortsContainer.firstChild);
                    }
                }
    
                iconDiv.addEventListener('click', (event) => {
                    const button = event.currentTarget;
                    button.classList.add('clicked');
                    
                    setTimeout(() => {
                        button.classList.remove('clicked');
                    }, buttonConfig.clickDuration);
                    
                    this.captureScreenshot('copy');
                });
            }
        },

        captureScreenshot(action) {
            const player = document.querySelector('ytd-reel-video-renderer[is-active] video');
            buttonUtils.captureScreenshot(player, action);
        }
    };

    const themeHandler = {
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

    function initialize() {
        buttonUtils.addStyle(buttonCSS);
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
        initializeFeatures();
    }

    function initializeFeatures() {
        regularVideo.init();
        themeHandler.init();
        initializeShortsFeatures();
    }

    function initializeShortsFeatures() {
        if (window.location.pathname.includes('/shorts/')) {
            setTimeout(shortsVideo.init.bind(shortsVideo), 500);
        }
    }

    const shortsObserver = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                initializeShortsFeatures();
            }
        }
    });

    shortsObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('yt-navigate-finish', initializeShortsFeatures);

    document.addEventListener('yt-action', function(event) {
        if (event.detail && event.detail.actionName === 'yt-reload-continuation-items-command') {
            initializeShortsFeatures();
        }
    });

    initialize();
})();