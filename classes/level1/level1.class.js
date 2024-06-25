/**
 * Represents a level 1.
 */
class Level1 {


    /**
     * Creates a level 1.
     */
    constructor() {
        this.loadScenery();
        this.loadAllSections();
        this.loadVictoryPodium();
    }


    /**
     * Loads the scenery.
     */
    loadScenery() {
        this.loadScenicDetail('background');
        this.loadScenicDetail('clouds');
        this.loadScenicDetail('birds');
    }


    /**
     * Loads a scenic detail.
     * @param {string} key - The key of the scenic detail.
     */
    loadScenicDetail(key) {
        this.setObjectGroup(key);
        this.executeLoad(key);
    }


    /**
     * Executes the load of a scenic detail.
     * @param {string} key - The key of the scenic detail.
     */
    executeLoad(key) {
        for (let i = 0; i < LEVEL_SIZE; i++) {
            key = formatInitial(key, 'toUpperCase');
            let method = 'load' + key;
            this[method](i);
        }
    }


    /**
     * Loads the background.
     * @param {number} i - The section id of the background.
     */
    loadBackground(i) {
        let bg = new Background(i);
        this.loadLayers(i, bg);
    }


    /**
     * Loads the layers of the background.
     * @param {number} i - The section id of the background.
     * @param {Background} bg - The background object.
     */
    loadLayers(i, bg) {
        bg.layers.forEach((layer) => {
            layer.x = i * canvas.width;
            this.background.push(layer);
        });
    }


    /**
     * Loads the clouds.
     * @param {number} i - The section id of the cloud field.
     */
    loadClouds(i) {
        let number = getRandomNumber(8, 7);
        if (isGreater(4, number)) {
            this.loadCloudField(i);
        }
    }


    /**
     * Loads the cloud field.
     * @param {number} i - The section id of the cloud field.
     */
    loadCloudField(i) {
        let cloud = new Cloud(i);
        this.clouds.push(cloud);
    }


    /**
     * Loads the birds.
     * @param {number} i - The section id of the bird. 
     */
    loadBirds(i) {
        let number = getRandomNumber(3, 2);
        for (let j = 0; j < number; j++) {
            this.loadBird(i);
        }
    }


    /**
     * Load the bird.
     * @param {number} i - The section id of the bird.
     */
    loadBird(i) {
        let x = this.getBirdX(i);
        let y = getRandomNumber(7.415, 4);
        let bird = new Bird(x, y);
        this.birds.push(bird);
    }


    /**
     * Provides the x value of the bird.
     * @param {number} i - The section id of the bird. 
     * @returns {number} - The x value of the bird.
     */
    getBirdX(i) {
        let number = getRandomNumber(13.75, 12);
        let translation = this.getTranslation(i);
        return number + translation;
    }


    /**
     * Provides the translation.
     */
    getTranslation(i) {
        return i * canvas.width / UNIT;
    }


    /**
     * Loads all sections.
     */
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


    /**
     * Loads a section.
     * @param {Section} section - The section to load.
     * @param {number} t - The translation to apply. 
     */
    loadSection(section, t) {
        for (const [key] of Object.entries(section)) {
            this.setObjectGroup(key);
            this.loadObjectGroup(section, t, key);
        }
    }


    /**
     * Sets the object group.
     * @param {string} key - The key of the object group. 
     */
    setObjectGroup(key) {
        this[key] = (this[key]) ? this[key] : [];
    }


    /**
     * Loads the object group.
     * @param {Section} section - The section to load.
     * @param {number} t - The translation to apply.
     * @param {string} key - The key of the object group.
     */
    loadObjectGroup(section, t, key) {
        for (let i = 0; i < section[key].length; i++) {
            let object = this.getObject(section, key, i);
            this.loadObject(t, key, object);
        }
    }


    /**
     * Provides the object.
     * @param {Section} section - The section to load.
     * @param {string} key - The key of the object group.
     * @param {number} i - The id of the object.
     * @returns {object} - The object to load.
     */
    getObject(section, key, i) {
        return section[key][i];
    }


    /**
     * Loads the object.
     * @param {number} t - The translation to apply.
     * @param {string} key - The id of the object group.
     * @param {object} object - The object to load.
     */
    loadObject(t, key, object) {
        this.setObjectX(t, object);
        this[key].push(object);
    }


    /**
     * Sets the x value of the object.
     * @param {number} t - The translation to apply.
     * @param {object} object - The object to load.
     */
    setObjectX(t, object) {
        object.x += t * canvas.width;
    }


    /**
     * Loads the victory podium.
     */
    loadVictoryPodium() {
        this.vicortyPodium = [];
        this.addVictoryElement('flyGrass', 3);
        this.addVictoryElement('flyGrass', 2);
        this.addVictoryElement('flyGrass', 1);
    }


    /**
     * Adds a victory element.
     * @param {string} key - The key of the victory element group.
     * @param {number} i - The id of the victory element.
     */
    addVictoryElement(key, i) {
        let element = this.getVictoryElement(key, i);
        this.vicortyPodium.push(element);
    }


    /**
     * Provides the victory element.
     * @param {string} key - The key of the victory element group.
     * @param {number} i - The id of the victory element.
     * @returns {object} - The victory element.
     */
    getVictoryElement(key, i) {
        let id = this[key].length - i;
        return this[key][id];
    }
}