import { fetchBookId } from './api';
import amazon from '../img/image1@1x.png';
import amazon_2x from '../img/image1@2x.png';
import aplle from '../img/image2@1x.png';
import aplle_2x from '../img/image2@2x.png';
import bookshop from '../img/image3@1x.png';
import bookshop_2x from '../img/image3@2x.png';
import svg from '../img/sprite.svg';

const modal = document.querySelector('.modal');
const list = document.querySelector('.books-container-list');
const backdrop = document.querySelector('.backdrop');
const bodyElement = document.body;

const BOOK_LS_KEY = 'shopplist';

list.addEventListener('click', showBook);
backdrop.addEventListener('click', onClickBackdrop);

async function showBook(evt) {
  evt.preventDefault();
  console.log(evt.target.nodeName);
  if (evt.target.nodeName === 'UL' || evt.target.nodeName === 'BUTTON') {
    return;
  }

  const bookId = evt.target.id;
  console.log(bookId);

  let addList = JSON.parse(localStorage.getItem(BOOK_LS_KEY)) || [];

  try {
    const data = await fetchBookId(bookId);
    modal.innerHTML = createMarkupCardModal(data);

    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeModal);

    backdrop.classList.remove('is-hidden');
    bodyElement.classList.add('no-scroll');
    window.addEventListener('keydown', onPressESC);

    const addBtn = document.querySelector('.modal-add-btn');
    const modalEl = document.querySelector('.modal-remove-text');

    if (addList.some(item => item._id === bookId)) {
      addBtn.textContent = 'remove from the shopping list';
      addBtn.classList.replace('modal-add-btn', 'modal-remove-btn');
      modalEl.style.display = 'block';

      const removeBtn = document.querySelector('.modal-remove-btn');
      removeBtn.addEventListener('click', evt => {
        removeFromShoppList(evt, removeBtn, modalEl, data);
      });
    } else {
      addBtn.addEventListener('click', evt => {
        addToShoppList(evt, addBtn, modalEl, data);
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

function addToShoppList(evt, btn, modEl, data) {
  if (!evt.target.classList.contains('modal-add-btn')) {
    return;
  }
  let addList = JSON.parse(localStorage.getItem(BOOK_LS_KEY)) || [];
  addList.push(data);
  localStorage.setItem(BOOK_LS_KEY, JSON.stringify(addList));

  btn.textContent = 'remove from the shopping list';
  btn.classList.replace('modal-add-btn', 'modal-remove-btn');
  modEl.style.display = 'block';

  const removeBtn = document.querySelector('.modal-remove-btn');
  removeBtn.addEventListener('click', evt => {
    removeFromShoppList(evt, removeBtn, modEl, data);
  });
}

function removeFromShoppList(evt, remBtn, modalEl, data) {
  if (!evt.target.classList.contains('modal-remove-btn')) {
    return;
  }
  const curID = evt.target.closest('.modal-id');
  const book = curID.dataset.id;
  let addList = JSON.parse(localStorage.getItem(BOOK_LS_KEY)) || [];
  const deleteData = addList.filter(item => item._id !== book);
  localStorage.setItem(BOOK_LS_KEY, JSON.stringify(deleteData));

  remBtn.textContent = 'add to shopping list';
  remBtn.classList.replace('modal-remove-btn', 'modal-add-btn');
  modalEl.classList.toggle('is-hidden');

  remBtn.addEventListener('click', evt => {
    addToShoppList(evt, remBtn, modalEl, data);
  });
}

function createMarkupCardModal(arr) {
  let { _id, author, title, book_image, description, buy_links } = arr;
  return `
  <button type="button" class="modal-close-btn dark-close-btn" data-modal-close>
        <svg class="modal-close-png dark-close-png">
          <use href="${svg}#x-close"></use>
        </svg>
      </button>
  <div data-id=${_id} class="modal-id dark-modal-id">
  <div class="modal-card-item">
   <img src="${book_image}" alt="${title}" class="modal-book-img dark-modal-book-img" />
   <div class="">
     <h2 class="modal-book-name dark-modal-book-name">${title}</h2>
     <p class="modal-book-autor dark-modal-book-autor">${author}</p>
     <p class="modal-book-info dark-modal-book-info">${description}</p>
     <div class="modal-box-link dark-modal-box-link">
       <a href="${buy_links[0].url}" class="modal-link dark-modal-link" target="_blank">
       <img class="modal-link-svg dark-modal-link-svg dark-amazon"
       src="${amazon}"
       srcset="
       ${amazon} 1x,
       ${amazon_2x} 2x"
       alt="amazon"
       width="62"
       height="19"
     />
       </a>
       <a href="${buy_links[1].url}" class="modal-link dark-modal-link" target="_blank">
       <img class="modal-link-svg dark-modal-link-svg"
       src="${aplle}"
       srcset="
       ${aplle} 1x,
       ${aplle_2x} 2x"
       alt="apple-books"
       width="33"
       height="32"
     />
       </a>
       <a href="${buy_links[4].url}" target="_blank" class="modal-link dark-modal-link">
       <img class="modal-link-svg dark-modal-link-svg"
          src="${bookshop}"
          srcset="
          ${bookshop} 1x,
          ${bookshop_2x} 2x"
          alt="bookshop"
          width="38"
          height="36"
        />
     </a>
       </div>
    </div>
    </div>
    <button type="button" class="modal-add-btn dark-modal-add-btn">add to shopping list</button>
    <p class="modal-remove-text dark-modal-remove-text">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
    </div>
       `;
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  bodyElement.classList.remove('no-scroll');
  window.removeEventListener('keydown', onPressESC);
}

function onPressESC(evt) {
  if (evt.code === 'Escape') {
    closeModal();
    bodyElement.classList.remove('no-scroll');
    window.removeEventListener('keydown', onPressESC);
  }
}

function onClickBackdrop(evt) {
  if (evt.target.classList.contains('backdrop')) {
    closeModal();
  }
}
