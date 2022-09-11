// get remove buttons
const removeBtns = document.querySelectorAll(".target button.remove");

removeBtns.forEach((btn) => {
  btn.addEventListener('click' ,removeClicked)
});

let wait;
let targetBox;
function removeClicked(e) {
  targetBox = e.currentTarget.parentElement.parentElement;
  targetBox.style.display = "none";
  showAlert();
  wait = setTimeout(() => {
    document.querySelector(".alert").remove();
    removeTarget(targetBox.dataset.id);
  }, 5000);
}

function showAlert() {
  let alert = document.createElement("div");
  let text = document.createTextNode("You have deleted a target");
  let undo = document.createElement("button");
  let undoText = document.createTextNode("Undo");
  alert.className = "alert";
  undo.className = "undo-btn";
  alert.appendChild(text);
  alert.appendChild(undo);
  undo.appendChild(undoText);
  document.body.appendChild(alert);
  // undo removing on click
  undo.addEventListener('click' ,function () {
    document.querySelector(".alert").remove();
    targetBox.style.display = "block";
    clearTimeout(wait);
  })
}

function removeTarget(id) {
  targetBox.remove();
  delete targets[parseInt(id)];
  localStorage.setItem("targets" ,JSON.stringify(targets));
}

let test = {
  name: "abdullah",
  age: 16,
}
