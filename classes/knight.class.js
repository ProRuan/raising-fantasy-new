class Knight extends Character {
    radDispl = 84;
    bodyXY = { xLeft: 28, xCenter: 44, xRight: 60, yTop: 62, yCenter: 86, yBottom: 110 };
    weaponXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    attackXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    walkAttackXY = { xLeft: 24, xRight: 50, yTop: 56, yBottom: 108 };
    chapters = ['epilog', 'death', 'hurt', 'climb', 'jump', 'runAttack', 'run', 'walkAttack', 'walk', 'attack', 'idle', 'cover'];

    xStopLeft = source.startX;
    xStopRight = source.crystalXCenter;

    // hurt: set condition + delay!!!
    // set attackXY and walkAttackXY for isBattle()!!!


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


    animate() {
        this.moveId = setInterval(() => {
            this.startAmbientSound();

            this.resetJumpCounter();

            // only for testing!!!
            if (isKey('keyQ')) {
                this.setOtherDirection(true);
            }
            if (isKey('keyE')) {
                this.setOtherDirection(false);
            }

            this.climb();
            this.jump();
            this.run()
            this.attack();    // still to write!!!
            this.idle();

            this.setChapter();
            this.resetCurrentImage();
            // this.setSound();    // maybe?

            this.updateGroundLevel();

            this.collect('coins');
            this.collect('crystals');
            this.collect('hearts');
            this.collect('hitPoints');
            this.collect('leaves');
            this.collect('stars');


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

            // (64, body.xCenter) + (body.xCenter, 960 - 64)

            if (isUndefined(this.bossBattleStarted)) {
                if (isGreater(960 * 7 + 212, this.x)) {
                    this.world.cameraX = -960 * 7;
                } else if (isGreater(212, this.x)) {
                    this.world.cameraX = -this.x + 212;    // set camera x offset!!!
                } else {
                    this.world.cameraX = 0;
                }
            }

        }, 1000 / 60);


        this.playId = setInterval(() => {
            // console.log(this.chapter, this.currentImage);

            // if (!isUndefined(this.world.endboss[0].magic)) {
            //     let magic = this.world.endboss[0].magic.body;
            //     console.log('lightning: ', magic.xLeft, magic.xRight, magic.yTop, magic.yBottom);
            //     console.log('hero: ', this.body.xLeft, this.body.xRight, this.body.yTop, this.body.yBottom);
            //     console.log('collided x: ', isIncluded(this.body.xLeft, magic.xCenter, this.body.xRight));
            //     console.log('collided y: ', isIncluded(magic.yTop, this.body.yCenter, magic.yBottom));
            // }

            // is ready!!!
            // -----------
            this.playAnimation();
            this.playSoundEffects();
        }, 100);
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


    // jsdoc
    playSound(nameA, sound, nameB) {
        if (this.isImage(nameA)) {
            this.playAudio(sound);
        } else if (!isUndefined(nameB) && this.isImage(nameB)) {
            this.playAudio(sound);
        }
    }


    // jsdoc
    playAudio(sound) {
        let audio = new Audio(sound.path);
        audio.currentTime = sound.startTime;
        audio.volume = soundVolume;
        audio.play();
    }


    // isPassedAway() / isGone() / ...


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


        // if (!isUndefined(this.world.crystals[0]) && isGreater(source.xStart, this.body.xCenter)) {    // level xStart
        //     this.runLeft('arrowLeft', true);
        // } else if (isGreater(5760 + 192 + 32, this.body.xCenter)) {
        //     this.runLeft('arrowLeft', true);
        // }

        // if (isGreater(this.body.xCenter, 6240)) {    // level xEnd
        //     this.runLeft('arrowRight', false);
        // } else if (isUndefined(this.world.crystals[0]) && isGreater(this.body.xCenter, source.xEnd)) {    // level xEnd
        //     this.runLeft('arrowRight', false);
        // }
    }


    // jsdoc
    runLeft(key, value) {
        if (isKey(key)) {
            this.move(value, key);
        }
    }


    attack() {
        if (this.isAttack() && this.isBattle()) {
            // console.log('battle');
        }
    }


    // jsdoc
    playAnimation() {
        if (!this.isJump()) {
            super.playAnimation(this.flipBook[this.chapter]);
        } else {
            this.playJumpAnimation();
        }
    }


    // to use?
    playSoundOnTrigger(key, sound) {
        if (this.isImage(key)) {
            super.playSound(sound);
        }
    }


    // to edit (this and subsequent methods)!!!
    collect(key) {
        let object = this.getObject(key);
        if (object) {
            object.effect();
            this.removeObject(key, object);
        }
    }


    // use object id directly!!!
    getObject(key) {
        return world[key].find(o => isCollided(this.body, o));
    }


    // jsdoc
    removeObject(key, object) {
        world[key].splice(object.getId(key), 1);
    }


    // jsdoc
    increaseCounter(item, object) {
        if (this.isCollectableItem(object)) {
            this.increaseItem(item);
        }
    }


    // jsdoc
    isCollectableItem(object) {
        return object instanceof Coin || object instanceof Leaf;
    }


    // jsdoc
    increaseItem(item) {
        this[item]++;
    }


    // jsdoc
    updateGroundLevel(key) {
        if (this.isUndefined(key)) {
            this.setGroundLevel('flyGrass', this.updateGroundLevel('grass'));
        } else {
            this.setGroundLevel('grass', this.setObjectValue('groundLevel', this.abyssLevel));
        }
    }


    // jsdoc
    setGroundLevel(key, method) {
        let grass = this.searchGrass(key);
        (grass) ? this.setObjectValue('groundLevel', grass.yTop) : method;
    }


    // jsdoc + rename to getGrass()
    searchGrass(key) {
        return this.world[key].find(g => this.isOnGrass(g) && this.isAboveGrass(g));
    }


    // jsdoc
    isOnGrass(g) {
        return isIncluded(g.xLeft, this.body.xLeft, g.xRight) || isIncluded(g.xLeft, this.body.xRight, g.xRight);
    }


    // jsdoc
    isAboveGrass(g) {
        return isGreater(this.body.yBottom, g.yTop, true);
    }


    startAmbientSound() {    // double code!!! (shaman)
        if (!this.musicStarted) {
            this.musicStarted = true;
            this.music.play();
            this.startTime = getTime();
            console.log(this.startTime);
            // setTimeout(() => {
            //     this.music.play();
            //     this.startTime = getTime();
            //     console.log(this.startTime);
            // }, 125);
        }
    }
}