// ==UserScript==
// @name         YouTube Enhancer (Reveal Channel ID)
// @description  Revealing the channel ID, displayed next to the channel handle.
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
    
    let lastProcessedChannelName = '';
    let isRequestInProgress = false;

    function addChannelId() {
        const channelNameElement = document.querySelector('yt-content-metadata-view-model .yt-core-attributed-string');
        if (channelNameElement && !channelNameElement.querySelector('.YouTubeEnhancerRevealChannelID')) {
            const channelName = channelNameElement.textContent.trim().replace('@', '');
            
            if (channelName === lastProcessedChannelName || isRequestInProgress) {
                return;
            }

            isRequestInProgress = true;
            lastProcessedChannelName = channelName;
            
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://exyezed.vercel.app/api/channel/${channelName}`,
                onload: function(response) {
                    isRequestInProgress = false;
                    try {
                        const data = JSON.parse(response.responseText);
                        const channelId = data.channel_id;
                        
                        if (!channelNameElement.querySelector('.YouTubeEnhancerRevealChannelID')) {
                            const channelIdLink = document.createElement('a');
                            channelIdLink.className = 'YouTubeEnhancerRevealChannelID';
                            channelIdLink.textContent = ` (${channelId})`;
                            channelIdLink.href = `https://www.youtube.com/channel/${channelId}`;
                            channelIdLink.style.fontSize = '1em';
                            channelIdLink.style.color = '#3ea6ff';
                            channelIdLink.style.textDecoration = 'none';
                            channelIdLink.style.cursor = 'pointer';
                            
                            channelIdLink.addEventListener('mouseover', function() {
                                this.style.textDecoration = 'none';
                            });
                            
                            channelNameElement.appendChild(channelIdLink);
                        }
                    } catch (error) {
                        console.error('Error parsing API response:', error);
                    }
                },
                onerror: function(error) {
                    isRequestInProgress = false;
                    console.error('Error fetching channel ID:', error);
                }
            });
        }
    }

    // Run the function initially and then every 1 second to handle dynamic page changes
    addChannelId();
    setInterval(addChannelId, 1000);
})();