const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");

let todos = [];

/* ADD TODO */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = todoInput.value.trim();
    const date = dateInput.value;

    if (text === "" || date === "") {
        alert("Please fill in both fields!");
        return;
    }

    const todo = {
        id: Date.now(),
        text,
        date
    };

    todos.push(todo);
    displayTodos(todos);

    form.reset();
});

/* DISPLAY TODO */
function displayTodos(list) {
    todoList.innerHTML = "";

    list.forEach(todo => {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        li.innerHTML = `
            <div>
                <div class="todo-text">${todo.text}</div>
                <div class="date">${todo.date}</div>
            </div>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;

        todoList.appendChild(li);
    });
}

/* DELETE TODO */
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    displayTodos(todos);
}

/* FILTER */
filter.addEventListener("change", function () {
    const value = filter.value;
    const today = new Date().toISOString().split("T")[0];

    if (value === "all") {
        displayTodos(todos);
    } 
    else if (value === "upcoming") {
        displayTodos(todos.filter(t => t.date >= today));
    }
    else if (value === "past") {
        displayTodos(todos.filter(t => t.date < today));
    }
});
