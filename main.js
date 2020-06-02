console.log(window.Redux);

// use createStore

const { createStore } = window.Redux;

// action

const action = (value) => {
  return {
    type: "ADD_TODO",
    payload: value,
  };
};

// state

const initialState = JSON.parse(localStorage.getItem("todo_list")) || [];

// reducer

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodoList = [...state];
      newTodoList.push(action.payload);

      return newTodoList;
    }
    default:
      return state;
  }
};

// store

const store = createStore(todoReducer);

// render redux todo list

const renderTodoList = (todoList) => {
  if (!Array.isArray(todoList) || todoList.length === 0) {
    return;
  }

  const ulElement = document.querySelector("#todoListId");
  if (!ulElement) return;

  // remove previous content of ul
  ulElement.innerHTML = "";

  for (const todo of todoList) {
    const liElement = document.createElement("li");
    liElement.textContent = todo;

    ulElement.appendChild(liElement);
  }
};

// render initial todo list

const initialTodoList = store.getState();

console.log(initialTodoList);

renderTodoList(initialTodoList);

// handle submit form list

const todoFormElement = document.querySelector("#todoFormId");

if (todoFormElement) {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const todoTextElement = todoFormElement.querySelector("#todoTextId");
    if (!todoFormElement) return;

    store.dispatch(action(todoTextElement.value));

    // reset form
    todoFormElement.reset();
  };

  todoFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
  console.log(store.getState());
  const newTodoList = store.getState();
  renderTodoList(newTodoList);

  // save on local storage

  localStorage.setItem("todo_list", JSON.stringify(newTodoList));
});
