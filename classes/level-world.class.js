class LevelWorld extends World {


    // Create an upper class LevelWorldKit!!!


    constructor(canvas, keyboard) {
        super(canvas, keyboard);


        this.setLevelWorld();
        this.runTime();
        this.draw();
        console.log('LevelWorld: ', this);
    }


    setLevelWorld() {


        // only for testing!!!
        this.hero = new Knight(64, 39);


        // ready!!!
        this.setLevel();
        // this.setAvatarInfo();


        this.connectWorld();
    }


    setLevel() {
        this.level = new Level1();
        this.setLevelObjects();
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
        this.avatarImage = new AvatarInfo(source.avatarImage);
        this.avatarFrame = new AvatarInfo(source.avatarFrame);
    }


    setInfoStateBar() {
        this.hpBar = new StateBar(source.hpPoint.path, 120, 600);
        this.energyBar = new StateBar(source.energyPoint.path, 100, 48);
        this.staminaBar = new StateBar(source.staminaPoint.path, 100, 16);
    }


    setInfoItem() {
        this.itemBg = new AvatarInfo(source.itemBg);
        this.itemBomb = new AvatarInfo(source.itemBomb);
        this.itemBorder = new AvatarInfo(source.itemBorder);
    }


    connectWorld() {
        this.hero.world = this;
    }


    runTime() {
        setInterval(() => {
            this.time = new Date().getTime();
        }, 1000 / 60);
    }


    // Please take care of x, y and UNIT!!!


    draw() {    // double code!!!
        this.clearCanvas();
        // this.translateCamera(284, 0);

        // only for testing!!!


        // ready!!!
        this.drawLevel();
        // this.drawAvatarInfo();
        this.drawObject(this.hero);

        // this.translateCamera(-284, 0);
        this.redraw();
    }


    translateCamera(x, y) {
        this.ctx.translate(x, y);
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