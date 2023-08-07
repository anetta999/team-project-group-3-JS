import { fetchSelectCategory } from './api.js';
import { displayTopBooks, handleImageError } from './top-book.js';

const listEl = document.querySelector('.categories_list');
const booksContainerList = document.querySelector('.books-container-list');
let chosenCategory = '';
let categoryTitleEl, categoryTitleSpanEl;

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
    displayTitle('Best Sellers Books');
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
  } catch (error) {
    console.error(error);
  }
}

function displayTitle(element) {
  categoryTitleEl = document.querySelector('.title-color1');
  categoryTitleSpanEl = document.querySelector('.title-color2');
  categoryTitleEl.textContent = element.substring(0, stringLastSpace(element));
  categoryTitleSpanEl.textContent = element.substring(stringLastSpace(element));
}

//indexof first space in string
// function stringFirstSpace(string) {
//   return string.indexOf(' ');
// }
function stringLastSpace(string) {
  return string.lastIndexOf(' ');
}

//Creating Markap for each book from category
function createCategoryBooksMarkap(arr) {
  const defaultImageUrl = '../img/default_img.jpg';
  return arr
    .map(({ _id, book_image, title, author }) => {
      const imageSrc = book_image ? book_image : defaultImageUrl;
      return `<li class="book-card">
  <a href="" class="book-card-thumb"
    ><div class="thumb">
    <img id="${_id}" src="${imageSrc}" alt="${title}" class="books-image" onerror="handleImageError(this, ${defaultImageUrl})" /></div>
    <p class="book-card-title">${title}</p>
    <p class="book-card-author">${author}</p
  ></a></li>`;
    })
    .join('');
}

export { displayTitle, displayCategory };
