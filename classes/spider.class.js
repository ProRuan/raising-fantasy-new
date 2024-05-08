class Spider extends MoveableObject {
    directory = 'img/enemies/spider/';
    flipBook = FLIP_BOOK_SPIDER;
    speed = 64 / 60;
    energy = 100;


    groundLevel = 484;

    otherDirection = true;
    dying = false;
    dead = false;
    yStairwayMax = 228 - 108;
    yStairwayMin = 272 + 100;
    climbing = false;

    webHit = false;
    waiting = false;
    shot = false;

    startTime = new Date().getTime();
    lastHit = 0;

    radDispl = 64;
    // 12.25, 0.1875


    // spiderWeb = new Audio('./audio/attacks_and_creatures/web_throw.wav');
    spiderGrowl = new Audio('./audio/attacks_and_creatures/spider_growl.wav');
    swordHit = './audio/attacks_and_creatures/weapon_impact.wav';


    // TO EDIT!!!


    constructor(x, y) {
        super(x, y);    // Please verfiy!!!
        this.setCover('spider');
        this.loadImage(this.cover);
        this.loadFlipBookImages(this.flipBook);
        this.animate();
        // this.applyGravity();
    }


    get xLeft() {
        return (this.otherDirection) ? this.x + 40 : this.x + 40;
        // return this.x + 40;
    }


    get xCenter() {
        return this.x + 64;
    }


    get xRight() {
        return (this.otherDirection) ? this.x + 88 : this.x + 88;
        // return this.x + 88;
    }


    get yTop() {
        return this.y + 44;
    }


    get yCenter() {
        return this.y + 64;
    }


    get yBottom() {
        return this.y + 84;
    }


    get xLeftAttack() {
        return (this.otherDirection) ? this.xCenter - 24 : this.xCenter + 24;
        // return this.x + 96;
    }


    get xRightAttack() {
        return (this.otherDirection) ? this.xCenter - 36 : this.xCenter + 36;
        // return this.x + 124;
    }


    get yTopAttack() {
        return this.y + 60;
    }


    get yBottomAttack() {
        return this.y + 80;
    }


    // webAttack


    attack() {
        // console.log('attack');
        let enemy = world.hero;
        // console.log(enemy.xLeft, enemy.xRight, this.xLeftAttack, this.xRightAttack);
        let hitLeft;
        let hitRight;
        if (this.otherDirection) {
            hitLeft = enemy.xRight + 512 > this.xLeftAttack && this.xLeftAttack > enemy.xLeft + 32;
            hitRight = enemy.xRight + 512 > this.xRightAttack && this.xRightAttack > enemy.xLeft + 32;
        } else {
            hitLeft = enemy.xLeft - 512 < this.xLeftAttack && this.xLeftAttack < enemy.xRight - 32;
            hitRight = enemy.xLeft - 512 < this.xRightAttack && this.xRightAttack < enemy.xRight - 32;
        }
        let hitTop = enemy.yTop < this.yTopAttack && this.yTopAttack < enemy.yBottom;
        let hitBottom = enemy.yTop < this.yBottomAttack && this.yBottomAttack < enemy.yBottom;
        // console.log(hitLeft, hitRight, hitTop, hitBottom);
        return (hitLeft || hitRight) && (hitTop || hitBottom);
    }


    throwWeb() {
        let xThrow = (this.otherDirection) ? this.x / 64 + 0.5 : this.x / 64 + this.radDispl / 64 + 0.5;
        let web = new Web(xThrow, (540 - this.y) / 64 - 1.315, this.otherDirection);
        world.webs.push(web);
        this.shot = true;
        // this.spiderWeb.play();
        // world.web = web;
        setTimeout(() => {
            if (!web.webHit) {
                world.webs.splice(0, 1);
                this.waiting = false;
            }
            // delete world.web;
        }, 3000);
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
            if (world) {
                if (world.hero.x + 16 < this.x) {
                    this.otherDirection = true;
                } else if (this.x < world.hero.x - 48) {
                    this.otherDirection = false;
                }
                // console.log('spider: ', this.yBottom);

                // this.attack();
                // if (!this.attack()) {
                //     this.patrol();
                // }

                if (world) {
                    if (!this.waiting && this.attack()) {
                        this.throwWeb();
                        this.waiting = true;
                    }


                    if (world.keyboard.keyA.keydown && world.hero.attack(this)) {
                        let currentTime = new Date().getTime();
                        if (currentTime - this.lastHit > 500) {
                            this.energy -= 10;
                            console.log(this.energy);
                            this.lastHit = currentTime;
                        }
                    }


                    if (this.dying && !this.dead) {
                        this.spiderGrowl.play();
                    }


                    this.isOnTile();
                }
            }
        }, 1000 / 60);


        setInterval(() => {
            if (world) {
                if (this.dying) {
                    if (!this.dead) {
                        this.currentImage = 0;
                        this.playAnimationOnce(FLIP_BOOK_SPIDER.DEATH);
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
                    this.playAnimation(FLIP_BOOK_SPIDER.HURT);
                    if (this.energy <= 0) {
                        this.dying = true;
                    }
                } else if (this.shot) {    // improve shot by interval
                    this.shot = false;
                    this.playAnimationOnce(FLIP_BOOK_SPIDER.ATTACK);
                } else if (this.walking) {
                    this.playAnimation(FLIP_BOOK_SPIDER.WALK);
                } else {
                    this.playAnimation(FLIP_BOOK_SPIDER.IDLE);
                }
            }
        }, 100);
    }


    isOnTile() {
        if (this.isOnGrassFlying()) {
            if (this.isOnObjectStart('GRASS_FLYING')) {
                this.groundLevel = this.isOnObjectStart('GRASS_FLYING').yTop;
            } else if (this.isOnObjectCenter('GRASS_FLYING')) {
                this.groundLevel = this.isOnObjectCenter('GRASS_FLYING').yTop;
            } else if (this.isOnObjectEnd('GRASS_FLYING')) {
                this.groundLevel = this.isOnObjectEnd('GRASS_FLYING').yTop;
            }
            this.grounded = true;
        } else if (this.isOnObjectStart('GRASS') || this.isOnObjectCenter('GRASS') || this.isOnObjectEnd('GRASS')) {
            if (this.isOnObjectStart('GRASS')) {
                this.groundLevel = this.isOnObjectStart('GRASS').yTop;
            } else if (this.isOnObjectCenter('GRASS')) {
                this.groundLevel = this.isOnObjectCenter('GRASS').yTop;
            } else if (this.isOnObjectEnd('GRASS')) {
                this.groundLevel = this.isOnObjectEnd('GRASS').yTop;
            }
            this.grounded = true;
        } else {
            this.grounded = false;
            this.groundLevel = 650;
            if (this.otherDirection && !world.level.previousLevelEndOtherDirection && this.yBottom > 484) {
                world.level.X_LEVEL_START = this.xLeft - 52;
                world.level.previousLevelEndOtherDirection = true;
            } else if (!world.level.previousLevelEnd && this.yBottom > 484) {
                world.level.X_LEVEL_END = this.xLeft + 20;
                world.level.previousLevelEnd = true;
            }
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
    }


    isOnObjectStart(key) {
        return world[key].find(o => this.xCenter < o.xLeft && o.xLeft < this.xRight);
    }


    isOnObjectCenter(key) {
        return world[key].find(o => o.xLeft < this.xCenter && this.xCenter < o.xRight);
    }


    isOnObjectEnd(key) {
        return world[key].find(o => this.xLeft < o.xRight && o.xRight < this.xCenter);
    }


    isSubtending(enemy) {
        let hitLeft = enemy.xLeft < this.xLeftAttack && this.xLeftAttack < enemy.xRight;
        let hitRight = enemy.xLeft < this.xRightAttack && this.xRightAttack < enemy.xRight;
        let hitTop = enemy.yTop < this.yTopAttack && this.yTopAttack < enemy.yBottom;
        let hitBottom = enemy.yTop < this.yBottomAttack && this.yBottomAttack < enemy.yBottom;
        return (hitLeft || hitRight) && (hitTop || hitBottom);
    }

}