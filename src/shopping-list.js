
import './js/selectors.js';
// загрузка з нотіфлікс
const shopList = document.querySelector('.js-shop-list'); //list on link where adding books images
const shopBgd = document.querySelector('.js-shop-background'); //link div with base img
let data = JSON.parse(localStorage.getItem('shopping-list')); // get from localStorage

let cardRef = null;

if (data.length !== 0) {
  renderBookCard(data); // виклик ф-ї відтворює картку
  shopBgd.classList.add('hidden');
  
}


function fetchFromLocalStorage(id) {
  return fetch(`https://books-backend.p.goit.global/books/${id}`).then(book =>
    book.json()
  );
}

// ф-я відтворює картку книги з Локал стора

function renderBookCard(array) {
  if (array.length === 0) {
    // if the local storage is empty - get out from function
    return;
  }

  const markup = array
    .map(id => {
      fetchFromLocalStorage(id).then(book => {
        const card = `<li data-id=${res._id} class="shop-item-book">
    <img class="shop-book-img" alt="Wrapper of book" src="${book.book_image}" />
          <div class="shop-info-book">
            <h2 class="shop-secondary-title">${book.title}</h2>
            <p class="shop-category">${book.list_name}</p>
            <p class="shop-desc">${book.description}</p>
            <div class="shop-author-wrapper">
              <p class="shop-author">${book.author}</p>
              <ul class="shop-platform-list">
                <li>
                  <a href="${book.buy_links[0].url}" class="shop-link-amazon" noopener noreferrer>
                                       </a>
                </li>
                <li>

                  <a href="${book.buy_links[1].url}" class="shop-link-applebook" noopener noreferrer>
                    </a>

                </li>
                <li>
                  <a href="${book.buy_links[4].url}" class="shop-link-bookshop">
                    </a>
                 
                </li>
              </ul>
            </div>
          </div>
           <button type="button" class="shop-delete-btn js-delete-btn">
                  </button>
        </li>`;
        shopList.insertAdjacentHTML('beforeend', card);
          cardRef = document.querySelector(`.shop-item-book`);

        return card;
      });
    })
    .join('');
  shopList.addEventListener('click', onBtnDelateClick);
  shopList.innerHTML = '';
  return shopList.insertAdjacentHTML('beforeend', markup);
}


// function onBtnDelateClick(evt) {
//   const element = evt.target.closest('[data-id]');
//   const id = element.dataset.id;
// if(evt.target.classList.contains('shop-delete-btn')){
//   const card = evt.target.closest('[data-id]')

//   card.classList.add('hidden')
//   removeBookFromLocalStorage(id)


// }


// }

// function removeBookFromLocalStorage(bookId) {
//  data = JSON.parse(localStorage.getItem('shopping-list'));

//   const filtredArr = data.filter(card => card !== bookId)
//   localStorage.setItem('shopping-list', JSON.stringify(filtredArr))
//   const check = JSON.parse(localStorage.getItem('shopping-list'));

// if (check.length < 1) {
//   showDefaultBg();
// }
  
// }

// function showDefaultBg() {
//     shopBgd.classList.remove('hidden');
//     shopList.classList.add('hidden');
//     return;
// }
