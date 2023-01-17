import * as L from 'leaflet';

// SELECTORS
const header = document.querySelector('.entry-page');
const headerButton = document.querySelector('.btn_entry-page');

const showListButton = document.querySelector('.btn--aside');
const allCountries = document.querySelector('.all-countries');

const listOfAllCountries = document.querySelector('.countries-list');
const listCountries = listOfAllCountries.children;

const countryStats = document.querySelector('.country-stats');

const locationButton = document.querySelector('.btn-location');

const mapDiv = document.querySelector('#map');

// -----------------------------------------PAGE RESPONSIVNESS-----------------------------
// --------------FOR ENTRY PAGE--------------
headerButton.addEventListener('click', () => {
  header.classList.add('hide');
  mapDiv.classList.remove('hide');
});

// --------------FOR ASIDE SECTION--------------
showListButton.addEventListener('click', () => {
  allCountries.classList.toggle('slide');
});

// -----------------------------------------MAP----------------------------

const map = L.map('map').setView([0, 0], 2);

L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(map);

// L.marker([52.254294, 19.433056])
//   .addTo(map)
//   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//   .openPopup();

// -----------------------------------------APIS-----------------------------
// --------------WEATHER API--------------
//  https://openweathermap.org/current#data
const generateWeatherMarkup = function (weather) {
  return `<div class="weather-card">
  <div class="weather-main">
    <img
    class="weather-icon"
      src="http://openweathermap.org/img/wn/${weather.icon}@2x.png"
      alt=""
    />
    <div class="weather-temperature">
    <p class="weather-temperature-measured">${weather.temp}°C</p>
    <p class="weather-temperature-felt">Feels like ${weather.feels}°C</p>
    </div>
    </div>
  <ul class="weather-details">
  <li>
      <p><span class="detail-title">Wind: </span>${weather.wind} km/h</p>
      </li>
    <li>
    <p><span class="detail-title">Pressure: </span>${weather.pressure} hPa</p>
    </li>
    <li>
    <p><span class="detail-title">Humidity: </span>${weather.humidity}%</p>
    </li>
    <li>
    <p><span class="detail-title">Visibility: </span>${weather.visibility} km</p>
    </li>
    </ul>
    </div>`;
};

const getWeather = async function (city, country) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=f92e96d37e2400c229247a58bb6f0f0f&units=metric`
    );
    const body = await response.json();

    if (!response.ok) throw new Error(`An error occured! ${body.message}`);

    const weather = {
      icon: body.weather[0].icon,
      temp: +body.main.temp.toFixed(0),
      feels: +body.main['feels_like'].toFixed(0),
      wind: body.wind.speed,
      pressure: body.main.pressure,
      humidity: body.main.humidity,
      visibility: body.visibility / 1000,
    };
    //Now div with class weather-container should exist because of MainPageMarkup
    const weatherContainer = document.querySelector('.weather-container');
    console.log(body);
    weatherContainer.insertAdjacentHTML(
      'beforeend',
      generateWeatherMarkup(weather)
    );
  } catch (error) {
    console.error(error);
  }
};

// --------------COUNTRIES--------------
const generateMainPageMarkup = function (country) {
  return `<div class="country-name-flag">
  <img
    class="country-name-flag_flag"
    src="${country.flags.svg}"
    alt="flag of country"
  />
  <h3 class="country-name-flag_name">${country.name.common}</h3>
