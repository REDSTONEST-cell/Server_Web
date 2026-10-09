import { Box, ButtonBase, Typography } from "@mui/material";
import { useMemo, useState, type FC } from "react";
import type { SectionProps } from "../types";
import { gallery, type GalleryImage } from "../config/site";
import Page from "../components/Page";
import SectionTitle from "../components/SectionTitle";
import Animation from "../components/Animation";
import Lightbox from "../components/Lightbox";

const fadeUp = { before: { y: 50, opacity: 0 }, after: { y: 0, opacity: 1 } };

const ALL = '全部';
const categories = [ALL, ...new Set(gallery.map(i => i.category))];

const Gallery: FC<SectionProps> = ({ active }) => {

    const [category, setCategory] = useState<string>(ALL);
    const [viewing, setViewing] = useState<number | null>(null);

    const images = useMemo<GalleryImage[]>(
        () => category === ALL ? gallery : gallery.filter(i => i.category === category),
        [category]
    );

    return (
        <Page
            overlay="linear-gradient(180deg, rgba(18, 19, 24, 0.92), rgba(18, 19, 24, 0.97))"
            background={gallery[0]?.src}>
            <Animation play={active} {...fadeUp}>
                <SectionTitle eyebrow="GALLERY" title="服务器风景" description="玩家们一起建造的世界，以及一起留下的合照。" />
            </Animation>

            <Animation play={active} delay={0.1} {...fadeUp}>
                <Box role="tablist" aria-label="相册分类" sx={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {categories.map(item => (
                        <ButtonBase
                            key={item}
                            role="tab"
                            aria-selected={item === category}
                            onClick={() => setCategory(item)}
                            sx={{
                                padding: '0.3rem 0.9rem',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                color: item === category ? '#000' : '#fff',
                                backgroundColor: item === category ? 'var(--rve-green)' : 'rgba(255, 255, 255, 0.08)',
                                border: '0.15rem solid #000',
                                transition: 'background-color .2s',
                                '&:hover': { backgroundColor: item === category ? 'var(--rve-green)' : 'rgba(255, 255, 255, 0.16)' },
                            }}>
                            {item}
                        </ButtonBase>
                    ))}
                </Box>
            </Animation>

            <Animation play={active} delay={0.2} {...fadeUp}>
                <Box
                    component="ul"
                    sx={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gridAutoRows: { xs: '7.5rem', sm: '10rem', md: '9.5rem', lg: '11.5rem' },
                        gap: { xs: '0.6rem', md: '1rem' },
                        // 桌面端第一张作为大图（3 列网格中占 2x2，6 张图正好铺满）
                        '& > li:first-of-type': { gridColumn: { md: 'span 2' }, gridRow: { md: 'span 2' } },
                    }}>
                    {images.map((image, index) => (
                        <Box component="li" key={image.src}>
                            <ButtonBase
                                onClick={() => setViewing(index)}
                                aria-label={`查看大图：${image.title}`}
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                    border: '0.15rem solid #000',
                                    boxShadow: 'var(--pixel-shadow)',
                                    '& img': { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' },
                                    '&:hover img, &.Mui-focusVisible img': { transform: 'scale(1.06)' },
                                    '&:hover .caption, &.Mui-focusVisible .caption': { opacity: 1, transform: 'none' },
                                    '&.Mui-focusVisible': { outline: '0.2rem solid var(--rve-gold)', outlineOffset: '0.15rem' },
                                }}>
                                <img src={image.thumb ?? image.src} alt={image.title} loading="lazy" />
                                <Box
                                    className="caption"
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        padding: '1.5rem 0.8rem 0.6rem',
                                        textAlign: 'left',
                                        background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8))',
                                        // 触屏设备没有悬停，标题常驻显示
                                        opacity: { xs: 1, md: 0 },
                                        transform: { xs: 'none', md: 'translateY(0.5rem)' },
                                        transition: 'opacity .25s, transform .25s',
                                        '@media (hover: none)': { opacity: 1, transform: 'none' },
                                    }}>
                                    <Typography sx={{ fontSize: '0.8rem', color: 'var(--rve-green)' }}>{image.category}</Typography>
                                    <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, color: '#fff' }} noWrap>{image.title}</Typography>
                                </Box>
                            </ButtonBase>
                        </Box>
                    ))}
                </Box>
            </Animation>

            <Lightbox images={images} index={viewing} onChange={setViewing} />
        </Page>
    );
};

export default Gallery;
