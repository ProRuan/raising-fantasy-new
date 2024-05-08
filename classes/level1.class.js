class Level1 {


    // set 64 values + translation!!!


    constructor() {
        this.loadSection1();
        this.loadSection2();
        this.loadSection3();
    }


    loadSection1() {
        let section = new Section1();
        for (const [key] of Object.entries(section)) {
            this.setObject(key);
            for (let i = 0; i < section[key].length; i++) {
                let object = section[key][i];
                this[key].push(object);
            }
        }
    }


    setObject(key) {
        if (this[key] === undefined) {
            this[key] = [];
        }
    }


    loadSection2() {
        let section = new Section2();
        for (const [key] of Object.entries(section)) {
            this.setObject(key);
            for (let i = 0; i < section[key].length; i++) {
                let object = section[key][i];
                this[key].push(object);
            }
        }
    }


    loadSection3() {
        let section = new Section3();
        for (const [key] of Object.entries(section)) {
            this.setObject(key);
            for (let i = 0; i < section[key].length; i++) {
                let object = section[key][i];
                this[key].push(object);
            }
        }
    }
}