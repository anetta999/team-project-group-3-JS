const loaderElement = document.querySelector('.loader-backdrop');
const bodyElement = document.body;

function showLoader() {
  loaderElement.classList.remove('loader-is-hidden');
  loaderElement.classList.add('loader-backdrop');
  bodyElement.classList.add('loader-open');
}

function hideLoader() {
  loaderElement.classList.add('loader-is-hidden');
  loaderElement.classList.remove('loader-backdrop');
  bodyElement.classList.remove('loader-open');
}

export { showLoader, hideLoader };
