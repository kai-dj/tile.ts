import {
    ArrayXY,
    CoordinateXY,
    G,
    Matrix,
    Point,
    PointArray,
    Polygon,
    SVG,
    Svg,
    MatrixExtract,
    StrokeData, on, Timeline, Runner, Color
} from '@svgdotjs/svg.js'
import { Triangle, TriangleData, TrianglePointName } from "../modules/Triangle"
import { Prototile, PrototileReplacement } from "../modules/Prototile"
import { calculateEigenvalue } from '../modules/Eigenvalue'
import { getRandomColor } from "../modules/ColorTools"
import { log, logJSON } from '../modules/ConsoleHelper'
import { download, generateUUID, initSvg } from '../modules/SvgHelper'
import { diagonalNumbers } from '../modules/Grid'
import { getFPolygon } from '../modules/SvgHelper'

log("Start tile-ts ")

let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
windowWidth = windowWidth * 0.8
windowHeight = windowHeight * 0.8
let minSize = Math.min(windowWidth, windowHeight)

let timeLineArray: Timeline[] = []
let runnerLibrary: Runner[] = []

//const size: number = 1080
const scale: number = minSize 
const svgContainerId: string = 'drawing'
let svg = initSvg(minSize, minSize)

log("svg size: " + minSize + "x" + minSize)
let defs = svg.defs()
//diagonalNumbers(svg, 100, size, 100)

const inflation: number = Math.sqrt(2)
const deflation: number = 1 / Math.sqrt(2)

const defaultStroke = { color: '#00f', width: 5, linecap: "butt", linejoin: "bevel" }
let blackStroke: StrokeData = { color: '#fff', width: 10, linecap: "butt", linejoin: "bevel" };

let pinwheel_1_3_triangle0 = new Triangle({ a: 1 * scale, b: Math.sqrt(2) * scale, c: 1 * scale }).calcTriangle()
let pinwheel_1_3_triangle1 = new Triangle({ a: Math.sqrt(2) * scale, b: 2 * scale, c: Math.sqrt(2) * scale }).calcTriangle()
let pinwheel_1_3_triangle2 = new Triangle({ a: 2 * scale, b: 2 * Math.sqrt(2) * scale, c: 2 * scale }).calcTriangle()
log(pinwheel_1_3_triangle2.triangleData)


let prototileArray: Prototile[] = [
    new Prototile()
        //.add(new Polygon({ points: pinwheel_1_3_triangle0.getPointArray().toString() }).stroke(blackStroke).fill("#f8cb66"))
        .add(getFPolygon(50).translate(50, 0))
        //.add(getFPolygon(50).translate(-50, -50))
        .addReplacement(new PrototileReplacement(1, new Matrix().scale(deflation, deflation)))
    , new Prototile()
        //.add(new Polygon({ points: pinwheel_1_3_triangle1.getPointArray().toString() }).stroke(blackStroke).fill("#ff6600"))
        //.add(getFPolygon(50).translate(50, 0))
        //.add(getFPolygon(50).translate(-50, -50))
        .addReplacement(new PrototileReplacement(2, new Matrix().scale(deflation, deflation)))
    , new Prototile()
        //.add(new Polygon({ points: pinwheel_1_3_triangle2.getPointArray().toString() }).stroke(blackStroke).fill("#0f0066"))
        //.add(getFPolygon(50).translate(50, 0))
        //.add(getFPolygon(50).translate(-50, -50))
        //.addReplacement(new PrototileReplacement(0, new Matrix().scale(deflation, deflation).rotate(22.5 * 6, 0, 0).translate(1 * scale, 0 * deflation * scale)))
        //.addReplacement(new PrototileReplacement(0, new Matrix().scale(deflation, -deflation).rotate(22.5 * 6, 0, 0).translate(1 * scale, 0 * deflation * scale)))
        //.addReplacement(new PrototileReplacement(0, new Matrix().scale(deflation, deflation).rotate(22.5 * 2, 0, 0).translate(1 * scale, 0 * deflation * scale)))
        //.addReplacement(new PrototileReplacement(0, new Matrix().scale(deflation, -deflation).rotate(22.5 * 2, 0, 0).translate(1 * scale, 0 * deflation * scale)))
        //.addReplacement(new PrototileReplacement(0, new Matrix().scale(deflation, deflation).rotate(22.5 * 6, 0, 0).translate(2 * scale, 0 * deflation * scale)))
        //.addReplacement(new PrototileReplacement(0, new Matrix().scale(deflation, deflation).rotate(22.5 * 10, 0, 0).translate(1 * scale, 1 * scale)))
        //.addReplacement(new PrototileReplacement(2, new Matrix().scale(deflation, deflation).rotate(22.5 * 10, 0, 0).translate(2 * scale, 2 * scale)))
    //.addReplacement(new PrototileReplacement(0, new Matrix().scale(-deflation, deflation).rotate(22.5 * 2, 0, 0).translate((Math.sqrt(2) + 1) * deflation * scale, 1 * deflation * scale)))
    //.addReplacement(new PrototileReplacement(0, new Matrix().scale(deflation, deflation).rotate(22.5 * -6, 0, 0).translate((Math.sqrt(2) + 1) * deflation * scale, 1 * deflation * scale)))
    //.addReplacement(new PrototileReplacement(0, new Matrix().scale(-deflation, deflation).rotate(22.5 * 6, 0, 0).translate((Math.sqrt(2) + 1) * deflation * scale, 1 * deflation * scale)))
    //.addReplacement(new PrototileReplacement(2, new Matrix().scale(-deflation, deflation).rotate(22.5 * -2, 0, 0).translate((Math.sqrt(2) + 1 + 1) * deflation * scale, 0 * deflation * scale)))
]

