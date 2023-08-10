import { fetchTopBooks } from './api.js';
import {
  displayTitle,
  displayCategory,
  setImageSrc,
  titleLength,
  authorLength,
} from './categories.js';
import { showCategoryListData } from './categories-list.js';
import { showLoader, hideLoader } from './loader.js';

async function displayTopBooks() {
  const topBookCard = document.querySelector('.books-container-list');
  topBookCard.innerHTML = '';
  showLoader();

  try {
    const response = await fetchTopBooks();

    displayTitle('Best Sellers Books');

    topBookCard.innerHTML = createUl(response);

    const buttonOpenCategory = document.querySelectorAll(
      '.button-open-categories'
    );
    buttonHandler(buttonOpenCategory);
    hideLoader();
  } catch (error) {
    console.error(error);
  }
}

function buttonHandler(arr) {
  arr.forEach(button => {
    button.addEventListener('click', () => {
      const chosenCategory = button.getAttribute('data-list');
      displayCategory(chosenCategory);
      const categoriesEl = document.querySelector(`[data="${chosenCategory}"]`);
      const chosenElement = document.querySelector('.chosen_category');
      chosenElement.classList.remove('chosen_category');
      categoriesEl.classList.add('chosen_category');

      categoriesEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });
}

function createBooks(arr) {
  let imgSrc = setImageSrc();

  return arr
    .map(({ _id, book_image, title, author }) => {
      const imageSrc = book_image ? book_image : imgSrc;
      return `<li class="top-book-card" id="${_id}">
  <a href="" class="book-card-thumb" id="${_id}">
    <div class="thumb">
      <img id="${_id}" src="${imageSrc}" alt="${title}" class="books-image" onerror="handleImageError(this, ${imgSrc})" />
      <div class="overlay" id="${_id}"><p id="${_id}"> quick view</p></div>
    </div>
    <p id="${_id}" class="book-card-title">${titleLength(title)}</p>
    <p id="${_id}" class="book-card-author">${authorLength(author)}</p>
    </a></li>`;
    })
    .join('');
}

function handleImageError(img, defaultImg) {
  img.src = defaultImg;
}

function createButtonMarkap(list_name) {
  return `
      <div class="div-button">
        <button data-list="${list_name}" href="" class="button-open-categories">SEE MORE</button>
      </div>
    `;
}

function createUl(arr) {
  return arr
    .map(({ list_name, books }) => {
      return `<li class="top-books-ul">
      <h2 class="top-books-category">${list_name}</h2>
      <ul class="top-books-list">${createBooks(books)}</ul>
      ${createButtonMarkap(list_name)}
        </li>
        `;
    })
    .join('');
}

async function fetchDataInParallel() {
  showLoader();
  try {
    const [] = await Promise.all([showCategoryListData(), displayTopBooks()]);
    hideLoader();
  } catch (error) {
    console.error(error);
  }
}
fetchDataInParallel();

export { displayTopBooks, handleImageError };
