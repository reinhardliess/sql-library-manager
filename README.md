# JavaScript Techdegree Project #8: A SQL Library Manager

A live version of this project can be found [here](). Please note that the app is in hibernation mode and may take a couple of seconds to  load.

The goal of this project was to create an application for a fictional local library to help them manage their collection of books. The librarian has been using a simple SQLite database and has been entering data in manually. The librarian wants a more intuitive way to manage the library's collection of books.

In this project, I built a web application that includes pages to list, add, update, and delete books using JavaScript, Node.js, Express, Pug, and the SQL ORM Sequelize.

## Installation

* Download or clone from Github
* Copy `library.db` from `./install` to `./`
* run `npm install`
* run `npm start` to start the server. The website can then be accessed locally by pointing the web browser to `localhost:3000`

## Project Requirements

* Create your respective models for the app to use with Sequelize
* Set up your server, middleware and routes
* Build your views
* Handle the required title and author fields using Sequelize model validation
* Test your app for cross-browser compatibility

## Exceeds Grade Project Requirements

* Include a search field for the books listing page. Search should work for all of the fields _Title_, _Author_, _Genre_, _Year_.
* Include pagination for the books listing page

## Some Additional remarks

* Added favicon handling via [serve-favicon](https://github.com/expressjs/serve-favicon#readme) middleware
* Implemented pagination and search, search results are also paginated
* Added validation for _Year_: if year is filled, it must be numeric and between 1 and 4 digits
* The create/update book form will autofocus on the first input field and auto-select it when updating a book record
* Input fields will be selected when corresponding labels are clicked
* Some design/CSS changes
