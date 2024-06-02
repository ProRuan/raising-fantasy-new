class CupButton extends Button {
    indent = 6;
    next = 'settingsButton';


    // jsdoc
    constructor() {
        super(source.cupButton, 32, 32);
        this.open();
    }


    // jsdoc
    get previous() {
        return this.getPrevious();
    }


    // jsdoc
    getPrevious() {
        if (world.settingsButton.isLocked()) {
            return 'highSoundButton';
        } else if (world.cupButton.isLocked()) {
            return 'xButton';
        } else {
            return 'settingsButton';
        }
    }


    open() {    // rename + stoppable interval!!!
        setInterval(() => {
            this.setCursor();
            this.openLeaderboard(this, world.settingsButton);
        }, 1000 / 60);
    }
}