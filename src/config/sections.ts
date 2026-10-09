import type { SectionConfig } from "../types";
import Home from "../pages/Home";
import Modes from "../pages/Modes";
import Gallery from "../pages/Gallery";
import Players from "../pages/Players";
import Join from "../pages/Join";

// 页面上的每一屏，按顺序排列。新增一屏：写一个接收 SectionProps 的组件，在这里加一项即可，
// 导航栏、右侧指示器和地址栏 hash（例如 /#join）会自动生成
export const sections: SectionConfig[] = [
    { id: 'home', label: '首页', component: Home },
    { id: 'modes', label: '玩法', component: Modes },
    { id: 'gallery', label: '风景', component: Gallery },
    { id: 'players', label: '玩家', component: Players },
    { id: 'join', label: '加入', component: Join },
];

export const sectionIds = sections.map(section => section.id);
