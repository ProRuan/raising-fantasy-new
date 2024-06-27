/**
 * Represents a drawable object.
 */
class DrawableObject {
    indent = 0;


    /**
     * Creates a drawable object.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        this.setUp(source, x, y);
    }


    /**
     * Provides the left x value.
     */
    get xLeft() {
        return this.x + this.indent;
    }


    /**
     * Provides the center x value.
     */
    get xCenter() {
        return this.x + this.width / 2;
    }


    /**
    * Provides the right x value.
    */
    get xRight() {
        return this.x + (this.width - this.indent);
    }


    /**
    * Provides the top y value.
    */
    get yTop() {
        return this.y + this.indent;
    }


    /**
    * Provides the center y value.
    */
    get yCenter() {
        return this.y + this.height / 2;
    }


    /**
    * Provides the bottom y value.
    */
    get yBottom() {
        return this.y + (this.height - this.indent);
    }


    /**
     * Sets the drawable object up.
     * @param {object} source 
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    setUp(source, x, y) {
        this.setImage(source);
        this.setPosition(x, y);
    }


    /**
     * Sets the image.
     * @param {object} source - The source object.
     */
    setImage(source) {
        this.setPath(source);
        this.setSize(source);
    }


    /**
     * Sets the path of the image.
     * @param {object} source - The source object.
     */
    setPath(source) {
        if (source.path) {
            this.img = new Image();
            this.img.src = source.path;
        }
    }


    /**
     * Sets the size of the image.
     * @param {object} source - The source object.
     */
    setSize(source) {
        this.width = this.getSize(source, 'width');
        this.height = this.getSize(source, 'height');
    }


    /**
     * Provides a paramater of the size.
     * @param {object} source - The source object.
     * @param {string} key - The key of the size parameter.
     * @returns {number} - The value of the size parameter.
     */
    getSize(source, key) {
        return (source.height) ? source[key] : source.size;
    }


    /**
     * Sets the position of the image.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }


    /**
     * Sets the x value.
     * @param {number} x - The x value.
     */
    setX(x) {
        this.x = x;
    }


    /**
     * Sets the y value.
     * @param {number} y - The y value.
     */
    setY(y) {
        this.y = canvas.height - this.height - y;
    }


    /**
     * Provides the body object.
     * @returns {object} - The body object.
     */
    getBody() {
        return {
            'xLeft': this.getBodyCoord('x', 'xLeft'),
            'xCenter': this.getBodyCoord('x', 'xCenter'),
            'xRight': this.getBodyCoord('x', 'xRight'),
            'yTop': this.getBodyCoord('y', 'yTop'),
            'yCenter': this.getBodyCoord('y', 'yCenter'),
            'yBottom': this.getBodyCoord('y', 'yBottom')
        };
    }


    /**
     * Provides the coordinates of the body.
     * @param {string} key - The key of the coordinate.
     * @param {string} subkey - The subkey of the coordinate.
     * @returns {number} - The value of the coordinate.
     */
    getBodyCoord(key, subkey) {
        return this[key] + this.bodyXY[subkey];
    }


    /**
     * Provides the weapon object.
     * @returns {object} - The weapon object.
     */
    getWeapon() {
        return {
            'xLeft': this.getWeaponCoord('xCenter', 'xLeft', 'xRight'),
            'xRight': this.getWeaponCoord('xCenter', 'xRight', 'xLeft'),
            'yTop': this.getWeaponCoord('y', 'yTop'),
            'yBottom': this.getWeaponCoord('y', 'yBottom')
        };
    }


    /**
     * Provides the coordinates of the weapon object.
     * @param {string} key - The key of the coordinate.
     * @param {string} subkeyA - The subkey a of the coordinate.
     * @param {string} subkeyB - The subkey b of the coordinate.
     * @returns {number} - The value of the coordinate.
     */
    getWeaponCoord(key, subkeyA, subkeyB) {
        if (isUndefined(subkeyB)) {
            return this.getWeaponValue(key, subkeyA);
        } else {
            return this.getWeaponX(key, subkeyA, subkeyB);
        }
    }


    /**
     * Provides the x value of the weapon object.
     * @param {string} key - The key of the coordinate.
     * @param {string} subkeyA - The subkey a of the coordinate.
     * @param {string} subkeyB - The subkey b of the coordinate.
     * @returns {number} - The x value of the weapon object.
     */
    getWeaponX(key, subkeyA, subkeyB) {
        if (!isTrue(this.otherDirection)) {
            return this.getWeaponValue(key, subkeyA, true);
        } else {
            return this.getWeaponValue(key, subkeyB, false);
        }
    }


    /**
     * Provides a value of the weapon object.
     * @param {string} key - The key of the coordinate.
     * @param {string} subkey - The subkey of the coordinate.
     * @param {boolean} logical - A boolean value.
     * @returns {number} - A value of the weapon object.
     */
    getWeaponValue(key, subkey, logical) {
        if (isUndefined(logical)) {
            return this[key] + this.weaponXY[subkey];
        } else if (isTrue(logical)) {
            return this.body[key] + this.weaponXY[subkey];
        } else {
            return this.body[key] - this.weaponXY[subkey];
        }
    }


