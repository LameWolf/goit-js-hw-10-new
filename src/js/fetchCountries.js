import { onFetchError } from './notify';

const BASE_URL = 'https://restcountries.com/v3.1/';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        onFetchError();
        return Promise.reject(response.status);
      }
      return response.json();
    },
  );
};

export default { fetchCountries };
