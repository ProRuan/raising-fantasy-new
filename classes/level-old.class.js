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


    getTranslation(i) {
        return i * this.translation / 64;
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


    loadEndboss(endboss) {
        endboss.x += (this.worldSize - 1) * this.translation;
        this.ENDBOSS = endboss;
    }
}