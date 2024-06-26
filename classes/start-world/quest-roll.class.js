/**
 * Represents a quest roll.
 * @extends DrawableObject
 */
class QuestRoll extends DrawableObject {
    opened = false;
    yHeadline = 160;
    ySubheadline = 298;
    yStory = { first: 208, second: 238 };
    yChallenge = { first: 333, second: 363, third: 393 };


    /**
     * Creates a quest roll.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        super(source.questRoll, x, y);
        this.show();
    }


    /**
     * Provides the y value of the headline.
     */
    get xHeadline() {
        return this.x + this.width / 2;
    }


    /**
     * Provides the x value fo the text.
     */
    get xText() {
        return this.x + 40;
    }


    /**
     * Shows the quest roll.
     */
    show() {
        this.setPauseableInterval(() => this.showButtons(), 1000 / 60);
    }


    /**
     * Shows the buttons of the quest roll.
     */
    showButtons() {
        if (isMatch(currentWorld, 'start')) {
            (this.isOpened()) ? this.setButtons(false) : this.setButtons(true);
        } else {
            this.stop(true);
        }
    }


    /**
     * Sets the buttons.
     * @param {boolean} logical - A boolean value.
     */
    setButtons(logical) {
        world.setReachable('newGameButton', logical);
        world.setReachable('questButton', logical);
        this.setCoinButton(logical);
    }


    /**
     * Sets the coin button.
     * @param {boolean} logical - A boolean value.
     */
    setCoinButton(logical) {
        logical = (!logical) ? true : false;
        world.setReachable('coinButton', logical);
    }


    /**
     * Draws the headline 'quest'.
     */
    drawQuest() {
        this.drawHeadline();
        this.drawStory();
        this.drawSubheadline();
        this.drawChallenges();
    }


    /**
     * Draws the headline.
     */
    drawHeadline() {
        world.setText('bold 28px Amaranth', 'center', 'black');
        world.drawText('Quest', this.xHeadline, this.yHeadline);
    }


    /**
     * Draws the story.
     */
    drawStory() {
        world.setText('20px Roboto', 'left', 'black');
        world.drawText('Play as a knight and', this.xText, this.yStory.first);
        world.drawText('explore a new world.', this.xText, this.yStory.second);
    }


    /**
     * Draws the subheadline.
     */
    drawSubheadline() {
        world.setText('bold 22px Roboto', 'left', 'black');
        world.drawText('Challenges', this.xText, this.ySubheadline);
    }


    /**
     * Draws the challenges.
     */
    drawChallenges() {
        world.setText('20px Roboto', 'left', 'black');
        world.drawText('1. Collect all coins.', this.xText, this.yChallenge.first);
        world.drawText('2. Collect all leaves.', this.xText, this.yChallenge.second);
        world.drawText('3. Defeat the endboss.', this.xText, this.yChallenge.third);
    }
}