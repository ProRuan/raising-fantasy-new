/**
 * Represents a start world.
 * @extends World
 */
class StartWorld extends World {
    interacted = false;
    title = { font: '80px Trade Winds', text: 'Raising Fantasy' };


    /**
     * Creates a start world.
     * @param {element} canvas - The canvas to use.
     * @param {Keyboard} keyboard - The keyboard to use.
     */
    constructor(canvas, keyboard) {
        super(canvas, keyboard);
        this.setStartWorld();
        this.setMusic();
        this.draw();
    }


    /**
     * Sets the start world.
     */
    setStartWorld() {
        this.setBackground();
        this.setTextButtons();
        this.setQuestRoll();
        this.setExtraButtons();
        this.setLeaderboard();
        this.setVolumeButtons();
    }


    /**
     * Sets the background.
     */
    setBackground() {
        this.background = this.getDrawableObject(source.mainBg, 0, 0);
    }


    /**
     * Provides a drawable object.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @returns {DrawableObject} - The drawable object.
     */
    getDrawableObject(source, x, y) {
        return new DrawableObject(source, x, y);
    }


    /**
     * Sets the text buttons.
     */
    setTextButtons() {
        this.newGameButton = this.getTextButton('New Game', 340);
        this.questButton = this.getTextButton('Quest', 412);
        this.setCurrentButton('newGameButton');
    }


    /**
     * Sets the current button.
     * @param {string} key - The key of the button.
     */
    setCurrentButton(key) {
        this.currentButton = this[key];
        this.currentButton.selected = true;
    }


    /**
     * Provides a text button.
     * @param {string} text - The text of the button.
     * @param {number} b - The parameter of the y-axis.
     * @returns {TextButton} - The text button.
     */
    getTextButton(text, b) {
        let width = this.getTextWidth(text);
        let [x, y] = this.getTextCoord(width, 24, b);
        let textSource = this.getTextSource(text, width, 24);
        return new TextButton(textSource, x, y);
    }


    /**
     * Provides the width of the text.
     * @param {string} text - The text to measure.
     * @returns {number} - The width of the text.
     */
    getTextWidth(text) {
        this.setText('24px Arial', 'left', 'black');
        let width = this.ctx.measureText(text).width;
        return Math.round(width);
    }


    /**
     * Provides the coordinates of the text button.
     * @param {number} width - The width of the text.
     * @param {number} height - The height of the text.
     * @param {number} b - The parameter of the y-axis. 
     * @returns {array} - The coordinates of the text button.
     */
    getTextCoord(width, height, b) {
        let x = this.getCenteredCoord('width', width);
        let y = this.canvas.height - b - height;
        return [x, y];
    }


    /**
     * Provides the source of the text.
     * @param {string} text - The text to apply.
     * @param {number} width - The width of the text.
     * @param {number} height - The height of the text.
     * @returns {object} - The source of the text.
     */
    getTextSource(text, width, height) {
        return { text: text, width: width, height: height };
    }


    /**
     * Sets the quest roll.
     */
    setQuestRoll() {
        let [x, y] = this.getBgCoord('questRoll');
        this.questRoll = new QuestRoll(x, y);
        this.setCoinButton();
    }


    /**
     * Provides the coordinates of the board.
     * @param {string} key - The key of the board.
     * @returns {array} - The coordinates of the board.
     */
    getBgCoord(key) {
        let x = this.getCenteredCoord('width', source[key].width);
        let y = this.getCenteredCoord('height', source[key].height);
        return [x, y];
    }


    /**
     * Sets the coin button.
     */
    setCoinButton() {
        let [x, y] = this.getObjectCoord('questRoll');
        this.coinButton = new CoinButton(x, y);
    }


    /**
     * Provides the coordinates of the object.
     * @param {string} key - The key of the object.
     * @returns {array} - The coordinates of the object.
     */
    getObjectCoord(key) {
        let x = this[key].xRight;
        let y = this[key].yTop;
        return [x, y];
    }


    /**
     * Sets the extra buttons.
     */
    setExtraButtons() {
        this.cupButton = new CupButton();
        this.settingsButton = new SettingsButton();
    }


    /**
     * Sets the leaderboard.
     */
    setLeaderboard() {
        let [x, y] = this.getBgCoord('leaderboard');
        this.leaderboard = new Leaderboard(x, y);
        this.setXButton();
    }


    /**
     * Sets the x button.
     */
    setXButton() {
        let [x, y] = this.getObjectCoord('leaderboard');
        this.xButton = new XButton(x, y);
    }


    /**
     * Sets the volume buttons.
     */
    setVolumeButtons() {
        let [x, y] = this.getVolBtnCoord();
        this.lowMusicButton = new LowMusicButton(x, y);
        this.highMusicButton = new HighMusicButton(x, y);
        this.lowSoundButton = new LowSoundButton(x, y);
        this.highSoundButton = new HighSoundButton(x, y);
    }


    /**
     * Provides the coordinates of the volume buttons.
     * @returns {array} - The coordinates of the volume buttons.
     */
    getVolBtnCoord() {
        let x = this.leaderboard.xLeft + (this.leaderboard.xRight - this.leaderboard.xLeft) / 2;
        let y = this.canvas.height - this.leaderboard.yTop;
        return [x, y];
    }


    /**
     * Sets the music.
     */
    setMusic() {
        this.sound = source.newWorld;
        this.music = new Audio(this.sound);
        this.music.volume = volume.music / 10;
        this.music.loop = true;
    }


    /**
     * Draws the start world.
     */
    draw() {
        this.clearCanvas();
        this.setGlobalAlpha();
        this.applyKeyControl();
        this.drawMain();
        this.drawFlashText();
        this.drawLeaderboard();
        this.drawQuestRoll();
        this.redraw();
        this.startMusic();
        this.updateVolume();
    }


