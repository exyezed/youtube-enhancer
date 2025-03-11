// ==UserScript==
// @name         YouTube Enhancer (Subtitle Downloader)
// @description  Download Subtitles in Various Languages.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.2
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @connect      downsub.vercel.app
// @connect      download.subtitle.to
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

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

    function createSearchIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        
        path.setAttribute("d", "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z");
        
        svg.appendChild(path);
        return svg;
    }

    function createCheckIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.classList.add("check-icon");
        
        path.setAttribute("d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z");
        
        svg.appendChild(path);
        return svg;
    }

    function getVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    function createTableElement(tag, text = null) {
        const element = document.createElement(tag);
        if (text !== null) {
            element.textContent = text;
        }
        return element;
    }

    function downloadSubtitle(url, filename, format, buttonElement) {
        try {
            const buttonHeight = buttonElement.offsetHeight;
            const buttonWidth = buttonElement.offsetWidth;
            
            const originalChildren = Array.from(buttonElement.childNodes).map(node => node.cloneNode(true));
            
            while (buttonElement.firstChild) {
                buttonElement.removeChild(buttonElement.firstChild);
            }
            
            buttonElement.style.height = `${buttonHeight}px`;
            buttonElement.style.width = `${buttonWidth}px`;
            
            const spinner = document.createElement('div');
            spinner.className = 'button-spinner';
            buttonElement.appendChild(spinner);
            buttonElement.disabled = true;
            
            GM_download({
                url: url,
                name: filename,
                onload: function() {
                    while (buttonElement.firstChild) {
                        buttonElement.removeChild(buttonElement.firstChild);
                    }
                    
                    buttonElement.appendChild(createCheckIcon());
                    buttonElement.classList.add('download-success');
                    
                    setTimeout(() => {
                        while (buttonElement.firstChild) {
                            buttonElement.removeChild(buttonElement.firstChild);
                        }
                        
                        originalChildren.forEach(child => {
                            buttonElement.appendChild(child.cloneNode(true));
                        });
                        
                        buttonElement.disabled = false;
                        buttonElement.classList.remove('download-success');
                        
                        buttonElement.style.height = '';
                        buttonElement.style.width = '';
                    }, 1500);
                },
                onerror: function(error) {
                    console.error('Download error:', error);
                    
                    while (buttonElement.firstChild) {
                        buttonElement.removeChild(buttonElement.firstChild);
                    }
                    
                    originalChildren.forEach(child => {
                        buttonElement.appendChild(child.cloneNode(true));
                    });
                    
                    buttonElement.disabled = false;
                    
                    buttonElement.style.height = '';
                    buttonElement.style.width = '';
                }
            });
        } catch (error) {
            console.error('Download setup error:', error);
            
            while (buttonElement.firstChild) {
                buttonElement.removeChild(buttonElement.firstChild);
            }
            
            buttonElement.textContent = format;
            
            buttonElement.disabled = false;
            
            buttonElement.style.height = '';
            buttonElement.style.width = '';
        }
    }

    function filterSubtitles(subtitles, query) {
        if (!query) return subtitles;
        
        const lowerQuery = query.toLowerCase();
        return subtitles.filter(sub => 
            sub.name.toLowerCase().includes(lowerQuery)
        );
    }

    function createSubtitleTable(subtitles, autoTransSubs, videoTitle) {
        const container = document.createElement('div');
        container.className = 'subtitle-container';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'subtitle-dropdown-title';
        titleDiv.textContent = `Download Subtitles (${subtitles.length + autoTransSubs.length})`;
        container.appendChild(titleDiv);
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'subtitle-search-container';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'subtitle-search-input';
        searchInput.placeholder = 'Search languages...';
        
        const searchIcon = document.createElement('div');
        searchIcon.className = 'subtitle-search-icon';
        searchIcon.appendChild(createSearchIcon());
        
        searchContainer.appendChild(searchIcon);
        searchContainer.appendChild(searchInput);
        container.appendChild(searchContainer);

        const tabsDiv = document.createElement('div');
        tabsDiv.className = 'subtitle-tabs';

        const regularTab = document.createElement('div');
        regularTab.className = 'subtitle-tab active';
        regularTab.textContent = 'Original';
        regularTab.dataset.tab = 'regular';

        const autoTab = document.createElement('div');
        autoTab.className = 'subtitle-tab';
        autoTab.textContent = 'Auto Translate';
        autoTab.dataset.tab = 'auto';

        tabsDiv.appendChild(regularTab);
        tabsDiv.appendChild(autoTab);
        container.appendChild(tabsDiv);

        const itemsPerPage = 30;
        
        const regularContent = createSubtitleContent(subtitles, videoTitle, true, itemsPerPage);
        regularContent.className = 'subtitle-content regular-content active';

        const autoContent = createSubtitleContent(autoTransSubs, videoTitle, false, itemsPerPage);
        autoContent.className = 'subtitle-content auto-content';

        container.appendChild(regularContent);
        container.appendChild(autoContent);

        tabsDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('subtitle-tab')) {
                document.querySelectorAll('.subtitle-tab').forEach(tab => tab.classList.remove('active'));
                document.querySelectorAll('.subtitle-content').forEach(content => content.classList.remove('active'));

                e.target.classList.add('active');
                const tabType = e.target.dataset.tab;
                document.querySelector(`.${tabType}-content`).classList.add('active');
                
                searchInput.value = '';
                
                const activeContent = document.querySelector(`.${tabType}-content`);
                const grid = activeContent.querySelector('.subtitle-grid');
                
                if (tabType === 'regular') {
                    renderPage(1, subtitles, grid, itemsPerPage, videoTitle);
                } else {
                    renderPage(1, autoTransSubs, grid, itemsPerPage, videoTitle);
                }
                
                const pagination = activeContent.querySelector('.subtitle-pagination');
                updatePagination(
                    1, 
                    Math.ceil((tabType === 'regular' ? subtitles : autoTransSubs).length / itemsPerPage),
                    pagination,
                    null,
                    grid,
                    tabType === 'regular' ? subtitles : autoTransSubs,
                    itemsPerPage,
                    videoTitle
                );
            }
        });
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            const activeTab = document.querySelector('.subtitle-tab.active').dataset.tab;
            const activeContent = document.querySelector(`.${activeTab}-content`);
            const grid = activeContent.querySelector('.subtitle-grid');
            const pagination = activeContent.querySelector('.subtitle-pagination');
            
            const sourceSubtitles = activeTab === 'regular' ? subtitles : autoTransSubs;
            const filteredSubtitles = filterSubtitles(sourceSubtitles, query);
            
            renderPage(1, filteredSubtitles, grid, itemsPerPage, videoTitle);
            updatePagination(
                1, 
                Math.ceil(filteredSubtitles.length / itemsPerPage), 
                pagination, 
                filteredSubtitles,
                grid,
                sourceSubtitles,
                itemsPerPage,
                videoTitle
            );
            
            grid.dataset.filteredCount = filteredSubtitles.length;
            grid.dataset.query = query;
        });

        return container;
    }

    function renderPage(page, subtitlesList, gridElement, itemsPerPage, videoTitle) {
        while (gridElement.firstChild) {
            gridElement.removeChild(gridElement.firstChild);
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, subtitlesList.length);

        for (let i = startIndex; i < endIndex; i++) {
            const sub = subtitlesList[i];
            const item = document.createElement('div');
            item.className = 'subtitle-item';

            const langLabel = document.createElement('div');
            langLabel.className = 'subtitle-language';
            langLabel.textContent = sub.name;
            item.appendChild(langLabel);

            const btnContainer = document.createElement('div');
            btnContainer.className = 'subtitle-format-container';

            const srtBtn = document.createElement('button');
            srtBtn.textContent = 'SRT';
            srtBtn.className = 'subtitle-format-btn srt-btn';
            srtBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadSubtitle(sub.download.srt, `${videoTitle} - ${sub.name}.srt`, 'SRT', srtBtn);
            });
            btnContainer.appendChild(srtBtn);

            const txtBtn = document.createElement('button');
            txtBtn.textContent = 'TXT';
            txtBtn.className = 'subtitle-format-btn txt-btn';
            txtBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadSubtitle(sub.download.txt, `${videoTitle} - ${sub.name}.txt`, 'TXT', txtBtn);
            });
            btnContainer.appendChild(txtBtn);

            item.appendChild(btnContainer);
            gridElement.appendChild(item);
        }
    }

    function updatePagination(page, totalPages, paginationElement, filteredSubs, gridElement, sourceSubtitles, itemsPerPage, videoTitle) {
        while (paginationElement.firstChild) {
            paginationElement.removeChild(paginationElement.firstChild);
        }

        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '«';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = page === 1;
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (page > 1) {
                const newPage = page - 1;
                const query = gridElement.dataset.query;
                const subsToUse = query && filteredSubs ? filteredSubs : sourceSubtitles;
                
                renderPage(newPage, subsToUse, gridElement, itemsPerPage, videoTitle);
                updatePagination(
                    newPage, 
                    totalPages, 
                    paginationElement, 
                    filteredSubs,
                    gridElement,
                    sourceSubtitles,
                    itemsPerPage,
                    videoTitle
                );
            }
        });
        paginationElement.appendChild(prevBtn);

        const pageIndicator = document.createElement('span');
        pageIndicator.className = 'page-indicator';
        pageIndicator.textContent = `${page} / ${totalPages}`;
        paginationElement.appendChild(pageIndicator);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '»';
        nextBtn.className = 'pagination-btn';
        nextBtn.disabled = page === totalPages;
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (page < totalPages) {
                const newPage = page + 1;
                const query = gridElement.dataset.query;
                const subsToUse = query && filteredSubs ? filteredSubs : sourceSubtitles;
                
                renderPage(newPage, subsToUse, gridElement, itemsPerPage, videoTitle);
                updatePagination(
                    newPage, 
                    totalPages, 
                    paginationElement, 
                    filteredSubs,
                    gridElement,
                    sourceSubtitles,
                    itemsPerPage,
                    videoTitle
                );
            }
        });
        paginationElement.appendChild(nextBtn);
    }

    function createSubtitleContent(subtitles, videoTitle, isOriginal, itemsPerPage) {
        const content = document.createElement('div');
        let currentPage = 1;

        const grid = document.createElement('div');
        grid.className = 'subtitle-grid';
        
        if (isOriginal && subtitles.length <= 6) {
            grid.classList.add('center-grid');
        }
        
        grid.dataset.filteredCount = subtitles.length;
        grid.dataset.query = '';

        const pagination = document.createElement('div');
        pagination.className = 'subtitle-pagination';

        renderPage(currentPage, subtitles, grid, itemsPerPage, videoTitle);
        updatePagination(
            currentPage, 
            Math.ceil(subtitles.length / itemsPerPage), 
            pagination, 
            null,
            grid,
            subtitles,
            itemsPerPage,
            videoTitle
        );

        content.appendChild(grid);
        content.appendChild(pagination);

        return content;
    }

    async function handleSubtitleDownload(e) {
        e.preventDefault();
        const videoId = getVideoId();

        if (!videoId) {
            console.error('Video ID not found');
            return;
        }

        const backdrop = document.createElement('div');
        backdrop.className = 'subtitle-backdrop';
        document.body.appendChild(backdrop);

        const loader = document.createElement('div');
        loader.className = 'subtitle-loader';
        backdrop.appendChild(loader);

        try {
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: `https://downsub.vercel.app/${videoId}`,
                    headers: {
                        'Accept': 'application/json'
                    },
                    responseType: 'json',
                    onload: function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            resolve(response.response);
                        } else {
                            reject(new Error(`Request failed with status ${response.status}`));
                        }
                    },
                    onerror: function(error) {
                        reject(new Error('Network error'));
                    }
                });
            });

            const videoTitleElement = document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata');
            const videoTitle = videoTitleElement ? videoTitleElement.textContent.trim() : `youtube_video_${videoId}`;

            loader.remove();

            if (!response.subtitles || response.subtitles.length === 0 &&
                (!response.subtitlesAutoTrans || response.subtitlesAutoTrans.length === 0)) {
                while (backdrop.firstChild) {
                    backdrop.removeChild(backdrop.firstChild);
                }
                const errorDiv = document.createElement('div');
                errorDiv.className = 'subtitle-error';
                errorDiv.textContent = 'No subtitles available for this video';
                backdrop.appendChild(errorDiv);

                setTimeout(() => {
                    backdrop.remove();
                }, 2000);
                return;
            }

            const subtitleTable = createSubtitleTable(
                response.subtitles || [],
                response.subtitlesAutoTrans || [],
                videoTitle
            );
            backdrop.appendChild(subtitleTable);

            backdrop.addEventListener('click', (e) => {
                if (!subtitleTable.contains(e.target)) {
                    subtitleTable.remove();
                    backdrop.remove();
                }
            });

            subtitleTable.addEventListener('click', (e) => {
                e.stopPropagation();
            });

        } catch (error) {
            console.error('Error fetching subtitles:', error);

            while (backdrop.firstChild) {
                backdrop.removeChild(backdrop.firstChild);
            }
            const errorDiv = document.createElement('div');
            errorDiv.className = 'subtitle-error';
            errorDiv.textContent = 'Error fetching subtitles. Please try again.';
            backdrop.appendChild(errorDiv);

            setTimeout(() => {
                backdrop.remove();
            }, 2000);
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
            .subtitle-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(3px);
            }
            .subtitle-loader {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top: 4px solid #fff;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .subtitle-error {
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 16px 24px;
                border-radius: 8px;
                font-size: 14px;
            }
            .subtitle-container {
                position: relative;
                background: rgba(28, 28, 28, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 16px;
                z-index: 9999;
                min-width: 700px;
                max-width: 90vw;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                color: #fff;
                font-family: 'Roboto', Arial, sans-serif;
            }
            .subtitle-dropdown-title {
                color: #fff;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 16px;
                text-align: center;
            }
            .subtitle-search-container {
                position: relative;
                margin-bottom: 16px;
                width: 100%;
                max-width: 100%;
            }
            .subtitle-search-input {
                width: 100%;
                padding: 8px 12px 8px 36px;
                border-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 14px;
                box-sizing: border-box;
            }
            .subtitle-search-input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            .subtitle-search-input:focus {
                outline: none;
                border-color: rgba(255, 255, 255, 0.4);
                background: rgba(255, 255, 255, 0.15);
            }
            .subtitle-search-icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .subtitle-search-icon svg {
                fill: rgba(255, 255, 255, 0.5);
            }
            .subtitle-tabs {
                display: flex;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 16px;
                justify-content: center;
            }
            .subtitle-tab {
                padding: 10px 20px;
                cursor: pointer;
                opacity: 0.7;
                transition: all 0.2s;
                border-bottom: 2px solid transparent;
                font-size: 15px;
                font-weight: 500;
            }
            .subtitle-tab:hover {
                opacity: 1;
            }
            .subtitle-tab.active {
                opacity: 1;
                border-bottom: 2px solid #2b7fff;
            }
            .subtitle-content {
                display: none;
            }
            .subtitle-content.active {
                display: block;
            }
            .subtitle-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-bottom: 16px;
            }
            .subtitle-grid.center-grid {
                justify-content: center;
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
            }
            .center-grid .subtitle-item {
                width: 200px;
            }
            .subtitle-item {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 6px;
                padding: 10px;
                transition: all 0.2s;
            }
            .subtitle-item:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            .subtitle-language {
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .subtitle-format-container {
                display: flex;
                gap: 8px;
            }
            .subtitle-format-btn {
                flex: 1;
                padding: 6px 0;
                border-radius: 4px;
                border: none;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                text-align: center;
                position: relative;
                height: 28px;
                line-height: 16px;
            }
            .button-spinner {
                width: 14px;
                height: 14px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top: 2px solid #fff;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            .check-icon {
                width: 14px;
                height: 14px;
                fill: white;
                margin: 0 auto;
            }
            .download-success {
                background-color: #00a63e !important;
            }
            .srt-btn {
                background-color: #2b7fff;
                color: white;
            }
            .srt-btn:hover {
                background-color: #50a2ff;
            }
            .txt-btn {
                background-color: #615fff;
                color: white;
            }
            .txt-btn:hover {
                background-color: #7c86ff;
            }
            .subtitle-pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
            }
            .pagination-btn {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                transition: all 0.2s;
            }
            .pagination-btn:not(:disabled):hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .pagination-btn:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            .page-indicator {
                margin: 0 16px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
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
            const existingDropdown = document.querySelector('.subtitle-container');
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

    function addSubtitleButton() {
        initializeObserver();
    }

    addSubtitleButton();
})();