function clickAllGroups() {
    log("clickAllGroups")
    let elements = document.getElementsByTagName('g');
    for (let i = 0, len = elements.length; i < len; i++) {
        log(elements[i].id)
        elements[i].dispatchEvent(new Event('click'))
    }
}
function protoClick() {
    log("protoClick ")
    this.off('click')
    let eventPrototile: Prototile = this
    setTimeout(function () {
        eventPrototile.hide//.opacity(0.3)
    }, 1000)
 
    let replacementList: PrototileReplacement[] = eventPrototile.replacements
    replacementList.forEach(replacement => {

        let replacePrototile = prototileArray[replacement.prototypeNumber].cloneWithReplacement(eventPrototile.recursion + 1);
        svg.add(replacePrototile)
        replacePrototile.transform(eventPrototile.matrix())
        replacePrototile
            //.animate(1000).ease('-')
            .transform(eventPrototile.matrix().multiply(replacement.localTransformMatrix))
        // replacePrototile.timeline().pause()
        //
        // replacePrototile.mouseover(function() { this.timeline().play() })
        // replacePrototile.mouseout(function() { this.timeline().pause() })
        replacePrototile.on('click', protoClick)
        //eventPrototile.recursion*5*(inflation/inflation)
        //        replacePrototile.children()[0].stroke(
        //            { color: '#000', width: 5 * (eventPrototile.recursion) * inflation, linecap: "butt", linejoin: "bevel" }
        //            )
        //replacePrototile.opacity(0.3)
        //.translate(1 * deflation * scale, 1 * deflation * scale)
        //.transform(replacement.localTransformMatrix.multiply(eventPrototile.transform()), false, true)
        //.rotate(22.5 * 6, 0, 0).translate((Math.sqrt(2) + 1 + 1) * deflation * scale, 0 * deflation * scale)
        //replacePrototile.ungroup(this)
        /*if (replacePrototile.recursion<4) {
        setTimeout(function () {
            replacePrototile.fire('click')
        },

        Math.floor(Math.random()*1000*eventPrototile.recursion)+3000*0+1000)
        } else {
            console.log("recursion depth reached")
        }*/
    })
    //proto2.translate(1,1)}
}

function touchMoveProto() {
    console.log("bla")
}
let seedproto0: Prototile = prototileArray[0].cloneWithReplacement(0).translate(0*2* scale, 0*2*scale).rotate(0, 0, 0).on('click', protoClick).id("spt0")//.on('touchmove', touchMoveProto)
seedproto0.recursion = 1;
svg.add(seedproto0)

