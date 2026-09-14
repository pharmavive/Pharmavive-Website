// src/utils/stringUtils.js
import slugifyLib from 'slugify'; // Renamed to avoid conflict with potential local function if needed

/**
 * Capitalizes the first letter of each word in a string.
 * Useful for displaying user-friendly category names.
 * @param {string} str The input string.
 * @returns {string} The string with each word capitalized.
 */
export function capitalizeWords(str) {
  if (!str) return '';
  return str.split(' ').map(word => {
    if (word.length === 0) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

/**
 * Converts a string to a URL-friendly slug.
 * @param {string} str The input string to slugify.
 * @returns {string} The slugified string.
 */
export function generateSlug(str) {
  if (!str) return '';
  return slugifyLib(str, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
}
