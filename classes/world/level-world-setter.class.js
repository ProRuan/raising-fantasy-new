/**
 * Represents a level world setter.
 * @extends World
 */
class LevelWorldSetter extends World {


    /**
     * Creates a level world setter.
     * @param {element} canvas - The canvas to use.
     * @param {Keyboard} keyboard - The keyboard to use.
     */
    constructor(canvas, keyboard) {
        super(canvas, keyboard);
    }


    /**
     * Provides the endboss of the level.
     */
    get endboss() {
        return this.level.bosses[0];
    }


    /**
     * Provides the star of the level.
     */
    get star() {
        return this.level.stars[0];
    }


    /**
         * Sets the level world.
         */
    setLevelWorld() {
        this.setLevel();
        this.setAvatar();
        this.setHero();
        this.connectWorld();
        this.setPause();
    }


    /**
     * Sets the level.
     */
    setLevel() {
        this.level = new Level1();
        this.setLevelObjects();
    }


    /**
     * Sets the objects of the level.
     */
    setLevelObjects() {
        for (const [key, value] of Object.entries(this.level)) {
            this[key] = value;
        }
    }


    /**
     * Sets the avatar.
     */
    setAvatar() {
        this.setAvatarProfile();
        this.setAvatarStateBar();
        this.setAvatarItem();
    }


    /**
     * Sets the profile of the avatar.
     */
    setAvatarProfile() {
        this.avatarImage = new AvatarInfo(source.avatarImage);
        this.avatarFrame = new AvatarInfo(source.avatarFrame);
    }


    /**
     * Sets the state bar of the avatar.
     */
    setAvatarStateBar() {
        this.hpBar = new StateBar(source.hpPoint, 120, 600);
        this.energyBar = new StateBar(source.energyPoint, 100, 48);
        this.staminaBar = new StateBar(source.staminaPoint, 100, 16);
    }


    /**
     * Sets the item of the avatar.
     */
    setAvatarItem() {
        this.itemBg = new AvatarInfo(source.itemBg);
        this.itemBomb = new AvatarInfo(source.itemBomb);
        this.itemBorder = new AvatarInfo(source.itemBorder);
    }


    /**
     * Sets the hero.
     */
    setHero() {
        this.hero = new Knight(this.heroX, 38);
    }


    /**
     * Connects the world and the hero.
     */
    connectWorld() {
        this.hero.world = this;
    }


    /**
     * Sets the pause.
     */
    setPause() {
        let pause = source.pause;
        let x = this.getCenteredCoord('width', pause.width);
        let y = this.getCenteredCoord('height', pause.height);
        this.pause = new DrawableObject(pause, x, y);
    }


    /**
     * Plays the canvas.
     */
    playCanvas() {
        this.translateCamera(this.cameraX, 0);
        this.drawLevelObjects();
        this.drawKeyTutorial();
        this.drawObject(this.hero);
        this.drawLevelSubobjects();
        this.translateCamera(-this.cameraX, 0);
    }


    /**
     * Draws the key tutorial.
     */
    drawKeyTutorial() {
        if (isGreater(1280, body.offsetWidth)) {
            this.drawKeyTutorialBg();
            this.drawLeftKeyTutorial();
            this.drawRightKeyTutorial();
        }
    }


