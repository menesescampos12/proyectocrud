const createTask = (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const task = {
    title,
    description,
  };

  if (localStorage.getItem("todoList") === null) {
    //Crear una nueva lista de elementos de
    let todoList = [];

    //Añadir objeto que vendría siendo mi tarea por realizar, y la voy a mandar al array que se llama todoList
    todoList.push(task);

    //Guardar la lista en el localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    //Obtener la lista de elementos
    let todoList = JSON.parse(localStorage.getItem("todoList"));

    //Añadir el nuevo elemento a la lista
    todoList.push(task);

    //Volveremos a guardar la lista en el localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  //Aquí pondremos nuestro formulario en blanco
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  /* Que cuando se cree una tarea, se renderice mi elemento */
  renderTodoList();
};

const renderTodoList = () => {
  const todoList = JSON.parse(localStorage.getItem("todoList"));
  const todoListContenedor = document.getElementById("tasks");

  /* Por cada elemento de mi array todoList voy a pintar o renderizar filas */
  todoListContenedor.innerHTML = "";
  todoList.forEach((task) => {
    const title = task.title;
    const description = task.description;

    todoListContenedor.innerHTML += `
    <tr>
        <td>${title}</td>
        <td>${description}</td>
        <td>
        <button class="button is-warning is-small" onclick="updateTask('${title}')">Actualizar</button>
        <button class="button is-danger is-small" onclick="deleteTask('${title}')">Eliminar</button>
        </td>
    </tr>
    `;
  });
};

renderTodoList();

const deleteTask = (title) => {
  /* Vamos a traer la lista de elementos desde nuestro navegador */
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList = todoList.filter((task) => task.title !== title);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
};

const updateTask = (title) => {
  /* Vamos a traer la lista de elementos desde nuestro navegador */
  let todoList = JSON.parse(localStorage.getItem("todoList"));

  //Buscar la tarea
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].title === title) {
      /* Actualizar la tarea con los nuevos valores */
      todoList[i].title = document.getElementById("title").value;
      todoList[i].description = document.getElementById("description").value;
      break;
    }
  }

  /* Campos del formulario que queden vacios */
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  //Actualizamos nuestro lS con la lista actualizada
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
};
