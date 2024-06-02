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
        return (world.leaderboard.isOpened()) ? 'xButton' : 'cupButton';
    }


    // jsdoc
    execute() {
        this.openLeaderboard(this, world.cupButton);
    }
}