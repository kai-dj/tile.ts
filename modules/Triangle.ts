import {Point, PointArray} from "@svgdotjs/svg.js";

export type TriangleData = {
    P_C?: Point, P_A?: Point, P_B?: Point,
    a?: number, b?: number, c?: number,
    α?: number, β?: number, γ?: number,
    ha?: number, hb?: number, hc?: number,
    u?: number, A?: number, ri?: number, ru?: number,
    a_p?: number, a_q?: number, b_p?: number, b_q?: number, c_p?: number, c_q?: number
}

export enum TrianglePointName {
    A = "A",
    B = "B",
    C = "C"
}

export class Triangle {

    public isCalculated = false;
    public description: string = "This class represents a triangle – parameters of a triangle";
    public originPoint: TrianglePointName;
    public triangleData: TriangleData;

    constructor(triangleData: TriangleData) {
        this.triangleData = triangleData;
    }

    calcTriangle() {
        let td = this.triangleData;

        if (td.a && td.b && td.c) {
            console.log("SSS");
            this.calc_SSS(td);
            this.isCalculated = true;
        } else if ((td.b && td.c && td.α) || (td.c && td.a && td.β) || (td.a && td.b && td.γ)) {
            console.log("SWS");
            if (td.b && td.c && td.α) td.a = Math.sqrt(td.b * td.b + td.c * td.c - 2 * td.b * td.c * Math.cos(td.α));
            else if (td.c && td.a && td.β) td.b = Math.sqrt(td.a * td.a + td.c * td.c - 2 * td.a * td.c * Math.cos(td.β));
            else if (td.a && td.b && td.γ) td.c = Math.sqrt(td.a * td.a + td.b * td.b - 2 * td.a * td.b * Math.cos(td.γ));
            this.calc_SSS(td);
            this.isCalculated = true;
        } else if ((td.a && td.b && td.α) || (td.a && td.b && td.β) || (td.a && td.c && td.α) || (td.a && td.c && td.γ) || (td.b && td.c && td.β) || (td.b && td.c && td.γ)) {
            console.log("SsW oder WsS");
            if (td.a && td.b && td.α) td.β = Math.asin(td.b * Math.sin(td.α) / td.a);
            if (td.a && td.b && td.β) td.α = Math.asin(td.a * Math.sin(td.β) / td.b);
            if (td.a && td.c && td.α) td.γ = Math.asin(td.c * Math.sin(td.α) / td.a);
            if (td.a && td.c && td.γ) td.α = Math.asin(td.a * Math.sin(td.γ) / td.c);
            if (td.b && td.c && td.β) td.γ = Math.asin(td.c * Math.sin(td.β) / td.b);
            if (td.b && td.c && td.γ) td.β = Math.asin(td.b * Math.sin(td.γ) / td.c);
            this.calc_WWS(td);
            this.isCalculated = true;
        } else if ((td.a || td.b || td.c) && ((td.α && td.β) || (td.β && td.γ) || (td.γ && td.α))) {
            console.log("WWS");
            this.calc_WWS(td);
            this.isCalculated = true;
        } else {
            alert("not implemented or not enough info")
            this.isCalculated = false;
        }
        if (this.isCalculated) this.calc_other_values(td);
        return this
    }

    calcPoints(originPoint: TrianglePointName = TrianglePointName.A) {
        let td = this.triangleData;
        this.originPoint = originPoint
        switch (originPoint) {
            case TrianglePointName.A:
                td.P_A = new Point({x:0,y:0})
                td.P_B = new Point(td.c, 0);
                td.P_C = new Point(td.c_p, td.hc)
                break;
            case TrianglePointName.B:
                td.P_B = new Point(0, 0);
                td.P_C = new Point(td.a, 0);
                td.P_A = new Point(td.a_p, td.ha)
                break;
            case TrianglePointName.C:
                td.P_C = new Point(0, 0);
                td.P_A = new Point(td.b, 0);
                td.P_B = new Point(td.b_p, td.hb)
                break;
            default:
                console.error('Point must be "A","B" or "C"')
        }
        return this
    }

