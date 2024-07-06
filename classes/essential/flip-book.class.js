/**
 * Represents a flip book.
 */
class FlipBook {
    patFile = /([A-Z]?[a-z]+\_?[A-z]?[a-z]*)(\d+)/;
    patId = /\d+/;


    /**
     * Creates a flip book.
     * @param {array} source - The source of the paths.
     */
    constructor(source) {
        this.createFlipBook(source);
        this.deletePattern();
    }


    /**
     * Creates a flip book with chapters.
     * @param {array} source - The source of the paths.
     */
    createFlipBook(source) {
        source.forEach(chapter => {
            this.createChapter(chapter);
        });
    }


    /**
     * Creates a chapter of the flip book.
     * @param {string} chapter - The path of an image.
     */
    createChapter(chapter) {
        let [name, number] = this.getFile(chapter);
        this.setChapter(name);
        this.createPages(chapter, name, number);
    }


    /**
     * Provides the file name of the image.
     * @param {string} chapter - The path of an image.
     * @returns {array} - The file name of the image (name, id).
     */
    getFile(chapter) {
        let file = chapter.match(this.patFile);
        return [formatSplitWord(file[1]), file[2]];
    }


    /**
     * Sets the name of the chapter.
     * @param {string} name - The name of the chapter.
     */
    setChapter(name) {
        this[name] = [];
    }


    /**
     * Creates the pages of the chapter.
     * @param {string} chapter - The path of an image.
     * @param {string} name - The name of the chapter.
     * @param {number} number - The id of the image file.
     */
    createPages(chapter, name, number) {
        for (let i = 0; i < number; i++) {
            let img = chapter.replace(this.patId, i + 1);
            this[name][i] = img;
        }
    }


    /**
     * Deletes the objects of the pattern.
     */
    deletePattern() {
        delete this.patFile;
        delete this.patId;
    }
}