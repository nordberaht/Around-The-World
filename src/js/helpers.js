import { TIMEOUT_SECS } from './config';

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took to long! (>${s}s)`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([timeout(TIMEOUT_SECS), fetch(url)]);

    const body = await response.json();
    if (!response.ok)
      throw new Error(
        `Something went wrong..${body.message} (${response.status})`
      );
    return body;
  } catch (error) {
    throw error;
  }
};

export const sortCountriesAlphabetically = function (listOfItems) {
  listOfItems.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    else return 1;
  });
  return listOfItems;
};

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (succes) => resolve(succes),
      (error) => reject(error)
    );
  });
};
