import { Box, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";
import type { SectionProps } from "../types";
import { backgrounds, faqs, gameModes, joinSteps, site, versionText } from "../config/site";
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import Animation from "../components/Animation";
import PixelPanel from "../components/PixelPanel";
import PixelButton from "../components/PixelButton";
import CopyButton from "../components/CopyButton";

const fadeUp = { before: { y: 50, opacity: 0 }, after: { y: 0, opacity: 1 } };

const InfoRow: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
    <Box
        component="li"
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem 1rem',
            padding: '0.8rem 0',
            borderBottom: '0.12rem dashed var(--rve-line)',
            '&:last-of-type': { borderBottom: 'none' },
        }}>
        <Typography sx={{ color: 'var(--rve-muted)' }}>{label}</Typography>
        <Box sx={{ color: '#fff', textAlign: 'right' }}>{children}</Box>
    </Box>
);

const Join: FC<SectionProps> = ({ active }) => (
    <Page
        background={backgrounds.join}
        overlay="linear-gradient(180deg, rgba(18, 19, 24, 0.55), rgba(18, 19, 24, 0.85) 55%, rgba(18, 19, 24, 0.97))">
        <Animation play={active} {...fadeUp}>
            <SectionTitle eyebrow="JOIN US" title={`加入 ${site.name}`} description="三步进入服务器，和大家一起开始冒险。" />
        </Animation>

        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
                gap: { xs: '1.2rem', md: '2rem' },
                alignItems: 'start',
            }}>
            {/* 加入步骤 */}
            <Box component="ol" sx={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {joinSteps.map((item, index) => (
                    <Box component="li" key={item.title}>
                        <Animation play={active} delay={0.1 + index * 0.1} {...fadeUp}>
                            <PixelPanel sx={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <Box
                                    aria-hidden
                                    sx={{
                                        flexShrink: 0,
                                        width: '2.8rem',
                                        height: '2.8rem',
                                        display: 'grid',
                                        placeItems: 'center',
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        backgroundColor: 'var(--rve-green-dark)',
                                        border: '0.15rem solid #000',
                                        boxShadow: 'inset 0.15rem 0.15rem 0 rgba(255, 255, 255, 0.25), inset -0.15rem -0.15rem 0 rgba(0, 0, 0, 0.3)',
                                    }}>
                                    {index + 1}
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography component="h3" sx={{ fontSize: '1.35rem', color: '#fff' }}>{item.title}</Typography>
                                    <Typography sx={{ marginTop: '0.3rem', color: 'var(--rve-muted)', lineHeight: 1.8 }}>{item.description}</Typography>
                                    {index === 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '0.8rem' }}>
                                            <CopyButton text={site.qqGroup} message="群号已复制，快去 QQ 搜索加群吧" variant="primary" size="small">
                                                复制群号
                                            </CopyButton>
                                            {site.qqGroupLink && (
                                                <PixelButton href={site.qqGroupLink} target="_blank" size="small">打开 QQ 加群</PixelButton>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </PixelPanel>
                        </Animation>
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* 服务器信息 */}
                <Animation play={active} delay={0.2} {...fadeUp}>
                    <PixelPanel accent="var(--rve-green)">
                        <Typography component="h3" sx={{ fontSize: '1.35rem', color: '#fff' }}>服务器信息</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', margin: '0.4rem 0 0', padding: 0 }}>
                            <InfoRow label="支持版本">{versionText}</InfoRow>
                            <InfoRow label="服务器地址">{site.addressHint}</InfoRow>
                            <InfoRow label="QQ 群">
                                <Typography component="span" sx={{ color: 'var(--rve-gold)', fontSize: '1.2rem', letterSpacing: '0.1rem' }}>
                                    {site.qqGroup}
                                </Typography>
                            </InfoRow>
                            <InfoRow label="玩法">{gameModes.map(m => m.title).join(' / ')}</InfoRow>
                        </Box>
                    </PixelPanel>
                </Animation>

                {/* 常见问题 */}
                <Animation play={active} delay={0.3} {...fadeUp}>
                    <PixelPanel>
                        <Typography component="h3" sx={{ fontSize: '1.35rem', color: '#fff', marginBottom: '0.4rem' }}>常见问题</Typography>
                        {faqs.map(item => (
                            <Box
                                component="details"
                                key={item.question}
                                sx={{
                                    borderTop: '0.12rem dashed var(--rve-line)',
                                    '& summary': {
                                        listStyle: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        padding: '0.7rem 0',
                                        cursor: 'pointer',
                                        color: '#fff',
                                    },
                                    '& summary::-webkit-details-marker': { display: 'none' },
                                    '& summary::after': { content: '"+"', color: 'var(--rve-green)' },
                                    '&[open] summary::after': { content: '"-"' },
                                    '& summary:hover': { color: 'var(--rve-green)' },
                                    '& p': { margin: '0 0 0.8rem', color: 'var(--rve-muted)', lineHeight: 1.8 },
                                }}>
                                <summary>{item.question}</summary>
                                <p>{item.answer}</p>
                            </Box>
                        ))}
                    </PixelPanel>
                </Animation>
            </Box>
        </Box>

        <Typography
            component="footer"
            sx={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.8 }}>
            © {new Date().getFullYear()} {site.fullName} · 本站与 Mojang Studios / Microsoft 无关
        </Typography>
    </Page>
);

export default Join;
