/*
  toggle navbar aside on mobile screens
  DEFINE: navabar opener and closer and navabr itself
*/
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

// move the progress bar by mouse and touch
let frame,
  progressEls,
  startPosition,
  moveStarted = false;

setTimeout(function () {
  progressEls = Array.from(document.querySelectorAll(".target .progress"));
  // move the progress bar by mouse and touch
  progressEls.forEach(init);
  // animate progress bars
  progressEls.forEach(animate);
}, 10)

function animate(progressEl) {
  let fill = progressEl.firstChild;
  fill.style.width = fill.dataset.progress;
}

function end() {
  cancelAnimationFrame(frame);
  startPosition = null;
  moveStarted = false;
}

function move(e) {
  let currentPosition = this;
  if (moveStarted) console.log(e);
}

function start(e) {
  startPosition = this.firstChild.offsetWidth;
  console.log(e);
  moveStarted = true;
}

function init(progressEl) {
  progressEl.onmousedown = start;
  progressEl.touchstart = start;
  progressEl.onmousemove = move;
  progressEl.touchmove = move;
  progressEl.onmouseup = end;
  progressEl.onmouseleave = end;
  progressEl.touchend = end;

}
