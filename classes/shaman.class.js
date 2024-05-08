class Shaman extends MoveableObject {
    directory = 'img/bosses/shaman/';
    flipBook = FLIP_BOOK_SHAMAN;
    // magicalBook = FLIP_BOOK_MAGIC;
    speed = 128 / 60;    // to edit
    speedRun = 256 / 60;    // to edit
    otherDirection = true;
    energy = 300;
    hit = false;
    dying = false;
    dead = false;

    radDispl = 16;

    lastMagic = 0;
    magicFrequencies = [0, 4, 7];
    angerCounter = 0;
    angry = false;
    lastHit = 0;

    // (11, 2.09375)


    CAST_MAGIC_BLADE = './audio/elemental_magic/magic_blade_cast.wav';
    CAST_MAGIC_FIRE = './audio/elemental_magic/magic_fire_cast.wav';
    CAST_MAGIC_LIGHTNING = './audio/elemental_magic/magic_lightning_cast.wav';
    SOUND_ANGER = './audio/attacks_and_creatures/shaman_growl.wav';


    // TO EDIT!!!


    constructor(x, y) {
        super(x, y);    // to edit
        this.setSize(256);
        this.setCover('shaman')
        // this.loadImage(FLIP_BOOK_SHAMAN.MAGIC_FIRE[4]);
        this.loadImage(this.cover);
        this.loadFlipBookImages(this.flipBook);
        // this.loadFlipBookImages(this.magicalBook);
        this.animate();


        // this.idle();
    }


    get xCenter() {
        return this.x + 72;
    }


    get xLeft() {
        return this.xCenter - 16;
    }


    get xRight() {
        return this.xCenter + 32;
    }


    get yCenter() {
        return this.y + 154;
    }


    get yTop() {
        return this.yCenter - 50;
    }


    get yBottom() {
        return this.yCenter + 52;
    }


    get xMagicBlade() {
        return this.xRight / 64 - 4;
    }


    get yMagicBlade() {
        return this.y / 64 - 4.375;
    }


    get xMagicFire() {
        return this.x / 64 - 2.625;
    }


    get yMagicFire() {
        return this.y / 64 - 4.625;
    }


    get xMagicLightning() {
        return (world.hero.xCenter + 128) / 64;
    }


    get yMagicLightning() {
        return (world.hero.yCenter - 200 - 128) / 64;
    }


    castBlade() {    // blade as of 500
        setInterval(() => {
            this.playAnimation(FLIP_BOOK_SHAMAN.MAGIC_BLADE);
        }, 100);
    }


    castFire() {    // fire as of 500 (or 600)
        setInterval(() => {
            this.playAnimation(FLIP_BOOK_SHAMAN.MAGIC_FIRE);
        }, 100);
    }


    castLightning() {    // lightning as of 500 (600)
        setInterval(() => {
            this.playAnimation(FLIP_BOOK_SHAMAN.MAGIC_LIGHTNING);
        }, 100);
    }


    attack() {
        return new ShamanBlade(this).attack(world.hero);
    }


    idle() {
        // this.playAnimationIdle(FLIP_BOOK_SHAMAN.IDLE);
        // setTimeout(() => {
        //     this.idle();
        // }, 4 * (1000 / 6));

        setInterval(() => {
            this.playAnimation(FLIP_BOOK_SHAMAN.IDLE);
        }, 1000 / 6);
    }


    loadFlipBookImages(flipBook) {    // double code !!!
        for (const [key, value] of Object.entries(flipBook)) {
            if (Array.isArray(value)) {
                this.loadImages(flipBook[key]);
            }
        }
    }


    animate() {
        setInterval(() => {
            if (world && world.hero.reachedFinalSection) {
                // this.attack();


                if (this.dead && world.GRASS_FLYING[world.GRASS_FLYING.length - 1].y > 472) {
                    world.GRASS_FLYING[world.GRASS_FLYING.length - 3].y -= 64 / 60;
                    world.GRASS_FLYING[world.GRASS_FLYING.length - 2].y -= 64 / 60;
                    world.GRASS_FLYING[world.GRASS_FLYING.length - 1].y -= 64 / 60;
                }


                if (this.hitBomb()) {
                    let currentTime = new Date().getTime();
                    if (currentTime - this.lastHit > 700 && !world.bomb.inTouch) {
                        world.bomb.inTouch = true;
                        this.currentImage = 0;
                        // this.energy -= 150;
                        this.energy -= 30;
                        this.lastHit = currentTime;
                        // console.log('bomb hit', this.energy);
                    }
                }


                if (world.endbossMagic) {
                    if (world.endbossMagic instanceof Blade) {
                        if (world.hero.isIncludingMagic()) {
                            if (!world.endbossMagic.inTouch) {
                                world.endbossMagic.inTouch = true;
                                setTimeout(() => {
                                    delete world.endbossMagic;
                                    this.animating = false;
                                    this.lastMagic = new Date().getTime();
                                }, 400);
                            }
                        }


                        if (world.endbossMagic.x < world.endbossMagic.xEnd) {
                            delete world.endbossMagic;
                            this.animating = false;
                            this.lastMagic = new Date().getTime();

                            // console.log('magic deleted');
                        }
                    }


                    if (world.endbossMagic instanceof Fire) {
                        if (world.hero.isIncludingMagic()) {
                            if (!world.endbossMagic.inTouch) {
                                world.endbossMagic.inTouch = true;
                                setTimeout(() => {
                                    delete world.endbossMagic;
                                    this.animating = false;
                                    this.lastMagic = new Date().getTime();
                                }, 700);
                            }
                        }


                        if (world.endbossMagic.x < world.endbossMagic.xEnd) {
                            delete world.endbossMagic;
                            this.animating = false;
                            this.lastMagic = new Date().getTime();

                            // console.log('magic deleted');
                        }
                    }


                    if (world.endbossMagic !== undefined && world.endbossMagic instanceof Lightning) {
                        if (!this.noticed) {
                            this.noticed = true;
                            setTimeout(() => {
                                delete world.endbossMagic;
                                this.animating = false;
                                this.lastMagic = new Date().getTime();
                                this.noticed = false;

                                // console.log('magic deleted');
                            }, 3700);
                        }
                    }
                }


                if (this.energy > 210) {
                    this.magicFrequencies = [0, 4, 7];
                } else if (this.energy > 90) {
                    this.magicFrequencies = [0, 3, 6];
                } else {
                    this.magicFrequencies = [0, 2, 5];
                }

                this.playAnimationAnger(300, 0);
                this.playAnimationAnger(180, 1);
                this.playAnimationAnger(90, 2);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (world && world.hero.reachedFinalSection) {
                let currentTime = new Date().getTime();
                if (this.dead) {
                    this.loadImage(FLIP_BOOK_SHAMAN.DEATH[FLIP_BOOK_SHAMAN.DEATH.length - 1]);
                } else if (this.energy <= 0) {
                    if (!this.dying) {
                        this.dying = true;
                        setTimeout(() => {
                            this.dead = true;
                            this.playSound(this.SOUND_ANGER);
                            setTimeout(() => {
                                this.playSound(this.SOUND_ANGER);
                                setTimeout(() => {
                                    this.playSound(this.SOUND_ANGER);
                                }, 50);
                            }, 50);
                        }, (FLIP_BOOK_SHAMAN.DEATH.length - 1) * 100);
                    }
                    this.playAnimation(FLIP_BOOK_SHAMAN.DEATH);
                } else if (this.angry) {
                    // console.log('angry');
                    this.playAnimation(FLIP_BOOK_SHAMAN.ANGER);
                } else if (currentTime - this.lastHit < 700) {
                    this.playAnimationHurt();
                } else if (currentTime - this.lastMagic > 300) {
                    let magic = Math.round(Math.random() * 10);
                    // console.log(magic);
                    if (magic > this.magicFrequencies[2] && !this.animating) {
                        this.setAnimation('MAGIC_LIGHTNING');
                        this.setMagicBook(Lightning, this.xMagicLightning, this.yMagicLightning);
                        this.setFlipBookIdle();
                        this.playSound(this.CAST_MAGIC_LIGHTNING);
                        setTimeout(() => {
                            this.playSound(this.CAST_MAGIC_LIGHTNING);
                        }, 3150);
                    } else if (magic > this.magicFrequencies[1] && !this.animating) {
                        this.setAnimation('MAGIC_FIRE');
                        this.setMagicBook(Fire, this.xMagicFire, this.yMagicFire);
                        this.setFlipBookIdle();
                        this.playSound(this.CAST_MAGIC_FIRE);
                    } else if (magic > this.magicFrequencies[0] && !this.animating) {
                        this.setAnimation('MAGIC_BLADE');
                        this.setMagicBook(Blade, this.xMagicBlade, this.yMagicBlade);
                        this.setFlipBookIdle();
                        this.playSound(this.CAST_MAGIC_BLADE);
                    }
                    this.playAnimation(this.currentFlipBook);
                } else {
                    this.playAnimation(FLIP_BOOK_SHAMAN.IDLE);
                }


                // Magic Lightning / Fire / Blade
                // this.currentFlipBook = FLIP_BOOK_SHAMAN.IDLE;
                // let currentTime = new Date().getTime();
                // if (currentTime - this.lastMagic > 3000) {
                //     let magic = Math.round(Math.random() * 10);
                //     // console.log(magic);
                //     if (magic > this.magicFrequencies[2] && !this.animating) {
                //         this.setAnimation('MAGIC_LIGHTNING');
                //         this.setMagicBook(Lightning, this.xMagicLightning, this.yMagicLightning);
                //         this.setFlipBookIdle();
                //     } else if (magic > this.magicFrequencies[1] && !this.animating) {
                //         this.setAnimation('MAGIC_FIRE');
                //         this.setMagicBook(Fire, this.xMagicFire, this.yMagicFire);
                //         this.setFlipBookIdle();
                //     } else if (magic > this.magicFrequencies[0] && !this.animating) {
                //         this.setAnimation('MAGIC_BLADE');
                //         this.setMagicBook(Blade, this.xMagicBlade, this.yMagicBlade);
                //         this.setFlipBookIdle();
                //     }
                // }
                // this.playAnimation(this.currentFlipBook);


                // this.playAnimation(FLIP_BOOK_SHAMAN.IDLE);
            }





            //     if (world) {
            //         if (this.dead) {
            //             this.loadImage(FLIP_BOOK_SHAMAN.DEATH[FLIP_BOOK_SHAMAN.DEATH.length - 1]);
            //         } else if (this.energy <= 0) {
            //             if (!this.dying) {
            //                 this.currentImage = 0;
            //                 this.dying = true;
            //             }
            //             this.playAnimation(FLIP_BOOK_SHAMAN.DEATH);
            //             console.log(this.img);
            //             setTimeout(() => {
            //                 this.dead = true;
            //             }, 500);
            //         } else
            //             // if (world.bomb !== undefined && this.isIncluding(world.bomb.xCenter, world.bomb.yCenter)) {
            //             //     world.bomb.inTouch = true;
            //             //     if (!this.isHit) {
            //             //         this.isHit = true;
            //             //         // this.energy -= 100;
            //             //         this.energy -= 30;
            //             //         // console.log(this.energy);
            //             //         this.playAnimation(FLIP_BOOK_SHAMAN.HURT);
            //             //         setTimeout(() => {
            //             //             delete world.bomb;
            //             //             // world.bombs.splice(0, 1);
            //             //             this.isHit = false;
            //             //             // setTimeout(() => {
            //             //             //     world.bombs.splice(0, 1);
            //             //             //     world.bombs.push(new Bomb((world.hero.x - 40) / 64, (540 - world.hero.y + 17) / 64));
            //             //             // }, 1000);
            //             //         }, 700);
            //             //     }
            //             // }
            //             if (world.keyboard.keyA.keydown && world.hero.attack(this)) {
            //                 if (!this.paralysed) {
            //                     this.currentImage = 0;
            //                     this.paralysed = true;
            //                     setTimeout(() => {
            //                         this.paralysed = false;
            //                     }, 200);
            //                 }
            //                 this.playAnimation(FLIP_BOOK_SHAMAN.HURT);
            //                 if (this.energy <= 0) {
            //                     this.dying = true;
            //                 }
            //             } else {
            //                 this.loadImage(FLIP_BOOK_SHAMAN.cover);
            //             }
            //         // this.playAnimation(FLIP_BOOK_SHAMAN.ATTACK);

            //         // if (world.hero.xCenter > this.x) {
            //         //     this.playAnimation(FLIP_BOOK_SHAMAN.ATTACK);
            //         // }
            //     }
        }, 100);
    }


    isIncluding(x, y) {    // double code!!!
        return this.isHorizontalCenter(x) && this.isVerticalCenter(y);
    }


    isHorizontalCenter(x) {
        return this.xLeft < x && x < this.xRight;
    }


    isVerticalCenter(y) {
        return this.yTop < y && y < this.yBottom;
    }


    setAnimation(chapter) {
        this.currentImage = 0;
        this.animating = true;
        this.currentFlipBook = FLIP_BOOK_SHAMAN[chapter];
    }


    setMagicBook(Magic, x, y) {
        setTimeout(() => {
            world.endbossMagic = new Magic(x, y);
        }, (this.currentFlipBook.length - 1) * 100);
    }


    setFlipBookIdle() {
        setTimeout(() => {
            this.currentFlipBook = FLIP_BOOK_SHAMAN.IDLE;
        }, (this.currentFlipBook.length - 1) * 100);
    }


    playAnimationAnger(hp, value) {
        if (this.energy <= hp && this.angerCounter == value && new Date().getTime() - this.lastHit > 700) {
            if (!this.angry) {
                this.currentImage = 0;
                this.angry = true;
                this.playSound(this.SOUND_ANGER);
                setTimeout(() => {
                    this.angerCounter++;
                    this.angry = false;
                }, 2 * (FLIP_BOOK_SHAMAN.ANGER.length - 1) * 100);
            }
        }
    }


    playAnimationHurt() {
        if (this.currentImage < FLIP_BOOK_SHAMAN.HURT.length) {
            this.playAnimation(FLIP_BOOK_SHAMAN.HURT);
        } else {
            this.loadImage(FLIP_BOOK_SHAMAN.HURT[FLIP_BOOK_SHAMAN.HURT.length - 1]);
        }
    }


    hitBomb() {
        if (world.bomb) {
            let hitX = this.xLeft < world.bomb.xCenter && world.bomb.xCenter < this.xRight;
            let hitY = this.yTop < world.bomb.yCenter && world.bomb.yCenter < this.yBottom;
            return hitX && hitY;
        }
    }
}