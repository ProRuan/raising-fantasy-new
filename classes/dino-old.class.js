class Dino extends MoveableObject {
    directory = 'img/enemies/dino/';
    flipBook = FLIP_BOOK_DINO;
    groundLevel = 484;
    energy = 100;

    otherDirection = true;
    dying = false;
    dead = false;

    startTime = new Date().getTime();
    lastHit = 0;

    radDispl = 40;
    // 7.75, 0.25

    dinoGrowl = new Audio('./audio/attacks_and_creatures/dino_growl.wav');
    swordHit = './audio/attacks_and_creatures/weapon_impact.wav';


    constructor(x, y) {
        super(x, y);    // Please verfiy!!!
        this.setSpeed(64);
        this.setCover('dino');
        this.loadImage(this.cover);
        this.loadFlipBookImages(this.flipBook);
        this.animate();
        this.applyGravity();
    }

    // 500 - 548 - 576

    get xLeft() {
        // return (this.otherDirection) ? this.xCenter - 48 : this.xCenter + 48;
        return (this.otherDirection) ? this.x + 4 : this.x + 4 + 104;
    }


    get xCenter() {
        return this.x + 52;
    }


    get xRight() {
        // return (this.otherDirection) ? this.xCenter + 28 : this.xCenter - 28;
        return (this.otherDirection) ? this.x + 80 : this.x + 80 + 104;
    }


    get yTop() {
        return this.y + 44;
    }


    get yCenter() {
        return this.y + 66;
    }


    get yBottom() {
        return this.y + 88;
    }


    get xLeftAttack() {
        return (this.otherDirection) ? this.xCenter - 44 : this.xCenter + 44;
        // return this.x + 96;
    }


    get xRightAttack() {
        return (this.otherDirection) ? this.xCenter - 68 : this.xCenter + 68;
        // return this.x + 124;
    }


    get yTopAttack() {
        return this.y + 52;
    }


    get yBottomAttack() {
        return this.y + 80;
    }


    attack() {
        if (this.isSubtending(world.hero)) {
            // console.log('bite');
            this.walking = false;
            this.x = this.x;
            return true;
        }
    }


    // Use attack method from ent or spider!!!

    // attack() {
    //     // console.log('attack');
    //     let enemy = world.hero;
    //     // console.log(enemy.xLeft, enemy.xRight, this.xLeftAttack, this.xRightAttack);
    //     let hitLeft;
    //     let hitRight;
    //     if (this.otherDirection) {
    //         hitLeft = this.xLeftAttack > enemy.xLeft && enemy.xLeft > this.xRightAttack;
    //         hitRight = this.xLeftAttack > enemy.xRight && enemy.xRight > this.xRightAttack;
    //     } else {
    //         hitLeft = this.xLeftAttack < enemy.xLeft && enemy.xLeft < this.xRightAttack;
    //         hitRight = this.xLeftAttack < enemy.xRight && enemy.xRight < this.xRightAttack;
    //     }
    //     let hitTop = this.yTopAttack < enemy.yTop && enemy.yTop < this.yBottomAttack;
    //     let hitBottom = this.yTopAttack < enemy.yBottom && enemy.yBottom < this.yBottomAttack;
    //     // console.log(hitLeft, hitRight, hitTop, hitBottom);
    //     return (hitLeft || hitRight) && (hitTop || hitBottom);
    // }


    walk() {
        (this.otherDirection) ? this.x -= this.speed : this.x += this.speed;
    }


    patrol() {
        this.currentTime = new Date().getTime();
        if ((this.currentTime - this.startTime) % 40000 > 20000) {
            this.otherDirection = false;
        } else {
            this.otherDirection = true;
        }

        if ((this.currentTime - this.startTime) % 4000 > 2000) {
            this.walking = true;
            this.walk();
            // console.log('walking', (this.currentTime - this.startTime) % 4000);
        } else {
            this.walking = false;
            // console.log('idling', (this.currentTime - this.startTime) % 4000);
        }
    }


    loadFlipBookImages(flipBook) {
        for (const [key, value] of Object.entries(flipBook)) {
            if (Array.isArray(value)) {
                this.loadImages(flipBook[key]);
            }
        }
    }


    animate() {
        setInterval(() => {
            if (world) {
                if (!this.dead && world.keyboard.keyA.keydown && world.hero.attack()) {
                    let currentTime = new Date().getTime();
                    if (currentTime - this.lastHit > 500) {
                        this.energy -= 20;
                        console.log(this.energy);
                        this.lastHit = currentTime;
                    }
                }


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


        setInterval(() => {
            if (world) {
                if (this.dying) {
                    if (!this.dead) {
                        this.currentImage = 0;
                        this.playAnimationOnce(FLIP_BOOK_DINO.DEATH);
                        this.dead = true;
                        // splice!!!
                    }
                } else if (world.keyboard.keyA.keydown && world.hero.attack()) {
                    if (!this.paralysed) {
                        this.currentImage = 0;
                        this.paralysed = true;
                        this.playSound(this.swordHit);
                        setTimeout(() => {
                            this.paralysed = false;
                        }, 400);
                    }
                    this.playAnimation(FLIP_BOOK_DINO.HURT);
                    if (this.energy <= 0) {
                        this.dying = true;
                    }
                } else if (this.attack()) {
                    this.playAnimation(FLIP_BOOK_DINO.ATTACK);
                } else if (this.walking) {
                    this.playAnimation(FLIP_BOOK_DINO.WALK);
                } else {
                    this.playAnimation(FLIP_BOOK_DINO.IDLE);
                }
            }
        }, 100);
    }


    isOnTile() {
        if (this.isOnGrassFlying()) {
            if (this.isOnGrassFlyingStart()) {
                this.groundLevel = this.isOnGrassFlyingStart().y + 8;
            } else if (this.isOnGrassFlyingCenter()) {
                this.groundLevel = this.isOnGrassFlyingCenter().y + 8;
            } else if (this.isOnGrassFlyingEnd()) {
                this.groundLevel = this.isOnGrassFlyingEnd().y + 8;
            }
            this.grounded = true;
        } else if (this.isOnGrassStart() || this.isOnGrassCenter() || this.isOnGrassEnd()) {
            if (this.isOnGrassStart()) {
                this.groundLevel = this.isOnGrassStart().y + 8;
            } else if (this.isOnGrassCenter()) {
                this.groundLevel = this.isOnGrassCenter().y + 8;
            } else if (this.isOnGrassEnd()) {
                this.groundLevel = this.isOnGrassEnd().y + 8;
            }
            this.grounded = true;
        } else {
            this.grounded = false;
            this.groundLevel = 650;
            // if (this.otherDirection && !world.level.previousLevelEndOtherDirection && this.yBottom > 482) {
            //     world.level.X_LEVEL_START = this.xLeft - 52;
            //     world.level.previousLevelEndOtherDirection = true;
            // } else if (!world.level.previousLevelEnd && this.yBottom > 482) {
            //     world.level.X_LEVEL_END = this.xLeft + 20;
            //     world.level.previousLevelEnd = true;
            // }
        }
    }


    isOnGrassFlying() {
        let tempGrass = [];
        world.GRASS_FLYING.forEach((grass) => {
            if (grass.y + 16 > this.yBottom && (
                this.xCenter < grass.xLeft && grass.xLeft < this.xRight ||
                grass.xLeft < this.xCenter && this.xCenter < grass.xRight ||
                this.xLeft < grass.xRight && grass.xRight < this.xCenter)) {
                tempGrass.push(grass);
            }
        });
        return (tempGrass.length > 0) ? true : false;

        // return this.world.GRASS_FLYING.find(g =>
        //     this.yBottom > g.y &&
        //     (this.xCenter < g.xLeft && g.xLeft < this.xRight ||
        //     g.xLeft < this.xCenter && this.xCenter < g.xRight ||
        //     this.xLeft < g.xRight && g.xRight < this.xCenter)
        // );
    }


    isOnGrassStart() {
        return world.GRASS.find(g => this.xCenter < g.xLeft && g.xLeft < this.xRight);
    }


    isOnGrassCenter() {
        return world.GRASS.find(g => g.xLeft < this.xCenter && this.xCenter < g.xRight);
    }


    isOnGrassEnd() {
        return world.GRASS.find(g => this.xLeft < g.xRight && g.xRight < this.xCenter);
    }


    isSubtending(enemy) {
        let hitLeft = enemy.xLeft < this.xLeftAttack && this.xLeftAttack < enemy.xRight;
        let hitRight = enemy.xLeft < this.xRightAttack && this.xRightAttack < enemy.xRight;
        let hitTop = enemy.yTop < this.yTopAttack && this.yTopAttack < enemy.yBottom;
        let hitBottom = enemy.yTop < this.yBottomAttack && this.yBottomAttack < enemy.yBottom;
        // console.log('dino: ', hitLeft, hitRight, hitTop, hitBottom);
        return (hitLeft || hitRight) && (hitTop || hitBottom);
    }

}