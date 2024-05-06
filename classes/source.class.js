class Source {
    grassLeft = './img/tiles/grass1.png';
    grassCenter = './img/tiles/grass2.png';
    grassRight = './img/tiles/grass3.png';
    flyingGrassLeft = './img/tiles/flying_grass1.png';
    flyingGrassCenter = './img/tiles/flying_grass2.png';
    flyingGrassRight = './img/tiles/flying_grass3.png';


    constructor() {
        this.loadImagePaths();
    }


    loadImagePaths() {
        this.image = new ImagePath();
    }
}