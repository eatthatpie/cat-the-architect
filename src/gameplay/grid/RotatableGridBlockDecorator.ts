import GridBlockDecotator from './GridBlockDecorator';
import GridBlockInterface from '@/gameplay/interfaces/GridBlockInterface'
import GridCell from '@/gameplay/grid/GridCell';

export default class RotatableGridBlockDecorator extends GridBlockDecotator implements GridBlockInterface {
    private rotationIndex: number;
    private rotationSteps: Array <any>;

    public constructor(gridBlock: GridBlockInterface) {
        super(gridBlock);

        this.rotationIndex = 0;
        this.rotationSteps = [];
    }

    public addRotationStep(cells: Array < any > ): void {
        this.rotationSteps.push(cells);
    }

    public getNextRotationArray(): Array < any > {
        let rotationIndex = this.rotationIndex + 1;

        if (rotationIndex > this.rotationSteps.length - 1) {
            rotationIndex = 0;
        }

        if (
            this.rotationSteps.length === 0 ||
            rotationIndex > this.rotationSteps.length - 1
        ) {
            return this.gridBlock.toArray();
        }

        let out = JSON.parse(JSON.stringify(this.gridBlock.toArray()));

        this.rotationSteps[rotationIndex].forEach(stepCell => {
            out[stepCell.row - 1][stepCell.col - 1] = new GridCell({
                isTaken: true
            });
        });

        return out;
    }

    public rotate(): void {
        this.rotationIndex++;

        if (this.rotationIndex > this.rotationSteps.length - 1) {
            this.rotationIndex = 0;
        }
    }

    public toArray(): Array < any > {
        if (
            this.rotationSteps.length === 0 ||
            this.rotationIndex > this.rotationSteps.length - 1
        ) {
            return this.gridBlock.toArray();
        }

        let out = JSON.parse(JSON.stringify(this.gridBlock.toArray()));

        this.rotationSteps[this.rotationIndex].forEach(stepCell => {
            out[stepCell.row - 1][stepCell.col - 1] = new GridCell({
                isTaken: true
            });
        });

        return out;
    }
};