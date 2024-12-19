// Zugriff auf Elemente
const InputBox = document.getElementById("input-box");
const ListContainer = document.getElementById("list-container");
const CheckedListContainer = document.getElementById("checked-list-container");
const toggleButton = document.getElementById("toggle-checked-list");
const dateElement = document.querySelector(".date");

// Funktion zum Hinzufügen einer neuen Aufgabe
function addtask() {
    let trimmedValue = InputBox.value.trim();

    if (trimmedValue === '') {
        InputBox.value = "";
    } else {
        // Generiere eine eindeutige ID für die Aufgabe
        const uniqueId = Date.now();

        let li = document.createElement("li");
        li.classList.add("item");
        li.setAttribute("data-id", uniqueId); // Füge eine eindeutige ID als data-id hinzu
        li.innerHTML = trimmedValue;

        let removeSpan = document.createElement("span");
        removeSpan.innerHTML = "\u00d7"; // Das Kreuzzeichen
        removeSpan.classList.add("removeSpan");
        li.appendChild(removeSpan);

        let settingsSpan = document.createElement("span");
        settingsSpan.innerHTML = "&#9965;"; // Einstellungsicon
        settingsSpan.classList.add("settingsSpan");
        li.appendChild(settingsSpan);

        ListContainer.appendChild(li);
    }
    InputBox.value = "";
    saveData();
}

// EventListener für die Enter-Taste
InputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addtask();
    }
});

// EventListener für das Klicken auf Listenelemente
document.addEventListener('click', function (e) {
    if (e.target.tagName === "LI" && e.target.classList.contains("item")) {
        const listItem = e.target;

        if (listItem.classList.contains("checked")) {
            listItem.classList.remove("checked");
            ListContainer.appendChild(listItem);
        } else {
            listItem.classList.add("checked");
            CheckedListContainer.appendChild(listItem);
        }
        saveData();
        updateCheckedListVisibility();

    } else if (e.target.classList.contains("removeSpan")) {
        const listItem = e.target.parentElement;
        const taskId = listItem.getAttribute("data-id");

        // Lösche die Aufgabe auf der ersten Seite
        listItem.remove();
        saveData();

        // Entferne die zugehörigen Unteraufgaben auf der zweiten Seite
        removeSubtasks(taskId);
        updateCheckedListVisibility();

    } else if (e.target.classList.contains("settingsSpan")) {
        const parentLi = e.target.closest("li");
        const taskText = parentLi.childNodes[0].textContent.trim();
        const taskId = parentLi.getAttribute("data-id");

        // Speichern der Aufgaben-ID und Text in localStorage
        localStorage.setItem("selectedText", taskText);
        localStorage.setItem("taskId", taskId);
        window.location.href = "menu.html";
    }
});

// Funktion zur Sichtbarkeitsprüfung der Completed-Liste und des Buttons
function updateCheckedListVisibility() {
    const checkedItems = CheckedListContainer.querySelectorAll(".checked");

    if (checkedItems.length > 0) {
        toggleButton.classList.remove("hidden");
        CheckedListContainer.classList.remove("hidden");
    } else {
        toggleButton.classList.add("hidden");
        CheckedListContainer.classList.add("hidden");
    }
}

// Event-Listener für den Button zum Ein-/Ausklappen der Liste
toggleButton.addEventListener("click", () => {
    CheckedListContainer.classList.toggle("collapsed");
    const isCollapsed = CheckedListContainer.classList.contains("collapsed");
    localStorage.setItem("checkedListCollapsed", isCollapsed);

    updateToggleButtonIcon(isCollapsed);
    updateCheckedListVisibility();
});

// Funktion zum Ändern des Icons des Buttons basierend auf dem Zustand der Liste
function updateToggleButtonIcon(isCollapsed) {
    if (isCollapsed) {
        toggleButton.style.setProperty("--toggle-icon", '"\\21B5"'); // nach unten
    } else {
        toggleButton.style.setProperty("--toggle-icon", '"\\21B4"'); // nach oben
    }
}

// Lädt die gespeicherten Aufgaben und stellt den Zustand wieder her
function loadtask() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.classList.add("item");
            li.textContent = task.content;

            if (task.checked) {
                li.classList.add("checked");
                CheckedListContainer.appendChild(li);
            } else {
                ListContainer.appendChild(li);
            }

            // Fügt das Remove- und Settings-Icon hinzu
            let removeSpan = document.createElement("span");
            removeSpan.innerHTML = "\u00d7";
            removeSpan.classList.add("removeSpan");
            li.appendChild(removeSpan);

            let settingsSpan = document.createElement("span");
            settingsSpan.innerHTML = "&#9965;";
            settingsSpan.classList.add("settingsSpan");
            li.appendChild(settingsSpan);
        });
    }

    updateCheckedListVisibility();
}

// Zustand der Liste nach dem Laden der Seite überprüfen
const isCollapsed = localStorage.getItem("checkedListCollapsed") === "true";
if (isCollapsed) {
    CheckedListContainer.classList.add("collapsed");
}
updateToggleButtonIcon(isCollapsed);
updateCheckedListVisibility();
loadtask();

// Zustand speichern
function saveData() {
    const tasks = [];

    ListContainer.querySelectorAll("li").forEach(li => {
        // Entfernt die Inhalte der <span>-Elemente
        const taskText = li.childNodes[0].textContent.trim();
        const taskId = li.getAttribute("data-id");  // Speichern der ID
        tasks.push({ content: taskText, checked: false, id: taskId });
    });

    CheckedListContainer.querySelectorAll("li").forEach(li => {
        const taskText = li.childNodes[0].textContent.trim();
        const taskId = li.getAttribute("data-id");  // Speichern der ID
        tasks.push({ content: taskText, checked: true, id: taskId });
    });

    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Fehler beim Speichern der Aufgaben:", error);
    }
}

// Entfernt die Unteraufgaben basierend auf der Hauptaufgaben-ID
function removeSubtasks(taskId) {
    const subtasks = JSON.parse(localStorage.getItem(`tasks_${taskId}`)) || [];
    subtasks.forEach(subtask => {
        const subtaskElements = document.querySelectorAll(`[data-id="${subtask.id}"]`);
        subtaskElements.forEach(subtaskElement => {
            subtaskElement.remove();
        });
    });
}

// Funktion zur Formatierung von Datum und Uhrzeit
function formatDate(date) {
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${DAYS[date.getDay()]}`;
}

// Datum und Uhrzeit regelmäßig aktualisieren
setInterval(() => {
    const now = new Date();
    dateElement.textContent = formatDate(now);
}, 200);