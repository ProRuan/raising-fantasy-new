class CupButton extends Button {
    previous = 'settingsButton';
    next = 'settingsButton';


    constructor() {
        super(source.cupButton, 32, 32);
        this.open();
    }


    open() {
        setInterval(() => {
            this.setCursor();
            this.openLeaderboard(this, world.settingsButton);
        }, 1000 / 60);
    }
}