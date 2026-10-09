import { Box, ButtonBase, Typography } from "@mui/material";
import type { FC } from "react";
import type { SectionProps } from "../types";
import { backgrounds, gameModes, site, versionText } from "../config/site";
import useTypewriter from "../hooks/useTypewriter";
import Animation from "../components/Animation";
import PixelButton from "../components/PixelButton";
import PixelIcon from "../components/PixelIcon";

const fadeUp = { before: { y: 40, opacity: 0 }, after: { y: 0, opacity: 1 } };

const Home: FC<SectionProps> = ({ active, goTo }) => {

    const text = useTypewriter(site.slogans, active);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                backgroundImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45), transparent 70%), linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.3) 45%, rgba(18, 19, 24, 0.92) 100%), url("${backgrounds.home}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                display: 'flex',
                padding: 'calc(var(--nav-h) + 1rem) 1.2rem 5rem',
            }}>
            {/* margin: auto 居中，内容高于屏幕时不会被裁掉顶部 */}
            <Box sx={{ margin: 'auto', textAlign: 'center', width: '100%', maxWidth: '60rem' }}>
                <Animation play={active} {...fadeUp}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.3rem 0.8rem',
                            fontSize: '0.95rem',
                            color: '#fff',
                            backgroundColor: 'rgba(0, 0, 0, 0.55)',
                            border: '0.15rem solid #000',
                            boxShadow: 'inset 0 0 0 0.15rem var(--rve-line)',
                        }}>
                        <Box component="span" sx={{ width: '0.6rem', height: '0.6rem', backgroundColor: 'var(--rve-green)', animation: 'cursor 1.6s infinite' }} />
                        支持版本 {versionText}
                    </Box>
                </Animation>

                <Animation play={active} delay={0.1} {...fadeUp}>
                    <Typography
                        component="h1"
                        sx={{
                            margin: '1rem 0 0',
                            lineHeight: 1,
                            fontSize: 'clamp(5rem, 18vw, 10rem)',
                            letterSpacing: '0.5rem',
                            color: '#fff',
                            // 方块感的立体文字
                            textShadow: '0.3rem 0.3rem 0 var(--rve-green-dark), 0.6rem 0.6rem 0 rgba(0, 0, 0, 0.5)',
                        }}>
                        {site.name}
                    </Typography>
                </Animation>

                <Animation play={active} delay={0.2} {...fadeUp}>
                    <Box sx={{ minHeight: { xs: '3.2rem', md: '4.5rem' }, marginTop: '1rem' }} aria-live="off">
                        <Typography
                            component="span"
                            sx={{ fontSize: 'clamp(1.6rem, 6vw, 3.2rem)', letterSpacing: { xs: '0.2rem', md: '0.5rem' }, color: '#fff', textShadow: '0.2rem 0.2rem 0 #000' }}>
                            {text}
                        </Typography>
                        <Typography
                            component="span"
                            aria-hidden
                            sx={{ fontSize: 'clamp(1.6rem, 6vw, 3.2rem)', animation: 'cursor 0.8s infinite' }}>
                            |
                        </Typography>
                    </Box>
                    {/* 读屏软件读取完整的介绍，而不是打字机的中间状态 */}
                    <Typography sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                        {site.summary}
                    </Typography>
                </Animation>

                <Animation play={active} delay={0.3} {...fadeUp}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', margin: '1.2rem 0 2rem' }}>
                        {gameModes.map(mode => (
                            <ButtonBase
                                key={mode.id}
                                onClick={() => goTo('modes')}
                                sx={{
                                    gap: '0.4rem',
                                    padding: '0.3rem 0.7rem',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    color: '#fff',
                                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                                    border: '0.12rem solid',
                                    borderColor: mode.accent,
                                    transition: 'background-color .2s',
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                                }}>
                                <PixelIcon name={mode.icon} size="1.1rem" />
                                {mode.title}
                            </ButtonBase>
                        ))}
                    </Box>
                </Animation>

                <Animation play={active} delay={0.4} {...fadeUp}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                        <PixelButton variant="primary" size="large" onClick={() => goTo('join')}>
                            加入我们
                        </PixelButton>
                        <PixelButton variant="stone" size="large" onClick={() => goTo('modes')}>
                            了解玩法
                        </PixelButton>
                    </Box>
                </Animation>
            </Box>

            {/* 向下提示 */}
            <ButtonBase
                onClick={() => goTo('modes')}
                aria-label="下一屏"
                sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '1.5rem',
                    transform: 'translateX(-50%)',
                    flexDirection: 'column',
                    gap: '0.3rem',
                    fontFamily: 'inherit',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    letterSpacing: '0.2rem',
                    '@media (max-height: 560px)': { display: 'none' },
                }}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>向下滚动</Box>
                <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>向上滑动</Box>
                <Box sx={{ animation: 'bounce 1.4s infinite' }}>
                    <svg width="1.6rem" height="1.6rem" viewBox="0 0 7 4" shapeRendering="crispEdges" aria-hidden>
                        <path d="M0 0h1v1H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 2h1v1H4zM5 1h1v1H5zM6 0h1v1H6z" fill="currentColor" />
                    </svg>
                </Box>
            </ButtonBase>
        </Box>
    );
};

export default Home;
