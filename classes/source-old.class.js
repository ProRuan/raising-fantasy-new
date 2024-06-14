class Source {


    constructor() {
        this.setAvatarInfo();
        this.setHero();
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
    setHero() {
        this.setSource('knight', './img/characters/knight/knight.png', 128, 128);
        this.addSourceFlipBook('knight', FLIP_BOOK_KNIGHT);
    }




    // to think about!!!
    loadImagePaths() {
        this.image = new ImagePath();
    }



    // game over screen (this + level world) ...
    // pause ...
    // pause music ...
    // fix enemy gravity or dino walk ...
    // fix updateGroundLevel (error after collecting star) ...

    // clear enemies (0/3) ...
    // remove console log ...

    // set prevent default ...
}