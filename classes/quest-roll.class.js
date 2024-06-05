class QuestRoll extends DrawableObject {
    opened = false;
    yHeadline = 160;
    yStory = { first: 208, second: 238 };
    ySubheadline = 298;
    yChallenge = { first: 333, second: 363, third: 393 };


    // jsdoc
    constructor(x, y) {
        super(source.questRoll, x, y);
        this.show();
    }


    // jsdoc
    get xHeadline() {
        return this.x + this.width / 2;
    }


    // jsdoc
    get xText() {
        return this.x + 40;
    }


    show() {    // double code?
        setInterval(() => {
            this.showButtons();
        }, 1000 / 60);
    }


    // jsdoc
    showButtons() {
        (this.isOpened()) ? this.setButtons(false) : this.setButtons(true);
    }


    isOpened() {    // double code?
        return this.opened == true;
    }


    // jsdoc
    setButtons(logical) {
        this.setReachable('newGameButton', logical);
        this.setReachable('questButton', logical);
        this.setCoinButton(logical);
    }


    setReachable(key, value) {    // double code!!! (move)
        world[key].reachable = value;
    }


    // jsdoc
    setCoinButton(logical) {
        logical = (!logical) ? true : false;
        this.setReachable('coinButton', logical);
    }


    // jsdoc
    drawQuest() {
        this.drawHeadline();
        this.drawStory();
        this.drawSubheadline();
        this.drawChallenges();
    }


    // jsdoc
    drawHeadline() {
        world.setText('bold 28px Arial', 'center', 'black');
        world.drawText('Quest', this.xHeadline, this.yHeadline);
    }


    // jsdoc
    drawStory() {
        world.setText('20px Arial', 'left', 'black');
        world.drawText('Play as a knight and', this.xText, this.yStory.first);
        world.drawText('explore a new world.', this.xText, this.yStory.second);
    }


    // jsdoc
    drawSubheadline() {
        world.setText('bold 20px Arial', 'left', 'black');
        world.drawText('Challenges', this.xText, this.ySubheadline);
    }


    // jsdoc
    drawChallenges() {
        world.setText('20px Arial', 'left', 'black');
        world.drawText('1. Collect all coins.', this.xText, this.yChallenge.first);
        world.drawText('2. Collect all leaves.', this.xText, this.yChallenge.second);
        world.drawText('3. Defeat the endboss.', this.xText, this.yChallenge.third);
    }
}