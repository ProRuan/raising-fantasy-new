class Enemy extends MoveableObject {
    otherDirection = true;
    chapter = 'idle';
    chapters = ['epilog', 'death', 'hurt', 'attack', 'walk', 'idle'];
    ableToFight = true;


    // jsdoc
    constructor(source, x, y) {
        super(source, x * UNIT, y * UNIT);
        this.setAnimation(source);
        this.setGrowl(source);
    }


    setGrowl(source) {    // rename!!!
        this.growl = source.growl;
        this.weaponImpact = source.weaponImpact;
        this.armorHit = source.armorHit;
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
            this.dead = true;
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

    // jsdoc
    hurt() {
        if (this.isHurt()) {
            if (this.isHeroWeapon()) {
                this.applyWeaponHit();
            }
        }
    }


    // jsdoc
    isHurt() {
        return world.hero.isAttack() && world.hero.isBattle(this);
    }


    // jsdoc
    isHeroWeapon() {
        let runAttack = world.hero.isImage('run_attack4');
        let walkAttack = world.hero.isImage('walk_attack4');
        let attack = world.hero.isImage('/attack2');
        return runAttack || walkAttack || attack;
    }


    applyWeaponHit() {
        if (this.hitTime && isGreater(this.hitTime, world.time)) {
            this.hp -= world.hero.weaponDamage;
            this.playSound(this.weaponImpact);
            delete this.hitTime;
        } else if (!this.hitTime) {
            this.hitTime = world.time + 100;
        }
    }


    // jsdoc
    attack() {
        if (this.isImage(this.damage.trigger) && isGreater(this.damage.time, world.time)) {
            this.applyDamage(this.damage.value);
            this.updateDamageTime();
            this.playHeroHitSound();
        }
    }


    // jsdoc
    applyDamage(damage) {
        let hpPoints = world.hero.hpPoints;
        let diff = getSum(hpPoints.length, -damage);
        this.setHeroHp(damage, hpPoints, diff);
    }


    // jsdoc
    playHeroHitSound() {
        if (!(this instanceof Spider)) {
            this.playSound(this.armorHit);
        }
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
        return this.isBattle(world.hero) && !this.isDeath() && !this.isHurt() && !world.hero.isDeath();
    }


    // jsdoc
    isIdle() {
        return true;
    }


    // jsdoc
    isPeaceful() {
        return this.isFine() && !this.isAttack();
    }


    // jsdoc
    isFine() {
        return !(this.isDeath() || this.isHurt());
    }


    // jsdoc
    playAnimation() {
        super.playAnimation(this.flipBook[this.chapter]);
    }
}