import { Box, ButtonBase } from "@mui/material";
import type { FC } from "react";
import type { SectionConfig } from "../types";

type PageDotsProps = {
    sections: SectionConfig[];
    activeIndex: number;
    onNavigate: (index: number) => void;
};

/** 右侧翻页指示器，仅桌面端显示 */
const PageDots: FC<PageDotsProps> = ({ sections, activeIndex, onNavigate }) => (
    <Box
        component="nav"
        aria-label="翻页"
        sx={{
            position: 'absolute',
            zIndex: 9,
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            gap: '0.9rem',
        }}>
        {sections.map((section, index) => (
            <ButtonBase
                key={section.id}
                aria-label={section.label}
                aria-current={index === activeIndex ? 'page' : undefined}
                onClick={() => onNavigate(index)}
                sx={{
                    position: 'relative',
                    width: '0.9rem',
                    height: '0.9rem',
                    border: '0.15rem solid #000',
                    backgroundColor: index === activeIndex ? 'var(--rve-green)' : 'rgba(255, 255, 255, 0.6)',
                    transform: index === activeIndex ? 'scale(1.25)' : 'none',
                    transition: 'transform .2s, background-color .2s',
                    // 悬停时左侧显示名称
                    '&::before': {
                        content: `"${section.label}"`,
                        position: 'absolute',
                        right: '1.6rem',
                        padding: '0.15rem 0.5rem',
                        whiteSpace: 'nowrap',
                        fontFamily: 'inherit',
                        fontSize: '0.85rem',
                        color: '#fff',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        opacity: 0,
                        pointerEvents: 'none',
                        transition: 'opacity .2s',
                    },
                    '&:hover::before, &.Mui-focusVisible::before': { opacity: 1 },
                    '&:hover': { backgroundColor: index === activeIndex ? 'var(--rve-green)' : '#fff' },
                }} />
        ))}
    </Box>
);

export default PageDots;
