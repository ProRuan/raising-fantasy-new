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

    sounds = [];


    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    get radDispl() {
        return this.radDispl;
    }


    // jsdoc
    get body() {
        return {
            'xLeft': this.getOffset('x', 'offsetX', 'left'),
            'xCenter': this.getOffset('x', 'offsetX', 'center'),
            'xRight': this.getOffset('x', 'offsetX', 'right'),
            'yTop': this.getOffset('y', 'offsetY', 'top'),
            'yCenter': this.getOffset('y', 'offsetY', 'center'),
            'yBottom': this.getOffset('y', 'offsetY', 'bottom')
        };
    }


    // jsdoc
    getOffset(axis, key, subkey) {
        return this[axis] + this[key][subkey];
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


    // jsdoc
    applySpeedType(key, logical, type) {
        this[key] += (logical) ? -this[type] : this[type];
    }


    climb(logical) {
        this.applySpeedType('y', logical, 'speed');    // not waterproof!!!
    }


    // jsdoc
    isUndefined(value) {
        return value === undefined;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playSound(path) {    // set sound volume factor!!!
        let sound = new Audio(path);
        this.sounds.push(sound);
        sound.play();
    }


    applyGravity() {
        setInterval(() => {
            if (!this.isClimb()) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if (this.y > this.groundLevel - (this.yBottom - this.y)) {
                        // console.log(this.y);
                        this.y = this.groundLevel - (this.yBottom - this.y);
                    }
                } else {
                    this.speedY = 0;
                }
            }
        }, 1000 / 60);
    }


    isAboveGround() {
        return this.yBottom < this.groundLevel;
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
        return isIncluded(this.xLeft, l.xCenter, this.xRight) && isLarger(a, b - 0.5);
    }


    // jsdoc
    getLadderParameters(key, l) {
        return (key == 'arrowUp') ? [l.yTop, this.yBottom] : [this.yBottom, l.yBottom]
    }


    isBattle(enemy) {
        enemy = (enemy) ? this.verifyEnemy(this.weapon, enemy) : world.enemies.find(enemy => this.verifyEnemy(this.weapon, enemy.body));
        return (enemy) ? true : false;
    }


    verifyEnemy(a, b) {
        let xLeft = isIncluded(a.xLeft, b.xLeft, a.xRight) || isIncluded(b.xLeft, a.xLeft, b.xRight);
        let xRight = isIncluded(a.xLeft, b.xRight, a.xRight) || isIncluded(b.xLeft, a.xRight, b.xRight);
        let yTop = isIncluded(a.yTop, b.yTop, a.yBottom) || isIncluded(b.yTop, a.yTop, b.yBottom);
        let yBottom = isIncluded(a.yTop, b.yBottom, a.yBottom) || isIncluded(b.yTop, a.yBottom, b.yBottom);
        return (xLeft || xRight) && (yTop || yBottom);
    }




    // in use?
    loadImage(flipBook, i) {
        let path = flipBook[i];
        this.img = this.imageCache[path];
    }
}