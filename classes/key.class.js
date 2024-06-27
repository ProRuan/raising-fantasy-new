/**
 * Represents a key.
 */
class Key {
    keydown = false;
    doubleClick = false;
    timeStamp = new Date().getTime();
    lastKeyUp = 0;
    locked = false;


    /**
     * Creates a key.
     * @param {string} name - The name of the key.
     * @param {number} code - The code of the key.
     */
    constructor(name, code) {
        this.setKey(name, code);
    }


    /**
     * Sets the key.
     * @param {string} name - The name of the key.
     * @param {number} code - The code of the key.
     */
    setKey(name, code) {
        this.name = name;
        this.code = code;
    }
}