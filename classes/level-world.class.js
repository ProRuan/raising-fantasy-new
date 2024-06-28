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


    setPause() {
        let pause = source.pause;
        let x = this.getCenteredCoord('width', pause.width);
        let y = this.getCenteredCoord('height', pause.height);
        this.pause = new DrawableObject(pause, x, y);
    }


    draw() {
        this.clearCanvas();
        this.translateCamera(this.cameraX, 0);
        this.drawLevelObjects();
        this.drawObject(this.hero);
        this.drawLevelSubobjects();
        this.translateCamera(-this.cameraX, 0);
        this.drawAvatarInfo();
        this.applyGameOver();
        this.dimScreen();
        this.pauseWorld();
        this.redraw();
    }


    drawLevelObjects() {
        this.drawLevelComponents(this.sceneryKeys);
        this.drawLevelComponents(this.floraKeys);
        this.drawLevelComponents(this.itemKeys);
        this.drawLevelComponents(this.enemyKeys);
        this.drawLevelComponents(this.victoryKeys);
    }


    drawLevelSubobjects() {
        this.drawSubobject(this.endboss.magic);
        this.drawSpiderWebs();
        this.drawSubobject(this.hero.bomb);
    }


    pauseWorld() {
        if (paused) {
            this.drawObject(this.pause);
        } else {
            this.removeDeadEnemies();
            this.removeSound();
        }
    }


    dimScreen() {
        this.ctx.globalAlpha = getSum(1, -this.alpha);
        this.drawBlackRectangle();
        this.setGlobalAlpha();
    }


    drawBlackRectangle() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.rect(0, 0, 960, 540);
        this.ctx.fill();
    }


    drawSubobject(object) {
        if (object) {
            this.drawObject(object);
        }
    }


    applyGameOver() {
        if (this.hero && this.hero.isEpilog()) {
            this.drawGameOverBg();
            this.drawGameOverText();
            this.transit();
            this.setTransitTime();
        }
    }


    transit() {
        if (isTimeout(this.transitTime, this.time)) {
            this.stop();
            this.start();
        }
    }


    stop() {
        this.pauseMusic('hero');
        this.pauseMusic('endboss');
        pauseDisabled = false;
        pauseGame(true);
        this.stopped = true;
    }


    pauseMusic(key) {
        this[key].music.pause();
    }


    start() {
        setStartWorld();
        world.interacted = true;
    }


    setTransitTime() {
        if (!this.transitTime) {
            this.transitTime = getSum(this.time, 2250);
            pauseDisabled = true;
        }
    }


    drawGameOverBg() {
        this.setText('64px Bungee Spice', 'left', 'white');
        this.setFilter('blur(12px)');
        this.drawRectangle();
        this.setFilter('none');
    }


    drawRectangle() {
        let rectangle = this.getRectangle();
        this.ctx.beginPath();
        this.ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        this.ctx.fill();
    }


    getRectangle() {
        let x = canvas.width / 2 - 217;
        let y = canvas.height / 2 - 36;
        return { x: x, y: y, width: 434, height: 88 };
    }


    drawGameOverText() {
        this.setText('64px Bungee Spice', 'center', 'steelblue');
        this.drawText('Game over', this.canvas.width / 2, 302);
        this.setShadow();
    }


    // to delete!!!
    drawTouchButton(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'steelblue';
        this.ctx.rect(x, y - height, width, height);
        this.ctx.stroke();
    }


    // jsdoc
    drawLevelComponents(keys) {
        keys.forEach((key) => {
            this.drawObjectGroup(this.level[key]);
        });
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


    drawSpiderWebs() {
        let spiders = this.getSpiders();
        spiders.forEach((spider) => {
            this.drawSubobject(spider.web);
        })
    }


    // jsdoc
    getSpiders() {
        return this.enemies.filter(enemy => enemy instanceof Spider);
    }


    // jsdoc
    removeDeadEnemies() {
        this.removeEnemy();
        this.setEnemyRemovable();
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


    // jsdoc
    setEnemyRemovable() {
        let enemy = this.getEnemy('dead', 'removeable');
        if (enemy) {
            enemy.removable = true;
            enemy.stop(true);
            this.setTimeToGo(enemy);
        }
    }


    // jsdoc
    setTimeToGo(enemy) {
        if (!enemy.timeToGo) {
            enemy.timeToGo = getSum(world.time, 2000);
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
        this.victoryPodium.forEach((element) => {
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




    // I. Fix pause for touch ... !!! (auto)
    // II. PauseableInterval: pause inner intervals (bomb, web, magic) ... (auto)
    // III. Fix error of full screen + position of full screen ...


    // Still to fix
    // ------------
    // Class Character too long ... !!!
    // ------------
    // Provide an async function for image and audio paths ...


    // -----------------------------------

    // Clean coding (5 js) ...
    // Remove console.logs ...
    // Jsdoc (3 classes + 5 js + 1 style + 1 html) + out (folder) ... (siehe tasks.txt)

    // -----------------------------------

    // Imprint, privacy policy, cookies, help (guide) ... (0/4)
    // Project checklist ...
}