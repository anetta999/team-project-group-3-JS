import throttle from 'lodash.throttle';

const scrollUpButton = document.querySelector('.scroll-up');
scrollUpButton.addEventListener('click', () =>
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
);

document.addEventListener('scroll', throttle(scrollHandler, 1000));

function scrollHandler() {
  let rootElement = document.documentElement;
  let scrollTop = rootElement.scrollTop;
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

  if (scrollTop / scrollTotal > 0.05) {
    scrollUpButton.classList.add('showButton');
  } else {
    scrollUpButton.classList.remove('showButton');
  }
}
