[**@kung-fu/components v0.4.0**](../README.md)

***

[@kung-fu/components](../globals.md) / wrapImageWithFigure

# Function: wrapImageWithFigure()

> **wrapImageWithFigure**(`selector?`, `exclusion?`): `void`

Wraps images with figure and figcaption elements.
Uses the image's title or alt text as the figcaption content.
Skips images that have the specified exclusion attribute.

## Parameters

### selector?

`string`

CSS selector for images to wrap (defaults to 'img')

### exclusion?

`string`

Attribute that marks images to skip (defaults to 'data-no-caption')

## Returns

`void`

## Examples

```ts
// Wrap all images on the page with figure elements
wrapImageWithFigure();
```

```ts
// Wrap only images with a specific class
wrapImageWithFigure('.article-image');
```

```ts
// Use a custom attribute to mark images that should not be wrapped
wrapImageWithFigure('img', 'data-skip-figure');
```
