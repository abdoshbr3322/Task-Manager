// get remove buttons
const removeBtns = document.querySelectorAll(".target button.remove");

// fire removeClicked on click
removeBtns.forEach((btn) => {
  btn.addEventListener('click' ,removeClicked)
});

function removeClicked(e) {
  let = targetBox = e.currentTarget.parentElement.parentElement;
  // hide the target from the page
  targetBox.style.display = "none";
  let waitAlert = setTimeout((targetBox) => { // remove the target when time is out
    alert.remove();
    removeTarget(targetBox);
    window.location.reload();
  }, 5000, targetBox);
  // show alert and undo button
  let alert = showAlert(targetBox ,waitAlert);
}

function showAlert(targetBox ,waitAlert) {
  // create alert message
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
    alert.remove();
    targetBox.style.display = "block";
    clearTimeout(waitAlert);
  });
  return alert;
}

function removeTarget(targetBox) {
  delete targets[parseInt(targetBox.dataset.id)];
  targetBox.remove();
  localStorage.setItem("targets" ,JSON.stringify(targets));
}
