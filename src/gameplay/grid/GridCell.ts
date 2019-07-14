import CloneableInterface from "@/interfaces/CloneableInterface";

export default class GridCell implements CloneableInterface {
    protected isTaken: Boolean;
    protected type: any;

    constructor(params?: any) {
        this.isTaken = params && params.isTaken ? params.isTaken : false;
        this.type = params && params.type ? params.type : null;
    }

    public clone(): GridCell {
        return new GridCell({
            isTaken: this.isTaken,
            type: this.type
        });
    }

    public cloneEmpty(): GridCell {
        return new GridCell();
    }

    public getIsTaken(): Boolean {
        return this.isTaken;
    }

    public setIsTaken(isTaken: Boolean): void {
        this.isTaken = isTaken;
    }

    public getType(): any {
        return this.type;
    }

    public setType(type: any): void {
        this.type = type;
    }
};