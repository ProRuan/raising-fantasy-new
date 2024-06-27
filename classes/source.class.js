/**
 * Represents a source.
 */
class Source {
    startX = 60;
    crystalXCenter = 6240;
    crystalCollectedX = 5984;
    bossBattleX = 6780;
    bossBattleTriggerX = 6948;
    endX = 7620;


    /**
     * Creates a source.
     */
    constructor() {
        this.setStartWorld();
        this.setLevelWorld();
    }


    /**
     * Sets the start world.
     */
    setStartWorld() {
        this.setStartWorldImages();
        this.setStartWorldAudio();
    }


    /**
     * Sets the image sources of the start world.
     */
    setStartWorldImages() {
        this.mainBg = this.getImageSource(imgMainBg, 960, 540);
        this.questRoll = this.getImageSource(imgQuestRoll, 276, 333);
        this.coinButton = this.getImageSource(imgCoinButton, 27);
        this.cupButton = this.getImageSource(imgCupButton, 66);
        this.leaderboard = this.getImageSource(imgLeaderboard, 382, 441);
        this.xButton = this.getImageSource(imgXButton, 28);
        this.settingsButton = this.getImageSource(imgSettingsButton, 66);
        this.arrowLeft = this.getImageSource(imgArrowLeft, 10, 17);
        this.arrowRight = this.getImageSource(imgArrowRight, 10, 17);
    }


    /**
     * Provides the source of an image.
     * @param {string} path - The path of the image.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     * @returns {object} - The object of the image source.
     */
    getImageSource(path, width, height) {
        if (!height) {
            return { path: path, size: width };
        } else {
            return { path: path, width: width, height: height };
        }
    }


    /**
     * Sets the audio source of the start world.
     */
    setStartWorldAudio() {
        this.newWorld = audioNewWorld;
        this.newGame = audioNewGame;
    }


    /**
     * Sets the level world.
     */
    setLevelWorld() {
        this.setLevelWorldImages();
        this.setLevelWorldFlipBooks();
        this.setLevelWorldAudio();
    }


    /**
     * Sets the image sources of the level world.
     */
    setLevelWorldImages() {
        this.setLevelComponents();
        this.setAvatarComponents();
    }


    /**
     * Sets the level components.
     */
    setLevelComponents() {
        this.setSceneryImages();
        this.setGrassImages();
        this.setSimpleObjectImages();
        this.setAnimatedObjectImages();
        this.setEnemyImages();
        this.setHeroImage();
        this.setMagicImages();
    }


    /**
     * Sets the image sources of the scenery.
     */
    setSceneryImages() {
        this.background = this.getImageSource(imgBackground, 960, 540);
        this.cloud = this.getImageSource(imgCloud, 960, 540);
    }


    /**
     * Sets the image sources of the grass objects.
     */
    setGrassImages() {
        this.grassL = this.getImageSource(imgGrassL, 64);
        this.grassC = this.getImageSource(imgGrassC, 64);
        this.grassR = this.getImageSource(imgGrassR, 64);
        this.flyGrassL = this.getImageSource(imgFlyGrassL, 64);
        this.flyGrassC = this.getImageSource(imgFlyGrassC, 64);
        this.flyGrassR = this.getImageSource(imgFlyGrassR, 64);
    }


    /**
     * Sets the image sources of the simple objects,
     */
    setSimpleObjectImages() {
        this.tree = this.getImageSource(imgTree, 256);
        this.ladderB = this.getImageSource(imgLadderB, 32);
        this.ladderC = this.getImageSource(imgLadderC, 32);
        this.ladderT = this.getImageSource(imgLadderT, 32);
    }


    /**
     * Sets the image sources of the animated objects.
     */
    setAnimatedObjectImages() {
        this.bird = this.getImageSource(imgBird, 64);
        this.bomb = this.getImageSource(imgBomb, 256);
        this.coin = this.getImageSource(imgCoin, 32);
        this.crystal = this.getImageSource(imgCrystal, 32);
        this.heart = this.getImageSource(imgHeart, 32);
        this.hitPoint = this.getImageSource(imgHitPoint, 32);
        this.leaf = this.getImageSource(imgLeaf, 32);
        this.star = this.getImageSource(imgStar, 32);
        this.web = this.getImageSource(imgWeb, 32);
    }


