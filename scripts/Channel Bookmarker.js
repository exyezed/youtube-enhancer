// ==UserScript==
// @name         YouTube Enhancer (Channel Bookmarker)
// @description  Bookmark and manage YouTube channels with detailed information.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.1
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @require      https://cdn.jsdelivr.net/npm/dayjs@1.11.15/dayjs.min.js
// @require      https://cdn.jsdelivr.net/npm/dexie@4.2.0/dist/dexie.min.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.27.1/dist/preact.min.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.27.1/hooks/dist/hooks.umd.js
// @require      https://cdn.jsdelivr.net/npm/file-saver-es@2.0.5/dist/FileSaver.min.js
// @require      https://cdn.jsdelivr.net/npm/lucide-preact@0.544.0/dist/umd/lucide-preact.min.js
// @require      https://cdn.jsdelivr.net/npm/@preact/signals-core@1.12.1/dist/signals-core.min.js
// @resource     flagIcons https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/css/flag-icons.min.css
// @connect      channelinfo.vercel.app
// ==/UserScript==

(function() {
    'use strict';

    const { h, render } = preact;
    const { useState, useEffect, useRef } = preactHooks;
    const { signal, effect } = preactSignalsCore;

    const Icon = (iconName, { size = 16, color = 'currentColor', className = '', ...props } = {}) => {
        const IconComponent = LucidePreact[iconName];
        if (!IconComponent) {
            console.warn(`Lucide icon "${iconName}" not found`);
            return null;
        }
        return h(IconComponent, {
            size,
            color,
            class: className,
            ...props
        });
    };

    const db = new Dexie('ChannelBookmarker');
    db.version(2).stores({
        channels: 'channelId, title, customUrl, country, subscriberCount, videoCount, viewCount, publishedAt, timestamp, category'
    });

    async function shredAllData() {
        try {
            await db.channels.clear();

            state.cachedChannels.value = [];
            state.selectedChannel.value = null;
            state.channelData.value = null;

            await loadCachedChannels();

            state.success.value = 'All channel data has been permanently deleted';
            setTimeout(() => {
                if (state.success.value === 'All channel data has been permanently deleted') {
                    state.success.value = null;
                }
            }, 2000);

            if (state.activeTab.value === 'database') {
                const event = new Event('databaseUpdated');
                window.dispatchEvent(event);
            }
        } catch (error) {
            console.error('Failed to shred data:', error);
            state.error.value = 'Failed to delete all data: ' + error.message;
            state.errorType.value = 'general';
            setTimeout(() => {
                if (state.error.value && state.error.value.startsWith('Failed to delete all data')) {
                    state.error.value = null;
                }
            }, 2000);
        }
    }

    const state = {
        isModalOpen: signal(false),
        activeTab: signal('dashboard'),
        isLoading: signal(false),
        channelData: signal(null),
        error: signal(null),
        errorType: signal('general'),
        success: signal(null),
        theme: signal('light'),
        currentChannelInfo: signal(''),
        databasePage: signal(1),
        selectedChannel: signal(null),
        showDetailModal: signal(false),
        cachedChannels: signal([]),
        showConfirmDialog: signal(false),
        confirmAction: signal(null),
        confirmMessage: signal(''),
        categoryInput: signal(''),
        showFilterDropdown: signal(false),
        selectedCategory: signal('All Categories'),
        showDashboardCategoryDropdown: signal(false),
        dashboardCategories: signal([])
    };

    async function loadSettings() {
        try {
            const theme = localStorage.getItem('cb_theme') || 'light';
            state.theme.value = theme;
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    }

    async function saveSettings() {
        try {
            localStorage.setItem('cb_theme', state.theme.value);
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    const flagIconsCSS = GM_getResourceText('flagIcons');
    const fixedCSS = flagIconsCSS.replace(/url\(\.\.\//g, 'url(https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/');
    GM_addStyle(fixedCSS);

    const styles = `
    .cb-modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease-out;}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .cb-modal{width:90%;max-width:700px;max-height:80vh;border-radius:12px;overflow:hidden;animation:slideUp .3s ease-out;box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04);box-sizing:border-box;}
    .cb-modal.dark{background:hsl(240 5.9% 10%);color:hsl(240 4.8% 95.9%);border:1px solid hsl(240 5% 40% / .5);box-shadow:0 0 0 1px hsl(240 5% 35% / .2),0 20px 25px -5px rgba(0,0,0,.3),0 10px 10px -5px rgba(0,0,0,.2);}
    .cb-modal.light{background:#fff;color:hsl(240 5.9% 10%);border:1px solid hsl(240 5.9% 90%);}
    .cb-header{padding:20px;border-bottom:1px solid;display:flex;justify-content:space-between;align-items:center;}
    .dark .cb-header{border-color:hsl(240 3.7% 15.9%);}
    .light .cb-header{border-color:hsl(240 5.9% 90%);}
    .cb-header-title{font-size:16px;font-weight:600;color:hsl(0 84% 60%);}
    .cb-header-controls{display:flex;gap:8px;align-items:center;}
    .cb-theme-toggle{padding:8px;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;}
    .dark .cb-theme-toggle{background:hsl(240 3.7% 15.9%);}
    .dark .cb-theme-toggle:hover{background:hsl(240 5.3% 26.1%);}
    .light .cb-theme-toggle{background:hsl(240 5.9% 95%);}
    .light .cb-theme-toggle:hover{background:hsl(240 5.9% 90%);}
    .cb-close-btn{padding:8px;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;}
    .dark .cb-close-btn{background:hsl(240 3.7% 15.9%);}
    .dark .cb-close-btn:hover{background:hsl(0deg 84.2% 60.2% / .2);}
    .dark .cb-close-btn:hover svg{stroke:hsl(0deg 84.2% 60.2%);}
    .light .cb-close-btn{background:hsl(240 5.9% 95%);}
    .light .cb-close-btn:hover{background:hsl(0deg 84.2% 60.2% / .1);}
    .light .cb-close-btn:hover svg{stroke:hsl(0deg 84.2% 60.2%);}
    .cb-tabs{display:flex;padding:0 20px;gap:16px;border-bottom:1px solid;}
    .dark .cb-tabs{border-color:hsl(240 3.7% 15.9%);}
    .light .cb-tabs{border-color:hsl(240 5.9% 90%);}
    .cb-tab{padding:12px 0;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;font-weight:500;font-size:14px;}
    .dark .cb-tab{color:hsl(240 5% 64.9%);}
    .light .cb-tab{color:hsl(240 3.8% 46.1%);}
    .cb-tab:hover{color:hsl(0 84% 60%);}
    .cb-tab.active{color:hsl(0 84% 60%);border-bottom-color:hsl(0 84% 60%);}
    .cb-content{padding:20px;min-height:150px;max-height:calc(80vh - 150px);overflow-y:auto;display:flex;flex-direction:column;box-sizing:border-box;overflow-x:hidden;}
    .cb-button{padding:8px 16px;border-radius:8px;font-weight:500;cursor:pointer;transition:all .2s;border:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;margin:0;font-size:14px;}
    .cb-button-container{display:flex;justify-content:center;margin-top:15px;}
    .cb-button-primary{background:hsl(0 84% 60%);color:#fff;}
    .cb-button-primary:hover{background:hsl(0 84% 50%);}
    .cb-button-primary:disabled{opacity:.5;cursor:not-allowed;}
    .cb-button-secondary{background:hsl(142.1deg 76.2% 36.3%);color:#fff;}
    .cb-button-secondary:hover{background:hsl(142.1deg 76.2% 30%);}
    .cb-button-secondary:disabled{opacity:.5;cursor:not-allowed;}
    .cb-button-outline{background:transparent;border:1px solid;}
    .dark .cb-button-outline{border-color:hsl(240 5.3% 26.1%);color:hsl(240 4.8% 95.9%);}
    .dark .cb-button-outline:hover{background:hsl(240 3.7% 15.9%);}
    .light .cb-button-outline{border-color:hsl(240 5.9% 85%);color:hsl(240 5.9% 10%);}
    .light .cb-button-outline:hover{background:hsl(240 5.9% 95%);}
    .cb-button-outline:disabled{opacity:.5;cursor:not-allowed;}
    .cb-button-square{width:40px;height:40px;padding:0;display:flex;align-items:center;justify-content:center;border-radius:8px;flex-shrink:0;}
    .cb-spinner{animation:spin 1s linear infinite;display:inline-flex;align-items:center;justify-content:center;}
    .cb-error{padding:12px;border-radius:8px;margin-bottom:20px;display:flex;align-items:center;gap:8px;font-size:14px;}
    .cb-error.general{background:hsl(0deg 84.2% 60.2% / .1);color:hsl(0deg 84.2% 60.2%);}
    .cb-error-icon{flex-shrink:0;display:flex;align-items:center;}
    .cb-success{padding:12px;border-radius:8px;background:hsl(142.1deg 76.2% 36.3% / .1);color:hsl(142.1deg 76.2% 36.3%);margin-bottom:20px;display:flex;align-items:center;gap:8px;font-size:14px;}
    .cb-success-icon{flex-shrink:0;display:flex;align-items:center;}
    .cb-info-card{padding:16px;border-radius:8px;margin-bottom:20px;}
    .dark .cb-info-card{background:hsl(240 3.7% 15.9%);border:1px solid hsl(240 5.3% 26.1%);}
    .light .cb-info-card{background:hsl(240 4.8% 95.9%);border:1px solid hsl(240 5.9% 90%);}
    .cb-info-row{display:flex;justify-content:space-between;margin-bottom:8px;}
    .cb-info-row:last-child{margin-bottom:0;}
    .cb-info-label{font-weight:500;font-size:14px;}
    .cb-channel-item{padding:12px;border-radius:8px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all .2s;}
    .dark .cb-channel-item{background:hsl(240 3.7% 15.9%);border:1px solid hsl(240 5.3% 26.1%);}
    .light .cb-channel-item{background:hsl(240 4.8% 95.9%);border:1px solid hsl(240 5.9% 90%);}
    .cb-channel-item:hover{border-color:hsl(0 84% 60%);}
    .cb-channel-info{flex:1;display:flex;align-items:center;gap:12px;}
    .cb-channel-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;}
    .cb-channel-details{flex:1;}
    .cb-channel-name{font-weight:600;cursor:pointer;color:hsl(0 84% 60%);text-decoration:none;font-size:15px;}
    .cb-channel-name:hover{text-decoration:none;opacity:0.8;}
    .cb-channel-stats{display:flex;gap:16px;margin-top:4px;font-size:13px;opacity:.8;}
    .cb-channel-stat{display:flex;align-items:center;gap:4px;}
    .cb-channel-actions{display:flex;gap:6px;}
    .cb-channel-number{}
    .dark .cb-channel-number{background:hsl(240 5.3% 26.1%);color:hsl(240 4.8% 95.9%);}
    .light .cb-channel-number{background:hsl(240 5.9% 90%);color:hsl(240 5.9% 10%);}
    .cb-icon-button{background:transparent;border:1px solid;padding:8px;cursor:pointer;border-radius:6px;transition:all .3s ease;display:inline-flex;align-items:center;justify-content:center;opacity:.7;}
    .dark .cb-icon-button{border-color:hsl(240 5.3% 26.1%);}
    .light .cb-icon-button{border-color:hsl(240 5.9% 85%);}
    .dark .cb-icon-button svg{stroke:hsl(240 4.8% 95.9%);}
    .light .cb-icon-button svg{stroke:hsl(240 5.9% 10%);}
    .cb-icon-button:hover{opacity:1;}
    .cb-icon-button.cb-info-button:hover{background:hsl(217deg 91.2% 59.8% / .1);border-color:hsl(217deg 91.2% 59.8%);}
    .cb-icon-button.cb-info-button:hover svg{stroke:hsl(217deg 91.2% 59.8%);transition:stroke .3s ease;}
    .cb-icon-button.cb-delete-button:hover{background:hsl(0deg 84.2% 60.2% / .1);border-color:hsl(0deg 84.2% 60.2%);}
    .cb-icon-button.cb-delete-button:hover svg{stroke:hsl(0deg 84.2% 60.2%);transition:stroke .3s ease;}
    .cb-pagination{margin-top:16px;}
    .cb-page-info{font-size:14px;}
    .cb-detail-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease-out;}
    .cb-detail-modal{width:90%;max-width:500px;max-height:80vh;border-radius:12px;overflow:hidden;animation:slideUp .3s ease-out;}
    .cb-detail-modal.dark{background:hsl(240 5.9% 10%);color:hsl(240 4.8% 95.9%);border:1px solid hsl(240 5% 40% / .5);}
    .cb-detail-modal.light{background:#fff;color:hsl(240 5.9% 10%);border:1px solid hsl(240 5.9% 90%);}
    .cb-detail-header{padding:20px;border-bottom:1px solid;display:flex;justify-content:space-between;align-items:center;}
    .dark .cb-detail-header{border-color:hsl(240 3.7% 15.9%);}
    .light .cb-detail-header{border-color:hsl(240 5.9% 90%);}
    .cb-detail-content{padding:20px;max-height:calc(80vh - 100px);overflow-y:auto;}
    .cb-detail-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid;}
    .dark .cb-detail-row{border-color:hsl(240 5% 20%);}
    .light .cb-detail-row{border-color:hsl(240 5.9% 95%);}
    .cb-detail-row:last-child{border-bottom:none;}
    .cb-detail-label{font-weight:600;color:hsl(0 84% 60%);font-size:14px;}
    .cb-detail-value{text-align:right;font-family:monospace;font-size:14px;}
    .cb-country-flag{display:inline-flex;align-items:center;gap:8px;}
    .cb-dashboard-url{padding:12px;border-radius:8px;margin-bottom:16px;font-family:monospace;font-size:14px;word-break:break-all;}
    .dark .cb-dashboard-url{background:hsl(240 3.7% 15.9%);border:1px solid hsl(240 5.3% 26.1%);}
    .light .cb-dashboard-url{background:hsl(240 4.8% 95.9%);border:1px solid hsl(240 5.9% 90%);}
    .cb-database-buttons{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:16px;}
    .cb-database-buttons-left{display:flex;align-items:center;gap:8px;}
    .cb-database-buttons-right{display:flex;align-items:center;gap:8px;}
    @keyframes fadeInScale{from{opacity:0;transform:scale(0.5);}to{opacity:1;transform:scale(1);}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.9;transform:scale(1.05);}}
    #cb-floating-bookmark-btn{position:fixed!important;z-index:999999!important;}
    #cb-floating-bookmark-btn:hover{transform:scale(1.1)!important;}
    #cb-floating-bookmark-btn:active{transform:scale(0.95)!important;}
    .cb-shred-button{transition:all .3s ease;}
    .cb-shred-button:hover{color:hsl(0deg 84.2% 60.2%)!important;border-color:hsl(0deg 84.2% 60.2%)!important;background:hsl(0deg 84.2% 60.2% / .1)!important;}
    .cb-shred-button:hover svg{stroke:hsl(0deg 84.2% 60.2%);transition:stroke .3s ease;}
    .cb-confirm-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:10001;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease-out;}
    .cb-confirm-dialog{width:90%;max-width:400px;border-radius:12px;overflow:hidden;animation:slideUp .3s ease-out;}
    .cb-confirm-dialog.dark{background:hsl(240 5.9% 10%);color:hsl(240 4.8% 95.9%);border:1px solid hsl(240 5% 40% / .5);}
    .cb-confirm-dialog.light{background:#fff;color:hsl(240 5.9% 10%);border:1px solid hsl(240 5.9% 90%);}
    .cb-confirm-header{padding:20px;text-align:center;}
    .cb-confirm-title{font-size:16px;font-weight:600;color:hsl(0 84% 60%);margin:0 0 12px 0;}
    .cb-confirm-message{margin:0;opacity:.9;font-size:14px;}
    .cb-confirm-buttons{display:flex;gap:12px;padding:0 20px 20px 20px;justify-content:center;}
    .cb-confirm-button{padding:8px 16px;border-radius:8px;font-weight:500;cursor:pointer;transition:all .2s;border:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;font-size:14px;}
    .cb-confirm-cancel{background:transparent;border:1px solid;}
    .dark .cb-confirm-cancel{border-color:hsl(240 5.3% 26.1%);color:hsl(240 4.8% 95.9%);}
    .dark .cb-confirm-cancel:hover{background:hsl(240 3.7% 15.9%);}
    .light .cb-confirm-cancel{border-color:hsl(240 5.9% 85%);color:hsl(240 5.9% 10%);}
    .light .cb-confirm-cancel:hover{background:hsl(240 5.9% 95%);}
    .cb-confirm-action{background:hsl(0deg 84.2% 60.2%);color:#fff;}
    .cb-confirm-action:hover{background:hsl(0deg 84.2% 50%);}
    .cb-category-input{padding:10px 12px;border-radius:8px;border:1px solid;font-size:14px;width:100%;max-width:100%;box-sizing:border-box;margin-bottom:16px;transition:all .2s;word-wrap:break-word;overflow-wrap:break-word;}
    .dark .cb-category-input{background:hsl(240 3.7% 15.9%);border-color:hsl(240 5.3% 26.1%);color:hsl(240 4.8% 95.9%);}
    .dark .cb-category-input:focus{border-color:hsl(0 84% 60%);outline:none;}
    .light .cb-category-input{background:#fff;border-color:hsl(240 5.9% 85%);color:hsl(240 5.9% 10%);}
    .light .cb-category-input:focus{border-color:hsl(0 84% 60%);outline:none;}
    .cb-category-input::placeholder{opacity:.5;}
    .cb-filter-container{position:relative;display:inline-block;}
    .cb-filter-dropdown{position:fixed;border-radius:8px;border:1px solid;margin-top:4px;max-height:200px;overflow-y:auto;z-index:10002;min-width:200px;}
    .dark .cb-filter-dropdown{background:hsl(240 3.7% 15.9%);border-color:hsl(240 5.3% 26.1%);box-shadow:0 10px 25px rgba(0,0,0,0.5);}
    .light .cb-filter-dropdown{background:#fff;border-color:hsl(240 5.9% 85%);box-shadow:0 10px 25px rgba(0,0,0,0.15);}
    .cb-filter-option{padding:8px 12px;cursor:pointer;font-size:14px;transition:all .2s;}
    .dark .cb-filter-option:hover{background:hsl(240 5.3% 26.1%);}
    .light .cb-filter-option:hover{background:hsl(240 5.9% 95%);}
    .cb-filter-option.selected{color:hsl(0 84% 60%);font-weight:500;}
    .cb-dashboard-category{position:relative;display:flex;flex-direction:column;gap:4px;margin-bottom:16px;width:100%;max-width:100%;box-sizing:border-box;}
    .cb-dashboard-category-label{font-size:12px;font-weight:500;opacity:.8;}
    .cb-category-select-container{position:relative;width:100%;max-width:100%;box-sizing:border-box;}
    .cb-category-select{padding:10px 12px;border-radius:8px;border:1px solid;font-size:14px;width:100%;max-width:100%;box-sizing:border-box;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:space-between;}
    .dark .cb-category-select{border-color:hsl(240 5.3% 26.1%);color:hsl(240 4.8% 95.9%);}
    .dark .cb-category-select:hover{border-color:hsl(0 84% 60%);}
    .light .cb-category-select{border-color:hsl(240 5.9% 85%);color:hsl(240 5.9% 10%);}
    .light .cb-category-select:hover{border-color:hsl(0 84% 60%);}
    .cb-category-select-text{flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .cb-category-select-text.placeholder{opacity:.5;}
    .cb-category-dropdown{position:fixed;border-radius:8px;border:1px solid;margin-top:4px;max-height:150px;overflow-y:auto;z-index:10002;min-width:200px;}
    .dark .cb-category-dropdown{background:hsl(240 3.7% 15.9%);border-color:hsl(240 5.3% 26.1%);box-shadow:0 10px 25px rgba(0,0,0,0.5);}
    .light .cb-category-dropdown{background:#fff;border-color:hsl(240 5.9% 85%);box-shadow:0 10px 25px rgba(0,0,0,0.15);}
    .cb-category-option{padding:8px 12px;cursor:pointer;font-size:14px;transition:all .2s;display:flex;align-items:center;gap:8px;}
    .dark .cb-category-option:hover{background:hsl(240 5.3% 26.1%);}
    .light .cb-category-option:hover{background:hsl(240 5.9% 95%);}
    .cb-category-option.add-new{opacity:.8;border-top:1px solid;}
    .dark .cb-category-option.add-new{border-color:hsl(240 5% 20%);}
    .light .cb-category-option.add-new{border-color:hsl(240 5.9% 95%);}
    `;

    GM_addStyle(styles);

    function parseChannelUrl(url) {
        if (!url) return null;

        const patterns = [
            /youtube\.com\/@([^\/\?]+)/,
            /youtube\.com\/channel\/([^\/\?]+)/,
            /youtube\.com\/c\/([^\/\?]+)/,
            /youtube\.com\/user\/([^\/\?]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }

        const currentUrl = window.location.href;
        for (const pattern of patterns) {
            const match = currentUrl.match(pattern);
            if (match) {
                return match[1];
            }
        }

        return null;
    }

    function formatNumber(num) {
        if (!num) return '0';
        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    function getCountryCode(countryCode) {
        return countryCode ? countryCode.toLowerCase() : 'un';
    }

    function formatChannelAge(publishedAt) {
        if (!publishedAt) return null;

        const now = new Date();
        const published = new Date(publishedAt);
        const diffTime = Math.abs(now - published);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);

        if (years > 0 && months > 0) {
            return `${years}y ${months}m ago`;
        } else if (years > 0) {
            return `${years}y ago`;
        } else if (months > 0) {
            return `${months}m ago`;
        } else {
            return `${diffDays}d ago`;
        }
    }

    function Modal() {
        const modalRef = useRef(null);

        useEffect(() => {
            function handleEscape(e) {
                const activeElement = document.activeElement;
                const isTyping = activeElement && (
                    activeElement.tagName === 'INPUT' ||
                    activeElement.tagName === 'TEXTAREA' ||
                    activeElement.tagName === 'SELECT' ||
                    activeElement.contentEditable === 'true'
                );

                if (e.key === 'Escape' && state.isModalOpen.value && !isTyping) {
                    state.isModalOpen.value = false;
                }
            }

            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }, []);

        const handleOverlayClick = (e) => {
            if (e.target === e.currentTarget) {
                const activeElement = document.activeElement;
                const isInputFocused = activeElement && (
                    activeElement.tagName === 'INPUT' ||
                    activeElement.tagName === 'TEXTAREA' ||
                    activeElement.tagName === 'SELECT'
                );

                if (!isInputFocused) {
                    state.isModalOpen.value = false;
                }
            }
        };

        const toggleTheme = () => {
            state.theme.value = state.theme.value === 'dark' ? 'light' : 'dark';
            saveSettings();
        };

        if (!state.isModalOpen.value) return null;

        return h('div', null,
            state.showDetailModal.value && h(DetailModal),
            state.showConfirmDialog.value && h(ConfirmDialog),
            h('div', {
                className: 'cb-modal-overlay',
                onClick: handleOverlayClick
            },
                h('div', {
                    className: `cb-modal ${state.theme.value}`,
                    ref: modalRef
                },
                    h('div', { className: 'cb-header' },
                        h('div', { className: 'cb-header-title' },
                            state.activeTab.value === 'dashboard' && state.currentChannelInfo.value ? 
                                state.currentChannelInfo.value : 'Channel Bookmarker'
                        ),
                        h('div', { className: 'cb-header-controls' },
                            h('div', {
                                className: 'cb-theme-toggle',
                                onClick: toggleTheme,
                                title: 'Toggle theme'
                            },
                                Icon(state.theme.value === 'dark' ? 'Sun' : 'Moon')
                            ),
                            h('div', {
                                className: 'cb-close-btn',
                                onClick: () => state.isModalOpen.value = false
                            },
                                Icon('X')
                            )
                        )
                    ),
                    h('div', { className: 'cb-tabs' },
                        h('div', {
                            className: `cb-tab ${state.activeTab.value === 'dashboard' ? 'active' : ''}`,
                            onClick: () => state.activeTab.value = 'dashboard'
                        }, 'Dashboard'),
                        h('div', {
                            className: `cb-tab ${state.activeTab.value === 'database' ? 'active' : ''}`,
                            onClick: () => state.activeTab.value = 'database'
                        }, `Database (${state.cachedChannels.value.length})`)
                    ),
                    h('div', { className: 'cb-content' },
                        state.success.value && h('div', { className: 'cb-success' },
                            h('span', { className: 'cb-success-icon' },
                                Icon('CheckCircle')
                            ),
                            h('span', null, state.success.value)
                        ),
                        state.error.value && h('div', {
                            className: `cb-error ${state.errorType.value}`
                        },
                            h('span', { className: 'cb-error-icon' },
                                Icon('AlertCircle')
                            ),
                            h('span', null, state.error.value)
                        ),
                        state.activeTab.value === 'dashboard' ? h(DashboardTab) : h(DatabaseTab)
                    )
                )
            )
        );
    }

    function DashboardTab() {
        const [channelInfo, setChannelInfo] = useState('');
        const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
        const selectRef = useRef(null);

        useEffect(() => {
            const parsed = parseChannelUrl(window.location.href);
            if (parsed) {
                setChannelInfo(parsed);
                state.currentChannelInfo.value = parsed;
            }
            loadDashboardCategories();
        }, []);

        useEffect(() => {
            loadDashboardCategories();
        }, [state.cachedChannels.value]);

        useEffect(() => {
            if (state.activeTab.value === 'dashboard') {
                loadDashboardCategories();
            }
        }, [state.activeTab.value]);

        const loadDashboardCategories = async () => {
            try {
                const allChannels = await db.channels.toArray();
                const categories = [...new Set(allChannels.map(ch => ch.category || 'Uncategorized'))]
                    .filter(cat => cat !== 'Uncategorized')
                    .sort();
                state.dashboardCategories.value = categories;
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        };

        const toggleCategoryDropdown = async () => {
            if (!state.showDashboardCategoryDropdown.value) {
                if (selectRef.current) {
                    const rect = selectRef.current.getBoundingClientRect();
                    setDropdownPosition({
                        top: rect.bottom,
                        left: rect.left,
                        width: rect.width
                    });
                }
                await loadDashboardCategories();
            }
            state.showDashboardCategoryDropdown.value = !state.showDashboardCategoryDropdown.value;
        };

        const selectDashboardCategory = (category) => {
            state.categoryInput.value = category;
            state.showDashboardCategoryDropdown.value = false;
        };

        useEffect(() => {
            const handleClickOutside = (event) => {
                const dropdown = event.target.closest('.cb-category-select-container');
                if (!dropdown) {
                    state.showDashboardCategoryDropdown.value = false;
                }
            };

            if (state.showDashboardCategoryDropdown.value) {
                document.addEventListener('click', handleClickOutside);
                return () => document.removeEventListener('click', handleClickOutside);
            }
        }, [state.showDashboardCategoryDropdown.value]);

        const bookmarkChannel = async () => {
            if (!channelInfo && !state.currentChannelInfo.value) {
                state.error.value = 'No channel URL detected';
                state.errorType.value = 'general';
                setTimeout(() => state.error.value = null, 2000);
                return;
            }

            state.isLoading.value = true;
            state.error.value = null;

            const channelId = channelInfo || state.currentChannelInfo.value;

            try {
                const response = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: `https://channelinfo.vercel.app/${channelId}`,
                        timeout: 15000,
                        onload: (res) => {
                            if (res.status === 200) {
                                try {
                                    const data = JSON.parse(res.responseText);
                                    resolve(data);
                                } catch (parseError) {
                                    reject(new Error('Invalid response format'));
                                }
                            } else {
                                reject(new Error(`API error (${res.status})`));
                            }
                        },
                        onerror: () => reject(new Error('Network error')),
                        ontimeout: () => reject(new Error('Request timeout'))
                    });
                });

                if (response.success && response.data) {
                    const channelData = response.data;

                    const existing = await db.channels.get(channelData.channelId);

                    await db.channels.put({
                        channelId: channelData.channelId,
                        title: channelData.title,
                        customUrl: channelData.customUrl,
                        country: channelData.country,
                        countryName: channelData.countryName,
                        subscriberCount: channelData.statistics?.subscriberCount || 0,
                        videoCount: channelData.statistics?.videoCount || 0,
                        viewCount: channelData.statistics?.viewCount || 0,
                        publishedAt: channelData.publishedAt,
                        thumbnails: channelData.thumbnails,
                        bannerExternalUrl: channelData.bannerExternalUrl,
                        status: channelData.status,
                        waybackMachine: channelData.waybackMachine,
                        timestamp: Date.now(),
                        category: state.categoryInput.value.trim() || 'Uncategorized',
                        fullData: channelData
                    });

                    state.channelData.value = channelData;
                    state.success.value = existing ?
                        `Channel "${channelData.title}" updated successfully!` :
                        `Channel "${channelData.title}" bookmarked successfully!`;
                    setTimeout(() => state.success.value = null, 2000);

                    await loadCachedChannels();
                    await loadDashboardCategories();
                } else {
                    throw new Error('Invalid API response');
                }
            } catch (error) {
                console.error('Failed to bookmark channel:', error);
                state.error.value = `Failed to bookmark channel: ${error.message}`;
                state.errorType.value = 'general';
                setTimeout(() => state.error.value = null, 2000);
            } finally {
                state.isLoading.value = false;
            }
        };

        return h('div', null,
            h('div', { className: 'cb-dashboard-category' },
                h('input', {
                    type: 'text',
                    className: 'cb-category-input',
                    placeholder: 'Enter category name',
                    value: state.categoryInput.value,
                    onInput: (e) => state.categoryInput.value = e.target.value,
                    style: { marginBottom: '12px' }
                }),
                h('div', { className: 'cb-category-select-container' },
                    h('div', {
                        className: 'cb-category-select',
                        onClick: toggleCategoryDropdown,
                        ref: selectRef
                    },
                        h('span', {
                            className: 'cb-category-select-text'
                        }, 'Select existing category'),
                        Icon('ChevronDown', { size: 14 })
                    ),
                    state.showDashboardCategoryDropdown.value && h('div', { 
                        className: 'cb-category-dropdown',
                        style: {
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            width: `${dropdownPosition.width}px`
                        }
                    },
                        state.dashboardCategories.value.length > 0 && state.dashboardCategories.value.map(category =>
                            h('div', {
                                key: category,
                                className: 'cb-category-option',
                                onClick: () => selectDashboardCategory(category)
                            },
                                Icon('Tag', { size: 14 }),
                                category
                            )
                        )
                    )
                )
            ),
            h('div', { className: 'cb-button-container' },
                h('button', {
                    className: 'cb-button cb-button-primary',
                    onClick: bookmarkChannel,
                    disabled: state.isLoading.value || (!channelInfo && !state.currentChannelInfo.value)
                },
                    state.isLoading.value ?
                        h('span', { className: 'cb-spinner', style: { width: '16px', height: '16px' } },
                            Icon('Loader2', { size: 16 })
                        ) :
                        Icon('BookmarkPlus'),
                    h('span', null, state.isLoading.value ? 'Bookmarking...' : 'Bookmark')
                )
            )
        );
    }

    async function loadCachedChannels() {
        try {
            const channels = await db.channels.toArray();
            state.cachedChannels.value = channels.sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error('Failed to load channels:', error);
        }
    }

    function showConfirmDialog(title, message, onConfirm) {
        state.confirmAction.value = {
            title,
            message,
            onConfirm
        };
        state.showConfirmDialog.value = true;
    }

    function DatabaseTab() {
        const [channels, setChannels] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [refreshKey, setRefreshKey] = useState(0);
        const [filteredChannels, setFilteredChannels] = useState([]);
        const [availableCategories, setAvailableCategories] = useState([]);
        const [filterDropdownPosition, setFilterDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
        const filterButtonRef = useRef(null);
        const itemsPerPage = 5;

        useEffect(() => {
            loadChannels();

            const handleUpdate = () => {
                loadChannels();
                setRefreshKey(prev => prev + 1);
            };

            window.addEventListener('databaseUpdated', handleUpdate);
            return () => window.removeEventListener('databaseUpdated', handleUpdate);
        }, [currentPage, refreshKey]);

        useEffect(() => {
            filterChannels();
        }, [state.selectedCategory.value, state.cachedChannels.value, currentPage]);

        const loadChannels = async () => {
            try {
                const allChannels = await db.channels.toArray();
                const sorted = allChannels.sort((a, b) => b.timestamp - a.timestamp);
                state.cachedChannels.value = sorted;

                const categoryCount = {};
                sorted.forEach(ch => {
                    const category = ch.category || 'Uncategorized';
                    categoryCount[category] = (categoryCount[category] || 0) + 1;
                });

                const categories = [...new Set(sorted.map(ch => ch.category || 'Uncategorized'))].sort();
                const categoriesWithCount = categories.map(cat => ({
                    name: cat,
                    count: categoryCount[cat] || 0
                })).filter(cat => cat.count > 0);

                const finalCategories = [
                    { name: 'All Categories', count: sorted.length },
                    ...categoriesWithCount
                ];
                
                setAvailableCategories(finalCategories);
                
                const categoryExists = finalCategories.some(cat => cat.name === state.selectedCategory.value);
                if (!categoryExists) {
                    state.selectedCategory.value = 'All Categories';
                }
            } catch (error) {
                console.error('Failed to load channels:', error);
                state.error.value = 'Failed to load channels';
                state.errorType.value = 'general';
                setTimeout(() => state.error.value = null, 2000);
            }
        };

        const filterChannels = () => {
            let filtered = state.cachedChannels.value;
            
            if (state.selectedCategory.value !== 'All Categories') {
                filtered = filtered.filter(ch => 
                    (ch.category || 'Uncategorized') === state.selectedCategory.value
                );
            }
            
            setFilteredChannels(filtered);
            
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setChannels(filtered.slice(start, end));
        };

        const toggleFilterDropdown = () => {
            if (!state.showFilterDropdown.value) {
                if (filterButtonRef.current) {
                    const rect = filterButtonRef.current.getBoundingClientRect();
                    setFilterDropdownPosition({
                        top: rect.bottom,
                        left: rect.left,
                        width: rect.width
                    });
                }
            }
            state.showFilterDropdown.value = !state.showFilterDropdown.value;
        };

        const selectCategory = (categoryName) => {
            state.selectedCategory.value = categoryName;
            state.showFilterDropdown.value = false;
            setCurrentPage(1);
        };

        useEffect(() => {
            const handleClickOutside = (event) => {
                const dropdown = event.target.closest('.cb-filter-container');
                if (!dropdown) {
                    state.showFilterDropdown.value = false;
                }
            };

            if (state.showFilterDropdown.value) {
                document.addEventListener('click', handleClickOutside);
                return () => document.removeEventListener('click', handleClickOutside);
            }
        }, [state.showFilterDropdown.value]);

        const deleteChannel = async (channelId) => {
            const channel = channels.find(c => c.channelId === channelId);
            const channelName = channel?.title || 'this channel';

            showConfirmDialog(
                `Remove "${channelName}"?`,
                'This channel will be removed from your bookmarks.',
                async () => {
                    try {
                        await db.channels.delete(channelId);
                        await loadChannels();
                        state.success.value = 'Channel removed successfully';
                        setTimeout(() => state.success.value = null, 2000);
                    } catch (error) {
                        console.error('Failed to delete channel:', error);
                        state.error.value = 'Failed to delete channel';
                        state.errorType.value = 'general';
                        setTimeout(() => state.error.value = null, 2000);
                    }
                }
            );
        };

        const shredAllChannels = async () => {
            showConfirmDialog(
                'Shred All Data?',
                'This will permanently delete ALL bookmarked channels. This action cannot be undone!',
                async () => {
                    await shredAllData();
                    await loadChannels();
                }
            );
        };

        const showChannelDetail = (channel) => {
            state.selectedChannel.value = channel;
            state.showDetailModal.value = true;
        };

        const exportData = async () => {
            try {
                const allChannels = await db.channels.toArray();
                const exportChannels = allChannels.map(ch => {
                    const exportData = ch.fullData || ch;
                    exportData.category = ch.category || 'Uncategorized';
                    return exportData;
                });
                const dataStr = JSON.stringify(exportChannels, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                saveAs(blob, `channel-bookmarks-${dayjs().format('YYYY-MM-DD-HHmmss')}.json`);
                state.success.value = 'Data exported successfully';
                setTimeout(() => state.success.value = null, 2000);
            } catch (error) {
                console.error('Failed to export data:', error);
                state.error.value = 'Failed to export data';
                state.errorType.value = 'general';
                setTimeout(() => state.error.value = null, 2000);
            }
        };

        const importData = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                try {
                    const text = await file.text();
                    const data = JSON.parse(text);

                    if (Array.isArray(data)) {
                        for (const item of data) {
                            if (item.channelId) {
                                await db.channels.put({
                                    channelId: item.channelId,
                                    title: item.title,
                                    customUrl: item.customUrl,
                                    country: item.country,
                                    countryName: item.countryName,
                                    subscriberCount: item.statistics?.subscriberCount || item.subscriberCount || 0,
                                    videoCount: item.statistics?.videoCount || item.videoCount || 0,
                                    viewCount: item.statistics?.viewCount || item.viewCount || 0,
                                    publishedAt: item.publishedAt,
                                    thumbnails: item.thumbnails,
                                    bannerExternalUrl: item.bannerExternalUrl,
                                    status: item.status,
                                    waybackMachine: item.waybackMachine,
                                    timestamp: item.timestamp || Date.now(),
                                    category: item.category || 'Uncategorized',
                                    fullData: item
                                });
                            }
                        }
                        await loadChannels();
                        state.success.value = `Imported ${data.length} channels successfully`;
                        setTimeout(() => state.success.value = null, 2000);
                    }
                } catch (error) {
                    console.error('Failed to import data:', error);
                    state.error.value = 'Failed to import data: Invalid file format';
                    state.errorType.value = 'general';
                    setTimeout(() => state.error.value = null, 2000);
                }
            };
            input.click();
        };

        const totalPages = Math.ceil(filteredChannels.length / itemsPerPage);

        return h('div', { style: { display: 'flex', flexDirection: 'column', height: '100%' } },
            h('div', { className: 'cb-database-buttons' },
                h('div', { className: 'cb-database-buttons-left' },
                    h('button', {
                        className: 'cb-button cb-button-outline',
                        onClick: importData
                    },
                        Icon('FileInput'),
                        h('span', null, 'Import')
                    ),
                    h('button', {
                        className: 'cb-button cb-button-outline',
                        onClick: exportData,
                        disabled: channels.length === 0
                    },
                        Icon('FileOutput'),
                        h('span', null, 'Export')
                    ),
                    h('button', {
                        className: 'cb-button cb-button-outline cb-shred-button',
                        onClick: shredAllChannels,
                        disabled: channels.length === 0,
                        title: 'Permanently delete all channels'
                    },
                        Icon('Shredder'),
                        h('span', null, 'Shred')
                    )
                ),
                h('div', { className: 'cb-database-buttons-right' },
                    h('div', { className: 'cb-filter-container' },
                        h('button', {
                            className: 'cb-button cb-button-outline',
                            onClick: toggleFilterDropdown,
                            disabled: availableCategories.length <= 1,
                            ref: filterButtonRef
                        },
                            Icon('Filter'),
                            h('span', null, state.selectedCategory.value === 'All Categories' ? 'Filter' : state.selectedCategory.value),
                            Icon('ChevronDown', { size: 14 })
                        ),
                        state.showFilterDropdown.value && h('div', { 
                            className: 'cb-filter-dropdown',
                            style: {
                                top: `${filterDropdownPosition.top}px`,
                                left: `${filterDropdownPosition.left}px`,
                                width: `${filterDropdownPosition.width}px`
                            }
                        },
                            availableCategories.map(category =>
                                h('div', {
                                    key: category.name,
                                    className: `cb-filter-option ${state.selectedCategory.value === category.name ? 'selected' : ''}`,
                                    onClick: () => selectCategory(category.name),
                                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                                },
                                    h('span', null, category.name),
                                    h('span', { 
                                        style: { 
                                            opacity: '0.6', 
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            backgroundColor: state.selectedCategory.value === category.name ? 'rgba(220, 38, 38, 0.1)' : 'rgba(128, 128, 128, 0.1)',
                                            padding: '2px 6px',
                                            borderRadius: '10px',
                                            minWidth: '20px',
                                            textAlign: 'center'
                                        }
                                    }, category.count)
                                )
                            )
                        )
                    )
                )
            ),
            h('div', { style: { flex: 1, overflow: 'auto' } },
                channels.length === 0 ?
                    h('div', { style: { textAlign: 'center', padding: '40px', opacity: 0.5 } },
                        'No bookmarked channels'
                    ) :
                    channels.map((channel, index) =>
                        h('div', {
                            key: channel.channelId,
                            className: 'cb-channel-item'
                        },
                            h('div', {
                                className: 'cb-channel-number',
                                style: {
                                    minWidth: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    marginRight: '8px',
                                    flexShrink: 0
                                }
                            }, ((currentPage - 1) * itemsPerPage) + index + 1),
                            h('div', { className: 'cb-channel-info' },
                                channel.thumbnails?.default?.url && h('img', {
                                    src: channel.thumbnails.default.url,
                                    className: 'cb-channel-avatar'
                                }),
                                h('div', { className: 'cb-channel-details' },
                                    h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                                        h('a', {
                                            className: 'cb-channel-name',
                                            href: `https://www.youtube.com/channel/${channel.channelId}`,
                                            target: '_blank',
                                            onClick: (e) => e.stopPropagation()
                                        }, channel.title),
                                        channel.country && h('span', {
                                            className: `fi fi-${getCountryCode(channel.country)}`,
                                            style: { fontSize: '14px' },
                                            title: channel.countryName || channel.country
                                        })
                                    ),
                                    h('div', { className: 'cb-channel-stats' },
                                        h('span', { className: 'cb-channel-stat' },
                                            Icon('Users', { size: 12 }),
                                            formatNumber(channel.subscriberCount)
                                        ),
                                        h('span', { className: 'cb-channel-stat' },
                                            Icon('Video', { size: 12 }),
                                            formatNumber(channel.videoCount)
                                        ),
                                        h('span', { className: 'cb-channel-stat' },
                                            Icon('Eye', { size: 12 }),
                                            formatNumber(channel.viewCount)
                                        ),
                                        formatChannelAge(channel.publishedAt) && h('span', { className: 'cb-channel-stat' },
                                            Icon('Calendar', { size: 12 }),
                                            formatChannelAge(channel.publishedAt)
                                        )
                                    )
                                )
                            ),
                            h('div', { className: 'cb-channel-actions' },
                                h('button', {
                                    className: 'cb-icon-button cb-info-button',
                                    onClick: () => showChannelDetail(channel),
                                    title: 'Channel Details'
                                },
                                    Icon('Info')
                                ),
                                h('button', {
                                    className: 'cb-icon-button cb-delete-button',
                                    onClick: () => deleteChannel(channel.channelId),
                                    title: 'Remove'
                                },
                                    Icon('Trash2')
                                )
                            )
                        )
                    )
            ),
            totalPages > 1 && h('div', {
                className: 'cb-pagination',
                style: { display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }
            },
                h('button', {
                    className: 'cb-button cb-button-outline cb-button-square',
                    disabled: currentPage === 1,
                    onClick: () => setCurrentPage(1),
                    title: 'First page'
                },
                    Icon('ChevronsLeft')
                ),
                h('button', {
                    className: 'cb-button cb-button-outline cb-button-square',
                    disabled: currentPage === 1,
                    onClick: () => setCurrentPage(currentPage - 1),
                    title: 'Previous page'
                },
                    Icon('ChevronLeft')
                ),
                h('span', {
                    className: 'cb-page-info',
                    style: { padding: '0 12px', display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '14px' }
                }, `${currentPage} / ${totalPages}`),
                h('button', {
                    className: 'cb-button cb-button-outline cb-button-square',
                    disabled: currentPage === totalPages,
                    onClick: () => setCurrentPage(currentPage + 1),
                    title: 'Next page'
                },
                    Icon('ChevronRight')
                ),
                h('button', {
                    className: 'cb-button cb-button-outline cb-button-square',
                    disabled: currentPage === totalPages,
                    onClick: () => setCurrentPage(totalPages),
                    title: 'Last page'
                },
                    Icon('ChevronsRight')
                )
            )
        );
    }

    function ConfirmDialog() {
        if (!state.confirmAction.value) return null;

        const { title, message, onConfirm } = state.confirmAction.value;

        const handleCancel = () => {
            state.showConfirmDialog.value = false;
            state.confirmAction.value = null;
        };

        const handleConfirm = () => {
            if (onConfirm) onConfirm();
            state.showConfirmDialog.value = false;
            state.confirmAction.value = null;
        };

        return h('div', {
            className: 'cb-confirm-overlay',
            onClick: (e) => e.target === e.currentTarget && handleCancel()
        },
            h('div', { className: `cb-confirm-dialog ${state.theme.value}` },
                h('div', { className: 'cb-confirm-header' },
                    h('h3', { className: 'cb-confirm-title' }, title),
                    h('p', { className: 'cb-confirm-message' }, message)
                ),
                h('div', { className: 'cb-confirm-buttons' },
                    h('button', {
                        className: 'cb-confirm-button cb-confirm-cancel',
                        onClick: handleCancel
                    }, 'Cancel'),
                    h('button', {
                        className: 'cb-confirm-button cb-confirm-action',
                        onClick: handleConfirm
                    }, 'Confirm')
                )
            )
        );
    }

    function DetailModal() {
        if (!state.selectedChannel.value) return null;

        const channel = state.selectedChannel.value;
        const fullData = channel.fullData || channel;
        const [copySuccess, setCopySuccess] = useState(false);

        const handleClose = () => {
            state.showDetailModal.value = false;
            state.selectedChannel.value = null;
            setCopySuccess(false);
        };

        const copyChannelId = () => {
            navigator.clipboard.writeText(fullData.channelId).then(() => {
                setCopySuccess(true);
                setTimeout(() => {
                    setCopySuccess(false);
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy Channel ID:', err);
            });
        };

        return h('div', {
            className: 'cb-detail-overlay',
            onClick: (e) => e.target === e.currentTarget && handleClose()
        },
            h('div', { className: `cb-detail-modal ${state.theme.value}` },
                h('div', { className: 'cb-detail-header' },
                    h('div', { style: { fontSize: '16px', fontWeight: 600 } },
                        fullData.title
                    ),
                    h('div', {
                        className: 'cb-close-btn',
                        onClick: handleClose
                    },
                        Icon('X')
                    )
                ),
                h('div', { className: 'cb-detail-content' },
                    h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Channel ID'),
                        h('div', { 
                            className: 'cb-detail-value',
                            style: { display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }
                        },
                            h('button', {
                                className: 'cb-icon-button',
                                onClick: copyChannelId,
                                title: 'Copy Channel ID',
                                style: { 
                                    minWidth: '28px', 
                                    height: '28px', 
                                    padding: '4px',
                                    opacity: '0.7'
                                }
                            },
                                copySuccess ? 
                                    Icon('Check', { size: 14, color: 'hsl(142.1deg 76.2% 36.3%)' }) :
                                    Icon('Copy', { size: 14 })
                            ),
                            h('span', { 
                                style: { fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }
                            }, fullData.channelId)
                        )
                    ),
                    h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Handle'),
                        h('span', { className: 'cb-detail-value' }, fullData.customUrl || 'N/A')
                    ),
                    (fullData.countryName && fullData.countryName !== 'N/A' && fullData.countryName !== '') && h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Country'),
                        h('span', { className: 'cb-detail-value' },
                            h('span', { className: 'cb-country-flag' },
                                fullData.countryName,
                                fullData.country && h('span', {
                                    className: `fi fi-${getCountryCode(fullData.country)}`
                                })
                            )
                        )
                    ),
                    h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Subscribers'),
                        h('span', { className: 'cb-detail-value' },
                            fullData.statistics?.subscriberCount?.toLocaleString() || '0'
                        )
                    ),
                    h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Total Views'),
                        h('span', { className: 'cb-detail-value' },
                            fullData.statistics?.viewCount?.toLocaleString() || '0'
                        )
                    ),
                    h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Total Videos'),
                        h('span', { className: 'cb-detail-value' },
                            fullData.statistics?.videoCount?.toLocaleString() || '0'
                        )
                    ),
                    h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Joined'),
                        h('span', { className: 'cb-detail-value' },
                            fullData.publishedAt ? dayjs(fullData.publishedAt).format('YYYY-MM-DD') : 'N/A'
                        )
                    ),
                    h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Made for Kids'),
                        h('span', { className: 'cb-detail-value' },
                            fullData.status?.madeForKids ? 'Yes' : 'No'
                        )
                    ),
                    fullData.waybackMachine && h('div', { className: 'cb-detail-row' },
                        h('span', { className: 'cb-detail-label' }, 'Wayback Machine'),
                        h('span', { className: 'cb-detail-value', style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' } },
                            h('a', {
                                href: fullData.waybackMachine.channelId,
                                target: '_blank',
                                style: { color: 'hsl(0 84% 60%)', textDecoration: 'none', display: 'flex', alignItems: 'center' },
                                title: 'Channel ID on Wayback Machine'
                            }, Icon('Landmark', { size: 18 })),
                            fullData.waybackMachine.handle && h('a', {
                                href: fullData.waybackMachine.handle,
                                target: '_blank',
                                style: { color: 'hsl(0 84% 60%)', textDecoration: 'none', display: 'flex', alignItems: 'center' },
                                title: 'Handle on Wayback Machine'
                            }, Icon('Landmark', { size: 18 }))
                        )
                    )
                )
            )
        );
    }

    loadSettings();
    loadCachedChannels();

    const createButton = () => {
        try {
            const existingButton = document.getElementById('cb-floating-bookmark-btn');
            if (existingButton) {
                existingButton.remove();
            }

            const parsed = parseChannelUrl(window.location.href);
            if (!parsed) {
                return;
            }

            const button = document.createElement('button');
            button.id = 'cb-floating-bookmark-btn';

            render(
                h('svg', {
                    width: 20,
                    height: 20,
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'white',
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round'
                },
                    h('path', { d: 'm19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z' }),
                    h('line', { x1: 12, x2: 12, y1: 7, y2: 13 }),
                    h('line', { x1: 9, x2: 15, y1: 10, y2: 10 })
                ),
                button
            );

            button.title = 'Channel Bookmarker';

            button.style.position = 'fixed';
            button.style.bottom = '30px';
            button.style.right = '30px';
            button.style.width = '50px';
            button.style.height = '50px';
            button.style.borderRadius = '50%';
            button.style.background = 'hsl(0 84% 60%)';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.4)';
            button.style.zIndex = '999999';
            button.style.transition = 'all 0.3s ease';

            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.background = 'hsl(0 84% 50%)';
                button.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.5)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.background = 'hsl(0 84% 60%)';
                button.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.4)';
            });

            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 100);

                const parsed = parseChannelUrl(window.location.href);
                if (parsed) {
                    state.currentChannelInfo.value = parsed;
                }

                state.isModalOpen.value = true;
                console.log('Channel Bookmarker modal opened');
            });

            document.body.appendChild(button);
            console.log('Channel Bookmarker button created');

        } catch (error) {
            console.error('Error creating Channel Bookmarker button:', error);
        }
    };

    const initButton = () => {
        createButton();

        setTimeout(createButton, 1000);

        setTimeout(createButton, 2000);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initButton);
    } else {
        initButton();
    }

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(createButton, 500);
        }
        if (!document.getElementById('cb-floating-bookmark-btn')) {
            createButton();
        }
    }).observe(document, {subtree: true, childList: true});

    const modalContainer = document.createElement('div');
    modalContainer.id = 'cb-modal-container';
    document.body.appendChild(modalContainer);

    effect(() => {
        render(h(Modal), modalContainer);
    });
})();
