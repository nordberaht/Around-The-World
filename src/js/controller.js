const header = document.querySelector('header');
const headerButton = document.querySelector('.btn-header');

headerButton.addEventListener('click', () => {
  header.classList.add('hide');
});
