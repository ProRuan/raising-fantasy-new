/**
 * Represents a level world.
 * @extends World
 */
class LevelWorld extends World {
    heroX = 384;
    finalCameraX = -6720;
    finalCameraSpeed = 4;
    trophyY = 436;
    victorySpeed = 2;
    size = LEVEL_SIZE;


    /**
     * Creates a level world.
     * @param {element} canvas - The canvas to use.
     * @param {Keyboard} keyboard - The keyboard to apply.
     */
    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setLevelWorld();
        this.draw();
    }


    /**
     * Provides the endboss of the level.
     */
    get endboss() {
        return this.level.bosses[0];
    }


    /**
     * Provides the star of the level.
     */
    get star() {
        return this.level.stars[0];
    }


    /**
     * Sets the level world.
     */
    setLevelWorld() {
        this.setLevel();
        this.setAvatar();
        this.setHero();
        this.connectWorld();
        this.setPause();
    }


    /**
     * Sets the level.
     */
    setLevel() {
        this.level = new Level1();
        this.setLevelObjects();
    }


    /**
     * Sets the objects of the level.
     */
    setLevelObjects() {
        for (const [key, value] of Object.entries(this.level)) {
            this[key] = value;
        }
    }


    /**
     * Sets the avatar.
     */
    setAvatar() {
        this.setAvatarProfile();
        this.setAvatarStateBar();
        this.setAvatarItem();
    }


    /**
     * Sets the profile of the avatar.
     */
    setAvatarProfile() {
        this.avatarImage = new AvatarInfo(source.avatarImage);
        this.avatarFrame = new AvatarInfo(source.avatarFrame);
    }


    /**
     * Sets the state bar of the avatar.
     */
    setAvatarStateBar() {
        this.hpBar = new StateBar(source.hpPoint, 120, 600);
        this.energyBar = new StateBar(source.energyPoint, 100, 48);
        this.staminaBar = new StateBar(source.staminaPoint, 100, 16);
    }


    /**
     * Sets the item of the avatar.
     */
    setAvatarItem() {
        this.itemBg = new AvatarInfo(source.itemBg);
        this.itemBomb = new AvatarInfo(source.itemBomb);
        this.itemBorder = new AvatarInfo(source.itemBorder);
    }


    /**
     * Sets the hero.
     */
    setHero() {
        this.hero = new Knight(this.heroX, 38);
    }


    /**
     * Connects the world and the hero.
     */
    connectWorld() {
        this.hero.world = this;
    }


    /**
     * Sets the pause.
     */
    setPause() {
        let pause = source.pause;
        let x = this.getCenteredCoord('width', pause.width);
        let y = this.getCenteredCoord('height', pause.height);
        this.pause = new DrawableObject(pause, x, y);
    }


    /**
     * Draws the level world.
     */
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


    /**
     * Draws the objects of the level world.
     */
    drawLevelObjects() {
        this.drawLevelComponents(this.sceneryKeys);
        this.drawLevelComponents(this.floraKeys);
        this.drawLevelComponents(this.itemKeys);
        this.drawLevelComponents(this.enemyKeys);
        this.drawLevelComponents(this.victoryKeys);
    }


    /**
     * Draws the subobjects of the level world.
     */
    drawLevelSubobjects() {
        this.drawSubobject(this.endboss.magic);
        this.drawSpiderWebs();
        this.drawSubobject(this.hero.bomb);
    }


    /**
     * Pauses the level world.
     */
    pauseWorld() {
        if (paused) {
            this.setExitButton('remove');
            this.drawObject(this.pause);

        } else {
            this.setExitButton('add');
            this.removeDeadEnemies();
            this.removeSound();
        }
    }


    /**
     * Sets the exit button of the full screen mode.
     * @param {string} method - The method to apply.
     */
    setExitButton(method) {
        let header = document.getElementById('header');
        let classValue = header.classList.value;
        if (classValue.includes('display-none')) {
            setClass('exit-full-screen-btn', method, 'hide');
        }
    }


    /**
     * Dims the screen.
     */
    dimScreen() {
        this.ctx.globalAlpha = getSum(1, -this.alpha);
        this.drawBlackRectangle();
        this.setGlobalAlpha();
    }


    /**
     * Draws a black rectangle.
     */
    drawBlackRectangle() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.rect(0, 0, 960, 540);
        this.ctx.fill();
    }


    /**
     * Draws a subobject.
     * @param {object} object - The subobject to draw.
     */
    drawSubobject(object) {
        if (object) {
            this.drawObject(object);
        }
    }


    /**
     * Applies the game over.
     */
    applyGameOver() {
        if (this.hero && this.hero.isEpilog()) {
            this.drawGameOverBg();
            this.drawGameOverText();
            this.transit();
            this.setTransitTime();
        }
    }


    /**
     * Applies the transit.
     */
    transit() {
        if (isTimeout(this.transitTime, this.time)) {
            this.stop();
            this.start();
        }
    }


    /**
     * Stops the level world.
     */
    stop() {
        this.pauseMusic('hero');
        this.pauseMusic('endboss');
        pauseDisabled = false;
        pauseGame(true);
        this.stopped = true;
    }


    /**
     * Pauses the music.
     * @param {string} key - The object key.
     */
    pauseMusic(key) {
        this[key].music.pause();
    }


    /**
     * Starts the start world.
     */
    start() {
        setStartWorld();
        world.interacted = true;
    }


    /**
     * Sets the time of transit.
     */
    setTransitTime() {
        if (!this.transitTime) {
            this.transitTime = getSum(this.time, 2250);
            pauseDisabled = true;
        }
    }


    /**
     * Draws the background of the game over.
     */
    drawGameOverBg() {
        this.setText('64px Bungee Spice', 'left', 'white');
        this.setFilter('blur(12px)');
        this.drawRectangle();
        this.setFilter('none');
    }


    // Draws a rectangle.
    drawRectangle() {
        let rectangle = this.getRectangle();
        this.ctx.beginPath();
        this.ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        this.ctx.fill();
    }


    /**
     * Provides a rectangle.
     * @returns {object} - The values of the rectangle.
     */
    getRectangle() {
        let x = canvas.width / 2 - 217;
        let y = canvas.height / 2 - 36;
        return { x: x, y: y, width: 434, height: 88 };
    }


    /**
     * Draws the game over text.
     */
    drawGameOverText() {
        this.setText('64px Bungee Spice', 'center', 'steelblue');
        this.drawText('Game over', this.canvas.width / 2, 302);
        this.setShadow();
    }


    /**
     * Draws the level components.
     * @param {array} keys - The keys of the level components.
     */
    drawLevelComponents(keys) {
        keys.forEach((key) => {
            this.drawObjectGroup(this.level[key]);
        });
    }


    /**
     * Draws the avatar info.
     */
    drawAvatarInfo() {
        this.drawObjectGroup([this.avatarImage, this.avatarFrame]);
        this.drawStateBar('hpBar');
        this.drawStateBar('energyBar');
        this.drawStateBar('staminaBar');
        this.drawThrowableItem();
    }


    /**
     * Draws a state bar.
     * @param {string} key - The key of the state bar.
     */
    drawStateBar(key) {
        this.drawObject(this[key].bg);
        this.drawObjectGroup(this[key].points);
        this.drawObject(this[key].border);
    }


    /**
     * Draws a throwable item.
     */
    drawThrowableItem() {
        if (this.hero.bombUnlocked) {
            this.drawObject(this.itemBg);
            this.drawItemIfReady();
            this.drawObject(this.itemBorder);
        }
    }


    /**
     * Draws the item on condition.
     */
    drawItemIfReady() {
        let points = this.hero.energyPoints.length;
        let max = this.energyBar.max;
        if (isMatch(points, max)) {
            this.drawObject(this.itemBomb);
        }
    }


    /**
     * Draws a spider web.
     */
    drawSpiderWebs() {
        let spiders = this.getSpiders();
        spiders.forEach((spider) => {
            this.drawSubobject(spider.web);
        })
    }


    /**
     * Provides the spiders.
     * @returns {array} - The spiders.
     */
    getSpiders() {
        return this.enemies.filter(enemy => enemy instanceof Spider);
    }


    /**
     * Removes dead enemies.
     */
    removeDeadEnemies() {
        this.removeEnemy();
        this.setEnemyRemovable();
    }


    /**
     * Removes an enemy.
     */
    removeEnemy() {
        let enemy = this.getEnemy('timeToGo');
        if (enemy && isGreater(enemy.timeToGo, world.time)) {
            let id = world.enemies.indexOf(enemy);
            world.enemies.splice(id, 1);
        }
    }


    /**
     * Provides an enemy.
     * @param {string} keyA - The key of the value a.
     * @param {string} keyB - The key of the value b.
     * @returns {Enemy} - The enemy.
     */
    getEnemy(keyA, keyB) {
        if (!keyB) {
            return this.enemies.find(enemy => enemy[keyA]);
        } else {
            return this.enemies.find(enemy => enemy[keyA] && !enemy[keyB]);
        }
    }


    /**
     * Sets an enemy removeable.
     */
    setEnemyRemovable() {
        let enemy = this.getEnemy('dead', 'removeable');
        if (enemy) {
            enemy.removable = true;
            enemy.stop(true);
            this.setTimeToGo(enemy);
        }
    }


    /**
     * Sets the time to go.
     * @param {Enemy} enemy - The enemy to set.
     */
    setTimeToGo(enemy) {
        if (!enemy.timeToGo) {
            enemy.timeToGo = getSum(world.time, 2000);
        }
    }


    /**
     * Raises the victory podium.
     */
    raiseVictoryPodium() {
        if (this.isStarHidden()) {
            this.moveStar();
            this.moveVictoryPodium();
        }
    }


    /**
     * Verifies, if the star is hidden.
     * @returns {boolean} - A boolean value.
     */
    isStarHidden() {
        return this.star && isGreater(this.trophyY, this.star.y)
    }


    /**
     * Moves the star.
     */
    moveStar() {
        this.star.y -= this.victorySpeed;
    }


    /**
     * Moves the victory podium.
     */
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