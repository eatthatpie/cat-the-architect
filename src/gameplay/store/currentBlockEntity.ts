export default {
    state: {
        positionY: 0
    },
    getters: {
        state({ getState }) {
            return getState();
        }
    },
    dispatchers: {
        updatePosition({ getState, setState }) {
            const updatedPositionY = getState().positionY + 20;

            setState({
                positionY: updatedPositionY
            })
        }
    }
};