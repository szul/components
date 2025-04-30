[**@kung-fu/components v0.4.0**](README.md)

***

# @kung-fu/components v0.4.0

A collection of vanilla JavaScript components for enhancing HTML elements

This library provides several utilities for common UI patterns:
- Audio player with playlist support
- Automatic list style type rotation for nested lists
- Image to figure conversion for better semantics

## Examples

```ts
// Import all components
import * as components from '@kung-fu/components';

// Use the components
components.createAudioPlayer('audio-container', 'default.mp3');
components.rotateListStyleType();
components.wrapImageWithFigure();
```

```ts
// Import specific components
import { createAudioPlayer, wrapImageWithFigure } from '@kung-fu/components';

// Use the components
createAudioPlayer('audio-container');
wrapImageWithFigure('.content-image');
```

## Classes

- [AudioPlayer](classes/AudioPlayer.md)

## Interfaces

- [AudioPlayerOptions](interfaces/AudioPlayerOptions.md)

## Functions

- [createAudioPlayer](functions/createAudioPlayer.md)
- [rotateListStyleType](functions/rotateListStyleType.md)
- [wrapImageWithFigure](functions/wrapImageWithFigure.md)
