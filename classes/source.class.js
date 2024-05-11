class Source {


    // edit all source files


    // to give to method below
    avatarImage = { path: './img/inner_interface/avatar_image.png', size: 64, x: 24, y: 452.5 };
    avatarFrame = { path: './img/inner_interface/avatar_frame.png', width: 76, height: 79, x: 16, y: 445 };

    hpBarBg = { path: './img/inner_interface/hp_bar_bg.png', width: 121, height: 14, x: 95, y: 503 };
    hpPoint = { path: './img/inner_interface/hp_point.png', width: 1, height: 12, y: 506 };
    hpBarBorder = { path: './img/inner_interface/hp_bar_border.png', width: 127, height: 20, x: 92, y: 500 };

    energyBarBg = { path: './img/inner_interface/state_bar_bg.png', width: 97, height: 13, x: 94.5, y: 484 };
    energyPoint = { path: './img/inner_interface/energy_point.png', width: 1, height: 10, y: 486 };
    energyBarBorder = { path: './img/inner_interface/state_bar_border.png', width: 102, height: 18, x: 92, y: 482 };

    staminaBarBg = { path: './img/inner_interface/state_bar_bg.png', width: 97, height: 13, x: 94.5, y: 466 };
    staminaPoint = { path: './img/inner_interface/stamina_point.png', width: 1, height: 10, y: 468 };
    staminaBarBorder = { path: './img/inner_interface/state_bar_border.png', width: 102, height: 18, x: 92, y: 464 };

    itemBg = { path: './img/inner_interface/item_bg.png', width: 34, height: 35, x: 23, y: 411.5 };
    itemBomb = { path: './img/inner_interface/item_bomb.png', size: 35, x: 22.5, y: 411.5 };
    itemBorder = { path: './img/inner_interface/item_border.png', size: 40, x: 20, y: 409 };


    blade = './img/bosses/magic/blade.png';
    fire = './img/bosses/magic/fire.png';
    lightning = './img/bosses/magic/lightning.png';




    // knightAnimation = [
    //     { condition: 'isRunAttack', chapter: 'runAttack' },
    //     { condition: 'isRun', chapter: 'run' },
    //     { condition: 'isWalkAttack', chapter: 'walkAttack' },
    //     { condition: 'isWalk', chapter: 'walk' },
    //     { condition: 'isAttack', chapter: 'attack' }
    // ];

    // knightRunAttack = { condition: 'isRunAttack', chapter: 'runAttack' };
    // knightRun = { condition: 'isRun', chapter: 'run' };
    // knightWalkAttack = { condition: 'isWalkAttack', chapter: 'walkAttack' };
    // knightWalk = { condition: 'isWalk', chapter: 'walk' };
    // knightAttack = { condition: 'isAttack', chapter: 'attack' };




    // audio

    // swordDraw = './audio/attacks_and_creatures/blade_draw.wav';


    constructor() {
        this.loadImagePaths();    // to think about!!!

        this.setLevel();
        this.setHero();
    }


    setSource(name, path, width, height) {
        if (height) {
            this[name] = { path: path, width: width, height: height };
        } else {
            this[name] = { path: path, size: width };
        }
    }


    // jsdoc
    setLevel() {
        this.setBackground();
        this.setGrass();
        this.setSimpleObjects();
        this.setAnimatedObjects();
        this.setLeaf();
        this.setEndboss();
        this.setEnemies();
    }


    // jsdoc
    setBackground() {
        this.setSource('background', './img/background/background5.png', 960, 540);
        this.setSource('cloud', './img/background/background6.png', 960, 540);
    }


    // jsdoc
    setGrass() {
        this.setSource('grassL', './img/tiles/grass1.png', 64);
        this.setSource('grassC', './img/tiles/grass2.png', 64);
        this.setSource('grassR', './img/tiles/grass3.png', 64);
        this.setSource('flyGrassL', './img/tiles/flying_grass1.png', 64);
        this.setSource('flyGrassC', './img/tiles/flying_grass2.png', 64);
        this.setSource('flyGrassR', './img/tiles/flying_grass3.png', 64);
    }


    // jsdoc
    setSimpleObjects() {
        this.setSource('tree', './img/objects/tree.png', 256);
        this.setSource('ladderB', './img/objects/ladder1.png', 32);
        this.setSource('ladderC', './img/objects/ladder2.png', 32);
        this.setSource('ladderT', './img/objects/ladder3.png', 32);
    }


    // jsdoc
    setAnimatedObjects() {
        this.setSource('bird', './img/objects_animated/bird.png', 64);
        this.setSource('bomb', './img/objects_animated/bomb.png', 256);
        this.setSource('coin', './img/objects_animated/coin.png', 32);
        this.setSource('crystal', './img/objects_animated/crystal.png', 32);
        this.setSource('heart', './img/objects_animated/heart.png', 32);
        this.setSource('hitPoint', './img/objects_animated/hit_point.png', 32);
        this.setSource('star', './img/objects_animated/star.png', 32);
        this.setSource('web', './img/objects_animated/web.png', 32);
    }


    // jsdoc
    setLeaf() {
        this.setSource('leaf', './img/leaves/leaf1.png', 32);
    }


    // jsdoc
    setEndboss() {
        this.setSource('shaman', './img/bosses/shaman/shaman.png', 256);
    }


    // jsdoc
    setEnemies() {
        this.setSource('dino', './img/enemies/dino/dino.png', 128);
        this.setSource('ent', './img/enemies/ent/ent.png', 256);
        this.setSource('spider', './img/enemies/spider/spider.png', 128);
    }


    // jsdoc
    setHero() {
        this.setSource('knight', './img/characters/knight/knight.png', 128, 128);
    }


    // to think about!!!
    loadImagePaths() {
        this.image = new ImagePath();
    }
}