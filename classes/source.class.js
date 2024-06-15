class Source {
    startX = 60;
    crystalXCenter = 6240;
    crystalCollectedX = 5984;
    bossBattleX = 6780;
    bossBattleTriggerX = 6932;
    endX = 7620;


    // width, height, size ...
    // double code (flip book and coord) ...
    // enemy growl ...


    // jsdoc
    constructor() {
        this.setStartWorld();
        this.setLevelWorld();
    }


    // jsdoc
    setStartWorld() {
        this.setStartWorldImages();
        this.setStartWorldAudio();
    }


    // jsdoc
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


    // jsdoc
    getImageSource(path, width, height) {
        if (!height) {
            return { path: path, size: width };
        } else {
            return { path: path, width: width, height: height };
        }
    }


    // jsdoc
    setStartWorldAudio() {
        this.newWorld = audioNewWorld;
        this.newGame = audioNewGame;
    }


    // jsdoc
    setLevelWorld() {
        this.setLevelWorldImages();
        this.setLevelWorldFlipBooks();
        this.setLevelWorldAudio();
    }


    // jsdoc
    setLevelWorldImages() {
        this.setLevelComponents();
        this.setAvatarComponents();
    }


    // jsdoc
    setLevelComponents() {
        this.setSceneryImages();
        this.setGrassImages();
        this.setSimpleObjectImages();
        this.setAnimatedObjectImages();
        this.setLeafImage();
        this.setEndbossImage();
        this.setEnemyImages();
        this.setHeroImage();
        this.setMagicImages();
    }


    // jsdoc
    setSceneryImages() {
        this.background = this.getImageSource(imgBackground, 960, 540);
        this.cloud = this.getImageSource(imgCloud, 960, 540);
    }


    // jsdoc
    setGrassImages() {
        this.grassL = this.getImageSource(imgGrassL, 64);
        this.grassC = this.getImageSource(imgGrassC, 64);
        this.grassR = this.getImageSource(imgGrassR, 64);
        this.flyGrassL = this.getImageSource(imgFlyGrassL, 64);
        this.flyGrassC = this.getImageSource(imgFlyGrassC, 64);
        this.flyGrassR = this.getImageSource(imgFlyGrassR, 64);
    }


    // jsdoc
    setSimpleObjectImages() {
        this.tree = this.getImageSource(imgTree, 256);
        this.ladderB = this.getImageSource(imgLadderB, 32);
        this.ladderC = this.getImageSource(imgLadderC, 32);
        this.ladderT = this.getImageSource(imgLadderT, 32);
    }


    // jsdoc
    setAnimatedObjectImages() {
        this.bird = this.getImageSource(imgBird, 64);
        this.bomb = this.getImageSource(imgBomb, 256);
        this.coin = this.getImageSource(imgCoin, 32);
        this.crystal = this.getImageSource(imgCrystal, 32);
        this.heart = this.getImageSource(imgHeart, 32);
        this.hitPoint = this.getImageSource(imgHitPoint, 32);
        this.star = this.getImageSource(imgStar, 32);
        this.web = this.getImageSource(imgWeb, 32);
    }


    // jsdoc
    setLeafImage() {
        this.leaf = this.getImageSource(imgLeaf, 32);
    }


    // jsdoc
    setEndbossImage() {
        this.shaman = this.getImageSource(imgShaman, 256);
    }


    // jsdoc
    setEnemyImages() {
        this.dino = this.getImageSource(imgDino, 128);
        this.ent = this.getImageSource(imgEnt, 256);
        this.spider = this.getImageSource(imgSpider, 128);
    }


    // jsdoc
    setHeroImage() {
        this.knight = this.getImageSource(imgKnight, 128);
    }


    // jsdoc
    setMagicImages() {
        this.blade = this.getImageSource(imgBlade, 256);
        this.fire = this.getImageSource(imgFire, 256);
        this.lightning = this.getImageSource(imgLightning, 256);
    }


    // jsdoc
    setAvatarComponents() {
        this.setAvatarImages();
        this.setHpBarImages();
        this.setEnergyBarImages();
        this.setStaminaBarImages();
        this.setItemImages();
    }


    // jsdoc
    setAvatarImages() {
        this.avatarImage = this.getImageSource(imgAvatarImage, 64);
        this.avatarFrame = this.getImageSource(imgAvatarFrame, 76, 79);
        this.setCoord('avatarImage', 24, 452.5);
        this.setCoord('avatarFrame', 16, 445);
    }


    // jsdoc
    setCoord(key, x, y) {
        this[key].x = x;
        this[key].y = y;
    }


    // jsdoc
    setHpBarImages() {
        this.hpBarBg = this.getImageSource(imgHpBarBg, 121, 14);
        this.hpPoint = this.getImageSource(imgHpPoint, 1, 12);
        this.hpBarBorder = this.getImageSource(imgHpBarBorder, 127, 20);
        this.setCoord('hpBarBg', 95, 503);
        this.setCoord('hpPoint', 0, 506);
        this.setCoord('hpBarBorder', 92, 500);
    }


    // jsdoc
    setEnergyBarImages() {
        this.energyBarBg = this.getImageSource(imgEnergyBarBg, 97, 13);
        this.energyPoint = this.getImageSource(imgEnergyPoint, 1, 10);
        this.energyBarBorder = this.getImageSource(imgEnergyBarBorder, 102, 18);
        this.setCoord('energyBarBg', 94.5, 484);
        this.setCoord('energyPoint', 0, 486);
        this.setCoord('energyBarBorder', 92, 482);
    }


    // jsdoc
    setStaminaBarImages() {
        this.staminaBarBg = this.getImageSource(imgStaminaBarBg, 97, 13);
        this.staminaPoint = this.getImageSource(imgStaminaPoint, 1, 10);
        this.staminaBarBorder = this.getImageSource(imgStaminaBarBorder, 102, 18);
        this.setCoord('staminaBarBg', 94.5, 466);
        this.setCoord('staminaPoint', 0, 468);
        this.setCoord('staminaBarBorder', 92, 464);
    }


    // jsdoc
    setItemImages() {
        this.itemBg = this.getImageSource(imgItemBg, 34, 35);
        this.itemBomb = this.getImageSource(imgItemBomb, 35);
        this.itemBorder = this.getImageSource(imgItemBorder, 40);
        this.setCoord('itemBg', 23, 411.5);
        this.setCoord('itemBomb', 22.5, 411.5);
        this.setCoord('itemBorder', 20, 409);
    }


    // jsdoc
    setLevelWorldFlipBooks() {
        this.setFlipBook('dino', FLIP_BOOK_DINO);
        this.setFlipBook('ent', FLIP_BOOK_ENT);
        this.setFlipBook('spider', FLIP_BOOK_SPIDER);
        this.setFlipBook('shaman', FLIP_BOOK_SHAMAN);
        this.setFlipBook('knight', FLIP_BOOK_KNIGHT);
    }


    // jsdoc
    setFlipBook(key, flipBook) {
        this[key].flipBook = flipBook;
    }


    // jsdoc
    setLevelWorldAudio() {
        this.setLevelWorldMusic();
        this.setAnimatedObjectAudio();
        this.setLeafAudio();
        this.setEndbossAudio();
        this.setEnemyAudio();
        this.setHeroAudio();
        this.setMagicAudio();
    }


    // jsdoc
    setLevelWorldMusic() {
        this.ambience = audioAmbience;
        this.bossBattle = audioBossBattle;
    }


    // jsdoc
    setAnimatedObjectAudio() {
        this.setAudioSource('coin', audioCoin);
        this.setAudioSource('crystal', audioCrystal);
        this.setAudioSource('heart', audioHeart);
        this.setAudioSource('hitPoint', audioHitPoint);
        this.setAudioSource('star', audioStar);
        this.setAudioSource('web', audioWeb);
    }


    // jsdoc
    setLeafAudio() {
        this.setAudioSource('leaf', audioLeaf);
    }


    // jsdoc
    setAudioSource(key, path, subkey) {
        if (!subkey) {
            this[key].sound = path;
        } else {
            this[key][subkey] = path;
        }
    }


    // jsdoc
    setEndbossAudio() {
        this.setAudioSource('shaman', audioShamanGrowl, 'growl');
        this.setAudioSource('shaman', audioWeaponImpact, 'weaponImpact');
        this.setAudioSource('shaman', audioArmorHit, 'armorHit');
    }


    // jsdoc
    setEnemyAudio() {
        this.setAudioSource('dino', audioDinoGrowl, 'growl');
        this.setAudioSource('ent', audioEntGrowl, 'growl');
        this.setAudioSource('spider', audioSpiderGrowl, 'growl');
        this.addEnemyAudio(audioWeaponImpact, 'weaponImpact');
        this.addEnemyAudio(audioArmorHit, 'armorHit');
    }


    // jsdoc
    addEnemyAudio(path, subkey) {
        this.setAudioSource('dino', path, subkey);
        this.setAudioSource('ent', path, subkey);
        this.setAudioSource('spider', path, subkey);
    }


    // jsdoc
    setHeroAudio() {
        this.goAway = audioGoAway;
        this.staveStep = audioStaveStep;
        this.grassStep = audioGrassStep;
        this.swordDraw = audioSwordDraw;
        this.skillUpgrade = audioSkillUpgrade;
        this.bombThrow = audioBombThrow;
        this.bombBurst = audioBombBurst;
    }


    // jsdoc
    setMagicAudio() {
        this.addMagicSound('blade', audioBladeCast, audioBladeHit);
        this.addMagicSound('fire', audioFireCast, audioFireHit);
        this.addMagicSound('lightning', audioLightningCast, audioLightningHit);
    }


    // jsdoc
    addMagicSound(key, cast, hit) {
        this[key].sound = { cast: cast, hit: hit };
    }
}