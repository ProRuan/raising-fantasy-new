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

    constructor() {
        this.loadImagePaths();
    }


    loadImagePaths() {
        this.image = new ImagePath();
    }
}