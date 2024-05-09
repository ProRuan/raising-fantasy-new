class Knight extends MoveableObject {
    directory = 'img/characters/knight/';
    flipBook = FLIP_BOOK_HERO;
    speed = 128 / 60;
    speedExtraAttack = 0;
    speedRun = 256 / 60;
    energy = 120;

    currentFlipBook = this.flipBook.IDLE;
    lastIdle = new Date().getTime();

    coins = 0;
    crystals = 0;
    hit_points = 0;
    leaves = 0;


    groundLevel = 484;

    dying = false;
    dead = false;
    yLadderMax = 228 - 108;    // not in use, right?
    yLadderMin = 272 + 100;    // not in use, right?
    climbing = false;

    radDispl = 24;
    // 4.4375, 0.625


    AMBIENCE_SOUND = new Audio('./audio/ambience/nature_forest_daytime.wav');
    BOSS_BATTLE = new Audio('./audio/epic_fantasy/boss_battle_lufus.wav');
    SWORD_DRAW = './audio/attacks_and_creatures/blade_draw.wav';
    ARMOR_HIT = '.audio/attacks_and_creatures/cloth_armor_hit.wav';
    FOOTSTEP = './audio/footsteps/grass.wav';

    soundUpgrade = SOUND_UPGRADE;;


    constructor() {
        super(3.75 + 0 * 15, 0.625);    // Please set!!!
        this.setCover('knight');
        this.loadImage(this.cover);
        this.loadFlipBookImages(this.flipBook);
        this.animate();
        this.applyGravity();
        this.removeDeadEnemies();
    }


    get xLeft() {
        return this.x + HERO_X_LEFT;    // before a wrong value - is all working?!?
    }


    get xCenter() {
        return this.x + HERO_X_CENTER;
    }


    get xRight() {
        return this.x + HERO_X_RIGHT;
    }


    get yTop() {
        return this.y + 64;
    }


    get yCenter() {
        return this.y + 88;
    }


    get yBottom() {
        return this.y + 112;
    }


    get hpPoints() {
        return this.world.hpbar.points;
    }


    get energyPoints() {
        return this.world.energyBar.points;
    }


    get staminaPoints() {
        return this.world.staminaBar.points;
    }


    get xCamera() {
        return this.x - CAMERA_X_OFFSET;
    }


    attack() {    // add parameter enemy!!!
        return new Sword(this).attack();    // Improve this + subsequent methods!!!
    }


    attackWalk() {
        return new Sword(this).attackWalk(world.spider);
    }


    attackExtra() {
        return new Sword(this).attackExtra(world.spider);
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
            // console.log(new Date().getTime() - world.levelWatch);    // Set Knight's Watch!!!

            // Please set a condition!!!
            if (this.world.selectedLevelDisplayed == true) {
                if (AUDIO_START_SCREEN.volume > 0.1) {
                    AUDIO_START_SCREEN.volume -= 0.02;
                } else {
                    AUDIO_START_SCREEN.pause();
                    AUDIO_START_SCREEN.currentTime = 0;
                    AUDIO_START_SCREEN.volume = 0.4;
                }
                this.AMBIENCE_SOUND.play();
            }

            if (world.sound_pursuing) {
                world.sound_pursuing.play();
            }

            world.pursuing = world.ENEMIES.find(e => e.pursuing == true);
            if (world.sound_pursuing && !world.pursuing && world.sound_pursuing.volume > 0.01) {
                world.sound_pursuing.volume = Math.round(world.sound_pursuing.volume * 1000) / 1000 - 0.001;
                console.log(Math.round(world.sound_pursuing.volume * 1000) / 1000);
            } else if (world.sound_pursuing && !world.pursuing) {
                console.log(world.sound_pursuing.volume);
                delete world.sound_pursuing;
            }


            // if (world.endbossMagic && this.isIncludingMagic()) {
            //     this.playAnimation(FLIP_BOOK_HERO.HURT);
            //     console.log(this.xCenter, world.endbossMagic.xCenter);
            // }


            if (this.yBottom > this.groundLevel) {
                console.log('knight: ', this.yBottom, 'ground level: ', this.groundLevel);
            }

            // if (this.hit()) {
            //     this.energy -= 5;
            //     // console.log(this.energy);
            //     setTimeout(() => {
            //         this.world.blade = new Blade(10.75, -0.5);
            //     }, 500);
            // }
            this.climbing = false;
            if (this.isKey('keydown', 'arrowUp') && this.world.LADDERS.find(s => this.isIncluding(s.xCenter, s.yTop))) {
                // console.log('climbing up', this.y);
                this.climbing = true;
                this.climb(true);
            }
            if (this.isKey('keydown', 'arrowDown') && this.world.LADDERS.find(s => this.isIncluding(s.xCenter, s.yCenter - 1))) {
                // console.log('climbing down', this.y);
                this.climbing = true;
                this.climb(false);
            }
            if (this.isKey('keydown', 'arrowLeft') && this.x > this.world.level.X_LEVEL_START) {
                this.move(false);
                this.setOtherDirection(true);
            }
            if (this.isKey('keydown', 'arrowRight') && this.x < this.world.level.X_LEVEL_END) {
                this.move(true);
                this.setOtherDirection(false);
            }
            if (this.isKey('keydown', 'space') && !this.isAboveGround()) {
                this.jump();
            }
            if (this.isKey('keydown', 'keyQ')) {
                this.setOtherDirection(true);
                // this.world.dino.otherDirection = true;
                // this.world.ent.otherDirection = true;
                // this.world.spider.otherDirection = true;
                this.world.endboss.otherDirection = true;
                // this.world.endbossMagic.otherDirection = true;
            }
            if (this.isKey('keydown', 'keyE')) {
                this.setOtherDirection(false);
                // this.world.dino.otherDirection = false;
                // this.world.ent.otherDirection = false;
                // this.world.spider.otherDirection = false;
                this.world.endboss.otherDirection = false;
                // this.world.endbossMagic.otherDirection = false;
            }
            if (this.bombSkillUnlocked && world.energyBar.points.length == 100 && this.isKey('keydown', 'keyF') && this.world.bomb === undefined) {
                world.energyBar.points = [];
                this.world.bomb = new Bomb((world.hero.x - 40) / 64, (540 - world.hero.y + 17) / 64);
                this.playSound(this.world.bomb.soundThrow);

                // world.bombs.splice(0, 1);
                // world.bombs.push(new Bomb((world.hero.x - 40) / 64, (540 - world.hero.y + 17) / 64));
            }
            if (this.world.bomb !== undefined && this.world.bomb.y > 540) {
                delete this.world.bomb;
            }

            // if (this.isKey('keydown', 'keyA')) {
            //     this.hpPoints.splice(this.hpPoints.length - 1, 4);
            // }
            if (this.isKey('keydown', 'keyA')) {
                this.staminaBar.points.splice(this.staminaBar.points.length - 1, 1);
                this.attack();
            }
            if (this.isKey('keydown', 'keyD')) {
                this.energyBar.points.splice(this.energyBar.points.length - 1, 1);
            }
            if (!world.ENDBOSS.dead && !(this.x < world.level.X_CAMERA_END)) {
                this.reachedFinalSection = true;
                this.world.level.X_LEVEL_START = (LEVEL_SIZE - 1) * ORIGINAL_CANVAS_WIDTH + 28;
                this.AMBIENCE_SOUND.muted = true;
                setTimeout(() => {
                    this.BOSS_BATTLE.volume = 0.4;
                    this.BOSS_BATTLE.play();
                }, 800);
            }
            if (this.BOSS_BATTLE.volume <= 0.1) {
                this.AMBIENCE_SOUND.muted = false;
                this.BOSS_BATTLE.pause();
            }
            if (this.AMBIENCE_SOUND.muted && world.ENDBOSS.energy <= 0) {
                this.BOSS_BATTLE.volume -= 0.001;
            }
            if (!this.reachedFinalSection && this.x > 284 && this.x < world.level.X_CAMERA_END) {
                this.world.camera_x = -this.x + 4 * 64 + 28;    // + 4 * 64 + 28

                // this.world.characterInfo.x = this.x - 284;
                this.world.avatarImage.x = this.x - 284 + this.world.avatarImage.translation;
                this.world.avatarFrame.x = this.x - 284 + this.world.avatarFrame.translation;
                this.updateAvatarInfoX('hpBar', 'bg');
                this.updateAvatarInfoX('hpBar', 'border');
                this.updateAvatarInfoX('energyBar', 'bg');
                this.updateAvatarInfoX('energyBar', 'border');
                this.updateAvatarInfoX('staminaBar', 'bg');
                this.updateAvatarInfoX('staminaBar', 'border');
                this.world.hpBar.updatePointX();
                this.world.energyBar.updatePointX();
                this.world.staminaBar.updatePointX();
                this.world.itemBg.x = this.x - 284 + this.world.itemBg.translation;
                this.world.itemBomb.x = this.x - 284 + this.world.itemBomb.translation;
                this.world.itemBorder.x = this.x - 284 + this.world.itemBorder.translation;

            }


            // this.world.energyBar.updatePointX();
            // this.world.staminaBar.updatePointX();


            this.isOnTile();
            this.collect('leaves');
            this.collect('coins');
            this.collect('crystals');
            this.collect('hit_points');
            // this.collectCoinNew();
            // this.collectCoin();
            this.hit();
        }, 1000 / 60);


        setInterval(() => {
            if (this.dead) {
                this.loadImage(FLIP_BOOK_HERO.DEATH[FLIP_BOOK_HERO.DEATH.length - 1]);
            } else if (this.energy <= 0) {
                if (!this.dying) {
                    this.currentImage = 0;
                    this.dying = true;
                }
                this.playAnimation(FLIP_BOOK_HERO.DEATH);
                console.log(this.img);
                setTimeout(() => {
                    this.dead = true;
                }, 900);
            } else

                if (world.endbossMagic && this.isIncludingMagic()) {
                    this.playAnimation(FLIP_BOOK_HERO.HURT);
                    if (world.endbossMagic instanceof Lightning) {
                        this.energy -= 5;
                        this.hpPoints.splice(this.hpPoints.length - 1 - 5, 5);
                        console.log('lightning hit: ', this.hpPoints.length);
                    } else if (world.endbossMagic instanceof Fire) {
                        this.energy -= 4;
                        this.hpPoints.splice(this.hpPoints.length - 1 - 4, 4);
                        console.log('fire hit: ', this.hpPoints.length);
                    } else if (world.endbossMagic instanceof Blade) {
                        this.energy -= 5;
                        this.hpPoints.splice(this.hpPoints.length - 1 - 5, 5);
                        console.log('blade hit: ', this.hpPoints.length);
                    }
                    this.playSound(this.ARMOR_HIT);
                } else

                    // if (world.lightnings.length > 0 && world.lightnings[0] !== undefined && this.isIncluding(world.lightnings[0].xCenter, world.lightnings[0].yCenter)) {
                    //     world.lightnings[0].inTouch = true;
                    //     if (this.isIncluding(this.world.lightnings[0].xCenter, this.world.lightnings[0].yCenter)) {
                    //         console.log('lightning touch');
                    //     }
                    //     if (!this.isHit) {
                    //         this.isHit = true;
                    //         this.energy -= 15;
                    //         // this.energy -= 30;
                    //         console.log(this.energy);
                    //         this.playAnimation(FLIP_BOOK_HERO.HURT);
                    //         setTimeout(() => {
                    //             delete world.lightnings[0];
                    //             // world.bombs.splice(0, 1);
                    //             this.isHit = false;
                    //             setTimeout(() => {
                    //                 world.lightnings.splice(0, 1);
                    //                 world.lightnings.push(new Lightning(4.75, 0.4));
                    //             }, 1000);
                    //         }, 700);
                    //     }
                    // } else 

                    // if (world.fires.length > 0 && world.fires[0] !== undefined && this.isIncluding(world.fires[0].xCenter, world.fires[0].yCenter)) {
                    //     world.fires[0].inTouch = true;
                    //     if (!this.isHit) {
                    //         this.isHit = true;
                    //         this.energy -= 15;
                    //         // this.energy -= 30;
                    //         // console.log(this.energy);
                    //         this.playAnimationOnce(FLIP_BOOK_HERO.HURT);
                    //         setTimeout(() => {
                    //             delete world.fires[0];
                    //             // world.bombs.splice(0, 1);
                    //             this.isHit = false;
                    //             setTimeout(() => {
                    //                 world.fires.splice(0, 1);
                    //                 world.fires.push(new Fire(8, -0.5));
                    //             }, 1000);
                    //         }, 700);
                    //     }
                    // } else

                    // if (world.blades.length > 0 && world.blades[0] !== undefined && this.isIncluding(world.blades[0].xCenter, world.blades[0].yCenter)) {
                    //     world.blades[0].inTouch = true;
                    //     if (!this.isHit) {
                    //         this.isHit = true;
                    //         this.energy -= 15;
                    //         // this.energy -= 30;
                    //         // console.log(this.energy);
                    //         this.playAnimation(FLIP_BOOK_HERO.HURT);
                    //         setTimeout(() => {
                    //             delete world.blades[0];
                    //             // world.bombs.splice(0, 1);
                    //             this.isHit = false;
                    //             setTimeout(() => {
                    //                 world.blades.splice(0, 1);
                    //                 world.blades.push(new Blade(10.75, -0.5));
                    //             }, 1000);
                    //         }, 400);
                    //     }
                    // } else

                    // if (world.dino.attack()) {
                    //     if (!this.isHit) {
                    //         console.log('hit');
                    //         this.currentImage = 0;
                    //         this.isHit = true;
                    //         this.energy -= 20;
                    //         this.world.characterInfo.hpCounter -= 20;
                    //         this.hpPoints.splice(this.hpPoints.length - 20, 20);
                    //         this.playAnimationOnce(FLIP_BOOK_HERO.HURT);
                    //         setTimeout(() => {
                    //             this.isHit = false;
                    //         }, 500);
                    //     }
                    // } else

                    // if (this.world.webs.length > 0 && this.isIncluding(this.world.webs[0].xCenter, this.world.webs[0].yCenter)) {
                    //     if (!this.isHit) {
                    //         console.log('hit');
                    //         this.currentImage = 0;
                    //         this.isHit = true;
                    //         this.energy -= 20;
                    //         this.world.characterInfo.hpCounter -= 20;
                    //         this.hpPoints.splice(this.hpPoints.length - 20, 20);
                    //         this.playAnimationOnce(FLIP_BOOK_HERO.HURT);
                    //         this.world.spider.webHit = true;
                    //         this.world.webs.splice(0, 1);
                    //         // this.world.spider.waiting = false;
                    //         setTimeout(() => {
                    //             this.isHit = false;
                    //         }, 500);
                    //     }
                    // } else

                    if (this.isKey('keydown', 'arrowUp', 'arrowDown') && this.climbing) {
                        this.playAnimation(FLIP_BOOK_HERO.CLIMB);    // still to edit
                    } else if (this.isKey('keydown', 'keyD')) {
                        this.playAnimation(FLIP_BOOK_HERO.EXTRA_ATTACK);
                    } else if (this.isJumpStart && this.speedY > 0) {
                        this.playAnimationJumpStart(FLIP_BOOK_HERO.JUMP);
                        this.isJumpStart = false;
                    } else if (this.isJumping && this.speedY > 0) {
                        this.loadImage(FLIP_BOOK_HERO.JUMP[2]);
                    } else if (this.isFallStart && this.speedY <= 0) {
                        this.playAnimationFallStart(FLIP_BOOK_HERO.JUMP);
                        this.isJumping = false;
                        this.isFallStart = false;
                    } else if (this.isFalling && this.speedY < 0) {
                        this.loadImage(FLIP_BOOK_HERO.JUMP[5]);
                    } else if (this.isFalling && this.speedY == 0) {
                        this.loadImage(FLIP_BOOK_HERO.JUMP[6]);
                        this.isFalling = false;
                    } else if (this.isKey('doubleClick', 'arrowLeft', 'arrowRight') && this.isKey('keydown', 'keyA')) {
                        this.playAnimation(FLIP_BOOK_HERO.RUN_ATTACK);
                        if (this.img.src.includes(FLIP_BOOK_HERO.RUN_ATTACK[2])) {
                            this.playSound(this.FOOTSTEP);
                        }
                        if (this.img.src.includes(FLIP_BOOK_HERO.RUN_ATTACK[6])) {
                            this.playSound(this.FOOTSTEP);
                        }
                        if (this.img.src.includes(FLIP_BOOK_HERO.RUN_ATTACK[3])) {
                            this.playSound(this.SWORD_DRAW);
                        }
                    } else if (this.isKey('doubleClick', 'arrowLeft', 'arrowRight')) {
                        this.playAnimation(FLIP_BOOK_HERO.RUN);
                        if (this.img.src.includes(FLIP_BOOK_HERO.RUN[2])) {
                            this.playSound(this.FOOTSTEP);
                        }
                        if (this.img.src.includes(FLIP_BOOK_HERO.RUN[6])) {
                            this.playSound(this.FOOTSTEP);
                        }
                    } else if (this.isKey('keydown', 'arrowLeft', 'arrowRight') && this.isKey('keydown', 'keyA')) {
                        this.playAnimation(FLIP_BOOK_HERO.WALK_ATTACK);
                        if (this.img.src.includes(FLIP_BOOK_HERO.WALK_ATTACK[2])) {
                            this.playSound(this.FOOTSTEP);
                        }
                        if (this.img.src.includes(FLIP_BOOK_HERO.WALK_ATTACK[5])) {
                            this.playSound(this.FOOTSTEP);
                        }
                        if (this.img.src.includes(FLIP_BOOK_HERO.WALK_ATTACK[3])) {
                            this.playSound(this.SWORD_DRAW);
                        }
                    } else if (this.isKey('keydown', 'arrowLeft', 'arrowRight') && this.isPushing()) {
                        this.playAnimation(FLIP_BOOK_HERO.PUSH);
                    } else if (this.isKey('keydown', 'arrowLeft', 'arrowRight')) {
                        this.playAnimation(FLIP_BOOK_HERO.WALK);
                        if (this.img.src.includes(FLIP_BOOK_HERO.WALK[2])) {
                            this.playSound(this.FOOTSTEP);
                        }
                        if (this.img.src.includes(FLIP_BOOK_HERO.WALK[5])) {
                            this.playSound(this.FOOTSTEP);
                        }
                    } else if (this.isKey('keydown', 'keyA')) {
                        this.playAnimation(FLIP_BOOK_HERO.ATTACK);
                        if (this.img.src.includes(FLIP_BOOK_HERO.ATTACK[1])) {
                            this.playSound(this.SWORD_DRAW);
                        }
                    } else if (!keyboard.keydown) {
                        let currentTime = new Date().getTime();
                        if (currentTime - this.lastIdle > 6000) {
                            this.playAnimation(FLIP_BOOK_HERO.IDLE);
                            if (!this.idleDelaySet) {
                                this.idleDelaySet = true;
                                setTimeout(() => {
                                    this.lastIdle = currentTime;
                                    this.idleDelaySet = false;
                                    // console.log('set idle delay');
                                }, 1100);
                            }
                            // console.log(this.img);
                        } else {
                            this.loadImage(FLIP_BOOK_HERO.cover);
                            this.currentFlipBook = this.flipBook.IDLE;
                        }
                    }
        }, 100);
    }


    isKey(keyValue, keyCodeA, keyCodeB) {
        if (!keyCodeB) {
            return this.getKeyValue(keyCodeA, keyValue);
        } else {
            return this.getKeyValue(keyCodeA, keyValue) || this.getKeyValue(keyCodeB, keyValue);
        }
    }


    getKeyValue(keyCode, keyValue) {
        return this.world.keyboard[keyCode][keyValue];
    }


    setOtherDirection(locigal) {
        this.otherDirection = (locigal) ? true : false;
    }


    amBoden() {
        let tempGrass = [];
        world.GRASS_FLYING.forEach((grass) => {
            if (grass.y + 16 > this.yBottom && (grass.xLeft < this.xCenter && this.xCenter < grass.xRight)) {
                tempGrass.push(grass);
            }
        });
        console.log(tempGrass);
        return tempGrass;
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
            if (this.otherDirection && !this.world.level.previousLevelEndOtherDirection && this.yBottom > 484) {
                this.world.level.X_LEVEL_START = this.xLeft - 52;
                this.world.level.previousLevelEndOtherDirection = true;
            } else if (!this.world.level.previousLevelEnd && this.yBottom > 484) {
                this.world.level.X_LEVEL_END = this.xLeft + 20;
                this.world.level.previousLevelEnd = true;
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
        return this.world[key].find(o => this.xCenter < o.xLeft && o.xLeft < this.xRight);
    }


    isOnObjectCenter(key) {
        return this.world[key].find(o => o.xLeft < this.xCenter && this.xCenter < o.xRight);
    }


    isOnObjectEnd(key) {
        return this.world[key].find(o => this.xLeft < o.xRight && o.xRight < this.xCenter);
    }


    collectCoin() {
        let coin = this.world.COINS.find(c => this.isIncluding(c.xCenter, c.yCenter));
        if (coin) {
            let coinId = this.world.COINS.findIndex(c => c.xCenter == coin.xCenter && c.yCenter == coin.yCenter);
            this.world.COINS.splice(coinId, 1);
            this.coins++;
        }
    }


    isIncluding(x, y) {
        return this.isHorizontalCenter(x) && this.isVerticalCenter(y);
    }


    isHorizontalCenter(x) {
        return this.xLeft < x && x < this.xRight;
    }


    isVerticalCenter(y) {
        return this.yTop < y && y < this.yBottom;
    }


    isPushing() {
        return this.pushing !== undefined && this.pushing;
    }


    hit() {
        if (this.isIncluding(this.world.blade.xCenter, this.world.blade.yCenter)) {
            // console.log('blade hit');
            // this.playAnimation(FLIP_BOOK_HERO.HURT);
            return true;
        };
    }


    collect(item) {
        let key = this.getKey(item);
        let object = this.getObject(key);
        if (object) {
            this.removeObject(key, object);
            this.increaseCounter(item);
            this.playSound(object.sound);
            if (object instanceof Crystal) {
                this.bombSkillUnlocked = true;
                this.playSound(this.soundUpgrade);
                this.world.level.setXLevelEnd();
                this.world.level.setXLevelStartCrystal();
            }
        }
    }


    getKey(item) {
        return item.toUpperCase();
    }


    getObject(key) {
        return world[key].find(o => this.isCollecting(o));
    }


    isCollecting(o) {
        let touchingLeft = this.xLeft < o.xLeft && o.xLeft < this.xRight;
        let touchingRight = this.xLeft < o.xRight && o.xRight < this.xRight;
        let touchingTop = this.yTop < o.yTop && o.yTop < this.yBottom;
        let touchingBottom = this.yTop < o.yBottom && o.yBottom < this.yBottom;
        return (touchingLeft || touchingRight) && (touchingTop || touchingBottom);
    }


    removeObject(key, object) {
        let objectId = world[key].findIndex(o => this.getId(o, object));
        world[key].splice(objectId, 1);
    }


    getId(o, object) {
        return o.xCenter == object.xCenter && o.yCenter == object.yCenter;
    }


    increaseCounter(item) {
        this[item]++;
    }


    collectCoinNew() {
        let coin = this.world.COINS.find(c => this.isIncludingCoin(c));
        if (coin) {
            let coinId = this.world.COINS.findIndex(c => c.xCenter == coin.xCenter && c.yCenter == coin.yCenter);
            this.world.COINS.splice(coinId, 1);
            this.coins++;
        }
    }


    isIncludingCoin(coin) {
        let touchXLeft = this.xLeft < coin.xLeft && coin.xLeft < this.xRight;
        let touchXRight = this.xLeft < coin.xRight && coin.xRight < this.xRight;
        let touchYTop = this.yTop < coin.yTop && coin.yTop < this.yBottom;
        let touchYBottom = this.yTop < coin.yBottom && coin.yBottom < this.yBottom;
        return (touchXLeft || touchXRight) && (touchYTop || touchYBottom);
    }


    isIncludingMagic() {
        let magic = world.endbossMagic;
        let touchXLeft = this.xLeft <= magic.xLeft && magic.xLeft <= this.xRight;
        let touchXRight = this.xLeft <= magic.xRight && magic.xRight <= this.xRight;
        let touchYTop = this.yTop <= magic.yTop && magic.yTop <= this.yBottom;
        let touchYBottom = this.yTop <= magic.yBottom && magic.yBottom <= this.yBottom;
        // console.log(touchXLeft, touchXRight, touchYTop, touchYBottom);
        return (touchXLeft || touchXRight) && (touchYTop || touchYBottom);
    }
}