(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * @module kung-fu/components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAudioPlayer = exports.AudioPlayer = void 0;
/**
 * AudioPlayer - A class for creating customizable audio players with playlist support
 *
 * @export
 * @class AudioPlayer
 */
class AudioPlayer {
    /**
     * Creates an instance of AudioPlayer.
     * Initializes the audio player with the specified container and default source.
     *
     * @param {AudioPlayerOptions} opts - Configuration options
     * @memberof AudioPlayer
     * @throws {Error} If the container or audio element cannot be found
     */
    constructor(opts) {
        this._opts = opts;
        const { ContainerID, DefaultSource } = this._opts;
        const audioContainer = document.querySelector(`#${ContainerID}`);
        const audioPlayer = audioContainer.querySelector('audio');
        if (DefaultSource != null) {
            audioPlayer.src = DefaultSource;
        }
        if (audioPlayer.controls == null) {
            audioPlayer.controls = true;
        }
        audioPlayer.style.display = 'block';
        this._audioContainer = audioContainer;
    }
    /**
     * Adds playlist functionality to the audio player
     * Sets up click event listeners on playlist items to switch audio sources
     * and update audio player elements (cover image, title, date, summary)
     *
     * @param {string} playlistID - The ID of the playlist container element (without the # prefix)
     * @returns {void}
     * @memberof AudioPlayer
     * @throws {Error} If the playlist element cannot be found
     */
    withPlaylist(playlistID) {
        const self = this;
        const audioPlayer = self._audioContainer.querySelector('audio');
        const playlist = document.querySelector(`#${playlistID}`);
        const anchorNodes = playlist.querySelectorAll('dt');
        const anchors = Array.from(anchorNodes);
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', function () {
                const source = anchor.getAttribute('data-source');
                const img = anchor.getAttribute('data-cover-img');
                const title = anchor.getAttribute('data-title') || anchor.innerText;
                const pubDate = anchor.getAttribute('data-pub');
                const summary = anchor.getAttribute('data-summary');
                audioPlayer.pause();
                audioPlayer.src = source;
                const audioPlayerCover = self._audioContainer.querySelector('#audio-player-cover');
                if (audioPlayerCover) {
                    const coverImage = document.createElement('img');
                    coverImage.src = img;
                    coverImage.title = title;
                    coverImage.alt = title;
                    audioPlayerCover.innerHTML = '';
                    audioPlayerCover.appendChild(coverImage);
                }
                const audioPlayerTitle = self._audioContainer.querySelector('#audio-player-title');
                if (audioPlayerTitle) {
                    audioPlayerTitle.innerText = title;
                }
                const audioPlayerDate = self._audioContainer.querySelector('#audio-player-date');
                if (audioPlayerDate) {
                    audioPlayerDate.innerText = pubDate;
                }
                const audioPlayerSummary = self._audioContainer.querySelector('#audio-player-summary');
                if (audioPlayerSummary) {
                    audioPlayerSummary.innerText = summary;
                }
                audioPlayer.play();
            });
        });
    }
}
exports.AudioPlayer = AudioPlayer;
/**
 * Factory function to create an AudioPlayer instance
 *
 * @export
 * @param {string} audioContainerID - ID of the container element (without the # prefix)
 * @param {string} [defaultSource] - Optional default audio source URL
 * @returns {AudioPlayer} A new AudioPlayer instance
 */
