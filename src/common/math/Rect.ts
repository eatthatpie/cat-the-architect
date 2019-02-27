import Vector from '@/common/math/Vector'

export default class Rect {
    private topLeft: Vector;
    private bottomRight: Vector;

    constructor(topLeft?: Vector, bottomRight?: Vector) {
        this.topLeft = topLeft || new Vector();
        this.bottomRight = bottomRight || new Vector();
    }

    public contains(vector: Vector): boolean {
        return this.topLeft.x <= vector.x
            && this.topLeft.y <= vector.y
            && this.bottomRight.x >= vector.x
            && this.bottomRight.y >= vector.y
    }

    public getVectorArray(): Array<number> {
        return [
            this.topLeft.x,
            this.topLeft.y,
            this.bottomRight.x,
            this.bottomRight.y
        ]
    }

    public getBottomRightVector(): Vector {
        return this.bottomRight;
    }

    public getTopLeftVector(): Vector {
        return this.topLeft;
    }
}