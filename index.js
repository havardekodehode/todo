import {
    todolist,
    updateLocalStorage,
    addTodo,
    removeTodo,
    addSVG,
    getSVGDoc,
} from "./data.js";
const todolistEl = document.querySelector(".todos");
const inputField = document.getElementById("todoInput");
const inputBtn = document.getElementById("addTodo");

todolistEl.parentElement;

inputBtn.addEventListener("click", function () {
    if (inputField.value.length < 3) {
        alert("Need more than 3 characters");
        return;
    }

    addTodo(inputField.value);

    let animate = true;

    renderPendingTodos(animate);
    inputField.value = "";

    setTimeout(() => {}, 1000);
    animate = false;

    updateLocalStorage();
});

function renderPendingTodos(animate) {
    todolistEl.innerHTML = "";
    // todolist.forEach(createTodoHtml);
    todolist.forEach((todo, i) => {
        // console.log(i);
        if (i === todolist.length - 1 && animate) {
            createTodoHtml(todo, true);
        } else {
            createTodoHtml(todo);
        }
    });
}

function createTodoHtml(todoOb, animate) {
    const todo = document.createElement("div");
    todo.classList = "todo";
    todo.id = todoOb.id;

    const textBox = document.createElement("div");
    textBox.classList = "textbox";
    const todoText = document.createElement("p");
    todoText.textContent = todoOb.name;
    // todoText.id = todoOb.id;
    todoText.style.textAlign = "center";

    // const spanEl = document.createElement("span");
    // spanEl.textContent = timeStamp2DateTime(todoOb.id);

    // const removeButton = document.createElement("button");
    // removeButton.textContent = "Remove";

    // todo.addEventListener("click", () => {
    //     console.log("removelistener added");

    //     todo.remove();
    //     removeTodo(todo);
    // });

    textBox.append(todoText);
    todo.append(textBox); //spanEl removeButton
    todolistEl.prepend(todo);

    addSVG(false, todo, "images/checkbox.svg", "checkbox", animate, todoOb);
    addSVG(true, textBox, "images/underlines.svg", "lines", animate);

    updateLocalStorage();
}

function render() {
    addSVG(
        false,
        document.querySelector(".hero"),
        "images/todos4.svg",
        "heroText"
    );

    renderPendingTodos();
}

function timeStamp2DateTime(timeStamp) {
    let dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    let dateFormat = new Intl.DateTimeFormat("no-NO", dateOptions);
    let viewFormattedDate = dateFormat.format(timeStamp);

    return viewFormattedDate;
}

render();

// console.log(document.getElementById("checkbox1"));

// window.onload(document.querySelector(".todoInput").focus());
