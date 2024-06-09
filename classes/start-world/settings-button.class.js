class SettingsButton extends Button {
    indent = 6;
    previous = 'cupButton';
    shadowColor = 'yellow';
    shadowBlur = 16;


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
        this.open(this, world.leaderboard, world.cupButton);
    }
}