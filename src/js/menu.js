const menuButton = document.querySelector(".header__menu-button");
const navigation = document.querySelector(".header__nav");
const navigationLinks = document.querySelectorAll(".header__link");

function closeMenu() {
  navigation.classList.remove("header__nav--open");
  menuButton.classList.remove("header__menu-button--open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  navigation.classList.add("header__nav--open");
  menuButton.classList.add("header__menu-button--open");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function toggleMenu() {
  const isMenuOpen = navigation.classList.contains("header__nav--open");

  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", toggleMenu);

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}