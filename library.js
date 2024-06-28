const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Demo data
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, 'not read');
const lotr = new Book('The Lord of the Rings (single-volume)', 'J.R.R. Tolkien', 1077, 'read');
const silmarillion = new Book('The Silmarillion', 'J.R.R. Tolkien', 365, 'not read');

addBookToLibrary(hobbit);
addBookToLibrary(lotr);
addBookToLibrary(silmarillion);

function showBooksInLibrary() {
    myLibrary.forEach((each, index) => bookList.appendChild(createBook(each, index)));
}

function createBook(each, index) {
    const box = document.createElement('div');
    const book = document.createElement('div');
    const selections = document.createElement('div');

    box.setAttribute('class', 'box');

    book.setAttribute('class', 'book');
    book.setAttribute('id', index);
    book.innerHTML = each.info();

    selections.setAttribute('class', 'selections');
    selections.appendChild(createRemoveButton(index));
    selections.appendChild(createReadToggle(each, index));

    box.appendChild(book);
    box.appendChild(selections);

    return box; // Return to function in showBooksInLibrary()
}

function createRemoveButton(index) {
    const removeButton = document.createElement('button');

    removeButton.setAttribute('id', index);
    removeButton.innerHTML = 'x';
    removeButton.addEventListener('click', removeBook.bind(this, removeButton.id));

    return removeButton; // Return to function in createBook(each, index)
}

function removeBook(bookID) {
    myLibrary.splice(bookID, 1); // Remove one element starting at bookID
    restartLibrary();
}

function createReadToggle(each, index) {
    const returnSelection = document.createElement('span');
    const readToggle = document.createElement('input');
    const readLabel = document.createElement('label');
    const notReadToggle = document.createElement('input');
    const notReadLabel = document.createElement('label');
    
    readToggle.setAttribute('type', 'radio');
    readToggle.setAttribute('id', 'read');
    readToggle.setAttribute('name', index);
    readToggle.setAttribute('value', 'read');
    readToggle.addEventListener('click', toggleRead.bind(this, readToggle, index));
    
    readLabel.setAttribute('for', 'read');
    readLabel.innerHTML = 'Read';
    
    notReadToggle.setAttribute('type', 'radio');
    notReadToggle.setAttribute('id', 'not-read');
    notReadToggle.setAttribute('name', index);
    notReadToggle.setAttribute('value', 'not read');
    notReadToggle.addEventListener('click', toggleRead.bind(this, notReadToggle, index));
    
    notReadLabel.setAttribute('for', 'not-read');
    notReadLabel.innerHTML = 'Not read';

    if (each.read == 'read') {
        readToggle.setAttribute('checked', 'true');
    } else {
        notReadToggle.setAttribute('checked', 'true');
    }

    returnSelection.appendChild(readToggle);
    returnSelection.appendChild(readLabel);
    returnSelection.appendChild(notReadToggle);
    returnSelection.appendChild(notReadLabel);
    
    return returnSelection; // Return to function in createBook(each, index)
}

function toggleRead(toggle, index) {
    myLibrary[index].read = toggle.id;
    restartLibrary();
}

function restartLibrary() {
    bookList.innerHTML = '';
    showBooksInLibrary();
}

const bookList = document.querySelector('#container');
const dialog = document.querySelector('dialog');
const newBookButton = document.querySelector('#new-book');
const form = document.querySelector('#form');
const closeButton = document.querySelector('#close');

newBookButton.addEventListener('click', () => dialog.showModal());
form.addEventListener('submit', submitForm);
closeButton.addEventListener('click', () => dialog.close());

showBooksInLibrary();

function submitForm(event) {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const readYet = document.querySelector('input[name=read-yet]:checked');

    addBookToLibrary(new Book(title.value, author.value, pages.value, readYet.value));
    dialog.close();
    bookList.appendChild(createBook(myLibrary[myLibrary.length - 1], myLibrary.length - 1));
    // myLibrary[myLibrary.length - 1] -> Access the just-added Book object (last element in myLibrary)
    // myLibrary.length - 1 -> Access the index of last element in myLibrary
    event.preventDefault();
}