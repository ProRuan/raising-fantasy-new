class Level1 {


    // jsdoc
    constructor() {
        this.loadSection(Section1, 0);
        this.loadSection(Section2, 1);
        this.loadSection(Section3, 2);
        this.loadSection(Section4, 3);
        this.loadSection(Section5, 4);
        this.loadSection(Section6, 5);
        this.loadSection(Section7, 6);
        this.loadSection(Section8, 7);
    }


    // jsdoc
    loadSection(Section, t) {
        let section = this.getSection(Section);
        this.loadSectionObjects(section, t);
    }


    // jsdoc
    getSection(Section) {
        return new Section();
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
        object.x = object.x * 64 + t * canvas.width;    // to edit
    }
}