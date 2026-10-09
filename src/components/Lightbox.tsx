import { Box, ButtonBase, Modal, Typography } from "@mui/material";
import { useRef, type FC, type KeyboardEvent, type TouchEvent } from "react";
import type { GalleryImage } from "../config/site";

type LightboxProps = {
    images: GalleryImage[];
    /** 当前查看的图片下标，null 表示关闭 */
    index: number | null;
    onChange: (index: number | null) => void;
};

const arrowSx = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: { xs: '2.6rem', md: '3.4rem' },
    height: { xs: '2.6rem', md: '3.4rem' },
    fontFamily: 'inherit',
    fontSize: '1.6rem',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    border: '0.15rem solid #000',
    boxShadow: 'inset 0 0 0 0.15rem var(--rve-line)',
    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
} as const;

/** 图片大图查看：支持左右按钮、键盘方向键、左右滑动，Esc 关闭 */
const Lightbox: FC<LightboxProps> = ({ images, index, onChange }) => {

    const touchStartX = useRef<number>(0);
    const image = index === null ? null : images[index];

    const step = (direction: number) => {
        if (index === null) return;
        onChange((index + direction + images.length) % images.length);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
    };

    const onTouchEnd = (e: TouchEvent) => {
        const distance = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(distance) > 50) step(distance > 0 ? 1 : -1);
    };

    return (
        <Modal
            open={image !== null}
            onClose={() => onChange(null)}
            aria-label={image?.title}
            slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(8, 9, 12, 0.92)' } } }}>
            <Box
                onKeyDown={onKeyDown}
                onTouchStart={e => (touchStartX.current = e.touches[0].clientX)}
                onTouchEnd={onTouchEnd}
                onClick={e => e.target === e.currentTarget && onChange(null)}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: { xs: '3.5rem 0.8rem', md: '4rem 6rem' },
                    outline: 'none',
                    color: '#fff',
                }}>
                {image && (
                    <>
                        <Box
                            component="img"
                            src={image.src}
                            alt={image.title}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: 'calc(100% - 3rem)',
                                objectFit: 'contain',
                                border: '0.2rem solid #000',
                                boxShadow: 'var(--pixel-shadow)',
                            }} />
                        <Typography sx={{ textAlign: 'center' }}>
                            <Box component="span" sx={{ color: 'var(--rve-green)', marginRight: '0.8rem' }}>{image.category}</Box>
                            {image.title}
                            <Box component="span" sx={{ color: 'var(--rve-muted)', marginLeft: '0.8rem' }}>{(index ?? 0) + 1} / {images.length}</Box>
                        </Typography>
                    </>
                )}
                <ButtonBase aria-label="关闭" onClick={() => onChange(null)} sx={{ ...arrowSx, top: '1rem', right: '1rem', transform: 'none' }}>×</ButtonBase>
                {images.length > 1 && (
                    <>
                        <ButtonBase aria-label="上一张" onClick={() => step(-1)} sx={{ ...arrowSx, left: { xs: '0.5rem', md: '1.5rem' } }}>‹</ButtonBase>
                        <ButtonBase aria-label="下一张" onClick={() => step(1)} sx={{ ...arrowSx, right: { xs: '0.5rem', md: '1.5rem' } }}>›</ButtonBase>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default Lightbox;
