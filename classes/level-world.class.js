class LevelWorld extends World {
    heroX = 212;
    trophyY = 436;
    victorySpeed = 2;


    // Please take care of x, y and UNIT!!!
    // Fix loading sequence!!!


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setLevelWorld();
        this.draw();
    }


    // jsdoc
    get time() {
        return new Date().getTime();
    }


    // jsdoc
    get star() {
        return this.level.stars[0];
    }


    // jsdoc
    setLevelWorld() {
        this.setLevel();
        this.setAvatar();
        this.setHero();
        this.connectWorld();
        this.setPause();
    }


    // jsdoc
    setLevel() {
        this.level = new Level1();
        this.setLevelObjects();
    }


    // jsdoc
    setLevelObjects() {
        for (const [key, value] of Object.entries(this.level)) {
            this[key] = value;
        }
    }


    // jsdoc
    setAvatar() {
        this.setAvatarProfile();
        this.setAvatarStateBar();
        this.setAvatarItem();
    }


    // jsdoc
    setAvatarProfile() {
        this.avatarImage = new AvatarInfo(source.avatarImage);
        this.avatarFrame = new AvatarInfo(source.avatarFrame);
    }


    // jsdoc
    setAvatarStateBar() {
        this.hpBar = new StateBar(source.hpPoint, 120, 600);
        this.energyBar = new StateBar(source.energyPoint, 100, 48);
        this.staminaBar = new StateBar(source.staminaPoint, 100, 16);
    }


    // jsdoc
    setAvatarItem() {
        this.itemBg = new AvatarInfo(source.itemBg);
        this.itemBomb = new AvatarInfo(source.itemBomb);
        this.itemBorder = new AvatarInfo(source.itemBorder);
    }


    // jsdoc
    setHero() {
        this.hero = new Knight(this.heroX, 38);
    }


    // jsdoc
    connectWorld() {
        this.hero.world = this;
    }


    setPause() {    // set source in class Source!!!
        let path = './img/inner_interface/pause.png';
        let width = 157;
        let height = 63;
        let source = { path: path, width: width, height: height };
        let x = this.canvas.width / 2 - width / 2;
        let y = this.canvas.height / 2 - height / 2;
        this.pause = new DrawableObject(source, x, y);
    }


    draw() {
        this.clearCanvas();
        this.setGlobalAlpha();


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
            }
        } else {
            this.translateCamera(this.cameraX, 0);


            this.drawLevel();
            this.drawObject(this.hero);
            if (this.endboss[0].magic) {
                this.drawObject(this.endboss[0].magic);
            }
            if (this.hero.bomb) {
                this.drawObject(this.hero.bomb);
            }
            this.drawSpiderWebs();
            this.translateCamera(-this.cameraX, 0);

            this.drawAvatarInfo();
            this.removeDeadEnemies();

            if (paused) {
                this.drawObject(this.pause);
            }
        }
        this.redraw();
    }


    drawLevel() {
        // this.drawObjectGroup(this.level.background);
        // this.drawObjectGroup(this.level.clouds);
        // this.drawObjectGroup(this.level.birds);
        // this.drawObjectGroup(this.level.trees);
        for (const [key] of Object.entries(this.level)) {
            this.drawObjectGroup(this.level[key]);

            this.isMatchGroup(key);
        }
    }


    isMatchGroup(key) {
        let objects = ['background', 'clouds', 'birds', 'trees'];
        objects.forEach((element) => {
            if (isMatch(element, key)) {
                // console.log(true);
                return true;
            }
        })
        // console.log(false);
        return false;
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
            enemy.stop(true);
            console.log(enemy, enemy.interval.stopped, enemy.interval2.stopped);
            setTimeout(() => {
                let id = world.enemies.indexOf(enemy);
                world.enemies.splice(id, 1);
            }, 2000);
        }
    }


    // jsdoc
    raiseVictoryPodium() {
        if (this.isStarHidden()) {
            this.moveStar();
            this.moveVictoryPodium();
        }
    }


    // jsdoc
    isStarHidden() {
        return this.star && isGreater(this.trophyY, this.star.y)
    }


    // jsdoc
    moveStar() {
        this.star.y -= this.victorySpeed;
    }


    // jsdoc
    moveVictoryPodium() {
        this.vicortyPodium.forEach((element) => {
            element.y -= this.victorySpeed;
        });
    }




    // only for testing!!! (pauseable interval)

    // stopCoins() {
    //     this.coins.forEach((coin) => {
    //         coin.id.stopInterval();
    //     });
    // }


    // playCoins() {
    //     this.coins.forEach((coin) => {
    //         coin.id.reactivate();
    //     });
    // }




    // missing task!!!
    // ----------------
    // work for time, if game is paused!
    // pause key + pause text ...
    // knight moveId and animateId ...
    // press any key message ...
    // stop ambient sound ...
    // stop / remove web, magic, bomb ...

    // remove drawable object (enemy, coins and so on) ...
    // remove web, magic, bomb ...
    // favicon
    // prevent default ...

    // class StartWorldKit?
    // class LevelWorldKit?
}