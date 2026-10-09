import type { ComponentType } from "react";

/** 每一屏组件都会收到的参数 */
export type SectionProps = {
    /** 当前屏处于可见状态且切换动画已结束，可用来触发入场动画 */
    active: boolean;
    /** 跳转到指定 id 的屏 */
    goTo: (id: string) => void;
};

export type SectionConfig = {
    id: string;
    /** 导航栏中显示的名字 */
    label: string;
    component: ComponentType<SectionProps>;
};
