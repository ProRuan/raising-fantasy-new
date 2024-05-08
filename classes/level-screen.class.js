class LevelScreen extends World {


    constructor(canvas, keyboard) {
        super(canvas, keyboard);


        this.setLevelScreen();
        this.draw();
    }


    setLevelScreen() {
        this.setDisplayed(true);

        // only for testing!!!
        this.avatarImage = new AvatarInfo(SOURCE.avatarImage);
        this.avatarFrame = new AvatarInfo(SOURCE.avatarFrame);
        this.hpBar = new StateBar(SOURCE.hpPoint.path, 120, 600);
        this.energyBar = new StateBar(SOURCE.energyPoint.path, 100, 48);
        this.staminaBar = new StateBar(SOURCE.staminaPoint.path, 100, 16);
        this.itemBg = new AvatarInfo(SOURCE.itemBg);
        this.itemBomb = new AvatarInfo(SOURCE.itemBomb);
        this.itemBorder = new AvatarInfo(SOURCE.itemBorder);
    }


    draw() {    // double code!!!
        this.clearCanvas();

        if (this.isDisplayed()) {


            // only for testing!!!
            this.drawObject(this.avatarImage);
            this.drawObject(this.avatarFrame);

            this.drawObject(this.hpBar.bg);
            this.drawObjectGroup(this.hpBar.points);
            this.drawObject(this.hpBar.border);
            this.drawObject(this.energyBar.bg);
            this.drawObjectGroup(this.energyBar.points);
            this.drawObject(this.energyBar.border);
            this.drawObject(this.staminaBar.bg);
            this.drawObjectGroup(this.staminaBar.points);
            this.drawObject(this.staminaBar.border);
            this.drawObject(this.itemBg);
            this.drawObject(this.itemBomb);
            this.drawObject(this.itemBorder);
        }

        this.redraw();
    }
}