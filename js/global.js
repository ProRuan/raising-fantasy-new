/**
 * Initializes a link html.
 */
async function initLink() {
    await includeHTML('template');
    removeElement('game-manual-link');
    removeElement('game-manual-btn');
}


/**
 * Removes an element.
 * @param {string} id - The id of the element.
 */
function removeElement(id) {
    document.getElementById(id).remove();
}


/**
 * Includes another html.
 */
async function includeHTML(template) {
    let inclusion = document.querySelectorAll(`[${template}]`);
    for (let i = 0; i < inclusion.length; i++) {
        const element = inclusion[i];
        file = element.getAttribute(`${template}`);
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found.';
        }
    }
}


/**
 * Loads a storable item.
 * @param {string} key - The key of the storable item.
 */
function load(key) {
    let valueAsText = localStorage.getItem(key);
    if (valueAsText) {
        storableItems[key] = JSON.parse(valueAsText);
    }
}


/**
 * Saves a storable item.
 * @param {string} key - The key of the storable item.
 */
function save(key) {
    let value = storableItems[key];
    let valueAsText = JSON.stringify(value);
    localStorage.setItem(key, valueAsText);
}


/**
 * Executes an event.
 * @param {string} key - The key of the event.
 * @param {function} subfunction - The subfunction to execute.
 */
function executeEvent(key, subfunction) {
    document.addEventListener(key, subfunction);
}


/**
 * Formats the initial of a word.
 * @param {string} word - The word to format.
 * @param {string} method - The method to apply.
 * @returns {string} - The formatted word.
 */
function formatInitial(word, method) {
    let initial = word[0];
    return word.replace(initial, initial[method]());
}


/**
 * Verifies a match.
 * @param {any} a - The value a to compare.
 * @param {any} b - The value b to compare.
 * @returns {boolean} - A boolean value.
 */
function isMatch(a, b) {
    return a == b;
}


/**
 * Provides the time.
 * @returns {number} - The time.
 */
function getTime() {
    return new Date().getTime();
}


/**
 * Verifies, if the value is undefined.
 * @param {any} value - The value to verify.
 * @returns {boolean} - A boolean value.
 */
function isUndefined(value) {
    return value === undefined;
}


/**
 * Verifies, if the value is true.
 * @param {any} value - The value to verify.
 * @returns {boolean} - A boolean value.
 */
function isTrue(value) {
    return (value == true) ? true : false;
}


/**
 * Verifies, if two objects are collided.
 * @param {object} a - The object a to compare.
 * @param {object} b - The object b to compare.
 * @returns {boolean} - A boolean value.
 */
function isCollided(a, b) {
    return isCollidedX(a, b) && isCollidedY(a, b);
}


/**
 * Verifies the collision on the x-axis.
 * @param {object} a - The object a to compare.
 * @param {object} b - The object b to compare.
 * @returns {boolean} - A boolean value.
 */
function isCollidedX(a, b) {
    let aLeft = isIncluded(b.xLeft, a.xLeft, b.xRight);
    let bLeft = isIncluded(a.xLeft, b.xLeft, a.xRight);
    let aRight = isIncluded(b.xLeft, a.xRight, b.xRight);
    let bRight = isIncluded(a.xLeft, b.xRight, a.xRight);
    return (aLeft || bLeft) || (aRight || bRight);
}


/**
 * Verifies the collision on the y-axis.
 * @param {object} a - The object a to compare.
 * @param {object} b - The object b to compare.
 * @returns {boolean} - A boolean value.
 */
function isCollidedY(a, b) {
    let aTop = isIncluded(b.yTop, a.yTop, b.yBottom);
    let bTop = isIncluded(a.yTop, b.yTop, a.yBottom);
    let aBottom = isIncluded(b.yTop, a.yBottom, b.yBottom);
    let bBottom = isIncluded(a.yTop, b.yBottom, a.yBottom);
    return (aTop || bTop) || (aBottom || bBottom);
}


