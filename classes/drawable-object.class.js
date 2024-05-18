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
    }


    setImage(source) {
        this.setPath(source);
        this.setSize(source);
    }


    setPath(source) {
        this.img = new Image();
        this.img.src = source.path;
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


    setBorder(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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




    // only for testing!!!
    drawFrame(ctx) {
        if (this instanceof Knight) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.xCenter, this.yTop, 0, this.yBottom - this.yTop);
            ctx.rect(this.xLeft, this.yTop, this.xRight - this.xLeft, this.yBottom - this.yTop);
            ctx.rect(this.xLeftAttack, this.yTopAttack, this.xRightAttack - this.xLeftAttack, this.yBottomAttack - this.yTopAttack);
            ctx.stroke();
        }


        if (this instanceof Ent) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.body.xCenter, this.body.yTop, 0, this.body.yBottom - this.body.yTop);
            ctx.rect(this.body.xLeft, this.body.yTop, this.body.xRight - this.body.xLeft, this.body.yBottom - this.body.yTop);
            ctx.rect(this.weapon.xLeft, this.weapon.yTop, this.weapon.xRight - this.weapon.xLeft, this.weapon.yBottom - this.weapon.yTop);
            // ctx.rect(this.weapon.xLeft, this.weapon.yTop, this.weapon.xRight - this.weapon.xLeft, this.weapon.yBottom - this.weapon.yTop);
            ctx.stroke();
        }
    }




    // to check, clean and move!!!
    setSpeed(s, r) {
        this.speed = s / 60;
        (r) ? this.runSpeed = r / 60 : false;
    }


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
            this.x = 1 * canvas.width;
            // this.x = LEVEL_SIZE * world.canvas.width;    // level size
        }
    }


    move(subfunction) {
        this.setStoppableInterval(subfunction, 1000 / 60);
    }


    setStoppableInterval(subfunction, interval) {
        let id = setInterval(subfunction, interval);
        intervalIds.push(id);
    }


    // jsdoc
    effect() {
        this.triggerEffect();
        this.playSound(this.sound);
    }


    playSound(path) {    // double code!!!
        new Audio(path).play();
    }
}