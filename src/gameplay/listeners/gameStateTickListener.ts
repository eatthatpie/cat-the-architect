import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";

export default new (class implements StoreSubscriberInterface {
    storeData({ get, dispatch }, { state }): void {

    }

    /**
     * Method fires on current block tick down (every one second).
     */
    storeDataChange({ get, dispatch }, { currentBlockIsAbleToGoDown }): void {
        const out = [];

        get('groupEntity.grid').toArray().forEach(row => {
            out.push(row.map(cell => cell.getIsTaken() ? '#' : '.').join(' '));
        });

       // console.clear();
        console.log(out.join('\n'));

        if (!get('currentBlockEntity.gridBlock')) {
            dispatch('currentBlockEntity.reset');
        }

        const out2 = [];

        get('currentBlockEntity.gridBlock').toArray().forEach(row => {
            out2.push(row.map(cell => cell.getIsTaken && cell.getIsTaken() ? '#' : '.').join(' '));
        });

        console.log('\n\n');
        console.log(out2.join('\n'));

        const gridState = get('groupEntity.grid');
        const currentBlockEntityState = get('currentBlockEntity.state');
        const currentBlockState = currentBlockEntityState.gridBlock;

        const currentBlockIsAbleToGoDown2 = !gridState.isCollidingWith(currentBlockState, {
            col: currentBlockEntityState.col,
            row: currentBlockEntityState.row + 1 
        })

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
            console.log(gridState);
            console.log(currentBlockState);

            // update state only
            gridState.getGridBlock().absorb(currentBlockState, {
                col: currentBlockEntityState.col,
                row: currentBlockEntityState.row,
            });

            dispatch('groupEntity.update', {
                grid: gridState
            });

            dispatch('currentBlockEntity.reset');

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