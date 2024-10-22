// ==UserScript==
// @name         YouTube Enhancer (Channel Video Counters)
// @description  Automatically counts and displays the total number of videos, shorts, and live streams.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.0
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const API_BASE_URL = 'https://exyezed.vercel.app/count/';
    let lastProcessedUrl = '';

    function getChannelId() {
        const channelIdMatch = window.location.pathname.match(/@([^/]+)/);
        return channelIdMatch ? channelIdMatch[1] : null;
    }

    function formatNumber(num) {
        return num >= 1000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num.toString();
    }

    function updateTabCounts(data) {
        const tabsContainer = document.querySelector('yt-tab-group-shape');
        if (!tabsContainer) return;
    
        const videoTranslations = [
            "Videolar", "Videos", "Vídeos", "Bideoak", "Mga Video", "Vidéos", "Videozapisi", "Amavidiyo", "Video", "Vídeó", "Videoklipi", "Vaizdo įrašai", "Videók", "Video's", "Videoer", "Videot", "Відэа", "Видеоклипове", "Видеолор", "Бейнелер", "Видеа", "Видеонууд", "Видео", "Видеи", "Βίντεο", "Տեսանյութեր", "סרטונים", "ویڈیوز", "الفيديوهات", "ویدئوها", "भिडियोहरू", "व्हिडिओ", "वीडियो", "ভিডিঅ'", "ভিডিও", "ਵੀਡੀਓ", "વીડિયો", "ଭିଡିଓ", "வீடியோக்கள்", "వీడియోలు", "ವೀಡಿಯೊಗಳು", "വീഡിയോകൾ", "වීඩියෝ", "วิดีโอ", "Videa", "ວິດີໂອ", "ဗီဒီယိုများ", "ვიდეოები", "ቪዲዮዎች", "វីដេអូ", "视频", "影片", "動画", "동영상", "Videod"
        ];
    
        const shortsTranslations = [
            "Shorts", "Shorts videozapisi", "Ama-Short", "Video Fupi", "Shorts-videoer", "Кыска видеолор", "Шортс", "YouTube Shorts", "Կարճ հոլովակներ", "فیلم‌های کوتاه YouTube", "Curts", "მოკლე ვიდეოები", "ショート", "Lühivideod", "Kortvideo's"
        ];
    
        const liveTranslations = [
            "Canlı", "Live", "En directo", "En vivo", "Zuzenean", "En direct", "Publicado", "Uživo", "Bukhoma", "Í beinni", "Mubashara", "Tiešraidē", "Tiesiogiai", "Élő", "Direkte", "Jonli", "Drejtpërdrejt", "Video phát trực tiếp", "Langsung", "Ужывую", "На живо", "Түз ободо", "Тікелей эфир", "Во живо", "Шууд", "Трансляции", "Уживо", "Наживо", "Ζωντανά", "Ուղիղ եթեր", "בשידור חי", "لائیو", "البث المباشر", "زنده", "लाइभ", "लाइव्ह", "लाइव", "লাইভ", "En directe", "ਲਾਈਵ", "લાઇવ", "ଲାଇଭ୍", "நேரலை", "లైవ్", "ಲೈವ್", "തത്സമയം", "සජීවී", "ไลฟ์สด", "Živě", "ສົດ", "တိုက်ရိုက်လွှင့်နေသော", "პირდაპირი", "ቀጥታ ስርጭት", "បន្តផ្ទាល់", "直播", "ライブ", "라이브", "Otse", "Regstreeks"
        ];
    
        const tabs = tabsContainer.querySelectorAll('yt-tab-shape');
        tabs.forEach(tab => {
            const tabTitle = tab.getAttribute('tab-title');
            if (videoTranslations.includes(tabTitle)) {
                updateTabText(tab, data.videos, tabTitle);
            } else if (shortsTranslations.includes(tabTitle)) {
                updateTabText(tab, data.shorts, tabTitle);
            } else if (liveTranslations.includes(tabTitle)) {
                updateTabText(tab, data.streams, tabTitle);
            }
        });
    
        // Update slider width and position after changing tab text
        updateSlider();
    }

    function updateTabText(tab, count, label) {
        const tabContent = tab.querySelector('.yt-tab-shape-wiz__tab');
        if (tabContent && count !== undefined) {
            tabContent.textContent = `${label} (${formatNumber(count)})`;
        }
    }

    function updateSlider() {
        const activeTab = document.querySelector('yt-tab-shape[aria-selected="true"]');
        if (activeTab) {
            const slider = document.querySelector('.yt-tab-group-shape-wiz__slider');
            if (slider) {
                const tabRect = activeTab.getBoundingClientRect();
                const containerRect = activeTab.parentElement.getBoundingClientRect();
                
                slider.style.width = `${tabRect.width}px`;
                slider.style.transform = `translateX(${tabRect.left - containerRect.left}px)`;
            }
        }
    }

    function fetchVideoData(channelId) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: API_BASE_URL + channelId,
            onload: function(response) {
                if (response.status === 200) {
                    try {
                        const data = JSON.parse(response.responseText);
                        updateTabCounts(data);
                    } catch (error) {
                        console.error('Error parsing API response:', error);
                    }
                } else {
                    console.error('API request failed:', response.status);
                }
            },
            onerror: function(error) {
                console.error('API request error:', error);
            }
        });
    }

    function init() {
        const channelId = getChannelId();
        if (channelId && lastProcessedUrl !== window.location.href) {
            lastProcessedUrl = window.location.href;
            fetchVideoData(channelId);
        }
    }

    // Use MutationObserver to handle dynamic content loading
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                const addedNodes = mutation.addedNodes;
                for (const node of addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'YT-TAB-GROUP-SHAPE') {
                        init();
                        return;
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Watch for URL changes
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            init();
        }
    }).observe(document, {subtree: true, childList: true});

    // Watch for tab changes and window resize
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'aria-selected') {
                updateSlider();
            }
        }
    }).observe(document.body, {attributes: true, subtree: true, attributeFilter: ['aria-selected']});

    window.addEventListener('resize', updateSlider);

    // Initial call to init() in case the content is already loaded
    init();
})();