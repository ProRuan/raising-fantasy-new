class Dino extends MoveableObject {
    groundLevel = 484;

    dinoGrowl = new Audio('./audio/attacks_and_creatures/dino_growl.wav');
    swordHit = './audio/attacks_and_creatures/weapon_impact.wav';


    constructor(x, y) {
        super(x, y);    // Please verfiy!!!
        this.setSpeed(64);
        this.animate();
        this.applyGravity();
    }


    animate() {
        setInterval(() => {
            if (world) {

                // Call it pursue!!!
                if (!this.dead && world.hero.xCenter + 80 < this.xCenter) {
                    this.pursuing = this.xCenter - world.hero.xCenter < 5 * 64 && this.yTop < world.hero.yCenter && world.hero.yCenter < this.yBottom;
                    if (this.pursuing) {
                        this.otherDirection = true;
                    }
                } else if (!this.dead && this.xCenter < world.hero.xCenter - 80) {
                    this.pursuing = world.hero.xCenter - this.xCenter < 5 * 64 && this.yTop < world.hero.yCenter && world.hero.yCenter < this.yBottom;
                    if (this.pursuing) {
                        this.otherDirection = false;
                    }
                }

                if (!this.dead && this.pursuing) {
                    if (!world.sound_pursuing) {
                        world.sound_pursuing = new Audio('./audio/epic_fantasy/04 - Dancing In Human Flesh - Loop Version - Epic Fantasy - Lufus.wav');
                    }
                    if (world.sound_pursuing.volume != 0.4) {
                        world.sound_pursuing.volume = 0.4;
                    }
                    this.searching = true;
                    this.searchingDelay = false;
                    if (this.attack() || keyboard.keyA.keydown && world.hero.attack()) {
                        this.walking = false;
                    } else {
                        this.walking = true;
                        (this.otherDirection) ? this.x -= this.speed : this.x += this.speed;
                    }
                } else if (!this.dead && this.searching && !this.searchingDelay) {
                    this.pursuitStop = new Date().getTime();
                    this.searchingDelay = true;
                } else if (!this.dead && this.searching) {
                    let currentTime = new Date().getTime();
                    if (currentTime - this.pursuitStop > 5000) {
                        this.searching = false;
                        this.searchingDelay = false;
                        this.walking = false;
                    } else {
                        this.walking = true;
                        (this.otherDirection) ? this.x -= this.speed : this.x += this.speed;
                    }
                }


                if (this.attack()) {
                    this.dinoGrowl.play();
                }


                if (this.dying && !this.dead) {
                    this.dinoGrowl.play();
                }


                this.isOnTile();
            }
        }, 1000 / 60);
    }
}