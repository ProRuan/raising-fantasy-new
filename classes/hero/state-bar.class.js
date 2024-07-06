/**
 * Represents a state bar.
 * @extends DrawableObject
 */
class StateBar extends DrawableObject {
    points = [];
    pattern = /([a-z]+)_point/;


    /**
     * Creates a state bar.
     * @param {object} source - The source object.
     * @param {number} max - The max value of the points.
     * @param {number} ms - The milliseconds of the interval.
     */
    constructor(source, max, ms) {
        super(source, 0, 0);
        this.setStateBar(source.path, max, ms);
        this.fill();
        this.regenerate();
    }


    /**
     * Provides the points of the state bar.
     */
    get points() {
        return this.points;
    }


    /**
     * Provides the translation.
     */
    get translation() {
        return this.bg.translation;
    }


    /**
     * Sets the state bar.
     * @param {string} path - The path of the state bar.
     * @param {number} max - The max value of the points.
     * @param {number} ms - The milliseconds of the interval.
     */
    setStateBar(path, max, ms) {
        this.setParameters(path, max, ms);
        this.setStateBarFrame();
    }


    /**
     * Sets the parameters.
     * @param {string} path - The path of the state bar.
     * @param {number} max - The max value of the points.
     * @param {number} ms - The milliseconds of the interval.
     */
    setParameters(path, max, ms) {
        this.name = path.match(this.pattern)[1];
        this.max = max;
        this.ms = ms;
    }


    /**
     * Sets the frame of the state bar.
     */
    setStateBarFrame() {
        this.bg = this.getAvatarInfo('BarBg');
        this.border = this.getAvatarInfo('BarBorder');
    }


    /**
     * Provides an object of the avatar info.
     * @param {string} key - The key of the avatar info.
     * @returns {AvatarInfo} - The avatar info (object).
     */
    getAvatarInfo(key) {
        let name = this.name + key;
        return new AvatarInfo(source[name]);
    }


    /**
     * Fills the state bar.
     * @param {number} newMax - The (new) max value of the points.
     */
    fill(newMax) {
        newMax = this.getMax(newMax);
        for (let i = this.points.length; i < newMax; i++) {
            this.addNewPoint();
        }
    }


    /**
     * Provides the max value of the points.
     * @param {number} newMax - The (new) max value of the points.
     * @returns {number} - The max value of the points.
     */
    getMax(newMax) {
        return (!newMax) ? this.max : newMax;
    }


    /**
     * Adds a new point.
     */
    addNewPoint() {
        let x = getSum(this.translation, this.points.length);
        let point = this.getPoint(x);
        this.points.push(point);
    }


    /**
     * Provides a point.
     * @param {number} x - The x value of the point.
     * @returns {DrawableObject} - The point as drawable object.
     */
    getPoint(x) {
        let name = this.getPointName();
        return this.createPoint(name, x);
    }


    /**
     * Provides the name of the point.
     * @returns {string} - the name of the point.
     */
    getPointName() {
        return this.name + 'Point';
    }


    /**
     * Creates a point.
     * @param {string} name - The name of the point.
     * @param {number} x - The x value of the point.
     * @returns {DrawableObject} - The point as drawable object.
     */
    createPoint(name, x) {
        let path = source[name];
        let y = source[name].y;
        return new DrawableObject(path, x, y);
    }


    /**
     * Regenerates the points.
     */
    regenerate() {
        this.setPauseableInterval(() => this.refill(), this.ms);
    }


    /**
     * Refills the state bar.
     */
    refill() {
        if (this.isCondition()) {
            this.addNewPoint();
        }
    }


    /**
     * Verifies the condition of the point type.
     * @returns {boolean} - A boolean value.
     */
    isCondition() {
        return this.getCondition() && isGreater(this.points.length, this.max);
    }


    /**
     * Provides the condition of the point type.
     * @returns {boolean} - A boolean value.
     */
    getCondition() {
        if (!world.hero.isDeath()) {
            if (this.isStateBar('hp')) {
                return !world.hero.isHurt();
            } else if (this.isStateBar('stamina')) {
                return !isKey('keyA');
            } else {
                return true;
            }
        }
    }


    /**
     * Verifies the name of the state bar.
     * @param {string} name - The name of the state bar.
     * @returns {boolean} - A boolean value.
     */
    isStateBar(name) {
        return isMatch(this.name, name);
    }
}