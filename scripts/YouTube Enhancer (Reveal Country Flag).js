// ==UserScript==
// @name         YouTube Enhancer (Reveal Country Flag)
// @description  Display country flags for YouTube channels and videos.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.2
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      exyezed.vercel.app
// ==/UserScript==

(function() {
    'use strict';

    const countryNames = {
        'AF': 'Afghanistan', 'AL': 'Albania', 'DZ': 'Algeria', 'AS': 'American Samoa', 'AD': 'Andorra', 'AO': 'Angola', 'AI': 'Anguilla', 'AQ': 'Antarctica', 'AG': 'Antigua and Barbuda', 'AR': 'Argentina', 'AM': 'Armenia', 'AW': 'Aruba', 'AU': 'Australia', 'AT': 'Austria', 'AZ': 'Azerbaijan', 'BS': 'Bahamas', 'BH': 'Bahrain', 'BD': 'Bangladesh', 'BB': 'Barbados', 'BY': 'Belarus', 'BE': 'Belgium', 'BZ': 'Belize', 'BJ': 'Benin', 'BM': 'Bermuda', 'BT': 'Bhutan', 'BO': 'Bolivia', 'BQ': 'Bonaire, Sint Eustatius and Saba', 'BA': 'Bosnia and Herzegovina', 'BW': 'Botswana', 'BV': 'Bouvet Island', 'BR': 'Brazil', 'IO': 'British Indian Ocean Territory', 'BN': 'Brunei Darussalam', 'BG': 'Bulgaria', 'BF': 'Burkina Faso', 'BI': 'Burundi', 'CV': 'Cabo Verde', 'KH': 'Cambodia', 'CM': 'Cameroon', 'CA': 'Canada', 'KY': 'Cayman Islands', 'CF': 'Central African Republic', 'TD': 'Chad', 'CL': 'Chile', 'CN': 'China', 'CX': 'Christmas Island', 'CC': 'Cocos Islands', 'CO': 'Colombia', 'KM': 'Comoros', 'CG': 'Congo', 'CD': 'Congo, Democratic Republic of the', 'CK': 'Cook Islands', 'CR': 'Costa Rica', 'HR': 'Croatia', 'CU': 'Cuba', 'CW': 'Curaçao', 'CY': 'Cyprus', 'CZ': 'Czechia', 'DK': 'Denmark', 'DJ': 'Djibouti', 'DM': 'Dominica', 'DO': 'Dominican Republic', 'EC': 'Ecuador', 'EG': 'Egypt', 'SV': 'El Salvador', 'GQ': 'Equatorial Guinea', 'ER': 'Eritrea', 'EE': 'Estonia', 'SZ': 'Eswatini', 'ET': 'Ethiopia', 'FK': 'Falkland Islands', 'FO': 'Faroe Islands', 'FJ': 'Fiji', 'FI': 'Finland', 'FR': 'France', 'GF': 'French Guiana', 'PF': 'French Polynesia', 'TF': 'French Southern Territories', 'GA': 'Gabon', 'GM': 'Gambia', 'GE': 'Georgia', 'DE': 'Germany', 'GH': 'Ghana', 'GI': 'Gibraltar', 'GR': 'Greece', 'GL': 'Greenland', 'GD': 'Grenada', 'GP': 'Guadeloupe', 'GU': 'Guam', 'GT': 'Guatemala', 'GG': 'Guernsey', 'GN': 'Guinea', 'GW': 'Guinea-Bissau', 'GY': 'Guyana', 'HT': 'Haiti', 'HM': 'Heard Island and McDonald Islands', 'VA': 'Holy See', 'HN': 'Honduras', 'HK': 'Hong Kong', 'HU': 'Hungary', 'IS': 'Iceland', 'IN': 'India', 'ID': 'Indonesia', 'IR': 'Iran', 'IQ': 'Iraq', 'IE': 'Ireland', 'IM': 'Isle of Man', 'IL': 'Israel', 'IT': 'Italy', 'JM': 'Jamaica', 'JP': 'Japan', 'JE': 'Jersey', 'JO': 'Jordan', 'KZ': 'Kazakhstan', 'KE': 'Kenya', 'KI': 'Kiribati', 'KP': 'North Korea', 'KR': 'South Korea', 'KW': 'Kuwait', 'KG': 'Kyrgyzstan', 'LA': 'Lao People\'s Democratic Republic', 'LV': 'Latvia', 'LB': 'Lebanon', 'LS': 'Lesotho', 'LR': 'Liberia', 'LY': 'Libya', 'LI': 'Liechtenstein', 'LT': 'Lithuania', 'LU': 'Luxembourg', 'MO': 'Macao', 'MG': 'Madagascar', 'MW': 'Malawi', 'MY': 'Malaysia', 'MV': 'Maldives', 'ML': 'Mali', 'MT': 'Malta', 'MH': 'Marshall Islands', 'MQ': 'Martinique', 'MR': 'Mauritania', 'MU': 'Mauritius', 'YT': 'Mayotte', 'MX': 'Mexico', 'FM': 'Micronesia', 'MD': 'Moldova', 'MC': 'Monaco', 'MN': 'Mongolia', 'ME': 'Montenegro', 'MS': 'Montserrat', 'MA': 'Morocco', 'MZ': 'Mozambique', 'MM': 'Myanmar', 'NA': 'Namibia', 'NR': 'Nauru', 'NP': 'Nepal', 'NL': 'Netherlands', 'NC': 'New Caledonia', 'NZ': 'New Zealand', 'NI': 'Nicaragua', 'NE': 'Niger', 'NG': 'Nigeria', 'NU': 'Niue', 'NF': 'Norfolk Island', 'MK': 'North Macedonia', 'MP': 'Northern Mariana Islands', 'NO': 'Norway', 'OM': 'Oman', 'PK': 'Pakistan', 'PW': 'Palau', 'PS': 'Palestine, State of', 'PA': 'Panama', 'PG': 'Papua New Guinea', 'PY': 'Paraguay', 'PE': 'Peru', 'PH': 'Philippines', 'PN': 'Pitcairn', 'PL': 'Poland', 'PT': 'Portugal', 'PR': 'Puerto Rico', 'QA': 'Qatar', 'RO': 'Romania', 'RU': 'Russian Federation', 'RW': 'Rwanda', 'RE': 'Réunion', 'BL': 'Saint Barthélemy', 'SH': 'Saint Helena, Ascension and Tristan da Cunha', 'KN': 'Saint Kitts and Nevis', 'LC': 'Saint Lucia', 'MF': 'Saint Martin', 'PM': 'Saint Pierre and Miquelon', 'VC': 'Saint Vincent and the Grenadines', 'WS': 'Samoa', 'SM': 'San Marino', 'ST': 'Sao Tome and Principe', 'SA': 'Saudi Arabia', 'SN': 'Senegal', 'RS': 'Serbia', 'SC': 'Seychelles', 'SL': 'Sierra Leone', 'SG': 'Singapore', 'SX': 'Sint Maarten', 'SK': 'Slovakia', 'SI': 'Slovenia', 'SB': 'Solomon Islands', 'SO': 'Somalia', 'ZA': 'South Africa', 'GS': 'South Georgia and the South Sandwich Islands', 'SS': 'South Sudan', 'ES': 'Spain', 'LK': 'Sri Lanka', 'SD': 'Sudan', 'SR': 'Suriname', 'SJ': 'Svalbard and Jan Mayen', 'SE': 'Sweden', 'CH': 'Switzerland', 'SY': 'Syrian Arab Republic', 'TW': 'Taiwan', 'TJ': 'Tajikistan', 'TZ': 'Tanzania', 'TH': 'Thailand', 'TL': 'Timor-Leste', 'TG': 'Togo', 'TK': 'Tokelau', 'TO': 'Tonga', 'TT': 'Trinidad and Tobago', 'TN': 'Tunisia', 'TR': 'Turkey', 'TM': 'Turkmenistan', 'TC': 'Turks and Caicos Islands', 'TV': 'Tuvalu', 'UG': 'Uganda', 'UA': 'Ukraine', 'AE': 'United Arab Emirates', 'GB': 'United Kingdom', 'US': 'United States', 'UM': 'United States Minor Outlying Islands', 'UY': 'Uruguay', 'UZ': 'Uzbekistan', 'VU': 'Vanuatu', 'VE': 'Venezuela', 'VN': 'Viet Nam', 'VG': 'Virgin Islands', 'VI': 'Virgin Islands', 'WF': 'Wallis and Futuna', 'EH': 'Western Sahara', 'YE': 'Yemen', 'ZM': 'Zambia', 'ZW': 'Zimbabwe'
    };

    const processedVideos = new Set();
    let currentChannelIdentifier = null;
    let currentVideoId = null;

    function checkDOMElements() {
        const requiredElements = {
            channelPage: ['.yt-core-attributed-string--white-space-pre-wrap', '#channel-name', '#text.ytd-channel-name', 'ytd-channel-name', 'h1.style-scope.ytd-channel-header-renderer', 'ytd-channel-name#channel-name', 'ytd-channel-name.ytd-c4-tabbed-header-renderer'],
            videoPage: ['h1.style-scope.ytd-watch-metadata', 'ytd-watch-flexy']
        };

        const channelReady = requiredElements.channelPage.some(selector => document.querySelector(selector));
        const videoReady = requiredElements.videoPage.some(selector => document.querySelector(selector));

        return {
            channelReady,
            videoReady
        };
    }

    function createFlagContainer(countryCode, isChannel) {
        const container = document.createElement('div');
        container.style.marginLeft = '8px';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.padding = '4px';

        const flagImg = document.createElement('img');
        flagImg.src = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${countryCode.toLowerCase()}.svg`;
        flagImg.style.width = isChannel ? '26px' : '20px';
        flagImg.style.height = 'auto';
        flagImg.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
        flagImg.style.cursor = 'pointer';

        container.appendChild(flagImg);
        container.setAttribute('title', countryNames[countryCode] || countryCode);
        return container;
    }

    function getChannelIdentifier() {
        const path = window.location.pathname;
        if (path.includes('/@')) {
            const match = path.match(/@([^/]+)/);
            return match ? match[1] : null;
        }
        if (path.includes('/channel/')) {
            const match = path.match(/\/channel\/(UC[\w-]+)/);
            return match ? match[1] : null;
        }
        return null;
    }

    function isChannelPage() {
        const path = window.location.pathname;
        const channelTabs = ['/@', '/channel/', '/featured', '/videos', '/streams', '/shorts', '/courses', '/playlists', '/community', '/podcasts', '/store', '/about', '/membership', '/channels', '/search'];
        return channelTabs.some(tab => path.includes(tab));
    }

    function fetchChannelCountryData(channelIdentifier) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://exyezed.vercel.app/api/channel/${channelIdentifier}`,
                onload: function(response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        resolve(data.country);
                    } catch (error) {
                        reject(error);
                    }
                },
                onerror: reject
            });
        });
    }

    async function addChannelFlag() {
        if (!isChannelPage()) return;

        const channelIdentifier = getChannelIdentifier();
        if (!channelIdentifier) return;

        if (channelIdentifier === currentChannelIdentifier) {
            if (window.location.pathname === document.lastPathChecked) return;
        }

        currentChannelIdentifier = channelIdentifier;
        document.lastPathChecked = window.location.pathname;

        const selectors = ['.yt-core-attributed-string--white-space-pre-wrap', '#channel-name', '#text.ytd-channel-name', 'ytd-channel-name', 'h1.style-scope.ytd-channel-header-renderer', 'ytd-channel-name#channel-name', 'ytd-channel-name.ytd-c4-tabbed-header-renderer'];
        const channelNameContainer = selectors.map(selector => document.querySelector(selector)).find(el => el);

        if (channelNameContainer) {
            const existingFlag = channelNameContainer.querySelector('.country-flag-container');
            if (existingFlag) existingFlag.remove();

            try {
                const country = await fetchChannelCountryData(channelIdentifier);
                if (!country || country === 'Unknown') return;

                const verificationBadge = channelNameContainer.querySelector('.yt-core-attributed-string--inline-block-mod');
                const flagContainer = createFlagContainer(country, true);
                flagContainer.classList.add('country-flag-container');
                flagContainer.style.display = 'inline-flex';

                if (verificationBadge) {
                    verificationBadge.parentNode.insertBefore(flagContainer, verificationBadge.nextSibling);
                } else {
                    channelNameContainer.appendChild(flagContainer);
                }

                const flagImg = flagContainer.querySelector('img');
                flagImg.onerror = () => flagContainer.remove();
            } catch (error) {
                return;
            }
        }
    }

    function getVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('v');
        if (!videoId) {
            const videoElement = document.querySelector('ytd-watch-flexy');
            return videoElement?.getAttribute('video-id') || null;
        }
        return videoId;
    }

    function fetchVideoCountryData(videoId) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://exyezed.vercel.app/api/video/${videoId}`,
                onload: function(response) {
                    try {
                        const data = JSON.parse(response.responseText);
                        resolve(data.country);
                    } catch (error) {
                        reject(error);
                    }
                },
                onerror: reject
            });
        });
    }

    function isVideoPage() {
        return window.location.pathname === '/watch' || document.querySelector('ytd-watch-flexy') !== null;
    }

    async function addVideoFlag() {
        if (!isVideoPage()) return;

        const videoId = getVideoId();
        if (!videoId || videoId === currentVideoId || processedVideos.has(videoId)) return;

        currentVideoId = videoId;
        
        const titleContainer = document.querySelector('h1.style-scope.ytd-watch-metadata');
        if (!titleContainer) return;

        const existingFlag = titleContainer.querySelector('.country-flag-container');
        if (existingFlag) existingFlag.remove();

        try {
            const country = await fetchVideoCountryData(videoId);
            if (!country || country === 'Unknown') return;

            titleContainer.style.display = 'flex';
            titleContainer.style.alignItems = 'center';

            const flagContainer = createFlagContainer(country, false);
            flagContainer.classList.add('country-flag-container');
            titleContainer.appendChild(flagContainer);

            const flagImg = flagContainer.querySelector('img');
            flagImg.onerror = () => flagContainer.remove();

            processedVideos.add(videoId);
        } catch (error) {
            return;
        }
    }

    function setupObservers() {
        let lastUrl = location.href;

        new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                currentChannelIdentifier = null;
                currentVideoId = null;
                
                const tryAddFlags = (attempts = 0) => {
                    const { channelReady, videoReady } = checkDOMElements();
                    
                    if ((channelReady || videoReady) || attempts > 10) {
                        if (channelReady) addChannelFlag();
                        if (videoReady) addVideoFlag();
                    } else {
                        setTimeout(() => tryAddFlags(attempts + 1), 100);
                    }
                };

                tryAddFlags();
            }
        }).observe(document, {subtree: true, childList: true});

        const contentObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.target.id === 'content' ||
                    mutation.target.id === 'primary' ||
                    mutation.target.id === 'player' ||
                    mutation.target.id === 'channel-header' ||
                    mutation.target.classList.contains('ytd-c4-tabbed-header-renderer')) {
                    const { channelReady, videoReady } = checkDOMElements();
                    if (channelReady) addChannelFlag();
                    if (videoReady) addVideoFlag();
                    break;
                }
            }
        });

        const observeTargets = ['#content', '#primary', '#player', '#channel-header', 'ytd-c4-tabbed-header-renderer']
            .map(selector => document.querySelector(selector))
            .filter(Boolean);

        observeTargets.forEach(target => {
            contentObserver.observe(target, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['video-id', 'page-subtype']
            });
        });
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setupObservers();
                const { channelReady, videoReady } = checkDOMElements();
                if (channelReady) addChannelFlag();
                if (videoReady) addVideoFlag();
            });
        } else {
            setupObservers();
            const { channelReady, videoReady } = checkDOMElements();
            if (channelReady) addChannelFlag();
            if (videoReady) addVideoFlag();
        }
    }

    init();
    console.log('YouTube Enhancer (Reveal Country Flag) is running');
})();
