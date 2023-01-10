import { Polygon, SVG, Svg, PointArray, Color, StrokeData } from '@svgdotjs/svg.js';

export function initSvg(sizeX: number, sizeY: number, svgContainerId: string = "drawing"): Svg {
    let svgContainer: HTMLElement = document.getElementById(svgContainerId);
    svgContainer.innerHTML = "";
    svgContainer.setAttribute("style", "display: flex; flex-flow: column; height: 100%; width: 100%; background: #0ff;");
    let svg: Svg = SVG();
    svg.addTo('#drawing');
    svg.size(sizeX, sizeY);
    svg.scale(1, -1);
    svg.attr("style", "background-color: #ddd;");
    return svg;
}

export function getFPolygon(scale: number = 1
    , stroke: StrokeData = {}): Polygon {
    let pointArray = new PointArray([[0 * scale, 0 * scale]
        , [0 * scale, 1 * scale]
        , [1 * scale, 1 * scale]
        , [1 * scale, 0.75 * scale]
        , [0.25 * scale, 0.75 * scale]
        , [0.25 * scale, 0.5 * scale]
        , [0.75 * scale, 0.5 * scale]
        , [0.75 * scale, 0.25 * scale]
        , [0.25 * scale, 0.25 * scale]
        , [0.25 * scale, 0 * scale]
    ])
    let poly = new Polygon({ points: pointArray.toString() })//.fill("#f0f").stroke()
    poly.fill("#f0f")
    poly.stroke(stroke)
    return poly
}

export function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};
/*
export function downSvg(svg: any = svg) {
    console.log("downSVG")
    download("svg.svg",svg.svg());
};*/
