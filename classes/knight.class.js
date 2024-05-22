class Knight extends Character {
    radDispl = 84;
    bodyXY = { xLeft: 28, xCenter: 44, xRight: 60, yTop: 62, yCenter: 86, yBottom: 110 };
    weaponXY = { xLeft: 24, xRight: 60, yTop: 56, yBottom: 104 };
    chapters = ['epilog', 'death', 'hurt', 'climb', 'jump', 'runAttack', 'run', 'walkAttack', 'walk', 'attack', 'idle', 'cover'];


    // edit source!!! + fix fall animation and sound!!!
    goAway = { path: source.goAway, startTime: 0.375, volume: 1 };
    armorHit = { path: source.armorHit, startTime: 0.01, volume: 0.5 };
    staveStep = { path: source.staveStep, startTime: 0.025, volume: 0.5 };
    grassFall = { path: source.grassStep, startTime: 0.05, volume: 0.5 };
    grassStep = { path: source.grassStep, startTime: 0.05, volume: 0.5 };
    swordDraw = { path: source.swordDraw, startTime: 0.3, volume: 0.5 };


    constructor(x, y) {
        super(source.knight, x, y);
        this.setSpeed(128, 256);
        this.animate();
        this.applyGravity();
    }


    animate() {
        setInterval(() => {
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


            if (isKey('keyA')) {    // set condition and move method call!?!
                this.staminaPoints.splice(this.staminaPoints.length - 1, 1);
            }

            // this.world.cameraX = -this.x + this.speed;    // set camera x offset!!!
        }, 1000 / 60);


        setInterval(() => {
            // console.log(this.chapter, this.currentImage);

            // fixed 10 of 10 sounds
            this.playSoundEffect('death6', this.goAway);
            this.playSoundEffect('hurt1', this.armorHit);    // set condition and delay!!!
            this.playSoundEffect('climb2', this.staveStep);
            this.playSoundEffect('climb4', this.staveStep);
            this.playSoundEffect('jump7', this.grassFall);
            this.playSoundEffect('run2', this.grassStep);
            this.playSoundEffect('run6', this.grassStep);
            this.playSoundEffect('walk2', this.grassStep);
            this.playSoundEffect('walk5', this.grassStep);
            this.playSoundEffect('_attack4', this.swordDraw);
            this.playSoundEffect('/attack2', this.swordDraw);
            // this.playSoundEffect('idle3', this.swordDraw);    // to remove or longer delay or for level end?

            // is ready!!!
            // -----------
            this.playAnimation();
            // this.playSound();
        }, 100);
    }


    playSoundEffect(name, sound) {
        if (this.isImage(name)) {
            let audio = new Audio(sound.path);
            audio.currentTime = sound.startTime;
            audio.volume = sound.volume;
            audio.play();
        }
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
        this.runLeft('arrowLeft', true);
        this.runLeft('arrowRight', false);
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


    // playSound() {    // add sound volume factor!!!
    //     this.playSoundOnTrigger('run_attack2', this.footStep);
    //     this.playSoundOnTrigger('run_attack6', this.footStep);
    //     this.playSoundOnTrigger('run2', this.footStep);
    //     this.playSoundOnTrigger('run6', this.footStep);
    //     this.playSoundOnTrigger('walk_attack2', this.footStep);
    //     this.playSoundOnTrigger('walk_attack5', this.footStep);
    //     this.playSoundOnTrigger('walk2', this.footStep);
    //     this.playSoundOnTrigger('walk5', this.footStep);
    //     this.playSoundOnTrigger('_attack2', this.swordDraw);
    //     this.playSoundOnTrigger('/attack1', this.swordDraw);
    // }    // remove sound footstep?!?


    // jsdoc
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
            // this.increaseCounter(key, object);
            // super.playSound(object.sound);


            // if (object instanceof Crystal) {
            //     this.bombSkillUnlocked = true;
            //     this.playSound(this.soundUpgrade);
            //     this.world.level.setXLevelEnd();
            //     this.world.level.setXLevelStartCrystal();
            // }
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
}