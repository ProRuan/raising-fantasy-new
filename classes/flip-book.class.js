class FlipBook {
    patFile = /([A-Z]?[a-z]+\_?[A-z]?[a-z]*)(\d+)/;
    patId = /\d+/;


    // jsdoc
    constructor(source) {
        this.createFlipBook(source);
        this.deletePattern();
    }


    // jsdoc
    createFlipBook(source) {
        source.forEach(chapter => {
            this.createChapter(chapter);
        });
    }


    // jsdoc
    createChapter(chapter) {
        let [name, number] = this.getFile(chapter);
        this.setChapter(name);
        this.createPages(chapter, name, number);
    }


    // jsdoc
    getFile(chapter) {
        let file = chapter.match(this.patFile);
        return [file[1], file[2]];
    }


    // jsdoc
    setChapter(name) {
        this[name] = [];
    }


    // jsdoc
    createPages(chapter, name, number) {
        for (let i = 0; i < number; i++) {
            let img = chapter.replace(this.patId, i + 1);
            this[name][i] = img;
        }
    }


    // jsdoc
    deletePattern() {
        delete this.patFile;
        delete this.patId;
    }
}