**@kung-fu/components v0.4.0**

***

# @kung-fu/components

A lightweight, dependency-free library for enhancing HTML with vanilla JavaScript.

## Overview

@kung-fu/components provides vanilla JavaScript utilities to enhance HTML documents with common UI patterns without the need for heavy frameworks. This library focuses on simplicity, performance, and zero external dependencies.

## Features

- **AudioPlayer**: Create customizable audio players with playlist support
- **List Style Management**: Automatically apply appropriate styles to nested lists
- **Figure Generation**: Enhance image semantics by wrapping them with figure and figcaption elements

## Installation

```bash
npm install @kung-fu/components
```

## Usage

### Audio Player

```javascript
import { createAudioPlayer } from '@kung-fu/components';

// Create a simple audio player
const player = createAudioPlayer('audio-container', 'default.mp3');

// Add playlist functionality
player.withPlaylist('playlist-container');
```

HTML Structure:

```html
<div id="audio-container">
  <audio></audio>
  <div id="audio-player-cover"></div>
  <div id="audio-player-title"></div>
  <div id="audio-player-date"></div>
  <div id="audio-player-summary"></div>
</div>

<dl id="playlist-container">
  <dt data-source="track1.mp3" data-cover-img="cover1.jpg" data-title="Track 1" data-pub="2023-01-01" data-summary="This is track 1">Track 1</dt>
  <dt data-source="track2.mp3" data-cover-img="cover2.jpg" data-title="Track 2" data-pub="2023-01-02" data-summary="This is track 2">Track 2</dt>
</dl>
```

### List Style Management

```javascript
import { rotateListStyleType } from '@kung-fu/components';

// Apply default style rotation to all lists
rotateListStyleType();

// Apply custom style rotation to specific lists
rotateListStyleType('.content-list', ['decimal', 'lower-alpha', 'lower-roman']);
```

### Figure Generation

```javascript
import { wrapImageWithFigure } from '@kung-fu/components';

// Wrap all images with figure elements
wrapImageWithFigure();

// Wrap only specific images
wrapImageWithFigure('.article-image');

// Use a custom attribute to exclude images
wrapImageWithFigure('img', 'data-no-figure');
```

## Documentation

Complete API documentation is available in the `docs` folder or by running:

```bash
npm run docs:serve
```

Then open your browser to http://localhost:3000/

## License

MIT
