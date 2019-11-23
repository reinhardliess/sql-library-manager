'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model { }
  Book.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '"Title" is required'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '"Author" is required'
        }
      }
    },
    genre: Sequelize.STRING,
    year: {
      type: Sequelize.INTEGER,
      validate: {
        customValidator(value) {
          if (value.trim() && !value.match(/^\d{1,4}$/)) {
            throw new Error('"Year" must be between 1 and 4 digits and numeric');
          }
        }
      }
    }

  }, { sequelize });

  return Book;
};