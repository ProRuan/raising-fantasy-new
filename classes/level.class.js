class Level {
    heroWidth = HERO_WIDTH;
    heroXLeft = HERO_X_LEFT;
    heroXCenter = HERO_X_CENTER;
    cameraXOffset = CAMERA_X_OFFSET;
    worldSize = LEVEL_SIZE;
    keys = OBJECTS_TO_LOAD;
    translation = canvasWidth;

    // Please verify!!!
    levelEndPreviousOtherDirection = false;
    levelEndPrevious = false;


    // TO EDIT!!!!


    constructor() {
        this.setObjectsToLoad();
        this.setXLevelStart();
        this.setXLevelEndCrystal();
        this.setXCameraEnd();
    }


    setObjectsToLoad() {
        for (let i = 0; i < this.keys.length; i++) {
            this.setObjectValue(i);
        }
    }


    setObjectValue(i) {
        let key = this.keys[i].toUpperCase();
        this[key] = [];
    }


    setXLevelStart() {
        this.X_LEVEL_START = this.heroXLeft;
    }


    setXLevelStartCrystal() {
        this.X_LEVEL_START = (this.worldSize - 2) * canvasWidth + 144 + this.heroXLeft;
    }


    setXLevelEndCrystal() {
        this.X_LEVEL_END = (this.worldSize - 2) * canvasWidth + canvasWidth / 2 - this.heroXCenter;
    }


    setXLevelEnd() {
        this.X_LEVEL_END = this.worldSize * canvasWidth - (this.heroWidth - this.heroXCenter);
    }


    setXCameraEnd() {
        this.X_CAMERA_END = (this.worldSize - 1) * canvasWidth + this.cameraXOffset;
    }


    loadLandscape() {
        for (let i = 0; i < this.worldSize; i++) {
            this.loadBackground(i);
            this.loadClouds(i);
            this.loadBirdSwarm(i);
        }
    }


    loadBackground(i) {
        let background = this.getBackground(i);
        for (let j = 0; j < background.layers.length - 1; j++) {
            this.loadLayer(background, j);
        }
    }


    getBackground(i) {
        let t = this.getTranslation(i);
        return new Background(t);
    }


    getTranslation(i) {
        return i * this.translation / 64;
    }


    loadLayer(bg, j) {
        let layer = new Layer(bg, j);
        this.BACKGROUND.push(layer);
    }


    loadClouds(i) {
        let background = this.getBackground(i);
        let cloud = new Cloud(background);
        this.CLOUDS.push(cloud);
    }


    loadBirdSwarm(i) {
        let number = this.getBirdNumber();
        for (let j = 0; j < number; j++) {
            this.loadBird(i);
        }
    }


    loadBird(i) {
        let x = this.getBirdX(i);
        let y = this.getBirdY();
        let bird = new Bird(x, y);
        this.BIRDS.push(bird);
    }


    getBirdNumber() {
        return 3 - Math.round(Math.random() * 2)
    }


    getBirdX(i) {
        return 13.75 - Math.round(Math.random() * 12) + i * this.translation / 64;
    }


    getBirdY() {
        return 7.415 - Math.round(Math.random() * 4);
    }


    loadSectionObjects(array, id, key) {
        let objects = array[id];
        if (objects) {
            this.loadObjects(objects, id, key);
        }
    }


    loadObjects(objects, id, key) {
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            object.x += id * this.translation;
            this[key].push(object);
        }
    }


    loadEndboss(endboss) {
        endboss.x += (this.worldSize - 1) * this.translation;
        this.ENDBOSS = endboss;
    }
}