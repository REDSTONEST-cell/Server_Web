import { Box, type SxProps, type Theme } from "@mui/material";
import type { FC, ReactNode } from "react";

type PageProps = {
    children?: ReactNode;
    /** 背景图 */
    background?: string;
    /** 背景图上的遮罩，保证文字可读 */
    overlay?: string;
    /** 内容最大宽度 */
    maxWidth?: string;
    sx?: SxProps<Theme>;
};

/**
 * 一屏的通用外壳：铺满一屏，内容超出时在内部滚动（翻页逻辑会先滚动内部内容）。
 */
const Page: FC<PageProps> = ({ children, background, overlay, maxWidth = '75rem', sx }) => (
    <Box
        sx={[
            {
                position: 'relative',
                width: '100%',
                height: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                backgroundColor: 'var(--rve-bg)',
                backgroundImage: [overlay, background && `url("${background}")`].filter(Boolean).join(', ') || undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}>
        <Box
            sx={{
                minHeight: '100%',
                maxWidth,
                margin: '0 auto',
                padding: {
                    xs: 'calc(var(--nav-h) + 1.5rem) 1.2rem 2rem',
                    md: 'calc(var(--nav-h) + 2rem) 4rem 2.5rem',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
            {children}
        </Box>
    </Box>
);

export default Page;
