'use strict';

/**
 * Handler function to wrap each route
 * @param {function} callback
 * @returns {function} function
 */
exports.asyncHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
}

/**
 * Generates error message for missing book or route
 * @param {number} bookid
 * @param {string} url - requested route
 */
exports.errBook404 = (id, url) => {
  // fix for unqualified url/path
  // ex. /books/abc => /abc, /books/abc/def => /books/abc/def
  const path = url ? url.replace(/^(\/books)?(.+)/gi, '/books$2') : '';
  const text = isNaN(id)
    ? `The resource <span class="highlight">${path}</span> could not be found on the server.`
    : `The book with the id of <span class="highlight">${id}</span> was not found in the database.`;
  const err = new Error(text);

  err.status = 404;
  return err;
}

/**
 * Strips html from string
 * @param {string} string - string to convert
 * @returns {string} string - string stripped from html
 */
exports.stripHtml = string => string.replace(/<[^>]*>?/gm, '');

