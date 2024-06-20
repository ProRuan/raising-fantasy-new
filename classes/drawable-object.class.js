class DrawableObject {
    indent = 0;


    // jsdoc
    constructor(source, x, y) {
        this.setUp(source, x, y);
    }


    // jsdoc
    get xLeft() {
        return this.x + this.indent;
    }


    // jsdoc
    get xCenter() {
        return this.x + this.width / 2;
    }


    // jsdoc
    get xRight() {
        return this.x + (this.width - this.indent);
    }


    // jsdoc
    get yTop() {
        return this.y + this.indent;
    }


    // jsdoc
    get yCenter() {
        return this.y + this.height / 2;
    }


    // jsdoc
    get yBottom() {
        return this.y + (this.height - this.indent);
    }


    // jsdoc
    setUp(source, x, y) {
        this.setImage(source);
        this.setPosition(x, y);
    }


    // jsdoc
    setImage(source) {
        this.setPath(source);
        this.setSize(source);
    }


    // jsdoc
    setPath(source) {
        if (source.path) {
            this.img = new Image();
            this.img.src = source.path;
        }
    }


    // jsdoc
    setSize(source) {
        this.width = this.getSize(source, 'width');
        this.height = this.getSize(source, 'height');
    }


    // jsdoc
    getSize(source, key) {
        return (source.height) ? source[key] : source.size;
    }


    // jsdoc
    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }


    // jsdoc
    setX(x) {
        this.x = x;
    }


    // jsdoc
    setY(y) {
        this.y = canvas.height - this.height - y;
    }


    // jsdoc
    getBody() {
        return {
            'xLeft': this.getBodyCoord('x', 'xLeft'),
            'xCenter': this.getBodyCoord('x', 'xCenter'),
            'xRight': this.getBodyCoord('x', 'xRight'),
            'yTop': this.getBodyCoord('y', 'yTop'),
            'yCenter': this.getBodyCoord('y', 'yCenter'),
            'yBottom': this.getBodyCoord('y', 'yBottom')
        };
    }


    // jsdoc
    getBodyCoord(key, subkey) {
        return this[key] + this.bodyXY[subkey];
    }


    // jsdoc
    getWeapon() {
        return {
            'xLeft': this.getWeaponCoord('xCenter', 'xLeft', 'xRight'),
            'xRight': this.getWeaponCoord('xCenter', 'xRight', 'xLeft'),
            'yTop': this.getWeaponCoord('y', 'yTop'),
            'yBottom': this.getWeaponCoord('y', 'yBottom')
        };
    }


    // jsdoc
    getWeaponCoord(key, subkeyA, subkeyB) {
        if (isUndefined(subkeyB)) {
            return this.getWeaponValue(key, subkeyA);
        } else {
            return this.getWeaponX(key, subkeyA, subkeyB);
        }
    }


    // jsdoc
    getWeaponX(key, subkeyA, subkeyB) {
        if (!isTrue(this.otherDirection)) {
            return this.getWeaponValue(key, subkeyA, true);
        } else {
            return this.getWeaponValue(key, subkeyB, false);
        }
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


    // jsdoc
    isOpened() {
        return this.opened == true;
    }


    // jsdoc
    loadImages() {
        this.setCurrentImage(0);
        this.setImageCache();
        this.setImages();
    }


    // jsdoc
    setCurrentImage(n) {
        this.currentImage = n;
    }


    // jsdoc
    setImageCache() {
        this.imageCache = [];
    }


    // jsdoc
    setImages(flipBook) {
        flipBook = this.getImages(flipBook);
        flipBook.forEach((chapter) => {
            this.addImage(chapter);
        });
    }


    // jsdoc
    getImages(flipBook) {
        return (flipBook) ? flipBook : this.flipBook;
    }


    // jsdoc
    addImage(chapter) {
        let img = new Image();
        img.src = chapter;
        this.imageCache[chapter] = img;
    }


    // jsdoc
    setFlipBook(source) {
        this.flipBook = new FlipBook(source.flipBook);
    }


    // jsdoc
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    // jsdoc
    isImage(fileName) {
        return this.img.src.includes(fileName);
    }


    // jsdoc
    setSpeed(s, r, y) {
        this.speed = s / 60;
        (r) ? this.runSpeed = r / 60 : false;
        (y) ? this.speedY = y / 60 : false;
    }


    // jsdoc
    applySpeedType(key, logical, type) {
        this[key] += (logical) ? -this[type] : this[type];
    }


    // jsdoc
    move(subfunction) {
        this.setPauseableInterval(subfunction, 1000 / 60);
    }


    // jsdoc
    setPauseableInterval(subfunction, ms) {
        if (!this.interval) {
            this.interval = new PauseableInterval(subfunction, ms);
        } else {
            this.interval2 = new PauseableInterval(subfunction, ms);
        }
    }


    // jsdoc
    stop(logical) {
        this.pauseInterval(logical, this.interval);
        this.pauseInterval(logical, this.interval2);
    }


    // jsdoc
    pauseInterval(logical, interval) {
        if (interval) {
            (logical) ? interval.stop() : interval.play();
        }
    }


    // jsdoc
    floatPermanently() {
        this.float();
        this.keep();
    }


    // jsdoc
    float() {
        this.x -= this.speed;
    }


    // jsdoc
    keep() {
        if (isGreater(this.x, -this.width)) {
            this.x = world.size * canvas.width;
        }
    }


    // jsdoc
    effect() {
        this.triggerEffect();
        this.playSound(this.sound);
    }


    // jsdoc
    playAnimation(images) {
        images = this.getImages(images);
        this.showImage(images);
        this.currentImage++;
    }


    // jsdoc
    showImage(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
    }


    // jsdoc
    playSound(path, currentTime) {
        let audio = new Audio(path);
        audio.currentTime = this.getCurrentTime(currentTime);
        audio.volume = this.getSoundVolume();
        audio.play();
    }


    // jsdoc
    getCurrentTime(currentTime) {
        return (currentTime) ? currentTime : 0;
    }


    // jsdoc
    getSoundVolume() {
        return volume.sound / 10;
    }
}