class Ent extends MoveableObject {
    speed = 64 / 60;
    energy = 100;


    groundLevel = 484;

    dying = false;
    dead = false;

    startTime = new Date().getTime();
    lastHit = 0;

    radDispl = 104;
    radDisplAttack = 24;
    // 10.25, 1.625

    entGrowl = new Audio('./audio/attacks_and_creatures/ent_growl.wav');
    swordHit = './audio/attacks_and_creatures/weapon_impact.wav';


    constructor(x, y) {
        super(x, y);    // Please verfiy!!!
        this.animate();
        this.applyGravity();
    }


    get xLeftAttack() {
        // return (this.otherDirection) ? this.x + 156 : this.x + 156;
        return (this.otherDirection) ? this.xCenter - 40 : this.xCenter + 40;
        // return this.x + 156;
    }


    get xRightAttack() {
        // return (this.otherDirection) ? this.x + 228 : this.x + 228;
        return (this.otherDirection) ? this.xCenter - 112 : this.xCenter + 112;
        // return this.x + 228;
    }


    get yTopAttack() {
        return this.y + 112;
    }


    get yBottomAttack() {
        return this.y + 176;
    }


    attack() {
        // console.log('attack');
        let enemy = world.hero;
        // console.log(enemy.xLeft, enemy.xRight, this.xLeftAttack, this.xRightAttack);
        let hitLeft;
        let hitRight;
        if (this.otherDirection) {
            hitLeft = this.xLeftAttack > enemy.xLeft && enemy.xLeft > this.xRightAttack;
            hitRight = this.xLeftAttack > enemy.xRight && enemy.xRight > this.xRightAttack;
        } else {
            hitLeft = this.xLeftAttack < enemy.xLeft && enemy.xLeft < this.xRightAttack;
            hitRight = this.xLeftAttack < enemy.xRight && enemy.xRight < this.xRightAttack;
        }
        let hitTop = this.yTopAttack < enemy.yTop && enemy.yTop < this.yBottomAttack;
        let hitBottom = this.yTopAttack < enemy.yBottom && enemy.yBottom < this.yBottomAttack;
        // console.log(hitLeft, hitRight, hitTop, hitBottom);
        return (hitLeft || hitRight) && (hitTop || hitBottom);
    }


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
            if (!this.waySet) {
                this.xStart = this.x;
                this.xWest = this.xStart - 5.25 * 64;
                this.waySet = true;
                // console.log(this.x, this.xStart, this.xWest);
            }

            // console.log('ent: ', this.yBottom);

            // this.attack();
            // if (!this.attack()) {
            //     this.patrol();
            // }


            // this.isSubtending(world.hero);


            if (world) {

                if (world.keyboard.keyA.keydown && world.hero.attack(this)) {
                    let currentTime = new Date().getTime();
                    if (currentTime - this.lastHit > 500) {
                        this.energy -= 20;
                        // console.log(this.energy);
                        this.lastHit = currentTime;
                    }
                }


                if (!this.dead && !this.attack(world.hero)) {
                    if (this.x < this.xWest && this.otherDirection || this.xStart < this.x && !this.otherDirection) {
                        if (!this.waitingStop) {
                            this.waitingStop = true;
                            this.walking = false;
                            setTimeout(() => {
                                this.otherDirection = (!this.otherDirection) ? true : false;
                                this.waitingStop = false;
                                this.walking = true;
                            }, 3000);
                            // console.log('case A');
                        }
                    } else if (!(keyboard.keyA.keydown && world.hero.attack())) {
                        this.walking = true;
                        (this.otherDirection) ? this.x -= this.speed : this.x += this.speed;
                    }
                    // console.log('case B');
                }


                // if (!this.dead && !this.attack(world.hero)) {
                //     // Call it patrol!!!
                //     this.walking = true;
                //     if (this.otherDirection && this.x > this.xWest) {
                //         this.x -= this.speed;
                //     } else if (this.x < this.xStart) {
                //         this.otherDirection = false;
                //         this.x += this.speed
                //     } else {
                //         this.otherDirection = true;
                //     }
                // }


                if (!this.dead && this.attack()) {
                    this.entGrowl.play();
                }


                if (this.dying && !this.dead) {
                    this.entGrowl.play();
                }


                this.isOnTile();
            }
        }, 1000 / 60);


        setInterval(() => {
            if (world) {
                if (this.dying) {
                    if (!this.dead) {
                        this.currentImage = 0;
                        this.playAnimationOnce(FLIP_BOOK_ENT.DEATH);
                        this.dead = true;
                        // splice!!!
                    }
                } else if (world.keyboard.keyA.keydown && world.hero.attack(this)) {
                    if (!this.paralysed) {
                        this.currentImage = 0;
                        this.paralysed = true;
                        this.playSound(this.swordHit);
                        setTimeout(() => {
                            this.paralysed = false;
                        }, 400);
                    }
                    this.playAnimation(FLIP_BOOK_ENT.HURT);
                    if (this.energy <= 0) {
                        this.dying = true;
                    }
                } else if (this.attack(world.hero)) {
                    this.playAnimation(FLIP_BOOK_ENT.ATTACK);
                } else if (this.walking) {
                    this.playAnimation(FLIP_BOOK_ENT.WALK);
                } else {
                    this.playAnimation(FLIP_BOOK_ENT.IDLE);
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
        // console.log(this.xLeftAttack, world.hero.xCenter, this.xRightAttack);
        return (hitLeft || hitRight) && (hitTop || hitBottom);
    }

}