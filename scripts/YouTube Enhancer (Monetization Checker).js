// ==UserScript==
// @name         YouTube Enhancer (Monetization Checker)
// @description  Check the Monetization Status.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.2
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      monetizationcheck.vercel.app
// @connect      youtube.com
// ==/UserScript==

(function () {
  "use strict";

  let lastCheckedUrl = "";
  let isCheckingMonetization = false;

  const commonIconStyles = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    marginLeft: "8px",
    height: "20px",
    cursor: "pointer"
  };

  function createMonetizationIcon(isMonetized) {
    const container = document.createElement("div");
    Object.assign(container.style, commonIconStyles);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 512 512");
    svg.setAttribute("fill", "none");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm20.8-378.4l0 14.2c9.7 1.2 19.4 3.9 29 6.6c1.9 .5 3.7 1 5.6 1.6c11.5 3.2 18.3 15.1 15.1 26.6s-15.1 18.2-26.6 15.1c-1.6-.4-3.1-.9-4.7-1.3c-7-2-14-3.9-21.1-5.3c-13.2-2.5-28.5-1.3-40.8 4c-11 4.8-20.1 16.4-7.6 24.4c9.8 6.3 21.8 9.5 33.2 12.6c2.4 .6 4.7 1.3 7 1.9c15.6 4.4 35.5 10.1 50.4 20.3c19.4 13.3 28.5 34.9 24.2 58.1c-4.1 22.4-19.7 37.1-38.4 44.7c-7.8 3.2-16.3 5.2-25.2 6.2l0 15.2c0 11.9-9.7 21.6-21.6 21.6s-21.6-9.7-21.6-21.6l0-17.4c-14.5-3.3-28.7-7.9-42.8-12.5c-11.3-3.7-17.5-16-13.7-27.3s16-17.5 27.3-13.7c2.5 .8 5 1.7 7.5 2.5c11.3 3.8 22.9 7.7 34.5 9.6c17 2.5 30.6 1 39.5-2.6c12-4.8 17.7-19.1 5.9-27.1c-10.1-6.9-22.6-10.3-34.5-13.5c-2.3-.6-4.5-1.2-6.8-1.9c-15.1-4.3-34-9.6-48.2-18.7c-19.5-12.5-29.4-33.3-25.2-56.4c4-21.8 21-36.3 39-44.1c5.5-2.4 11.4-4.3 17.5-5.7l0-16.1c0-11.9 9.7-21.6 21.6-21.6s21.6 9.7 21.6 21.6z"
    );
    path.setAttribute("fill", isMonetized ? "#16a34a" : "#dc2626");

    svg.appendChild(path);
    container.appendChild(svg);

    return container;
  }

  function createSpinnerIcon() {
    const container = document.createElement("div");
    Object.assign(container.style, commonIconStyles);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 512 512");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.style.animation = "yt-monetization-spinner-rotate 1.5s linear infinite";

    if (!document.querySelector("#yt-monetization-spinner-style")) {
      const style = document.createElement("style");
      style.id = "yt-monetization-spinner-style";
      style.textContent = `
        @keyframes yt-monetization-spinner-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    const secondaryPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    secondaryPath.setAttribute(
      "d",
      "M0 256C0 114.9 114.1 .5 255.1 0C237.9 .5 224 14.6 224 32c0 17.7 14.3 32 32 32C150 64 64 150 64 256s86 192 192 192c69.7 0 130.7-37.1 164.5-92.6c-3 6.6-3.3 14.8-1 22.2c1.2 3.7 3 7.2 5.4 10.3c1.2 1.5 2.6 3 4.1 4.3c.8 .7 1.6 1.3 2.4 1.9c.4 .3 .8 .6 1.3 .9s.9 .6 1.3 .8c5 2.9 10.6 4.3 16 4.3c11 0 21.8-5.7 27.7-16c-44.3 76.5-127 128-221.7 128C114.6 512 0 397.4 0 256z"
    );
    secondaryPath.setAttribute("fill", "#ffffff");
    secondaryPath.setAttribute("opacity", "0.4");

    const primaryPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    primaryPath.setAttribute(
      "d",
      "M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z"
    );
    primaryPath.setAttribute("fill", "#ffffff");

    svg.appendChild(secondaryPath);
    svg.appendChild(primaryPath);
    container.appendChild(svg);

    return container;
  }

  function extractChannelIdentifier() {
    const url = window.location.href;
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    if (pathname.includes('/channel/')) {
      return pathname.split('/channel/')[1].split('/')[0];
    }
    
    if (pathname.includes('/@')) {
      return pathname.split('/@')[1].split('/')[0];
    }
    
    return null;
  }
  
  function extractVideoId() {
    const url = window.location.href;
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;
    
    if (pathname === '/watch') {
      return searchParams.get('v');
    }
    
    return null;
  }
  
  function isVideoPage() {
    const url = window.location.href;
    return url.includes('/watch');
  }
  
  function isChannelPage() {
    const channelIdentifier = extractChannelIdentifier();
    return channelIdentifier !== null;
  }

  async function checkMonetization() {
    const currentUrl = window.location.href;

    if (currentUrl !== lastCheckedUrl) {
      lastCheckedUrl = currentUrl;
      isCheckingMonetization = false;
    }

    if (isCheckingMonetization) {
      return;
    }

    isCheckingMonetization = true;

    if (isVideoPage()) {
      await checkVideoMonetization();
    } else if (isChannelPage()) {
      await checkChannelMonetization();
    }

    isCheckingMonetization = false;
  }
  
  async function checkVideoMonetization() {
    const videoId = extractVideoId();
    if (!videoId) {
      return;
    }
    
    await showVideoSpinner();
    
    try {
      const result = await new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url: `https://monetizationcheck.vercel.app/video/${encodeURIComponent(videoId)}`,
          onload: function (response) {
            if (response.status === 200) {
              try {
                const data = JSON.parse(response.responseText);
                if (data.success && data.data) {
                  resolve(data.data.monetization);
                } else {
                  reject(new Error(`Invalid response format: ${response.responseText}`));
                }
              } catch (error) {
                reject(new Error(`Failed to parse response: ${error.message}`));
              }
            } else {
              reject(new Error(`Failed to check monetization: ${response.status}`));
            }
          },
          onerror: function (error) {
            reject(error);
          },
        });
      });
      
      await updateVideoPage(result);
    } catch (error) {
      console.error('Error checking video monetization:', error);
      await updateVideoPage(false);
    }
  }

  async function checkChannelMonetization() {
    const channelIdentifier = extractChannelIdentifier();
    if (!channelIdentifier) {
      return;
    }

    await showChannelSpinner();

    try {
      const result = await new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url: `https://monetizationcheck.vercel.app/channel/${encodeURIComponent(channelIdentifier)}`,
          onload: function (response) {
            if (response.status === 200) {
              try {
                const data = JSON.parse(response.responseText);
                if (data.success && data.data) {
                  resolve(data.data.monetization);
                } else {
                  reject(new Error(`Invalid response format: ${response.responseText}`));
                }
              } catch (error) {
                reject(new Error(`Failed to parse response: ${error.message}`));
              }
            } else {
              reject(new Error(`Failed to check monetization: ${response.status}`));
            }
          },
          onerror: function (error) {
            reject(error);
          },
        });
      });

      await updateChannelPage(result);
    } catch (error) {
      console.error('Error checking channel monetization:', error);
      await updateChannelPage(false);
    }
  }

  function findChannelTitleElement(retryCount = 0, maxRetries = 5) {
    const possibleTitleSelectors = [
      ".dynamic-text-view-model-wiz__h1 .yt-core-attributed-string",
      "ytd-channel-name #channel-name",
      "#channel-header-container #channel-name",
    ];

    for (const selector of possibleTitleSelectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }

    if (retryCount < maxRetries) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(findChannelTitleElement(retryCount + 1, maxRetries));
        }, 500);
      });
    }

    return null;
  }
  
  function findVideoChannelElement(retryCount = 0, maxRetries = 5) {
    const element = document.querySelector("ytd-video-owner-renderer #channel-name");
    
    if (element) return element;
    
    if (retryCount < maxRetries) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(findVideoChannelElement(retryCount + 1, maxRetries));
        }, 500);
      });
    }
    
    return null;
  }

  async function showChannelSpinner() {
    const titleElement = await findChannelTitleElement();
    if (!titleElement) {
      return null;
    }

    const existingIcon = document.querySelector(".yt-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }

    const spinner = createSpinnerIcon();
    spinner.classList.add("yt-monetization-icon");

    const verifiedBadge = titleElement.querySelector(
      ".yt-core-attributed-string__image-element"
    );
    if (verifiedBadge) {
      verifiedBadge.parentNode.insertBefore(spinner, verifiedBadge.nextSibling);
    } else {
      titleElement.appendChild(spinner);
    }

    return spinner;
  }
  
  async function showVideoSpinner() {
    const channelElement = await findVideoChannelElement();
    if (!channelElement) {
      return null;
    }
    
    const existingIcon = document.querySelector(".yt-video-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }
    
    const spinner = createSpinnerIcon();
    spinner.classList.add("yt-video-monetization-icon");
    
    const verifiedBadge = channelElement.querySelector(".badge-style-type-verified");
    
    if (verifiedBadge) {
      verifiedBadge.parentNode.insertBefore(spinner, verifiedBadge.nextSibling);
    } else {
      channelElement.appendChild(spinner);
    }
    
    return spinner;
  }

  async function updateChannelPage(isMonetized) {
    const titleElement = await findChannelTitleElement();
    if (!titleElement) {
      return;
    }

    const existingIcon = document.querySelector(".yt-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }

    const monetizationIcon = createMonetizationIcon(isMonetized);
    monetizationIcon.classList.add("yt-monetization-icon");
    monetizationIcon.title = isMonetized ? "Channel is monetized" : "Channel is not monetized";

    const verifiedBadge = titleElement.querySelector(
      ".yt-core-attributed-string__image-element"
    );
    if (verifiedBadge) {
      verifiedBadge.parentNode.insertBefore(
        monetizationIcon,
        verifiedBadge.nextSibling
      );
    } else {
      titleElement.appendChild(monetizationIcon);
    }
  }
  
  async function updateVideoPage(isMonetized) {
    const channelElement = await findVideoChannelElement();
    if (!channelElement) {
      return;
    }
    
    const existingIcon = document.querySelector(".yt-video-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }
    
    const monetizationIcon = createMonetizationIcon(isMonetized);
    monetizationIcon.classList.add("yt-video-monetization-icon");
    monetizationIcon.title = isMonetized ? "Video is monetized" : "Video is not monetized";
    
    const verifiedBadge = channelElement.querySelector(".badge-style-type-verified");
    
    if (verifiedBadge) {
      verifiedBadge.parentNode.insertBefore(monetizationIcon, verifiedBadge.nextSibling);
    } else {
      channelElement.appendChild(monetizationIcon);
    }
  }

  function setupImprovedUrlChangeDetection() {
    let lastPath = window.location.pathname;
    let lastSearch = window.location.search;

    const observer = new MutationObserver((mutations) => {
      if (window.location.pathname !== lastPath || window.location.search !== lastSearch) {
        lastPath = window.location.pathname;
        lastSearch = window.location.search;
        setTimeout(() => checkMonetization(), 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      originalPushState.apply(this, arguments);
      setTimeout(() => {
        if (window.location.pathname !== lastPath || window.location.search !== lastSearch) {
          lastPath = window.location.pathname;
          lastSearch = window.location.search;
          checkMonetization();
        }
      }, 500);
    };

    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      setTimeout(() => {
        if (window.location.pathname !== lastPath || window.location.search !== lastSearch) {
          lastPath = window.location.pathname;
          lastSearch = window.location.search;
          checkMonetization();
        }
      }, 500);
    };

    window.addEventListener("popstate", () => {
      setTimeout(() => {
        if (window.location.pathname !== lastPath || window.location.search !== lastSearch) {
          lastPath = window.location.pathname;
          lastSearch = window.location.search;
          checkMonetization();
        }
      }, 500);
    });
  }

  checkMonetization();

  setupImprovedUrlChangeDetection();

  window.checkYoutubeMonetization = checkMonetization;
})();