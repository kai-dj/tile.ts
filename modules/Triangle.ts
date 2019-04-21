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
    private angles: any;
    private sides: any;

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
        if (('β' in angles) && ('γ' in angles)) {
            angles.α = 180 - angles.β - angles.γ;
        } else if (('α' in angles) && ('γ' in angles)) {
            angles.β = 180 - angles.α - angles.γ;
        } else if (('α' in angles) && ('β' in angles)) {
            angles.γ = 180 - angles.β - angles.α;
        } else {
        }
        this.angles = angles;
        if ('a' in sides) {
            sides.b = sides.a * sin(angles.β) / sin(angles.α);
            sides.c = sides.a * sin(angles.γ) / sin(angles.α);
        } else if ('b' in sides) {
            sides.a = sides.b * sin(angles.α) / sin(angles.β);
            sides.c = sides.b * sin(angles.γ) / sin(angles.β);
        } else if ('c' in sides) {
            sides.a = sides.c * sin(angles.α) / sin(angles.γ);
            sides.b = sides.c * sin(angles.β) / sin(angles.γ);
        } else {
        }
        this.sides = sides;
    }

    private constructWithThreeSides(sides: any) {
        console.log("constructWithThreeSides");
        this.angles = {};
        this.angles.α = Math.acos((sides.a * sides.a - sides.b * sides.b - sides.c * sides.c) / (-2 * sides.b * sides.c)) * (180 / Math.PI);
        this.angles.β = Math.acos((sides.b * sides.b - sides.c * sides.c - sides.a * sides.a) / (-2 * sides.c * sides.a)) * (180 / Math.PI);
        this.angles.γ = Math.acos((sides.c * sides.c - sides.a * sides.a - sides.b * sides.b) / (-2 * sides.a * sides.b)) * (180 / Math.PI);
        this.sides = sides;
    }

    private constructWithOneAngleTwoSides(angles: any, sides: any) {
        console.log("constructWithOneAngleTwoSides");
        if ('c' in sides && 'b' in sides && 'α' in angles) {
            sides.a = sqr(sides.b * sides.b + sides.c * sides.c - 2 * sides.b * sides.c * cos(angles.α));
            this.constructWithThreeSides(sides);
        } else if ('a' in sides && 'c' in sides && 'β' in angles) {
            sides.b = sqr(sides.a * sides.a + sides.c * sides.c - 2 * sides.a * sides.c * cos(angles.β));
            this.constructWithThreeSides(sides);
        } else if ('b' in sides && 'c' in sides && 'γ' in angles) {
            sides.c = sqr(sides.a * sides.a + sides.b * sides.b - 2 * sides.a * sides.b * cos(angles.γ));
            this.constructWithThreeSides(sides);
        } else if ('a' in sides && 'b' in sides && 'α' in angles) {
            angles.β = asin(sides.b * sin(angles.α) / sides.a);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('a' in sides && 'b' in sides && 'β' in angles) {
            angles.α = asin(sides.a * sin(angles.β) / sides.b);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('a' in sides && 'c' in sides && 'α' in angles) {
            angles.γ = asin(sides.c * sin(angles.α) / sides.a);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('a' in sides && 'c' in sides && 'γ' in angles) {
            angles.α = asin(sides.a * sin(angles.γ) / sides.c);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('b' in sides && 'c' in sides && 'β' in angles) {
            angles.γ = asin(sides.c * sin(angles.β) / sides.b);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else if ('b' in sides && 'c' in sides && 'γ' in angles) {
            angles.β = asin(sides.b * sin(angles.γ) / sides.c);
            this.constructWithTwoAnglesOneSide(angles, sides);
        } else {
        }
    }
}