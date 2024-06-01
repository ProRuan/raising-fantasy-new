class CupButton extends Button {
    nextButton = 'settingsButton';


    constructor() {
        super(source.cupButton, 32, 32);
        this.open();
    }


    open() {
        setInterval(() => {
            this.openLeaderboard(this, world.settingsButton);
        }, 1000 / 60);
    }
}