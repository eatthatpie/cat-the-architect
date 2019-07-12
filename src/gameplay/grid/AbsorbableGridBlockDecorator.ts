import GridBlock from '@/gameplay/grid/GridBlock';
import GridBlockDecotator from './GridBlockDecorator';
import GridBlockInterface from '@/gameplay/interfaces/GridBlockInterface';
import GridBlockMatcher from '@/gameplay/grid/GridBlockMatcher';
import GridCoordInterface from '@/gameplay/interfaces/GridCoordInterface';
import CloneableInterface from '@/interfaces/CloneableInterface';

export default class AbsorbableGridBlockDecorator extends GridBlockDecotator {
    public constructor(gridBlock: GridBlockInterface & CloneableInterface) {
        super(gridBlock);
    }

    public absorb(gridBlock: GridBlockInterface, coords?: GridCoordInterface): GridBlockInterface {
        const gbm = new GridBlockMatcher();

        gbm.match(<GridBlock> this.gridBlock, gridBlock, coords);

        if (gbm.isSumExpanding()) {
            throw new Error(
                `Grid absorption cannot extend absorbable grid block's dimensions.`
            );
        } else {
            this.gridBlock.setCells(gbm.getSum().toArray());
        }

        return this;
    }
}