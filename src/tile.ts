import * as SVG from 'svg.js';
import {getRandomColor} from '../modules/ColorTools';

let drawing: HTMLElement = document.getElementById("drawing");
drawing.innerHTML = "";

let scale: number = 800;
let size: number = 800;
let deflation: number = 1 / (Math.sqrt(2) + 1);
let draw: SVG.Doc = SVG('drawing').size(size, size);

const pi: number = Math.PI;

let T1 = {
    C: [0, 0]
    , B: [scale * 1, 0]
    , A: [0, scale * 1]
    , a: 1
    , b: 1
    , c: Math.sqrt(2)
    , α: pi / 4
    , β: pi / 4
    , γ: pi / 2
    , ha: 1 * Math.sin(pi / 2)
    , hb: Math.sqrt(2) * Math.sin(pi / 4)
    , hc: 1 * Math.sin(pi / 4)
};

let T2 = {
    C: [0, 0]
    , B: [scale * Math.sqrt(2) * Math.sin(3 * pi / 8) / Math.sin(pi / 2), 0]
    , A: [0, scale * Math.sqrt(2) * Math.sin(pi / 8) / Math.sin(pi / 2)]
    , a: Math.sqrt(2) * Math.sin(3 * pi / 8) / Math.sin(pi / 2)
    , b: Math.sqrt(2) * Math.sin(pi / 8) / Math.sin(pi / 2)
    , c: Math.sqrt(2)
    , α: 3 * (pi / 8)
    , β: pi / 8
    , γ: pi / 2
    , ha: Math.sqrt(2) * Math.sin(pi / 8) / Math.sin(pi / 2) * Math.sin(pi / 2)
    , hb: Math.sqrt(2) * Math.sin(3 * (pi / 8))
    , hc: Math.sqrt(2) * Math.sin(3 * pi / 8) / Math.sin(pi / 2) * Math.sin(pi / 8)
    , pc: Math.sqrt(
        (Math.sqrt(2) * Math.sin(pi / 8) / Math.sin(pi / 2)) *
        (Math.sqrt(2) * Math.sin(pi / 8) / Math.sin(pi / 2)) -
        (Math.sqrt(2) * Math.sin(3 * pi / 8) / Math.sin(pi / 2) * Math.sin(pi / 8)) *
        (Math.sqrt(2) * Math.sin(3 * pi / 8) / Math.sin(pi / 2) * Math.sin(pi / 8))
    )
};


function clk() {
    let oldTile = this;
    let color = oldTile.children()[0].attr('fill');
    console.log('%c ahoi'
        , 'color:' + color + ';font-weight: bold;');
    var gg = draw.group();
    const oldTileM = new SVG.Matrix(oldTile);
    gg.polygon(pt2).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(1);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(tm1));
    gg.on('click', clk);

    gg = draw.group();
    gg.polygon(pt2).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(1);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(tm2));
    gg.on('click', clk);

    gg = draw.group();
    gg.polygon(pt2).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(1);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(tm3));
    gg.on('click', clk);

    gg = draw.group();
    gg.polygon(pt1).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(1);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(tm4));
    gg.on('click', clk1);

    gg = draw.group();
    gg.polygon(pt1).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(1);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(tm5));
    gg.on('click', clk1);


    oldTile.remove();
}

function clk1() {
    let oldTile = this;
    let color = oldTile.children()[0].attr('fill');
    console.log('%c ahoi'
        , 'color:' + color + ';font-weight: bold;');
    let gg = draw.group();
    let oldTileM = new SVG.Matrix(oldTile);
    gg.polygon(pt1).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(0.51);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(xtm1));
    gg.on('click', clk1);

    gg = draw.group();
    gg.polygon(pt1).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(0.51);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(xtm2));
    gg.on('click', clk1);

    gg = draw.group();
    gg.polygon(pt1).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(0.51);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(xtm3));
    gg.on('click', clk1);

    gg = draw.group();
    gg.polygon(pt2).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(0.51);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(xtm4));
    gg.on('click', clk);

    gg = draw.group();
    gg.polygon(pt2).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(0.51);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(xtm5));
    gg.on('click', clk);

    gg = draw.group();
    gg.polygon(pt2).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(0.51);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(xtm6));
    gg.on('click', clk);


    gg = draw.group();
    gg.polygon(pt2).fill(getRandomColor()).stroke({
        width: 0
    }).opacity(0.5);
    gg.transform(oldTileM.scale(deflation)).animate(200).transform(oldTileM.multiply(xtm7));
    gg.on('click', clk);


    oldTile.off('click');
}


//backgroud = draw.rect( size, size ).fill( "#fff" );

let g = draw.group();
let g1 = draw.group();

