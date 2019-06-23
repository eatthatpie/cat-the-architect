import GridBlockInterface from '@/gameplay//interfaces/GridBlockInterface';
import GridCell from '@/gameplay/grid/GridCell';
import GridDimensionsInterface from '@/gameplay/interfaces/GridDimensionsInterface';
import GridCoordInterface from '../interfaces/GridCoordInterface';
import { Direction } from '@/common/Types';

export default class GridBlock implements GridBlockInterface {
    protected cells: Array<any>;

    public constructor(cells?: GridDimensionsInterface | Array<any>) {
        if (!cells) {
            this.cells = [[new GridCell()]];
        }
        else if (Array.isArray(cells)) {
            this.cells = cells;
        }
        else {
            this.cells = [];

            for (let i = 0; i < cells.rows; i++) {
                this.cells[i] = [];
    
                for (let j = 0; j < cells.cols; j++) {
                    this.cells[i][j] = new GridCell();
                }
            }
        }
    }

    public absorb(gridBlock: GridBlockInterface, coords?: GridCoordInterface): GridBlockInterface {
        throw new Error("Method not implemented.");
    }
    
    public addRotationStep(): void {
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
        return this.cells.length;
    }

    public getWidth(): Number {
        return this.getHeight() > 0 ? this.cells[0].length : 0;
    }

    public setCells(cells: Array<any>): void {
        this.cells = cells;
    }

    public toArray(): Array<any> {
        return this.cells;
    }
};