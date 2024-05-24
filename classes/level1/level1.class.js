class Level1 {


    // jsdoc
    constructor() {
        this.loadLandscape();
        this.loadAllSections();
    }


    loadLandscape() {
        this.loadLandScapeDetail('background', 'loadBackground');
        this.loadLandScapeDetail('clouds', 'loadCloud');
        this.loadLandScapeDetail('birds', 'loadThisBird');
    }


    loadLandScapeDetail(key, method) {
        this[key] = [];
        for (let i = 0; i < 8; i++) {    // level size!!!
            this[method](i);
        }
    }


    loadBackground(i) {
        let bg = new Background(i);
        bg.layers.forEach((layer) => {
            layer.x = i * canvas.width;
            this.background.push(layer);
        });
    }


    loadCloud(i) {
        let cloud = new Cloud(i);
        this.clouds.push(cloud);
    }


    loadThisBird(i) {
        let number = this.getBirdNumber();
        for (let j = 0; j < number; j++) {
            this.loadBird(i);
        }
    }


    loadBirdSwarm(i) {
        this.birds = [];
        let number = this.getBirdNumber();
        for (let j = 0; j < number; j++) {
            this.loadBird(i);
        }
    }


    loadBird(i) {
        let x = this.getBirdX(i);
        let y = this.getBirdY();
        let bird = new Bird(x, y);
        this.birds.push(bird);
    }


    getBirdNumber() {
        return 3 - Math.round(Math.random() * 2)
    }


    getBirdX(i) {
        return 13.75 - Math.round(Math.random() * 12) + i * 960 / 64;
    }


    getBirdY() {
        return 7.415 - Math.round(Math.random() * 4);
    }


    // jsdoc
    loadAllSections() {
        this.loadSection(new Section1(), 0);
        this.loadSection(new Section2(), 1);
        this.loadSection(new Section3(), 2);    // fix ent y!
        this.loadSection(new Section4(), 3);    // fix loading sequence!
        this.loadSection(new Section5(), 4);
        this.loadSection(new Section6(), 5);
        this.loadSection(new Section7(), 6);    // set UNIT for class AnimatedObjects!!!
        this.loadSection(new Section8(), 7);
    }


    // review subsequent methods!!!


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
        object.x += t * canvas.width;    // to edit (translation)
    }
}