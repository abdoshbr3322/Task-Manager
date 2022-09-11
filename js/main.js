// toggle navbar aside on mobile screens

// DEFINE: navabar opener and closer and navabr itself
const
  navbarOpener = document.querySelector(".navbar-opener i"),
  navbarCloser = document.querySelector(".navbar-closer"),
  navbarAside = document.querySelector(".navbar aside");

// open navbar on click
navbarOpener.onclick = () => {
  navbarAside.classList.add("active");
}

// close navbar on click and blur
navbarCloser.onclick = closeNav;
navbarAside.onblur = closeNav;

function closeNav() {
  navbarAside.classList.remove("active");
}

// Handle navigation button click events
const
  navBtns = document.querySelectorAll("aside .nav-item button"),
  targetBoxs = Array.from(document.querySelectorAll(".main .targets"));

Array.from(navBtns).forEach((btn) => {
  btn.addEventListener("click" ,navBtnClicked);
});

function navBtnClicked() {
  closeNav();
  targetBoxs.forEach((box, i) => {
    box.style.display = "none";
  });
  let selected = this.dataset.type;
  document.querySelector(`.main .targets${selected}`).style.display = "block";
}
