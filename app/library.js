// Local Storage

let books = JSON.parse(localStorage.getItem('books')) || [];
const search = document.getElementById('site-search');
const matchList = document.querySelector('.matchList');
const editBookForm = document.querySelector('.editBookForm');
const library = document.querySelector('.library');

const oneStar = document.querySelectorAll('#oneStar');
const twoStar = document.querySelectorAll('#twoStar');
const threeStar = document.querySelectorAll('#threeStar');
const fourStar = document.querySelectorAll('#fourStar');
const fiveStar = document.querySelectorAll('#fiveStar');

const showTitles = () => {
  if (!localStorage.books) {
    library.innerHTML = `<h3>You don't have any books saved. </h3>`;
  } else {
    for (const [key, value] of Object.entries(books)) {
      library.innerHTML += `
      
      <div class="bookCard">
      <div class="headerBook"><span id="removeBook"><i class="fas fa-times"></i></span>
      <button class="editBook">Edit</button></div>
      
      <h4>${value.title}</h4>
      <span id="authorCard">by ${value.author}</span>

      
      <p>${value.description}</p>
      <span id="ratingCard">${value.rating}</span>
      </div>
      `;
    }
  }
};

showTitles();

// STARS

// DELete BOok

const deleteBook = () => {
  if (!localStorage.books) {
    console.log('not exist for delete');
  } else {
    let editbook = document.querySelectorAll('#removeBook');

    for (let i = 0; i < editbook.length; i++) {
      editbook[i].addEventListener('click', function () {
        console.log(books[i]);
        const removeBook = books
          .map(function (item) {
            return item.title;
          })
          .indexOf(i);

        books.splice(removeBook[i], 1);
        console.log(books);
        localStorage.setItem('books', JSON.stringify(books));
        location.reload();
      });
    }
  }
};

deleteBook();

const addBook = document.querySelector('.addBook');
const addBookModal = document.querySelector('.addBookModal');
const overlay = document.querySelector('.overlay');

const closeAddBookModal = function () {
  addBookModal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openAddBookModal = function () {
  addBookModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

addBook.addEventListener('click', openAddBookModal);
overlay.addEventListener('click', closeAddBookModal);

const addBookEvent = (ev) => {
  ev.preventDefault();

  let book = {
    title: document.querySelector('#bookName').value,
    author: document.querySelector('#bookAuthor').value,
    rating: document.querySelector('input[name="bookRating"]:checked').value,

    description: document.querySelector('#bookDescription').value,
    posted: new Date(),
  };

  books.push(book);
  document.forms[0].reset();

  console.warn('added', { books });

  localStorage.setItem('books', JSON.stringify(books));
  window.location.href = '/library.html';
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.submitAdd').addEventListener('click', addBookEvent);
});

// Sort

Array.prototype.sortOnValue = function (key) {
  this.sort(function (a, b) {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
};

var arr = books;

console.log(arr);

const titleSort = document.querySelector('#title');
const authorSort = document.querySelector('#author');

authorSort.addEventListener('click', function () {
  arr.sortOnValue('author');

  localStorage.setItem('books', JSON.stringify(arr));

  location.reload();
});

titleSort.addEventListener('click', function () {
  arr.sortOnValue('title');

  localStorage.setItem('books', JSON.stringify(arr));

  location.reload();
});

// EDIT

if (localStorage.books) {
  const bookCard = document.querySelectorAll('.bookCard');
  const bookCardTitle = document.querySelectorAll('.editBook');

  console.log(bookCardTitle);

  for (let i = 0; i < bookCardTitle.length; i++) {
    bookCardTitle[i].addEventListener('click', function () {
      let bookPrepare = books;

      bookCard[i].innerHTML = `<div class="headerDiv"></div>
      <input type="text" name="bookName" id="bookName" placeholder="${bookPrepare[i].title}" required /><br />
      <input
              type="text"
              name="bookAuthor"
              id="bookAuthor"
              placeholder="${bookPrepare[i].author}"
              required
            /><br />
      <input
              type="text"
              name="bookDescription"
              id="bookDescription"
              placeholder="${bookPrepare[i].description}"
              required
            />
      <div class="bookRatingDiv">
      <label for="Like">Like</label>
              <input type="radio" name="bookRating" value="Like" checked />
              <label for="Dislike">Dislike</label>
              <input type="radio" name="bookRating" value="Dislike" />
              <label for="Neutral">Neutral</label>
              <input type="radio" name="bookRating" value="Neutral" />
      </div>
      <button id="finish">Finish</button>

    
      `;

      bookPrepare.splice(i, 1);
      console.log(bookPrepare);
      const finish = document
        .getElementById('finish')
        .addEventListener('click', addBookEvent);
    });
  }
}
