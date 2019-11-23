'use strict';

/* Handler function to wrap each route. */
exports.asyncHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
}

exports.errBook404 = (id, url) => {
  let err;
  if (isNaN(id)) {
    err = new Error(`The resource <span class="highlight">${url}</span> could not be found on the server.`)
  } else {
    err = new Error(`The book with the id of <span class="highlight">${id}</span> was not found in the database.`);
  }
  err.status = 404;
  return err;
}

exports.stripHtml = string => string.replace(/<[^>]*>?/gm, '');

