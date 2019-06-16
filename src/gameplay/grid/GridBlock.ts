import GridCell from './GridCell';

export default class GridBlock {
    protected cells: Array<any>;
    protected cols: number;
    protected rows: number;

    public constructor(params?: any, cells?: Array<any>) {
        this.cols = params && params.cols ? params.cols : 1;
        this.rows = params && params.rows ? params.rows : 1;

        if (cells) {
            this.cells = cells;

            return;
        }

        this.cells = [];

        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];

            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j] = new GridCell();
            }
        }
    }

    public toArray(): Array<any> {
        return this.cells;
    }
};