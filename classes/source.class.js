class Source {
    grassL = './img/tiles/grass1.png';
    grassC = './img/tiles/grass2.png';
    grassR = './img/tiles/grass3.png';
    flyGrassL = './img/tiles/flying_grass1.png';
    flyGrassC = './img/tiles/flying_grass2.png';
    flyGrassR = './img/tiles/flying_grass3.png';


    bird = './img/objects_animated/bird.png';
    bomb = './img/objects_animated/bomb.png';
    coin = './img/objects_animated/coin.png';
    crystal = './img/objects_animated/crystal.png';
    heart = './img/objects_animated/heart.png';
    hitPoint = './img/objects_animated/hit_point.png';
    star = './img/objects_animated/star.png';
    web = './img/objects_animated/web.png';


    avatarImage = { path: './img/inner_interface/avatar_image.png', x: 24, y: 452.5 };
    avatarFrame = { path: './img/inner_interface/avatar_frame.png', x: 16, y: 445 };

    hpBarBg = { path: './img/inner_interface/hp_bar_bg.png', x: 95, y: 503 };
    hpPoint = { path: './img/inner_interface/hp_point.png', y: 506 };
    hpBarBorder = { path: './img/inner_interface/hp_bar_border.png', x: 92, y: 500 };

    energyBarBg = { path: './img/inner_interface/state_bar_bg.png', x: 94.5, y: 484 };
    energyPoint = { path: './img/inner_interface/energy_point.png', y: 486 };
    energyBarBorder = { path: './img/inner_interface/state_bar_border.png', x: 92, y: 482 };

    staminaBarBg = { path: './img/inner_interface/state_bar_bg.png', x: 94.5, y: 466 };
    staminaPoint = { path: './img/inner_interface/stamina_point.png', y: 468 };
    staminaBarBorder = { path: './img/inner_interface/state_bar_border.png', x: 92, y: 464 };

    itemBg = { path: './img/inner_interface/item_bg.png', x: 23, y: 411.5 };
    itemBomb = { path: './img/inner_interface/item_bomb.png', x: 22.5, y: 411.5 };
    itemBorder = { path: './img/inner_interface/item_border.png', x: 20, y: 409 };


    constructor() {
        this.loadImagePaths();
    }


    loadImagePaths() {
        this.image = new ImagePath();
    }
}