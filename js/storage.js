// get the targets from the localStorage if any
let targets = JSON.parse(localStorage.getItem("targets")) || null;

// show saved targets if any
if (targets) showData(targets);

function showData(targets) {
  for (let ID in targets) {
    let targetInfo = targets[ID];
    let targetBox = createBox(ID);
    let targetsBox = document.querySelector(`.targets.${targetInfo.category}`);
    let heading = targetsBox.dataset.heading;
    targetsBox.appendChild(targetBox);
    targetsBox.querySelector("h2.heading").textContent = heading;
    if (targetInfo.month) {
      let monthBox = document.querySelector(".targets.month")
      let heading = monthBox.dataset.heading;
      monthBox.appendChild(targetBox.cloneNode(true));
      monthBox.querySelector("h2.heading").textContent = heading;
    }
  }
}

// create function for creating boxs
function createBox(ID) {
  let targetInfo = targets[ID];
  let boxContent = [
    `<div class="target-head">`,
      `<h4 class="title">`,
        targetInfo.title,
      `</h4>`,
      `<button class="remove">`,
        `<i class="fas fa-xmark"></i>`,
      `</button>`,
    `</div>`,
    `<p class="info">`,
      targetInfo.info,
    `</p>`,
    `<div class="target-foot">`,
      `<div class="progress">`,
        `<div class="fill" data-progress="${targetInfo.progress}%" style="width: ${targetInfo.progress}%">`,
        `</div>`,
      `</div>`,
      `<button class="setting">`,
        `<i class="fa-sharp fa-solid fa-gear"></i>`,
      `</button>`,
    `</div>`,
  ].join("");
  let targetBox = document.createElement("div");
  targetBox.className = "target";
  targetBox.setAttribute("data-id" ,ID);
  targetBox.insertAdjacentHTML("afterbegin" ,boxContent);
  if (targetInfo.priority) {
    // create priority mark if the target has the priority
    let priorityMark =
      `<span class="priority" tooltip>
        <i class="fa-solid fa-check"></i>
        <span class="tooltip">Priority</span>
      </span>`;

    // insert the priority mark into the box
    targetBox.
    querySelector(".title").insertAdjacentHTML("beforeend" ,priorityMark);
  };
  return targetBox;
}
