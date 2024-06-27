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

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
const lotr = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 600, 'not read yet');
const silmarillion = new Book('The Silmarillion', 'J.R.R. Tolkien', 400, 'not read yet');

addBookToLibrary(theHobbit);
addBookToLibrary(lotr);
addBookToLibrary(silmarillion);

function showBooksInLibrary() {
    myLibrary.forEach((each, index) => {
        const aBook = document.createElement('div');
        aBook.setAttribute('class', 'book');
        aBook.setAttribute('id', index);
        aBook.innerHTML = each.info();
        bookList.appendChild(aBook);

        const remove = document.createElement('button');
        remove.setAttribute('id', index);
        remove.innerHTML = 'x';
        aBook.appendChild(remove);
    });
}

const bookList = document.querySelector('#container');
const newBookButton = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');
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
    
    const aBook = document.createElement('div');
    aBook.setAttribute('class', 'book');
    aBook.setAttribute('id', myLibrary.length - 1);
    aBook.innerHTML = myLibrary.slice(-1)[0].info(); // Slice the last element of myLibrary, select index 0 (the only element), and use the info() method.
    bookList.appendChild(aBook);

    const remove = document.createElement('button');
    remove.innerHTML = 'x';
    aBook.appendChild(remove);

    event.preventDefault();
}