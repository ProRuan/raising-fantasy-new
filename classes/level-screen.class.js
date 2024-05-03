class LevelScreen extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);


        this.setLevelScreen();
        this.draw();
    }


    setLevelScreen() {
        this.setDisplayed(false);
    }


    draw() {    // double code!!!
        this.clearCanvas();

        if (this.isDisplayed()) {
            // only for testing!!!
            this.drawObject(this.background);
            this.drawHeadline();
            this.drawNewGameButton();
            this.drawStoryButton();
            this.drawExtraButton(this.cupButton);
            this.drawExtraButton(this.settingsButton);
            // this.addButtonsToMap();
        }

        this.redraw();
    }
}