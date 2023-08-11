// Local-storage
const localStorageKey = "todolist";
let todolist = JSON.parse(localStorage.getItem(localStorageKey)) || [];

function updateLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(todolist));
}

function addTodo(todoText) {
    const uniqueId =
        Math.floor(Date.now().toFixed()) + Math.floor(Math.random() * 5);
    todolist.push({
        name: todoText,
        id: uniqueId,
        hasAnimated: false,
    });

    document.querySelector(".todoInput").focus();
}

function removeTodo(todo) {
    todolist = todolist.filter((item) => item.id !== todo.id);
    document.querySelector(".todoInput").focus();
    updateLocalStorage();
}

// DOM manipulation
/**
 * @param {boolean} prependOrAppend - True for appending, false for prepending the element
 * @param {String} containerSelector - String with the selector, for the HTML container
 *                                      you want the SVG to be added to
 * @param {String} url - URL for the svg file
 * @param {string} types - Id attribute of the svg
 */
function addSVG(prependOrAppend, container, url, id, animate, todoOb) {
    getSVGDoc(url).then((doc) => {
        let svgEl = doc.querySelector("svg");
        svgEl.setAttribute("id", id);
        if (id === "checkbox") {
            svgEl.addEventListener("click", () => {
                svgEl
                    .querySelectorAll("rect")
                    .forEach((rect) => (rect.style.visibility = "visible"));

                svgEl.parentElement.classList.toggle("todoSlideOut");

                setTimeout(() => {
                    const todoRemove = document.querySelector(
                        `.todo[id="${todoOb.id}"]`
                    );
                    todoRemove
                        ? (todoRemove.remove(), removeTodo(todoOb))
                        : null;
                }, 1000);

                // document.querySelectorAll(".todo").forEach((todo) => {
                //     console.log(todo);
                //     console.log("           " + todoOb.id);
                //     if (todo.id === todoOb.id) {
                //         console.log(
                //             "Id of todo in html " +
                //                 todo.id +
                //                 ", id of localstorage.id " +
                //                 todoOb.id
                //         );
                //         todo.remove();
                //     }
                //     break
                // });

                // removeTodo(todoOb);

                // getSVGDoc("images/checkboxChecked.svg").then((doc) => {
                //     svgEl = doc.querySelector("svg");
                //     prependOrAppend
                //         ? container.append(svgEl)
                //         : container.prepend(svgEl);
                //     setTimeout(() => {}, 1000);
                //     document.getElementById("checkbox").remove();
                //     removeTodo(todoOb);
                //     return;
                // });
            });
        } else if (id === "checkbox" && animate) {
            const checkbox = doc.getElementById("checkbox");
            checkbox.classList.toggle("checkboxSlide");
        }

        if (id === "lines" && animate) {
            const linesSVG = doc.getElementById("lines");
            linesSVG.querySelectorAll("path").forEach((line, i) => {
                line.classList.toggle(`line${i + 1}Wobble`);
            });
        }

        prependOrAppend ? container.append(svgEl) : container.prepend(svgEl);
    });
}

/**
 * @param {string} url - URL for the svg file
 * @returns {SVGSVGElement} - Returns the SVG element, of the given file in the url
 */
function getSVGDoc(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.text())
            .then((str) =>
                resolve(
                    new window.DOMParser().parseFromString(str, "image/svg+xml")
                )
            )
            // .then((SVGDoc) => {
            //     const svgEl = SVGDoc.querySelector("svg");
            //     // console.log(svgEl.getAttributeNames());
            //     resolve(svgEl);
            // })
            .catch((error) => {
                reject(error);
            });
    });
}

export { todolist, updateLocalStorage, addTodo, removeTodo, addSVG, getSVGDoc };
