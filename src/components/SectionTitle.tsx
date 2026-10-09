import { Box, Typography } from "@mui/material";
import type { FC } from "react";

type SectionTitleProps = {
    /** 标题上方的英文小字 */
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
};

const SectionTitle: FC<SectionTitleProps> = ({ eyebrow, title, description, align = 'center' }) => (
    <Box sx={{ textAlign: align, marginBottom: { xs: '1.5rem', md: '2.5rem' } }}>
        {eyebrow && (
            <Typography sx={{ color: 'var(--rve-green)', letterSpacing: '0.3rem', fontSize: '0.95rem' }}>
                {eyebrow}
            </Typography>
        )}
        <Typography
            component="h2"
            sx={{
                margin: '0.4rem 0',
                color: '#fff',
                fontSize: { xs: '2rem', md: '2.8rem' },
                letterSpacing: '0.15rem',
                textShadow: '0.2rem 0.2rem 0 rgba(0, 0, 0, 0.55)',
            }}>
            {title}
        </Typography>
        {/* 像素分割线 */}
        <Box
            aria-hidden
            sx={{
                display: 'flex',
                gap: '0.3rem',
                justifyContent: align === 'center' ? 'center' : 'flex-start',
                '& span': { width: '0.6rem', height: '0.6rem' },
            }}>
            <Box component="span" sx={{ backgroundColor: 'var(--rve-green)' }} />
            <Box component="span" sx={{ backgroundColor: 'var(--rve-green)', width: '3rem !important' }} />
            <Box component="span" sx={{ backgroundColor: 'var(--rve-red)' }} />
        </Box>
        {description && (
            <Typography sx={{ marginTop: '1rem', color: 'var(--rve-muted)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                {description}
            </Typography>
        )}
    </Box>
);

export default SectionTitle;
