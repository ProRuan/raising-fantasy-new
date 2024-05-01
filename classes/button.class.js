class Button extends DrawableObject {
    indent = 4;
    targeted = false;
    pressed = false;


    constructor(path, x, y) {
        super(path, x, y);
    }


    // resetHover

    // draw Button with and without hover


    drawHover(ctx) {
        if (this.isTargeted()) {
            this.setShadow(ctx, 'yellow', 16);
        }
    }


    isTargeted() {
        return this.targeted == true;
    }


    setShadow(ctx, color, blur) {
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
    }


    // methods ... ???


    // class Path
    // sub classes AudioPath + ImagePath ...


    // audioPath = new AudioPath();
    // dino.sound = audioPath.dinoGrowl
    // ...
}