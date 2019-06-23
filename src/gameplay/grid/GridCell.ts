export default class GridCell {
    protected isTaken: Boolean;
    protected type: any;

    constructor(params?: any) {
        this.isTaken = params && params.isTaken ? params.isTaken : false;
        this.type = params && params.type ? params.type : null;
    }

    public getIsTaken(): Boolean {
        return this.isTaken;
    }

    public getType(): any {
        return this.type;
    }
};