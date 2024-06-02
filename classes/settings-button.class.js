class SettingsButton extends Button {
    previous = 'cupButton';

    constructor() {
        super(source.settingsButton, canvas.width - 98, 32);
        this.open();
    }


    get next() {    // make a common method
        let opened = world.leaderboard.isOpened();
        return (opened) ? 'xButton' : 'cupButton';
    }


    open() {
        setInterval(() => {
            this.setCursor();
            this.openLeaderboard(this, world.cupButton);
        }, 1000 / 60);
    }
}