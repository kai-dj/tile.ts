function sin(angleDeg: number) {
    let angleRad = angleDeg * (Math.PI / 180);
    return Math.sin(angleRad);
}

function asin(angleDeg: number) {
    let angleRad = angleDeg * (Math.PI / 180);
    return Math.asin(angleRad);
}

function cos(angleDeg: number) {
    let angleRad = angleDeg * (Math.PI / 180);
    return Math.cos(angleRad);
}

function sqr(x: number) {
    return Math.sqrt(x);
}

export class Triangle {
    public angles: any;
    public sides: any;

    constructor(sides: any, angles: any) {
        if (Object.keys(sides).length >= 3) {
            this.constructWithThreeSides(sides);
        } else if (Object.keys(sides).length >= 1 && Object.keys(angles).length >= 2) {
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if (Object.keys(sides).length >= 2 && Object.keys(angles).length >= 1) {
            this.constructWithOneAngleTwoSides(angles, sides);
        } else {
        }
        console.log(this.angles);
        console.log(this.sides);

    }

    private constructWithTwoAnglesOneSide(angles: any, sides: any) {
        console.log("constructWithTwoAnglesOneSide");
        if (('beta' in angles) && ('gamma' in angles)) {
            angles.alpha = 180 - angles.beta - angles.gamma;
        } else if (('alpha' in angles) && ('gamma' in angles)) {
            angles.beta = 180 - angles.alpha - angles.gamma;
        } else if (('alpha' in angles) && ('beta' in angles)) {
            angles.gamma = 180 - angles.beta - angles.alpha;
        } else {
        }
        this.angles = angles;
        if ('a' in sides) {
            sides.b = sides.a * sin(angles.beta) / sin(angles.alpha);
            sides.c = sides.a * sin(angles.gamma) / sin(angles.alpha);
        } else if ('b' in sides) {
            sides.a = sides.b * sin(angles.alpha) / sin(angles.beta);
            sides.c = sides.b * sin(angles.gamma) / sin(angles.beta);
        } else if ('c' in sides) {
            sides.a = sides.c * sin(angles.alpha) / sin(angles.gamma);
            sides.b = sides.c * sin(angles.beta) / sin(angles.gamma);
        } else {
        }
        this.sides = sides;
    }

    private constructWithThreeSides(sides: any) {
        console.log("constructWithThreeSides");
        this.angles = {};
        this.angles.alpha = Math.acos((sides.a * sides.a - sides.b * sides.b - sides.c * sides.c) / (-2 * sides.b * sides.c)) * (180 / Math.PI);
        this.angles.beta = Math.acos((sides.b * sides.b - sides.c * sides.c - sides.a * sides.a) / (-2 * sides.c * sides.a)) * (180 / Math.PI);
        this.angles.gamma = Math.acos((sides.c * sides.c - sides.a * sides.a - sides.b * sides.b) / (-2 * sides.a * sides.b)) * (180 / Math.PI);
        this.sides = sides;
    }

    private constructWithOneAngleTwoSides(angles: any, sides: any) {
        console.log("constructWithOneAngleTwoSides");
        if ('c' in sides && 'b' in sides && 'alpha' in angles) {
            sides.a = sqr(sides.b * sides.b + sides.c * sides.c - 2 * sides.b * sides.c * cos(angles.alpha));
            this.constructWithThreeSides(sides);
        } else if ('a' in sides && 'c' in sides && 'beta' in angles) {
            sides.b = sqr(sides.a * sides.a + sides.c * sides.c - 2 * sides.a * sides.c * cos(angles.beta));
            this.constructWithThreeSides(sides);
        } else if ('b' in sides && 'c' in sides && 'gamma' in angles) {
            sides.c = sqr(sides.a * sides.a + sides.b * sides.b - 2 * sides.a * sides.b * cos(angles.gamma));
            this.constructWithThreeSides(sides);
        } else if ('a' in sides && 'b' in sides && 'alpha' in angles) {
            angles.beta = asin(sides.b * sin(angles.alpha) / sides.a);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('a' in sides && 'b' in sides && 'beta' in angles) {
            angles.alpha = asin(sides.a * sin(angles.beta) / sides.b);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('a' in sides && 'c' in sides && 'alpha' in angles) {
            angles.gamma = asin(sides.c * sin(angles.alpha) / sides.a);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('a' in sides && 'c' in sides && 'gamma' in angles) {
            angles.alpha = asin(sides.a * sin(angles.gamma) / sides.c);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('b' in sides && 'c' in sides && 'beta' in angles) {
            angles.gamma = asin(sides.c * sin(angles.beta) / sides.b);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('b' in sides && 'c' in sides && 'gamma' in angles) {
            angles.beta = asin(sides.b * sin(angles.gamma) / sides.c);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else {
        }
    }

    public a_h() {
        return this.sides.b * sin(this.angles.gamma);
    }

    public b_h() {
        return this.sides.c * sin(this.angles.alpha);

    }

    public c_h() {
        return this.sides.a * sin(this.angles.beta);
    }

    public u() {
        return this.sides.a + this.sides.b + this.sides.c;
    }

    public A() {
        return this.sides.a * this.a_h() / 2;
    }

    public radiusOutCircle() {
        return this.sides.a / (2 * sin(this.angles.alpha));
    }

    public radiusInCircle() {
        return this.sides.c * sin(this.angles.alpha / 2)
            * sin(this.angles.beta / 2) / sin((this.angles.alpha + this.angles.beta) / 2);
    }

    public c_p() {
        return sqr(this.sides.a * this.sides.a - this.c_h() * this.c_h());
    }

    public c_q() {
        return sqr(this.sides.b * this.sides.b - this.c_h() * this.c_h());
    }
    public a_p() {
        return sqr(this.sides.b * this.sides.b - this.a_h() * this.a_h());
    }

    public a_q() {
        return sqr(this.sides.c * this.sides.c - this.a_h() * this.a_h());
    }
    public b_p() {
        return sqr(this.sides.c * this.sides.c - this.b_h() * this.b_h());
    }

    public b_q() {
        return sqr(this.sides.a * this.sides.a - this.b_h() * this.b_h());
    }
    //alphabetagamma
}