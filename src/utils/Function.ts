export const getElementIndex = (element: HTMLElement): number => {
    if (element.parentNode == null) return 0;
    return Array.from(element.parentNode.children).indexOf(element);
}

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
