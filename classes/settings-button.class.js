class SettingsButton extends Button {


    constructor() {
        super(source.settingsButton, canvas.width - 98, 32);
        this.open();
    }


    open() {
        setInterval(() => {
            this.openLeaderboard(this, world.cupButton);
        }, 1000 / 60);
    }
}