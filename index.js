

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }
}

class BookCollections {
  constructor() {
    this.data = [];
  }

  addBook(book) {
    this.data.push(book);
    localStorage.setItem('bookCollections', JSON.stringify(this.data));
    handleUserInterface(book);
  }

  removeBook(id) {
    const book = document.getElementById(id);
    book.remove();
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
    localStorage.setItem('bookCollections', JSON.stringify(this.data));
  }
}

const bookCollections = new BookCollections();

function handleInput() {
  const title = document.getElementById('bookTitle');
  const author = document.getElementById('bookAuthor');
  const book = new Book(title.value, author.value);
  title.value = '';
  author.value = '';
  return book;
}

function handleUserInterface(bookObj) {
  const bookList = document.getElementById('book-list');
  const book = document.createElement('li');
  book.classList.add('book');
  book.classList.add('darkbk');
  book.setAttribute('id', bookObj.id);
  book.innerHTML = `<p><span>${bookObj.title}</span> by ${bookObj.author}</p>`;
  const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.addEventListener('click', () => bookCollections.removeBook(bookObj.id));
  book.appendChild(deleteBtn);
  bookList.appendChild(book);
}

// Add Button
const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', () => {
  const book = handleInput();
  bookCollections.addBook(book);
});


window.onload = () => {
  bookCollections.data = JSON.parse(localStorage.getItem('bookCollections' || '[]'));
  if (bookCollections.data === null) {
    bookCollections.data = [];
    return;
  }

  bookCollections.data.forEach((book) => handleUserInterface(book));
};

function displayAccordingNav(section) {
  const sectionList = document.getElementById('list');
  const sectionForm = document.getElementById('form');
  const sectionContact = document.getElementById('contact');
  const heading = document.getElementById('title');

  function setDisplayAndHeading(listDisplay, formDisplay, contactDisplay, headingText) {
  sectionList.style.display = listDisplay;
  sectionForm.style.display = formDisplay;
  sectionContact.style.display = contactDisplay;
  heading.innerHTML = headingText;
}

switch (section) {
  case 'list':
    setDisplayAndHeading('block', 'none', 'none', 'Book List');
    break;

  case 'form':
    setDisplayAndHeading('none', 'block', 'none', 'Add New Book');
    break;

  case 'contact':
    setDisplayAndHeading('none', 'none', 'block', 'Contact Us');
    break;

  default: break;
}
}

