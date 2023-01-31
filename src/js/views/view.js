export default class View {
  _parentElement;
  _data;
  _errorMessage;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    this._clear();
    const markup = this._generateSpinnerMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateSpinnerMarkup() {
    return `
    <div class="first-view">
    <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="spinner"
  >
    <g>
      <circle cx="12" cy="2.5" r="1.5" opacity=".14" />
      <circle cx="16.75" cy="3.77" r="1.5" opacity=".29" />
      <circle cx="20.23" cy="7.25" r="1.5" opacity=".43" />
      <circle cx="21.50" cy="12.00" r="1.5" opacity=".57" />
      <circle cx="20.23" cy="16.75" r="1.5" opacity=".71" />
      <circle cx="16.75" cy="20.23" r="1.5" opacity=".86" />
      <circle cx="12" cy="21.5" r="1.5" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="discrete"
        dur="0.75s"
        values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </g>
  </svg>
  </div>`;
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="first-view">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="warning-icon"
        >
          <title>Warning</title>
          <path
            d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <path
            d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z" />
        </svg>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
