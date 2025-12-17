import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from "notiflix";

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const options = {
  position: 'center-center',
  distance: '15px',
  borderRadius: '15px',
  timeout: 3000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
};

fetchBreeds().then(res => {
  let optionsList = res.data.reduce((acc, el) => {
    return acc += `<option value="${el.id}">${el.name}</option>`}, '');
  select.insertAdjacentHTML('beforeend', optionsList);
  new SlimSelect({
    select: '.breed-select',
    settings: {
      showSearch: false,
      hideSelected: true,
    }
  })
  select.hidden = false;
})
  .catch((err) => {
    // error.hidden = false;
    console.error(err);
    Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      options
    );
  })
  .finally(() => {
  loader.classList.add('hidden');
});

select.addEventListener('change', (e) => {
  // error.hidden = true;
  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');
  let selectedBreed = e.target.value;
  fetchCatByBreed(selectedBreed).then(res => breedMarkup(res.data[0]))
    .catch((err) => {
      Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      options
    );
      // error.hidden = false;
      console.error(err);
    })
    .finally(() => {
    loader.classList.add('hidden');
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
