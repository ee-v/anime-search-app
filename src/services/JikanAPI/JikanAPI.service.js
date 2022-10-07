const ENDPOINT = 'https://api.jikan.moe/v4/';
const RESOURCES = {
  topAnime: 'top/anime',
  anime: 'anime'
};

const getURL = (resource) => {
  return ENDPOINT + RESOURCES[resource];
};

const blockContent = 'sfw=true';

const queryParams = (args) => {
  if (args === undefined) return '';
  const keys = Object.keys(args);
  let qParams = keys.map(param => {
    let val = args[param];
    return val !== '' ? `${param}=${val}` : '';
  }).filter(q => q !== '');
  return `?${blockContent}&` + qParams.join('&');
}

export default class JikanService {
  getTopAnime(params) {
    return fetch(getURL('topAnime') + queryParams(params))
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  getAnime(params) {
    return fetch(getURL('anime') + queryParams(params))
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  getAnimeById(id) {
    return fetch(getURL('anime/' + id))
      .then(response => response.json())
      .catch(error => console.log(error));
  }
}