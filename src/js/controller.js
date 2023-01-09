import * as L from 'leaflet';

const header = document.querySelector('.entry_page');
const headerButton = document.querySelector('.btn-entry_page');

const showListButton = document.querySelector('.btn--aside');
const allCountries = document.querySelector('.all_countries');

const mapDiv = document.querySelector('#map');

headerButton.addEventListener('click', () => {
  header.classList.add('hide');
  mapDiv.classList.remove('hide');
});

showListButton.addEventListener('click', () => {
  allCountries.classList.toggle('slide');
});

fetch('https://restcountries.com/v3.1/all')
  .then((response) => response.json())
  .then((body) => console.log(body[0]));

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
