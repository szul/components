[**@kung-fu/components v0.4.0**](../README.md)

***

[@kung-fu/components](../globals.md) / AudioPlayer

# Class: AudioPlayer

AudioPlayer - A class for creating customizable audio players with playlist support

## Constructors

### Constructor

> **new AudioPlayer**(`opts`): `AudioPlayer`

Creates an instance of AudioPlayer.
Initializes the audio player with the specified container and default source.

#### Parameters

##### opts

[`AudioPlayerOptions`](../interfaces/AudioPlayerOptions.md)

Configuration options

#### Returns

`AudioPlayer`

#### Throws

Error if the container or audio element cannot be found

## Properties

### \_audioContainer

> `private` **\_audioContainer**: `HTMLDivElement`

Reference to the audio container DOM element

***

### \_opts

> `private` **\_opts**: [`AudioPlayerOptions`](../interfaces/AudioPlayerOptions.md)

Player configuration options

## Methods

### withPlaylist()

> **withPlaylist**(`playlistID`): `void`

Adds playlist functionality to the audio player.
Sets up click event listeners on playlist items to switch audio sources
and update audio player elements (cover image, title, date, summary).

#### Parameters

##### playlistID

`string`

The ID of the playlist container element (without the # prefix)

#### Returns

`void`

#### Throws

Error if the playlist element cannot be found
