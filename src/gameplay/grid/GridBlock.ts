import GridBlockInterface from '@/gameplay//interfaces/GridBlockInterface';
import GridCell from '@/gameplay/grid/GridCell';
import GridDimensionsInterface from '@/gameplay/interfaces/GridDimensionsInterface';
import GridCoordInterface from '../interfaces/GridCoordInterface';
import { Direction } from '@/common/Types';
import CloneableInterface from '@/interfaces/CloneableInterface';
import ArrayHelper from '@/common/helpers/ArrayHelper';

export default class GridBlock implements GridBlockInterface, CloneableInterface {
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
                if (!cells.cols) {
                    continue;
                }
            
                this.cells[i] = [];
    
                for (let j = 0; j < cells.cols; j++) {
                    this.cells[i][j] = new GridCell();
                }
            }
        }
    }

    public absorb(
        gridBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): GridBlockInterface {
        throw new Error("Method not implemented.");
    }
    
    public addRotationStep(cells: Array <any>): void {
        throw new Error("Method not implemented.");
    }

    public clone(): GridBlock {
        let outArray = [];

        ArrayHelper.forEachInMatrix(this.toArray(), ({ i, j, item }) => {
            if (!outArray[i]) {
                outArray[i] = [];
            }

            if (item) {
                outArray[i][j] = item.clone();
            } else {
                outArray[i][j] = new GridCell({ isTaken: false });
            }
        });

        return new GridBlock(outArray);
    }

    public cloneEmpty(): GridBlock {
        let outArray = [];

        ArrayHelper.forEachInMatrix(this.toArray(), ({ i, j, item }) => {
            if (!outArray[i]) {
                outArray[i] = [];
            }

            outArray[i][j] = new GridCell({ isTaken: false });
        });

        return new GridBlock(outArray);
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

    public getHeight(): number {
        return this.cells.length;
    }

    public getNextRotationArray(): Array<any> {
        throw new Error("Method not implemented.");
    }

    public getWidth(): number {
        return this.getHeight() > 0 ? this.cells[0].length : 0;
    }

    public isCollapsable(): Boolean {
        throw new Error("Method not implemented.");
    }

    public isCollidingWith(
        gridBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): Boolean {
        throw new Error("Method not implemented.");
    }

    public rotate(): void {
        throw new Error("Method not implemented.");
    }

    public setCells(cells: Array<any>): void {
        this.cells = cells;
    }

    public toArray(): Array<any> {
        return this.cells;
    }
};