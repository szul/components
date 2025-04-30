/**
 * A collection of vanilla JavaScript components for enhancing HTML elements
 * 
 * This library provides several utilities for common UI patterns:
 * - Audio player with playlist support
 * - Automatic list style type rotation for nested lists
 * - Image to figure conversion for better semantics
 * 
 * @packageDocumentation
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

export * from './audio';
export * from './bullets';
export * from './figure';
