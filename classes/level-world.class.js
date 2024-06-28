class LevelWorld extends World {
    heroX = 384;
    finalCameraX = -6720;
    finalCameraSpeed = 4;
    trophyY = 436;
    victorySpeed = 2;
    size = LEVEL_SIZE;


    // jsdoc
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


    // jsdoc
    setPause() {
        let pause = source.pause;
        let x = this.canvas.width / 2 - pause.width / 2;
        let y = this.canvas.height / 2 - pause.height / 2;
        this.pause = new DrawableObject(pause, x, y);
    }


    draw() {
        this.clearCanvas();

        this.translateCamera(this.cameraX, 0);


        this.drawLevel();

        if (this.hero && this.hero.isEpilog()) {
            this.ctx.font = '64px Bungee Spice';
            // let text = this.ctx.measureText('Game over').width;
            // console.log(text);
            this.ctx.filter = 'blur(12px)';
            this.ctx.beginPath();
            this.ctx.fillStyle = 'white';
            this.ctx.rect(this.hero.x - this.heroX + canvas.width / 2 - 193 - 24, canvas.height / 2 - 24 - 12, 386 + 48, 64 + 24);    // variable!!!
            this.ctx.fill();
            this.ctx.filter = 'none';


            this.setShadow('white', 16);
            // this.ctx.font = '64px Bungee Spice';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = 'steelblue';

            if (isGreater(source.bossBattleTriggerX, this.hero.x)) {
                this.drawText('Game over', (this.size - 1) * this.canvas.width + this.canvas.width / 2, 270);
            } else if (isGreater(this.heroX, this.hero.x)) {
                this.drawText('Game over', this.hero.x + 96, 270 + 32);
            } else {
                this.drawText('Game over', 480, 270 + 32);
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


        this.ctx.globalAlpha = 1 - this.alpha;
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.rect(0, 0, 960, 540);
        this.ctx.fill();
        this.setGlobalAlpha();

        this.removeSound();

        if (paused) {
            this.drawObject(this.pause);
        } else {
            this.removeDeadEnemies();
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


    // jsdoc
    drawAvatarInfo() {
        this.drawObjectGroup([this.avatarImage, this.avatarFrame])
        this.drawStateBar('hpBar');
        this.drawStateBar('energyBar');
        this.drawStateBar('staminaBar');
        this.drawThrowableItem();
    }


    // jsdoc
    drawStateBar(key) {
        this.drawObject(this[key].bg);
        this.drawObjectGroup(this[key].points);
        this.drawObject(this[key].border);
    }


    // jsdoc
    drawThrowableItem() {
        if (this.hero.bombUnlocked) {
            this.drawObject(this.itemBg);
            this.drawItemIfReady();
            this.drawObject(this.itemBorder);
        }
    }


    // jsdoc
    drawItemIfReady() {
        let points = this.hero.energyPoints.length;
        let max = this.energyBar.max;
        if (isMatch(points, max)) {
            this.drawObject(this.itemBomb);
        }
    }


    // jsdoc
    drawSpiderWebs() {
        let spiders = this.getSpiders();
        spiders.forEach((spider) => {
            if (spider.web) {
                this.drawObject(spider.web);
            }
        })
    }


    // jsdoc
    getSpiders() {
        return this.enemies.filter(enemy => enemy instanceof Spider);
    }


    // jsdoc
    removeDeadEnemies() {
        this.removeEnemy();
        this.setTimeToGo();
    }


    // jsdoc
    removeEnemy() {
        let enemy = this.getEnemy('timeToGo');
        if (enemy && isGreater(enemy.timeToGo, world.time)) {
            let id = world.enemies.indexOf(enemy);
            world.enemies.splice(id, 1);
        }
    }


    // jsdoc
    getEnemy(keyA, keyB) {
        if (!keyB) {
            return this.enemies.find(enemy => enemy[keyA]);
        } else {
            return this.enemies.find(enemy => enemy[keyA] && !enemy[keyB]);
        }
    }


    setTimeToGo() {
        let enemy = this.getEnemy('dead', 'removeable');
        if (enemy) {
            enemy.removable = true;
            enemy.stop(true);
            if (!enemy.timeToGo) {
                enemy.timeToGo = getSum(world.time, 2000);
            }
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
    // Fix center touch zone ...

    // II. Music / sound loop + add music to currentSounds ...
    // III. Pause remove enemies + pause removeSound or pause world ...
    // IV. Fix game over text for endboss section ...
    // V. PauseableInterval: pause inner intervals (bomb, web, magic) ...

    // VI. StartWorld: Cursor works, but button is still reachable (also for key)!!!


    // Still to fix
    // ------------
    // Class Character too long ... !!!
    // ------------
    // Fix sequence of level objects ...
    // Provide an async function for image and audio paths ...
    // Fix error of full screen ...


    // -----------------------------------

    // Clean coding (1 class + 5 js) ...
    // Remove console.logs ...
    // Jsdoc + out (folder) ... (siehe tasks.txt)

    // -----------------------------------

    // Imprint, privacy policy, cookies, help (guide) ... (0/4)
    // Project checklist ...
}