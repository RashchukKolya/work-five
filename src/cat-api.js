import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_XmUynI2y6mRuhD8Zi7A1RaXvJ8ax4IIpg3GS9kszL5S0GlTxMHUR821pEwiqMkZb";

// https://api.thecatapi.com/v1/breeds'
// https://api.thecatapi.com/v1/images/search

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then((res) => {
      return res;
    })
}

function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}1`)
    .then((res) => {
      return res;
    })
}


export { fetchBreeds, fetchCatByBreed};