export function createTimesTable() {
    const tableSection = document.getElementById('timesTable');
    for (let i = 1; i <= 10; i++){
        const col = document.createElement('div');
        tableSection.appendChild(col);
        col.classList.add('col_'+i);
    
        for (let j = 1; j <= 10; j++){
            const newDiv = document.createElement('div');
            col.appendChild(newDiv);
            newDiv.classList.add('row_' + j);
            newDiv.classList.add('cell');
            newDiv.innerText = i * j;
        };
    };
    
    const cells = document.querySelectorAll('.cell');
    const formulaOut = document.getElementById('tableFormula');
    formulaOut.innerHTML = "<p>Click times table cell for more detail.</p>"
    cells.forEach((cell) => {
        cell.addEventListener('mousedown', (e) => {
            let row = e.target.classList[0];
            let col = e.target.parentElement.classList[0];
            formulaOut.innerHTML ="<p>" + row.slice(4) +" x "+ col.slice(4) +" = " + e.target.innerText + "</p>";
        });
    });
};
