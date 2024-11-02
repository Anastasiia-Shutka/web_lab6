import {
    addItemToPage,
    renderItemsList,
    clearInputs,
    getInputValues,
} from "./dom_util.js";

import {
    getAllMovies,
    updateMovie,
    postMovie,
    deleteMovie
} from "./API/api.js";

// Existing element selections
const inputTitle = document.getElementById('input-name');
const inputDuration = document.getElementById('input-duration');
const inputReviews = document.getElementById('input-reviews');
const itemsContainer = document.getElementById('items-container');
const modal = document.getElementById("modal");
const create = document.getElementById('create');
const findInput = document.getElementById('search-input');
const findButton = document.getElementById('search');
const cancelFindButton = document.getElementById('cancel');
const countPassengersButton = document.getElementById('count-reviews');
const passengerCountDisplay = document.getElementById('passenger-count');
const sortButton = document.getElementById('sort-button');
const sortOptions = document.getElementById('sort-options');
const openModalBtn = document.getElementById("create-plane");
const closeModalBtn = document.getElementsByClassName("close-btn")[0];

let movies = [];
let currentEditId = null;

create.addEventListener('click', () => {
    clearInputs();
    modal.style.display = "block";
});
/*
create.addEventListener('click', async (event) => {
    event.preventDefault();

    const { title, duration, reviews } = getInputValues();
    clearInputs();

    if (currentEditId) {
        await updatePlanes(currentEditId, { title, duration, reviews });
        currentEditId = null;
    } else {
        await postPlanes({ title, duration, reviews });
    }

    refetchAllMovies();
});
*/
document.addEventListener("DOMContentLoaded", () => {
    modal.style.display = "none";
    document.body.classList.add('loaded');
    refetchAllMovies();
});

const onRemoveItem = async (element) => {
    const id = element.target.id.split('-')[0];
    await deleteMovie(id);
    refetchAllMovies();
}

const onEditItem = async (id) => {

    const movieToEdit = movies.find(movie => movie.movie_id == id);
    if (movieToEdit) {
        inputTitle.value = movieToEdit.title;
        inputDuration.value = movieToEdit.duration;
        inputReviews.value = movieToEdit.reviews;
        currentEditId = movieToEditToEdit.id;
        modal.style.display = "block";
    } else {
        console.error("Movie not found for ID:", id);
        alert("Error: Movie not found.");
    }
};


document.addEventListener("click", async (event) => {
    if (event.target && event.target.classList.contains("btn-info")) {
        console.log("Edit button clicked, ID:", event.target.id);
        await onEditItem(event);
    }

    if (event.target && event.target.classList.contains("btn-del")) {
        const confirmDelete = confirm("Are you sure you want to delete this plane?");
        if (confirmDelete) {
            try {
                await onRemoveItem(event);
            } catch (error) {
                console.error(`Error deleting plane:`, error);
                alert('Error deleting plane. Please try again.');
            }
        }
    }
});

document.addEventListener("click", async (event) => {
    if (event.target && event.target.classList.contains("btn-info")) {
        const id = event.target.id.split("-")[0];
        console.log("Edit button clicked, ID:", id);
        await onEditItem(event);
    }

    if (event.target && event.target.classList.contains("btn-del")) {
        const confirmDelete = confirm("Are you sure you want to delete this plane?");
        if (confirmDelete) {
            try {
                await onRemoveItem(event);
            } catch (error) {
                console.error(`Error deleting plane:`, error);
                alert('Error deleting plane. Please try again.');
            }
        }
    }
});



findButton.addEventListener("click", () => {
    const foundPlane = planes.filter(
      (plane) => plane.name.search(findInput.value) !== -1
    );

    renderItemsList(foundPlane, onEditItem, onRemoveItem);
});
  
cancelFindButton.addEventListener("click", () => {
    renderItemsList(planes, onEditItem, onRemoveItem);
    findInput.value = "";
});

countPassengersButton.addEventListener('click', () => {
    const totalPassengers = planes.reduce((sum, plane) => sum + Number(plane.passengers), 0);
    passengerCountDisplay.textContent = `Total number of passengers: ${totalPassengers}`;
});

sortButton.addEventListener('click', () => {
    const sortBy = sortOptions.value;

    if (sortBy === 'name') {
        planes.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'volume') {
        planes.sort((a, b) => Number(b.volume) - Number(a.volume));
    } else if (sortBy === 'passengers') {
        planes.sort((a, b) => Number(b.passengers) - Number(a.passengers)); 
    }

    renderItemsList(planes, onEditItem, onRemoveItem);
});

openModalBtn.onclick = function() {
    modal.style.display = "block";
};

closeModalBtn.onclick = function() {
    modal.style.display = "none";
    clearInputs();
    currentEditId = null;
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearInputs();
        currentEditId = null;
    }
};

async function refetchAllMovies() {
    const allMovies = await getAllMovies();
    movies = allMovies;
    renderItemsList(movies, onEditItem, onRemoveItem);
}

refetchAllPlanes();