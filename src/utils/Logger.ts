
type LogMethod = (...args: unknown[]) => void;

interface Logger {
    info: LogMethod;
    warn: LogMethod;
    error: LogMethod;
    debug: LogMethod;
}

const logger: Logger = {
    info: (...args) => console.log('[INFO]', ...args),
    warn: (...args) => console.warn('[WARN]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
    debug: (...args) => {
        if (import.meta.env.DEV) {
            console.debug('[DEBUG]', ...args);
        }
    },
};

export default logger;
