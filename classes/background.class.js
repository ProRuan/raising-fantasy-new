class Background extends DrawableObject {
    pattern = /background(\d+)/;
    layers = [];


    // jsdoc
    constructor(x) {
        super(SOURCE.background, x, 0);
        this.loadLayers();
    }


    // jsdoc
    loadLayers() {
        let number = this.getNumber();
        for (let i = 0; i < number; i++) {
            this.addLayer(i);
        }
    }


    // jsdoc
    getNumber() {
        return this.img.src.match(this.pattern)[1];
    }


    // jsdoc
    addLayer(i) {
        let path = this.updatePath(i);
        let layer = this.createLayer(path);
        this.layers.push(layer);
    }


    // jsdoc
    updatePath(i) {
        return this.img.src.replace(this.pattern, `background${i + 1}`);
    }


    // jsdoc
    createLayer(path) {
        return new DrawableObject(path, this.x, this.y);
    }
}