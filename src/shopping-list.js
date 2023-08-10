import './js/header.js';
import './js/dark-theme.js';
import './js/slider.js';

import { fetchBookId } from './js/api';

const shopList = document.querySelector('.js-shop-list'); //list on link where adding books images
const shopBgd = document.querySelector('.js-shop-background'); //link div with base img
let data = JSON.parse(localStorage.getItem('shopplist')); // get from localStorage
// console.log(data);
const BOOK_LS_KEY = 'shopplist';
let cardRef = null;

if (data !== null) {
  renderBookCard(data); // calling function render card
  shopBgd.classList.add('hidden');
}

async function showBook(_id) {
  try {
    data = await fetchBookId(_id);
    console.log(data);
    return await data;
  } catch {
    console.error(error);
  }
}
// showBook(_id);
// function render card this books from the local storage

function renderBookCard(array) {
  if (array.length === 0) {
    // if the local storage is empty then get out from function
    createEmptyCart();
    return;
  }
  if (shopBgd) {
    shopBgd.setAttribute('hidden', ''); //adding to base img atribute hidden
  }

  let markup;

  if (shopList) {
    markup = array
      .map(
        ({
          _id,
          author,
          title,
          list_name,
          book_image,
          description,
          buy_links,
        }) => {
          const card = `<li data-id=${_id} class="shop-item-book">
       <img class="shop-book-img" alt="Wrapper of book" src="${book_image}" />
       <div class="wrapper-descr">
              <div class="shop-info-book">
            <h2 class="shop-secondary-title header-link-shopping ">${title}</h2>
            <p class="shop-category ">${list_name}</p>
            <p class="shop-desc dark-desc ">${description}</p>
                </div>
            <div class="shop-author-wrapper">
              <p class="shop-author">${author}</p>
              <ul class="shop-platform-list">
        
                
                  <a href="${buy_links[0].url}" class="shop-link-amazon dark-amazon" noopener noreferrer>
                                       </a>
 
                  <a href="${buy_links[1].url}" class="shop-link-applebook" noopener noreferrer>
                    </a>

    
                  <a href="${buy_links[4].url}" class="shop-link-bookshop">
                    </a>
                 
  
              </ul>
        
          </div>
          </div> 
   
           <button type="button" class="shop-delete-btn js-delete-btn">
                  </button>
        </li>`;

          shopList.insertAdjacentHTML('beforeend', card);
          cardRef = document.querySelector(`.shop-item-book`);
          // console.log(card);
          return card;
        }
      )
      .join('');
    // console.log(markup);
  }

  shopList.addEventListener('click', onBtnTrashClick);
  shopList.innerHTML = '';
  return shopList.insertAdjacentHTML('beforeend', markup);
}

function onBtnTrashClick(evt) {
  const element = evt.target.closest('[data-id]');
  const id = element.dataset.id;
  // console.log(id)
  if (evt.target.classList.contains('shop-delete-btn')) {
    const card = evt.target.closest('[data-id]');

    card.classList.add('hidden');
    removeBookFromLocalStorage(id);
    // console.log(check);

    // console.log(card);
  }
}

function removeBookFromLocalStorage(id) {
  data = JSON.parse(localStorage.getItem('shopplist'));
  console.log(data);
  const filtredArr = data.filter(card => card._id !== id);
  console.log(filtredArr);
  localStorage.setItem('shopplist', JSON.stringify(filtredArr));
  if (!filtredArr.length) {
    createEmptyCart();
  }
  if (check.length < 1) {
    createEmptyCart();
  }
}

function createEmptyCart() {
  const markupEmpty = `
  
<div class="shop-base-background js-shop-background">
  <p class="shop-text-backgr">
    This page is empty, add some books and proceed to order.
  </p>
  <div class="shop-img-backgr"></div>
</div>`;

  shopList.innerHTML = markupEmpty;
}

import './js/footer.js';
