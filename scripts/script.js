const popup = document.querySelector("#popup_user");
const popupCard = document.querySelector("#popup_card");

const userInfoEdit = document.querySelector(".user_info_edit");
const cardInfoEdit = document.querySelector(".top_button button");

const popupClose = popup.querySelector(".popup_close_user");
const popupCloseCard = popupCard.querySelector(".popup_close_card");

const card_template = document.querySelector("#card_template");
const container = document.querySelector(".card_container");

// =========================
// FORMULARIO EDITAR USUARIO
// =========================

const form = popup.querySelector(".form");

const formName = popup.querySelector(".form_name");
const formDespcription = popup.querySelector(".form_description");

const userInfoName = document.querySelector(".profile_name");
const userInfoDescription = document.querySelector(".profile_description");

// =========================
// FORMULARIO AGREGAR TARJETA
// =========================

const formChar = popupCard.querySelector(".form");

const formCharName = popupCard.querySelector(".form_name");
const formCharLink = popupCard.querySelector(".form_link");
const formCharDescription = popupCard.querySelector(".form_description");

// =========================
// PERSONAJES PREDETERMINADOS
// =========================

const data = [
  {
    id: "sub-zero",
    title: "Sub-Zero",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGoaox9AzrBuOXDqSGcmFqLThUpKn52ZFtue3ta_-H0YS1_OKyuJHRpo&s=10",
    description: "Lin-Kuei",
    likes: 0,
  },

  {
    id: "cyrax",
    title: "Cyrax",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK8KRT7eHuj9C8shPQ_R6TB4DpSqSUD_oOZ0QGKPJicndfjmbUo9sKrE8&s=10",
    description: "Lin-Kuei",
    likes: 0,
  },

  {
    id: "liu-kang",
    title: "Liu Kang",
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2NOC_Aq5DRYdofU-_Ouy_1g5JQE2GQnHksXFFJcVG2aChWT9H3n0zVV9&s=10",
    description: "Shaolin",
    likes: 0,
  },
];

// =========================
// LOCAL STORAGE
// =========================

const STORAGE_KEY = "mortalKombatCards";

let personajes;

try {
  const personajesGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY));

  personajes = Array.isArray(personajesGuardados)
    ? personajesGuardados
    : [...data];
} catch (error) {
  personajes = [...data];
}

// Guardar personajes

const saveCards = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(personajes));
};

// =========================
// CREAR TARJETA
// =========================

const createCard = (personaje) => {
  const card = card_template.content.cloneNode(true);

  const cardElement = card.querySelector(".card");

  const cardTitle = card.querySelector(".card_title");
  const cardImage = card.querySelector(".card_image");
  const cardDescription = card.querySelector(".card_description");

  const cardButton = card.querySelector(".card__button");
  const cardDelete = card.querySelector(".card__delete");

  cardTitle.textContent = personaje.title;

  cardImage.src = personaje.link;
  cardImage.alt = personaje.title;

  cardDescription.textContent = personaje.description;

  // =========================
  // BOTÓN LIKE
  // =========================

  if (cardButton) {
    cardButton.textContent = `♥ ${personaje.likes || 0}`;

    cardButton.addEventListener("click", () => {
      personaje.likes = (personaje.likes || 0) + 1;

      cardButton.textContent = `♥ ${personaje.likes}`;

      saveCards();

      console.log(`Le diste like a ${personaje.title}`);
    });
  }

  // =========================
  // BOTÓN ELIMINAR
  // =========================

  if (cardDelete) {
    cardDelete.addEventListener("click", () => {
      personajes = personajes.filter((item) => item.id !== personaje.id);

      saveCards();

      cardElement.remove();

      console.log(`${personaje.title} eliminado`);
    });
  }

  container.append(card);
};

// =========================
// MOSTRAR TARJETAS
// =========================

personajes.forEach((personaje) => {
  createCard(personaje);
});

// =========================
// ABRIR POPUP EDITAR USUARIO
// =========================

userInfoEdit.addEventListener("click", () => {
  // Mostrar valores actuales en el formulario
  formName.value = userInfoName.textContent;
  formDespcription.value = userInfoDescription.textContent;

  popup.classList.add("popup_open");

  console.log("Popup editar usuario abierto");
});

// =========================
// ABRIR POPUP AGREGAR TARJETA
// =========================

cardInfoEdit.addEventListener("click", () => {
  popupCard.classList.add("popup_open");

  console.log("Popup agregar tarjeta abierto");
});

// =========================
// CERRAR POPUP USUARIO
// =========================

popupClose.addEventListener("click", () => {
  popup.classList.remove("popup_open");

  console.log("Popup usuario cerrado");
});

// =========================
// CERRAR POPUP TARJETA
// =========================

popupCloseCard.addEventListener("click", () => {
  popupCard.classList.remove("popup_open");

  console.log("Popup tarjeta cerrado");
});

// =========================
// EDITAR USUARIO
// =========================

form.addEventListener("submit", (e) => {
  e.preventDefault();

  userInfoName.textContent = formName.value;
  userInfoDescription.textContent = formDespcription.value;

  // Guardar perfil
  const perfil = {
    name: formName.value,
    description: formDespcription.value,
  };

  localStorage.setItem("mortalKombatProfile", JSON.stringify(perfil));

  popup.classList.remove("popup_open");

  console.log("Perfil actualizado");
});

// =========================
// AGREGAR NUEVO PERSONAJE
// =========================

formChar.addEventListener("submit", (e) => {
  e.preventDefault();

  const personaje = {
    id: Date.now().toString(),
    title: formCharName.value,
    link: formCharLink.value,
    description: formCharDescription.value,
    likes: 0,
  };

  // Agregar al arreglo
  personajes.push(personaje);

  // Guardar
  saveCards();

  // Crear tarjeta
  createCard(personaje);

  // Limpiar formulario
  formChar.reset();

  // Cerrar popup
  popupCard.classList.remove("popup_open");

  console.log("Personaje agregado:", personaje);
});

// =========================
// CARGAR PERFIL GUARDADO
// =========================

const perfilGuardado = JSON.parse(localStorage.getItem("mortalKombatProfile"));

if (perfilGuardado) {
  userInfoName.textContent = perfilGuardado.name;

  userInfoDescription.textContent = perfilGuardado.description;
}
