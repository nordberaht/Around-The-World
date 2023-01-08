const header = document.querySelector('.entry_page');
const headerButton = document.querySelector('.btn-entry_page');

headerButton.addEventListener('click', () => {
  header.classList.add('hide');
});

fetch('https://restcountries.com/v3.1/all')
  .then((response) => response.json())
  .then((body) => console.log(body[0]));
