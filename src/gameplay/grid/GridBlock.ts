import GridBlockInterface from '@/gameplay//interfaces/GridBlockInterface';
import GridCell from '@/gameplay/grid/GridCell';
import GridDimensionsInterface from '@/gameplay/interfaces/GridDimensionsInterface';

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

    public toArray(): Array<any> {
        return this.cells;
    }
};