export default class Triangle {
    private input: any;
    public description: string="This class represents a triangle – parameters of a triangle";
    constructor(input: any) {
        this.input = input;
        this.calcTriangle();

    }
    calcTriangle() {
        if (this.input.a && this.input.b && this.input.c)
        {
            console.log("all sides provided");
        } else if (this.input.a && this.input.b && (this.input.α||this.input.alpha)) {
            console.log("2 sides one angle")
        }
            else {
            console.log("not enough information to calculate a triangle")
        }
        console.log( "Hello, " + this.input.b);
        console.log( "TO " + typeof(this.input.b));
    }
}

