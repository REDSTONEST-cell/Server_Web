import { ButtonBase, type SxProps, type Theme } from "@mui/material";
import type { FC, MouseEventHandler, ReactNode } from "react";

type PixelButtonVariant = 'primary' | 'stone' | 'ghost';

type PixelButtonProps = {
    children?: ReactNode;
    variant?: PixelButtonVariant;
    size?: 'small' | 'medium' | 'large';
    href?: string;
    target?: string;
    onClick?: MouseEventHandler<HTMLElement>;
    startIcon?: ReactNode;
    sx?: SxProps<Theme>;
    'aria-label'?: string;
};

const colors: Record<PixelButtonVariant, { bg: string; hover: string; color: string }> = {
    primary: { bg: '#4f9a35', hover: '#5fb442', color: '#fff' },
    stone: { bg: '#6f737c', hover: '#7f8590', color: '#fff' },
    ghost: { bg: 'rgba(0, 0, 0, 0.35)', hover: 'rgba(0, 0, 0, 0.55)', color: '#fff' },
};

const sizes = {
    small: { padding: '0.35rem 0.9rem', fontSize: '0.95rem' },
    medium: { padding: '0.6rem 1.4rem', fontSize: '1.1rem' },
    large: { padding: '0.8rem 1.9rem', fontSize: '1.3rem' },
};

/** Minecraft 按钮风格：黑色描边 + 上亮下暗的斜面 */
const PixelButton: FC<PixelButtonProps> = ({ children, variant = 'stone', size = 'medium', startIcon, sx, ...rest }) => {

    const color = colors[variant];

    return (
        <ButtonBase
            {...rest}
            sx={[
                {
                    ...sizes[size],
                    gap: '0.6rem',
                    fontFamily: 'inherit',
                    letterSpacing: '0.08rem',
                    color: color.color,
                    backgroundColor: color.bg,
                    border: '0.15rem solid #000',
                    boxShadow: 'inset 0.18rem 0.18rem 0 rgba(255, 255, 255, 0.3), inset -0.18rem -0.22rem 0 rgba(0, 0, 0, 0.35)',
                    textShadow: '0.12rem 0.12rem 0 rgba(0, 0, 0, 0.5)',
                    whiteSpace: 'nowrap',
                    transition: 'background-color .15s, transform .15s',
                    '&:hover': {
                        backgroundColor: color.hover,
                        transform: 'translateY(-0.12rem)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: 'inset -0.18rem -0.18rem 0 rgba(255, 255, 255, 0.2), inset 0.18rem 0.22rem 0 rgba(0, 0, 0, 0.35)',
                    },
                    '&.Mui-focusVisible': {
                        outline: '0.2rem solid var(--rve-gold)',
                        outlineOffset: '0.15rem',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
            {startIcon}
            {children}
        </ButtonBase>
    );
};

export default PixelButton;
