'use strict';

const express = require('express');
const { sequelize, Sequelize } = require('../models/index');
const router = express.Router();
const { asyncHandler, errBook404 } = require('../lib/utils')

const { Book } = require('../models');

// GET listing of all books with pagination and search
router.get('/', asyncHandler(async (req, res) => {

  // pagination
  const calcPages = (recCount, recPerPage) => Math.floor(recCount / recPerPage) + (recCount % recPerPage ? 1 : 0);
  const booksPerPage = 10;
  const reqPage = +req.query.page || 1
  let books;

  // common query object for browse and search
  const objQuery = {
    order: [["title", "ASC"]],
    limit: booksPerPage,
    offset: booksPerPage * (reqPage - 1)
  };

  // search
  const query = req.query.q || '';
  const queryLower = query.toLowerCase();
  const { Op } = Sequelize;
  if (query) {
    books = await Book.findAndCountAll({
      ...objQuery,
      where: {
        [Op.or]: [
          { title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', `%${queryLower}%`) },
          { author: sequelize.where(sequelize.fn('LOWER', sequelize.col('author')), 'LIKE', `%${queryLower}%`) },
          { genre: sequelize.where(sequelize.fn('LOWER', sequelize.col('genre')), 'LIKE', `%${queryLower}%`) },
          { year: sequelize.where(sequelize.fn('LOWER', sequelize.col('year')), 'LIKE', `%${queryLower}%`) }
        ]
      }
    });
  } else {
    books = await Book.findAndCountAll(objQuery);
  }

  res.render("index", {
    books: books.rows,
    pages: { current: reqPage, count: calcPages(books.count, booksPerPage) },
    title: "Books",
    query
  });
}));

// GET Add a new book form
router.get('/new', (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
});

// POST create a new book
router.post('/new', asyncHandler(async (req, res, next) => {
  try {
    await Book.create(req.body);
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
    next(errBook404(id, req.url));
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
      next(errBook404(id, req.url));
    }
  } catch (error) {
    // checking for validation error
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
  const book = await Book.findByPk(id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    next(errBook404(id, req.url));
  }
}));

module.exports = router;
