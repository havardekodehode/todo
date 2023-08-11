import { todolist, updateLocalStorage, addTodo, addSVG } from "./data.js";

const todolistEl = document.querySelector(".todos");
const inputField = document.getElementById("todoInput");
const inputBtn = document.getElementById("addTodo");

inputBtn.addEventListener("click", function () {
    if (inputField.value.length < 3) {
        alert("Need more than 3 characters");
        return;
    }
    addTodo(inputField.value);
    renderPendingTodos(true);
    inputField.value = "";
    updateLocalStorage();
});

function renderPendingTodos(animate) {
    todolistEl.innerHTML = "";
    todolist.forEach((todo, i) => {
        if (i === todolist.length - 1 && animate) {
            createTodoHtml(todo, true);
        } else {
            createTodoHtml(todo);
        }
    });
}

function createTodoHtml(todoOb, animate) {
    const todo = createElement("div", {
        class: "todo",
        id: `${todoOb.id}`,
    });
    const textBox = createElement("div", {
        class: "textbox",
    });
    const todoText = createElement(
        "p",
        {
            class: todoOb.name,
        },
        {
            textAlign: "center",
        },
        todoOb.name
    );
    textBox.append(todoText);
    todo.append(textBox);
    todolistEl.prepend(todo);

    addSVG(false, todo, "images/checkbox.svg", "checkbox", animate, todoOb);
    addSVG(true, textBox, "images/underlines.svg", "lines", animate);

    updateLocalStorage();
}

const createElement = (type, attributes, styles, textContent) => {
    const el = document.createElement(type);
    Object.assign(el.style, styles);
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    el.textContent = textContent;
    return el;
};
function render() {
    addSVG(
        false,
        document.querySelector(".hero"),
        "images/todos4.svg",
        "heroText"
    );

    renderPendingTodos();
}

render();
