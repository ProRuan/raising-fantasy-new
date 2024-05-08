class Counter {
    keys = OBJECTS_TO_COUNT;


    // jsdoc
    constructor() {
        this.setObjectsToCount();
    }


    // jsdoc
    setObjectsToCount() {
        for (let i = 0; i < this.keys.length; i++) {
            this.setObjectValue(i);
        }
    }


    // jsdoc
    setObjectValue(i) {
        let key = this.keys[i];
        this[key] = 0;
    }
}