import { fetchSelectCategory } from './api.js';

const listEl = document.querySelector('.categories_list');
const booksContainerList = document.querySelector('.books-container-list');
let chosenCategory = '';

listEl.addEventListener('click', e => {
  let chosenListEl = document.querySelector('.chosen_category');
  if (e.target === chosenListEl || e.target === e.currentTarget) {
    return;
  }
  chosenCategory = e.target.textContent;
  //   console.log(chosenCategory);
  chosenListEl.classList.remove('chosen_category');
  //   console.log(chosenListEl);
  e.target.classList.add('chosen_category');
  chosenListEl = e.target;
  //   console.log(chosenListEl);
  displayCategory(chosenCategory);
});

// Geting data for special Category and drowing HTML elements
async function displayCategory(chosenCategory) {
  try {
    const data = await fetchSelectCategory(chosenCategory);
    categoryTitleEl = document.querySelector('.title-color1');
    categoryTitleSpanEl = document.querySelector('.title-color2');
    categoryTitleEl.textContent = chosenCategory.substring(
      0,
      stringFirstSpace(chosenCategory)
    );
    categoryTitleSpanEl.textContent = chosenCategory.substring(
      stringFirstSpace(chosenCategory)
    );
    booksContainerList.innerHTML = createCategoryBooksMarkap(data);
  } catch {
    console.error(error);
  }
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
