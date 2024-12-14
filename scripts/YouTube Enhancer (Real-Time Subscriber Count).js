// ==UserScript==
// @name         YouTube Enhancer (Real-Time Subscriber Count)
// @description  Adds an overlay to YouTube channel banners showing real-time subscriber count.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.3
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const OPTIONS = ['subscribers', 'views', 'videos'];
    const FONT_LINK = "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap";
    const API_BASE_URL = 'https://exyezed.vercel.app/api/channel/';
    const STATS_API_URL = 'https://api.livecounts.io/youtube-live-subscriber-counter/stats/';
    const DEFAULT_UPDATE_INTERVAL = 2000;
    const DEFAULT_OVERLAY_OPACITY = 0.75;

    let overlay = null;
    let isUpdating = false;
    let intervalId = null;
    let currentChannelName = null;
    let updateInterval = parseInt(localStorage.getItem('youtubeEnhancerInterval')) || DEFAULT_UPDATE_INTERVAL;
    let overlayOpacity = parseFloat(localStorage.getItem('youtubeEnhancerOpacity')) || DEFAULT_OVERLAY_OPACITY;

    const lastSuccessfulStats = new Map();
    const previousStats = new Map();

    function init() {
        loadFonts();
        initializeLocalStorage();
        addStyles();
        observePageChanges();
        addNavigationListener();
    }

    function loadFonts() {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = FONT_LINK;
        document.head.appendChild(fontLink);
    }

    function initializeLocalStorage() {
        OPTIONS.forEach(option => {
            if (localStorage.getItem(`show-${option}`) === null) {
                localStorage.setItem(`show-${option}`, 'true');
            }
        });
    }

    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .settings-button {
                position: absolute;
                top: 12px;
                right: 12px;
                width: 16px;
                height: 16px;
                cursor: pointer;
                z-index: 2;
                transition: transform 0.3s ease;
            }
            .settings-button:hover {
                transform: rotate(45deg);
            }
            .settings-menu {
                position: absolute;
                top: 35px;
                right: 12px;
                background: rgba(0, 0, 0, 0.95);
                padding: 10px;
                border-radius: 6px;
                z-index: 2;
                display: none;
            }
            .settings-menu.show {
                display: flex;
            }
            .interval-slider, .opacity-slider {
                width: 160px;
                margin: 5px 0;
                height: 4px;
            }
            .interval-value, .opacity-value {
                color: white;
                font-size: 12px;
                margin-top: 3px;
                margin-bottom: 8px;
            }
            .setting-group {
                margin-bottom: 10px;
            }
            .setting-group:last-child {
                margin-bottom: 0;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    function createSettingsButton() {
        const button = document.createElement('div');
        button.className = 'settings-button';
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 512 512");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "white");
        path.setAttribute("d", "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z");
        
        svg.appendChild(path);
        button.appendChild(svg);
        
        return button;
    }

    function createSettingsMenu() {
        const menu = document.createElement('div');
        menu.className = 'settings-menu';
        menu.style.gap = '15px'; 
        menu.style.width = '360px';
    
        const displaySection = createDisplaySection();
        const controlsSection = createControlsSection();
    
        menu.appendChild(displaySection);
        menu.appendChild(controlsSection);
    
        return menu;
    }

    function createDisplaySection() {
        const displaySection = document.createElement('div');
        displaySection.style.flex = '1';
        
        const displayLabel = document.createElement('label');
        displayLabel.textContent = 'Display Options';
        displayLabel.style.marginBottom = '10px';
        displayLabel.style.display = 'block';
        displayLabel.style.fontSize = '16px';
        displayLabel.style.fontWeight = 'bold';
        displaySection.appendChild(displayLabel);
    
        OPTIONS.forEach(option => {
            const checkboxContainer = document.createElement('div');
            checkboxContainer.style.display = 'flex';
            checkboxContainer.style.alignItems = 'center';
            checkboxContainer.style.marginTop = '5px';
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `show-${option}`;
            checkbox.checked = localStorage.getItem(`show-${option}`) !== 'false';
            checkbox.style.marginRight = '8px';
            checkbox.style.cursor = 'pointer';
    
            const checkboxLabel = document.createElement('label');
            checkboxLabel.htmlFor = `show-${option}`;
            checkboxLabel.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            checkboxLabel.style.cursor = 'pointer';
            checkboxLabel.style.color = 'white';
            checkboxLabel.style.fontSize = '14px';
    
            checkbox.addEventListener('change', () => {
                localStorage.setItem(`show-${option}`, checkbox.checked);
                updateDisplayState();
            });
    
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(checkboxLabel);
            displaySection.appendChild(checkboxContainer);
        });

        return displaySection;
    }

    function createControlsSection() {
        const controlsSection = document.createElement('div');
        controlsSection.style.flex = '1';
        
        const intervalLabel = document.createElement('label');
        intervalLabel.textContent = 'Update Interval';
        intervalLabel.style.display = 'block';
        intervalLabel.style.marginBottom = '5px';
        intervalLabel.style.fontSize = '16px';
        intervalLabel.style.fontWeight = 'bold';
    
        const intervalSlider = document.createElement('input');
        intervalSlider.type = 'range';
        intervalSlider.min = '2';
        intervalSlider.max = '10';
        intervalSlider.value = updateInterval / 1000;
        intervalSlider.step = '1';
        intervalSlider.className = 'interval-slider';
    
        const intervalValue = document.createElement('div');
        intervalValue.className = 'interval-value';
        intervalValue.textContent = `${intervalSlider.value}s`;
        intervalValue.style.marginBottom = '15px';
        intervalValue.style.fontSize = '14px';
    
        intervalSlider.addEventListener('input', (e) => {
            const newInterval = parseInt(e.target.value) * 1000;
            intervalValue.textContent = `${e.target.value}s`;
            updateInterval = newInterval;
            localStorage.setItem('youtubeEnhancerInterval', newInterval);
    
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = setInterval(() => {
                    updateOverlayContent(overlay, currentChannelName);
                }, newInterval);
            }
        });
    
        const opacityLabel = document.createElement('label');
        opacityLabel.textContent = 'Background Opacity';
        opacityLabel.style.display = 'block';
        opacityLabel.style.marginBottom = '5px';
        opacityLabel.style.fontSize = '16px';
        opacityLabel.style.fontWeight = 'bold';
    
        const opacitySlider = document.createElement('input');
        opacitySlider.type = 'range';
        opacitySlider.min = '50';
        opacitySlider.max = '90';
        opacitySlider.value = overlayOpacity * 100;
        opacitySlider.step = '5';
        opacitySlider.className = 'opacity-slider';
    
        const opacityValue = document.createElement('div');
        opacityValue.className = 'opacity-value';
        opacityValue.textContent = `${opacitySlider.value}%`;
        opacityValue.style.fontSize = '14px';
    
        opacitySlider.addEventListener('input', (e) => {
            const newOpacity = parseInt(e.target.value) / 100;
            opacityValue.textContent = `${e.target.value}%`;
            overlayOpacity = newOpacity;
            localStorage.setItem('youtubeEnhancerOpacity', newOpacity);
    
            if (overlay) {
                overlay.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
            }
        });
    
        controlsSection.appendChild(intervalLabel);
        controlsSection.appendChild(intervalSlider);
        controlsSection.appendChild(intervalValue);
        controlsSection.appendChild(opacityLabel);
        controlsSection.appendChild(opacitySlider);
        controlsSection.appendChild(opacityValue);

        return controlsSection;
    }

    function createSpinner() {
        const spinnerContainer = document.createElement('div');
        spinnerContainer.style.position = 'absolute';
        spinnerContainer.style.top = '0';
        spinnerContainer.style.left = '0';
        spinnerContainer.style.width = '100%';
        spinnerContainer.style.height = '100%';
        spinnerContainer.style.display = 'flex';
        spinnerContainer.style.justifyContent = 'center';
        spinnerContainer.style.alignItems = 'center';
        spinnerContainer.classList.add('spinner-container');

        const spinner = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        spinner.setAttribute("viewBox", "0 0 512 512");
        spinner.setAttribute("width", "64");
        spinner.setAttribute("height", "64");
        spinner.classList.add('loading-spinner');
        spinner.style.animation = "spin 1s linear infinite";

        const secondaryPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        secondaryPath.setAttribute("d", "M0 256C0 114.9 114.1 .5 255.1 0C237.9 .5 224 14.6 224 32c0 17.7 14.3 32 32 32C150 64 64 150 64 256s86 192 192 192c69.7 0 130.7-37.1 164.5-92.6c-3 6.6-3.3 14.8-1 22.2c1.2 3.7 3 7.2 5.4 10.3c1.2 1.5 2.6 3 4.1 4.3c.8 .7 1.6 1.3 2.4 1.9c.4 .3 .8 .6 1.3 .9s.9 .6 1.3 .8c5 2.9 10.6 4.3 16 4.3c11 0 21.8-5.7 27.7-16c-44.3 76.5-127 128-221.7 128C114.6 512 0 397.4 0 256z");
        secondaryPath.style.opacity = "0.4";
        secondaryPath.style.fill = "white";

        const primaryPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        primaryPath.setAttribute("d",
            "M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z");
        primaryPath.style.fill = "white";

        spinner.appendChild(secondaryPath);
        spinner.appendChild(primaryPath);
        spinnerContainer.appendChild(spinner);
        return spinnerContainer;
    }

    function createSVGIcon(path) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 640 512");
        svg.setAttribute("width", "2rem");
        svg.setAttribute("height", "2rem");
        svg.style.marginRight = "0.5rem";
        svg.style.display = "none";

        const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgPath.setAttribute("d", path);
        svgPath.setAttribute("fill", "white");

        svg.appendChild(svgPath);
        return svg;
    }

    function createStatContainer(className, iconPath) {
        const container = document.createElement('div');
        Object.assign(container.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            visibility: 'hidden',
            width: '33%',
            height: '100%',
            padding: '0 1rem'
        });

        const numberContainer = document.createElement('div');
        Object.assign(numberContainer.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        });

        const differenceElement = document.createElement('div');
        differenceElement.classList.add(`${className}-difference`);
        Object.assign(differenceElement.style, {
            fontSize: '2.5rem',
            height: '2.5rem',
            marginBottom: '1rem'
        });

        const digitContainer = createNumberContainer();
        digitContainer.classList.add(`${className}-number`);
        Object.assign(digitContainer.style, {
            fontSize: '4rem',
            fontWeight: 'bold',
            lineHeight: '1',
            height: '4rem',
            fontFamily: 'inherit',
            letterSpacing: '0.025em'
        });

        numberContainer.appendChild(differenceElement);
        numberContainer.appendChild(digitContainer);

        const labelContainer = document.createElement('div');
        Object.assign(labelContainer.style, {
            display: 'flex',
            alignItems: 'center',
            marginTop: '0.5rem'
        });

        const icon = createSVGIcon(iconPath);
        Object.assign(icon.style, {
            width: '2rem',
            height: '2rem',
            marginRight: '0.75rem'
        });

        const labelElement = document.createElement('div');
        labelElement.classList.add(`${className}-label`);
        labelElement.style.fontSize = '2rem';

        labelContainer.appendChild(icon);
        labelContainer.appendChild(labelElement);

        container.appendChild(numberContainer);
        container.appendChild(labelContainer);

        return container;
    }

    function createOverlay(bannerElement) {
        clearExistingOverlay();

        if (!bannerElement) return null;

        const overlay = document.createElement('div');
        overlay.classList.add('channel-banner-overlay');
        Object.assign(overlay.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            borderRadius: '15px',
            zIndex: '1',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Rubik, sans-serif'
        });

        const settingsButton = createSettingsButton();
        const settingsMenu = createSettingsMenu();
        overlay.appendChild(settingsButton);
        overlay.appendChild(settingsMenu);

        settingsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!settingsMenu.contains(e.target) && !settingsButton.contains(e.target)) {
                settingsMenu.classList.remove('show');
            }
        });

        const spinner = createSpinner();
        overlay.appendChild(spinner);

        const subscribersElement = createStatContainer('subscribers', "M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z");
        const viewsElement = createStatContainer('views', "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z");
        const videosElement = createStatContainer('videos', "M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z");

        overlay.appendChild(subscribersElement);
        overlay.appendChild(viewsElement);
        overlay.appendChild(videosElement);
        
        bannerElement.appendChild(overlay);
        updateDisplayState();
        return overlay;
    }

    function fetchWithGM(url, headers = {}) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                headers: headers,
                onload: function(response) {
                    if (response.status === 200) {
                        resolve(JSON.parse(response.responseText));
                    } else {
                        reject(new Error(`Failed to fetch: ${response.status}`));
                    }
                },
                onerror: function(error) {
                    reject(error);
                },
            });
        });
    }

    async function fetchChannelId(channelName) {
        try {
            const response = await fetchWithGM(`${API_BASE_URL}${channelName}`);
            if (!response || !response.channel_id) {
                throw new Error('Invalid channel ID response');
            }
            return response.channel_id;
        } catch (error) {
            console.error('Error fetching channel ID:', error);
            
            const metaTag = document.querySelector('meta[itemprop="channelId"]');
            if (metaTag && metaTag.content) {
                return metaTag.content;
            }
            
            const urlMatch = window.location.href.match(/channel\/(UC[\w-]+)/);
            if (urlMatch && urlMatch[1]) {
                return urlMatch[1];
            }
            
            throw new Error('Could not determine channel ID');
        }
    }
    
    async function fetchChannelStats(channelId) {
        try {
            let retries = 3;
            let lastError;
            
            while (retries > 0) {
                try {
                    const stats = await fetchWithGM(
                        `${STATS_API_URL}${channelId}`,
                        {
                            origin: "https://livecounts.io",
                            referer: "https://livecounts.io/",
                        }
                    );
                    
                    if (!stats || typeof stats.followerCount === 'undefined') {
                        throw new Error('Invalid stats response');
                    }
                    
                    lastSuccessfulStats.set(channelId, stats);
                    return stats;
                } catch (e) {
                    lastError = e;
                    retries--;
                    if (retries > 0) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            }
            
            if (lastSuccessfulStats.has(channelId)) {
                return lastSuccessfulStats.get(channelId);
            }
            
            const fallbackStats = {
                followerCount: 0,
                bottomOdos: [0, 0],
                error: true
            };
            
            const subCountElem = document.querySelector('#subscriber-count');
            if (subCountElem) {
                const subText = subCountElem.textContent;
                const subMatch = subText.match(/[\d,]+/);
                if (subMatch) {
                    fallbackStats.followerCount = parseInt(subMatch[0].replace(/,/g, ''));
                }
            }
            
            return fallbackStats;
            
        } catch (error) {
            console.error('Error fetching channel stats:', error);
            throw error;
        }
    }

    function clearExistingOverlay() {
        const existingOverlay = document.querySelector('.channel-banner-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        lastSuccessfulStats.clear();
        previousStats.clear();
        isUpdating = false;
        overlay = null;
    }

    function createDigitElement() {
        const digit = document.createElement('span');
        Object.assign(digit.style, {
            display: 'inline-block',
            width: '0.6em',
            textAlign: 'center',
            marginRight: '0.025em',
            marginLeft: '0.025em'
        });
        return digit;
    }

    function createCommaElement() {
        const comma = document.createElement('span');
        comma.textContent = ',';
        Object.assign(comma.style, {
            display: 'inline-block',
            width: '0.3em',
            textAlign: 'center'
        });
        return comma;
    }

    function createNumberContainer() {
        const container = document.createElement('div');
        Object.assign(container.style, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            letterSpacing: '0.025em'
        });
        return container;
    }

    function updateDigits(container, newValue) {
        const newValueStr = newValue.toString();
        const digits = [];
    
        for (let i = newValueStr.length - 1; i >= 0; i -= 3) {
            const start = Math.max(0, i - 2);
            digits.unshift(newValueStr.slice(start, i + 1));
        }
    
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        let digitIndex = 0;
    
        for (let i = 0; i < digits.length; i++) {
            const group = digits[i];
            for (let j = 0; j < group.length; j++) {
                const digitElement = createDigitElement();
                digitElement.textContent = group[j];
                container.appendChild(digitElement);
                digitIndex++;
            }
            if (i < digits.length - 1) {
                container.appendChild(createCommaElement());
            }
        }
    
        let elementIndex = 0;
        for (let i = 0; i < digits.length; i++) {
            const group = digits[i];
            for (let j = 0; j < group.length; j++) {
                const digitElement = container.children[elementIndex];
                const newDigit = parseInt(group[j]);
                const currentDigit = parseInt(digitElement.textContent || '0');
    
                if (currentDigit !== newDigit) {
                    animateDigit(digitElement, currentDigit, newDigit);
                }
                elementIndex++;
            }
            if (i < digits.length - 1) {
                elementIndex++;
            }
        }
    }

    function animateDigit(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(start + (end - start) * easeOutQuart);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function showContent(overlay) {
        const spinnerContainer = overlay.querySelector('.spinner-container');
        if (spinnerContainer) {
            spinnerContainer.remove();
        }

        const containers = overlay.querySelectorAll('div[style*="visibility: hidden"]');
        containers.forEach(container => {
            container.style.visibility = 'visible';
        });

        const icons = overlay.querySelectorAll('svg[style*="display: none"]');
        icons.forEach(icon => {
            icon.style.display = 'block';
        });
    }

    function updateDifferenceElement(element, currentValue, previousValue) {
        if (!previousValue) return;
    
        const difference = currentValue - previousValue;
        if (difference === 0) {
            element.textContent = '';
            return;
        }
    
        const sign = difference > 0 ? '+' : '';
        element.textContent = `${sign}${difference.toLocaleString()}`;
        element.style.color = difference > 0 ? '#1ed760' : '#f3727f';
    
        setTimeout(() => {
            element.textContent = '';
        }, 1000);
    }

    function updateDisplayState() {
        const overlay = document.querySelector('.channel-banner-overlay');
        if (!overlay) return;
    
        const statContainers = overlay.querySelectorAll('div[style*="width"]');
        if (!statContainers.length) return;
    
        let visibleCount = 0;
        const visibleContainers = [];
    
        statContainers.forEach(container => {
            const numberContainer = container.querySelector('[class$="-number"]');
            if (!numberContainer) return;
            
            const type = numberContainer.className.replace('-number', '');
            
            const isVisible = localStorage.getItem(`show-${type}`) !== 'false';
            
            if (isVisible) {
                container.style.display = 'flex';
                visibleCount++;
                visibleContainers.push(container);
            } else {
                container.style.display = 'none';
            }
        });
    
        visibleContainers.forEach(container => {
            container.style.width = '';
            container.style.margin = '';
            
            switch (visibleCount) {
                case 1:
                    container.style.width = '100%';
                    break;
                case 2:
                    container.style.width = '50%';
                    break;
                case 3:
                    container.style.width = '33.33%';
                    break;
                default:
                    container.style.display = 'none';
            }
        });
    
        overlay.style.display = 'flex';
    }

    async function updateOverlayContent(overlay, channelName) {
        if (isUpdating || channelName !== currentChannelName) return;
        isUpdating = true;
        
        try {
            const channelId = await fetchChannelId(channelName);
            const stats = await fetchChannelStats(channelId);
            
            if (channelName !== currentChannelName) {
                isUpdating = false;
                return;
            }
            
            if (stats.error) {
                const containers = overlay.querySelectorAll('[class$="-number"]');
                containers.forEach(container => {
                    if (container.classList.contains('subscribers-number') && stats.followerCount > 0) {
                        updateDigits(container, stats.followerCount);
                    } else {
                        container.textContent = '---';
                    }
                });
                return;
            }

            const updateElement = (className, value, label) => {
                const numberContainer = overlay.querySelector(`.${className}-number`);
                const differenceElement = overlay.querySelector(`.${className}-difference`);
                const labelElement = overlay.querySelector(`.${className}-label`);
                
                if (numberContainer) {
                    updateDigits(numberContainer, value);
                }
                
                if (differenceElement && previousStats.has(channelId)) {
                    const previousValue = className === 'subscribers' ?
                        previousStats.get(channelId).followerCount :
                        previousStats.get(channelId).bottomOdos[className === 'views' ? 0 : 1];
                    updateDifferenceElement(differenceElement, value, previousValue);
                }
                
                if (labelElement) {
                    labelElement.textContent = label;
                }
            };
            
            updateElement('subscribers', stats.followerCount, 'Subscribers');
            updateElement('views', stats.bottomOdos[0], 'Views');
            updateElement('videos', stats.bottomOdos[1], 'Videos');
            
            if (!previousStats.has(channelId)) {
                showContent(overlay);
            }
            
            previousStats.set(channelId, stats);
            
        } catch (error) {
            console.error(`Error updating overlay: ${error.message}`);
            const containers = overlay.querySelectorAll('[class$="-number"]');
            containers.forEach(container => {
                container.textContent = '---';
            });
        } finally {
            isUpdating = false;
        }
    }

    function addOverlay(bannerElement) {
        const channelName = window.location.pathname.split("/")[1].replace("@", "");

        if (channelName === currentChannelName && overlay) {
            return;
        }

        currentChannelName = channelName;
        overlay = createOverlay(bannerElement);

        if (overlay) {
            if (intervalId) {
                clearInterval(intervalId);
            }

            intervalId = setInterval(() => {
                updateOverlayContent(overlay, channelName);
            }, updateInterval);

            updateOverlayContent(overlay, channelName);
        }
    }

    function isChannelPage() {
        return window.location.pathname.startsWith("/@") ||
               window.location.pathname.startsWith("/channel/") ||
               window.location.pathname.startsWith("/c/");
    }

    function observePageChanges() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    const bannerElement = document.getElementById('page-header-banner-sizer');
                    if (bannerElement && isChannelPage()) {
                        addOverlay(bannerElement);
                        break;
                    }
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function addNavigationListener() {
        window.addEventListener("yt-navigate-finish", () => {
            if (!isChannelPage()) {
                clearExistingOverlay();
                currentChannelName = null;
            } else {
                const bannerElement = document.getElementById('page-header-banner-sizer');
                if (bannerElement) {
                    addOverlay(bannerElement);
                }
            }
        });
    }

    init();
    console.log('YouTube Enhancer (Real-Time Subscriber Count) is running');
})();
