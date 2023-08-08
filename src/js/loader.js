function showLoader() {
  const loaderElement = document.querySelector('.loader-backdrop');
  const bodyElement = document.body;
  loaderElement.classList.remove('is-hidden');
  bodyElement.classList.add('loader-open');
}

function hideLoader() {
  const loaderElement = document.querySelector('.loader-backdrop');
  const bodyElement = document.body;
  loaderElement.classList.add('is-hidden');
  bodyElement.classList.remove('loader-open');
}

export { showLoader, hideLoader };
