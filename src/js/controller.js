import * as model from './model.js';
import listView from './views/countriesListView.js';
import countryView from './views/countryView';
import entryPage from './views/entryPage.js';
import countriesListView from './views/countriesListView.js';
import header from './views/header.js';

import 'core-js';
import 'regenerator-runtime';

// Render country on the main page
const controlCountry = async function (country) {
  try {
    countryView.renderSpinner();
    await model.loadCountry(country);
    const [lat, lng] = model.state.country.latlng;
    if (model.state.country.area < 1) countryView.setMapView(lat, lng, 10);
    if (model.state.country.area > 1000) countryView.setMapView(lat, lng, 5);
    else countryView.setMapView(lat, lng, 6);
    countryView.render(model.state.country);
  } catch (error) {
    console.error(`${error}`);
  }
};

// Render list of countries in the slide bar
const controlListOfCountries = async function () {
  try {
    await model.loadAllCountries();

    const countries = model.state.listOfCountries;

    listView.render(countries);
  } catch (error) {
    console.error(error);
    countryView.renderError();
  }
};

// SUBSCRIBER - entryPage
const controlEntryPage = function (header, mapContainer) {
  header.classList.add('hide');
  mapContainer.classList.remove('hide');
};

// SUBSCRIBER - countryView
const controlSlideBar = function (allCountries) {
  allCountries.classList.toggle('slide');
};

// SUBSCRIBER - countriesListView & header
const renderCountry = function (searchBar, e) {
  //clear input field if new country will be rendered
  searchBar.value = '';
  e.preventDefault();
  const selectedCountryElement = e.target.closest('li');
  if (!selectedCountryElement) return;

  const nameOfSelectedCountry =
    selectedCountryElement.querySelector('[country]').textContent;

  controlCountry(nameOfSelectedCountry);
};

// ---------------------------------GET CLIENT LOCATION ----------------------------
const showUsersCountry = async function () {
  try {
    countryView.renderSpinner();
    const countryName = await model.getClientLocation();
    controlCountry(countryName);
  } catch (error) {
    console.error(error);
    countryView.renderError(error);
  }
};

// -----------------------INPUT BAR SEARCH --------------------
const showResults = function (e) {
  const input = e.target.value;
  let results = model.filterCountries(input);
  if (!input) results = [];

  header.render(results);
};
// SUBSCRIBER - header
const showResultWindow = function (searchBar, searchResultMarkup, e) {
  const phrase = e.target.value;
  //if there is already generated results window do not generate another one
  if (!searchBar.children[0]?.classList.contains('search-results'))
    searchBar.insertAdjacentHTML('beforeend', searchResultMarkup);
  //if there was already an input show results of search
  if (phrase) showResults(e);
};

// SUBSCRIBER - header
const hideResultWindow = function (resultsContainer, e) {
  const eventTarget = e.target;
  //hide results window if there was a click anywhere else than on results window
  //or search bar
  if (
    eventTarget.classList.contains('search-results') ||
    eventTarget.classList.contains('search-bar_input')
  )
    return;
  // If click was on the result window then abort and execute hiding in other place
  if (resultsContainer.children.length > 0)
    resultsContainer.removeChild(resultsContainer.children[0]);
};

// -------------------------------INITIALIZE---------------------
const init = function () {
  // Rendering List of countries in the side bar
  controlListOfCountries();

  // Rendering map element
  countryView.generateMap();

  // Entry page button's functionality
  entryPage.addHandlerOpenPage(controlEntryPage);

  // Slide bar button's functionality
  countryView.addSlideHandler(controlSlideBar);

  // Search bar functionality
  header.addSearchBarResultVisibilityHandler([
    showResultWindow,
    hideResultWindow,
  ]);

  header.addHandlerRenderCountry(renderCountry);

  header.addSearchBarResultHandler(showResults);

  // SUBSCRIBER - header
  header.addLocationHandler(showUsersCountry);
  // Rendering country information after click on
  //country from side bar
  countriesListView.addHandlerRenderCountry(renderCountry);
};

init();
