// ==UserScript==
// @name         YouTube Enhancer (Thumbnail Preview)
// @description  View Original Avatar, Banner, Video and Shorts Thumbnails.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.6
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const css = `
        .thumbnail-overlay-container {
            position: absolute;
            bottom: 8px;
            left: 8px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .thumbnail-overlay-button {
            width: 28px;
            height: 28px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
        }

        .thumbnail-overlay-button:hover {
            background: rgba(0, 0, 0, 0.9);
        }

        .thumbnail-overlay-button svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .thumbnail-dropdown {
            position: absolute;
            bottom: 100%;
            left: 0;
            background: rgba(0, 0, 0, 0.9);
            border-radius: 4px;
            padding: 4px;
            margin-bottom: 4px;
            display: none;
            flex-direction: column;
            min-width: 140px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            z-index: 10000;
        }

        .thumbnail-dropdown.show {
            display: flex !important;
        }

        .thumbnail-dropdown-item {
            background: none;
            border: none;
            color: white;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 2px;
            font-size: 12px;
            text-align: left;
            white-space: nowrap;
            transition: background-color 0.2s ease;
        }

        .thumbnail-dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* Sidebar thumbnails */
        .yt-lockup-view-model-wiz__content-image:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        .yt-lockup-view-model-wiz__content-image {
            position: relative;
        }

        .shortsLockupViewModelHostEndpoint:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        .shortsLockupViewModelHostEndpoint {
            position: relative;
        }

        /* Channel page thumbnails */
        ytd-thumbnail:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        ytd-thumbnail {
            position: relative;
        }

        ytm-shorts-lockup-view-model:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        ytm-shorts-lockup-view-model {
            position: relative;
        }

        /* For shorts in channel page */
        .shortsLockupViewModelHostThumbnailContainer:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        .shortsLockupViewModelHostThumbnailContainer {
            position: relative;
        }

        /* For shorts containers in general */
        ytm-shorts-lockup-view-model:hover .thumbnail-overlay-container {
            opacity: 1;
        }

        ytm-shorts-lockup-view-model {
            position: relative;
        }

        /* Watch page custom thumbnail */
        #thumbnailPreview-custom-image {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
            box-sizing: border-box;
            border-radius: 10px;
            cursor: pointer;
        }

        /* Avatar and banner preview buttons */
        .thumbnailPreview-button {
            position: absolute;
            bottom: 10px;
            left: 5px;
            background-color: rgba(0, 0, 0, 0.75);
            color: white;
            border: none;
            border-radius: 3px;
            padding: 3px;
            font-size: 18px;
            cursor: pointer;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .thumbnailPreview-container {
            position: relative;
        }

        .thumbnailPreview-container:hover .thumbnailPreview-button {
            opacity: 1;
        }
    `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function extractVideoId(url) {
    const regularMatch = url.match(/[?&]v=([^&]+)/);
    if (regularMatch) {
      return regularMatch[1];
    }

    const shortsMatch = url.match(/\/shorts\/([^?&]+)/);
    if (shortsMatch) {
      return shortsMatch[1];
    }

    return null;
  }

  function openImageInNewTab(url) {
    window.open(url, "_blank");
  }

  function createSVGElement(pathD) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "1em");
    svg.setAttribute("height", "1em");
    svg.setAttribute("viewBox", "0 0 24 24");

    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", pathD);

    svg.appendChild(path);
    return svg;
  }

  const defaultIconPath =
    "M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4";
  const hoverIconPath =
    "M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4l2 3l3-4l4 5z";

  let thumbnailPreviewCurrentVideoId = "";
  let thumbnailInsertionAttempts = 0;
  const MAX_ATTEMPTS = 10;
  const RETRY_DELAY = 500;

  function createOverlayButton(videoId, isShorts = false) {
    const container = document.createElement("div");
    container.className = "thumbnail-overlay-container";

    const button = document.createElement("button");
    button.className = "thumbnail-overlay-button";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4"
    );

    svg.appendChild(path);
    button.appendChild(svg);

    const dropdown = document.createElement("div");
    dropdown.className = "thumbnail-dropdown";

    let thumbnailOptions;

    if (isShorts) {
      thumbnailOptions = [
        { name: "Default", filename: "oardefault.jpg" },
        { name: "Alternative 1", filename: "oar1.jpg" },
        { name: "Alternative 2 (Default)", filename: "oar2.jpg" },
        { name: "Alternative 3", filename: "oar3.jpg" },
      ];
    } else {
      thumbnailOptions = [
        { name: "Default (120x90)", filename: "default.jpg" },
        { name: "Medium (320x180)", filename: "mqdefault.jpg" },
        { name: "High (480x360)", filename: "hqdefault.jpg" },
        { name: "Standard (640x480)", filename: "sddefault.jpg" },
        { name: "Max Res (1280x720)", filename: "maxresdefault.jpg" },
      ];
    }

    thumbnailOptions.forEach((option) => {
      const item = document.createElement("button");
      item.className = "thumbnail-dropdown-item";
      item.textContent = option.name;

      item.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${option.filename}`;
        openImageInNewTab(thumbnailUrl);
        dropdown.classList.remove("show");
      });

      dropdown.appendChild(item);
    });

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      document.querySelectorAll(".thumbnail-dropdown.show").forEach((d) => {
        if (d !== dropdown) d.classList.remove("show");
      });

      dropdown.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
      if (!container.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dropdown.classList.remove("show");
      }
    });

    container.appendChild(dropdown);
    container.appendChild(button);

    return container;
  }

  function addButtonToElement(element, getFullSizeUrl) {
    if (!element.closest(".thumbnailPreview-container")) {
      const container = document.createElement("div");
      container.className = "thumbnailPreview-container";
      element.parentNode.insertBefore(container, element);
      container.appendChild(element);

      const button = document.createElement("button");
      button.className = "thumbnailPreview-button";

      const defaultIcon = createSVGElement(defaultIconPath);
      button.appendChild(defaultIcon);

      button.addEventListener("mouseenter", () => {
        button.innerHTML = "";
        button.appendChild(createSVGElement(hoverIconPath));
      });

      button.addEventListener("mouseleave", () => {
        button.innerHTML = "";
        button.appendChild(createSVGElement(defaultIconPath));
      });

      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const url = getFullSizeUrl(element.src);
        if (url) {
          openImageInNewTab(url);
        }
      });

      container.appendChild(button);
    }
  }

  function isWatchPage() {
    const url = new URL(window.location.href);
    return url.pathname === "/watch" && url.searchParams.has("v");
  }

  function addOrUpdateThumbnailImage() {
    if (!isWatchPage()) return;

    const newVideoId = new URLSearchParams(window.location.search).get("v");

    if (!newVideoId || newVideoId === thumbnailPreviewCurrentVideoId) {
      return;
    }

    thumbnailPreviewCurrentVideoId = newVideoId;

    function attemptInsertion() {
      const targetElement = document.querySelector("#secondary-inner #panels");
      const existingImg = document.getElementById(
        "thumbnailPreview-custom-image"
      );

      if (existingImg) {
        existingImg.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;
        thumbnailInsertionAttempts = 0;
        return;
      }

      if (!targetElement) {
        thumbnailInsertionAttempts++;
        if (thumbnailInsertionAttempts < MAX_ATTEMPTS) {
          setTimeout(attemptInsertion, RETRY_DELAY);
        } else {
          thumbnailInsertionAttempts = 0;
        }
        return;
      }

      const img = document.createElement("img");
      img.id = "thumbnailPreview-custom-image";
      img.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;

      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const maxResUrl = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/maxresdefault.jpg`;
        openImageInNewTab(maxResUrl);
      });

      targetElement.parentNode.insertBefore(img, targetElement);
      thumbnailInsertionAttempts = 0;
    }

    attemptInsertion();
  }

  function processAvatars() {
    const avatars = document.querySelectorAll(
      "yt-avatar-shape img, yt-img-shadow#avatar img"
    );
    avatars.forEach((img) => {
      if (!img.closest(".thumbnailPreview-container")) {
        addButtonToElement(img, (src) =>
          src.replace(/=s\d+-c-k-c0x00ffffff-no-rj.*/, "=s0")
        );

        if (isWatchPage()) {
          const button = img
            .closest(".thumbnailPreview-container")
            .querySelector(".thumbnailPreview-button");
          if (button) {
            button.style.display = "none";
          }
        }
      }
    });
  }

  function processChannelBanners() {
    const banners = document.querySelectorAll("yt-image-banner-view-model img");
    banners.forEach((img) => {
      if (!img.closest(".thumbnailPreview-container")) {
        addButtonToElement(img, (src) => src.replace(/=w\d+-.*/, "=s0"));
      }
    });
  }

  function cleanupDuplicateButtons() {
    const shortsWithMultipleButtons = document.querySelectorAll(
      "ytm-shorts-lockup-view-model"
    );
    shortsWithMultipleButtons.forEach((shortsContainer) => {
      const buttons = shortsContainer.querySelectorAll(
        ".thumbnail-overlay-container"
      );
      if (buttons.length > 1) {
        const thumbnailContainer = shortsContainer.querySelector(
          ".shortsLockupViewModelHostThumbnailContainer"
        );
        const preferredButton = thumbnailContainer
          ? thumbnailContainer.querySelector(".thumbnail-overlay-container")
          : buttons[0];

        buttons.forEach((button) => {
          if (button !== preferredButton) {
            button.remove();
          }
        });
      }
    });
  }

  function addOverlayButtons() {
    const sidebarThumbnails = document.querySelectorAll(
      ".yt-lockup-view-model-wiz__content-image:not([data-overlay-added])"
    );
    sidebarThumbnails.forEach((container) => {
      const href = container.getAttribute("href");
      if (href) {
        const videoId = extractVideoId(href);
        if (videoId) {
          const overlayButton = createOverlayButton(videoId, false);
          container.appendChild(overlayButton);
          container.setAttribute("data-overlay-added", "true");
        }
      }
    });

    const channelThumbnails = document.querySelectorAll(
      "ytd-thumbnail:not([data-overlay-added])"
    );
    channelThumbnails.forEach((thumbnail) => {
      const link = thumbnail.querySelector('a[href*="/watch?v="]');
      if (link) {
        const href = link.getAttribute("href");
        const videoId = extractVideoId(href);
        if (videoId) {
          const overlayButton = createOverlayButton(videoId, false);
          thumbnail.appendChild(overlayButton);
          thumbnail.setAttribute("data-overlay-added", "true");
        }
      }
    });

    const allShortsContainers = document.querySelectorAll(
      "ytm-shorts-lockup-view-model:not([data-overlay-added])"
    );
    console.log("Found shorts containers:", allShortsContainers.length);

    allShortsContainers.forEach((shortsContainer) => {
      const link = shortsContainer.querySelector('a[href*="/shorts/"]');
      if (link) {
        const href = link.getAttribute("href");
        const videoId = extractVideoId(href);
        console.log("Processing shorts:", videoId, href);

        if (videoId) {
          const overlayButton = createOverlayButton(videoId, true);

          const thumbnailContainer = shortsContainer.querySelector(
            ".shortsLockupViewModelHostThumbnailContainer"
          );
          if (thumbnailContainer) {
            console.log("Adding button to thumbnail container");
            thumbnailContainer.appendChild(overlayButton);
          } else {
            console.log("Adding button to main container");
            shortsContainer.appendChild(overlayButton);
          }

          shortsContainer.setAttribute("data-overlay-added", "true");
        }
      }
    });

    const sidebarShorts = document.querySelectorAll(
      ".shortsLockupViewModelHostEndpoint:not([data-overlay-added])"
    );
    sidebarShorts.forEach((container) => {
      if (container.closest("ytm-shorts-lockup-view-model")) {
        return;
      }

      const href = container.getAttribute("href");
      if (href) {
        const videoId = extractVideoId(href);
        if (videoId) {
          const overlayButton = createOverlayButton(videoId, true);
          container.appendChild(overlayButton);
          container.setAttribute("data-overlay-added", "true");
        }
      }
    });

    addOrUpdateThumbnailImage();

    processAvatars();
    processChannelBanners();

    cleanupDuplicateButtons();
  }

  function observeChanges() {
    const observer = new MutationObserver(function (mutations) {
      let shouldCheck = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (
                node.querySelector &&
                (node.querySelector(
                  ".yt-lockup-view-model-wiz__content-image"
                ) ||
                  node.classList.contains(
                    "yt-lockup-view-model-wiz__content-image"
                  ) ||
                  node.querySelector(".shortsLockupViewModelHostEndpoint") ||
                  node.classList.contains(
                    "shortsLockupViewModelHostEndpoint"
                  ) ||
                  node.querySelector("ytd-thumbnail") ||
                  node.classList.contains("ytd-thumbnail") ||
                  node.querySelector("ytm-shorts-lockup-view-model") ||
                  node.classList.contains("ytm-shorts-lockup-view-model") ||
                  node.querySelector("yt-avatar-shape") ||
                  node.classList.contains("yt-avatar-shape") ||
                  node.querySelector("yt-image-banner-view-model") ||
                  node.classList.contains("yt-image-banner-view-model"))
              ) {
                shouldCheck = true;
              }
            }
          });
        }
      });

      if (shouldCheck) {
        setTimeout(addOverlayButtons, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function setupUrlChangeDetection() {
    let currentUrl = location.href;

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      originalPushState.apply(history, arguments);
      setTimeout(() => {
        if (location.href !== currentUrl) {
          currentUrl = location.href;
          setTimeout(addOverlayButtons, 500);
        }
      }, 100);
    };

    history.replaceState = function () {
      originalReplaceState.apply(history, arguments);
      setTimeout(() => {
        if (location.href !== currentUrl) {
          currentUrl = location.href;
          setTimeout(addOverlayButtons, 500);
        }
      }, 100);
    };

    window.addEventListener("popstate", function () {
      setTimeout(() => {
        if (location.href !== currentUrl) {
          currentUrl = location.href;
          setTimeout(addOverlayButtons, 500);
        }
      }, 100);
    });

    setInterval(function () {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        setTimeout(addOverlayButtons, 300);
      }
    }, 500);

    document.addEventListener("yt-navigate-start", function () {
      setTimeout(addOverlayButtons, 1000);
    });

    document.addEventListener("yt-navigate-finish", function () {
      setTimeout(addOverlayButtons, 500);
    });
  }

  function observePageChanges() {
    const contentObserver = new MutationObserver((mutations) => {
      let shouldProcessRegular = false;

      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldProcessRegular = true;
        }
      });

      if (shouldProcessRegular) {
        processAvatars();
        processChannelBanners();
      }
    });

    const panelObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "childList" &&
          (mutation.target.id === "secondary" ||
            mutation.target.id === "secondary-inner")
        ) {
          addOrUpdateThumbnailImage();
        }
      }
    });

    contentObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const observeSecondary = () => {
      const secondary = document.getElementById("secondary");
      if (secondary) {
        panelObserver.observe(secondary, {
          childList: true,
          subtree: true,
        });
      } else {
        setTimeout(observeSecondary, 1000);
      }
    };

    observeSecondary();
  }

  function init() {
    addOverlayButtons();
    observeChanges();
    observePageChanges();
    setupUrlChangeDetection();

    window.addEventListener("yt-navigate-finish", () => {
      addOrUpdateThumbnailImage();
      setTimeout(addOverlayButtons, 1000);
    });

    setTimeout(addOverlayButtons, 2000);
    setTimeout(addOverlayButtons, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
