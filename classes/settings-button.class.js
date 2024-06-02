class SettingsButton extends Button {
    indent = 6;
    previous = 'cupButton';


    constructor() {
        super(source.settingsButton, canvas.width - 98, 32);
        this.open();
    }


    // jsdoc
    get next() {
        return this.getNext();
    }


    // jsdoc
    getNext() {
        return (world.leaderboard.isOpened()) ? 'xButton' : 'cupButton';
    }


    open() {    // rename + stoppable interval!!!
        setInterval(() => {
            this.setCursor();
            this.openLeaderboard(this, world.cupButton);
        }, 1000 / 60);
    }
}