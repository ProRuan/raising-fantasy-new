class Background extends DrawableObject {
    pattern = /background(\d+)/;
    layers = [];


    // jsdoc
    constructor(x) {
        super(source.background, x, 0);
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
        let source = this.getSource(path);
        return new DrawableObject(source, this.x, this.y);
    }


    // jsdoc
    getSource(path) {
        return { path: path, width: this.width, height: this.height };
    }
}