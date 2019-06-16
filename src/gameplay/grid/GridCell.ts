export default class GridCell {
    private isTaken: Boolean;

    constructor(params?: any) {
        this.isTaken = params && params.isTaken ? params.isTaken : false;
    }

    public getIsTaken(): Boolean {
        return this.isTaken;
    }
};