class MoveableObject extends DrawableObject {
    otherDirection = false;

    speedY = 0;
    acceleration = 0.5;
    groundLevel = 484;
    grounded = true;
    climbing = false;

    sounds = [];


    constructor(path, x, y) {
        super(path, x, y);
    }


    // jsdoc
    move(logical, key) {
        this.setOtherDirection(logical);
        this.addSpeed(logical, key);
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
    addSpeed(logical, key) {
        if (isKey(key, 'doubleClick')) {
            this.addSpeedType(logical, 'runSpeed');
        } else if (isKey(key)) {
            this.addSpeedType(logical, 'speed');
        }
    }


    // jsdoc
    addSpeedType(logical, key) {
        this.x += (logical) ? -this[key] : this[key];
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
            if (!this.climbing) {
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
        return this.yBottom < this.groundLevel || !this.grounded;
    }


    jump() {
        this.setObjectValue('speedY', 12.5);    // y value!!!
        this.setObjectValue('isJumpStart', true);
        this.setObjectValue('isJumping', true);
        this.setObjectValue('isFallStart', true);
        this.setObjectValue('isFalling', true);
    }


    // in use?
    loadImage(flipBook, i) {
        let path = flipBook[i];
        this.img = this.imageCache[path];
    }
}