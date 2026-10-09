import { useEffect, useState } from "react";

type TypewriterOptions = {
    typeSpeed?: number;
    eraseSpeed?: number;
    /** 打完一句后停留的时间 */
    hold?: number;
    /** 删完一句到开始下一句的间隔 */
    gap?: number;
};

/** 轮播打字效果：逐字打出、停留、逐字删除，再切换到下一句。enabled 为 false 时暂停 */
const useTypewriter = (phrases: string[], enabled: boolean, options: TypewriterOptions = {}): string => {

    const { typeSpeed = 200, eraseSpeed = 70, hold = 1600, gap = 500 } = options;
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (!enabled || phrases.length === 0) return;

        let phrase = 0;
        let length = 0;
        let erasing = false;
        let timer: number;

        const tick = () => {
            const current = phrases[phrase];
            if (!erasing) {
                length++;
                setText(current.slice(0, length));
                if (length >= current.length) {
                    erasing = true;
                    timer = window.setTimeout(tick, hold);
                    return;
                }
                timer = window.setTimeout(tick, typeSpeed);
            } else {
                length--;
                setText(current.slice(0, length));
                if (length <= 0) {
                    erasing = false;
                    phrase = (phrase + 1) % phrases.length;
                    timer = window.setTimeout(tick, gap);
                    return;
                }
                timer = window.setTimeout(tick, eraseSpeed);
            }
        };

        timer = window.setTimeout(tick, gap);
        return () => window.clearTimeout(timer);
    }, [enabled, phrases, typeSpeed, eraseSpeed, hold, gap]);

    return text;
};

export default useTypewriter;
