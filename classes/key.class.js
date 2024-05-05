class Key {
    name;
    code;
    keydown = false;
    timeStamp = new Date().getTime();
    lastTimeStamp = 0;    // in use?
    doubleClick = false;    // in use?


    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}