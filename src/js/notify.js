import Notiflix from 'notiflix';

const onFetchInfo = () => {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

const onFetchError = () => {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

const onFetchSuccess = () => {
  Notiflix.Notify.success('Congratulations! Request completed.');
};

export { onFetchInfo, onFetchError, onFetchSuccess };
