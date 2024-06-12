class Character extends MoveableObject {
    chapter = 'cover';
    idleDelay = 3000;
    lastIdle = this.idleDelay + getTime();
    coins = 0;
    leaves = 0;


    constructor(source, x, y) {
        super(source, x, y);
        this.setFlipBook(source);    // double code???
        this.setCover(source);    // double code???
        this.setEpilog();    // double code???
        this.loadImages();    // double code???
    }


    // jsdoc
    get hpPoints() {
        return this.world.hpBar.points;
    }


    // jsdoc
    get energyPoints() {
        return this.world.energyBar.points;
    }


    // jsdoc
    get staminaPoints() {
        return this.world.staminaBar.points;
    }


    // jsdoc
    animate() {
        this.setPauseableInterval(() => this.move(), 1000 / 60);
        this.setPauseableInterval(() => this.play(), 100);
    }


    // jsdoc
    resetJumpCounter() {
        if (!isMatch(this.chapter, 'jump')) {
            this.increaseJumpCounter(false);
        }
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
    isEpilog() {
        return this.isDeath() && this.isImage('death10');
    }


    // jsdoc
    isDeath() {
        return !isGreater(0, this.hpPoints.length);
    }


    // jsdoc
    isHurt() {
        let enemyHit = this.getHit('enemies', 'isEnemyHit');
        let webHit = this.getHit('enemies', 'isWebHit');
        let magicHit = this.getHit('bosses', 'isMagicHit');
        return enemyHit || webHit || magicHit;
    }


    // jsdoc
    getHit(key, method) {
        return this.world[key].find(enemy => this[method](enemy));
    }


    // jsdoc
    isEnemyHit(enemy) {
        let inBattle = enemy.isBattle(this) && enemy.isAttack();
        return enemy && enemy.ableToFight && inBattle;
    }


    // jsdoc
    isWebHit(enemy) {
        let web = enemy instanceof Spider && enemy.web;
        return web && isCollided(this.body, enemy.web);
    }


    // jsdoc
    isMagicHit(enemy) {
        let magic = enemy.magic;
        return magic && isCollided(this.body, magic.body);
    }


    // jsdoc
    isJump() {
        return isKey('space') && !this.isAboveGround();
    }


    // jsdoc
    playJumpAnimation() {
        if (this.isJumpPhase(0)) {
            this.playJump(0, true);
        } else if (this.isJumpPhase(1) && isGreater(0, this.speedY)) {
            this.playJump(2);
        } else if (this.isJumpPhase(1)) {
            this.playJump(3, true);
        } else if (this.isJumpPhase(2) && isGreater(this.speedY, 0)) {
            this.playJump(5);
        } else if (this.isJumpPhase(2)) {
            this.playJump(6, false);
        }
    }


    // jsdoc
    isJumpPhase(i) {
        return isMatch(this.jumpCounter, i);
    }


    // jsdoc
    playJump(i, set) {
        super.playAnimation([this.flipBook.jump[i]]);
        this.playJumpNext(i);
        this.setJumpCounter(set);
    }


    // jsdoc
    playJumpNext(i) {
        if (isMatch(i, 0) || isMatch(i, 3)) {
            setTimeout(() => this.playJump(++i), 100 / 3);
        }
    }


    // jsdoc
    setJumpCounter(set) {
        if (!isUndefined(set) && isTrue(set)) {
            this.increaseJumpCounter(true);
        } else if (!isUndefined(set) && !isTrue(set)) {
            this.increaseJumpCounter(false);
        }
    }


    // jsdoc
    increaseJumpCounter(logical) {
        (logical) ? this.jumpCounter++ : this.jumpCounter = -1;
    }


    // jsdoc
    isRunAttack() {
        return this.isRun() && this.isAttack();
    }


    // jsdoc
    isRun() {
        return isKey('arrowLeft', 'doubleClick') || isKey('arrowRight', 'doubleClick');
    }


    // jsdoc
    isWalkAttack() {
        return this.isWalk() && this.isAttack();
    }


    // jsdoc
    isWalk() {
        return isKey('arrowLeft') || isKey('arrowRight');
    }


    // jsdoc
    isAttack() {
        return isKey('keyA') && isGreater(0, world.hero.staminaPoints.length);
    }


    // jsdoc
    isIdle() {
        return isOnTime(this.world.time, this.lastIdle, this.idleDelay);
    }


    // jsdoc
    isCover() {
        return true;
    }


    // jsdoc
    soundUpgrade() {
        this.playAudio(this.skillUpgrade);
    }


    // jsdoc
    damage(damage) {
        if (isGreater(this.hpPoints.length, damage)) {
            this.hpPoints.splice(0, this.hpPoints.length);
        } else {
            let currentHp = this.hpPoints.length - damage;
            this.hpPoints.splice(currentHp, damage);
        }
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



    // sort methods (class Knight and class Character) ...

    // move methods to other classes ...
    // move animate() ... ?
    // review class Character (sort methods) ...
    // game over screen (this + level world) ...
    // pause ...
    // pause music ...
    // fix enemy gravity or dino walk ...

    // fix updateGroundLevel (error after collecting star) ...

    // clear enemies (0/3) ...
}