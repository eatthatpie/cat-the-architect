import GameLauncher from '@/game/GameLauncher';

(function () {
    GameLauncher.launch({
        DOMElementSelector: '#game',
        width: 360,
        height: 640
    });
})();