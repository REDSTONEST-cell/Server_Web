// 像素图标：每个字符代表一个像素，'.' 为透明，其余字符在 palette 中查颜色
// 新增图标只需要在这里加一项

export type PixelIconData = {
    palette: Record<string, string>;
    pixels: string[];
};

export const pixelIcons = {
    grass: {
        palette: { G: '#5fa83a', g: '#7cc254', D: '#8b5a2b', d: '#6e4420', s: '#a8743f' },
        pixels: [
            'gGGgGGgG',
            'GGgGGgGG',
            'DGDGGDGD',
            'DDdDDDsD',
            'DsDDdDDD',
            'DDDsDDdD',
            'dDDDDsDD',
            'DDdDDDDd',
        ],
    },
    redstone: {
        palette: { R: '#ff3b2f', r: '#a51d16', w: '#ffb3a8', b: '#6b4a2a', B: '#8a6136' },
        pixels: [
            '...rr...',
            '..rwRr..',
            '..rRRr..',
            '...bB...',
            '...bB...',
            '...bB...',
            '...bB...',
            '...bB...',
        ],
    },
    sword: {
        palette: { W: '#ffffff', L: '#c9ced6', k: '#2b2f38', b: '#3b2a1a', h: '#7a5532' },
        pixels: [
            '......kW',
            '.....kWL',
            '....kWLk',
            '.b.kWLk.',
            '..bLLk..',
            '..hb....',
            '.h..b...',
            'h.......',
        ],
    },
    diamond: {
        palette: { C: '#4ee6d8', c: '#1e9c96', W: '#d8fffb' },
        pixels: [
            '..cCCc..',
            '.cWWCCc.',
            'cCWCCCCc',
            'cCCCCCCc',
            '.cCCCCc.',
            '..cCCc..',
            '...cc...',
            '........',
        ],
    },
} satisfies Record<string, PixelIconData>;

export type PixelIconName = keyof typeof pixelIcons;
