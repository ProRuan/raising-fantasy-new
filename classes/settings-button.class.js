class SettingsButton extends Button {
    previous = 'cupButton';
    next = 'cupButton';


    constructor() {
        super(source.settingsButton, canvas.width - 98, 32);
        this.open();
    }


    open() {
        setInterval(() => {
            this.setCursor();
            this.openLeaderboard(this, world.cupButton);
        }, 1000 / 60);
    }
}