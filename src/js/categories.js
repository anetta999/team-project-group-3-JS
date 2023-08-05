import { fetchSelectCategory } from './api.js';
import { displayTopBooks } from './top-books.js';

const listEl = document.querySelector('.categories_list');
const booksContainerList = document.querySelector('.books-container-list');
let chosenCategory = '';

listEl.addEventListener('click', e => {
  let chosenListEl = document.querySelector('.chosen_category');
  if (e.target === chosenListEl || e.target === e.currentTarget) {
    return;
  }
  if (e.target.textContent === 'All Categories') {
    displayTopBooks();
    chosenCategory = e.target.textContent;
    chosenListEl.classList.remove('chosen_category');
    e.target.classList.add('chosen_category');
    chosenListEl = e.target;
    return;
  }

  chosenCategory = e.target.textContent;
  chosenListEl.classList.remove('chosen_category');
  e.target.classList.add('chosen_category');
  chosenListEl = e.target;
  displayCategory(chosenCategory);
});

// Geting data for special Category and drowing HTML elements
async function displayCategory(chosenCategory) {
  try {
    const data = await fetchSelectCategory(chosenCategory);
    displayTitle(chosenCategory);
    booksContainerList.innerHTML = createCategoryBooksMarkap(data);
  } catch {
    console.error(error);
  }
}

function displayTitle(element) {
  categoryTitleEl = document.querySelector('.title-color1');
  categoryTitleSpanEl = document.querySelector('.title-color2');
  categoryTitleEl.textContent = element.substring(0, stringFirstSpace(element));
  categoryTitleSpanEl.textContent = element.substring(
    stringFirstSpace(element)
  );
}

//indexof first space in string
function stringFirstSpace(string) {
  return string.indexOf(' ');
}

//Creating Markap for each book from category
function createCategoryBooksMarkap(arr) {
  return arr
    .map(({ _id, book_image, title, author }) => {
      return `<li li-id="${_id}" class="book-card">
  <a href="" class="book-card-thumb"
    ><div class="thumb">
    <img src="${book_image}" alt="${title}" class="" /></div>
    <p class="book-card-title">${title}</p>
    <p class="book-card-author">${author}</p
  ></a></li>`;
    })
    .join('');
}

export { displayTitle };
