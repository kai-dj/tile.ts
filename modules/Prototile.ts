import {G, Matrix, Point, Element} from "@svgdotjs/svg.js";


export class Prototile extends G {
    /*constructor(attr: object, node?: SVGGElement) {
        super(attr);
        super(node);
    }*/
    public recursion: number
    public replacements: PrototileReplacement[]


    constructor(attr?: object) {
        super(attr);
        this.replacements = []
        this.recursion = 0
    }

    public addReplacement(prototileReplacement: PrototileReplacement): Prototile {
        this.replacements.push(prototileReplacement)
        return this
    }

    public setReplacementList(prototileReplacementList: PrototileReplacement[]): Prototile {
        this.replacements = (prototileReplacementList)
        return this
    }
    public setRecursion(recursion: number): Prototile {
        this.recursion = recursion
        return this
    }
    cloneWithReplacement(recursion: number) {
        return super.clone().setReplacementList(this.replacements).setRecursion(recursion)
    }
}

export class PrototileReplacement {

    constructor(prototypeNumber: number, localTransformMatrix: Matrix) {
        this.prototypeNumber = prototypeNumber;
        this.localTransformMatrix = localTransformMatrix;
    }

    prototypeNumber: number
    localTransformMatrix: Matrix


}



