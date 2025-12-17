import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

fetchBreeds().then(res => {
  let optionsList = res.data.reduce((acc, el) => {
    return acc += `<option value="${el.id}">${el.name}</option>`}, '');
  select.insertAdjacentHTML('beforeend', optionsList);
  select.hidden = false;
})
  .catch((err) => {
    error.hidden = false;
    console.error(err);
  })
  .finally(() => {
  loader.hidden = true;
});

select.addEventListener('change', (e) => {
  error.hidden = true;
  loader.hidden = false;
  catInfo.classList.add('hidden');
  let selectedBreed = e.target.value;
  fetchCatByBreed(selectedBreed).then(res => breedMarkup(res.data[0]))
    .catch((err) => {
      error.hidden = false;
      console.error(err);
    })
    .finally(() => {
    loader.hidden = true;
  })
})

function breedMarkup(data) {
  let { url, breeds: [{ name, temperament, description }] } = data;
  let markup = `<img src="${url}" class="cat-img" alt="catImg" width="400">
      <div>
        <h1>${name}</h1>
        <p>${description}</p>
        <p><span>Temperament: </span>${temperament}</p>
      </div>`
  catInfo.innerHTML = markup;
  catInfo.classList.remove('hidden');
}
