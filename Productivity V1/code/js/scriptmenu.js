document.addEventListener("DOMContentLoaded", function() {
    // Text und ID der ausgewählten Aufgabe aus dem localStorage laden
    const selectedText = localStorage.getItem("selectedText");
    const selectedTaskId = localStorage.getItem("taskId");
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("add-task-button");
    const taskInput = document.getElementById("taskInput");
    let isInputVisible = false;

    // Wenn kein selectedText vorhanden ist, zurück zur ersten Seite
    if (!selectedText || !selectedTaskId) {
        alert("Keine Aufgabe ausgewählt! Du wirst zurück zur Hauptseite weitergeleitet.");
        window.location.href = "index.html"; // Weiterleitung zur ersten Seite
        return; // Verhindert weitere Ausführung des Codes
    }

    // Text für ausgewählte Aufgabe setzen
    document.getElementById("selectedText").innerText = selectedText;
    loadTasks(selectedTaskId);  // Laden der Aufgaben auf Basis der ID der ausgewählten Aufgabe

    // Aufgabe hinzufügen
    function addTask(taskText, isCompleted = false) {
        if (!taskText) return;

        // Generiere eine eindeutige ID für die Unteraufgabe
        const taskId = Date.now();

        const li = document.createElement("li");
        li.classList.add("task-item");
        li.setAttribute("data-id", taskId);  // Setze die ID der Unteraufgabe
        if (isCompleted) li.classList.add("checked");

        const span = document.createElement("span");
        span.innerText = taskText;

        const removeSpan = document.createElement("span");
        removeSpan.innerHTML = "\u00d7";
        removeSpan.classList.add("removeSpan");

        li.appendChild(span);
        li.appendChild(removeSpan);
        taskList.appendChild(li);

        saveTasks(selectedTaskId);  // Speichern der Aufgaben
        taskInput.value = "";
        taskInput.classList.add("hidden");
        isInputVisible = false;
    }

    // Aufgaben speichern
    function saveTasks(taskId) {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(task => {
            tasks.push({
                id: task.getAttribute("data-id"),  // Speichern der ID
                text: task.querySelector("span").innerText,
                completed: task.classList.contains("checked")
            });
        });
        localStorage.setItem(`tasks_${taskId}`, JSON.stringify(tasks));  // Aufgaben mit ID speichern
    }

    // Aufgaben laden
    function loadTasks(taskId) {
        const savedTasks = JSON.parse(localStorage.getItem(`tasks_${taskId}`)) || [];
        savedTasks.forEach(task => addTask(task.text, task.completed));
    }

    // Event-Listener für den "Add Task"-Button
    addTaskBtn.addEventListener("click", function() {
        const trimmedValue = taskInput.value.trim();
        addTask(trimmedValue);
    });

    // Event-Listener für Enter-Taste
    taskInput.addEventListener("keydown", function(event) {
        const trimmedValue = taskInput.value.trim();
        if (event.key === "Enter") {
            addTask(trimmedValue);
        }
    });

    // Event-Delegation: Klick-Events für Listenelemente und Remove-Span
    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("removeSpan")) {
            const taskId = e.target.parentElement.getAttribute("data-id");

            // Entfernen der Unteraufgabe
            e.target.parentElement.remove();
            saveTasks(selectedTaskId);

            // Entfernen der Unteraufgabe von der ersten Seite, falls notwendig
            removeSubtaskFromIndexPage(taskId);
        } else if (e.target.tagName === "LI" || e.target.tagName === "SPAN") {
            const listItem = e.target.closest("li");
            listItem.classList.toggle("checked");
            saveTasks(selectedTaskId);
        }
    });

    // Entferne die Unteraufgabe von der ersten Seite (index.html)
    function removeSubtaskFromIndexPage(taskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskToRemove = tasks.find(task => task.id == taskId);
        if (taskToRemove) {
            const taskElements = document.querySelectorAll(`[data-id="${taskId}"]`);
            taskElements.forEach(taskElement => taskElement.remove());
        }
    }
});

document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "index.html"; // Weiterleitung zur index.html
});