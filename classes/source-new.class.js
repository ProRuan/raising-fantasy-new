class Source {


    // rename file + add to index.html!!!


    constructor() {
        this.setStartWorldImageSource();
        this.setLevelWorldImageSource();

        // set audio start world ...

        this.setSourceX();
    }


    // jsdoc
    setStartWorldImageSource() {
        this.mainBG = this.getImageSource(imgMainBg, 960, 540);
        this.questRoll = this.getImageSource(imgQuestRoll, 276, 333);
        this.coinButton = this.getImageSource(imgCoinButton, 27, 27);
        this.cupButton = this.getImageSource(imgCupButton, 66, 66);
        this.leaderboard = this.getImageSource(imgLeaderboard, 382, 441);
        this.xButton = this.getImageSource(imgXButton, 28, 28);
        this.settingsButton = this.getImageSource(imgSettingsButton, 66, 66);
        this.arrowLeft = this.getImageSource(imgArrowLeft, 10, 17);
        this.arrowRight = this.getImageSource(imgArrowRight, 10, 17);
    }


    // jsdoc
    getImageSource(path, width, height) {
        return { path: path, width: width, height: height };
    }


    // jsdoc
    setLevelWorldImageSource() {
        this.setSceneryImageSources();
        this.setGrassImageSources();
        this.setSimpleObjectImageSources();
        this.setAnimatedObjectImageSources();
        this.setLeafImageSource();
        this.setEndbossImageSource();
        this.setEnemyImageSources();
        this.setMagicImageSources();
    }


    // jsdoc
    setSceneryImageSources() {
        this.background = this.getImageSource(imgBackground, 960, 540);
        this.cloud = this.getImageSource(imgCloud, 960, 540);
    }


    // jsdoc
    setGrassImageSources() {
        this.grassL = this.getImageSource(imgGrassL, 64);
        this.grassC = this.getImageSource(imgGrassC, 64);
        this.grassR = this.getImageSource(imgGrassR, 64);
        this.flyGrassL = this.getImageSource(imgFlyGrassL, 64);
        this.flyGrassC = this.getImageSource(imgFlyGrassC, 64);
        this.flyGrassR = this.getImageSource(imgFlyGrassR, 64);
    }


    // jsdoc
    setSimpleObjectImageSources() {
        this.tree = this.getImageSource(imgTree, 256);
        this.ladderB = this.getImageSource(imgLadderB, 32);
        this.ladderC = this.getImageSource(imgLadderC, 32);
        this.ladderT = this.getImageSource(imgLadderT, 32);
    }


    // jsdoc
    setAnimatedObjectImageSources() {
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
    setLeafImageSource() {
        this.leaf = this.getImageSource(imgLeaf, 32);
    }


    // jsdoc
    setEndbossImageSource() {
        this.shaman = this.getImageSource(imgShaman, 256);
    }


    // jsdoc
    setEnemyImageSources() {
        this.dino = this.getImageSource(imgDino, 128);
        this.ent = this.getImageSource(imgEnt, 256);
        this.spider = this.getImageSource(imgSpider, 128);
    }


    // jsdoc
    setMagicImageSources() {
        this.blade = this.getImageSource(imgBlade, 256);
        this.fire = this.getImageSource(imgFire, 256);
        this.lightning = this.getImageSource(imgLightning, 256);
    }




    // add flip book sources ... !!!





    // jsdoc
    setAnimatedObjectAudioSources() {
        this.setAudioSource('coin', audioCoin);
        this.setAudioSource('crystal', audioCrystal);
        this.setAudioSource('heart', audioHeart);
        this.setAudioSource('hitPoint', audioHitPoint);
        this.setAudioSource('star', audioStar);
        this.setAudioSource('web', audioWeb);
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
    setEnemyAudioSources() {
        this.setAudioSource('dino', audioDinoGrowl, 'growl');
        this.setAudioSource('ent', audioEntGrowl, 'growl');
        this.setAudioSource('spider', audioSpiderGrowl, 'growl');
        this.addEnemyAudioSource(audioWeaponImpact, 'weaponImpact');
        this.addEnemyAudioSource(audioArmorHit, 'armorHit');
    }


    // jsdoc
    addEnemyAudioSource(path, subkey) {
        this.setAudioSource('dino', path, subkey);
        this.setAudioSource('ent', path, subkey);
        this.setAudioSource('spider', path, subkey);
    }


    // jsdoc
    setMagicAudioSources() {
        this.setAudioSource('blade', audioBladeCast, 'cast');
        this.setAudioSource('fire', audioFireCast, 'cast');
        this.setAudioSource('lightning', audioLightningCast, 'cast');
        this.setAudioSource('blade', audioBladeHit, 'hit');
        this.setAudioSource('fire', audioFireHit, 'hit');
        this.setAudioSource('lightning', audioLightningHit, 'hit');
    }


    // jsdoc
    setSourceX() {
        this.startX = 60;
        this.crystalXCenter = 6240;
        this.crystalCollectedX = 5984;
        this.bossBattleX = 6780;
        this.bossBattleTriggerX = 6932;
        this.endX = 7620;
    }
}