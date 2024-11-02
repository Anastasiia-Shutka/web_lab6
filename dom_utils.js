const inputName = document.getElementById('input-name');
const inputDuration = document.getElementById('input-duration');
const inputReviews = document.getElementById('input-reviews');
const itemsContainer = document.getElementById('items-container');

const itemTemplate = ({ id, name, duration, reviews }) => `
<li id="${id}" class="card mb-3 item-card">
    <img
    src="movie_icon.png"
    class="item-container__image card-img-top" alt="card">
    <div class="card-body">
        <p class="card-title">Title: ${name}</p>
        <p class="card-text-duration">Duration: ${duration} min</p>
        <p class="card-text-reviews">IMDB Reviews: ${reviews}</p>
        <button id="${id}-edit" type="button" class="btn-info">Edit</button>
    </div>
</li>`;

export const EDIT_BUTTON_SUFFIX = '-edit';

export const clearInputs = () => {
  inputName.value = "";
  inputDuration.value = "";
  inputReviews.value = "";
};

export const addItemToPage = ({ id, title, duration, reviews }, onEditItem) => {
  itemsContainer.insertAdjacentHTML(
      "afterbegin",
      itemTemplate({ id, title, duration, reviews })
  );

  const editButton = document.getElementById(`${id}${EDIT_BUTTON_SUFFIX}`);
  editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      onEditItem(id);
  });
};


export const getInputValues = () => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: inputName.value.trim(),
    duration: inputVolume.value.trim(),
    reviews: inputPassengers.value.trim(),
  };
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item, onEditItem, onRemoveItem);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("create-plane");
  const closeModalBtn = document.getElementsByClassName("close-btn")[0];

  openModalBtn.onclick = function() {
    modal.style.display = "block";
  };

  closeModalBtn.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});