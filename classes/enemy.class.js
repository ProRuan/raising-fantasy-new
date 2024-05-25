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
    }


    // jsdoc
    setEnemy(hp, speed, method) {
        this.setStateValues(hp, speed);
        this.setAct(method);
        this.animate();
    }


    // jsdoc
    setStateValues(hp, speed) {
        this.hp = hp;
        this.setSpeed(speed);
    }


    // jsdoc
    setAct(method) {
        this.act = this[method];
    }


    // jsdoc
    animate() {
        this.setStoppableInterval(() => this.live(), 1000 / 60);
        this.setStoppableInterval(() => this.playAnimation(), 100);
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
        }
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