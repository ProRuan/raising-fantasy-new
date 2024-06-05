class SettingsButton extends Button {
    indent = 6;
    previous = 'cupButton';


    // jsdoc
    constructor() {
        super(source.settingsButton, canvas.width - 98, 32);
    }


    // jsdoc
    get next() {
        return this.getNext();
    }


    // jsdoc
    getNext() {
        if (world.leaderboard.isOpened()) {
            return 'xButton';
        } else if (world.questRoll.isOpened()) {
            return 'coinButton';
        } else {
            return 'newGameButton';
        }
    }


    // jsdoc
    execute() {
        this.openLeaderboard(this, world.cupButton);
    }
}