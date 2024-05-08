class LevelWorld extends World {


    // Create an upper class LevelWorldKit!!!


    constructor(canvas, keyboard) {
        super(canvas, keyboard);


        this.setLevelWorld();
        this.draw();
    }


    setLevelWorld() {


        // only for testing!!!



        // ready!!!
        this.setLevel();
        this.setLevelObjects();    // move to class Knight!?!
        this.setAvatarInfo();
    }


    setLevel() {
        this.level = new Level1();
    }


    setLevelObjects() {
        for (const [key, value] of Object.entries(this.level)) {
            this[key] = value;
        }
    }


    setAvatarInfo() {
        this.setInfoAvatar();
        this.setInfoStateBar();
        this.setInfoItem();
    }


    setInfoAvatar() {
        this.avatarImage = new AvatarInfo(SOURCE.avatarImage);
        this.avatarFrame = new AvatarInfo(SOURCE.avatarFrame);
    }


    setInfoStateBar() {
        this.hpBar = new StateBar(SOURCE.hpPoint.path, 120, 600);
        this.energyBar = new StateBar(SOURCE.energyPoint.path, 100, 48);
        this.staminaBar = new StateBar(SOURCE.staminaPoint.path, 100, 16);
    }


    setInfoItem() {
        this.itemBg = new AvatarInfo(SOURCE.itemBg);
        this.itemBomb = new AvatarInfo(SOURCE.itemBomb);
        this.itemBorder = new AvatarInfo(SOURCE.itemBorder);
    }


    // Please take care of x, y and UNIT!!!


    draw() {    // double code!!!
        this.clearCanvas();


        // only for testing!!!
        


        // ready!!!
        this.drawLevel();
        this.drawAvatarInfo();


        this.redraw();
    }


    drawLevel() {
        for (const [key] of Object.entries(this.level)) {
            this.drawObjectGroup(this.level[key]);
        }
    }


    drawAvatarInfo() {
        this.drawObjectGroup([this.avatarImage, this.avatarFrame])
        this.drawStateBar('hpBar');
        this.drawStateBar('energyBar');
        this.drawStateBar('staminaBar');
        this.drawObjectGroup([this.itemBg, this.itemBomb, this.itemBorder]);
    }


    drawStateBar(key) {
        this.drawObject(this[key].bg);
        this.drawObjectGroup(this[key].points);
        this.drawObject(this[key].border);
    }
}