    getPointArray(originPoint: TrianglePointName = TrianglePointName.A): PointArray {
        this.calcPoints(originPoint)
        let td = this.triangleData;
        switch (originPoint) {
            case TrianglePointName.A:
                return new PointArray([td.P_A.toArray(), td.P_B.toArray(), td.P_C.toArray()])
            case TrianglePointName.B:
                return new PointArray([td.P_B.toArray(), td.P_C.toArray(), td.P_A.toArray()])
            case TrianglePointName.C:
                return new PointArray([td.P_C.toArray(), td.P_A.toArray(), td.P_B.toArray()])
            default:
                console.error('Point must be "A","B" or "C"')
                return null
        }
    }

    private calc_WWS(td: TriangleData) {
        if (td.α && td.β && !td.γ) {
            td.γ = Math.PI - td.α - td.β;
        } else if (td.β && td.γ && !td.α) {
            td.α = Math.PI - td.γ - td.β;
        } else if (td.γ && td.α && !td.β) {
            td.β = Math.PI - td.α - td.γ;
        }
        if (td.a && (!td.b || !td.c)) {
            if (!td.b) td.b = td.a * Math.sin(td.β) / Math.sin(td.α);
            if (!td.c) td.c = td.a * Math.sin(td.γ) / Math.sin(td.α);
        } else if (td.b && (!td.a || !td.c)) {
            if (!td.a) td.a = td.b * Math.sin(td.α) / Math.sin(td.β);
            if (!td.c) td.c = td.b * Math.sin(td.γ) / Math.sin(td.β);
        } else if (td.c && (!td.a || !td.b)) {
            if (!td.a) td.a = td.c * Math.sin(td.α) / Math.sin(td.γ);
            if (!td.b) td.b = td.c * Math.sin(td.β) / Math.sin(td.γ);
        }
    }

    private calc_SSS(td: TriangleData) {
        if (!td.α) td.α = Math.acos((td.a * td.a - td.b * td.b - td.c * td.c) / (-2 * td.b * td.c));
        if (!td.β) td.β = Math.acos((td.b * td.b - td.c * td.c - td.a * td.a) / (-2 * td.c * td.a));
        if (!td.γ) td.γ = Math.acos((td.c * td.c - td.a * td.a - td.b * td.b) / (-2 * td.a * td.b));
    }

    private calc_other_values(td: TriangleData) {
        //heights
        td.ha = td.b * Math.sin(td.γ);
        td.hb = td.c * Math.sin(td.α);
        td.hc = td.a * Math.sin(td.β);
        //circumference
        td.u = td.a + td.b + td.c
        td.A = td.a * td.ha / 2
        td.ru = td.a / (2 * Math.sin(td.α))
        td.ri = td.c * Math.sin(td.α / 2) * Math.sin(td.β / 2) / Math.sin((td.α + td.β) / 2)
        //
        td.c_p = Math.sqrt(td.b * td.b - td.hc * td.hc)
        td.c_q = Math.sqrt(td.a * td.a - td.hc * td.hc)
        td.a_p = Math.sqrt(td.c * td.c - td.ha * td.ha)
        td.a_q = Math.sqrt(td.b * td.b - td.ha * td.ha)
        td.b_p = Math.sqrt(td.a * td.a - td.hb * td.hb)
        td.b_q = Math.sqrt(td.c * td.c - td.hb * td.hb)
    }

    /**
     Weitere Formeln
     Seitenhalbierende:
     sa = √(b² + c² + 2·b·c·cos(α))/2
     sb = √(c² + a² + 2·c·a·cos(β))/2
     sc = √(a² + b² + 2·a·b·cos(γ))/2
     sa = √(2·(b² + c²) - a²)/2
     sb = √(2·(c² + a²) - b²)/2
     sc = √(2·(a² + b²) - c²)/2

     Winkelhalbierende:
     wa = 2·b·c·cos(α/2)/(b + c)
     wb = 2·c·a·cos(β/2)/(c + a)
     wc = 2·a·b·cos(γ/2)/(a + b)


     */
}




