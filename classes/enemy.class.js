class Enemy extends MoveableObject {
    otherDirection = true;
    chapter = 'idle';
    chapters = ['epilog', 'death', 'hurt', 'attack', 'walk', 'idle'];
    ableToFight = true;


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
        this.attack();
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
    attack() {
        if (this.isImage(this.damage.trigger) && isGreater(this.damage.time, world.time)) {
            this.applyDamage(this.damage.value);
            this.updateDamageTime();
        }
    }


    // jsdoc
    applyDamage(damage) {
        let hpPoints = world.hero.hpPoints;
        let diff = getSum(hpPoints.length, -damage);
        this.setHeroHp(damage, hpPoints, diff);
    }


    // jsdoc
    setHeroHp(damage, hpPoints, diff) {
        if (isGreater(diff, 0)) {
            let rest = hpPoints.length;
            hpPoints.splice(0, rest);
        } else {
            let hp = hpPoints.length - damage;
            hpPoints.splice(hp, damage);
        }
    }


    // jsdoc
    updateDamageTime() {
        let delay = this.flipBook.attack.length * 100;
        this.damage.time = delay + getTime();
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