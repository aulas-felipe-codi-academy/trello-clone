// Adicionar o campo "isCompleted" no objeto de tarefa
// Possibilidade de adicionar mais colunas

// Drag and drop
// click no container (ignorar os clicks nas tasks) (done)
// Salvar no local storage (done)
// Pegar dados do local storage (done)

let board = {};

function allowDrop(event) {
    event.preventDefault();
}

// Função de arrastar
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Função de soltar
function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains("tasks")) {
        let taskId = event.dataTransfer.getData("text");
        let task = document.getElementById(taskId);
        event.target.appendChild(task);
        saveTasks();
    }
}

function insertTask(taskId, taskName, columnId) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.id = taskId;
    task.draggable = true;
    task.ondragstart = drag;

    const lblTaskName = document.createElement("p");
    lblTaskName.textContent = taskName;

    const btnDelete = document.createElement("button");
    btnDelete.innerHTML =
        '<span class="material-symbols-outlined">delete</span>';
    btnDelete.classList.add("btn-delete-task");
    btnDelete.onclick = function () {
        document.getElementById(taskId).remove();
        saveTasks();
    };

    task.appendChild(lblTaskName);
    task.appendChild(btnDelete);

    const tasksList = document.querySelector(`#${columnId} .tasks`);
    tasksList.appendChild(task);
}

function addTask(event, columnId) {
    if (
        !event.target.classList.contains("task") &&
        !event.target.classList.contains("btn-delete-task")
    ) {
        const taskName = prompt(
            `Insira o nome da tarefa para adicionar na coluna \"${columnId}\"`
        );

        if (taskName && taskName != "") {
            const taskId = crypto.randomUUID();

            insertTask(taskId, taskName, columnId);

            saveTasks();
        }
    }
}

function saveTasks() {
    let boardData = {};

    const columns = document.querySelectorAll(".column");
    columns.forEach((column) => {
        const tasks = [];
        const tasksElements = column.querySelectorAll(".task");
        tasksElements.forEach((element) => {
            tasks.push({
                id: element.id,
                name: element.querySelector("p").textContent,
            });
        });
        boardData[column.id] = tasks;
    });

    localStorage.setItem("board", JSON.stringify(boardData));
}

function loadTasks() {
    const boardData = JSON.parse(localStorage.getItem("board"));
    if (!boardData) return;

    Object.keys(boardData).forEach((columnId) => {
        let tasks = boardData[columnId];
        tasks.forEach((task) => {
            insertTask(task.id, task.name, columnId);
        });
    });
}

loadTasks();
