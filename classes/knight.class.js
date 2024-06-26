class Knight extends Character {
    radDispl = 84;
    xStopLeft = source.startX;
    xStopRight = source.crystalXCenter;
    chapters = [
        'epilog', 'death', 'hurt', 'climb', 'jump', 'runAttack', 'run',
        'walkAttack', 'walk', 'attack', 'idle', 'cover'
    ];
    bodyXY = { xLeft: 28, xCenter: 44, xRight: 60, yTop: 62, yCenter: 86, yBottom: 110 };
    weaponXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    attackXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    walkAttackXY = { xLeft: 24, xRight: 50, yTop: 56, yBottom: 108 };
    bombXY = { x: 42, y: 75 };
    goAway = { path: source.goAway, startTime: 0.3 };
    armorHit = { path: source.armorHit, startTime: 0 };
    staveStep = { path: source.staveStep, startTime: 0 };
    grassStep = { path: source.grassStep, startTime: 0 };
    swordDraw = { path: source.swordDraw, startTime: 0.3 };
    skillUpgrade = { path: source.skillUpgrade, startTime: 0 };


    // jsdoc
    constructor(x, y) {
        super(source.knight, x, y);
        this.setSpeed(128, 256);
        this.animate();
        this.setMusic(source.ambience);
    }


    // jsdoc
    move() {
        this.applyGravity();
        this.resetJumpCounter();
        this.act();
        this.setChapter();
        this.resetCurrentImage();
        this.updateGroundLevel();
        this.startBossBattle();
        this.updateCameraX();
        this.startAmbientSound();
        this.setStartTime();
    }


    // jsdoc
    act() {
        this.climb();
        this.jump();
        this.run();
        this.throw();
        this.attack();
        this.idle();
        this.flip();
        this.collect();
    }


    // jsdoc
    climb() {
        this.climbUp();
        this.climbDown();
    }


    // jsdoc
    jump() {
        if (super.isJump()) {
            super.jump();
        }
    }


    run() {
        if (isGreater(this.xStopLeft, this.body.xCenter) && !this.isEpilog() && !this.isDeath()) {
            this.runTo('arrowLeft', true);
        }
        if (isGreater(this.body.xCenter, this.xStopRight) && !this.isEpilog() && !this.isDeath()) {
            this.runTo('arrowRight', false);
        }
    }


    // jsdoc
    runTo(key, value) {
        if (isKey(key)) {
            super.move(value, key);
        }
    }


    // jsdoc
    throw() {
        if (this.bombUnlocked) {
            this.throwBomb();
            this.resetBomb();
        }
    }


    // jsdoc
    throwBomb() {
        if (this.isBombThrow() && !isTrue(this.otherDirection)) {
            let [x, y] = this.getBombCoord();
            this.bomb = new Bomb(x, y);
            this.energyPoints.splice(0, 100);
        }
    }


    // jsdoc
    isBombThrow() {
        return isKey('keyF') && isUndefined(this.bomb) && isMatch(this.energyPoints.length, 100);
    }


    // jsdoc
    getBombCoord() {
        let x = (this.x - this.bombXY.x) / UNIT;
        let tempY = this.y + this.height + this.bombXY.y;
        let y = (canvas.height - tempY) / UNIT;
        return [x, y];
    }


    // jsdoc
    resetBomb() {
        let bombBurst = this.bomb && isGreater(this.bomb.time, world.time);
        let bombOut = this.bomb && isGreater(this.abyssLevel, this.bomb.y);
        if (bombBurst || bombOut) {
            this.bomb.stop(true);
            delete this.bomb;
        }
    }


    // jsdoc
    attack() {
        this.setWeaponState();
        this.applyStamina();
    }


    // jsdoc
    setWeaponState() {
        if (this.isImage('run_attack')) {
            this.setWeaponDamage(this.walkAttackXY, 25);
        } else if (this.isImage('walk_attack')) {
            this.setWeaponDamage(this.walkAttackXY, 20);
        } else if (this.isImage('/attack')) {
            this.setWeaponDamage(this.attackXY, 15);
        }
    }


    // jsdoc
    setWeaponDamage(weapon, value) {
        this.weaponXY = weapon;
        this.weaponDamage = value;
    }


    // jsdoc
    applyStamina() {
        if (this.isAttack()) {
            this.staminaPoints.splice(this.staminaPoints.length - 1, 1);
        }
    }


    // jsdoc
    idle() {
        if (this.isIdleUpdate()) {
            let nextIdle = getSum(world.time, this.idleDelay);
            this.lastIdle = nextIdle;
        }
    }


    // jsdoc
    isIdleUpdate() {
        let noIdle = !isMatch(this.chapter, 'idle') && !isMatch(this.chapter, 'cover');
        let idleEnd = isMatch(this.chapter, 'idle') && this.isImage('idle12');
        return noIdle || idleEnd;
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
    isJump() {
        return isGreater(-1, this.jumpCounter);
    }


    // jsdoc
    playSoundEffects() {
        this.playSound('death6', this.goAway, 'death10');
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


    startBossBattle() {
        if (isGreater(source.bossBattleTriggerX, this.x) && isUndefined(this.bossBattleStarted)) {
            this.bossBattleStarted = true;
            this.xStopLeft = source.bossBattleX;
            world.endboss.nextCast = getSum(world.time, world.endboss.angerDelay);
        }

        if (this.bossBattleStarted && -6720 < this.world.cameraX) {
            if (this.world.cameraX - 4 < -6720) {
                this.world.cameraX = -6720;
            } else {
                this.world.cameraX -= 4;
            }
        }
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


    // jsdoc
    startAmbientSound() {
        this.startMusic(true, 0);
    }


    // jsdoc
    setStartTime() {
        if (!this.startTime) {
            this.startTime = getTime();
        }
    }
}