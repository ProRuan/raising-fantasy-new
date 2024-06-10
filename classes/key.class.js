class Key {
    keydown = false;
    doubleClick = false;
    timeStamp = new Date().getTime();
    lastKeyUp = 0;
    locked = false;


    // jsdoc
    constructor(name, code) {
        this.setKey(name, code);
    }


    // jsdoc
    setKey(name, code) {
        this.name = name;
        this.code = code;
    }
}