import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import type { SectionProps } from "../types";
import { gameModes } from "../config/site";
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import Animation from "../components/Animation";
import PixelIcon from "../components/PixelIcon";
import PixelPanel from "../components/PixelPanel";
import PixelButton from "../components/PixelButton";

const fadeUp = { before: { y: 50, opacity: 0 }, after: { y: 0, opacity: 1 } };

// 深色石砖纹理背景
const stonePattern = [
    'linear-gradient(180deg, rgba(18, 19, 24, 0.6), rgba(18, 19, 24, 0.95))',
    'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0 0.15rem, transparent 0.15rem 4rem)',
    'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 0.15rem, transparent 0.15rem 4rem)',
    'linear-gradient(135deg, #23252d, #17181e)',
].join(', ');

const Modes: FC<SectionProps> = ({ active, goTo }) => (
    <Page sx={{ backgroundImage: stonePattern }}>
        <Animation play={active} {...fadeUp}>
            <SectionTitle
                eyebrow="GAME MODES"
                title="多种玩法，总有一款适合你"
                description="生存、技术、休闲、建筑，在 RVE 你可以随时切换自己喜欢的玩法。" />
        </Animation>

        <Box
            component="ul"
            sx={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: { xs: '1rem', md: '1.5rem' },
            }}>
            {gameModes.map((mode, index) => (
                <Box component="li" key={mode.id} sx={{ '& > div': { height: '100%' } }}>
                    <Animation play={active} delay={0.1 + index * 0.1} {...fadeUp}>
                        <PixelPanel
                            accent={mode.accent}
                            sx={{
                                height: '100%',
                                minHeight: { lg: '17rem' },
                                display: 'flex',
                                flexDirection: { xs: 'row', lg: 'column' },
                                alignItems: { xs: 'flex-start', lg: 'stretch' },
                                gap: '1rem',
                                transition: 'transform .2s, box-shadow .2s',
                                '&:hover': {
                                    transform: 'translateY(-0.35rem)',
                                    boxShadow: `inset 0 0 0 0.15rem ${mode.accent}66, 0.5rem 0.6rem 0 rgba(0, 0, 0, 0.45)`,
                                },
                            }}>
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    width: { xs: '3.6rem', lg: '4.4rem' },
                                    height: { xs: '3.6rem', lg: '4.4rem' },
                                    display: 'grid',
                                    placeItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                                    border: '0.15rem solid rgba(0, 0, 0, 0.6)',
                                    boxShadow: 'inset 0.15rem 0.15rem 0 rgba(255, 255, 255, 0.08)',
                                }}>
                                <PixelIcon name={mode.icon} size="70%" />
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                                    <Typography component="h3" sx={{ fontSize: '1.5rem', color: '#fff' }}>{mode.title}</Typography>
                                    <Typography
                                        component="span"
                                        sx={{
                                            padding: '0 0.4rem',
                                            fontSize: '0.85rem',
                                            color: '#000',
                                            backgroundColor: mode.accent,
                                        }}>
                                        {mode.tag}
                                    </Typography>
                                </Box>
                                <Typography sx={{ marginTop: '0.6rem', color: 'var(--rve-muted)', lineHeight: 1.8 }}>
                                    {mode.description}
                                </Typography>
                            </Box>
                        </PixelPanel>
                    </Animation>
                </Box>
            ))}
        </Box>

        <Animation play={active} delay={0.6} {...fadeUp}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <PixelButton variant="stone" onClick={() => goTo('gallery')}>看看服务器风景</PixelButton>
                <PixelButton variant="primary" onClick={() => goTo('join')}>马上加入</PixelButton>
            </Box>
        </Animation>
    </Page>
);

export default Modes;