    /**
     * Verifies, if a board is open.
     * @returns {boolean} - A boolean value.
     */
    isOpened() {
        return isTrue(this.opened);
    }


    /**
     * Loads the images.
     */
    loadImages() {
        this.setCurrentImage(0);
        this.setImageCache();
        this.setImages();
    }


    /**
     * Sets the current image.
     * @param {number} n - The id of the current image.
     */
    setCurrentImage(n) {
        this.currentImage = n;
    }


    /**
     * Sets the image cache.
     */
    setImageCache() {
        this.imageCache = [];
    }


    /**
     * Sets the images.
     * @param {array} flipBook - The array of the images.
     */
    setImages(flipBook) {
        flipBook = this.getImages(flipBook);
        flipBook.forEach((chapter) => {
            this.addImage(chapter);
        });
    }


    /**
     * Provides the images to set.
     * @param {array} flipBook - The array of the images.
     * @returns {array} - The images to set.
     */
    getImages(flipBook) {
        return (flipBook) ? flipBook : this.flipBook;
    }


    /**
     * Adds an image.
     * @param {string} chapter - The path of the chapter.
     */
    addImage(chapter) {
        let img = new Image();
        img.src = chapter;
        this.imageCache[chapter] = img;
    }


    /**
     * Sets the flip book.
     * @param {object} source - The source object.
     */
    setFlipBook(source) {
        this.flipBook = new FlipBook(source.flipBook);
    }


    /**
     * Draws the image.
     * @param {object} ctx - The context of the world.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Verifies the file name of an image path.
     * @param {string} fileName - The file name to verify.
     * @returns {boolean} - A boolean value.
     */
    isImage(fileName) {
        return this.img.src.includes(fileName);
    }


    /**
    * Provides the id of the object.
    * @param {string} key - The key of the object.
    * @returns {number} - The id of the object.
    */
    getId(key) {
        return world[key].findIndex(o => isMatch(o, this));
    }


    /**
     * Sets the speed.
     * @param {value} s - The speed.
     * @param {value} r - The run speed.
     * @param {value} y - The y speed.
     */
    setSpeed(s, r, y) {
        this.speed = s / 60;
        (r) ? this.runSpeed = r / 60 : false;
        (y) ? this.speedY = y / 60 : false;
    }


    /**
     * Applies the speed type.
     * @param {string} key - The key of the axis.
     * @param {boolean} logical - A boolean value.
     * @param {string} type - The type of the speed.
     */
    applySpeedType(key, logical, type) {
        this[key] += (logical) ? -this[type] : this[type];
    }


    /**
     * Moves the object.
     * @param {function} subfunction - The function to execute.
     */
    move(subfunction) {
        this.setPauseableInterval(subfunction, 1000 / 60);
    }


    /**
     * Sets a pauseable interval.
     * @param {function} subfunction - The function to apply.
     * @param {number} ms - The milliseconds to apply.
     */
    setPauseableInterval(subfunction, ms) {
        if (!this.interval) {
            this.interval = new PauseableInterval(subfunction, ms);
        } else {
            this.interval2 = new PauseableInterval(subfunction, ms);
        }
    }


    /**
     * Stops the pauseable interval.
     * @param {boolean} logical - A boolean value.
     */
    stop(logical) {
        this.pauseInterval(logical, this.interval);
        this.pauseInterval(logical, this.interval2);
    }


    /**
     * Pauses the interval.
     * @param {boolean} logical - A boolean value.
     * @param {PauseableInterval} interval - The interval to pause.
     */
    pauseInterval(logical, interval) {
        if (interval) {
            (logical) ? interval.stop() : interval.play();
        }
    }


    /**
     * Floats the drawable object permanently.
     */
    floatPermanently() {
        this.float();
        this.keep();
    }


    /**
     * Floats the drawable object.
     */
    float() {
        this.x -= this.speed;
    }


    /**
     * Resets the x value of the drawable object.
     */
    keep() {
        if (isGreater(this.x, -this.width)) {
            this.x = world.size * canvas.width;
        }
    }


    /**
     * Applies the effect of the collected item.
     */
    effect() {
        this.triggerEffect();
        this.playSound(this.sound);
    }


    /**
     * Plays the animation.
     * @param {array} images - The array of the images.
     */
    playAnimation(images) {
        images = this.getImages(images);
        this.showImage(images);
        this.currentImage++;
    }


    /**
     * Shows the image.
     * @param {array} images - The array of the images.
     */
    showImage(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
    }


    /**
     * Plays the sound.
     * @param {string} path - The path of the audio.
     * @param {number} currentTime - The value of the current time.
     */
    playSound(path, currentTime) {
        let audio = new Audio(path);
        audio.currentTime = this.getCurrentTime(currentTime);
        audio.volume = this.getSoundVolume();
        world.currentSounds.push(audio);
        audio.play();
    }


    /**
     * Provides the value of the current time.
     * @param {number} currentTime - The value of the current time.
     * @returns {number} - The value of the current time.
     */
    getCurrentTime(currentTime) {
        return (currentTime) ? currentTime : 0;
    }


    /**
     * Provides the value of the sound volume.
     * @returns {number} - The value of the sound volume.
     */
    getSoundVolume() {
        return volume.sound / 10;
    }
}