const pt1 = new SVG.PointArray([
    T1.C
    , T1.B
    , T1.A
]);

const pt2 = new SVG.PointArray([
    T2.C
    , T2.B
    , T2.A
]);

// g.polygon( pt2 ).fill( '#f60' ).stroke( {
//   width: 0
// } ).opacity( 1 );

g1.polygon(pt1).fill('#f60').stroke({
    width: 0
}).opacity(1);

let tm1 = (new SVG.Matrix).translate(0, 0 * scale).rotate(90).scale(deflation, -deflation);
let tm2 = (new SVG.Matrix).translate((T2.b + T2.a) * deflation * scale, 0).rotate(0).scale(deflation);
let tm3 = (new SVG.Matrix).translate((T2.b + T2.a) * deflation * scale, 0).rotate(0).scale(-deflation, deflation);
//
let tm4 = (new SVG.Matrix).translate(((T2.hb - T2.hb * deflation) / 2) * scale, (T2.ha * deflation + (T2.ha - T2.ha * deflation) / 2) * scale).rotate(157.5).scale(deflation);
let tm5 = (new SVG.Matrix).translate(((T2.hb - T2.hb * deflation) / 2) * scale, (T2.ha * deflation + (T2.ha - T2.ha * deflation) / 2) * scale).rotate(247.5).scale(deflation);


let xtm1 = (new SVG.Matrix).translate(0, 0 * scale).rotate(90).scale(deflation, -deflation);
let xtm2 = (new SVG.Matrix).translate(T1.hc * deflation * scale, (T1.a + T1.hc) * deflation * scale).rotate(135).scale(deflation, deflation);
let xtm3 = (new SVG.Matrix).translate(T1.hc * deflation * scale, (T1.a + T1.hc) * deflation * scale).rotate(225).scale(deflation, deflation);
let xtm4 = (new SVG.Matrix).translate((T2.pc * deflation) * scale + scale * deflation, (T2.hc) * deflation * scale).rotate(337.5).scale(deflation, deflation);
let xtm5 = (new SVG.Matrix).translate((T2.pc * deflation) * scale + scale * deflation, (T2.hc) * deflation * scale).rotate(337.5).scale(deflation, -deflation);
let xtm6 = (new SVG.Matrix).translate((T2.pc * deflation) * scale + scale * deflation, (T2.hc) * deflation * scale).rotate(157.5).scale(deflation, -deflation);
let xtm7 = (new SVG.Matrix).translate((T2.pc * deflation) * scale + scale * deflation, (T2.hc) * deflation * scale).rotate(157.5).scale(deflation, deflation);

// xtm2 = ( new SVG.Matrix ).translate( (T2.b+T2.a) *deflation * scale, 0 ).rotate( 0 ).scale( deflation );
// xtm3 = ( new SVG.Matrix ).translate( (T2.b+T2.a) *deflation * scale, 0 ).rotate( 0 ).scale( -deflation,deflation );
// xtm4 = ( new SVG.Matrix ).translate( ((T2.hb-T2.hb*deflation)/2)*scale,(T2.ha*deflation+(T2.ha-T2.ha*deflation)/2)*scale ).rotate( 157.5 ).scale( deflation );
// xtm5 = ( new SVG.Matrix ).translate( ((T2.hb-T2.hb*deflation)/2)*scale,(T2.ha*deflation+(T2.ha-T2.ha*deflation)/2)*scale ).rotate( 247.5 ).scale( deflation );
// xtm6 = ( new SVG.Matrix ).translate( 0.25 * scale, 0.25 * scale ).rotate( 0 ).scale( deflation );


// gg=g.clone();
// gg.children()[0].opacity(1)
// g.move(500,500);
g1.front();
//g12=g1.clone();
// thisM = new SVG.Matrix( g );
// gg.animate(500).transform(thisM.multiply(tm3));
// ggg=g1.clone();
// ggg.animate(500).transform(thisM.multiply(tm4));
let g12 = g1.clone();
//g12.children()[0].fill("#f60");
g12.rotate(-45, scale, 0);
g12.scale(1 / Math.sqrt(2), scale, 0);

let g13 = g12.clone();
//g13.children()[0].fill("#0ff");
g13.front();
g13.rotate(180 - 45);
g13.translate(scale / 2, scale / 2);
//g13.scale(1/Math.sqrt(2),scale,0);

let g14 = g12.clone();
//g14.children()[0].fill("#f0f");
g14.rotate(-90 - 45);
g14.translate(scale / 2, scale / 2);


g1.rotate(45, 0, scale);
//g1.move(scale,0);
g1.scale(1 / Math.sqrt(2), 0, scale);
g1.on('click', clk1);
g12.on('click', clk1);
g13.on('click', clk1);
g14.on('click', clk1);

