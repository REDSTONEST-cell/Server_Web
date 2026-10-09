import type { PixelIconName } from '../assets/pixelIcons';

// 网站上所有和服务器相关的文案、数据都集中在这里，修改内容时只需要改这个文件

export type GameMode = {
    id: string;
    icon: PixelIconName;
    title: string;
    tag: string;
    /** 卡片强调色 */
    accent: string;
    description: string;
};

export type Player = {
    id: string;
    /** 游戏 ID */
    name: string;
    /** 昵称 */
    title: string;
    /** 头像图片，放在 public/head/ 下；留空时显示占位图 */
    avatar?: string;
};

export type JoinStep = {
    title: string;
    description: string;
};

export type Faq = {
    question: string;
    answer: string;
};

export const site = {
    name: 'RVE',
    fullName: 'RVE 服务器',
    /** 首页打字机轮播的标语 */
    slogans: ['欢迎来到 RVE 服务器', '原版生存 · 红石生电', '小游戏 · 创造服', '和伙伴一起开始冒险'],
    summary: '一个多玩法的 Minecraft 服务器：原版生存、不限制红石生电，还有小游戏和创造服。',
    version: {
        min: '1.21',
        max: '1.21.11',
    },
    qqGroup: '992402253',
    /** QQ 群邀请链接，有官方邀请链接后填上即可在页面中显示「打开 QQ」按钮 */
    qqGroupLink: '',
    /** 服务器地址不公开，在 QQ 群内获取 */
    addressHint: '加入 QQ 群后在群内获取',
};

export const versionText = `${site.version.min} – ${site.version.max}`;

/** 各屏背景图 */
export const backgrounds = {
    home: '/images/rve/group-bridge.webp',
    players: '/images/rve/flowers.webp',
    join: '/images/rve/welcome.webp',
};

export type GalleryImage = {
    /** 原图 */
    src: string;
    /** 缩略图，没有时使用原图 */
    thumb?: string;
    title: string;
    category: '玩家合照' | '服务器风景';
};

// 相册：把截图放到 public/images/rve/（缩略图放到 thumb/），再在这里加一项
export const gallery: GalleryImage[] = [
    { src: '/images/rve/group-sakura.webp', thumb: '/images/rve/thumb/group-sakura.webp', title: '樱花亭前的合照', category: '玩家合照' },
    { src: '/images/rve/group-bridge.webp', thumb: '/images/rve/thumb/group-bridge.webp', title: '紫珀长桥上的合照', category: '玩家合照' },
    { src: '/images/rve/group-sunset.webp', thumb: '/images/rve/thumb/group-sunset.webp', title: '夕阳下的合照', category: '玩家合照' },
    { src: '/images/rve/garden.webp', thumb: '/images/rve/thumb/garden.webp', title: '竹林小院', category: '服务器风景' },
    { src: '/images/rve/flowers.webp', thumb: '/images/rve/thumb/flowers.webp', title: '花海', category: '服务器风景' },
    { src: '/images/rve/welcome.webp', thumb: '/images/rve/thumb/welcome.webp', title: '欢迎来到 RVE', category: '服务器风景' },
];

export const gameModes: GameMode[] = [
    {
        id: 'survival',
        icon: 'grass',
        title: '原版生存',
        tag: '生存',
        accent: '#6cc04a',
        description: '原汁原味的生存体验。和伙伴从一棵树开始，开荒、建家、探索主世界、下界与末地。',
    },
    {
        id: 'redstone',
        icon: 'redstone',
        title: '红石生电',
        tag: '技术',
        accent: '#e0412f',
        description: '不限制红石与生电。刷铁机、刷怪塔、全自动农场，想造什么就造什么。',
    },
    {
        id: 'minigames',
        icon: 'sword',
        title: '小游戏',
        tag: '休闲',
        accent: '#f2c94c',
        description: '生存累了就来放松一下，和群友一起来几局小游戏。',
    },
    {
        id: 'creative',
        icon: 'diamond',
        title: '创造服',
        tag: '建筑',
        accent: '#4ee6d8',
        description: '无限方块，自由搭建。先在创造服设计蓝图，再回到生存一砖一瓦地实现它。',
    },
];

/** 玩家页左下角的角色立绘（正版玩家 REDSTONE_RT 的皮肤） */
export const mascot = {
    image: '/images/redstone_rt.webp',
    name: 'REDSTONE_RT',
};

// 头像由正版皮肤生成：取皮肤的脸部和帽子层放大
export const players: Player[] = [
    { id: 'REDSTONE_RT', name: 'REDSTONE_RT', title: 'RED', avatar: '/head/REDSTONE_RT.png' },
    { id: 'Arilo007', name: 'Arilo007', title: '皇帝', avatar: '/head/Arilo007.png' },
    { id: 'Wind_shakes', name: 'Wind_shakes', title: '萝莉控', avatar: '/head/Wind_shakes.png' },
    { id: 'cuihuaqingtin', name: 'cuihuaqingtin', title: '催梦蜻蜓', avatar: '/head/cuihuaqingtin.png' },
    { id: 'ysddz', name: 'ysddz', title: '牢玩家', avatar: '/head/ysddz.png' },
    { id: 'MCZZX0', name: 'MCZZX0', title: '视频大手子', avatar: '/head/MCZZX0.png' },
];

export const about = {
    title: '关于 RVE',
    paragraphs: [
        'RVE 是一个多玩法的 Minecraft 服务器。',
        '在原版生存里，你可以和伙伴一起开荒、建城、探索；服务器不限制红石与生电，大型机器尽管造。',
        '想换换口味？小游戏和创造服随时欢迎你。无论你是建筑党、红石党还是休闲玩家，这里都给你留了一块地方。',
    ],
};

export const joinSteps: JoinStep[] = [
    {
        title: '加入 QQ 群',
        description: `搜索群号 ${site.qqGroup} 加入 RVE 玩家群。`,
    },
    {
        title: '获取服务器地址',
        description: '服务器地址在 QQ 群内获取。',
    },
    {
        title: '进入游戏',
        description: `使用 ${versionText} 版本的客户端，在「多人游戏」中添加服务器并加入。`,
    },
];

export const faqs: Faq[] = [
    {
        question: '服务器支持哪些版本？',
        answer: `支持 ${versionText} 版本的客户端。`,
    },
    {
        question: '服务器地址是多少？',
        answer: '服务器地址在 QQ 群内获取，请先加入 QQ 群。',
    },
    {
        question: '可以建红石机器和生电装置吗？',
        answer: '可以，服务器不限制红石与生电。',
    },
    {
        question: '除了生存还有什么玩法？',
        answer: '还有小游戏和创造服，可以随时切换。',
    },
];
