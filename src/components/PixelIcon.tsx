import { useMemo, type FC } from "react";
import { pixelIcons, type PixelIconName } from "../assets/pixelIcons";

type PixelIconProps = {
    name: PixelIconName;
    size?: string;
    title?: string;
};

const PixelIcon: FC<PixelIconProps> = ({ name, size = '2rem', title }) => {

    const { palette, pixels } = pixelIcons[name];
    const height = pixels.length;
    const width = pixels[0].length;

    const rects = useMemo(() => pixels.flatMap((row, y) =>
        row.split('').map((char, x) => {
            const color = (palette as Record<string, string>)[char];
            return color ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} /> : null;
        })
    ), [palette, pixels]);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${width} ${height}`}
            shapeRendering="crispEdges"
            role={title ? 'img' : undefined}
            aria-hidden={title ? undefined : true}>
            {title && <title>{title}</title>}
            {rects}
        </svg>
    );
};

export default PixelIcon;
