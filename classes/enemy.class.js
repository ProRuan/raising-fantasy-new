class Enemy extends MoveableObject {
    otherDirection = true;
    chapter = 'idle';
    chapters = ['epilog', 'death', 'hurt', 'attack', 'walk', 'idle'];


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.setFlipBook(source);    // double code???
        this.setCover(source);    // double code???
        this.setEpilog();    // double code???
        this.loadImages();    // double code???
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
        return !isLarger(0, this.energy);
    }


    // jsdoc
    isEpilogImage() {
        return this.img.src.includes('death' + this.flipBook.death.length);
    }


    hurt() {
        if (this.isHurt() && isOnTime(world.time, this.lastHit, this.hitDelay)) {
            this.energy -= 20;
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
    playAnimation() {
        super.playAnimation(this.flipBook[this.chapter]);
    }
}