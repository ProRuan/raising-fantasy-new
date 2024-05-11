class StateBar extends DrawableObject {
    points = [];


    constructor(path, max, ms) {
        super(path, 0, 0);
        this.setStateBar(path, max, ms);
        this.fill();
        this.setStoppableInterval(() => this.regenerate(), this.ms);
        // this.regenerate();    // stoppable interval!!!
    }


    get points() {
        return this.points;
    }


    get translation() {
        return this.bg.translation;
    }


    // to edit
    setStateBar(path, max, ms) {
        this.name = path.match(/([a-z]+)_point/)[1];
        this.max = max;
        this.ms = ms;
        this.bg = new AvatarInfo(source[this.name + 'BarBg']);
        this.border = new AvatarInfo(source[this.name + 'BarBorder']);
    }


    fill() {
        for (let i = 0; i < this.max; i++) {
            this.addNewPoint();
        }
    }


    addNewPoint() {
        let x = this.calculateX();
        let point = this.getPointType(x);
        this.points.push(point);
    }


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
        if (this.points.length < this.max) {    // condition!!!
            this.addNewPoint();
        }


        // let condition = this.getCondition();
        // if (this.points.length < this.max && condition) {    // condition!!!
        //     this.addNewPoint();
        // }
    }


    // to edit
    getCondition() {
        if (this.name == 'stamina') {
            return !world.hero.isKey('keydown', 'keyA');
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