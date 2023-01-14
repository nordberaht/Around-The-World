import * as L from 'leaflet';

// SELECTORS
const header = document.querySelector('.entry-page');
const headerButton = document.querySelector('.btn_entry-page');

const showListButton = document.querySelector('.btn--aside');
const allCountries = document.querySelector('.all-countries');

const mapDiv = document.querySelector('#map');

// --------------FOR ENTRY PAGE--------------
headerButton.addEventListener('click', () => {
  header.classList.add('hide');
  mapDiv.classList.remove('hide');
});

// --------------FOR ASIDE SECTION--------------
showListButton.addEventListener('click', () => {
  allCountries.classList.toggle('slide');
});

// --------------COUNTRIES--------------

fetch('https://restcountries.com/v3.1/all')
  .then((response) => response.json())
  .then((body) => console.log(body[0]));

// --------------MAP--------------

var map = L.map('map').setView([52.254294, 19.433056], 5);

L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(map);

L.marker([52.254294, 19.433056])
  .addTo(map)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup();

// --------------WEATHER API--------------
//  https://openweathermap.org/current#data
let weather = {
  apiKey: 'f92e96d37e2400c229247a58bb6f0f0f',
  fetchWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((body) => console.log(body));
  },
};

weather.fetchWeather('jelenia góra');
