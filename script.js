/************ Theme switcher ************/
const themeSwitch = document.querySelector(".navbar button");
const body = document.body;

const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", darkTheme ? "dark" : "light");
}

const theme = localStorage.getItem("theme");
body.classList.add(theme);

const iconSun = '<svg class="icon"><use xlink:href="#icon-sun"></use></svg>';
const iconMoon = '<svg class="icon"><use xlink:href="#icon-moon"></use></svg>';

switch (theme) {
  case "dark":
    themeSwitch.innerHTML = iconSun;
    break;
  case "light":
    themeSwitch.innerHTML = iconMoon;
    break;
}

themeSwitch.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "light");
    body.classList.replace("dark", "light");
    themeSwitch.innerHTML = iconMoon;
  } else {
    localStorage.setItem("theme", "dark");
    body.classList.replace("light", "dark");
    themeSwitch.innerHTML = iconSun;
  }
});

/************ Todo List ************/

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input input");
const todoList = document.querySelector("#todo-list");
const itemsLeft = document.querySelector(".items-left span");
const filterBtn = document.querySelectorAll(".filter-group button");

if (localStorage.getItem("todo-list") === null) {
  localStorage.setItem("todo-list", JSON.stringify([]));
}
let todoArray = JSON.parse(localStorage.getItem("todo-list"));

createTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todoArray.push({
    id: Math.floor(Math.random() * 10000000000),
    todo: todoInput.value,
    completed: false,
  });
  todoInput.value = "";
  setTodoList();
  createTodoList();
});

filterBtn.forEach((el) => {
  el.addEventListener("click", () => {
    filterBtn.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
  });
});

// Functions

function createTodoList(filter) {
  todoList.innerHTML = "";

  let filteredTodoList;
  switch (filter) {
    case "active":
      filteredTodoList = todoArray.filter((todo) => !todo.completed);
      break;
    case "completed":
      filteredTodoList = todoArray.filter((todo) => todo.completed);
      break;
    default:
      filteredTodoList = todoArray;
      break;
  }

  filteredTodoList.forEach((todo) => {
    todoList.appendChild(
      createHTML(`
      <li>
        <label>
          <input type="checkbox" data-id="${todo.id}" ${todo.completed && "checked"}>
          <span>${todo.todo}</span>
        </label>
        <button onclick="removeTodo(${todo.id})">
          <svg class="icon">
            <use xlink:href="#icon-cross"></use>
          </svg>
        </button>
      </li>`)
    );
  });
  addTodoItemListener();
  setItemsLeft();
}

function addTodoItemListener() {
  const todoCheckbox = document.querySelectorAll("input[type='checkbox']");
  todoCheckbox.forEach((el) => {
    el.addEventListener("input", (e) => {
      todoArray.forEach((todo) => {
        if (Number(e.target.getAttribute("data-id")) === todo.id) {
          todo.completed = !todo.completed;
        }
      });
      setItemsLeft();
      setTodoList();
    });
  });
}

function removeTodo(id) {
  todoArray = todoArray.filter((todo) => !(todo.id === id));
  setTodoList();
  createTodoList();
}

function clearCompleted() {
  todoArray = todoArray.filter((todo) => !todo.completed);
  setTodoList();
  createTodoList();
}

function createHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function setItemsLeft() {
  itemsLeft.textContent = todoArray.reduce((previous, current) => {
    return !current.completed ? previous + 1 : previous;
  }, 0);
}

function setTodoList() {
  localStorage.setItem("todo-list", JSON.stringify(todoArray));
}

// Initialize Sortable
var sortable = new Sortable(todoList, {
  onEnd: (e) => {
    const fromIndex = e.oldIndex;
    const toIndex = e.newIndex;
    const element = todoArray.splice(fromIndex, 1)[0];
    todoArray.splice(toIndex, 0, element);
    setTodoList();
  },
});
