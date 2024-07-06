/**
 * Sets the pause.
 */
function setPause() {
    if (isMatch(currentWorld, 'level') && !isTrue(pauseDisabled)) {
        if (isKey('escape')) {
            exitLevel();
        } else if (isKey('keyP')) {
            pauseLevel();
        }
    }
}


/**
 * Exits the level.
 */
function exitLevel() {
    if (paused) {
        world.stopped = true;
        setStartWorld();
        world.interacted = true;
        world.setCurrentButton('newGameButton');
    }
}


/**
 * Pause the level.
 */
function pauseLevel() {
    setGamePaused();
    setPauseTime();
}


/**
 * Set game paused.
 */
function setGamePaused() {
    if (!paused) {
        paused = true;
        pauseGame(true);
    } else {
        paused = false;
        pauseGame(false);
    }
}


/**
 * Pauses the game.
 * @param {boolean} logical - A boolean value.
 */
function pauseGame(logical) {
    if (!isTrue(pauseDisabled)) {
        pauseHero(logical);
        pauseStateBars(logical);
        pauseLevelComponents(logical);
        world.pauseSound(logical);
    }
}


/**
 * Pauses the hero.
 * @param {boolean} logical - A boolean value.
 */
function pauseHero(logical) {
    let hero = world.hero;
    pauseLevelObject(hero, 'bomb', logical);
    pauseLevelObject(hero, 'interval', logical);
}


/**
 * Pauses a level object.
 * @param {object} object - The object to pause.
 * @param {string} key - The key of the subobject.
 * @param {boolean} logical - A boolean value.
 */
function pauseLevelObject(object, key, logical) {
    if (isMatch(key, 'interval') && object[key]) {
        object.stop(logical);
    } else if (object[key]) {
        object[key].stop(logical);
    }
}


/**
 * Pauses the state bars.
 * @param {boolean} logical - A boolean value.
 */
function pauseStateBars(logical) {
    let keys = ['hpBar', 'energyBar', 'staminaBar'];
    keys.forEach((key) => {
        let stateBar = world[key];
        pauseLevelObject(stateBar, 'interval', logical);
    });
}


/**
 * Pauses the level components.
 * @param {boolean} logical - A boolean value.
 */
function pauseLevelComponents(logical) {
    for (const [key] of Object.entries(world.level)) {
        let objectGroup = world.level[key];
        objectGroup.forEach((object) => {
            pauseLevelObject(object, 'magic', logical);
            pauseLevelObject(object, 'web', logical);
            pauseLevelObject(object, 'interval', logical);
        });
    }
}


/**
 * Sets the time of the pause.
 */
function setPauseTime() {
    if (isTrue(paused)) {
        setPauseStart();
    } else {
        setPauseEnd();
        applyPauseOffset();
    }
}


/**
 * Sets the start time of the pause.
 */
function setPauseStart() {
    pauseStart = getTime();
    pauseLevelMusic('pause');
}


/**
 * Pauses the level music.
 * @param {string} method - The method to apply.
 */
function pauseLevelMusic(method) {
    world.hero.music[method]();
    if (world.endboss.triggered) {
        world.endboss.music[method]();
    }
}


/**
 * Sets the end time of the pause.
 */
function setPauseEnd() {
    pauseEnd = getTime();
    pauseTime += getSum(pauseEnd, -pauseStart);
    pauseLevelMusic('play');
}


/**
 * Applies the pause offset.
 */
function applyPauseOffset() {
    addEndbossPauseOffset();
    addEnemyPauseOffset();
    addHeroPauseOffset();
    addMagicPauseOffset();
}


/**
 * Adds the pause offset of the endboss.
 */
function addEndbossPauseOffset() {
    addPauseOffset(world, 'endboss', 'calmTime');
    addPauseOffset(world, 'endboss', 'nextCast');
    addPauseOffset(world, 'endboss', 'chapterTime');
    addPauseOffset(world, 'endboss', 'selectionTime');
}


/**
 * Adds the pause offset.
 * @param {object} variable - The providing object.
 * @param {string} key - The key of the object to update.
 * @param {string} subkey - The key of the subobject to update.
 */
function addPauseOffset(variable, key, subkey) {
    if (!subkey && variable[key]) {
        variable[key] += getSum(pauseEnd, -pauseStart);
    } else if (subkey && variable[key][subkey]) {
        variable[key][subkey] += getSum(pauseEnd, -pauseStart);
    }
}


/**
 * Adds the pause offset of the enemies.
 */
function addEnemyPauseOffset() {
    world.enemies.forEach((enemy) => {
        addPauseOffset(enemy, 'timeToGo');
        addPauseOffset(enemy, 'hitTime');
        addInstancePauseOffset(enemy, Dino, 'pursuitStop');
        addInstancePauseOffset(enemy, Ent, 'lastTurn');
        addInstancePauseOffset(enemy, Spider, 'nextThrow');
    });
}


/**
 * Adds the pause offset of an enemy.
 * @param {Enemy} enemy - The enemy object.
 * @param {instance} object - The instance of the enemy.
 * @param {string} key - The key of the value to update.
 */
function addInstancePauseOffset(enemy, object, key) {
    if (enemy instanceof object) {
        enemy[key] += getSum(pauseEnd, -pauseStart);
        addWebPauseOffset(enemy);
    }
}


/**
 * Adds the pause offset to a web.
 * @param {Enemy} enemy - The enemy object.
 */
function addWebPauseOffset(enemy) {
    if (enemy instanceof Spider && enemy.web) {
        addPauseOffset(enemy, 'web', 'throwResetTime');
        addPauseOffset(enemy, 'web', 'throwDoneTime');
    }
}


/**
 * Adds the pause offset of the hero.
 */
function addHeroPauseOffset() {
    addPauseOffset(world, 'hero', 'jumpTime');
    addPauseOffset(world, 'hero', 'lastIdle');
}


/**
 * Adds the pause offset of the magic.
 */
function addMagicPauseOffset() {
    let magic = world.endboss.magic;
    if (magic && magic instanceof Lightning) {
        addPauseOffset(magic, 'targetingStop');
        addPauseOffset(magic, 'chargingStop');
    }
}