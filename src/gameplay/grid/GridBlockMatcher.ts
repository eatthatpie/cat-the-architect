import ArrayHelper from "@/common/helpers/ArrayHelper";
import GridBlockInterface from "@/gameplay/interfaces/GridBlockInterface";
import GridBlock from "./GridBlock";
import GridCoordInterface from "../interfaces/GridCoordInterface";
import CloneableInterface from "@/interfaces/CloneableInterface";

export default class GridBlockMatcher {
    protected _intersectionArray: Array<Array<any>>;
    protected _isSumExpanding: Boolean;
    protected _sumArray: Array<Array<any>>;

    public constructor() {
        this._intersectionArray = null;
    }

    public getIntersection(): GridBlockInterface {
        if (!this._intersectionArray) {
            return null;
        }

        return new GridBlock(this._intersectionArray);
    }

    public getSum(): GridBlockInterface {
        return new GridBlock(this._sumArray);
    }

    public isSumExpanding(): Boolean {
        return this._isSumExpanding;
    }

    public match(
        hostBlock: GridBlock,
        clientBlock: GridBlockInterface,
        coords?: GridCoordInterface
    ): void {
        this._intersectionArray = null;
        this._isSumExpanding = false;
        this._sumArray = hostBlock.clone().toArray();

        const self = this;

        ArrayHelper.forEachInMatrix(clientBlock.toArray(), function(cell) {
            const i = coords
                ? cell.i + coords.row - 1
                : cell.i;
            const j = coords
                ? cell.j + coords.col - 1
                : cell.j;

            if (!ArrayHelper.doPairMatchMatrixDimensions(self._sumArray, i, j)) {
                if (cell.item.getIsTaken()) {
                    self._isSumExpanding = true;
                }

                return;
            }

            if (cell.item.getIsTaken()) {
                if (self._sumArray[i][j].getIsTaken()) {
                    if (!self._intersectionArray) {
                        self._intersectionArray = hostBlock.cloneEmpty().toArray();
                    }

                    self._intersectionArray[i][j].setIsTaken(true);
                }

                self._sumArray[i][j].setIsTaken(true)
            }
        });
    }
};
