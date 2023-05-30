const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input input");
const todoList = document.querySelector(".todo-list ul");
const itemsLeft = document.querySelector(".items-left span");
const filterBtn = document.querySelectorAll(".filter-group button");

let todoArray = [
  { id: 123, todo: "first", completed: true },
  { id: 456, todo: "second", completed: false },
  { id: 789, todo: "third", completed: false },
];

createTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todoArray.push({
    id: Math.floor(Math.random() * 100000000),
    todo: todoInput.value,
    completed: false,
  });
  todoInput.value = "";
  console.log(todoArray);
  createTodoList();
});

function createHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function createTodoList(filter) {
  todoList.innerHTML = "";
  let innerTodoArr = todoArray;
  // filterBtn[0].classList.add("active")
  if (filter === "active") {
    innerTodoArr = todoArray.filter((todo) => !todo.completed);
  } else if (filter === "completed") {
    innerTodoArr = todoArray.filter((todo) => todo.completed);
  }
  console.log(innerTodoArr);
  innerTodoArr.forEach((todo) => {
    todoList.appendChild(
      createHTML(
        `<li>
          <label>
            <input type="checkbox" data-id="${todo.id}" ${
          todo.completed ? "checked" : ""
        }>
            <span>${todo.todo}</span>
          </label>
          <button onclick="removeTodo(${todo.id})">
            <svg class="icon">
              <use xlink:href="#icon-cross"></use>
            </svg>
          </button>
      </li>`
      )
    );
  });
  addListener();

  itemsLeft.textContent = todoArray.length;
}

function clearCompleted() {
  todoArray = todoArray.filter((todo) => !todo.completed);
  createTodoList();
}

function addListener() {
  const todoCheckbox = document.querySelectorAll(
    '.todo-list ul li input[type="checkbox"]'
  );
  todoCheckbox.forEach((el) => {
    el.addEventListener("input", (e) => {
      todoArray.forEach((todo) => {
        if (Number(e.target.getAttribute("data-id")) === todo.id) {
          todo.completed = !todo.completed;
        }
      });
      console.log(todoArray);
    });
  });
}

function removeTodo(id) {
  todoArray = todoArray.filter((todo) => !(todo.id === id));
  createTodoList();
}

// theme switcher

const themeSwitch = document.querySelector(".navbar button");
const body = document.body;

const darkColor = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (localStorage.getItem("theme") === null)
  localStorage.setItem("theme", darkColor ? "dark" : "light");

const theme = localStorage.getItem("theme");
body.classList.add(theme);

switch (theme) {
  case "dark":
    themeSwitch.innerHTML =
      '<svg class="icon"><use xlink:href="#icon-sun"></use></svg>';
    break;
  case "light":
    themeSwitch.innerHTML =
      '<svg class="icon"><use xlink:href="#icon-moon"></use></svg>';
    break;
}

themeSwitch.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "light");
    body.classList.replace("dark", "light");
    themeSwitch.innerHTML =
      '<svg class="icon"><use xlink:href="#icon-moon"></use></svg>';
  } else {
    localStorage.setItem("theme", "dark");
    body.classList.replace("light", "dark");
    themeSwitch.innerHTML =
      '<svg class="icon"><use xlink:href="#icon-sun"></use></svg>';
  }
});

filterBtn.forEach((el) => {
  el.addEventListener("click", () => {
    filterBtn.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
  });
});
