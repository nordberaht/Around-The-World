import View from './view';
class CountriesListView extends View {
  _parentElement = document.querySelector('.countries-list');

  _generateMarkup() {
    return this._data.map((item) => this._cardMarkup(item)).join('');
  }

  _cardMarkup(country) {
    return `<li class="country-card">
  <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
  <h3 class="country-card-name" country>${country.name.common}</h3>
</li>`;
  }

  // PUBLISHER
  addHandlerRenderCountry(handler) {
    this._parentElement.addEventListener('click', handler);
  }
}

export default new CountriesListView();
