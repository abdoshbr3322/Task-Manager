class Dashboard {
  #targetsStorage;
  constructor(dashboard ,openers ,closer ,cancel) {
    this.#targetsStorage = JSON.parse(localStorage.getItem("targets")) || {};
    this.dashboard = dashboard;
    this.openers = openers;
    this.closer = closer;
    this.cancel = cancel;
    this.form = this.dashboard.querySelector("form"),
    this.titleField = this.dashboard.querySelector("form .input#title"),
    this.progressField = this.dashboard.querySelector("form .input#progress"),
    this.infoField = this.dashboard.querySelector("form textarea#info"),
    this.checkboxs = Array.from(this.dashboard.querySelectorAll("form input[type='checkbox']")),
    this.category = this.dashboard.querySelector("form select");
  }
  init() {
    // show dashboard on click on opener
    this.openers.forEach((o) => o.addEventListener("click" ,(e) => this.showDashboard(e)));
    // hide dashboar when click on X , Cancel and anywhere outside the dashboard
    this.closer.addEventListener("click" ,() => this.hideDashboard());
    this.cancel.addEventListener("click" ,() => this.hideDashboard());
    this.dashboard.addEventListener("click" ,(e) => {
      if (e.target === this.dashboard) this.hideDashboard();
    });
    this.form.addEventListener("submit" ,(e) => this.formSubmitted(e));
  }
  showDashboard() {
    this.dashboard.classList.add("active");
  }
  hideDashboard() {
    this.dashboard.classList.remove("active");
  }
  get targets() {
    return this.#targetsStorage;
  }
  formSubmitted(e) {
    let task = {
      title: this.titleField.value,
      progress: this.progressField.value,
      info: this.infoField.value,
      category: this.category.value,
    };
    this.checkboxs.forEach((box) => {
      task[box.id] = box.checked;
    });
    let id = this.getId();
    this.targets[id] = task;
    localStorage.setItem("targets" ,JSON.stringify(this.targets));
  }
  getId() {
    return Date.now();
  }
}
let addDashboard = new Dashboard(
  document.querySelector(".add-dashboard"),
  document.querySelectorAll(".add-task button"),
  document.querySelector(".add-dashboard .dash-closer"),
  document.querySelector(".add-dashboard form input[type='reset']")
);
addDashboard.init();

class Edit extends Dashboard {
  constructor(dashboard ,openers ,closer ,cancel) {
    super(dashboard ,openers ,closer ,cancel);
  }
  showDashboard(e) {
    this.targetBox = e.currentTarget.parentElement.parentElement;
    let target = this.targets[this.getId()];
    this.titleField.value = target.title;
    this.progressField.value = target.progress;
    this.infoField.value = target.info;
    this.checkboxs.forEach((box) => {
      box.checked = target[box.id];
    });
    this.category.querySelectorAll("option").forEach((option) => {
      if (option.value === target.category) option.selected = true;
    });
    this.dashboard.classList.add("active");
  }
  getId() {
    return this.targetBox.dataset.id;
  }
}

let waitTargets = setTimeout(function () {
  let editDashboard = new Edit(
    document.querySelector(".edit-dashboard"),
    document.querySelectorAll(".target button.setting"),
    document.querySelector(".edit-dashboard .dash-closer"),
    document.querySelector(".edit-dashboard form input[type='reset']")
  );
  editDashboard.init();
} ,5)
