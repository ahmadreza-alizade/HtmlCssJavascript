// selecting
let allTodos = [];
let filterValue = "all";
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const filterOpt = document.querySelector(".filter-todos");

// events
todoForm.addEventListener("submit", addNewTodo);
filterOpt.addEventListener("change", (event) => {
  filterValue = event.target.value;
  filterBy();
});

// functions
function addNewTodo(event) {
  event.preventDefault();
  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    createdAt: new Date().toISOString(),
    isCompleted: false,
  };

  allTodos.push(newTodo);
  // filterTodos(filterOpt);
  // showTodos(allTodos);
  filterBy();
}

function showTodos(todos) {
  let result = " ";
  todos.forEach((todo) => {
    result += `<li class="todo">
    <p class=" ${
      todo.isCompleted && "completed"
    } todo__title">${todo.title}</p>
    <span class="todo__createdAt">${new Date(
      todo.createdAt
    ).toLocaleDateString("fa-IR")}</span>
    <button class="todo__check" data-todo-id=${
      todo.id
    }><i class="far fa-check-square"></i></button>
    <button class="todo__remove" data-todo-id=${
      todo.id
    }><i class="far fa-trash-alt"></i></button>
  </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtns = [
    ...document.querySelectorAll(".todo__remove"),
  ];
  removeBtns.forEach((btn) =>
    btn.addEventListener("click", removeTodo)
  );

  const checkBtns = [
    ...document.querySelectorAll(".todo__check"),
  ];
  checkBtns.forEach((btn) =>
    btn.addEventListener("click", checkTodo)
  );
}

function checkTodo(event) {
  const checkId = Number(event.target.dataset.todoId);
  // allTodos = allTodos.filter((todo) =>
  const checkTodo = allTodos.find((todo) => {
    return todo.id === checkId;
  });
  // console.log(checkId, checkTodo);
  checkTodo.isCompleted = !checkTodo.isCompleted;
  // showTodos(allTodos);
  filterBy();
}

function filterBy(event) {
  // const filter = event.target.value;
  switch (filterValue) {
    case "all":
      showTodos(allTodos);
      break;
    case "completed": {
      const filteredTodos = allTodos.filter(
        (t) => t.isCompleted
      );
      showTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = allTodos.filter(
        (t) => !t.isCompleted
      );
      showTodos(filteredTodos);
      break;
    }
    default:
      showTodos(allTodos);
  }
}

function removeTodo(event) {
  const remodeId = Number(event.target.dataset.todoId);
  allTodos = allTodos.filter(
    (todo) => todo.id !== remodeId
  );
  filterBy();
  // showTodos(allTodos);
}
