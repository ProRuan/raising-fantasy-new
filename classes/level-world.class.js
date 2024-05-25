class LevelWorld extends World {
    // to move!!!
    heroX = 212;

    // Create an upper class LevelWorldKit!!!


    constructor(canvas, keyboard) {
        super(canvas, keyboard);


        this.setLevelWorld();
        this.runTime();
        this.draw();
    }


    setLevelWorld() {


        // only for testing!!!
        this.cameraX = 0;
        this.blade = new Blade(7.5, 4.5);


        this.hero = new Knight(this.heroX, 38);
        // fix ent y (+1)!!!


        // ready!!!
        this.setLevel();
        this.setAvatarInfo();


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
        this.hpBar = new StateBar(source.hpPoint, 120, 600);
        this.energyBar = new StateBar(source.energyPoint, 100, 48);
        this.staminaBar = new StateBar(source.staminaPoint, 100, 16);
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

    // Fix loading sequence!!!


    draw() {    // double code!!!
        this.clearCanvas();    // think about camera objects!!!
        if (this.hero.img.src.includes('death')) {
            if (isUndefined(this.gameOver)) {
                this.drawObject(this.hero);
                if (this.hero.img.src.includes('death10') && isUndefined(this.gameOverSet)) {
                    this.gameOverSet = true;
                    setTimeout(() => {
                        this.gameOver = true;
                    }, 100);
                }
            }
            if (this.gameOver) {
                this.ctx.font = '64px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillStyle = 'white';
                this.drawText('Game Over', 480, 270);

                // this.ctx.font = '24px Arial';
                // this.ctx.textAlign = 'center';
                // this.ctx.fillStyle = 'white';
                // this.drawText('Go back', 480, 400);
            }
        } else {
            this.translateCamera(this.cameraX, 0);


            // ready!!!
            this.drawLevel();
            this.drawObject(this.hero);
            this.drawObject(this.blade);
            this.drawSpiderWebs();
            this.translateCamera(-this.cameraX, 0);

            this.drawAvatarInfo();
            this.removeDeadEnemies();
        }
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
        this.drawThrowableItem();
    }


    drawStateBar(key) {
        this.drawObject(this[key].bg);
        this.drawObjectGroup(this[key].points);
        this.drawObject(this[key].border);
    }


    // jsdoc
    drawThrowableItem() {
        if (this.hero.bombUnlocked) {
            this.drawObject(this.itemBg);
            if (isMatch(this.hero.energyPoints.length, this.energyBar.max)) {
                this.drawObject(this.itemBomb);
            }
            this.drawObject(this.itemBorder);
        }
    }


    drawSpiderWebs() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Spider) {
                if (!isUndefined(enemy.web)) {
                    this.drawObject(enemy.web);
                }
            }
        })
    }


    removeDeadEnemies() {
        let enemy = this.enemies.find(e => e.dead && !e.removable);
        if (enemy) {
            enemy.removable = true;
            setTimeout(() => {
                let id = world.enemies.indexOf(enemy);
                world.enemies.splice(id, 1);
            }, 2000);
        }
    }
}