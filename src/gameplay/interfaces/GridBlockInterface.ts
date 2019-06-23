export default interface GridBlockInterface {
    getHeight(): Number;
    getWidth(): Number;
    setCells(cells: Array<any>): void;
    toArray(): Array<any>;
};