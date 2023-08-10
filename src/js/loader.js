const loaderElement = document.querySelector('.loader-backdrop');
const bodyElement = document.body;

function showLoader() {
  loaderElement.classList.remove('loader-is-hidden');
  bodyElement.classList.add('loader-open');
}

function hideLoader() {
  loaderElement.classList.add('loader-is-hidden');
  bodyElement.classList.remove('loader-open');
}

export { showLoader, hideLoader };
