'use strict';

/******************************************
Treehouse Techdegree:
FSJS project #8 - SQL Library Manager
Reinhard Liess, 2019
******************************************/

// This project was bootstrapped with the express application generator

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon')
const logger = require('morgan');

const app = express();
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
