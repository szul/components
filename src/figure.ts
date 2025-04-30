/**
 * Wraps images with figure and figcaption elements.
 * Uses the image's title or alt text as the figcaption content.
 * Skips images that have the specified exclusion attribute.
 * 
 * @param selector - CSS selector for images to wrap (defaults to 'img')
 * @param exclusion - Attribute that marks images to skip (defaults to 'data-no-caption')
 * 
 * @example
 * // Wrap all images on the page with figure elements
 * wrapImageWithFigure();
 * 
 * @example
 * // Wrap only images with a specific class
 * wrapImageWithFigure('.article-image');
 * 
 * @example
 * // Use a custom attribute to mark images that should not be wrapped
 * wrapImageWithFigure('img', 'data-skip-figure');
 */
export const wrapImageWithFigure = (selector?: string, exclusion?: string): void => {
    selector = selector || 'img';
    exclusion = exclusion || 'data-no-caption';
    const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll(selector);
    const arr: HTMLImageElement[] = Array.from(imgs);
    arr.filter((e: HTMLImageElement) => e.getAttribute(exclusion as string) == null)
        .forEach((img: HTMLImageElement): void => {
            const caption = img.getAttribute('title') || img.getAttribute('alt') as string;
            if(caption != null) {
                const figure: HTMLElement = document.createElement('figure');
                const figCaption: HTMLElement = document.createElement('figcaption');
                figCaption.innerText = caption;
                figure.appendChild(img.cloneNode(true));
                figure.appendChild(figCaption);
                img.replaceWith(figure);
            }
        });
};
