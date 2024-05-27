class Blade extends MagicObject {
    
    sound = SOUND_MAGIC_FIRE_HIT;


    constructor(x, y) {
        super(x, y, 'Blade');
        this.xStart = this.x;
        this.xEnd = this.xStart - 12 * 64 - 64;
        this.move();
        this.animate();
    }
}