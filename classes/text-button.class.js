class TextButton extends Button {
    indent = -8;    // to set!
    shadowColor = 'lightcyan';
    shadowBlur = '12';
    font = '24px Arial';
    textAlign = 'left';
    color = 'black';


    constructor(source, x, y) {
        super(source, x, y);    // variable (source)!!!
        this.text = source.text;
    }


    execute() {
        return this.openQuestRoll(world.questButton);
    }


    openQuestRoll(button) {    // double code
        if (button.isLocked()) {
            world.questRoll.opened = true;
        } else {
            world.questRoll.opened = false;
        }
    }
}