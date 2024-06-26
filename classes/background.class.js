/**
 * Represents a background.
 * @extends DrawableObject
 */
class Background extends DrawableObject {
    pattern = /background(\d+)/;
    layers = [];


    /**
     * Creates a background.
     * @param {number} x - The x value.
     */
    constructor(x) {
        super(source.background, x, 0);
        this.loadLayers();
    }


    /**
     * Loads the layers of the background.
     */
    loadLayers() {
        let number = this.getNumber();
        for (let i = 0; i < number; i++) {
            this.addLayer(i);
        }
    }


    /**
     * Provides the number of the layers.
     * @returns {number} - The number of the layers.
     */
    getNumber() {
        return this.img.src.match(this.pattern)[1];
    }


    /**
     * Adds a layer.
     * @param {number} i - The id of the layer.
     */
    addLayer(i) {
        let path = this.updatePath(i);
        let layer = this.createLayer(path);
        this.layers.push(layer);
    }


    /**
     * Updates the path of the layer.
     * @param {number} i - The id of the layer.
     * @returns {string} - The path of the layer.
     */
    updatePath(i) {
        let layer = `background${i + 1}`;
        return this.img.src.replace(this.pattern, layer);
    }


    /**
     * Creates a layer.
     * @param {string} path - The path of the layer.
     * @returns {DrawableObject} - The layer as a drawable object.
     */
    createLayer(path) {
        let source = this.getSource(path);
        return new DrawableObject(source, this.x, this.y);
    }


    /**
     * Provides the source of the layer.
     * @param {string} path - The path of the layer.
     * @returns {object} - The source object of the layer.
     */
    getSource(path) {
        return { path: path, width: this.width, height: this.height };
    }
}