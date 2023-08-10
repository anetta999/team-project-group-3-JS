const loaderElement = document.querySelector('.loader-backdrop');
const bodyElement = document.body;
// const titleElement = document.querySelector('.category-name');
// const booksContainerElement = document.querySelector('books-container-list');
// console.log(titleElement, booksContainerElement);

function showLoader() {
  loaderElement.classList.remove('loader-is-hidden');
  bodyElement.classList.add('loader-open');
  // titleElement.styles.display = 'none';
  // booksContainerElement.styles.display = 'none';
}

function hideLoader() {
  loaderElement.classList.add('loader-is-hidden');
  bodyElement.classList.remove('loader-open');
  // titleElement.styles.display = 'block';
  // booksContainerElement.styles.display = 'block';
}

export { showLoader, hideLoader };
