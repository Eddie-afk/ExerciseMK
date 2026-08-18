const popup = document.querySelector("#popup_user");
const popupCard = document.querySelector("#popup_card");
const userInfoEdit = document.querySelector(".user_info_edit");
const cardInfoEdit = document.querySelector(".top_button");
const popupClose = popup.querySelector(".popup_close_user");
const popupCloseCard = popupCard.querySelector(".popup_close_card");
const card_template = document.querySelector("#card_template");
const container = document.querySelector(".card_container");
const formButtonUser = document.querySelector("#form_button-user");
const formButtonCard = document.querySelector("#form_button-card");

const formName = popup.querySelector(".form_name");
const formDespcription = popup.querySelector(".form_description");

const userInfoName = document.querySelector(".profile_name");
const userInfoDescription = document.querySelector(".profile_description");

const form = popup.querySelector(".form");

const formChar = popupCard.querySelector(".form");
const formCardInputs = formChar.querySelectorAll("input");
const formCharName = popupCard.querySelector(".form_name");
const formCharLink = popupCard.querySelector(".form_link");
const formCharDescription = popupCard.querySelector(".form_description");
const data = [
  {
    title: "Zub-zero",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGoaox9AzrBuOXDqSGcmFqLThUpKn52ZFtue3ta_-H0YS1_OKyuJHRpo&s=10",
    description: "Lin-kuei",
  },
  {
    title: "Cyrax",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK8KRT7eHuj9C8shPQ_R6TB4DpSqSUD_oOZ0QGKPJicndfjmbUo9sKrE8&s=10",
    description: "lin-kuei",
  },
  {
    title: "Liu Kang",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2NOC_Aq5DRYdofU-_Ouy_1g5JQE2GQnHksXFFJcVG2aChWT9H3n0zVV9&s=10",
    description: "Shaolin",
  },
];

const createCard = (personaje) => {
  const card = card_template.content.cloneNode(true);

  const cardTitle = card.querySelector(".card_title");
  const cardImage = card.querySelector(".card_image");
  const cardDescription = card.querySelector(".card_description");
  const cardButton = card.querySelector(".card__button");
  const cardDelete = card.querySelector(".card__delete");

  cardTitle.textContent = personaje.title;
  cardImage.src = personaje.link;
  cardImage.alt = personaje.title;
  cardDescription.textContent = personaje.description;

  cardDelete.addEventListener("click", () => {
    cardDelete.closest(".card").remove();
  });

  container.append(card);
};

data.forEach((personaje) => {
  const card = card_template.content.cloneNode(true);
  const cardTitle = card.querySelector(".card_title");
  const cardImage = card.querySelector(".card_image");
  const cardDescription = card.querySelector(".card_description");

  cardTitle.textContent = personaje.title;
  cardImage.src = personaje.link;
  cardImage.alt = personaje.title;
  cardDescription.textContent = personaje.description;

  container.append(card);
});

userInfoEdit.addEventListener("click", () => {
  popup.classList.toggle("popup_open");
  console.log("funciona 2");
});

cardInfoEdit.addEventListener("click", () => {
  popupCard.classList.toggle("popup_open");
  console.log("funciona 1");
});

popupClose.addEventListener("click", () => {
  popup.classList.toggle("popup_open");
  console.log("boton de cerrar usuario");
});

popupCloseCard.addEventListener("click", () => {
  popupCard.classList.toggle("popup_open");
  console.log("boton de cerrar tarjeta");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  userInfoName.textContent = formName.value;
  userInfoDescription.textContent = formDespcription.value;

  console.log("MORTAL KOMBAT");

  popup.classList.toggle("popup_open");
});

formChar.addEventListener("submit", (e) => {
  e.preventDefault();

  const personaje = {
    title: formCharName.value,
    link: formCharLink.value,
    description: formCharDescription.value,
  };

  createCard(personaje);

  console.log(personaje);

  popupCard.classList.toggle("popup_open");
});
