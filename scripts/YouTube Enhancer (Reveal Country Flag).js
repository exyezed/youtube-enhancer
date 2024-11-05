// ==UserScript==
// @name         YouTube Enhancer (Reveal Country Flag)
// @description  Display country flags for YouTube channels, videos and shorts.
// @icon         https://raw.githubusercontent.com/exyezed/youtube-enhancer/refs/heads/main/extras/youtube-enhancer.png
// @version      1.3
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const FLAG_CONFIG = {
        BASE_URL: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/7.2.3/flags/4x3/',
        SIZES: {
            channel: '28px',
            title: '22px',
            shorts: '20px'
        },
        MARGINS: {
            channel: '12px',
            title: '10px',
            shorts: '8px'
        }
    };

    const COUNTRY_NAMES = {
        'af': 'Afghanistan', 'al': 'Albania', 'dz': 'Algeria', 'as': 'American Samoa', 'ad': 'Andorra', 'ao': 'Angola', 'ai': 'Anguilla', 'aq': 'Antarctica', 'ag': 'Antigua and Barbuda', 'ar': 'Argentina', 'am': 'Armenia', 'aw': 'Aruba', 'au': 'Australia', 'at': 'Austria', 'az': 'Azerbaijan', 'bs': 'Bahamas', 'bh': 'Bahrain', 'bd': 'Bangladesh', 'bb': 'Barbados', 'by': 'Belarus', 'be': 'Belgium', 'bz': 'Belize', 'bj': 'Benin', 'bm': 'Bermuda', 'bt': 'Bhutan', 'bo': 'Bolivia', 'bq': 'Bonaire, Sint Eustatius and Saba', 'ba': 'Bosnia and Herzegovina', 'bw': 'Botswana', 'bv': 'Bouvet Island', 'br': 'Brazil', 'io': 'British Indian Ocean Territory', 'bn': 'Brunei Darussalam', 'bg': 'Bulgaria', 'bf': 'Burkina Faso', 'bi': 'Burundi', 'cv': 'Cabo Verde', 'kh': 'Cambodia', 'cm': 'Cameroon', 'ca': 'Canada', 'ky': 'Cayman Islands', 'cf': 'Central African Republic', 'td': 'Chad', 'cl': 'Chile', 'cn': 'China', 'cx': 'Christmas Island', 'cc': 'Cocos Islands', 'co': 'Colombia', 'km': 'Comoros', 'cg': 'Congo', 'cd': 'Congo, Democratic Republic of the', 'ck': 'Cook Islands', 'cr': 'Costa Rica', 'hr': 'Croatia', 'cu': 'Cuba', 'cw': 'Curaçao', 'cy': 'Cyprus', 'cz': 'Czechia', 'dk': 'Denmark', 'dj': 'Djibouti', 'dm': 'Dominica', 'do': 'Dominican Republic', 'ec': 'Ecuador', 'eg': 'Egypt', 'sv': 'El Salvador', 'gq': 'Equatorial Guinea', 'er': 'Eritrea', 'ee': 'Estonia', 'sz': 'Eswatini', 'et': 'Ethiopia', 'fk': 'Falkland Islands', 'fo': 'Faroe Islands', 'fj': 'Fiji', 'fi': 'Finland', 'fr': 'France', 'gf': 'French Guiana', 'pf': 'French Polynesia', 'tf': 'French Southern Territories', 'ga': 'Gabon', 'gm': 'Gambia', 'ge': 'Georgia', 'de': 'Germany', 'gh': 'Ghana', 'gi': 'Gibraltar', 'gr': 'Greece', 'gl': 'Greenland', 'gd': 'Grenada', 'gp': 'Guadeloupe', 'gu': 'Guam', 'gt': 'Guatemala', 'gg': 'Guernsey', 'gn': 'Guinea', 'gw': 'Guinea-Bissau', 'gy': 'Guyana', 'ht': 'Haiti', 'hm': 'Heard Island and McDonald Islands', 'va': 'Holy See', 'hn': 'Honduras', 'hk': 'Hong Kong', 'hu': 'Hungary', 'is': 'Iceland', 'in': 'India', 'id': 'Indonesia', 'ir': 'Iran', 'iq': 'Iraq', 'ie': 'Ireland', 'im': 'Isle of Man', 'il': 'Israel', 'it': 'Italy', 'jm': 'Jamaica', 'jp': 'Japan', 'je': 'Jersey', 'jo': 'Jordan', 'kz': 'Kazakhstan', 'ke': 'Kenya', 'ki': 'Kiribati', 'kp': 'North Korea', 'kr': 'South Korea', 'kw': 'Kuwait', 'kg': 'Kyrgyzstan', 'la': 'Lao People\'s Democratic Republic', 'lv': 'Latvia', 'lb': 'Lebanon', 'ls': 'Lesotho', 'lr': 'Liberia', 'ly': 'Libya', 'li': 'Liechtenstein', 'lt': 'Lithuania', 'lu': 'Luxembourg', 'mo': 'Macao', 'mg': 'Madagascar', 'mw': 'Malawi', 'my': 'Malaysia', 'mv': 'Maldives', 'ml': 'Mali', 'mt': 'Malta', 'mh': 'Marshall Islands', 'mq': 'Martinique', 'mr': 'Mauritania', 'mu': 'Mauritius', 'yt': 'Mayotte', 'mx': 'Mexico', 'fm': 'Micronesia', 'md': 'Moldova', 'mc': 'Monaco', 'mn': 'Mongolia', 'me': 'Montenegro', 'ms': 'Montserrat', 'ma': 'Morocco', 'mz': 'Mozambique', 'mm': 'Myanmar', 'na': 'Namibia', 'nr': 'Nauru', 'np': 'Nepal', 'nl': 'Netherlands', 'nc': 'New Caledonia', 'nz': 'New Zealand', 'ni': 'Nicaragua', 'ne': 'Niger', 'ng': 'Nigeria', 'nu': 'Niue', 'nf': 'Norfolk Island', 'mk': 'North Macedonia', 'mp': 'Northern Mariana Islands', 'no': 'Norway', 'om': 'Oman', 'pk': 'Pakistan', 'pw': 'Palau', 'ps': 'Palestine, State of', 'pa': 'Panama', 'pg': 'Papua New Guinea', 'py': 'Paraguay', 'pe': 'Peru', 'ph': 'Philippines', 'pn': 'Pitcairn', 'pl': 'Poland', 'pt': 'Portugal', 'pr': 'Puerto Rico', 'qa': 'Qatar', 'ro': 'Romania', 'ru': 'Russian Federation', 'rw': 'Rwanda', 're': 'Réunion', 'bl': 'Saint Barthélemy', 'sh': 'Saint Helena, Ascension and Tristan da Cunha', 'kn': 'Saint Kitts and Nevis', 'lc': 'Saint Lucia', 'mf': 'Saint Martin', 'pm': 'Saint Pierre and Miquelon', 'vc': 'Saint Vincent and the Grenadines', 'ws': 'Samoa', 'sm': 'San Marino', 'st': 'Sao Tome and Principe', 'sa': 'Saudi Arabia', 'sn': 'Senegal', 'rs': 'Serbia', 'sc': 'Seychelles', 'sl': 'Sierra Leone', 'sg': 'Singapore', 'sx': 'Sint Maarten', 'sk': 'Slovakia', 'si': 'Slovenia', 'sb': 'Solomon Islands', 'so': 'Somalia', 'za': 'South Africa', 'gs': 'South Georgia and the South Sandwich Islands', 'ss': 'South Sudan', 'es': 'Spain', 'lk': 'Sri Lanka', 'sd': 'Sudan', 'sr': 'Suriname', 'sj': 'Svalbard and Jan Mayen', 'se': 'Sweden', 'ch': 'Switzerland', 'sy': 'Syrian Arab Republic', 'tw': 'Taiwan', 'tj': 'Tajikistan', 'tz': 'Tanzania', 'th': 'Thailand', 'tl': 'Timor-Leste', 'tg': 'Togo', 'tk': 'Tokelau', 'to': 'Tonga', 'tt': 'Trinidad and Tobago', 'tn': 'Tunisia', 'tr': 'Turkey', 'tm': 'Turkmenistan', 'tc': 'Turks and Caicos Islands', 'tv': 'Tuvalu', 'ug': 'Uganda', 'ua': 'Ukraine', 'ae': 'United Arab Emirates', 'gb': 'United Kingdom', 'us': 'United States', 'um': 'United States Minor Outlying Islands', 'uy': 'Uruguay', 'uz': 'Uzbekistan', 'vu': 'Vanuatu', 've': 'Venezuela', 'vn': 'Viet Nam', 'vg': 'Virgin Islands', 'vi': 'Virgin Islands', 'wf': 'Wallis and Futuna', 'eh': 'Western Sahara', 'ye': 'Yemen', 'zm': 'Zambia', 'zw': 'Zimbabwe'
    };    

    const CACHE_CONFIG = {
        PREFIX: 'yt_enhancer_',
        EXPIRATION: 7 * 24 * 60 * 60 * 1000
    };

    const processedElements = new Set();

    function getCacheKey(type, id) {
        return `${CACHE_CONFIG.PREFIX}${type}_${id}`;
    }

    function getFromCache(type, id) {
        const cacheKey = getCacheKey(type, id);
        const cachedData = GM_getValue(cacheKey);
        
        if (!cachedData) return null;

        const { value, timestamp } = JSON.parse(cachedData);
        const now = Date.now();

        if (now - timestamp > CACHE_CONFIG.EXPIRATION) {
            GM_setValue(cacheKey, null);
            return null;
        }

        return value;
    }

    function setToCache(type, id, value) {
        const cacheKey = getCacheKey(type, id);
        const cacheData = {
            value: value,
            timestamp: Date.now()
        };
        GM_setValue(cacheKey, JSON.stringify(cacheData));
    }

    async function getCountryCode(type, id) {
        const cachedValue = getFromCache(type, id);
        if (cachedValue) {
            return cachedValue;
        }

        const url = `https://exyezed.vercel.app/api/${type}/${id}`;

        if (typeof GM_xmlhttpRequest !== 'undefined') {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            try {
                                const data = JSON.parse(response.responseText);
                                const countryCode = data.country.toLowerCase() || 'unknown';
                                setToCache(type, id, countryCode);
                                resolve(countryCode);
                            } catch (error) {
                                console.error('Error parsing JSON:', error);
                                resolve('unknown');
                            }
                        } else {
                            console.error('Request failed:', response.status);
                            resolve('unknown');
                        }
                    },
                    onerror: function(error) {
                        console.error('Request error:', error);
                        resolve('unknown');
                    }
                });
            });
        } else {
            return 'unknown';
        }
    }

    function createFlag(size, margin, className, countryCode) {
        const flag = document.createElement('img');
        flag.src = countryCode === 'unknown'
            ? 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/7.2.3/flags/4x3/xx.svg'
            : `${FLAG_CONFIG.BASE_URL}${countryCode}.svg`;
        flag.className = `country-flag ${className}`;
        flag.style.width = size;
        flag.style.height = 'auto';
        flag.style.marginLeft = margin;
        flag.style.verticalAlign = 'middle';
        flag.style.cursor = 'pointer';
        flag.title = countryCode === 'unknown' 
            ? 'Country Not Set'
            : (COUNTRY_NAMES[countryCode] || countryCode.toUpperCase());
        
        return flag;
    }

    function removeExistingFlags(element) {
        const existingFlags = element.querySelectorAll('.country-flag');
        existingFlags.forEach(flag => flag.remove());
    }

    async function addFlag() {
        // Channel
        const channelElement = document.querySelector('.dynamic-text-view-model-wiz__h1 .yt-core-attributed-string');
        if (channelElement && !processedElements.has(channelElement)) {
            removeExistingFlags(channelElement.parentElement);
            processedElements.add(channelElement);
            const channelUrl = window.location.pathname;
            const channelId = channelUrl.includes('@')
                ? channelUrl.split('@')[1].split('/')[0]
                : channelUrl.split('/')[2];

            const countryCode = await getCountryCode('channel', channelId);
            channelElement.appendChild(
                createFlag(FLAG_CONFIG.SIZES.channel, FLAG_CONFIG.MARGINS.channel, 'channel-flag', countryCode)
            );
        }

        // Video
        const titleElement = document.querySelector('#title yt-formatted-string');
        if (titleElement && !processedElements.has(titleElement)) {
            const titleParent = titleElement.closest('#title h1');
            if (titleParent) {
                removeExistingFlags(titleParent);
                processedElements.add(titleElement);
                const videoId = new URLSearchParams(window.location.search).get('v');
                if (videoId) {
                    const countryCode = await getCountryCode('video', videoId);
                    titleParent.style.display = 'flex';
                    titleParent.style.alignItems = 'center';
                    titleParent.appendChild(
                        createFlag(FLAG_CONFIG.SIZES.title, FLAG_CONFIG.MARGINS.title, 'title-flag', countryCode)
                    );
                }
            }
        }

        // Shorts
        const shortsChannelElements = document.querySelectorAll('.YtReelChannelBarViewModelChannelName');
        shortsChannelElements.forEach(async element => {
            if (!processedElements.has(element)) {
                removeExistingFlags(element);
                processedElements.add(element);
                const shortsId = window.location.pathname.split('/').pop();
                const countryCode = await getCountryCode('video', shortsId);
                element.appendChild(
                    createFlag(FLAG_CONFIG.SIZES.shorts, FLAG_CONFIG.MARGINS.shorts, 'shorts-flag', countryCode)
                );
            }
        });
    }

    const shortsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                setTimeout(addFlag, 100);
            }
        });
    });

    const regularObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                addFlag();
            }
        });
    });

    const startObservers = () => {
        const shortsContainer = document.querySelector('ytd-shorts');
        if (shortsContainer) {
            shortsObserver.observe(shortsContainer, {
                childList: true,
                subtree: true
            });
        }

        regularObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    function init() {
        processedElements.clear();
        startObservers();
        addFlag();

        window.addEventListener('yt-navigate-finish', () => {
            shortsObserver.disconnect();
            regularObserver.disconnect();
            processedElements.clear();
            startObservers();
            addFlag();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    console.log('YouTube Enhancer (Reveal Country Flag) is running');
})();
