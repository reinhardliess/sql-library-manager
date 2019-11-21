'use strict';

exports.errBook404 = id => {
  const err = new Error(`The book with the id of <span class="highlight">${id}</span> was not found in the database.`);
  err.status = 404;
  return err;
}

exports.stripHtml = string => string.replace(/<[^>]*>?/gm, '');

