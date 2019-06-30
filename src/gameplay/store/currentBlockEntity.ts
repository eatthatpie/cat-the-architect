import GridBlock from "../grid/GridBlock";
import RotatableGridBlockDecorator from "../grid/RotatableGridBlockDecorator";
import RotatableGridBlockGenerator from '../generator/RotatableGridBlockGenerator';

export default {
    state: {
        gridBlock: null,
        col: 1,
        row: 1,
        positionY: 0
    },
    getters: {
        col({ getState }) {
            return getState().col;
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
        reset({ setState }) {
            const rotatableGridBlockContract = (new RotatableGridBlockGenerator()).generate();

            const gridBlock = new RotatableGridBlockDecorator(
                new GridBlock({ rows: rotatableGridBlockContract.rows, cols: rotatableGridBlockContract.cols })
            );

            rotatableGridBlockContract.rotationSteps.forEach(step => {
                gridBlock.addRotationStep(step);
            });
            
            setState({
                gridBlock,
                row: 1,
                col: gridBlock.getWidth() <= 2 ? 5 : 4
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