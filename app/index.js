'use strict';

// Change Placeholder

if (!localStorage.anybooks) {
  localStorage.setItem('anybooks', 'Now you have books');

  const prebooks = [
    {
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      rating: 'Like',
      description:
        'The temperature at which book paper catches fire, and burns',
      posted: new Date(),
    },
    {
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      rating: 'Like',
      description:
        'No other novel has made me feel so much for the main characters.',
      posted: new Date(),
    },
    {
      title: 'Moby-Dick',
      author: 'Herman Melville',
      rating: 'Neutral',
      description:
        'Every American writer since 1851 has been chasing the same whale: to somehow write a novel as epic and influential as Melville’s.',
      posted: new Date(),
    },
    {
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosak',
      rating: 'Neutral',
      description:
        'It s been nearly 25 years since Robert Kiyosaki’s Rich Dad Poor Dad first made waves in the Personal Finance arena.',
      posted: new Date(),
    },
    {
      title: 'Wild',
      author: 'Cheryl Strayed',
      rating: 'Dislike',
      description:
        'Cheryl Strayed thought she’d lost everything at 22. Then, her mother’s passing, family trouble, and divorce drove her to an impulsive decision',
      posted: new Date(),
    },
  ];

  localStorage.setItem('books', JSON.stringify(prebooks));
}

const searchInput = document.querySelector('#site-search');
const backgroundTransparent = document.querySelector('.backgroundtransparent');
const buttonSubmit = document.querySelector('.submit');

if (!localStorage.books) {
  buttonSubmit.classList.add('hidden');
} else {
  buttonSubmit.classList.remove('hidden');
  buttonSubmit.addEventListener('click', function () {
    window.location.href = '/library.html';
  });
}

const openSearchInput = function () {
  searchInput.placeholder = '';
  backgroundTransparent.classList.remove('hidden');
};

const closeSearchInput = function () {
  searchInput.placeholder = 'Search for a book';
  backgroundTransparent.classList.add('hidden');
};

searchInput.addEventListener('click', openSearchInput);

backgroundTransparent.addEventListener('click', closeSearchInput);

// Local Storage!!!!!!!!!!!!!!!!!!!!!

let books = JSON.parse(localStorage.getItem('books')) || [];

const addBookEvent = (ev) => {
  ev.preventDefault();

  let book = {
    title: document.querySelector('#bookName').value,
    author: document.querySelector('#bookAuthor').value,
    rating: document.querySelector('input[name="bookRating"]:checked').value,
    description: document.querySelector('#bookDescription').value,
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

// Search

const search = document.getElementById('site-search');
const matchList = document.querySelector('.matchList');

const booksLibrary = (SearchText) => {
  const booksLocal = JSON.parse(localStorage.getItem('books'));
  console.log(booksLocal);

  let matches = booksLocal.filter((bookLocal) => {
    const regex = new RegExp(`${SearchText}`, 'gi');
    return bookLocal.title.match(regex) || bookLocal.author.match(regex);
  });

  if (SearchText.length === 0) {
    matchList.classList.remove('visible');
    // buttonSubmit.classList.remove('visible');
    matchList.innerHTML = '';
    matches = [];
  }

  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class="cardSearch">
        <a href="library.html">${match.title} by ${match.author} <span class="bookRating">Your rating: ${match.rating}</span> </a>
        </div>
    `
      )
      .join('');

    matchList.innerHTML = html;
    matchList.classList.add('visible');
    // buttonSubmit.classList.add('visible');
  }
};

search.addEventListener('input', () => booksLibrary(search.value));

// OpenModal Add abook

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
