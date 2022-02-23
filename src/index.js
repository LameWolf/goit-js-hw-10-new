import './sass/main.scss';
import { getRefs } from './js/getRefs';
import API from './js/fetchCountries';
import { onFetchInfo, onFetchError, onFetchSuccess } from './js/notify.js';
import countryDescrp from '../src/templates/countryInfo.hbs';
import countryList from '../src/templates/countryList.hbs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
const debounce = require('lodash.debounce');

// || ========== onSearch ========== ||

const onSearch = () => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  const form = refs.searchForm.value.trim();

  if (!form) {
    return;
  }

  API.fetchCountries(form)
    .then(getCountry)
    .catch(error => {
      console.log(error);
    });
};

// || ========== getCountry ========== ||

const getCountry = country => {
  if (country.length === 1) {
    renderCountryCard(country[0]);
    onFetchSuccess();
    return;
  } else if (country.length >= 2 && country.length <= 10) {
    renderCountryList(country);
    return;
  } else if (country.length > 10) {
    onFetchInfo();
    return;
  } else if (country.status === 404) {
    onFetchError();
    return;
  }
};

// || ========== renderCountryCard ========== ||

const renderCountryCard = country => {
  const markup = countryDescrp(country);
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
};

// || ========== renderCountryList ========== ||

const renderCountryList = country => {
  const markup = countryList(country);
  refs.countryList.insertAdjacentHTML('beforeend', markup);
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
