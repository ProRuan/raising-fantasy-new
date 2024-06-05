class CupButton extends Button {
    indent = 6;
    next = 'settingsButton';


    // jsdoc
    constructor() {
        super(source.cupButton, 32, 32);
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
        } else if (world.questButton.isLocked()) {
            return 'coinButton';
        } else {
            return 'questButton';
        }
    }


    // jsdoc
    execute() {
        this.openLeaderboard(this, world.settingsButton);
    }
}