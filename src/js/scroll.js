export { onScroll, onButtonToTop };

const buttonToTop  = document.querySelector('.button-to-top');

window.addEventListener('scroll', onScroll);
buttonToTop.addEventListener('click', onButtonToTop);

function onScroll() {
  const scrolled = window.pageYOffset;
  const size  = document.documentElement.clientHeight;

  if (scrolled > size) {
    buttonToTop .classList.add('button-to-top--visible');
  }
  if (scrolled < size) {
    buttonToTop .classList.remove('button-to-top--visible');
  }
}

function onButtonToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}