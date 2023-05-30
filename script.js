const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input input");
const todoList = document.querySelector(".todo-list ul");

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

function createTodoList() {
  todoList.innerHTML = "";
  todoArray.forEach((todo) => {
    todoList.appendChild(
      createHTML(
        `<li>
          <label>
            <input type="checkbox" data-id="${todo.id}" ${
          todo.completed ? "checked" : ""
        }>
            <span>${todo.todo}</span>
          </label>
          <button>
            <svg class="icon">
              <use xlink:href="#icon-cross"></use>
            </svg>
          </button>
      </li>`
      )
    );
  });
  addListener();
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

// todoList.appendChild(createHTML(todoHTML));

// todoInput.addEventListener("input", (e) => {
//   todo = e.target.value;
// });
