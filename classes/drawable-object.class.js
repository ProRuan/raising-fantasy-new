class DrawableObject {
    indent = 0;


    constructor(path, x, y) {
        this.setImage(path);
        this.setPosition(x, y);
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


    setImage(path) {
        this.setPath(path);
        this.setSize();
    }


    setPath(path) {
        this.img = new Image();
        this.img.src = path;
    }


    setSize() {
        this.setWidth();
        this.setHeight();
    }


    setWidth() {
        let scaleFactor = canvas.width / NATIVE_WIDTH;
        this.width = this.img.width * scaleFactor;
    }


    setHeight() {
        let aspectRatio = this.img.height / this.img.width;
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


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }




    drawFrame(ctx) {
        if (this instanceof Button) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.xLeft, this.yTop, this.xRight - this.xLeft, this.yBottom - this.yTop);
            ctx.stroke();
        }
    }
}