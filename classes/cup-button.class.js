class CupButton extends Button {
    indent = 6;
    next = 'settingsButton';


    constructor() {
        super(source.cupButton, 32, 32);
        this.open();
    }


    get previous() {    // make a common method
        let opened = world.leaderboard.isOpened();
        return (opened) ? 'xButton' : 'settingsButton';
    }


    open() {
        setInterval(() => {
            this.setCursor();
            this.openLeaderboard(this, world.settingsButton);
        }, 1000 / 60);
    }
}