    /**
     * Applies the control of the keys.
     */
    applyKeyControl() {
        this.lockButton();
        this.selectButton();
    }


    /**
     * Locks the button.
     */
    lockButton() {
        if (this.isEnter()) {
            this.cleanLeaderboard();
            this.fillLeaderboard();
        }
    }


    /**
     * Verifies the keydown of enter.
     * @returns {boolean} - A boolean value.
     */
    isEnter() {
        let enter = isKey('enter');
        let unlocked = !isTrue(this.keyboard.enter.locked);
        let selected = isTrue(this.currentButton.selected);
        return enter && unlocked && selected;
    }


    /**
     * Cleans the leaderboard.
     */
    cleanLeaderboard() {
        if (isMatch(this.currentButton, this.settingsButton)) {
            this.cupButton.locked = false;
        } else if (isMatch(this.currentButton, this.cupButton)) {
            this.settingsButton.locked = false;
        }
    }


    /**
     * Fills the leaderboard.
     */
    fillLeaderboard() {
        let locked = this.currentButton.locked;
        this.currentButton.locked = (!locked) ? true : false;
        keyboard.enter.locked = true;
    }


    /**
     * Selects the button.
     */
    selectButton() {
        this.selectNextButton('arrowUp', 'previous');
        this.selectNextButton('arrowDown', 'next');
    }


    /**
     * Selects the next button.
     * @param {string} key - The name of the key.
     * @param {string} next - The key of the next button.
     */
    selectNextButton(key, next) {
        if (isKey(key) && !isTrue(buttonSelected)) {
            let nextButton = world.currentButton[next];
            this.setNextButton(nextButton);
            buttonSelected = true;
        }
    }


    /**
     * Sets the next button.
     * @param {string} nextButton - The key of the next button.
     */
    setNextButton(nextButton) {
        this.currentButton.selected = false;
        this.setCurrentButton(nextButton);
    }


    /**
     * Draws the main screen.
     */
    drawMain() {
        this.drawObject(this.background);
        this.drawTitle(this.title);
        this.drawMainButtons();
    }


    /**
     * Draws the title.
     * @param {object} title - The title object.
     */
    drawTitle(title) {
        let x = this.getCenteredCoord('width', 0);
        let y = this.getCenteredCoord('height', -16);
        this.setShadow('white', 16);
        this.setText(title.font, 'center', 'black');
        super.drawText(title.text, x, y);
        this.setShadow();
    }


    /**
     * Draws the main buttons.
     */
    drawMainButtons() {
        if (this.interacted) {
            this.drawButton(this.newGameButton);
            this.drawButton(this.questButton);
            this.drawButton(this.cupButton);
            this.drawButton(this.settingsButton);
        }
    }


    /**
     * Draws a button.
     * @param {Button} button - The button to draw.
     */
    drawButton(button) {
        if (button.isHighlighted()) {
            this.setButtonWithShadow(button);
        } else {
            this.setButton(button);
        }
    }


    /**
     * Sets the shadow of the button.
     * @param {Button} button - The button to highlight.
     */
    setButtonWithShadow(button) {
        this.setShadow(button.shadowColor, button.shadowBlur);
        this.setButton(button);
        this.setShadow();
    }


    /**
     * Sets a button.
     * @param {Button} button - The button to set.
     */
    setButton(button) {
        (button.text) ? this.drawTextButton(button) : this.drawObject(button);
    }


    /**
     * Draws a text button.
     * @param {TextButton} button - The text button to draw.
     */
    drawTextButton(button) {
        this.setText(button.font, button.textAlign, button.color);
        this.drawText(button.text, button.x, button.offsetY);
    }


    /**
     * Draws the leaderboard.
     */
    drawLeaderboard() {
        if (this.leaderboard.isOpened()) {
            this.drawObject(this.leaderboard);
            this.drawButton(this.xButton);
            this.drawVolumeButtons();
            this.leaderboard.drawScore();
            this.leaderboard.drawVolume();
        }
    }


    /**
     * Draws the volume buttons.
     */
    drawVolumeButtons() {
        if (this.settingsButton.isLocked()) {
            this.drawButton(this.lowMusicButton);
            this.drawButton(this.highMusicButton);
            this.drawButton(this.lowSoundButton);
            this.drawButton(this.highSoundButton);
        }
    }


    /**
     * Draws the quest roll.
     */
    drawQuestRoll() {
        if (this.questRoll.isOpened()) {
            this.drawObject(this.questRoll);
            this.drawButton(this.coinButton);
            this.questRoll.drawQuest();
        }
    }


    /**
     * Starts the music.
     */
    startMusic() {
        if (isUndefined(this.musicStarted) && isTrue(this.interacted)) {
            this.musicStarted = true;
            this.music.volume = volume.music / 10;
            this.music.play();
        }
    }


    /**
     * Updates the volume of the music.
     */
    updateVolume() {
        this.music.volume = volume.music / 10;
    }


    /**
     * Sets a button reachable.
     * @param {string} key - The key of the button.
     * @param {boolean} value - A boolean value.
     */
    setReachable(key, value) {
        if (this.interacted) {
            this[key].reachable = value;
        }
    }


    /**
     * Draws the flash text.
     */
    drawFlashText() {
        let time = getTime();
        let ms = time % 1000;
        if (isGreater(ms, 500) && !isTrue(this.interacted)) {
            this.setText('28px Roboto', 'center', 'black');
            this.setFlashText();
        }
    }


    /**
     * Sets the flash text.
     */
    setFlashText() {
        let x = this.getCenteredCoord('width', 0);
        let y = this.getCenteredCoord('height', -252);
        this.drawText('Press any key', x, y);
    }
}