import { createTheme } from "@mui/material";

export const pixelFont = "'Pixelcraft', sans-serif";

/** 整页切换动画时长（毫秒），系统开启「减少动态效果」时为 0 */
export const PAGE_DURATION =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 0 : 800;

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#6cc04a' },
        secondary: { main: '#e0412f' },
        warning: { main: '#f2c94c' },
        background: { default: '#121318', paper: '#1b1d24' },
    },
    typography: {
        fontFamily: pixelFont,
    },
    shape: {
        borderRadius: 0,
    },
});

export default theme;
