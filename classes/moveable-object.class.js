class MoveableObject extends DrawableObject {
    otherDirection = false;

    speedY = 0;
    acceleration = 0.5;
    jumpCounter = -1;
    basicLevel = 484;
    groundLevel = 484;
    abyssLevel = 668;
    climbing = false;
    lastHit = 0;
    hitDelay = 500;


    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    get body() {
        return {
            'xLeft': this.getBody('x', 'xLeft'),
            'xCenter': this.getBody('x', 'xCenter'),
            'xRight': this.getBody('x', 'xRight'),
            'yTop': this.getBody('y', 'yTop'),
            'yCenter': this.getBody('y', 'yCenter'),
            'yBottom': this.getBody('y', 'yBottom')
        }
    }


    // jsdoc
    get weapon() {
        return {
            'xLeft': this.getWeapon('xCenter', 'xLeft', 'xRight'),
            'xRight': this.getWeapon('xCenter', 'xRight', 'xLeft'),
            'yTop': this.getWeapon('y', 'yTop'),
            'yBottom': this.getWeapon('y', 'yBottom')
        };
    }


    // jsdoc
    getBody(key, subkey) {
        return this[key] + this.bodyXY[subkey];
    }


    // jsdoc
    getWeapon(key, subkeyA, subkeyB) {
        return (isUndefined(subkeyB)) ? this.getWeaponValue(key, subkeyA) : this.getWeaponX(key, subkeyA, subkeyB);
    }


    // jsdoc
    getWeaponX(key, subkeyA, subkeyB) {
        return (!isTrue(this.otherDirection)) ? this.getWeaponValue(key, subkeyA, true) : this.getWeaponValue(key, subkeyB, false);
    }


    // jsdoc
    getWeaponValue(key, subkey, logical) {
        if (isUndefined(logical)) {
            return this[key] + this.weaponXY[subkey];
        } else if (isTrue(logical)) {
            return this.body[key] + this.weaponXY[subkey];
        } else {
            return this.body[key] - this.weaponXY[subkey];
        }
    }


    setCover(source) {
        this.flipBook.cover = [source.path];
    }


    setEpilog() {
        this.flipBook.epilog = [this.flipBook.death[getLastIndex(this.flipBook.death)]];
    }


    setImages() {    // double code ( setImages() )
        for (const [key] of Object.entries(this.flipBook)) {
            let chapter = this.flipBook[key];
            this.fillImageCache(chapter);
        }
    }


    fillImageCache(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }


    // jsdoc
    move(logical, key) {
        this.setOtherDirection(logical);
        this.applySpeed(logical, key);
    }


    // jsdoc
    setObjectValue(key, value) {
        this[key] = value;
    }


    // jsdoc + setBoolean() above!!!
    setOtherDirection(logical) {
        this.otherDirection = logical;
    }


    // jsdoc
    applySpeed(logical, key) {
        if (isKey(key, 'doubleClick')) {
            this.applySpeedType('x', logical, 'runSpeed');
        } else if (isKey(key)) {
            this.applySpeedType('x', logical, 'speed');
        }
    }


    climb(logical) {
        this.applySpeedType('y', logical, 'speed');    // not waterproof!!!
    }


    // jsdoc
    isUndefined(value) {
        return value === undefined;
    }


    // playAnimation(images) {
    //     let i = this.currentImage % images.length;
    //     let path = images[i];
    //     this.img = this.imageCache[path];
    //     this.currentImage++;
    // }


    applyGravity() {
        setInterval(() => {
            if (!this.isClimb()) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if (this.y > this.groundLevel - (this.body.yBottom - this.y)) {
                        // console.log(this.y);
                        this.y = this.groundLevel - (this.body.yBottom - this.y);
                    }
                } else {
                    this.speedY = 0;
                }
            }
        }, 1000 / 60);
    }


    isAboveGround() {
        return this.body.yBottom < this.groundLevel;
    }


    jump() {
        this.setObjectValue('speedY', 12.5);    // y value!!!
        this.setObjectValue('jumpCounter', 0);
    }


    // jsdoc
    isClimb() {
        return this.isClimbLadder('arrowUp') || this.isClimbLadder('arrowDown');
    }


    // jsdoc
    isClimbLadder(key) {
        return isKey(key) && this.isAtLadder(key);
    }


    // jsdoc
    isAtLadder(key) {
        let ladder = this.getLadder(key);
        return (ladder) ? true : false;
    }


    // jsdoc
    getLadder(key) {
        return this.world.ladders.find(l => this.isLadder(key, l));
    }


    // jsdoc
    isLadder(key, l) {
        let [a, b] = this.getLadderParameters(key, l);
        return isIncluded(this.body.xLeft, l.xCenter, this.body.xRight) && isGreater(a, b - 0.5);
    }


    getLadderParameters(key, l) {
        return (key == 'arrowUp') ? [l.yTop, this.body.yBottom] : [this.body.yBottom, l.yBottom]
    }


    isBattle(enemy) {
        enemy = (enemy) ? this.verifyEnemy(this.weapon, enemy.body) : world.enemies.find(enemy => this.verifyEnemy(this.weapon, enemy.body));
        return (enemy) ? true : false;
    }


    verifyEnemy(a, b) {
        let xLeft = isIncluded(a.xLeft, b.xLeft, a.xRight) || isIncluded(b.xLeft, a.xLeft, b.xRight);
        let xRight = isIncluded(a.xLeft, b.xRight, a.xRight) || isIncluded(b.xLeft, a.xRight, b.xRight);
        let yTop = isIncluded(a.yTop, b.yTop, a.yBottom) || isIncluded(b.yTop, a.yTop, b.yBottom);
        let yBottom = isIncluded(a.yTop, b.yBottom, a.yBottom) || isIncluded(b.yTop, a.yBottom, b.yBottom);
        return (xLeft || xRight) && (yTop || yBottom);
    }




    // jsdoc
    resetCurrentImage() {
        if (!this.isSimilarChapter()) {
            this.setObjectValue('currentImage', 0);
        }
    }


    // jsdoc
    isSimilarChapter() {
        let key = this.getSimilarChapter();
        let last = this.lastChapter.includes(key);
        let current = this.chapter.includes(key);
        return isMatch(last, current);
    }


    // jsdoc
    getSimilarChapter() {
        return this.chapter.replace(/[A-Z][a-z]+/, '');
    }


    setChapter() {
        this.lastChapter = this.chapter;
        this.chapter = this.getChapter();
    }


    // jsdoc
    getChapter() {
        for (let i = 0; i < this.chapters.length; i++) {
            let condition = this.getCondition(i);
            if (this.isChapter(condition)) {
                return this.chapters[i];
            }
        }
    }


    // jsdoc
    getCondition(i) {
        let condition = this.chapters[i];
        let initial = condition[0];
        return 'is' + condition.replace(initial, initial.toUpperCase());
    }


    // jsdoc
    isChapter(condition) {
        return this[condition]();
    }




    // in use?
    loadImage(flipBook, i) {
        let path = flipBook[i];
        this.img = this.imageCache[path];
    }
}