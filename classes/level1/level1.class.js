class Level1 {


    // jsdoc
    constructor() {
        this.loadAllBackgrounds();

        this.loadAllSections();
    }


    // to edit and/or to move!!!
    loadAllBackgrounds() {
        this.background = [];
        for (let i = 0; i < 8; i++) {
            let bg = new Background(i);
            bg.layers.forEach((layer) => {
                layer.x = i * canvas.width;
                this.background.push(layer);
            });
        }
    }


    // jsdoc
    loadAllSections() {
        this.loadSection(new Section1(), 0);
        this.loadSection(new Section2(), 1);
        this.loadSection(new Section3(), 2);
        this.loadSection(new Section4(), 3);
        this.loadSection(new Section5(), 4);
        this.loadSection(new Section6(), 5);
        this.loadSection(new Section7(), 6);
        this.loadSection(new Section8(), 7);
    }


    // review subsequent methods!!!


    // jsdoc
    loadSection(section, t) {
        this.loadSectionObjects(section, t);
    }


    // jsdoc
    loadSectionObjects(section, t) {
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