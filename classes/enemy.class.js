class Enemy extends MoveableObject {
    otherDirection = true;
    chapter = 'idle';
    chapters = ['epilog', 'death', 'hurt', 'attack', 'walk', 'idle'];


    // jsdoc
    constructor(source, x, y) {
        super(source, x * UNIT, y * UNIT);
        this.setFlipBook(source);    // double code???
        this.setCover(source);    // double code???
        this.setEpilog();    // double code???
        this.loadImages();    // double code???
        this.setGrowl(source);
    }


    setGrowl(source) {    // rename!!!
        this.growl = source.growl;
        this.weaponImpact = source.weaponImpact;
    }


    // jsdoc
    setEnemy(hp, speed, method) {
        this.setStateValues(hp, speed);
        this.setAct(method);
        this.animate();
    }


    // jsdoc
    setStateValues(hp, speed) {
        this.hpMax = hp;
        this.hp = hp;
        this.setSpeed(speed);
    }


    // jsdoc
    setAct(method) {
        this.act = this[method];
    }


    // jsdoc
    animate() {
        this.setPauseableInterval(() => this.live(), 1000 / 60);
        this.setPauseableInterval(() => this.playAnimation(), 100);
    }


    // jsdoc
    live() {
        this.passAway();
        this.hurt();
        this.act();
        this.setChapter();
        this.resetCurrentImage();
    }


    // jsdoc
    passAway() {
        if (this.isEpilog() && isUndefined(this.dead)) {
            this.setObjectValue('dead', true);
            this.growlTerminally();
        }
    }


    // jsdoc
    growlTerminally() {
        this.playSound(this.growl);
        setTimeout(() => this.playSound(this.growl), 100);
        setTimeout(() => this.playSound(this.growl), 200);
    }


    // jsdoc
    isEpilog() {
        return this.isDeath() && this.isEpilogImage();
    }


    // jsdoc
    isDeath() {
        return !isGreater(0, this.hp);
    }


    // jsdoc
    isEpilogImage() {
        let fileName = 'death' + this.flipBook.death.length;
        return this.isImage(fileName);
    }


    hurt() {
        if (this.isHurt() && isOnTime(world.time, this.lastHit, this.hitDelay)) {
            this.hp -= 30;
            this.lastHit = world.time + this.hitDelay;
            this.playSound(this.weaponImpact);
        }
    }


    // jsdoc
    isHurt() {
        return world.hero.isAttack() && world.hero.isBattle(this);
    }


    // jsdoc
    isAttack() {
        return this.isBattle(world.hero) && !world.hero.isDeath();
    }


    // jsdoc
    isIdle() {
        return true;
    }


    // jsdoc
    isFine() {
        return !(this.isDeath() || this.isHurt() || this.isAttack());
    }


    // jsdoc
    playAnimation() {
        super.playAnimation(this.flipBook[this.chapter]);
    }
}