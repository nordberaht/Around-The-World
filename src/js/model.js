import {
  COUNTRIES_API_URL,
  WEATHER_API_KEY,
  WEATHER_API_URL,
  GEOCODING_API_URL,
  GEOCODING_API_KEY,
} from './config';
import { getJSON, sortCountriesAlphabetically, getLocation } from './helpers';

import 'core-js';
import 'regenerator-runtime';

export const state = {
  listOfCountries: [],
  country: {},
};

export const filterCountries = function (phrase) {
  return state.listOfCountries.filter(
    (country) =>
      country.name.common.slice(0, phrase.length).toLowerCase() ===
      phrase.toLowerCase()
  );
};

export const loadAllCountries = async function () {
  try {
    const countries = await getJSON(COUNTRIES_API_URL);

    sortCountriesAlphabetically(countries);

    state.listOfCountries = countries;
  } catch (error) {
    console.error(`${error}`);
    throw error;
  }
};

export const loadCountry = async function (countryName) {
  try {
    const country = state.listOfCountries.find(
      (country) => country.name.common === countryName
    );
    state.country = {
      flag: country.flags.svg,
      name: country.name.common,
      capital: country.capital?.[0] ?? 'none',
      area: country.area,
      population: country.population,

      currency: country?.currencies
        ? Object.values(country.currencies).reduce((prev, cur, index) => {
            if (Object.values(country.currencies).length === 1)
              return `${cur.name} (${cur.symbol})`;
            if (index === Object.values(country.currencies).length - 1)
              return prev + `${cur.name} (${cur.symbol})`;
            return prev + `${cur.name} (${cur.symbol}), `;
          }, '')
        : 'none',

      continent: country.continents,
      region: country.region,
      subregion: country?.subregion ?? 'none',

      timezone: country.timezones.reduce((acc, curr, index) => {
        if (country.timezones.length === 1) return `${curr}`;
        if (country.timezones.length - 1 === index) return acc + `${curr}`;
        return acc + `${curr}, `;
      }, ''),

      latlng: country.latlng,
    };

    const { capital: city, name: countryOfCountry, latlng } = state.country;
    const params =
      city !== 'none'
        ? `q=${city},${countryOfCountry}`
        : `lat=${latlng[0]}&lon=${latlng[1]}`;
    const body = await getJSON(
      `${WEATHER_API_URL}${params}&appid=${WEATHER_API_KEY}&units=metric`
    );
    state.country.weather = {
      icon: body.weather[0].icon,
      temp: +body.main.temp.toFixed(0),
      feels: +body.main['feels_like'].toFixed(0),
      wind: body.wind.speed,
      pressure: body.main.pressure,
      humidity: body.main.humidity,
      visibility: body.visibility / 1000,
    };
  } catch (error) {
    console.error(`${error} 🕘`);
  }
};

export const getClientLocation = async function () {
  try {
    const location = await getLocation();

    const { latitude: lat, longitude: long } = location.coords;

    const clientCountryResponse = await getJSON(
      `${GEOCODING_API_URL}lat=${lat}&lon=${long}&apiKey=${GEOCODING_API_KEY}`
    );

    const clientsCountryName =
      clientCountryResponse.features[0].properties.country;

    return clientsCountryName;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
