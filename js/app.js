var colors = {
  work: "hsl(15, 100%, 70%)",
  play: "hsl(195, 74%, 62%)",
  study: "hsl(348, 100%, 68%)",
  exercise: "hsl(145, 58%, 55%)",
  social: "hsl(264, 64%, 52%)",
  selfcare: "hsl(43, 84%, 65%)",
};

// Déclaration de la variable data
var data;

// Fonction pour charger les données JSON depuis un fichier externe
function loadJSON(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "data.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      callback(xhr.responseText);
    }
  };
  xhr.send(null);
}

// Fonction pour créer une carte HTML à partir des données JSON
function createCard(title, current, previous) {
  const divCard = document.createElement("div");
  divCard.classList.add("card");

  // Récupérer la couleur correspondante au titre
  const color = colors[title.toLowerCase().replace(" ", "")];
  if (color) {
    divCard.style.backgroundColor = color;
  }

  const imgIcon = document.createElement("img");
  imgIcon.src = `images/icon-${title.toLowerCase().replace(" ", "-")}.svg`;
  imgIcon.alt = "";

  const divCardDesc = document.createElement("div");
  divCardDesc.classList.add("card-desc");

  const divCardTitle = document.createElement("div");
  divCardTitle.classList.add("card-title");

  const spanTitle = document.createElement("span");
  spanTitle.textContent = title;

  const imgEllipsis = document.createElement("img");
  imgEllipsis.src = "images/icon-ellipsis.svg";
  imgEllipsis.alt = "";

  const divCardTime = document.createElement("div");
  divCardTime.classList.add("card-time");

  const h1Time = document.createElement("h1");
  h1Time.textContent = `${current}hrs`;

  const pTime = document.createElement("p");
  pTime.textContent = `Last Week - ${previous}hrs`;

  // Structure des éléments
  divCardTitle.appendChild(spanTitle);
  divCardTitle.appendChild(imgEllipsis);

  divCardTime.appendChild(h1Time);
  divCardTime.appendChild(pTime);

  divCardDesc.appendChild(divCardTitle);
  divCardDesc.appendChild(divCardTime);

  divCard.appendChild(imgIcon);
  divCard.appendChild(divCardDesc);

  return divCard;
}

// Fonction pour initialiser les cartes avec les données JSON chargées
function initCards() {
  loadJSON(function (response) {
    data = JSON.parse(response);
    const divRight = document.querySelector(".right");
    data.forEach((item) => {
      const { title, timeframes } = item;
      const { current, previous } = timeframes.daily;
      const card = createCard(title, current, previous);
      divRight.appendChild(card);
    });
  });
}

// Fonction pour mettre à jour les cartes avec les données appropriées
function updateCards(timeframe) {
  const cards = document.querySelectorAll(".card");
  data.forEach((item, index) => {
    const { title, timeframes } = item;
    const { current, previous } = timeframes[timeframe];
    const card = cards[index];
    const cardDesc = card.querySelector(".card-desc");
    const cardTime = card.querySelector(".card-time");
    const h1Time = card.querySelector("h1");
    const pTime = card.querySelector("p");
    const spanTitle = card.querySelector(".card-title span");

    h1Time.textContent = `${current}hrs`;
    pTime.textContent = `Last ${
      timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
    } - ${previous}hrs`;
    spanTitle.textContent = title;
  });
}

// Initialisation des cartes avec les données daily par défaut
const menuItems = document.querySelectorAll(".menu li");
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const timeframe = item.textContent.toLowerCase();
    menuItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    updateCards(timeframe);
  });
});

// Appeler la fonction pour initialiser les cartes
initCards();
