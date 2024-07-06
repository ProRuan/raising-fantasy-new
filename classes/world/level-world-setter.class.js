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
}