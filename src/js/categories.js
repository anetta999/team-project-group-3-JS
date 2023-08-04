import {
  fetchCategoryList,
  fetchTopBooks,
  fetchSelectCategory,
} from './api.js';

const listEl = document.querySelector('.categories_list');
const booksContainer = document.querySelector('.books-container');
let chosenCategory = '';
// console.log(listEl);

//creating categories HTML element
async function showCategoryListData() {
  try {
    const categoriesElements = await fetchCategoryList();
    listEl.insertAdjacentHTML(
      'beforeend',
      createCategoriesMarkap(categoriesElements)
    );
  } catch {
    console.error(error);
  }
}
// creating Markap for each category
function createCategoriesMarkap(arr) {
  return arr
    .map(({ list_name }) => {
      console.log(list_name);
      return `<li class="js_category_list_element category_list_element">${list_name}</li>`;
    })
    .join('');
}

showCategoryListData();
