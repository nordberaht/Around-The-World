class EntryPage {
  _header = document.querySelector('.entry-page');
  _headerButton = document.querySelector('.btn_entry-page');
  _mapContainer = document.querySelector('#map');

  // PUBLISHER
  addHandlerOpenPage(handler) {
    this._headerButton.addEventListener(
      'click',
      handler.bind(null, this._header, this._mapContainer)
      // bind is used to prevent instant execution of this method
      //which would take place if I have passed args in traditional way
    );
  }
}

export default new EntryPage();
