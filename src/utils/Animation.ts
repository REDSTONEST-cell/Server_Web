import type { CSSProperties } from "react";

// 记录每个元素上一次绑定的 animationend 回调，重复调用时先移除旧的
const handlers = new WeakMap<HTMLElement, () => void>();

export const animation = (element: HTMLElement, name: string, options?: Partial<CSSProperties>): Promise<void> => {
    
    const oldHandler = handlers.get(element);
    if (oldHandler) {
        element.removeEventListener('animationend', oldHandler);
    }

    return new Promise((resolve) => {
        const handleAnimationEnd = () => {
            element.style.animationName = '';
            element.style.animationDuration = '';
            element.style.animationDelay = '';
            element.style.animationTimingFunction = '';
            element.style.animationIterationCount = '';
            element.removeEventListener('animationend', handleAnimationEnd);
            handlers.delete(element);
            resolve();
        };
        handlers.set(element, handleAnimationEnd);
        element.addEventListener('animationend', handleAnimationEnd);
        const baseStyles: CSSProperties = {
            animationName: name,
            animationDuration: '2s',
            animationDelay: '0s',
            animationIterationCount: 1,
            ...options
        };
        Object.assign(element.style, baseStyles);
    });
};