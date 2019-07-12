import GridBlockDecotator from './GridBlockDecorator';
import GridBlockInterface from "../interfaces/GridBlockInterface";
import GridCell from "./GridCell";
import CloneableInterface from '@/interfaces/CloneableInterface';

export default class CollapsableGridBlockDecorator extends GridBlockDecotator {
    public constructor(gridBlock: GridBlockInterface & CloneableInterface) {
        super(gridBlock);
    }

    // @TODO: this fella needs huge refactoring
    public collapse(): void {
        let gridBlockArray = this.gridBlock.toArray();

        gridBlockArray = gridBlockArray.map(row => {
            if (row.length === 0) {
                return row;
            }

            const type = row[0].getType();

            if (!type) {
                return row;
            }

            if (
                row
                    .filter(cell => cell.getType() === type)
                    .length === row.length
            ) {
                return row.map(cell => new GridCell({ isTaken: false }));
            }

            return row;
        });

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

    public isCollapsable(): Boolean {
        return (
            this.gridBlock
            .toArray()
            .filter(row => {
                if (row.length === 0) {
                    return false;
                }

                const type = row[0].getType();

                if (!type) {
                    return false;
                }

                return (
                    row
                        .filter(cell => cell.getType() === type)
                        .length === row.length
                );
            })
            .length > 0
        );
    }
};