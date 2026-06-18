const showList = document.querySelector("#show-list");

const typeButtons = document.querySelectorAll("[data-type]");
const statusButtons = document.querySelectorAll("[data-status]");
const sortSelect = document.querySelector("#sort-select");
const mobileSortSelect = document.querySelector("#mobile-sort-select");

const showImages = {
  1: "assets/img/cyrano-de-bergerac.png",
  2: "assets/img/marina-music.png",
  3: "assets/img/paul.png",
  4: "assets/img/fadyla-camara.png",
  5: "assets/img/En-Attendant.png",
  6: "assets/img/Ahmed.png",
  7: "assets/img/Nora.png",
  8: "assets/img/Jamel.png",
};

const showTypes = {
  theatre: "Théâtre",
  concert: "Concert",
  standup: "Stand-up",
};

let allShows = [];
let selectedType = "all";
let selectedStatus = "all";
let selectedSort = "date";

function cleanText(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("\'", "&#039;");
}

function formatDate(dateValue, timeValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const dateText = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "long",
  }).format(date);

  const cleanDate = dateText.replace(".", "");

  return `${cleanDate} ${timeValue}`.replace(/^./, (letter) =>
    letter.toUpperCase(),
  );
}

function getSeatsLeft(show) {
  return show.places_total - show.places_vendues;
}

function getFillPercent(show) {
  return Math.round((show.places_vendues / show.places_total) * 100);
}

function makeShowCard(show) {
  const seatsLeft = getSeatsLeft(show);
  const fillPercent = getFillPercent(show);
  const isFull = seatsLeft === 0;

  const imagePath =
    show.image || showImages[show.id] || "assets/img/scene-principale.png";

  const typeText = showTypes[show.type] || show.type;

  return `
    <article class="show-card">
      <img
        class="show-card__image"
        src="${imagePath}"
        alt="Visuel du spectacle ${cleanText(show.titre)}"
      />

      <div class="show-card__content">
        <p class="show-card__tag">${cleanText(typeText)}</p>

        <h3 class="show-card__title">${cleanText(show.titre)}</h3>

        <p class="show-card__artist">${cleanText(show.artiste)}</p>

        <p class="show-card__date">
          ${formatDate(show.date, show.horaire)}
        </p>

        <p class="show-card__price">
          À partir de ${cleanText(show.prix)} €
        </p>

        <div class="show-card__bar" aria-label="Places vendues">
          <span
            class="show-card__bar-fill"
            style="width: ${fillPercent}%"
          ></span>
        </div>

        <p class="${isFull ? "show-card__full" : "show-card__seats"}">
          ${
            isFull
              ? "Complet"
              : `Il reste ${seatsLeft} place${seatsLeft > 1 ? "s" : ""}`
          }
        </p>

        <a class="show-card__button" href="programmation.html">
          <span>Réserver</span>
          <img
            class="show-card__button-icon"
            src="assets/icons/Ticket.svg"
            alt=""
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  `;
}

function showCards(shows) {
  if (!showList) {
    return;
  }

  const limit = Number(showList.dataset.limit);
  const showsToDisplay = limit ? shows.slice(0, limit) : shows;

  if (showsToDisplay.length === 0) {
    showList.innerHTML = `
      <div class="show-list__empty">
        Aucun spectacle ne correspond à votre recherche.
      </div>
    `;
    return;
  }

  showList.innerHTML = showsToDisplay.map(makeShowCard).join("");
}

function filterShows(shows) {
  return shows.filter((show) => {
    const seatsLeft = getSeatsLeft(show);
    const isFull = seatsLeft === 0;

    const typeIsOk = selectedType === "all" || show.type === selectedType;

    const statusIsOk =
      selectedStatus === "all" ||
      (selectedStatus === "available" && !isFull) ||
      (selectedStatus === "full" && isFull);

    return typeIsOk && statusIsOk;
  });
}

function sortShows(shows) {
  const sortedShows = [...shows];

  if (selectedSort === "date") {
    sortedShows.sort((showA, showB) => {
      return new Date(showA.date) - new Date(showB.date);
    });
  }

  if (selectedSort === "price-asc") {
    sortedShows.sort((showA, showB) => {
      return showA.prix - showB.prix;
    });
  }

  if (selectedSort === "price-desc") {
    sortedShows.sort((showA, showB) => {
      return showB.prix - showA.prix;
    });
  }

  return sortedShows;
}

function updateButtonActiveState(buttons, activeButton) {
  buttons.forEach((button) => {
    button.classList.remove("show-filter__button--active");
  });

  activeButton.classList.add("show-filter__button--active");
}

function updateShows() {
  const filteredShows = filterShows(allShows);
  const sortedShows = sortShows(filteredShows);

  showCards(sortedShows);
}

function setupTypeFilters() {
  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedType = button.dataset.type;

      updateButtonActiveState(typeButtons, button);
      updateShows();
    });
  });
}

function setupStatusFilters() {
  statusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedStatus = button.dataset.status;

      updateButtonActiveState(statusButtons, button);
      updateShows();
    });
  });
}

function setupSort() {
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      selectedSort = sortSelect.value;

      if (mobileSortSelect) {
        mobileSortSelect.value = selectedSort;
      }

      updateShows();
    });
  }

  if (mobileSortSelect) {
    mobileSortSelect.addEventListener("change", () => {
      selectedSort = mobileSortSelect.value;

      if (sortSelect) {
        sortSelect.value = selectedSort;
      }

      updateShows();
    });
  }
}

async function loadShows() {
  if (!showList) {
    return;
  }

  try {
    const response = await fetch("assets/data/spectacles.json");

    if (!response.ok) {
      throw new Error("Impossible de charger spectacles.json");
    }

    const data = await response.json();

    allShows = data.spectacles;

    updateShows();
    setupTypeFilters();
    setupStatusFilters();
    setupSort();
  } catch (error) {
    showList.innerHTML = `
      <div class="show-list__empty">
        La programmation est momentanément indisponible.
      </div>
    `;

    console.error(error);
  }
}

loadShows();
