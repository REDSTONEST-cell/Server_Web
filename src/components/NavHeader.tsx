import { Box, ButtonBase, Drawer, Typography } from "@mui/material";
import { useState, type FC } from "react";
import type { SectionConfig } from "../types";
import { site } from "../config/site";
import PixelIcon from "./PixelIcon";
import PixelButton from "./PixelButton";
import CopyButton from "./CopyButton";

type NavHeaderProps = {
    sections: SectionConfig[];
    activeIndex: number;
    onNavigate: (index: number) => void;
};

const joinIndex = (sections: SectionConfig[]) => sections.findIndex(s => s.id === 'join');

const NavHeader: FC<NavHeaderProps> = ({ sections, activeIndex, onNavigate }) => {

    const [open, setOpen] = useState<boolean>(false);
    const join = joinIndex(sections);

    const navigate = (index: number) => {
        setOpen(false);
        onNavigate(index);
    };

    return (
        <Box
            component="header"
            sx={{
                width: '100%',
                height: 'var(--nav-h)',
                padding: { xs: '0 1rem', md: '0 2rem' },
                position: 'absolute',
                zIndex: 10,
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(6px)',
                borderBottom: '0.15rem solid rgba(0, 0, 0, 0.6)',
                color: '#fff',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr auto', md: '1fr auto 1fr' },
                alignItems: 'center',
            }}>
            <ButtonBase
                onClick={() => navigate(0)}
                aria-label="回到首页"
                sx={{ justifySelf: 'start', gap: '0.6rem', fontFamily: 'inherit' }}>
                <PixelIcon name="grass" size="1.8rem" />
                <Typography sx={{ fontSize: '1.6rem', letterSpacing: '0.15rem', textShadow: '0.15rem 0.15rem 0 #000' }}>
                    {site.name}
                    <Box component="span" sx={{ fontSize: '1rem', marginLeft: '0.4rem', color: 'var(--rve-muted)' }}>服务器</Box>
                </Typography>
            </ButtonBase>

            {/* 桌面端菜单 */}
            <Box
                component="nav"
                aria-label="页面导航"
                sx={{ display: { xs: 'none', md: 'flex' }, gap: '2.2rem' }}>
                {sections.map((section, index) => (
                    <ButtonBase
                        key={section.id}
                        href={`#${section.id}`}
                        aria-current={index === activeIndex ? 'page' : undefined}
                        onClick={e => {
                            e.preventDefault();
                            navigate(index);
                        }}
                        sx={{
                            position: 'relative',
                            padding: '0.4rem 0',
                            fontFamily: 'inherit',
                            fontSize: '1.25rem',
                            letterSpacing: '0.1rem',
                            color: index === activeIndex ? 'var(--rve-green)' : '#fff',
                            transition: 'color .2s',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: index === activeIndex ? '100%' : '0',
                                height: '0.2rem',
                                backgroundColor: 'var(--rve-green)',
                                transition: 'width .25s',
                            },
                            '&:hover': { color: 'var(--rve-green)' },
                            '&:hover::after': { width: '100%' },
                        }}>
                        {section.label}
                    </ButtonBase>
                ))}
            </Box>

            <Box sx={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {join >= 0 && (
                    <PixelButton
                        variant="primary"
                        size="small"
                        onClick={() => navigate(join)}
                        sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                        加入我们
                    </PixelButton>
                )}
                {/* 移动端菜单按钮 */}
                <ButtonBase
                    aria-label="打开菜单"
                    aria-expanded={open}
                    onClick={() => setOpen(true)}
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexDirection: 'column',
                        gap: '0.3rem',
                        padding: '0.6rem',
                        '& span': { width: '1.6rem', height: '0.22rem', backgroundColor: '#fff', boxShadow: '0.12rem 0.12rem 0 #000' },
                    }}>
                    <span />
                    <span />
                    <span />
                </ButtonBase>
            </Box>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: 'min(80vw, 20rem)',
                            padding: '1.5rem',
                            color: '#fff',
                            backgroundColor: 'rgba(18, 19, 25, 0.96)',
                            backgroundImage: 'none',
                            borderLeft: '0.2rem solid #000',
                            boxShadow: 'inset 0.15rem 0 0 var(--rve-line)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                        },
                    },
                }}>
                <Typography sx={{ color: 'var(--rve-muted)', letterSpacing: '0.2rem', marginBottom: '0.5rem' }}>MENU</Typography>
                {sections.map((section, index) => (
                    <ButtonBase
                        key={section.id}
                        onClick={() => navigate(index)}
                        aria-current={index === activeIndex ? 'page' : undefined}
                        sx={{
                            justifyContent: 'flex-start',
                            gap: '0.8rem',
                            padding: '0.8rem 1rem',
                            fontFamily: 'inherit',
                            fontSize: '1.3rem',
                            color: index === activeIndex ? 'var(--rve-green)' : '#fff',
                            backgroundColor: index === activeIndex ? 'rgba(108, 192, 74, 0.12)' : 'transparent',
                            border: '0.15rem solid',
                            borderColor: index === activeIndex ? 'var(--rve-green)' : 'transparent',
                        }}>
                        <Box component="span" sx={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'currentColor' }} />
                        {section.label}
                    </ButtonBase>
                ))}
                <Box sx={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <Typography sx={{ color: 'var(--rve-muted)', fontSize: '0.95rem' }}>QQ 群：{site.qqGroup}</Typography>
                    <CopyButton text={site.qqGroup} message="群号已复制" variant="primary">复制群号</CopyButton>
                </Box>
            </Drawer>
        </Box>
    );
};

export default NavHeader;
