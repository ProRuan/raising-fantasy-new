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
function isTrue(value) {
    return (value == true) ? true : false;
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
function isTimeout(timeout, time) {
    return timeout && isGreater(timeout, time);
}




// jsdoc
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