import { Svg } from "@svgdotjs/svg.js"

export function diagonalNumbers(svg: Svg, from: number, to: number, interval: number, scaleX: number = 1, scaleY: number = -1): void {
    for (let i: number = from; i <= to; i = i + interval) {
        svg.text(i + "").translate(i, i).fill("black").scale(scaleX, scaleY);
    }
};

