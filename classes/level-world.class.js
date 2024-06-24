class LevelWorld extends World {
    heroX = 384;
    trophyY = 436;
    victorySpeed = 2;
    size = LEVEL_SIZE;


    // Please take care of x, y and UNIT!!!
    // Fix loading sequence!!!


    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setLevelWorld();
        this.draw();
    }


    // jsdoc
    get endboss() {
        return this.level.bosses[0];
    }


    // jsdoc
    get star() {
        return this.level.stars[0];
    }


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

        this.translateCamera(this.cameraX, 0);


        this.drawLevel();

        if (this.hero && this.hero.isEpilog()) {
            this.setShadow('white', 16);
            this.ctx.font = '64px Bungee Spice';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = 'steelblue';

            if (isGreater(source.bossBattleTriggerX, this.hero.x)) {
                this.drawText('Game Over', (this.size - 1) * this.canvas.width + this.canvas.width / 2, 270 + 32);
            } else if (isGreater(this.heroX, this.hero.x)) {
                this.drawText('Game Over', this.hero.x + 96, 270 + 32);
            } else {
                this.drawText('Game Over', 480, 270 + 32);
            }
            this.setShadow();

            if (!this.transitSet) {
                this.transitSet = true;
                setTimeout(() => {
                    this.hero.music.pause();
                    this.endboss.music.pause();
                    pauseDisabled = false;
                    pauseGame(true);
                    this.stopped = true;

                    setStartWorld();
                    world.interacted = true;
                }, 2250);
                pauseDisabled = true;
            }
        }

        this.drawObject(this.hero);
        if (this.endboss.magic) {
            this.drawObject(this.endboss.magic);
        }
        if (this.hero.bomb) {
            this.drawObject(this.hero.bomb);
        }
        this.drawSpiderWebs();
        this.translateCamera(-this.cameraX, 0);

        this.drawAvatarInfo();
        this.removeDeadEnemies();


        this.ctx.globalAlpha = 1 - this.alpha;
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.rect(0, 0, 960, 540);
        this.ctx.fill();
        this.setGlobalAlpha();


        if (paused) {
            this.drawObject(this.pause);
        }

        this.redraw();
    }


    // to delete!!!
    drawTouchButton(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'steelblue';
        this.ctx.rect(x, y - height, width, height);
        this.ctx.stroke();
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




    // tasks (class Source)
    // -----
    // check Knight, MoveableObject, Shaman, Source ...
    // startWorld: newWorldMusic + newGameSound ... (0/2)

    // getter for star and endboss ...
    // victory podium as section 8 array ...
    // musicVolume + soundVolume ...
    // sound loop ...


    // tasks (shaman)
    // -----
    // SET EMPTY IMAGE for all flip books!!! ...
    // magic sound (cast + hit) ...
    // get body() --> double and triple code ...
    // think about getter body() --> get () --> return getBody() ...
    // enemy attack / hurt delay ...
    // level word pause ...


    // check spider web (stop interval) ...
    // check index.html ...
    // fix endboss cast ...
    // fix endboss music by fast star pick up ...


    // game over screen (this + level world) ...
    // pause ...
    // pause music ...
    // fix enemy gravity or dino walk ...
    // fix updateGroundLevel (error after collecting star) ...

    // clear enemies (0/3) ...
    // remove console log ...

    // set prevent default ...
    // 'press any key': buttons should not be reachable ...
    // sound and music: only if (defined) ...

    // think about class folder structure ...


    // fullscreen with fourth class ...
    // load game (await) ...
    // 0 min or 0 sec ...
    // heroX (due to touch event) ...
    // make wav files smaller ...

    // option: replace timeout with next (+ pause update!) ...



    // use find() - some() - filter() ... !!!
    // e.g.: world.enemies.filter( (e) => e instance of spider);




    // I. Replace timeout with (pauseable timeout or nextTime)? ... (timeout (7/8) + pauseTimeout(7/8))
    // Fix LevelWorld timeout/next/last + pauseOffset ...
    // Fix pause for touch ... !!!

    // II. Pause sounds (array) ...
    // III. Dino gravity (GrassL/R or some()) ...
    // IV. Prevent default + console.logs ...


    // dino gravity
    // ------------
    // applyGravity() {
    //     let grassL = world.grass.find(g => isIncluded(g.xLeft, this.body.xRight, g.xRight));
    //     let grassC = world.grass.find(g => isIncluded(g.xLeft, this.body.xCenter, g.xRight));
    //     let grassR = world.grass.find(g => isIncluded(g.xLeft, this.body.xLeft, g.xRight));
    //     if (!grassL && !grassC && !grassR) {
    //         this.applyFallSpeed();
    //     }
    // }
}