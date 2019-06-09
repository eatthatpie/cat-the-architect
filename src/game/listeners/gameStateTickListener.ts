export default class {
    /**
     * Method fires on current block tick down (every one second).
     */
    storeStateUpdate({ get, dispatch }, { state }) {
        const { currentBlockIsAbleToGoDown } = state;

        // + other game state events:
        // - game start (reset all states)
        // - game over (reset all states)
        
        // in other listener:
        // - kotPsot, etc

        if (currentBlockIsAbleToGoDown) {
            // + animation
            // current block entity position changes to one block down
            dispatch('currentBlockEntity.updatePosition');
        }
        else {
            // update state only
            dispatch('groupEntity.addCurrentBlock')

            if (get('groupEntity.isDestroyable')) {
                // + animation

                // update state + change view
                dispatch('gameState.addScore');

                // update state + change view
                dispatch('groupEntity.updateGroup');
                
                // update state currentBlockEntity + change view
                // update state groupEntity + change view
                dispatch('currentBlockEntity.reset', {
                    block: get('gameState.nextBlock')
                });

                // update state + change view
                dispatch('gameState.generateNextBlock')
            }
            else if (get('groupEntity.isKilling')) {
                // + animation game over

                // + dialog with score info

                // + reset all states
                dispatch('scene.intendToMenuScene');
            }
            else {
                // update state + change view
                dispatch('groupEntity.updateGroup');

                // update state + change view
                dispatch('currentBlockEntity.reset', {
                    block: get('gameState.nextBlock')
                });

                // update state + change view
                dispatch('gameState.generateNextBlock')
            }
        }
    }
};