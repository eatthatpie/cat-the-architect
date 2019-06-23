import GridBlockInterface from "../interfaces/GridBlockInterface";
import GridCoordInterface from "../interfaces/GridCoordInterface";
import { Direction } from "@/common/Types";

export default class GridBlockDecorator implements GridBlockInterface {
    protected gridBlock: GridBlockInterface;

    public constructor(gridBlock: GridBlockInterface) {
        this.gridBlock = gridBlock;
    }

    public absorb(gridBlock: GridBlockInterface, coords?: GridCoordInterface): GridBlockInterface {
        throw new Error("Method not implemented.");
    }
    
    public addRotationStep(cells: Array <any>): void {
        throw new Error("Method not implemented.");
    }

    public collapse(): void {
        throw new Error("Method not implemented.");
    }

    public getCollisionPositionWith(
        gridBlock: GridBlockInterface,
        direction: Direction,
        coords?: GridCoordInterface
    ): GridCoordInterface {
        throw new Error("Method not implemented.");
    }

    public getNextRotationArray(): Array<any> {
        throw new Error("Method not implemented.");
    }

    public isCollapsable(): Boolean {
        throw new Error("Method not implemented.");
    }

    public isCollidingWith(gridBlock: GridBlockInterface, coords?: GridCoordInterface): Boolean {
        throw new Error("Method not implemented.");
    }

    public rotate(): void {
        throw new Error("Method not implemented.");
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