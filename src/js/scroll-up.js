const scrollUpButton = document.querySelector('.scroll-up');
scrollUpButton.addEventListener('click', () =>
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
);

document.addEventListener('scroll', scrollHandler);

function scrollHandler() {
  let rootElement = document.documentElement;

  let scrollTop = rootElement.scrollTop;
  console.log(rootElement.scrollHeight, rootElement.clientHeight, scrollTop);
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

  if (scrollTop / scrollTotal > 0.15) {
    scrollUpButton.classList.add('showButton');
  } else {
    scrollUpButton.classList.remove('showButton');
  }
}
