import { Box, type SxProps, type Theme } from "@mui/material";
import type { ElementType, FC, ReactNode } from "react";

type PixelPanelProps = {
    children?: ReactNode;
    /** 顶部强调色条 */
    accent?: string;
    component?: ElementType;
    sx?: SxProps<Theme>;
};

/** 半透明深色像素面板 */
const PixelPanel: FC<PixelPanelProps> = ({ children, accent, component = 'div', sx }) => (
    <Box
        component={component}
        sx={[
            {
                position: 'relative',
                padding: '1.2rem',
                color: 'var(--rve-text)',
                backgroundColor: 'var(--rve-panel)',
                border: '0.15rem solid rgba(0, 0, 0, 0.7)',
                boxShadow: 'inset 0 0 0 0.15rem var(--rve-line), var(--pixel-shadow)',
                backdropFilter: 'blur(6px)',
                borderTop: accent ? `0.35rem solid ${accent}` : undefined,
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}>
        {children}
    </Box>
);

export default PixelPanel;
