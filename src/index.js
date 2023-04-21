import './sass/index.scss';
import { getImages } from './js/getImages';
import { downloadGallery } from './js/downloadGallery';
import { onScroll, onButtonToTop } from './js/scroll';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import smoothscroll from 'smoothscroll-polyfill';

const wordInput  = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.buttonLoadMore');
const arrow = document.querySelector('.icons');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;


onScroll();
onButtonToTop();

function inputHandler(event) {
  event.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = event.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  buttonLoadMore.classList.add('is-hidden');

 
  getImages(query, page, perPage)
      .then(({ data }) => {
      if (data.totalHits === 0 || query === '' ) {
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.", { fontSize: '15px', timeout: 5000 },);
      } else {
          downloadGallery( data.hits);
          simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`, { fontSize: '15px', timeout: 5000 },);

        if (data.totalHits > perPage) {
          buttonLoadMore.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      wordInput.reset();
    });
}

function onButtonLoadMore() {
  page += 1;
  simpleLightBox.destroy();

  getImages(query, page, perPage)
    .then(({ data }) => {
      downloadGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        buttonLoadMore.classList.add('is-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", { fontSize: '15px', timeout: 5000 },);
      }
    })
    .catch(error => console.log(error));
}

wordInput.addEventListener('submit', inputHandler);
buttonLoadMore.addEventListener('click', onButtonLoadMore);

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.pageYOffset >=
    document.documentElement.scrollHeight );
}

// Функція, яка виконуеться, якщо користувач дійшов до кінця сторінки
function showLoadMorePage() {
  if (checkIfEndOfPage()) {
    onButtonLoadMore();
  }
}

// Додати подію на прокручування сторінки, яка викликає функцію showLoadMorePage
window.addEventListener('scroll', showLoadMorePage);

// кнопка “вгору”->
arrow.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // після scrollTo відбудеться подія "scroll", тому стрілка автоматично сховається
};

window.addEventListener('scroll', function () {
  arrow.hidden = scrollY < document.documentElement.clientHeight;
});