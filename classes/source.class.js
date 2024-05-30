class Source {
    // to edit and/or move!!!
    startX = 60;
    crystalXCenter = 6240;
    crystalCollectedX = 5984;
    bossBattleX = 6780;
    endX = 7620;


    // edit all source files


    // to give to method below




    // tasks
    // -----
    // ambientSound ...
    // bomb + star ...


    // to edit!!!
    ambientSound = './audio/ambience/nature_forest_daytime.wav';


    // audio
    dinoGrowl = './audio/attacks_and_creatures/dino_growl.wav';
    entGrowl = './audio/attacks_and_creatures/ent_growl.wav';
    spiderGrowl = './audio/attacks_and_creatures/spider_growl.wav';
    shamanGrowl = './audio/attacks_and_creatures/shaman_growl.wav';

    goAway = './audio/attacks_and_creatures/go_away.wav';
    armorHit = './audio/attacks_and_creatures/cloth_armor_hit.wav';
    staveStep = './audio/footsteps/dirt.wav';
    grassStep = './audio/footsteps/grass.wav';
    swordDraw = './audio/attacks_and_creatures/blade_draw.wav';

    // on progress ...
    skillUpgrade = './audio/attacks_and_creatures/skill_upgrade.wav';
    weaponImpact = './audio/attacks_and_creatures/weapon_impact.wav';


    constructor() {
        this.loadImagePaths();    // to think about!!!

        this.loadAllSounds();

        this.setLevel();
        this.setAvatarInfo();
        this.setHero();
    }


    loadAllSounds() {
        this.loadSound('ambience', this.ambientSound, 0);
    }


    loadSound(key, path, currentTime) {
        this[key] = {
            path: path,
            currentTime: currentTime
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
        this.setMagic();
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

        // to edit or to move!!!
        this.addSourceSound('coin', './audio/collect/coin.wav');
        this.addSourceSound('crystal', './audio/collect/crystal.wav');
        this.addSourceSound('heart', './audio/collect/heart.wav');
        this.addSourceSound('hitPoint', './audio/collect/hit_point.wav');
        this.addSourceSound('web', './audio/attacks_and_creatures/web_throw.wav');
    }


    addSourceSound(key, path) {
        this[key].sound = path;
    }


    // jsdoc
    setLeaf() {
        this.setSource('leaf', './img/leaves/leaf1.png', 32);
        this.addSourceSound('leaf', './audio/collect/leaf.wav');
    }


    // jsdoc
    setEndboss() {
        this.setSource('shaman', './img/bosses/shaman/shaman.png', 256);
    }


    // jsdoc
    addSourceFlipBook(key, flipBook) {
        this[key].flipBook = flipBook;
    }


    // jsdoc
    setEnemies() {
        this.setSource('dino', './img/enemies/dino/dino.png', 128);
        this.setSource('ent', './img/enemies/ent/ent.png', 256);
        this.setSource('spider', './img/enemies/spider/spider.png', 128);
        this.addSourceFlipBook('dino', FLIP_BOOK_DINO);
        this.addSourceFlipBook('ent', FLIP_BOOK_ENT);
        this.addSourceFlipBook('spider', FLIP_BOOK_SPIDER);
        this.addSoundSource('dino', 'growl', this.dinoGrowl);
        this.addSoundSource('ent', 'growl', this.entGrowl);
        this.addSoundSource('spider', 'growl', this.spiderGrowl);

        this.addSoundSource('dino', 'weaponImpact', this.weaponImpact);
        this.addSoundSource('ent', 'weaponImpact', this.weaponImpact);
        this.addSoundSource('spider', 'weaponImpact', this.weaponImpact);
    }


    // jsdoc
    addSoundSource(key, subkey, path) {    // similar method existing???
        this[key][subkey] = path;
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
        this.setSource('avatarImage', './img/inner_interface/avatar_image.png', 64);
        this.setSource('avatarFrame', './img/inner_interface/avatar_frame.png', 76, 79);
        this.addSourceXY('avatarImage', 24, 452.5);
        this.addSourceXY('avatarFrame', 16, 445);
    }


    // jsdoc
    addSourceXY(key, x, y) {
        this[key].x = x;
        this[key].y = y;
    }


    // jsdoc
    setHpBar() {
        this.setSource('hpBarBg', './img/inner_interface/hp_bar_bg.png', 121, 14);
        this.setSource('hpPoint', './img/inner_interface/hp_point.png', 1, 12);
        this.setSource('hpBarBorder', './img/inner_interface/hp_bar_border.png', 127, 20);
        this.addSourceXY('hpBarBg', 95, 503);
        this.addSourceXY('hpPoint', 0, 506);
        this.addSourceXY('hpBarBorder', 92, 500);
    }


    // jsdoc
    setEnergyBar() {
        this.setSource('energyBarBg', './img/inner_interface/state_bar_bg.png', 97, 13);
        this.setSource('energyPoint', './img/inner_interface/energy_point.png', 1, 10);
        this.setSource('energyBarBorder', './img/inner_interface/state_bar_border.png', 102, 18);
        this.addSourceXY('energyBarBg', 94.5, 484);
        this.addSourceXY('energyPoint', 0, 486);
        this.addSourceXY('energyBarBorder', 92, 482);
    }


    // jsdoc
    setStaminaBar() {
        this.setSource('staminaBarBg', './img/inner_interface/state_bar_bg.png', 97, 13);
        this.setSource('staminaPoint', './img/inner_interface/stamina_point.png', 1, 10);
        this.setSource('staminaBarBorder', './img/inner_interface/state_bar_border.png', 102, 18);
        this.addSourceXY('staminaBarBg', 94.5, 466);
        this.addSourceXY('staminaPoint', 0, 468);
        this.addSourceXY('staminaBarBorder', 92, 464);
    }


    // jsdoc
    setItem() {
        this.setSource('itemBg', './img/inner_interface/item_bg.png', 34, 35);
        this.setSource('itemBomb', './img/inner_interface/item_bomb.png', 35);
        this.setSource('itemBorder', './img/inner_interface/item_border.png', 40);
        this.addSourceXY('itemBg', 23, 411.5);
        this.addSourceXY('itemBomb', 22.5, 411.5);
        this.addSourceXY('itemBorder', 20, 409);
    }


    // jsdoc
    setEndboss() {
        this.setSource('shaman', './img/bosses/shaman/shaman.png', 256, 256);
        this.addSourceFlipBook('shaman', FLIP_BOOK_SHAMAN);
        this.addSoundSource('shaman', 'growl', this.shamanGrowl);
    }


    // jsdoc
    setMagic() {
        this.setSource('blade', './img/bosses/magic/blade.png', 256);
        this.setSource('fire', './img/bosses/magic/fire.png', 256);
        this.setSource('lightning', './img/bosses/magic/lightning.png', 256);
    }


    // jsdoc
    setHero() {
        this.setSource('knight', './img/characters/knight/knight.png', 128, 128);
        this.addSourceFlipBook('knight', FLIP_BOOK_KNIGHT);
    }




    // to think about!!!
    loadImagePaths() {
        this.image = new ImagePath();
    }
}