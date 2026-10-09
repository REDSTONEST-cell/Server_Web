import { Box, ThemeProvider } from "@mui/material";
import { useCallback, useRef, type FC } from "react";

import theme, { PAGE_DURATION } from "./theme";
import { sections, sectionIds } from "./config/sections";
import useFullPage from "./hooks/useFullPage";
import NavHeader from "./components/NavHeader";
import PageDots from "./components/PageDots";

const App: FC = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const { index, moving, goTo } = useFullPage(container, { ids: sectionIds, duration: PAGE_DURATION });

    const goToId = useCallback((id: string) => goTo(sectionIds.indexOf(id)), [goTo]);

    return (
        <ThemeProvider theme={theme}>
            <Box
                ref={container}
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                <NavHeader sections={sections} activeIndex={index} onNavigate={goTo} />
                <Box
                    component="main"
                    sx={{
                        height: '100%',
                        transform: `translateY(calc(var(--page-h) * ${-index}))`,
                        transition: `transform ${PAGE_DURATION}ms var(--ease-page)`,
                    }}>
                    {sections.map(({ id, label, component: Section }, i) => (
                        <Box
                            component="section"
                            key={id}
                            // 不使用 id，避免浏览器根据地址栏 hash 自动滚动隐藏的容器
                            data-section={id}
                            aria-label={label}
                            // 非当前屏不可聚焦、不被读屏读取
                            inert={i !== index}
                            sx={{ height: 'var(--page-h)', position: 'relative', overflow: 'hidden' }}>
                            <Section active={i === index && !moving} goTo={goToId} />
                        </Box>
                    ))}
                </Box>
                <PageDots sections={sections} activeIndex={index} onNavigate={goTo} />
            </Box>
        </ThemeProvider>
    );
};

export default App;
