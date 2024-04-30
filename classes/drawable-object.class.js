class DrawableObject {


    constructor(path, x, y) {
        this.setImage(path);
        this.setPosition(x, y);
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
}