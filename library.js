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
const resetButton = document.querySelector('#reset');
const closeButton = document.querySelector('#close');

newBookButton.addEventListener('click', () => dialog.showModal());
form.addEventListener('submit', submitForm);
resetButton.addEventListener('click', () => readYet = false);
closeButton.addEventListener('click', () => dialog.close());

showBooksInLibrary();

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const notRead = document.querySelector('#not-read');

let readYet = false; // Store the value of the selected radio button.

function submitForm(event) {
    // Make the setCustomValidity() message appear when the form is submitted, but the information is missing.
    const titleOK = checkTitle(true);
    const authorOK = checkAuthor(true);
    const pagesOK = checkPages(true);
    const readOK = checkRead(true);

    // Make the setCustomValidity() message appear the first time the form is submitted, but the information is missing.
    read.reportValidity()
    pages.reportValidity();
    author.reportValidity();
    title.reportValidity();

    if (titleOK && authorOK && pagesOK && readOK) {
        addBookToLibrary(new Book(title.value, author.value, pages.value, readYet));
        dialog.close();
        bookList.appendChild(createBook(myLibrary[myLibrary.length - 1], myLibrary.length - 1));
        // myLibrary[myLibrary.length - 1] -> Access the just-added Book object (last element in myLibrary)
        // myLibrary.length - 1 -> Access the index of last element in myLibrary
    }

    event.preventDefault();
}

function checkTitle(submitted = false) {
    if (!title.value) {
        title.setCustomValidity("Title cannot be empty.");
    } else {
        title.setCustomValidity("");

        if (submitted) {
            return true;
        }
    }
}

function checkAuthor(submitted = false) {
    if (!author.value) {
        author.setCustomValidity("Author cannot be empty.");
    } else {
        author.setCustomValidity("");

        if (submitted) {
            return true;
        }
    }
}

function checkPages(submitted = false) {
    if (!pages.value) {
        pages.setCustomValidity("Pages cannot be empty.");
    } else if (pages.value < 1) {
        pages.setCustomValidity("The number of pages needs to be 1 or higher.");
    } else if (!Number(pages.value)) {
        pages.setCustomValidity("The number of pages needs to be a number.");
    } else {
        pages.setCustomValidity("");

        if (submitted) {
            return true;
        }
    }
}

function checkRead(submitted = false) {
    if (!read.checked && !notRead.checked) {
        read.setCustomValidity("Select whether the book has been read.");
    } else {
        if (read.checked) {
            readYet = read.value;
        } else if (notRead.checked) {
            readYet = notRead.value;
        }

        read.setCustomValidity("");
        
        if (submitted) {
            return true;
        }
    }
}

title.addEventListener('input', () => {
    checkTitle();
});

author.addEventListener('input', () => {
    checkAuthor();
});

pages.addEventListener('input', () => {
    checkPages();
});

read.addEventListener('click', () => {
    checkRead();
})

notRead.addEventListener('click', () => {
    checkRead();
})