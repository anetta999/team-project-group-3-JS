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
const scroll = document.querySelector('.container')

const body = document.querySelector('body');

list.addEventListener('click', showBook);
backdrop.addEventListener('click', onClickBackdrop);


const BOOK_LS_KEY = 'shopplist'

async function showBook(evt) {
    evt.preventDefault()
if(evt.target.nodeName !== "IMG"){
    return
}

const bookId = evt.target.id

    let addList = JSON.parse(localStorage.getItem(BOOK_LS_KEY)) || []

  try {
    const data = await fetchBookId(bookId);
    modal.innerHTML = createMarkupCardModal(data);

    const closeBtn = document.querySelector('.modal-close-btn'); 
    closeBtn.addEventListener('click', closeModal);
   
    backdrop.classList.remove('is-hidden')
    window.addEventListener('keydown', onPressESC);
    scroll.classList.add('container.no-scroll');

    const addBtn = document.querySelector('.modal-add-btn');
    const modalEl = document.querySelector('.modal-remove-text')

    if(addList.some((item) => item._id === bookId)) {
        addBtn.textContent = 'remove from the shopping list';
        addBtn.classList.replace('modal-add-btn','modal-remove-btn');
        modalEl.classList.toggle('is-hidden');

        const removeBtn = document.querySelector('.modal-remove-btn');
    removeBtn.addEventListener('click', evt => {
        removeFromShoppList(evt, removeBtn, modalEl, data)
             })
    } else {
        addBtn.addEventListener('click', evt => {
       
            addToShoppList(evt, addBtn, modalEl, data)
        })
    }
  } catch (error) {
    console.error(error);
  }
}
// showBook(bookId);

function addToShoppList(evt, btn, modEl, data){
    if(!evt.target.classList.contains('modal-add-btn')){
        return
    } 
    let addList = JSON.parse(localStorage.getItem(BOOK_LS_KEY)) || []
   addList.push(data)
   localStorage.setItem(BOOK_LS_KEY, JSON.stringify(addList));
    
    btn.textContent = 'remove from the shopping list';
    btn.classList.replace('modal-add-btn','modal-remove-btn');
    modEl.classList.toggle('is-hidden');

    const removeBtn = document.querySelector('.modal-remove-btn');
    removeBtn.addEventListener('click', evt => {
        removeFromShoppList(evt, removeBtn, modEl, data)
             })

}

function removeFromShoppList(evt, remBtn, modalEl, data) {
    if(!evt.target.classList.contains('modal-remove-btn')){
        return
    }
    const curID = evt.target.closest('.modal-id')
    const book = curID.dataset.id;
    let addList = JSON.parse(localStorage.getItem(BOOK_LS_KEY)) || [];
    const deleteData = addList.filter((item) => item._id !== book)
    localStorage.setItem(BOOK_LS_KEY, JSON.stringify(deleteData));

    remBtn.textContent = 'add to shopping list';
    remBtn.classList.replace('modal-remove-btn', 'modal-add-btn');
    modalEl.classList.toggle('is-hidden');
    
    remBtn.addEventListener('click', evt => {
       
        addToShoppList(evt, remBtn, modalEl, data)
    })
}

function createMarkupCardModal(arr) {
  let {_id, author, title, book_image, description, buy_links } = arr;
  return `
  <button type="button" class="modal-close-btn" data-modal-close>
        <svg class="modal-close-png">
          <use href="${svg}#x-close"></use>
        </svg>
      </button>
  <div data-id=${_id} class="modal-id">
  <div class="modal-card-item">
   <img src="${book_image}" alt="${title}" class="modal-book-img" />
   <div class="">
     <h2 class="modal-book-name">${title}</h2>
     <p class="modal-book-autor">${author}</p>
     <p class="modal-book-info">${description}</p>
     <div class="modal-box-link">
       <a href="${buy_links[0].url}" class="modal-link" target="_blank">
       <img class="modal-link-svg"
       src="${amazon}"
       srcset="
       ${amazon} 1x,
       ${amazon_2x} 2x"
       alt="amazon"
       width="62"
       height="19"
     />
       </a>
       <a href="${buy_links[1].url}" class="modal-link" target="_blank">
       <img class="modal-link-svg"
       src="${aplle}"
       srcset="
       ${aplle} 1x,
       ${aplle_2x} 2x"
       alt="apple-books"
       width="33"
       height="32"
     />
       </a>
       <a href="${buy_links[4].url}" target="_blank">
       <img class="modal-link-svg"
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
    <button type="button" class="modal-add-btn">add to shopping list</button>
    <p class="modal-remove-text is-hidden">Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
    </div>
       `;
};

function closeModal() {
  backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
  scroll.classList.remove('container.no-scroll');
};

function onPressESC(evt) {
  if (evt.code === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', onPressESC);
  }
};

function onClickBackdrop(evt) {
      if (evt.target.classList.contains('backdrop')) {
        closeModal();
      }
};