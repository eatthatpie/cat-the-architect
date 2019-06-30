import GridBlockInterface from "../interfaces/GridBlockInterface";
import GridCoordInterface from "../interfaces/GridCoordInterface";
import { Direction } from "@/common/Types";

export default class GridBlockDecorator implements GridBlockInterface {
    protected gridBlock: GridBlockInterface;

    public constructor(gridBlock: GridBlockInterface) {
        this.gridBlock = gridBlock;
    }

    public absorb(
        gridBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): GridBlockInterface {
        return this.gridBlock.absorb(gridBlock, coords);
    }
    
    public addRotationStep(cells: Array <any>): void {
        this.gridBlock.addRotationStep(cells);
    }

    public collapse(): void {
        this.gridBlock.collapse();
    }

    public getCollisionPositionWith(
        gridBlock: GridBlockInterface,
        direction: Direction,
        coords?: GridCoordInterface
    ): GridCoordInterface {
        return this.gridBlock.getCollisionPositionWith(gridBlock, direction, coords);
    }

    public getHeight(): number {
        return this.gridBlock.toArray().length;
    }

    public getNextRotationArray(): Array<any> {
        return this.gridBlock.getNextRotationArray();
    }

    public getWidth(): number {
        return this.getHeight() > 0
            ? this.gridBlock.toArray()[0].length
            : 0;
    }

    public isCollapsable(): Boolean {
        return this.gridBlock.isCollapsable();
    }

    public isCollidingWith(
        gridBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): Boolean {
        return this.gridBlock.isCollidingWith(gridBlock, coords);
    }

    public rotate(): void {
        this.gridBlock.rotate();
    }

    public setCells(cells: any[]): void {
        this.gridBlock.setCells(cells);
    }

    public toArray(): Array<any> {
        return this.gridBlock.toArray();
    }
}