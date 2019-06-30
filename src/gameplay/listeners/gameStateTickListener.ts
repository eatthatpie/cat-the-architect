import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";

export default new (class implements StoreSubscriberInterface {
    storeData({ get, dispatch }, { state }): void {

    }

    /**
     * Method fires on current block tick down (every one second).
     */
    storeDataChange({ get, dispatch }, { currentBlockIsAbleToGoDown }): void {
        if (!get('currentBlockEntity.gridBlock')) {
            dispatch('currentBlockEntity.reset');
        }

        const gridState = get('groupEntity.grid');
        const currentBlockEntityState = get('currentBlockEntity.state');
        const currentBlockState = currentBlockEntityState.gridBlock;

        const currentBlockIsAbleToGoDown2 = !gridState.isCollidingWith(currentBlockState, {
            col: currentBlockEntityState.col,
            row: currentBlockEntityState.row + 1 
        });

        // + other game state events:
        // - game start (reset all states)
        // - game over (reset all states)
        
        // in other listener:
        // - kotPsot, etc

        if (currentBlockIsAbleToGoDown2) {
            // + animation
            // current block entity position changes to one block down
            dispatch('currentBlockEntity.updatePosition');
        }

        else {
            gridState.absorb(currentBlockState, {
                col: currentBlockEntityState.col,
                row: currentBlockEntityState.row,
            });

            dispatch('groupEntity.update', {
                grid: gridState
            });
    
            dispatch('currentBlockEntity.reset');

            if (
                gridState.isCollidingWith(
                    get('currentBlockEntity.gridBlock'),
                    {
                        col: currentBlockEntityState.col,
                        row: currentBlockEntityState.row
                    }
                )
            ) {
                dispatch('groupEntity.reset');
                dispatch('currentBlockEntity.reset');
            }

            // if (get('groupEntity.isDestroyable')) {
            //     // + animation

            //     // update state + change view
            //     dispatch('gameState.addScore');

            //     // update state + change view
            //     dispatch('groupEntity.updateGroup');
                
            //     // update state currentBlockEntity + change view
            //     // update state groupEntity + change view
            //     dispatch('currentBlockEntity.reset', {
            //         block: get('gameState.nextBlock')
            //     });

            //     // update state + change view
            //     dispatch('gameState.generateNextBlock')
            // }
            // else if (get('groupEntity.isKilling')) {
            //     // + animation game over

            //     // + dialog with score info

            //     // + reset all states
            //     dispatch('scene.intendToMenuScene');
            // }
            // else {
            //     // update state + change view
            //     dispatch('groupEntity.updateGroup');

            //     // update state + change view
            //     dispatch('currentBlockEntity.reset', {
            //         block: get('gameState.nextBlock')
            //     });

            //     // update state + change view
            //     dispatch('gameState.generateNextBlock')
            // }
//         }
        }
    }
})();