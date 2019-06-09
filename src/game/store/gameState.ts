export default {
    state: {
        tick: 0
    },
    getters: {
        tick({ getState }) {
            return getState().tick;
        }
    },
    dispatchers: {
        tick({ getState, setState }) {
            const updatedTickValue = getState().tick += 1;

            setState({
                tick: updatedTickValue
            });
        }
    }
};