    /**
     * Sets the image sources of the enemies.
     */
    setEnemyImages() {
        this.shaman = this.getImageSource(imgShaman, 256);
        this.dino = this.getImageSource(imgDino, 128);
        this.ent = this.getImageSource(imgEnt, 256);
        this.spider = this.getImageSource(imgSpider, 128);
    }


    /**
     * Sets the image source of the hero.
     */
    setHeroImage() {
        this.knight = this.getImageSource(imgKnight, 128);
    }


    /**
     * Sets the image sources of the magic.
     */
    setMagicImages() {
        this.blade = this.getImageSource(imgBlade, 256);
        this.fire = this.getImageSource(imgFire, 256);
        this.lightning = this.getImageSource(imgLightning, 256);
    }


    /**
     * Sets the avatar components.
     */
    setAvatarComponents() {
        this.setAvatarImages();
        this.setHpBarImages();
        this.setEnergyBarImages();
        this.setStaminaBarImages();
        this.setItemImages();
    }


    /**
     * Sets the image sources of the avatar.
     */
    setAvatarImages() {
        this.avatarImage = this.getImageSource(imgAvatarImage, 64);
        this.avatarFrame = this.getImageSource(imgAvatarFrame, 76, 79);
        this.addCoord('avatarImage', 24, 452.5);
        this.addCoord('avatarFrame', 16, 445);
    }


    /**
     * Adds the coordinates of the image.
     * @param {string} key - The key of the variable.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    addCoord(key, x, y) {
        this[key].x = x;
        this[key].y = y;
    }


    /**
     * Sets the image sources of the hp bar.
     */
    setHpBarImages() {
        this.hpBarBg = this.getImageSource(imgHpBarBg, 121, 14);
        this.hpPoint = this.getImageSource(imgHpPoint, 1, 12);
        this.hpBarBorder = this.getImageSource(imgHpBarBorder, 127, 20);
        this.addCoord('hpBarBg', 95, 503);
        this.addCoord('hpPoint', 0, 506);
        this.addCoord('hpBarBorder', 92, 500);
    }


    /**
     * Sets the image sources of the energy bar.
     */
    setEnergyBarImages() {
        this.energyBarBg = this.getImageSource(imgEnergyBarBg, 97, 13);
        this.energyPoint = this.getImageSource(imgEnergyPoint, 1, 10);
        this.energyBarBorder = this.getImageSource(imgEnergyBarBorder, 102, 18);
        this.addCoord('energyBarBg', 94.5, 484);
        this.addCoord('energyPoint', 0, 486);
        this.addCoord('energyBarBorder', 92, 482);
    }


    /**
     * Sets the image sources of the stamina bar.
     */
    setStaminaBarImages() {
        this.staminaBarBg = this.getImageSource(imgStaminaBarBg, 97, 13);
        this.staminaPoint = this.getImageSource(imgStaminaPoint, 1, 10);
        this.staminaBarBorder = this.getImageSource(imgStaminaBarBorder, 102, 18);
        this.addCoord('staminaBarBg', 94.5, 466);
        this.addCoord('staminaPoint', 0, 468);
        this.addCoord('staminaBarBorder', 92, 464);
    }


    /**
     * Sets the image sources of the item.
     */
    setItemImages() {
        this.itemBg = this.getImageSource(imgItemBg, 34, 35);
        this.itemBomb = this.getImageSource(imgItemBomb, 35);
        this.itemBorder = this.getImageSource(imgItemBorder, 40);
        this.addCoord('itemBg', 23, 411.5);
        this.addCoord('itemBomb', 22.5, 411.5);
        this.addCoord('itemBorder', 20, 409);
    }