    /**
     * Draws the background of the key tutorial.
     */
    drawKeyTutorialBg() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.rect(16, 128, 344, 240);
        this.ctx.fill();
        this.ctx.fillStyle = 'black';
    }


    /**
     * Draws the left column of the key tutorial.
     */
    drawLeftKeyTutorial() {
        this.setText('20px Roboto', 'left', 'darksteelblue');
        this.drawText('A-Taste:', 32, 160);
        this.drawText('Pfeiltaste:', 32, 192);
        this.drawText('2 x Pfeiltaste:', 32, 224);
        this.drawText('Leertaste:', 32, 288);
        this.drawText('P-Taste:', 32, 320);
        this.drawText('Pause + Escape:', 32, 352);
    }


    /**
     * Draws the right column of the key tutorial.
     */
    drawRightKeyTutorial() {
        this.setText('20px Roboto', 'left', 'darksteelblue');
        this.drawText('Angreifen', 208, 160);
        this.drawText('Gehen/Klettern', 208, 192);
        this.drawText('Laufen', 208, 224);
        this.drawText('Springen', 208, 288);
        this.drawText('Spiel pausieren', 208, 320);
        this.drawText('Spiel verlassen', 208, 352);
    }


    /**
     * Draws the group of the touch zones.
     */
    drawTouchZoneGroup() {
        if (isGreater(body.offsetWidth, 1280, 'tolerant')) {
            this.drawControlZone();
            this.drawExitZone();
            this.drawPauseZone();
            this.drawAttackZone();
            this.drawJumpZone();
        }
    }


    /**
     * Draws the touch zone of the control.
     */
    drawControlZone() {
        if (!paused && !runChecked) {
            let x = 16;
            let y = canvas.height / 3 + 16;
            let width = canvas.width / 3 - 2 * 16;
            let height = canvas.height / 3 * 2 - 2 * 16;
            this.drawTouchZone(x, y, width, height);
            this.drawControlZoneText(x, y, width, height);
        }
    }


    /**
     * Draws a touch zone.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width value.
     * @param {number} height - The height value.
     */
    drawTouchZone(x, y, width, height) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.strokeStyle = 'steelblue';
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
        this.ctx.fill();
    }


    /**
     * Draws the text of the control zone.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width value.
     * @param {number} height - The height value.
     */
    drawControlZoneText(x, y, width, height) {
        this.drawTouchZoneText('Laufen', x, y - 72, width, height);
        this.drawTouchZoneText('(2-mal tippen)', x, y - 36, width, height);
        this.drawTouchZoneText('+', x, y, width, height);
        this.drawTouchZoneText('Gehen / Klettern', x, y + 36, width, height);
        this.drawTouchZoneText('(wischen)', x, y + 72, width, height);
    }


    /**
     * Draws the text of the touch zone.
     * @param {string} text - The text to draw.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width value.
     * @param {number} height - The height value.
     */
    drawTouchZoneText(text, x, y, width, height) {
        this.setText('24px Roboto', 'center', 'steelblue');
        this.drawText(text, x + width / 2, y + height / 2 + 12);
    }


    /**
     * Draws the touch zone of the exit.
     */
    drawExitZone() {
        if (paused) {
            let y = 16;
            this.drawMiddleTouchZone('Exit', y);
        }
    }


    /**
     * Draws a touch zone in the middle.
     * @param {string} - The text to draw.
     * @param {number} y - The y value.
     */
    drawMiddleTouchZone(text, y) {
        let x = canvas.width / 2 - canvas.width / 16 * 3 / 2 + 16;
        let width = canvas.width / 16 * 3 - 2 * 16;
        let height = canvas.height / 9 * 2 - 2 * 16;
        this.drawTouchZone(x, y, width, height);
        this.drawTouchZoneText(text, x, y, width, height);
    }


    /**
     * Draws the touch zone of the pause.
     */
    drawPauseZone() {
        if (!pauseChecked) {
            let y = canvas.height - canvas.height / 9 * 2 + 16;
            this.drawMiddleTouchZone('Pause', y);
        }
    }


    /**
     * Draws the touch zone of the attack.
     */
    drawAttackZone() {
        if (!attackChecked) {
            let y = canvas.height / 3 + 16;
            this.drawRightTouchZone('Angreifen', y, '(halten)');
        }
    }


    /**
     * Draws a touch zone on the right side.
     * @param {string} - The text to draw.
     * @param {number} y - The y value.
     */
    drawRightTouchZone(text, y, subtext) {
        if (!paused) {
            let x = canvas.width / 3 * 2 + 16;
            let width = canvas.width / 3 - 2 * 16;
            let height = canvas.height / 3 - 2 * 16;
            this.drawTouchZone(x, y, width, height);
            this.drawTouchZoneText(text, x, y - 18, width, height);
            this.drawTouchZoneText(subtext, x, y + 18, width, height);
        }
    }


    /**
     * Draws the touch zone of the jump.
     */
    drawJumpZone() {
        if (!jumpChecked) {
            let y = canvas.height / 3 * 2 + 16;
            this.drawRightTouchZone('Springen', y, '(tippen)');
        }
    }
}