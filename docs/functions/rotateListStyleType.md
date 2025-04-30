[**@kung-fu/components v0.4.0**](../README.md)

***

[@kung-fu/components](../globals.md) / rotateListStyleType

# Function: rotateListStyleType()

> **rotateListStyleType**(`selector?`, `order?`): `void`

Applies rotating list style types to nested unordered lists based on their nesting level.
Only affects top-level lists (those not contained within list items).

## Parameters

### selector?

`string`

CSS selector for list elements (defaults to 'ul')

### order?

`string`[]

List style types to apply in sequence (defaults to ['disc', 'circle', 'square'])

## Returns

`void`

## Examples

```ts
// Apply default styling to all unordered lists
rotateListStyleType();
```

```ts
// Apply custom styling to specific lists with a class
rotateListStyleType('.custom-list', ['decimal', 'lower-alpha', 'lower-roman']);
```
