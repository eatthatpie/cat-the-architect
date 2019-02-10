import GameLauncher from '@/game/GameLauncher';

// AppContext.extendConfig({
//     input: {
//         keymap: {
//             'arrow.down': function() {...},
//             'arrow.up': function() {...}
//         }
//     }
// });

// AppContext.getConfig('input.keymap')

(function () {
    GameLauncher.launch({
        DOMElementSelector: '#game',
        width: 800,
        height: 600
    });
})();