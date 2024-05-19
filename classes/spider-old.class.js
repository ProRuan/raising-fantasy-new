class Spider extends MoveableObject {
    groundLevel = 484;

    webHit = false;
    waiting = false;
    shot = false;

    // spiderWeb = new Audio('./audio/attacks_and_creatures/web_throw.wav');
    spiderGrowl = new Audio('./audio/attacks_and_creatures/spider_growl.wav');
    swordHit = './audio/attacks_and_creatures/weapon_impact.wav';


    constructor(x, y) {
        super(x, y);    // Please verfiy!!!

        this.animate();
        // this.applyGravity();
    }


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
                if (this.shot) {    // improve shot by interval
                    this.shot = false;
                    this.playAnimationOnce(FLIP_BOOK_SPIDER.ATTACK);
                }
            }
        }, 100);
    }
}