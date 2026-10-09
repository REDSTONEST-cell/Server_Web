import { type FC, type ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimationProps {
    play: boolean;
    base?: string;
    before?: gsap.TweenVars;
    after?: gsap.TweenVars;
    /** 入场延迟（秒），用于多个元素依次出现 */
    delay?: number;
    children: ReactNode;
}

const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const Animation: FC<AnimationProps> = ({ play, base, before = {}, after = {}, delay = 0, children }) => {

    const elementRef = useRef<HTMLDivElement>(null);
    const beforeRef = useRef(before);
    const afterRef = useRef(after);

    useEffect(() => {
        beforeRef.current = before;
    }, [before]);

    useEffect(() => {
        afterRef.current = after;
    }, [after]);

    useEffect(() => {
        if (!elementRef.current) return;
        gsap.set(elementRef.current, beforeRef.current);
    }, []);

    useEffect(() => {
        if (!elementRef.current) return;

        gsap.killTweensOf(elementRef.current);

        if (play) {
            gsap.to(elementRef.current, {
                ...afterRef.current,
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : delay,
                ease: "power2.out",
                overwrite: true,
            });
        } else {
            gsap.to(elementRef.current, {
                ...beforeRef.current,
                duration: reduceMotion ? 0 : 0.5,
                ease: "power2.out",
                overwrite: true,
            });
        }
    }, [play, delay]);

    return <div ref={elementRef} className={base}>{children}</div>;
};

export default Animation;
