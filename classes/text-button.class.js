class TextButton extends Button {
    indent = -8;    // to set!
    shadowColor = 'lightcyan';
    shadowBlur = '12';
    font = '24px Arial';
    textAlign = 'left';
    color = 'black';


    // jsdoc
    constructor(source, x, y) {
        super(source, x, y);
        this.setText(source);
    }


    // jsdoc
    get previous() {
        return this.getPrevious();
    }


    // jsdoc
    get next() {
        return this.getNext();
    }


    // jsdoc
    setText(source) {
        this.text = source.text;
    }


    // jsdoc
    getPrevious() {
        if (isMatch(this.text, 'Quest') && world.questButton.isLocked()) {
            return 'coinButton';
        } else if (isMatch(this.text, 'Quest')) {
            return 'newGameButton';
        } else {
            return 'settingsButton';
        }
    }


    // jsdoc
    getNext() {
        if (isMatch(this.text, 'Quest') && world.questButton.isLocked()) {
            return 'coinButton';
        } else if (isMatch(this.text, 'Quest')) {
            return 'cupButton';
        } else {
            return 'questButton';
        }
    }


    // jsdoc
    execute() {
        return this.open(world.questButton, world.questRoll);
    }
}