</div>
<div class="country-info">
  <ul class="country-feature-list">
    <li class="country-feature">
      <p><span>Capital: </span>${country?.capital[0] ?? 'none'}</p>
    </li>
    <li class="country-feature">
      <p><span>Area: </span>${(country.area / 1000).toFixed(2)}k km²</p>
    </li>
    <li class="country-feature">
      <p><span>Population: </span>${(country.population / 1000000).toFixed(
        2
      )} mln</p>
    </li>
    <li class="country-feature">
      <p><span>Currencies: </span>${
        country?.currencies
          ? Object.values(country.currencies).reduce((prev, cur, index) => {
              if (Object.values(country.currencies).length === 1)
                return `${cur.name} (${cur.symbol})`;
              if (index === Object.values(country.currencies).length - 1)
                return prev + `${cur.name} (${cur.symbol})`;
              return prev + `${cur.name} (${cur.symbol}), `;
            }, '')
          : 'none'
      }</p>
    </li>
    <li class="country-feature">
      <p><span>Continent: </span>${country.continents}</p>
    </li>
    <li class="country-feature">
      <p><span>Region: </span>${country.region}</p>
    </li>
    <li class="country-feature">
      <p><span>Subregion: </span>${country?.subregion}</p>
    </li>
    <li class="country-feature">
      <p><span>${
        country.timezones.length === 1 ? 'Timezone' : 'Timezones'
      }: </span>${country.timezones.reduce((acc, curr, index) => {
    if (country.timezones.length === 1) return `${curr}`;
    if (country.timezones.length - 1 === index) return acc + `${curr}`;
    return acc + `${curr}, `;
  }, '')}</p>
    </li>
  </ul>
  <div class="weather-container">
    <h3>Capital's Weather</h3>
  </div>
</div>`;
};

const generateCountryCardMarkup = function (country) {
  return `<li class="country-card">
  <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
  <h3 class="country-card-name">${country.name.common}</h3>
</li>`;
};

const sortCountriesAlphabetically = function (listOfItems) {
  listOfItems.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    else return 1;
  });
  return listOfItems;
};

const loadCountry = function (country, latlang) {
  countryStats.innerHTML = '';
  countryStats.insertAdjacentHTML(
    'afterbegin',
    generateMainPageMarkup(country)
  );
  // Fetch and insert Weather Info
  getWeather(country.capital[0], country.altSpellings[0]);

  // Set map view
  map.setView([latlang[0], latlang[1]], 6);
};

const generateListOfCountries = async function () {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    if (!response.ok)
      throw new Error(`Something went wrong..${countries.message}`);
    const antIndex = countries.findIndex(
      (country) => country.name.common === 'Antarctica'
    );
    countries.splice(antIndex, 1);
    sortCountriesAlphabetically(countries);

    const markup = countries
      .map((country) => generateCountryCardMarkup(country))
      .join('');

    listOfAllCountries.insertAdjacentHTML('afterbegin', markup);

    //Adding event listener to newly created list of countries
    // Need it there because of access to fetched data about countries
    listOfAllCountries.addEventListener('click', (e) => {
      e.preventDefault();
      // Get li country element based on click
      const selectedCountryElement = e.target.closest('li');
      if (!selectedCountryElement) return;

      //Get the name of country
      const nameOfSelectedCountry =
        selectedCountryElement.querySelector('.country-card-name').textContent;

      //Find clicked country in the countries array
      const selectedCountry = countries.find(
        (country) => country.name.common === nameOfSelectedCountry
      );
      loadCountry(selectedCountry, selectedCountry.latlng);
    });
  } catch (error) {
    console.error(error);
  }
};

generateListOfCountries();

// ---------------------------------GET CLIENT LOCATION ----------------------------
// Promisyfying getting current location

const getLocation = () => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (succes) => resolve(succes),
      (error) => reject(error)
    );
  });
};

const showUserLocation = async function () {
  try {
    const location = await getLocation();

    const { latitude: lat, longitude: long } = location.coords;

    const clientsCountryRequest = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=10d3706a01ec4cc1a9f0432a5727be2b`
    );
    const clientsCountryResponse = await clientsCountryRequest.json();
    const clientsCountryName =
      clientsCountryResponse.features[0].properties.country;

    const country = await fetch(
      `https://restcountries.com/v3.1/name/${clientsCountryName}`
    );
    const countryResponse = await country.json();

    loadCountry(countryResponse[0], countryResponse[0].latlng);
  } catch (error) {
    console.error(error);
  }
};

locationButton.addEventListener('click', () => {
  showUserLocation();
});
