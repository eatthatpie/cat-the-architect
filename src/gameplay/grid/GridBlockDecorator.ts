import GridBlockInterface from "../interfaces/GridBlockInterface";

export default class GridBlockDecorator implements GridBlockInterface {
    protected gridBlock: GridBlockInterface;

    public constructor(gridBlock: GridBlockInterface) {
        this.gridBlock = gridBlock;
    }

    public getHeight(): Number {
        return this.gridBlock.toArray().length;
    }

    public getWidth(): Number {
        return this.getHeight() > 0
            ? this.gridBlock.toArray()[0].length
            : 0;
    }

    public setCells(cells: any[]): void {
        this.gridBlock.setCells(cells);
    }

    public toArray(): Array<any> {
        return this.gridBlock.toArray();
    }
}