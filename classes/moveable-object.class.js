/**
 * Represents a moveable object.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    speedY = 0;
    acceleration = 0.5;
    jumpCounter = -1;
    basicLevel = 484;
    groundLevel = 484;
    abyssLevel = 668;
    otherDirection = false;
    jumped = false;


    /**
     * Creates a moveable object.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
    }


    /**
     * Provides the body.
     */
    get body() {
        return this.getBody();
    }


    /**
     * Provides the weapon.
     */
    get weapon() {
        return this.getWeapon();
    }


    /**
     * Sets the animation.
     * @param {object} source - The source object.
     */
    setAnimation(source) {
        this.setFlipBook(source);
        this.setCover(source);
        this.setEpilog();
        this.loadImages();
    }


    /**
     * Sets the cover chapter of the flip book.
     * @param {object} source - The source object.
     */
    setCover(source) {
        this.flipBook.cover = [source.path];
    }


    /**
     * Sets the epilog chapter of the flip book.
     */
    setEpilog() {
        let img = getLastElement(this.flipBook.death);
        this.flipBook.epilog = [img];
    }


    /**
     * Sets the images.
     */
    setImages() {
        for (const [key] of Object.entries(this.flipBook)) {
            let chapter = this.flipBook[key];
            super.setImages(chapter);
        }
    }


    /**
     * Moves the object.
     * @param {boolean} logical - A boolean value.
     * @param {string} key - The name of the key.
     */
    move(logical, key) {
        this.setOtherDirection(logical);
        this.applySpeed(logical, key);
    }


    /**
     * Sets the other direction.
     * @param {boolean} logical - A boolean value.
     */
    setOtherDirection(logical) {
        this.otherDirection = logical;
    }


    /**
     * Applies the speed.
     * @param {boolean} logical - A boolean value.
     * @param {string} key - The name of the key.
     */
    applySpeed(logical, key) {
        if (isKey(key, 'doubleClick')) {
            this.applySpeedType('x', logical, 'runSpeed');
        } else if (isKey(key)) {
            this.applySpeedType('x', logical, 'speed');
        }
    }


    /**
     * Verifies, if the climb animation is to play.
     * @returns {boolean} - A boolean value.
     */
    isClimb() {
        return this.isClimbUp() || this.isClimbDown();
    }


    /**
     * Verifies the climbing up.
     * @returns {boolean} - A boolean value.
     */
    isClimbUp() {
        let ladderTopInRange = this.isLadderInRange('isLadderTop', 'yTop', this.body.yBottom);
        return isKey('arrowUp') && ladderTopInRange;
    }


    /**
     * Verifies, if the ladder is in range.
     * @param {string} method - The key of the method to apply.
     * @param {value} valueA - The value a to compare.
     * @param {value} valueB - The value b to compare.
     * @returns {boolean} - A boolean value.
     */
    isLadderInRange(method, valueA, valueB) {
        let ladder = this.getWorldObject('ladders', method);
        if (isMatch(valueA, this.body.yBottom)) {
            return ladder && isGreater(valueA, ladder[valueB]);
        } else {
            return ladder && isGreater(ladder[valueA], valueB);
        }
    }


    /**
     * Verifies the top ladder object.
     * @param {object} ladder - A ladder object.
     * @returns {boolean} - A boolean value.
     */
    isLadderTop(ladder) {
        return this.isLadder(ladder) && ladder instanceof LadderT;
    }


    /**
     * Verifies a ladder.
     * @param {object} ladder - A ladder object.
     * @returns {boolean} - A boolean value.
     */
    isLadder(ladder) {
        return isIncluded(ladder.xLeft, this.body.xCenter, ladder.xRight);
    }


    /**
     * Verifies the climbing down.
     * @returns {boolean} - A boolean value.
     */
    isClimbDown() {
        let ladderBottomInRange = this.isLadderInRange('isLadderBottom', this.body.yBottom, 'yBottom');
        let ladderTopOutOfRange = this.isLadderInRange('isLadderTop', this.body.yBottom, 'yTop');
        return isKey('arrowDown') && ladderBottomInRange && !ladderTopOutOfRange;
    }


    /**
     * Verifies the bottom ladder object.
     * @param {object} ladder - The ladder object.
     * @returns {boolean} - A boolean value.
     */
    isLadderBottom(ladder) {
        return this.isLadder(ladder) && ladder instanceof LadderB;
    }


    /**
     * Applies the gravity.
     */
    applyGravity() {
        if (!this.isClimb() && !this.isEpilog()) {
            if (this.isAboveGround() || isGreater(0, this.speedY)) {
                this.applyFallSpeed();
                this.setGroundY();
            } else {
                this.speedY = 0;
                if (!isKey('space')) {
                    this.jumped = false;
                }
            }
        }
    }


    /**
     * Verifies, if this is above the ground.
     * @returns {boolean} - A boolean value.
     */
    isAboveGround() {
        return this.body.yBottom < this.groundLevel;
    }


    /**
     * Applies the fall speed.
     */
    applyFallSpeed() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    /**
     * Sets the ground y.
     */
    setGroundY() {
        let deltaY = this.body.yBottom - this.y;
        let groundY = this.groundLevel - deltaY;
        if (isGreater(groundY, this.y)) {
            this.y = groundY;
        }
    }


    /**
     * Applies the jump.
     */
    jump() {
        if (!isTrue(this.jumped)) {
            this.speedY = 12.5;
            this.jumpCounter = 0;
            this.jumped = true;
        }
    }


    /**
     * Verifies, if this is in a battle.
     * @param {Enemy} enemy - The enemy to battle.
     * @returns {boolean} - A boolean value.
     */
    isBattle(enemy) {
        let battle = this.getBattle(enemy);
        return (battle) ? true : false;
    }


    /**
     * Provides the battle parameter to verify.
     * @param {Enemy} enemy - The enemy to battle.
     * @returns {boolean} - A boolean value.
     */
    getBattle(enemy) {
        if (enemy) {
            return isCollided(this.weapon, enemy.body);
        } else {
            return world.enemies.find(enemy => isCollided(this.weapon, enemy.body));
        }
    }


    /**
     * Verifies, if two chapters are similar.
     * @returns {boolean} - A boolean value.
     */
    isSimilarChapter() {
        let key = this.getSimilarChapter();
        let last = this.lastChapter.includes(key);
        let current = this.chapter.includes(key);
        return isMatch(last, current);
    }


    /**
     * Provides the key of the similar chapters.
     * @returns {string} - The key of the similar chapters.
     */
    getSimilarChapter() {
        return this.chapter.replace(/[A-Z][a-z]+/, '');
    }


    /**
     * Sets the chapter to apply.
     */
    setChapter() {
        this.lastChapter = this.chapter;
        this.chapter = this.getChapter();
    }


    /**
     * Provides the chapter to apply.
     * @returns {array} - The chapter to apply.
     */
    getChapter() {
        for (let i = 0; i < this.chapters.length; i++) {
            let condition = this.getCondition(i);
            if (this.isChapter(condition)) {
                return this.chapters[i];
            }
        }
    }


    /**
     * Provides the condition of the chapter.
     * @param {number} i - The id of the chapter.
     * @returns {string} - The key of the method to apply.
     */
    getCondition(i) {
        let condition = this.chapters[i];
        return 'is' + formatInitial(condition, 'toUpperCase');
    }


    /**
     * Verifies the chapter to apply.
     * @param {key} condition - The key of the method to apply.
     * @returns {boolean} - A boolean value.
     */
    isChapter(condition) {
        return this[condition]();
    }


    /**
     * Resets the current image.
     */
    resetCurrentImage() {
        if (!this.isSimilarChapter()) {
            this.currentImage = 0;
        }
    }


    /**
     * Updates the ground level.
     * @param {string} key - The key of the (grass) object.
     */
    updateGroundLevel(key) {
        if (isUndefined(key)) {
            this.setGroundLevel('flyGrass', this.updateGroundLevel('grass'));
        } else {
            this.setGroundLevel('grass', this.setValue('groundLevel', this.abyssLevel));
        }
    }


    /**
     * Sets the ground level.
     * @param {string} key - The key of the (grass) object.
     * @param {function} method - The method to apply.
     */
    setGroundLevel(key, method) {
        let grass = this.getGrass(key);
        (grass) ? this.setValue('groundLevel', grass.yTop) : method;
    }


    /**
     * Provides the (grass) object.
     * @param {string} key - The key of the (grass) object.
     * @returns {object} - The (grass) object.
     */
    getGrass(key) {
        return world[key].find(g => this.isOnGrass(g) && this.isAboveGrass(g));
    }


    /**
     * Verifies, if this is on grass.
     * @param {object} g - The (grass) object.
     * @returns {boolean} - A boolean value.
     */
    isOnGrass(g) {
        let onGrassLeft = isIncluded(g.xLeft, this.body.xLeft, g.xRight);
        let onGrassRight = isIncluded(g.xLeft, this.body.xRight, g.xRight);
        return onGrassLeft || onGrassRight;
    }


    /**
     * Verifies, if this is above grass.
     * @param {object} g - The (grass) object.
     * @returns {boolean} - A boolean value.
     */
    isAboveGrass(g) {
        return isGreater(this.body.yBottom, g.yTop, true);
    }


    /**
     * Sets a value.
     * @param {string} key - The key of the variable.
     * @param {number} value - The value to set.
     */
    setValue(key, value) {
        this[key] = value;
    }


    /**
     * Sets the music.
     * @param {string} path - The path of the audio.
     */
    setMusic(path) {
        this.music = new Audio(path);
        this.music.volume = volume.music / 10;
        this.music.loop = true;
    }


    /**
     * Starts the music.
     * @param {boolean} condition - A boolean value.
     * @param {number} delay - The delay to apply.
     */
    startMusic(condition, delay) {
        if (condition && !this.musicStarted && !world.hero.isEpilog()) {
            this.musicStarted = true;
            setTimeout(() => {
                this.music.play();
            }, delay);
        }
    }


    /**
     * Mutes the ambient sound.
     * @param {boolean} logical - A boolean value.
     */
    muteAmbientSound(logical) {
        world.hero.music.muted = logical;
    }
}