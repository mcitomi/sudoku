let gameValues = [];
let isCorrect = true;

document.getElementById("gamebar").innerHTML = genTable();

function genTable() {
    let table = "<table class='table table-responsive'>";
    for (let i = 0; i < 9; i++) {

        let rowValues = [];
        table += "<tr>";

        for (let j = 0; j < 9; j++) {
            let style = "";

            if (j == 8) {
                style += "border-right: solid black 3px;";
            }
            if (j % 3 == 0) {
                style += "border-left: solid black 3px;";
            }
            if (i % 3 == 0) {
                style += "border-top: solid black 3px;";
            }
            if (i == 8) {
                style += "border-bottom: solid black 3px";
            }

            table += `<td oncontextmenu="adjust_(event, this)" onclick="adjust(this)" style="${style}" id="${i}${j}"></td>`;

            rowValues.push(undefined);
        }

        gameValues.push(rowValues);
        table += "</tr>";
    }

    return (table += "</table>");
}

function adjust(p) {
    p.innerText = (gameValues[p.id[0]][p.id[1]] = p.innerText == "9" ? 1 : Number(p.innerText) + 1);
    if (gameValues.every(function (arr) { return arr.every(x => x != undefined) })) { 
        document.getElementById("checkbtn").hidden = false 
    };
}

function adjust_(event, p) {
    event.preventDefault();
    p.innerText = (gameValues[p.id[0]][p.id[1]] = (p.innerText == "1" || p.innerText == "") ? 9 : Number(p.innerText) - 1);
    if (gameValues.every(function (arr) { return arr.every(x => x != undefined) })) { 
        document.getElementById("checkbtn").hidden = false 
    };
}

function checkProcess() {
    isCorrect = true;
    colorize("black");
    clear();

    checkChunk();
    checkRow();
    checkCol();

    if (isCorrect) {
        colorize("#00FF00");
    }
}

function checkChunk() {
    const rows = document.getElementsByTagName('tr');

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            const thisChunk = [];

            for (let h = 0; h < 3; h++) {
                for (let k = 0; k < 3; k++) {
                    if (thisChunk.includes(rows[i * 3 + h].childNodes[j * 3 + k].textContent)) {
                        errorChunk(i, j);
                        break;
                    } else {
                        thisChunk.push(rows[i * 3 + h].childNodes[j * 3 + k].textContent);
                    }
                }
            }
        }
    }
}

function errorChunk(i, j) {
    isCorrect = false;
    const rows = document.getElementsByTagName('tr');

    for (let h = 0; h < 3; h++) {
        for (let k = 0; k < 3; k++) {
            rows[i * 3 + h].childNodes[j * 3 + k].style.background = "red";
        }
    }
}

function checkRow() {
    const rows = document.getElementsByTagName('tr');
    for (let i = 0; i < 9; i++) {

        let thisRow = [];

        for (let j = 0; j < 9; j++) {
            if (thisRow.includes(rows[i].childNodes[j].textContent)) {
                errorRow(i);
                break;
            } else {
                thisRow.push(rows[i].childNodes[j].textContent);
            }
        }
    }
}

function errorRow(i) {
    isCorrect = false;
    const rows = document.getElementsByTagName('tr');
    rows[i].childNodes.forEach(element => {
        element.style.background = "red";
    });
}

function checkCol() {
    const rows = document.getElementsByTagName('tr');
    for (let i = 0; i < 9; i++) {

        let thisCol = [];

        for (let j = 0; j < 9; j++) {
            if (thisCol.includes(rows[j].childNodes[i].textContent)) {
                errorCol(i);
                break;
            } else {
                thisCol.push(rows[j].childNodes[i].textContent);
            }
        }
    }
}

function errorCol(j) {
    isCorrect = false;
    const rows = document.getElementsByTagName('tr');

    for (let i = 0; i < 9; i++) {
        rows[i].childNodes[j].style.background = "red";
    }
}

function clear() {
    [...document.getElementsByTagName("td")].forEach(element => {
        element.style.background = "white";
    });
}

function loadExample() {
    const rows = document.getElementsByTagName('tr');
    const example = [
        [8, 2, 7, 1, 5, 4, 3, 9, 6],
        [9, 6, 5, 3, 2, 7, 1, 4, 8],
        [3, 4, 1, 6, 8, 9, 7, 5, 2],
        [5, 9, 3, 4, 6, 8, 2, 7, 1],
        [4, 7, 2, 5, 1, 3, 6, 8, 9],
        [6, 1, 8, 9, 7, 2, 4, 3, 5],
        [7, 8, 6, 2, 3, 5, 9, 1, 4],
        [1, 5, 4, 7, 9, 6, 8, 2, 3],
        [2, 3, 9, 8, 4, 1, 5, 6, 7]
    ];

    clear();

    gameValues = example;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            rows[i].childNodes[j].textContent = example[i][j];
        }
    }

    document.getElementById("checkbtn").hidden = false;
}

function colorize(colur) {
    [...document.getElementsByTagName("td")].forEach(element => {
        element.style.color = colur;
    });
}
