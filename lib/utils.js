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
 * @param {number} bookid
 * @param {string} url - requested route
 */
exports.errBook404 = (id, url) => {
  const text = isNaN(id)
    ? `The resource <span class="highlight">${url}</span> could not be found on the server.`
    : `The book with the id of <span class="highlight">${id}</span> was not found in the database.`;
  const err = new Error(text);

  err.status = 404;
  return err;
}

/**
 * @param {string} string - string to convert
 * @returns {string} string - string stripped from html
 */
exports.stripHtml = string => string.replace(/<[^>]*>?/gm, '');

