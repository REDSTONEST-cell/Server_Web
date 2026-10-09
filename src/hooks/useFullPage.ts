import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type FullPageOptions = {
    /** 每一屏的 id，同时用作地址栏 hash */
    ids: string[];
    /** 切换动画时长（毫秒） */
    duration: number;
};

const SWIPE_DISTANCE = 50;
const WHEEL_THRESHOLD = 8;
/** 动画结束后额外屏蔽滚轮的时间，避免触控板惯性滚动连续翻页 */
const WHEEL_COOLDOWN = 250;

const isScrollable = (element: HTMLElement): boolean => {
    const { overflowY } = window.getComputedStyle(element);
    return (overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight;
};

const getScrollableAncestor = (element: EventTarget | null, boundary: HTMLElement): HTMLElement | null => {
    let current = element instanceof HTMLElement ? element : null;
    while (current && current !== boundary && current !== document.body) {
        if (isScrollable(current)) return current;
        current = current.parentElement;
    }
    return null;
};

/** 元素内部还能否继续向 direction 方向滚动（1 向下，-1 向上） */
const canScroll = (element: HTMLElement, direction: number): boolean => direction > 0
    ? Math.ceil(element.scrollTop + element.clientHeight) < element.scrollHeight
    : element.scrollTop > 0;

const isEditable = (target: EventTarget | null): boolean =>
    target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

const readHashIndex = (ids: string[]): number => Math.max(ids.indexOf(window.location.hash.slice(1)), 0);

/**
 * 整屏翻页：支持滚轮、触摸滑动、键盘以及 goTo 跳转。
 * 页面内有可滚动区域时，先滚动内部内容，滚到底/顶后再翻页。
 */
const useFullPage = (container: RefObject<HTMLElement | null>, { ids, duration }: FullPageOptions) => {

    const [index, setIndex] = useState<number>(() => readHashIndex(ids));
    const [moving, setMoving] = useState<boolean>(false);
    const indexRef = useRef<number>(index);
    const lockUntil = useRef<number>(0);
    const timer = useRef<number>(undefined);

    const goTo = useCallback((target: number) => {
        const next = Math.min(Math.max(target, 0), ids.length - 1);
        if (next === indexRef.current) return;

        indexRef.current = next;
        setIndex(next);
        setMoving(true);
        lockUntil.current = performance.now() + duration + WHEEL_COOLDOWN;

        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setMoving(false), duration);
        window.history.replaceState(null, '', `#${ids[next]}`);
    }, [ids, duration]);

    const step = useCallback((direction: number) => goTo(indexRef.current + direction), [goTo]);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    // 浏览器前进/后退或手动修改 hash
    useEffect(() => {
        const onHashChange = () => goTo(readHashIndex(ids));
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, [goTo, ids]);

    useEffect(() => {
        const element = container.current;
        if (!element) return;

        const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
            const direction = e.deltaY > 0 ? 1 : -1;
            const now = performance.now();

            const scrollable = getScrollableAncestor(e.target, element);
            if (scrollable && canScroll(scrollable, direction)) {
                // 内部滚动到边界后，惯性滚动不应立刻触发翻页
                lockUntil.current = Math.max(lockUntil.current, now + WHEEL_COOLDOWN);
                return;
            }
            if (now < lockUntil.current) {
                // 持续的惯性滚动会不断延长锁定时间
                lockUntil.current = Math.max(lockUntil.current, now + 150);
                return;
            }
            step(direction);
        };

        let touchStartY = 0;
        let touchScrollable: HTMLElement | null = null;
        let touchScrollTop = 0;

        const onTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
            touchScrollable = getScrollableAncestor(e.target, element);
            touchScrollTop = touchScrollable?.scrollTop ?? 0;
        };

        const onTouchEnd = (e: TouchEvent) => {
            const distance = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(distance) < SWIPE_DISTANCE) return;
            const direction = distance > 0 ? 1 : -1;

            if (touchScrollable && (touchScrollable.scrollTop !== touchScrollTop || canScroll(touchScrollable, direction))) return;
            if (performance.now() < lockUntil.current - WHEEL_COOLDOWN) return;
            step(direction);
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (isEditable(e.target) || e.altKey || e.ctrlKey || e.metaKey) return;
            // 弹窗等渲染在容器外的内容自己处理键盘
            if (e.target instanceof Node && e.target !== document.body && !element.contains(e.target)) return;
            const scrollable = getScrollableAncestor(document.activeElement, element);

            let direction = 0;
            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    direction = 1;
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    direction = -1;
                    break;
                case ' ':
                    direction = e.shiftKey ? -1 : 1;
                    break;
                case 'Home':
                    e.preventDefault();
                    goTo(0);
                    return;
                case 'End':
                    e.preventDefault();
                    goTo(ids.length - 1);
                    return;
                default:
                    return;
            }
            if (scrollable && canScroll(scrollable, direction)) return;
            e.preventDefault();
            step(direction);
        };

        element.addEventListener('wheel', onWheel, { passive: true });
        element.addEventListener('touchstart', onTouchStart, { passive: true });
        element.addEventListener('touchend', onTouchEnd, { passive: true });
        window.addEventListener('keydown', onKeyDown);
        return () => {
            element.removeEventListener('wheel', onWheel);
            element.removeEventListener('touchstart', onTouchStart);
            element.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [container, goTo, step, ids]);

    return { index, moving, goTo };
};

export default useFullPage;
