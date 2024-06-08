class DrawableObject {
    indent = 0;


    constructor(source, x, y) {
        this.setUp(source, x, y);
    }


    // Make a class CoordinateSystem?!?


    get xLeft() {
        return this.x + this.indent;
    }


    get xCenter() {
        return this.x + this.width / 2;
    }


    get xRight() {
        return this.x + (this.width - this.indent);
    }


    get yTop() {
        return this.y + this.indent;
    }


    get yCenter() {
        return this.y + this.height / 2;
    }


    get yBottom() {
        return this.y + (this.height - this.indent);
    }


    setUp(source, x, y) {
        this.setImage(source);
        this.setPosition(x, y);
        this.addDrawableObject();
    }


    setImage(source) {
        this.setPath(source);
        this.setSize(source);
    }


    setPath(source) {
        if (source.path) {
            this.img = new Image();
            this.img.src = source.path;
        }
    }


    setSize(source) {
        this.setWidth(source);
        this.setHeight(source);
    }


    setWidth(source) {
        let scaleFactor = canvas.width / NATIVE_WIDTH;
        this.width = (source.height) ? source.width * scaleFactor : source.size * scaleFactor;
    }


    setHeight(source) {
        let aspectRatio = (source.height) ? source.height / this.width : source.size / this.width;
        this.height = this.width * aspectRatio;
    }


    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }


    setX(x) {
        this.x = x;
    }


    setY(y) {
        this.y = canvas.height - this.height - y;
    }


    addDrawableObject() {    // rename and move?
        drawableObjects.push(this);
    }


    // in use???
    setBorder(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }


    // jsdoc
    isOpened() {
        return this.opened == true;
    }


    loadImages() {
        this.setCurrentImage(0);
        this.setImageCache();
        this.setImages();
    }


    setCurrentImage(n) {
        this.currentImage = n;
    }


    setImageCache() {
        this.imageCache = [];
    }


    setImages() {
        this.flipBook.forEach(chapter => {
            let img = new Image();
            img.src = chapter;
            this.imageCache[chapter] = img;
        });
    }


    setFlipBook(source) {
        this.flipBook = new FlipBook(source.flipBook);
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    // jsdoc
    isImage(fileName) {
        return this.img.src.includes(fileName);
    }




    // only for testing!!!
    drawFrame(ctx) {
        if (this instanceof Knight) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.body.xCenter, this.body.yTop, 0, this.body.yBottom - this.body.yTop);
            ctx.rect(this.body.xLeft, this.body.yTop, this.body.xRight - this.body.xLeft, this.body.yBottom - this.body.yTop);
            ctx.rect(this.weapon.xLeft, this.weapon.yTop, this.weapon.xRight - this.weapon.xLeft, this.weapon.yBottom - this.weapon.yTop);
            ctx.stroke();
        }


        if (this instanceof Shaman) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            // ctx.rect(this.body.xCenter, this.body.yTop, 0, this.body.yBottom - this.body.yTop);
            ctx.rect(this.body.xLeft, this.body.yTop, this.body.xRight - this.body.xLeft, this.body.yBottom - this.body.yTop);
            // ctx.rect(this.weapon.xLeft, this.weapon.yTop, this.weapon.xRight - this.weapon.xLeft, this.weapon.yBottom - this.weapon.yTop);
            ctx.stroke();
        }


        if (this instanceof Bomb) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.body.xCenter, this.body.yTop, 0, this.body.yBottom - this.body.yTop);
            ctx.rect(this.body.xLeft, this.body.yTop, this.body.xRight - this.body.xLeft, this.body.yBottom - this.body.yTop);
            ctx.stroke();
        }
    }




    // to check, clean and move!!!
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
    floatPermanently() {
        this.float();
        this.keep();
    }


    float() {
        this.x -= this.speed;
    }


    // to edit
    keep() {
        if (this.x < -this.width) {
            this.x = LEVEL_SIZE * canvas.width;    // level size
        }
    }


    // jsdoc
    move(subfunction) {
        this.setPauseableInterval(subfunction, 1000 / 60);
    }


    setPauseableInterval(subfunction, ms) {
        // this.interval = new PauseableInterval(subfunction, ms);

        if (!this.interval) {
            this.interval = new PauseableInterval(subfunction, ms);
        } else {
            this.interval2 = new PauseableInterval(subfunction, ms);
        }
    }


    stop(logical) {
        (logical) ? this.interval.stop() : this.interval.play();

        if (this.interval2) {
            (logical) ? this.interval2.stop() : this.interval2.play();
        }
    }


    setStoppableInterval(subfunction, interval) {    // to delete later?
        let id = setInterval(subfunction, interval);
        intervalIds.push(id);
    }


    // jsdoc
    effect() {
        this.triggerEffect();
        this.playSound(this.sound);
    }


    playAnimation(images) {
        if (isUndefined(images)) {
            images = this.flipBook;
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playSound(path, currentTime) {    // double code!!!
        let audio = new Audio(path);
        if (currentTime) {
            audio.currentTime = currentTime;
        }
        audio.volume = soundVolume;
        audio.play();
    }


    // playSound(path) {    // double code!!!
    //     new Audio(path).play();
    // }
}