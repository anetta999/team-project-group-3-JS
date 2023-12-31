import { fetchSelectCategory } from './api.js';
import { displayTopBooks, handleImageError } from './top-book.js';
import { showLoader, hideLoader } from './loader.js';

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
  booksContainerList.innerHTML = '';
  showLoader();
  try {
    const data = await fetchSelectCategory(chosenCategory);
    displayTitle(chosenCategory);
    booksContainerList.innerHTML = createCategoryBooksMarkap(data);
    hideLoader();
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

function stringLastSpace(string) {
  return string.lastIndexOf(' ');
}

//Creating Markap for each book from category
function createCategoryBooksMarkap(arr) {
  let imgSrc = setImageSrc();

  return arr
    .map(({ _id, book_image, title, author }) => {
      const imageSrc = book_image ? book_image : imgSrc;
      return `<li class="book-card" id="${_id}">
  <a href="" class="book-card-thumb" id="${_id}"
    ><div class="thumb">
    <img id="${_id}" src="${imageSrc}" alt="${title}" class="books-image" onerror="handleImageError(this, ${imgSrc})" />
    <div id="${_id}" class="overlay"><p id="${_id}"> quick view</p></div>
    </div>
    <p id="${_id}" class="book-card-title">${titleLength(title)}</p>
    <p id="${_id}" class="book-card-author">${authorLength(author)}</p
  ></a></li>`;
    })
    .join('');
}

function setImageSrc() {
  const defaultImageUrlMob = '../img/default_images/default_img_mobile.jpg';
  const defaultImageUrlTab = '../img/default_images/default_img_table.jpg';
  const defaultImageUrlDesc = '../img/default_images/default_img_desc.jpg';

  if (window.matchMedia('(min-width: 1440px)').matches) {
    return defaultImageUrlDesc;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    return defaultImageUrlTab;
  } else {
    return defaultImageUrlMob;
  }
}

function titleLength(title) {
  if (title.length > 17) {
    return title.slice(0, 17) + '...';
  }
  return title;
}

function authorLength(author) {
  if (author.length > 28) {
    return author.slice(0, 28) + '...';
  }
  return author;
}
export {
  displayTitle,
  displayCategory,
  setImageSrc,
  titleLength,
  authorLength,
};