const createAudioPlayer = (audioContainerID, defaultSource) => {
    return new AudioPlayer({ ContainerID: audioContainerID, DefaultSource: defaultSource });
};
exports.createAudioPlayer = createAudioPlayer;

},{}],2:[function(require,module,exports){
"use strict";
/**
 * @module kung-fu/components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateListStyleType = void 0;
/**
 * Recursively traverses a list structure and applies list style types based on nesting level
 * When the nesting level exceeds 3, it resets back to 0, creating a repeating pattern
 *
 * @param {HTMLUListElement} elem - The list element to style
 * @param {number} level - The current nesting level
 * @param {string[]} order - Array of list style types to apply
 * @returns {void}
 * @private
 */
function traverseList(elem, level, order) {
    if (level == 3) {
        level = 0;
    }
    elem.style.listStyleType = order[level];
    const children = elem.querySelectorAll(':scope > li > ul');
    Array.from(children).forEach((el) => traverseList(el, level + 1, order));
}
/**
 * Applies rotating list style types to nested unordered lists based on their nesting level
 * Only affects top-level lists (those not contained within list items)
 *
 * @export
 * @param {string} [selector='ul'] - CSS selector for list elements
 * @param {string[]} [order=['disc', 'circle', 'square']] - List style types to apply in sequence
 * @returns {void}
 * @example
 * // Apply default styling to all unordered lists
 * rotateListStyleType();
 *
 * // Apply custom styling to specific lists with a class
 * rotateListStyleType('.custom-list', ['decimal', 'lower-alpha', 'lower-roman']);
 */
const rotateListStyleType = (selector, order) => {
    selector = selector || 'ul';
    order = order || ['disc', 'circle', 'square'];
    const uls = document.querySelectorAll(selector);
    const arr = Array.from(uls).filter((e) => e.closest('li') == null);
    arr.forEach((elem) => traverseList(elem, 0, order));
};
exports.rotateListStyleType = rotateListStyleType;

},{}],3:[function(require,module,exports){
"use strict";
/**
 * @module kung-fu/components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapImageWithFigure = void 0;
/**
 * Wraps images with figure and figcaption elements
 * Uses the image's title or alt text as the figcaption content
 * Skips images that have the specified exclusion attribute
 *
 * @export
 * @param {string} [selector='img'] - CSS selector for images to wrap
 * @param {string} [exclusion='data-no-caption'] - Attribute that marks images to skip
 * @returns {void}
 * @example
 * // Wrap all images on the page with figure elements
 * wrapImageWithFigure();
 *
 * // Wrap only images with a specific class
 * wrapImageWithFigure('.article-image');
 *
 * // Use a custom attribute to mark images that should not be wrapped
 * wrapImageWithFigure('img', 'data-skip-figure');
 */
const wrapImageWithFigure = (selector, exclusion) => {
    selector = selector || 'img';
    exclusion = exclusion || 'data-no-caption';
    const imgs = document.querySelectorAll(selector);
    const arr = Array.from(imgs);
    arr.filter((e) => e.getAttribute(exclusion) == null)
        .forEach((img) => {
        const caption = img.getAttribute('title') || img.getAttribute('alt');
        if (caption != null) {
            const figure = document.createElement('figure');
            const figCaption = document.createElement('figcaption');
            figCaption.innerText = caption;
            figure.appendChild(img.cloneNode(true));
            figure.appendChild(figCaption);
            img.replaceWith(figure);
        }
    });
};
exports.wrapImageWithFigure = wrapImageWithFigure;

},{}],4:[function(require,module,exports){
"use strict";
/**
 * @module kung-fu/components
 * @description A collection of vanilla JavaScript components for enhancing HTML elements
 *
 * This library provides several utilities for common UI patterns:
 * - Audio player with playlist support
 * - Automatic list style type rotation for nested lists
 * - Image to figure conversion for better semantics
 *
 * @example
 * // Import all components
 * import * as components from '@kung-fu/components';
 *
 * // Use the components
 * components.createAudioPlayer('audio-container', 'default.mp3');
 * components.rotateListStyleType();
 * components.wrapImageWithFigure();
 *
 * @example
 * // Import specific components
 * import { createAudioPlayer, wrapImageWithFigure } from '@kung-fu/components';
 *
 * // Use the components
 * createAudioPlayer('audio-container');
 * wrapImageWithFigure('.content-image');
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./audio"), exports);
__exportStar(require("./bullets"), exports);
__exportStar(require("./figure"), exports);

},{"./audio":1,"./bullets":2,"./figure":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../dist/index");
(0, index_1.createAudioPlayer)('audio-player', 'https://archive.org/download/apotheosis-trailer/apotheosis-trailer.mp3')
    .withPlaylist('playlist');

},{"../dist/index":4}]},{},[5])
//# sourceMappingURL=bundle.js.map
