// ==UserScript==
// @name         YouTube Enhancer (Secret Stats)
// @description  Integrating "Secret Stats" and "Stream Stats" buttons into the channel page, directing users to detailed analytics pages for insights into the channel.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.2
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function getChannelIdentifier() {
        const url = window.location.href;
        let identifier = '';
        
        if (url.includes('/channel/')) {
            identifier = url.split('/channel/')[1].split('/')[0];
        } else if (url.includes('/@')) {
            identifier = url.split('/@')[1].split('/')[0];
        }
        
        return identifier;
    }

    function createStatsButton(text, className, idName, svgPath, statsType) {
        const containerDiv = document.createElement('div');
        containerDiv.className = `yt-flexible-actions-view-model-wiz__action ${className}-container`;

        const buttonViewModel = document.createElement('button-view-model');
        buttonViewModel.className = `yt-spec-button-view-model ${className}-view-model`;

        const button = document.createElement('button');
        button.className = `yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment ${className}-button`;
        button.setAttribute('aria-disabled', 'false');
        button.setAttribute('aria-label', `View ${text}`);
        button.id = idName;
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.gap = '8px';

        button.addEventListener('click', () => {
            const identifier = getChannelIdentifier();
            if (identifier) {
                const url = `https://exyezed.vercel.app/stats/${statsType}/${identifier}`;
                window.open(url, '_blank');
            }
        });

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 576 512");
        svg.style.width = "20px";
        svg.style.height = "20px";
        svg.style.fill = "currentColor";
        svg.style.flexShrink = "0";
        svg.style.display = "flex";
        svg.style.alignItems = "center";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", svgPath);
        svg.appendChild(path);

        const buttonText = document.createElement('div');
        buttonText.className = `yt-spec-button-shape-next__button-text-content ${className}-text`;
        buttonText.textContent = text;
        buttonText.style.display = 'flex';
        buttonText.style.alignItems = 'center';

        const touchFeedback = document.createElement('yt-touch-feedback-shape');
        touchFeedback.style.borderRadius = 'inherit';
        touchFeedback.className = `${className}-feedback-shape`;

        const touchFeedbackDiv = document.createElement('div');
        touchFeedbackDiv.className = `yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response ${className}-feedback-response`;
        touchFeedbackDiv.setAttribute('aria-hidden', 'true');

        const strokeDiv = document.createElement('div');
        strokeDiv.className = `yt-spec-touch-feedback-shape__stroke ${className}-feedback-stroke`;

        const fillDiv = document.createElement('div');
        fillDiv.className = `yt-spec-touch-feedback-shape__fill ${className}-feedback-fill`;

        touchFeedbackDiv.appendChild(strokeDiv);
        touchFeedbackDiv.appendChild(fillDiv);
        touchFeedback.appendChild(touchFeedbackDiv);
        
        button.appendChild(svg);
        button.appendChild(buttonText);
        button.appendChild(touchFeedback);
        
        buttonViewModel.appendChild(button);
        containerDiv.appendChild(buttonViewModel);

        return containerDiv;
    }

    function createStatsButtons() {
        if (document.querySelector('.secret-stats-container') || document.querySelector('.stream-stats-container')) {
            return;
        }

        const secretStatsSvgPath = "M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48l-59.9 0C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4l-59.9 0c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm56 208l-12.4 0c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2L168 224c-22.1 0-40-17.9-40-40l0-14.4c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4l0 14.4c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z";

        const streamStatsSvgPath = "M108.2 71c13.8 11.1 16 31.2 5 45C82.4 154.4 64 203 64 256s18.4 101.6 49.1 140c11.1 13.8 8.8 33.9-5 45s-33.9 8.8-45-5C23.7 386.7 0 324.1 0 256S23.7 125.3 63.2 76c11.1-13.8 31.2-16 45-5zm359.7 0c13.8-11.1 33.9-8.8 45 5C552.3 125.3 576 187.9 576 256s-23.7 130.7-63.2 180c-11.1 13.8-31.2 16-45 5s-16-31.2-5-45c30.7-38.4 49.1-87 49.1-140s-18.4-101.6-49.1-140c-11.1-13.8-8.8-33.9 5-45zM232 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm-27.5-74.7c-17.8 19.8-28.5 46-28.5 74.7s10.8 54.8 28.5 74.7c11.8 13.2 10.7 33.4-2.5 45.2s-33.4 10.7-45.2-2.5C129 342.2 112 301.1 112 256s17-86.2 44.8-117.3c11.8-13.2 32-14.3 45.2-2.5s14.3 32 2.5 45.2zm214.7-42.7C447 169.8 464 210.9 464 256s-17 86.2-44.8 117.3c-11.8 13.2-32 14.3-45.2 2.5s-14.3-32-2.5-45.2c17.8-19.8 28.5-46 28.5-74.7s-10.8-54.8-28.5-74.7c-11.8-13.2-10.7-33.4 2.5-45.2s33.4-10.7 45.2 2.5z";

        const joinButton = document.querySelector('.yt-flexible-actions-view-model-wiz__action');
        if (joinButton) {
            const secretStatsButton = createStatsButton('Secret Stats', 'secret-stats', 'secret-stats-button', secretStatsSvgPath, 'secret');
            joinButton.parentNode.insertBefore(secretStatsButton, joinButton.nextSibling);

            const streamStatsButton = createStatsButton('Stream Stats', 'stream-stats', 'stream-stats-button', streamStatsSvgPath, 'stream');
            secretStatsButton.parentNode.insertBefore(streamStatsButton, secretStatsButton.nextSibling);
        }
    }

    function checkAndAddButtons() {
        const joinButton = document.querySelector('.yt-flexible-actions-view-model-wiz__action');
        const secretStatsButton = document.querySelector('.secret-stats-container');
        const streamStatsButton = document.querySelector('.stream-stats-container');
        
        if (joinButton && (!secretStatsButton || !streamStatsButton)) {
            createStatsButtons();
        }
    }

    const observer = new MutationObserver((mutations) => {
        checkAndAddButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    checkAndAddButtons();
    console.log('YouTube Enhancer (Secret Stats) is running');
})();
