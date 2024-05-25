class StateBar extends DrawableObject {
    points = [];
    pattern = /([a-z]+)_point/;


    // jsdoc
    constructor(source, max, ms) {
        super(source, 0, 0);
        this.setStateBar(source.path, max, ms);
        this.fill();
        this.regenerate();
    }


    // jsdoc
    get points() {
        return this.points;
    }


    // jsdoc
    get translation() {
        return this.bg.translation;
    }


    // jsdoc
    setStateBar(path, max, ms) {
        this.setParameters(path, max, ms);
        this.setStateBarFrame();
    }


    // jsdoc
    setParameters(path, max, ms) {
        this.name = path.match(this.pattern)[1];
        this.max = max;
        this.ms = ms;
    }


    // jsdoc
    setStateBarFrame() {
        this.bg = this.getAvatarInfo('BarBg');
        this.border = this.getAvatarInfo('BarBorder');
    }


    // jsdoc
    getAvatarInfo(key) {
        let name = this.name + key;
        return new AvatarInfo(source[name]);
    }


    // jsdoc
    fill(newMax) {
        newMax = this.getMax(newMax);
        for (let i = this.points.length; i < newMax; i++) {
            this.addNewPoint();
        }
    }


    // jsdoc
    getMax(newMax) {
        return (!newMax) ? this.max : newMax;
    }


    // jsdoc
    addNewPoint() {
        let x = this.calculateX();
        let point = this.getPoint(x);
        this.points.push(point);
    }


    // jsdoc
    calculateX() {
        return this.translation + this.points.length;
    }


    // jsdoc
    getPoint(x) {
        let name = this.getPointName();
        return this.createPoint(name, x);
    }


    // jsdoc
    getPointName() {
        return this.name + 'Point';
    }


    // jsdoc
    createPoint(name, x) {
        let path = source[name];
        let y = source[name].y;
        return new DrawableObject(path, x, y);
    }


    // jsdoc
    regenerate() {
        this.setStoppableInterval(() => this.refill(), this.ms);
    }


    // jsdoc
    refill() {
        if (this.isCondition()) {
            this.addNewPoint();
        }
    }


    // jsdoc
    isCondition() {
        return this.getCondition() && isGreater(this.points.length, this.max);
    }


    // jsdoc
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


    // jsdoc
    isStateBar(name) {
        return isMatch(this.name, name);
    }
}