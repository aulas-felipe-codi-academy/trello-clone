// Adicionar o campo "isCompleted" no objeto de tarefa
// Possibilidade de adicionar mais colunas

// Drag and drop
// click no container (ignoras os clicks nas tasks)
// Salvar no local storage
// Pegar dados do local storage

function addTask(columnId) {
    const taskName = prompt("Enter task name");

    if (taskName && taskName != "") {
        const task = document.createElement("div");
        task.classList.add("task");

        const lblTaskName = document.createElement("p");
        lblTaskName.textContent = taskName;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.onclick = function () {
            alert("Delete task");
        };

        task.appendChild(lblTaskName);
        task.appendChild(btnDelete);

        const tasksList = document.querySelector(`#${columnId} .tasks`);
        tasksList.appendChild(task);
    }
}
