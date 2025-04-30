/**
 * Recursively traverses a list structure and applies list style types based on nesting level.
 * When the nesting level exceeds 3, it resets back to 0, creating a repeating pattern.
 * 
 * @param elem - The list element to style
 * @param level - The current nesting level
 * @param order - Array of list style types to apply
 * @internal
 */
function traverseList(elem: HTMLUListElement, level: number, order: string[]): void {
    if(level == 3) {
        level = 0;
    }
    elem.style.listStyleType = order[level];
    const children = elem.querySelectorAll(':scope > li > ul');
    Array.from(children).forEach((el: Element) => traverseList(el as HTMLUListElement, level + 1, order));
}

/**
 * Applies rotating list style types to nested unordered lists based on their nesting level.
 * Only affects top-level lists (those not contained within list items).
 * 
 * @param selector - CSS selector for list elements (defaults to 'ul')
 * @param order - List style types to apply in sequence (defaults to ['disc', 'circle', 'square'])
 * 
 * @example
 * // Apply default styling to all unordered lists
 * rotateListStyleType();
 * 
 * @example
 * // Apply custom styling to specific lists with a class
 * rotateListStyleType('.custom-list', ['decimal', 'lower-alpha', 'lower-roman']);
 */
export const rotateListStyleType = (selector?: string, order?: string[]): void => {
    selector = selector || 'ul';
    order = order || ['disc', 'circle', 'square'];
    const uls: NodeListOf<HTMLUListElement> = document.querySelectorAll(selector);
    const arr: HTMLUListElement[] = Array.from(uls).filter((e: HTMLUListElement) => e.closest('li') == null);
    arr.forEach((elem: HTMLUListElement): void => traverseList(elem, 0, order as string[]));
};
