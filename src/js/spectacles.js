const showList = document.querySelector("#show-list");

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

function cleanText(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
    letter.toUpperCase()
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

  showList.innerHTML = showsToDisplay.map(makeShowCard).join("");
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

    showCards(data.spectacles);
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