class Level1 {


    // jsdoc
    constructor() {
        this.loadScenery();
        this.loadAllSections();
    }


    // jsdoc
    loadScenery() {
        this.loadScenicDetail('background');
        this.loadScenicDetail('clouds');
        this.loadScenicDetail('birds');
    }


    // jsdoc
    loadScenicDetail(key) {
        this.setObjectGroup(key);
        this.executeLoad(key);
    }


    // jsdoc
    executeLoad(key) {
        for (let i = 0; i < LEVEL_SIZE; i++) {
            key = this.formatInitial(key, 'toUpperCase');
            let method = 'load' + key;
            this[method](i);
        }
    }


    // jsdoc
    formatInitial(word, method) {
        let initial = word[0];
        return word.replace(initial, initial[method]());
    }


    // jsdoc
    loadBackground(i) {
        let bg = new Background(i);
        this.loadLayers(i, bg);
    }


    // jsdoc
    loadLayers(i, bg) {
        bg.layers.forEach((layer) => {
            layer.x = i * canvas.width;
            this.background.push(layer);
        });
    }


    // jsdoc
    loadClouds(i) {
        let number = this.getRandomNumber(8, 7);
        if (isGreater(4, number)) {
            this.loadCloudField(i);
        }
    }


    // jsdoc
    getRandomNumber(max, dev) {
        return max - Math.round(Math.random() * dev);
    }


    // jsdoc
    loadCloudField(i) {
        let cloud = new Cloud(i);
        this.clouds.push(cloud);
    }


    // jsdoc
    loadBirds(i) {
        let number = this.getRandomNumber(3, 2);
        for (let j = 0; j < number; j++) {
            this.loadBird(i);
        }
    }


    // jsdoc
    loadBird(i) {
        let x = this.getBirdX(i);
        let y = this.getRandomNumber(7.415, 4);
        let bird = new Bird(x, y);
        this.birds.push(bird);
    }


    // jsdoc
    getBirdX(i) {
        let number = this.getRandomNumber(13.75, 12);
        let translation = this.getTranslation(i);
        return number + translation;
    }


    // jsdoc
    getTranslation(i) {
        return i * canvas.width / UNIT;
    }


    // jsdoc
    loadAllSections() {
        this.loadSection(new Section1(), 8);
        this.loadSection(new Section2(), 1);
        this.loadSection(new Section3(), 2);
        this.loadSection(new Section4(), 3);
        this.loadSection(new Section5(), 4);
        this.loadSection(new Section6(), 5);
        this.loadSection(new Section7(), 6);
        this.loadSection(new Section8(), 0);
    }


    // jsdoc
    loadSection(section, t) {
        for (const [key] of Object.entries(section)) {
            this.setObjectGroup(key);
            this.loadObjectGroup(section, t, key);
        }
    }


    // jsdoc
    setObjectGroup(key) {
        this[key] = (this[key]) ? this[key] : [];
    }


    // jsdoc
    loadObjectGroup(section, t, key) {
        for (let i = 0; i < section[key].length; i++) {
            let object = this.getObject(section, key, i);
            this.loadObject(t, key, object);
        }
    }


    // jsdoc
    getObject(section, key, i) {
        return section[key][i];
    }


    // jsdoc
    loadObject(t, key, object) {
        this.setObjectX(t, object);
        this[key].push(object);
    }


    // jsdoc
    setObjectX(t, object) {
        object.x += t * canvas.width;
    }
}