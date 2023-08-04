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

listEl.addEventListener('click', e => {
  let chosenListEl = document.querySelector('.chosen_category');
  if (e.target === chosenListEl) {
    return;
  }
  chosenCategory = e.target.textContent;
  console.log(chosenCategory);
  chosenListEl.classList.remove('chosen_category');
  //   console.log(chosenListEl);
  e.target.classList.add('chosen_category');
  chosenListEl = e.target;
  console.log(chosenListEl);
  displayCategory(chosenCategory);
});

// Geting data for special Category and drowing HTML elements
async function displayCategory(chosenCategory) {
  try {
    const data = await fetchSelectCategory(chosenCategory);
    console.log(data);
    // console.log(createCategoryBooksMarkap(data));
    booksContainer.innerHTML = createCategoryBooksMarkap(data);
  } catch {
    console.error(error);
  }
}
//Creating Markap for each book from category
function createCategoryBooksMarkap(arr) {
  return arr.map(({ _id, book_image, title, author }) => {
    return `<div div-id="${_id}">
  <a href=""
    ><img src="${book_image}" alt="${title}" class="" />
    <p>${title}</p>
    <p>${author}</p
  ></a>
</div>`;
  });
}
// showCategory('Picture Books');

// async function displayTopBooks() {
//   try {
//     const response = await fetchTopBooks();
//     // console.log(response);
//     booksContainer.insertAdjacentHTML('beforeend', createTopBookMarkap(response));
//   } catch (error) {
//     console.error(error);
//   }
// }

// function createTopBookMarkap(arr) {
//   return arr
//     .map(
//       ({
//         list_name,
//         books: [{ _id }],
//         books: [{ amazon_product_url }],
//         books: [{ book_image }],
//         books: [{ author }],
//         books: [{ title }],
//         books: [{ book_image_width }],
//         books: [{ book_image_height }],
//       }) => {
//         return `
//       <h2>${list_name}</h2>
//       <div data-id = '${_id}'>
//       <a href='${amazon_product_url}'>
//       <img src='${book_image}' alt='${author},${title}' width = '${book_image_width}' hight = '${book_image_height}' loading='lazy' />
//       <div><h3>${title}</h3>
//       <p>${author}</p>
//       </div></a></div>
//   `;
//       }
//     )
//     .join('');
// }
// displayTopBooks();
