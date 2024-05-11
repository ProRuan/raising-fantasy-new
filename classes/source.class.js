class Source {


    // edit all source files


    // to give to method below

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
        this.setAvatarInfo();
        this.setHero();
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
    setSource(name, path, width, height) {
        this[name] = (height) ? { path: path, width: width, height: height } : { path: path, size: width };
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
    setAvatarInfo() {
        this.setAvatar();
        this.setHpBar();
        this.setEnergyBar();
        this.setStaminaBar();
        this.setItem();
    }


    // jsdoc
    setAvatar() {
        this.avatarImage = this.getSource('./img/inner_interface/avatar_image.png', 64, 64, 24, 452.5);
        this.avatarFrame = this.getSource('./img/inner_interface/avatar_frame.png', 76, 79, 16, 445);
    }


    // jsdoc
    getSource(path, width, height, x, y) {
        return { path: path, width: width, height: height, x: x, y: y };
    }


    // jsdoc
    setHpBar() {
        this.hpBarBg = this.getSource('./img/inner_interface/hp_bar_bg.png', 121, 14, 95, 503);
        this.hpPoint = this.getSource('./img/inner_interface/hp_point.png', 1, 12, 0, 506);
        this.hpBarBorder = this.getSource('./img/inner_interface/hp_bar_border.png', 127, 20, 92, 500);
    }


    // jsdoc
    setEnergyBar() {
        this.energyBarBg = this.getSource('./img/inner_interface/state_bar_bg.png', 97, 13, 94.5, 484);
        this.energyPoint = this.getSource('./img/inner_interface/energy_point.png', 1, 10, 0, 486);
        this.energyBarBorder = this.getSource('./img/inner_interface/state_bar_border.png', 102, 18, 92, 482);
    }


    // jsdoc
    setStaminaBar() {
        this.staminaBarBg = this.getSource('./img/inner_interface/state_bar_bg.png', 97, 13, 94.5, 466);
        this.staminaPoint = this.getSource('./img/inner_interface/stamina_point.png', 1, 10, 0, 468);
        this.staminaBarBorder = this.getSource('./img/inner_interface/state_bar_border.png', 102, 18, 92, 464);
    }


    // jsdoc
    setItem() {
        this.itemBg = this.getSource('./img/inner_interface/item_bg.png', 34, 35, 23, 411.5);
        this.itemBomb = this.getSource('./img/inner_interface/item_bomb.png', 35, 35, 22.5, 411.5);
        this.itemBorder = this.getSource('./img/inner_interface/item_border.png', 40, 40, 20, 409);
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