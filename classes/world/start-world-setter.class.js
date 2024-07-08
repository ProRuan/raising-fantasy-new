/**
 * Represents a start world setter.
 * @extends World
 */
class StartWorldSetter extends World {


    /**
     * Creates a start world setter.
     * @param {element} canvas - The canvas to use.
     * @param {Keyboard} keyboard - The keyboard to use.
     */
    constructor(canvas, keyboard) {
        super(canvas, keyboard);
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
        this.newGameButton = this.getTextButton('Neues Spiel', 340);
        this.questButton = this.getTextButton('Quest', 412);
        this.setCurrentButton('newGameButton');
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
     * Sets the current button.
     * @param {string} key - The key of the button.
     */
    setCurrentButton(key) {
        this.currentButton = this[key];
        this.currentButton.selected = true;
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
}