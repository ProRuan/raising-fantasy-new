class Key {
    code;
    keydown = false;
    timeStamp = new Date().getTime();
    lastTimeStamp = 0;    // in use?
    doubleClick = false;    // in use?


    constructor(code) {
        this.code = code;
    }
}