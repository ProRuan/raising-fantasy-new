class StateBar extends DrawableObject {
    points = [];
    pattern = /([a-z]+)_point/;


    constructor(source, max, ms) {
        super(source, 0, 0);
        this.setStateBar(source.path, max, ms);
        this.fill();
        this.setStoppableInterval(() => this.regenerate(), this.ms);
    }


    // jsdoc
    get points() {
        return this.points;
    }


    // jsdoc
    get translation() {
        return this.bg.translation;
    }


    // to edit
    setStateBar(path, max, ms) {
        this.name = path.match(this.pattern)[1];
        this.max = max;
        this.ms = ms;
        this.bg = new AvatarInfo(source[this.name + 'BarBg']);
        this.border = new AvatarInfo(source[this.name + 'BarBorder']);
    }


    fill(newMax) {
        newMax = (!newMax) ? this.max : newMax;
        for (let i = this.points.length; i < newMax; i++) {
            this.addNewPoint();
        }
    }


    addNewPoint() {
        let x = this.calculateX();
        let point = this.getPointType(x);
        this.points.push(point);
    }


    // jsdoc
    calculateX() {
        return (this.translation + this.points.length * 1);
    }


    getPointType(x) {
        if (this.isName('hp')) {
            return this.setPointType('hp', x);
        } else if (this.isName('energy')) {
            return this.setPointType('energy', x);
        } else if (this.isName('stamina')) {
            return this.setPointType('stamina', x);
        }
    }


    isName(name) {
        return this.name == name;
    }


    setPointType(name, x) {
        name = this.getPointName(name);
        return this.createPoint(name, x);
    }


    getPointName(name) {
        return name + 'Point';
    }


    createPoint(name, x) {
        return new DrawableObject(source[name], x, source[name].y);
    }


    regenerate() {
        if (this.getCondition() && this.points.length < this.max) {    // condition!!!
            this.addNewPoint();
        }


        // let condition = this.getCondition();
        // if (this.points.length < this.max && condition) {    // condition!!!
        //     this.addNewPoint();
        // }
    }


    // to edit
    getCondition() {
        if (this.name == 'hp') {    // condition 'energy' is missing!!!
            return !world.hero.isDeath();
        } else if (this.name == 'stamina') {
            return !world.hero.isDeath() && !isKey('keyA');
        } else {
            return true;
        }
    }


    updatePointX() {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].x = world.hero.xCamera + this.translation + i;
        }
    }
}