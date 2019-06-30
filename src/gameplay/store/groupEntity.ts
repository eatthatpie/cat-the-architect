import GridBlock from "../grid/GridBlock";
import AbsorbableGridBlockDecorator from "../grid/AbsorbableGridBlockDecorator";
import CollidableGridBlockDecorator from "../grid/CollidableGridBlockDecorator";

export default {
    state: {
        grid: new CollidableGridBlockDecorator(
            new AbsorbableGridBlockDecorator(
                new GridBlock({ cols: 10, rows: 20 })
            )
        )
    },
    getters: {
        grid({ getState }) {
            return getState().grid;
        },
        isOverfilled({ getState }) {
            
        },
        state({ getState }) {
            return getState();
        }
    },
    dispatchers: {
        reset({ setState }) {
            setState({
                grid: new CollidableGridBlockDecorator(
                    new AbsorbableGridBlockDecorator(
                        new GridBlock({ cols: 10, rows: 20 })
                    )
                )
            });
        },
        update({ setState }, { grid }) {
            setState({
                grid
            });
        }
    }
};