    /**
     * Sets the flip books of the moveable objects.
     */
    setLevelWorldFlipBooks() {
        this.addFlipBook('dino', FLIP_BOOK_DINO);
        this.addFlipBook('ent', FLIP_BOOK_ENT);
        this.addFlipBook('spider', FLIP_BOOK_SPIDER);
        this.addFlipBook('shaman', FLIP_BOOK_SHAMAN);
        this.addFlipBook('knight', FLIP_BOOK_KNIGHT);
    }


    /**
     * Adds a flip book to a variable.
     * @param {string} key - The key of the variable.
     * @param {array} flipBook - The flip book to add.
     */
    addFlipBook(key, flipBook) {
        this[key].flipBook = flipBook;
    }


    /**
     * Sets the audio sources of the level world.
     */
    setLevelWorldAudio() {
        this.setLevelWorldMusic();
        this.setAnimatedObjectAudio();
        this.setEnemyAudio();
        this.setHeroAudio();
        this.setMagicAudio();
    }


    /**
     * Sets the audio sources of the music.
     */
    setLevelWorldMusic() {
        this.ambience = audioAmbience;
        this.bossBattle = audioBossBattle;
    }


    /**
     * Sets the audio sources of the animated objects.
     */
    setAnimatedObjectAudio() {
        this.addAudioSource('coin', audioCoin);
        this.addAudioSource('crystal', audioCrystal);
        this.addAudioSource('heart', audioHeart);
        this.addAudioSource('hitPoint', audioHitPoint);
        this.addAudioSource('leaf', audioLeaf);
        this.addAudioSource('star', audioStar);
        this.addAudioSource('web', audioWeb);
    }


    /**
     * Adds an audio source to an variable.
     * @param {string} key - The key of the variable.
     * @param {string} path - The path to add.
     * @param {string} subkey - The subkey of the audio source.
     */
    addAudioSource(key, path, subkey) {
        (!subkey) ? this[key].sound = path : this[key][subkey] = path;
    }


    /**
     * Sets the audio sources of the enemies.
     */
    setEnemyAudio() {
        this.addAudioSource('shaman', audioShamanGrowl, 'growl');
        this.addAudioSource('dino', audioDinoGrowl, 'growl');
        this.addAudioSource('ent', audioEntGrowl, 'growl');
        this.addAudioSource('spider', audioSpiderGrowl, 'growl');
        this.addEnemyAudio(audioWeaponImpact, 'weaponImpact');
        this.addEnemyAudio(audioArmorHit, 'armorHit');
    }


    /**
     * Adds additional audio sources to the enemies.
     * @param {string} path - The path to add.
     * @param {string} subkey - The subkey of the audio source.
     */
    addEnemyAudio(path, subkey) {
        this.addAudioSource('shaman', path, subkey);
        this.addAudioSource('dino', path, subkey);
        this.addAudioSource('ent', path, subkey);
        this.addAudioSource('spider', path, subkey);
    }


    /**
     * Sets the audio sources of the hero.
     */
    setHeroAudio() {
        this.goAway = audioGoAway;
        this.staveStep = audioStaveStep;
        this.grassStep = audioGrassStep;
        this.swordDraw = audioSwordDraw;
        this.skillUpgrade = audioSkillUpgrade;
        this.bombThrow = audioBombThrow;
        this.bombBurst = audioBombBurst;
    }


    /**
     * Sets the audio sources of the magic.
     */
    setMagicAudio() {
        this.addMagicSound('blade', audioBladeCast, audioBladeHit);
        this.addMagicSound('fire', audioFireCast, audioFireHit);
        this.addMagicSound('lightning', audioLightningCast, audioLightningHit);
    }


    /**
     * Adds the audio source to the magic.
     * @param {string} key - The key of the variable.
     * @param {string} cast - The path of the cast sound.
     * @param {string} hit - The path of the hit sound.
     */
    addMagicSound(key, cast, hit) {
        this[key].sound = { cast: cast, hit: hit };
    }
}