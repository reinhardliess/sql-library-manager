'use strict';

const express = require('express');
const router = express.Router();
const { errBook404 } = require('../lib/utils')

const { Book } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
}

// GET listing of all books
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [["title", "ASC"]]
  });
  res.render("index", { books, title: "Books" });
}));

// GET Add a new book form
router.get('/new', (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
});

// POST create a new book
router.post('/new', asyncHandler(async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.redirect('/');
  } catch (error) {
    // checking for validation error
    if (error.name === "SequelizeValidationError") {
      const book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors, title: "New Book" })
    } else {
      next(error);
    }
  }
}));

// GET individual book
router.get("/:id", asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);
  if (book) {
    res.render('update-book', { book, title: book.title });
  } else {
    next(errBook404(id));
  }
}));

// POST Update a book
router.post('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (book) {
      await book.update(req.body);
      res.redirect('/books');
    } else {
      next(errBook404(id));
    }
  } catch (error) {
    // checking the error
    if (error.name === "SequelizeValidationError") {
      const book = await Book.build(req.body);
      book.id = id;
      res.render('update-book', { book, errors: error.errors, title: "Edit Book" })
    } else {
      next(error);
    }
  }
}));

// POST Delete individual book
router.post('/:id/delete', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log({ id })
  const book = await Book.findByPk(id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    next(errBook404(id));
  }
}));

module.exports = router;
