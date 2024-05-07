class StateBarObject extends DrawableObject {
    points = [];


    constructor() {
        super(0, 0, 203, 79);
    }


    get points() {
        return this.points;
    }


    get translation() {
        return this.bg.translation;
    }


    // setStateBar(name, max, ms) {
    //     this.name = name;    // getNameFromPath()
    //     this.max = max;
    //     this.ms = ms;
    //     bg = new AvatarInfo(SOURCE[name + 'barBg']);
    //     border = new AvatarInfo(SOURCE[name + 'barBorder']);
    // }


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
        return (this.translation + this.points.length * 1) / 64;
    }


    getPointType(x) {
        if (this.name == 'hp') {
            return new DrawableObject(SOURCE.hpPoint.path, x, SOURCE.hpPoint.y);
        } else if (this.name == 'energy') {
            return new DrawableObject(SOURCE.energyPoint.path, x, SOURCE.energyPoint.y);
        } else if (this.name == 'stamina') {
            return new DrawableObject(SOURCE.staminaPoint.path, x, SOURCE.staminaPoint.y);
        }
    }


    regenerate() {
        let condition = this.getCondition();
        if (this.points.length < this.max && condition) {    // condition!!!
            this.addNewPoint();
        }
    }


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