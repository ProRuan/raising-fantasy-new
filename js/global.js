let intervalIds = [];    // necessary?


// jsdoc
function setStoppableInterval(subfunction, interval) {
    let id = setInterval(subfunction, interval);
    intervalIds.push(id);
}


// jsdoc
function stopIntervals() {
    intervalIds.forEach((id) => {
        clearInterval(id);
    });
}


// to delete later?




// on testing ...

function pauseGame(logical) {
    if (world.hero.bomb) {
        world.hero.bomb.stop(logical);
    }

    world.hero.stop(logical);

    world.hpBar.stop(logical);
    world.energyBar.stop(logical);
    world.staminaBar.stop(logical);

    for (const [key] of Object.entries(world.level)) {
        let objectGroup = world.level[key];
        objectGroup.forEach((object) => {
            if (object.web) {
                object.web.stop(logical);
            }
            if (object.magic) {
                object.magic.stop(logical);
            }
            object.stop(logical);
        });
    }
}


function pauseThrowableObject(o, key, logical) {
    if (o[key]) {
        o[key].stop(logical);
    }
}


// jsdoc
function loadScore() {
    load('score');
    if (storableItems.score) {
        score = storableItems.score;
    }
}


// jsdoc
function loadVolume() {
    load('volume');
    if (storableItems.volume) {
        volume = storableItems.volume;
    }
}


// jsdoc
function load(key) {
    let valueAsText = localStorage.getItem(key);
    if (valueAsText) {
        storableItems[key] = JSON.parse(valueAsText);
    }
}


// jsdoc
function save(key) {
    let value = storableItems[key];
    let valueAsText = JSON.stringify(value);
    localStorage.setItem(key, valueAsText);
}