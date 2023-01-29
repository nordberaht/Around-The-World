import View from './view';
import * as L from 'leaflet';
class CountryView extends View {
  _parentElement = document.querySelector('.country-stats');
  _mapElement = L.map('map');

  generateMap() {
    this._mapElement.setView([0, 0], 2);

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    ).addTo(this._mapElement);
  }

  setMapView(lat, lng, zoom) {
    this._mapElement.setView([lat, lng], zoom);
  }

  // PUBLISHER
  addSlideHandler(handler) {
    const showListButton = document.querySelector('.btn--aside');
    const allCountries = document.querySelector('.all-countries');

    showListButton.addEventListener('click', handler.bind(null, allCountries));
  }

  _generateMarkup() {
    return `<div class="country-name-flag">
  <img
    class="country-name-flag_flag"
    src="${this._data.flag}"
    alt="flag of country"
  />
  <h3 class="country-name-flag_name">${this._data.name}</h3>
</div>
<div class="country-info">
  <ul class="country-feature-list">
    <li class="country-feature">
      <p><span>Capital: </span>${this._data.capital}</p>
    </li>
    <li class="country-feature">
      <p><span>Area: </span>${this._data.area}k km²</p>
    </li>
    <li class="country-feature">
      <p><span>Population: </span>${this._data.population} mln</p>
    </li>
    <li class="country-feature">
      <p><span>Currencies: </span>${this._data?.currency}</p>
    </li>
    <li class="country-feature">
      <p><span>Continent: </span>${this._data.continent}</p>
    </li>
    <li class="country-feature">
      <p><span>Region: </span>${this._data.region}</p>
    </li>
    <li class="country-feature">
      <p><span>Subregion: </span>${this._data?.subregion}</p>
    </li>
    <li class="country-feature">
      <p><span>${
        this._data.timezone.length < 10 ? 'Timezone' : 'Timezones'
      }: </span>${this._data.timezone}</p>
    </li>
  </ul>
  <div class="weather-container">
    <h3>${this._data.capital !== 'none' ? "Capital's Weather" : 'Weather'}</h3>
    <div class="weather-card">
  <div class="weather-main">
    <img
    class="weather-icon"
      src="http://openweathermap.org/img/wn/${this._data.weather.icon}@2x.png"
      alt=""
    />
    <div class="weather-temperature">
    <p class="weather-temperature-measured">${this._data.weather.temp}°C</p>
    <p class="weather-temperature-felt">Feels like ${
      this._data.weather.feels
    }°C</p>
    </div>
    </div>
  <ul class="weather-details">
  <li>
      <p><span class="detail-title">Wind: </span>${
        this._data.weather.wind
      } km/h</p>
      </li>
    <li>
    <p><span class="detail-title">Pressure: </span>${
      this._data.weather.pressure
    } hPa</p>
    </li>
    <li>
    <p><span class="detail-title">Humidity: </span>${
      this._data.weather.humidity
    }%</p>
    </li>
    <li>
    <p><span class="detail-title">Visibility: </span>${
      this._data.weather.visibility
    } km</p>
    </li>
    </ul>
    </div>
  </div>
</div>`;
  }
}

export default new CountryView();
