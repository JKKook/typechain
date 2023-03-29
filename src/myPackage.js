//@ts-check

/**
 * increase number +1
 * @param {number} number
 * @returns {number}
 */
export function increase(number) {
    return number++;
}
/**
 * decrease number -1
 * @param {number} number
 * @returns {number}
 */
export function decrease(number) {
    return number--;
}
/**
 * Check this URL, and then return boolean
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function isURL(config) {
    return config ? true : false;
}
