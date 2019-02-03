import GameLauncher from '@/game/GameLauncher';

(function () {
    GameLauncher.launch({
        DOMElementSelector: '#game',
        width: 500,
        height: 600
    });
})();