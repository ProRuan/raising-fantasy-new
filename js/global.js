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


// jsdoc
function executeEvent(key, subfunction) {
    return document.addEventListener(key, subfunction);
}


// jsdoc
function formatInitial(word, method) {
    let initial = word[0];
    return word.replace(initial, initial[method]());
}


// jsdoc
function isMatch(a, b) {
    return a == b;
}


// jsdoc
function getTime() {
    return new Date().getTime();
}


// jsdoc
function isUndefined(value) {
    return value === undefined;
}


// jsdoc
function isTrue(value) {
    return (value == true) ? true : false;
}


// jsdoc
function isCollided(a, b) {
    return isCollidedX(a, b) && isCollidedY(a, b);
}


// jsdoc
function isCollidedX(a, b) {
    let aLeft = isIncluded(b.xLeft, a.xLeft, b.xRight);
    let bLeft = isIncluded(a.xLeft, b.xLeft, a.xRight);
    let aRight = isIncluded(b.xLeft, a.xRight, b.xRight);
    let bRight = isIncluded(a.xLeft, b.xRight, a.xRight);
    return (aLeft || bLeft) || (aRight || bRight);
}


// jsdoc
function isCollidedY(a, b) {
    let aTop = isIncluded(b.yTop, a.yTop, b.yBottom);
    let bTop = isIncluded(a.yTop, b.yTop, a.yBottom);
    let aBottom = isIncluded(b.yTop, a.yBottom, b.yBottom);
    let bBottom = isIncluded(a.yTop, b.yBottom, a.yBottom);
    return (aTop || bTop) || (aBottom || bBottom);
}


// jsdoc
function isIncluded2D(m, o) {
    let xIncluded = isIncluded(o.xLeft, m.x, o.xRight);
    let yIncluded = isIncluded(o.yTop, m.y, o.yBottom);
    return xIncluded && yIncluded;
}


// jsdoc
function isIncluded(a, b, c) {
    return isGreater(a, b) && isGreater(b, c);
}


// jsdoc
function isGreater(a, b, tolerant) {
    return (!tolerant) ? a < b : a <= b;
}


// jsdoc
function formatSplitWord(text) {
    if (text.includes('_')) {
        let formattedText = getFormattedSplitWord(text);
        return formattedText;
    } else {
        return text;
    }
}


// jsdoc
function getFormattedSplitWord(text) {
    text = text.split('_');
    let firstWord = text[0];
    let secondWord = formatInitial(text[1], 'toUpperCase');
    return firstWord + secondWord;
}


// jsdoc
function getLastElement(array) {
    return array[array.length - 1];
}


// jsdoc
function getRandomNumber(max, dev) {
    return max - Math.round(Math.random() * dev);
}


// jsdoc
function getSum(summandA, summandB) {
    return summandA + summandB;
}


// jsdoc
function getVerifiedValue(valueA, valueB) {
    return isGreater(valueA, valueB) ? valueA : valueB;
}


// jsdoc
function isOnTime(current, last, value) {
    let timeDiff = current - last;
    return isGreater(value, timeDiff);
}


// jsdoc
function isTimeout(timeout, time) {
    return timeout && isGreater(timeout, time);
}




function setClass(id, method, className) {
    document.getElementById(id).classList[method](className);
}


function checkOrientation() {
    let orientation = screen.orientation.type;
    if (isMatch(orientation, 'landscape-primary')) {
        console.log(orientation);
    } else if (isMatch(orientation, 'portrait-primary')) {
        console.log(orientation);
    }
}




// screen size not exactly (background gap!) ...
// white line below game screen (depends on phone size) ...
// buttons / touch events ...
// await loading of images (progress bar?) ...
// answers and questions ...