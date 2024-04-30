class Key {
    code;
    keydown = false;
    timeStamp = new Date().getTime();
    lastTimeStamp = 0;


    constructor(code) {
        this.code = code;
    }
}