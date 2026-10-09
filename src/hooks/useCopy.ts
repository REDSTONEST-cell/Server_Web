import { useCallback } from "react";
import logger from "../utils/Logger";

const fallbackCopy = (text: string): boolean => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        return document.execCommand('copy');
    } finally {
        document.body.removeChild(textarea);
    }
};

/** 复制文本到剪贴板。非 https 环境（例如局域网调试）会退回到 execCommand */
const useCopy = () => useCallback(async (text: string): Promise<boolean> => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
        return fallbackCopy(text);
    } catch (err) {
        logger.warn('copy failed', err);
        return fallbackCopy(text);
    }
}, []);

export default useCopy;