//let seedproto1: Prototile = prototileArray[1].cloneWithReplacement(1).translate(2* scale, 0).rotate(0, 0, 0).on('click', protoClick).id("spt1")//.on('touchmove', touchMoveProto)
//seedproto1.recursion = 1;
//svg.add(seedproto1)
//let seedproto2: Prototile = prototileArray[2].cloneWithReplacement(1).translate(0, 0).rotate(0, 0, 0).on('click', protoClick).id("spt2")//.on('touchmove', touchMoveProto)
//seedproto2.recursion = 1;
//svg.add(seedproto2)

//let seedproto1: Prototile = prototileArray[2].cloneWithReplacement(1).translate(2 * scale, 0).rotate(0, 0, 0).on('click', protoClick).id("spt1")//.on('touchmove', touchMoveProto)
//seedproto1.recursion = 1;
//svg.add(seedproto1)
//let seedproto2: Prototile = prototileArray[2].cloneWithReplacement(1).translate(2 * scale, 2 * scale).rotate(0, 0, 0).on('click', protoClick).id("spt2")//.on('touchmove', touchMoveProto)
//seedproto2.recursion = 1;
//svg.add(seedproto2)
//let seedproto3: Prototile = prototileArray[2].cloneWithReplacement(1).translate(0 * scale, 2 * scale).rotate(0, 0, 0).on('click', protoClick).id("spt3")//.on('touchmove', touchMoveProto)
//seedproto3.recursion = 1;
//svg.add(seedproto3)
//let seedproto4: Prototile = prototileArray[2].cloneWithReplacement(1).translate(2 * scale, 2 * scale).rotate(8*22.5, 0, 0).on('click', protoClick).id("spt4")//.on('touchmove', touchMoveProto)
//seedproto4.recursion = 1;
//svg.add(seedproto4)
//let seedproto5: Prototile = prototileArray[2].cloneWithReplacement(1).translate(4 * scale, 2 * scale).rotate(8*22.5, 0, 0).on('click', protoClick).id("spt5")//.on('touchmove', touchMoveProto)
//seedproto5.recursion = 1;
//svg.add(seedproto5)
//let seedproto6: Prototile = prototileArray[2].cloneWithReplacement(1).translate(4 * scale, 4 * scale).rotate(8*22.5, 0, 0).on('click', protoClick).id("spt6")//.on('touchmove', touchMoveProto)
//seedproto6.recursion = 1;
//svg.add(seedproto6)
//let seedproto7: Prototile = prototileArray[2].cloneWithReplacement(1).translate(2 * scale, 4 * scale).rotate(8*22.5, 0, 0).on('click', protoClick).id("spt7")//.on('touchmove', touchMoveProto)
//seedproto7.recursion = 1;
//svg.add(seedproto7)
seedproto0.on('click', protoClick)
//seedproto1.on('click', protoClick)
//seedproto2.on('click', protoClick)
//seedproto0.fire('click')
//seedproto1.fire('click')
//seedproto2.fire('click')

//seedproto0.opacity(0.5)
//seedproto1.opacity(0.5)
//seedproto2.opacity(0.5)
//seedproto1.on('click', protoClick)
//seedproto2.on('click', protoClick)
//seedproto3.on('click', protoClick)
//seedproto4.on('click', protoClick)
//seedproto5.on('click', protoClick)
//seedproto6.on('click', protoClick)
//seedproto7.on('click', protoClick)
let clickAllButton = document.getElementsByClassName('button_click_all')[0]
on(clickAllButton, 'click', clickAllGroups)
let downloadButton = document.getElementsByClassName('button_download')[0]
function downloadSvg() {
    let dateIsoString = Date.now()
    download("pattern-" + dateIsoString + ".svg", svg.svg())
}
on(downloadButton, 'click', downloadSvg)

//log(seedproto0.replacements.length)
//calculateEigenvalue(prototileArray)
//clickAllButton.fire('click')

console.error(JSON.stringify(prototileArray))