/**
 * Verifies, if the (mouse) object is included.
 * @param {object} m - The (mouse) object to compare.
 * @param {object} o - The object to compare.
 * @returns {boolean} - A boolean value.
 */
function isIncluded2D(m, o) {
    let xIncluded = isIncluded(o.xLeft, m.x, o.xRight);
    let yIncluded = isIncluded(o.yTop, m.y, o.yBottom);
    return xIncluded && yIncluded;
}


/**
 * Verifies, if the middle value is included.
 * @param {number} a - The value a to compare.
 * @param {number} b - The value b to compare.
 * @param {number} c - The value c to compare.
 * @returns {boolean} - A boolean value.
 */
function isIncluded(a, b, c) {
    return isGreater(a, b) && isGreater(b, c);
}


/**
 * Verifies, if the value b is greater than the value a.
 * @param {number} a - The value a to compare.
 * @param {number} b - The value b to compare.
 * @param {string} tolerant - The parameter of strictness.
 * @returns {boolean} - A boolean value.
 */
function isGreater(a, b, tolerant) {
    return (!tolerant) ? a < b : a <= b;
}


/**
 * Formats a word which includes an underscore.
 * @param {string} text - The text to format.
 * @returns {string} - The formatted text.
 */
function formatSplitWord(text) {
    if (text.includes('_')) {
        let formattedText = getFormattedSplitWord(text);
        return formattedText;
    } else {
        return text;
    }
}


/**
 * Provides a formatted split word.
 * @param {string} text - The text to format.
 * @returns {string} - The formatted split word.
 */
function getFormattedSplitWord(text) {
    text = text.split('_');
    let firstWord = text[0];
    let secondWord = formatInitial(text[1], 'toUpperCase');
    return firstWord + secondWord;
}


/**
 * Provides the last element of an array.
 * @param {array} array - The providing array.
 * @returns {any} - The last element of the array.
 */
function getLastElement(array) {
    return array[array.length - 1];
}


/**
 * Provides a random number.
 * @param {number} max - The max value.
 * @param {number} dev - The dispersion.
 * @returns {number} - The random number.
 */
function getRandomNumber(max, dev) {
    return max - Math.round(Math.random() * dev);
}


/**
 * Provides the sum.
 * @param {number} summandA - The summand a.
 * @param {number} summandB - The summand b.
 * @returns {number} - The sum.
 */
function getSum(summandA, summandB) {
    return summandA + summandB;
}


/**
 * Provides a verified value.
 * @param {number} valueA - The value a to verify.
 * @param {number} valueB - The value b to verify.
 * @returns {number} - The verified value.
 */
function getVerifiedValue(valueA, valueB) {
    return isGreater(valueA, valueB) ? valueA : valueB;
}


/**
 * Verifies a time trigger.
 * @param {number} current - The current time.
 * @param {number} last - The last time.
 * @param {number} value - The value to compare.
 * @returns {boolean} - A boolean value.
 */
function isOnTime(current, last, value) {
    let timeDiff = current - last;
    return isGreater(value, timeDiff);
}


/**
 * Verifies a timeout.
 * @param {number} timeout - The value of the timeout.
 * @param {number} time - The current time.
 * @returns {boolean} - A boolean value.
 */
function isTimeout(timeout, time) {
    return timeout && isGreater(timeout, time);
}


/**
 * Opens the dialog.
 * @param {string} id - The id of the dialog.
 * @param {boolean} value - A boolean value.
 */
function openDialog(id, value) {
    document.getElementById(id).open = value;
}


/**
 * Sets the class of an element.
 * @param {string} id - The id of the element.
 * @param {string} method - The method to apply.
 * @param {string} className - The name of the class.
 */
function setClass(id, method, className) {
    document.getElementById(id).classList[method](className);
}


/**
 * Stops the event.
 * @param {event} event - The event to stop.
 */
function stop(event) {
    event.stopPropagation();
}