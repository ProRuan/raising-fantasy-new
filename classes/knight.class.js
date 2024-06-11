class Knight extends Character {
    radDispl = 84;
    bodyXY = { xLeft: 28, xCenter: 44, xRight: 60, yTop: 62, yCenter: 86, yBottom: 110 };
    weaponXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    attackXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    walkAttackXY = { xLeft: 24, xRight: 50, yTop: 56, yBottom: 108 };
    chapters = ['epilog', 'death', 'hurt', 'climb', 'jump', 'runAttack', 'run', 'walkAttack', 'walk', 'attack', 'idle', 'cover'];

    xStopLeft = source.startX;
    xStopRight = source.crystalXCenter;

    // edit source!!!
    // option: fix fall animation and sound!!!
    goAway = { path: source.goAway, startTime: 0.3 };
    armorHit = { path: source.armorHit, startTime: 0 };
    staveStep = { path: source.staveStep, startTime: 0 };
    grassStep = { path: source.grassStep, startTime: 0 };
    swordDraw = { path: source.swordDraw, startTime: 0.3 };
    skillUpgrade = { path: source.skillUpgrade, startTime: 0 };


    constructor(x, y) {
        super(source.knight, x, y);
        this.setSpeed(128, 256);
        this.animate();
        this.applyGravity();
        this.setMusic(source.ambience);
    }


    // jsdoc
    animate() {
        this.setPauseableInterval(() => this.move(), 1000 / 60);
        this.setPauseableInterval(() => this.play(), 100);
    }


    move() {
        this.resetJumpCounter();

        this.act();

        this.setChapter();
        this.resetCurrentImage();
        this.updateGroundLevel();


        if (isKey('keyA')) {    // set condition and move method call!?!
            this.staminaPoints.splice(this.staminaPoints.length - 1, 1);
        }


        if (isKey('keyF') && !this.bomb && this.energyPoints.length == 100) {
            let x = (this.x - 42) / 64;
            let y = (canvas.height - (this.y + this.height + 62 + 13)) / 64;
            this.bomb = new Bomb(x, y);
            this.energyPoints.splice(0, 100);
        }
        if (this.bomb && this.bomb.removeable || this.bomb && this.bomb.y > this.abyssLevel) {
            this.bomb = undefined;
        }


        if (isGreater(6932, this.x) && isUndefined(this.bossBattleStarted)) {
            this.bossBattleStarted = true;
            this.xStopLeft = source.bossBattleX;
        }

        this.updateCameraX();
        this.startAmbientSound();
    }


    // jsdoc
    act() {
        this.climb();
        this.jump();
        this.run()
        this.attack();
        this.idle();
        this.flip();
        this.collect();
    }


    // jsdoc
    flip() {
        this.changeDirection('keyQ', true);
        this.changeDirection('keyE', false);
    }


    // jsdoc
    changeDirection(key, logical) {
        if (isKey(key)) {
            this.setOtherDirection(logical);
        }
    }


    // jsdoc
    play() {
        this.playAnimation();
        this.playSoundEffects();
    }


    // jsdoc
    playAnimation() {
        if (!this.isJump()) {
            super.playAnimation(this.flipBook[this.chapter]);
        } else {
            this.playJumpAnimation();
        }
    }


    // jsdoc
    playSoundEffects() {
        this.playSound('death6', this.goAway);
        this.playSound('hurt1', this.armorHit);
        this.playSound('climb2', this.staveStep, 'climb4');
        this.playSound('jump7', this.grassStep);
        this.playSound('run_attack2', this.grassStep, 'run_attack6');
        this.playSound('run_attack4', this.swordDraw);
        this.playSound('run2', this.grassStep, 'run6');
        this.playSound('walk_attack2', this.grassStep, 'walk_attack5');
        this.playSound('walk_attack4', this.swordDraw);
        this.playSound('walk2', this.grassStep, 'walk5');
        this.playSound('/attack2', this.swordDraw);
    }


    // isPassedAway() ...


    // to edit!
    isEpilog() {
        return this.isDeath() && this.img.src.includes('death10');
    }


    isDeath() {
        return !isGreater(0, this.hpPoints.length);
    }


    isHurt() {
        let enemy = this.world.enemies.find(e => e.isBattle(this));
        if (enemy && !(enemy instanceof Spider)) {    // variable!!!, is it working for dino and ent?
            // this.hpPoints.splice(this.hpPoints.length - 1, 1);    // to activate!
            return true;
        }

        let web = this.world.enemies.find(enemy => enemy instanceof Spider && enemy.web && isCollided(this.body, enemy.web));
        if (web) {
            return true;
        }

        // double code
        let magic = this.world.endboss.find(endboss => endboss.magic && isCollided(this.body, endboss.magic.body));
        if (magic) {
            return true;
        }
    }


    // hurt()


    // jsdoc
    idle() {
        if (this.isIdleToUpdate()) {
            this.setObjectValue('lastIdle', world.time + this.idleDelay);
        }
    }


    // jsdoc
    isIdleToUpdate() {
        return this.isNotIdle() || this.isIdleEnd();
    }


    // jsdoc
    isNotIdle() {
        return !isMatch(this.chapter, 'idle') && !isMatch(this.chapter, 'cover');
    }


    // jsdoc
    isIdleEnd() {
        return isMatch(this.chapter, 'idle') && this.img.src.includes('idle12');
    }


    // jsdoc
    collect() {
        this.collectItem('coins');
        this.collectItem('crystals');
        this.collectItem('hearts');
        this.collectItem('hitPoints');
        this.collectItem('leaves');
        this.collectItem('stars');
    }


    // jsdoc
    climb() {
        this.climbUp('arrowUp', true);
        this.climbUp('arrowDown', false);
    }


    // jsdoc
    climbUp(key, value) {
        if (this.isClimbLadder(key)) {
            super.climb(value);
        }
    }


    // jsdoc
    isJump() {
        return isGreater(-1, this.jumpCounter);
    }


    // jsdoc
    jump() {
        if (super.isJump()) {
            super.jump();
        }
    }


    // jsdoc
    run() {
        if (isGreater(this.xStopLeft, this.body.xCenter)) {
            this.runLeft('arrowLeft', true);
        }
        if (isGreater(this.body.xCenter, this.xStopRight)) {
            this.runLeft('arrowRight', false);
        }
    }


    // jsdoc
    runLeft(key, value) {
        if (isKey(key)) {
            super.move(value, key);
        }
    }


    attack() {
        if (this.isAttack() && this.isBattle()) {
            // console.log('battle');
        }
    }


    // jsdoc
    collectItem(key) {
        let object = this.getObject(key);
        if (object) {
            object.effect();
            this.removeObject(key, object);
        }
    }


    // jsdoc
    getObject(key) {
        return world[key].find(o => isCollided(this.body, o));
    }


    // jsdoc
    removeObject(key, object) {
        world[key].splice(object.getId(key), 1);
    }


    // jsdoc
    updateCameraX() {
        if (isUndefined(this.bossBattleStarted)) {
            let cameraX = this.getCameraX();
            if (isGreater(cameraX, this.x)) {
                this.setCameraX(2);
            } else if (isGreater(this.world.heroX, this.x)) {
                this.setCameraX(1);
            } else {
                this.setCameraX(0);
            }
        }
    }


    // jsdoc
    getCameraX() {
        return canvas.width * (this.world.size - 1) + this.world.heroX;
    }


    // jsdoc
    setCameraX(id) {
        if (isMatch(id, 2)) {
            this.world.cameraX = -canvas.width * (this.world.size - 1);
        } else if (isMatch(id, 1)) {
            this.world.cameraX = -this.x + this.world.heroX;
        } else if (isMatch(id, 0)) {
            this.world.cameraX = 0;
        }
    }


    startAmbientSound() {    // double code!!! (shaman)
        if (!this.musicStarted) {
            this.musicStarted = true;
            this.music.play();
            this.startTime = getTime();
        }
    }




    // avoid double code ...
    // move methods to other classes ...
    // hurt: set condition + delay!!!
    // set attackXY and walkAttackXY for isBattle()!!!
    // move animate() ... ?
    // review class Character (sort methods) ...
    // game over screen (this + level world) ...
    // pause ...
    // fix enemy gravity or dino walk ...

    // fix updateGroundLevel (error after collecting star) ...

    // clear enemies (0/3) ...
}