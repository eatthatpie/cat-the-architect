import GridBlock from "../grid/GridBlock";
import RotatableGridBlockDecorator from "../grid/RotatableGridBlockDecorator";
import RotatableGridBlockGenerator from '../generator/RotatableGridBlockGenerator';

export default {
    state: {
        gridBlock: null,
        col: 1,
        row: 1,
        positionY: 0,
        nextBlock: null
    },
    getters: {
        col({ getState }) {
            return getState().col;
        },
        nextBlock({ getState }) {
            return getState().nextBlock;
        },
        gridBlock({ getState }) {
            return getState().gridBlock;
        },
        row({ getState }) {
            return getState().row;
        },
        state({ getState }) {
            return getState();
        }
    },
    dispatchers: {
        moveHorizontal({ getState, setState }, { direction }) {
            const col = getState().col += direction;

            setState({ col });
        },
        reset({ getState, setState }) {
            const state = getState();

            let gridBlock = null;

            if (!!state.nextBlock) {
                gridBlock = state.nextBlock;
            }
            else {
                const rotatableGridBlockContract1 = (new RotatableGridBlockGenerator()).generate();
                gridBlock = new RotatableGridBlockDecorator(
                    new GridBlock({ rows: rotatableGridBlockContract1.rows, cols: rotatableGridBlockContract1.cols })
                );

                rotatableGridBlockContract1.rotationSteps.forEach(step => {
                    gridBlock.addRotationStep(step);
                });
            }

            const rotatableGridBlockContract2 = (new RotatableGridBlockGenerator()).generate();
            const nextGridBlock = new RotatableGridBlockDecorator(
                new GridBlock({ rows: rotatableGridBlockContract2.rows, cols: rotatableGridBlockContract2.cols })
            );

            rotatableGridBlockContract2.rotationSteps.forEach(step => {
                nextGridBlock.addRotationStep(step);
            });
            
            setState({
                gridBlock,
                row: 1,
                col: gridBlock.getWidth() <= 2 ? 5 : 4,
                nextBlock: nextGridBlock
            });
        },
        rotate({ getState, setState }) {
            const gridBlock = getState().gridBlock;

            gridBlock.rotate();

            setState({ gridBlock });
        },
        updatePosition({ getState, setState }) {
            const updatedPositionY = getState().positionY + 20;
            const row = getState().row;

            setState({
                positionY: updatedPositionY,
                row: row + 1
            })
        }
    }
};