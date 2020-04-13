# JavaScript Techdegree Project #8: A SQL Library Manager

## Description

The goal of this project was to create an application for a fictional local library to help them manage their collection of books. The librarian has been using a simple SQLite database and has been entering data in manually. The librarian wants a more intuitive way to manage the library's collection of books.

In this project, I built a web application that includes pages to list, add, update, and delete books using JavaScript, Node.js, Express, Pug, and the SQL ORM Sequelize.

A live version of this project can be found [here](https://rliess-library-manager.herokuapp.com/). Please note that the app is in hibernation mode and may take a couple of seconds to load.

## Technologies Used

- JavaScript
- Node.js
- Express
- Pug
- Sequelize ORM
- SQL

## Installation

- Download or clone from Github
- Copy `library.db` from `./production to ./development` since the development db is gitignored
- run `npm install`
- run `npm start` to start the server. The website can then be accessed locally by pointing the web browser to `localhost:3000`

## Some Additional remarks

- Added favicon handling via [serve-favicon](https://github.com/expressjs/serve-favicon#readme) middleware
- Implemented pagination and search, search results are also paginated
- Added validation for _Year_: if year is filled, it must be numeric and between 1 and 4 digits
- The create/update book form will autofocus on the first input field and auto-select it when updating a book record
- Input fields will be selected when corresponding labels are clicked
