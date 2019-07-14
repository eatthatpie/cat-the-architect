import GridCoordInterface from "../interfaces/GridCoordInterface";
import GridBlockInterface from "../interfaces/GridBlockInterface";
import CloneableInterface from "@/interfaces/CloneableInterface";
import ArrayHelper from "@/common/helpers/ArrayHelper";

export default class GridBlockCrawler {
    protected gridBlock: GridBlockInterface & CloneableInterface;
    protected ignoredCellsNormalized: Array<Number>;

    public constructor(gridBlock: GridBlockInterface & CloneableInterface) {
        this.gridBlock = gridBlock;
        this.ignoredCellsNormalized = [];
    }

    public addIgnoredCell(coords: GridCoordInterface): void {
        this.ignoredCellsNormalized.push(
            (coords.row - 1) * this.gridBlock.clone().toArray().length + coords.col
        );
    }

    public getNextCell(): GridCoordInterface {
        let out = null;

        ArrayHelper.forEachInMatrix(this.gridBlock.clone().toArray(), ({ i, j }) => {
            if (
                this.ignoredCellsNormalized.indexOf(
                    (i * this.gridBlock.clone().toArray().length) + j + 1
                ) < 0
            ) {
                out = { col: j + 1, row: i + 1 };

                return true;
            }
        });

        return out;
    }

    public neighs(coords: GridCoordInterface): Array<GridCoordInterface> {
        let out = [];

        const gridBlockArray = this.gridBlock.clone().toArray();

        const baseBlock = gridBlockArray[coords.row - 1]
            ? gridBlockArray[coords.row - 1][coords.col - 1] || null
            : null;

        if (!baseBlock || !baseBlock.getIsTaken()) {
            return out;
        }
        
        const neighsCoords = [
            { row: coords.row - 1, col: coords.col },
            { row: coords.row, col: coords.col + 1 },
            { row: coords.row + 1, col: coords.col },
            { row: coords.row, col: coords.col - 1 }
        ];

        neighsCoords.forEach(coords => {
            const neighBlock = gridBlockArray[coords.row - 1]
                ? gridBlockArray[coords.row - 1][coords.col - 1] || null
                : null;

            if (neighBlock && neighBlock.getIsTaken() && neighBlock.getType() == baseBlock.getType()) {
                out.push(coords);
            }
        })

        return out;
    }
};
