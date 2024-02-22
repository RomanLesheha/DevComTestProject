var isRemovingMode;

function toggleRemovalMode() {
    var removalButton = document.getElementById('removalButton');
    if (!isRemovingMode) {
        isRemovingMode = true;
        removalButton.textContent = 'Завершити видалення';
    } else {
        isRemovingMode = false;
        removalButton.textContent = 'Видалити комірки';

    }
}

var isMouseDown = false;

function initialize() {
    document.addEventListener('mousedown', function () {
        isMouseDown = true;
    });

    document.addEventListener('mouseup', function () {
        isMouseDown = false;
    });
}

function removeCell(cell, x, y) {

    if (isRemovingMode) {
        cell.classList.add("hidden");
    }

}

function handleCellHover(cell, x, y) {
    if (isMouseDown) {
        removeCell(cell, x, y);
    }
}

function saveCells() {
    var paper = {
        RemovedCells: [],
        RemainingCells: [],
        Rows: document.getElementById('paper').dataset.rows,
        Columns: document.getElementById('paper').dataset.columns,
    };

    var allCells = document.querySelectorAll('.cell');
    allCells.forEach(function (cell) {
        var x = cell.getAttribute('data-x');
        var y = cell.getAttribute('data-y');
        if (cell.classList.contains('hidden')) {
            paper.RemovedCells.push({ X: x, Y: y });
        } else {
            paper.RemainingCells.push({ X: x, Y: y });
        }
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/Paper/SaveCells",
        data: JSON.stringify(paper),
        success: function (data) {
            updateCellColors(data);
            var count = document.getElementById('count');
            count.innerHTML = data.length;
            
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            alert("Помилка при завантаженні даних. " + errorMessage);
        }
    });
}

function updateCellColors(areas) {
    var colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    var colorIndex = 0;
    areas.forEach(function (area) {
        var color = colors[colorIndex];
        area.forEach(function (cell) {
            var cellElement = $(`.cell[data-x='${cell.x}'][data-y='${cell.y}']`);
            cellElement.css('background-color', color);
        });
        colorIndex = (colorIndex + 1) % colors.length;
    });
}

function changePaperSize() {
    var newRows = prompt("Введіть кількість рядків:", "25");
    var newColumns = prompt("Введіть кількість стовпців:", "25");

    newRows = Math.max(20, Math.min(newRows, 60));
    newColumns = Math.max(20, Math.min(newColumns, 60));
    // Перевірка на введення користувачем
    if (newRows !== null && newColumns !== null && !isNaN(newRows) && !isNaN(newColumns)) {

        // Оновлення атрибутів блоку paper
        var paper = document.getElementById("paper");
        paper.setAttribute("data-rows", newRows);
        paper.setAttribute("data-columns", newColumns);
        // Перерахунок розмірів блоку
        paper.style.width = (newColumns * 20) + "px";
        paper.style.height = (newRows * 20) + "px";
        // Очищення блоку від старих комірок
        paper.innerHTML = "";
        // Генерація нових комірок
        for (var y = 0; y < newRows; y++) {
            for (var x = 0; x < newColumns; x++) {
                var cell = document.createElement("div");
                var cellClass = "cell";
                cell.className = cellClass;
                cell.setAttribute("data-x", x);
                cell.setAttribute("data-y", y);
                cell.style.width = (100 / newColumns) + "%";
                cell.style.height = (100 / newRows) + "%";
                cell.onclick = function () {
                    removeCell(this, x, y);
                };
                cell.onmouseover = function () {
                    handleCellHover(this, x, y);
                };
                paper.appendChild(cell);
            }
        }
    } else {
        alert("Будь ласка, введіть числові значення.");
    }
}
