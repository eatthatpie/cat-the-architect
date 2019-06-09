export default {
    state: {
        current: 'game'
    },
    getters: {
        current({ getState }) {
            return getState().current;
        }
    },
    dispatchers: {
        intendTo({ setState }, { scene }) {
            setState({
                current: scene
            });
        }
    }
};