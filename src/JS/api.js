import axios from 'axios';
axios.defaults.baseURL = 'https://books-backend.p.goit.global/books/';
//------------------CATEGORIES LIST-----------------------
//Отримуємо респонс на список категорій
async function fetchCategoryList() {
  const END_POINT = 'category-list';
  return await axios.get(`${END_POINT}`).then(async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    // console.log(response); //тут можете побачити статуси та інфу про респонс
    return await response.data;
  });
}
// Опрацювання дати від респонсу категорій
// Зміни назву нижче вказаної функції на зручну для тебе та використовуй у своїй частині коду
// async function showCategoryListData() {
//   await fetchCategoryList()
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
// showCategoryListData();
//----------------------TOP BOOKS BY CATEGOTY with 5 books for each----------------
//Функція повертає респонс із масивом в 18 категорій, у кожній з яких є по масив з 5 топ книгами
async function fetchTopBooks() {
  const END_POINT = 'top-books';
  return await axios.get(`${END_POINT}`).then(async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return await response.data;
  });
}
// Опрацювання дати від респонсу із Топ категоріями
// Зміни назву назву нижче вказаної функції на зручну для тебе та використовуй у своїй частині коду
// async function showTopBooksData() {
//   await fetchTopBooks()
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
// showTopBooksData();
//-------------------BOOC CATEGORY WITH BOOKS--------------------------
// Функція повертає респонс із масивом обєктів книг. Функція приймає аргумент “Наззва Категорії” - стрінг!!!
// У масиві може бути мала кількість книг 10-15
let selectedCategory = 'Hardcover Fiction'; // прикладова змінна котру будете надсилати у функцію
async function fetchSelectCategory(selectedCategory) {
  let END_POINT = `category?category=${selectedCategory}`;
  return await axios.get(`${END_POINT}`).then(async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return await response.data;
  });
}
// Опрацювання дати від респонсу категорій
// Зміни назву нижче вказаної функції на зручну для тебе та використовуй у своїй частині коду
// async function showCategory(selectedCategory) {
//   await fetchSelectCategory(selectedCategory)
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
// showCategory(selectedCategory);
//--------------------------BOOK BY ID-----------------------
// Функція повертає респонс обʼєкту однієї вибраної книги
let bookId = '643282b1e85766588626a0ba'; // bookId це стрінг
async function fetchBookId(bookId) {
  let END_POINT = `${bookId}`;
  return await axios.get(`${END_POINT}`).then(async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return await response.data;
  });
}
// Опрацювання дати від респонсу однієї книги. Зміни назву функції на зручну для тебе
// Зміни назву нижче вказаної функції на зручну для тебе та використовуй у своїй частині коду
// async function showBook(bookId) {
//   await fetchBookId(bookId)
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
// showBook(bookId);
export { fetchCategoryList, fetchTopBooks, fetchSelectCategory, fetchBookId };
