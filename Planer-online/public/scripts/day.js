crossTask();
removeTask();

function showBlagdanForm() {

    let button = document.querySelector("#blagdan-butt");
    let forma = document.querySelector("#blagdan-form");

    button.classList.add("hidden");
    forma.classList.remove("hidden");
}
function showObvezaForm() {
    let button = document.querySelector("#obveza-butt");
    let forma = document.querySelector("#obveza-form");

    button.classList.add("hidden");
    forma.classList.remove("hidden");
}
function crossTask() {
    let taskText = document.querySelectorAll(".obveze .obaveza p");
    taskText.forEach(task => {
        task.addEventListener("click", e => {
            if (task.getAttribute("crossed") == "false") {
                task.classList.add("crossed");
                task.setAttribute("crossed", "true");
            } else {
                task.classList.remove("crossed");
                task.setAttribute("crossed", "false");
            }
        });
    });
}
function removeTask() {
    let buttons = document.querySelectorAll(".crossBtn"); //te klase nema u htmlu nigdje(valjda)
    buttons.forEach(button => {
        button.addEventListener("click", e => {
            //alert("")
        });

        /*button.addEventListener("click", e => {

            let parent = button.parentElement;
            let paragraph = parent.querySelector("p");
            paragraph.classList.add("crossed");
        });*/
    });
}