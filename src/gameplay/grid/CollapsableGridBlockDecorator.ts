import GridBlockDecotator from './GridBlockDecorator';
import GridBlockInterface from "../interfaces/GridBlockInterface";
import GridBlockCrawler from '@/gameplay/crawler/GridBlockCrawler';
import GridCell from "./GridCell";
import CloneableInterface from '@/interfaces/CloneableInterface';
import GridCoordInterface from '../interfaces/GridCoordInterface';

export default class CollapsableGridBlockDecorator extends GridBlockDecotator {
    public constructor(gridBlock: GridBlockInterface & CloneableInterface) {
        super(gridBlock);
    }

    public collapse(): void {
        let gridBlockArray = this.gridBlock.toArray();

        for (let k = 0; k < gridBlockArray.length; k++) {
            for (let i = gridBlockArray.length - 1; i >= 0; i--) {
                if (gridBlockArray[i].length === 0) {
                    continue;
                }
                
                for (let j = 0; j < gridBlockArray[i].length; j++) {
                    let cell = gridBlockArray[i][j];
    
                    if (!cell.getIsTaken() && i - 1 >= 0) {
                        gridBlockArray[i][j] = gridBlockArray[i - 1][j];
                        gridBlockArray[i - 1][j] = new GridCell({ isTaken: false });
                    }
                }
            }
        }

        this.gridBlock.setCells(gridBlockArray);
    }

    public removeCellsPaths(): Array<Array<GridCoordInterface>> {
        const gbc = new GridBlockCrawler(this.gridBlock);

        const paths = gbc.findCellsPaths();

        let gridBlockArray = this.gridBlock.clone().toArray();

        paths.forEach(path => {
            path.forEach(cell => {
                gridBlockArray[cell.row - 1][cell.col - 1] = new GridCell();

                // check if triggered
            })
        });

        // if triggered
        this.gridBlock.setCells(gridBlockArray);

        return paths;
    }
};