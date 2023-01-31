class Header {
  _searchBarInput = document.querySelector('.search-bar_input');
  _searchBar = document.querySelector('.search-bar');
  _resultsContainer = document.querySelector('.search-results--container');
  _mainpage = document.querySelector('.main-page');
  _resultsWindow;
  _data = [];

  render(data) {
    this._data = data;
    this._resultsWindow = document.querySelector('.search-results');
    const markup = this._generateSearchResultsMarkup();
    this._clear();
    this._resultsWindow.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._resultsWindow.innerHTML = '';
  }

  // PUBLISHER
  addHandlerRenderCountry(handler) {
    this._resultsContainer.addEventListener(
      'click',
      handler.bind(null, this._searchBarInput)
    );
  }

  // PUBLISHER
  addLocationHandler(handler) {
    const locationButton = document.querySelector('.btn-location');

    locationButton.addEventListener('click', handler);
  }
  // PUBLISHER
  addSearchBarResultVisibilityHandler(handlers) {
    this._searchBarInput.addEventListener(
      'focusin',
      handlers[0].bind(
        null,
        this._resultsContainer,
        this._generateSearchResultsWindow()
      )
    );
    this._mainpage.addEventListener(
      'click',
      handlers[1].bind(null, this._resultsContainer)
    );
  }
  // PUBLISHER
  addSearchBarResultHandler(handler) {
    this._searchBarInput.addEventListener('input', handler);
  }

  _generateSearchResultsWindow() {
    return `
      <ul class="search-results">
      <p class="no-results">No results found</p>
      </ul>
    `;
  }

  _generateSearchResultsMarkup() {
    return `${
      this._data.length === 0
        ? '<p class="no-results">No results found</p>'
        : this._data
            .map((country) => this._generateCardMarkup(country))
            .join('')
    }`;
  }

  _generateCardMarkup(country) {
    return `
    <li class="country-card_search">
    <img
      src=${country.flags.svg}
      alt=""
      class="country-card_search--flag"
    />
    <p class="country-card_search--country_name" country>${country.name.common}</p>
    </li>`;
  }
}

export default new Header();
