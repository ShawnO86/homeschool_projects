const main = document.querySelector('main');

function createRow(){
    for (let i = 1; i <= 10; i++){
        const newDiv = document.createElement('div');
        newDiv.classList.add('col_'+i);
        main.appendChild(newDiv);
    };
};

function populateRow(){
    for (let i = 1; i <= 10; i++){
        let col = document.querySelector('.col_' + i);
        for (let j = 1; j <= 10; j++){
            const newDiv = document.createElement('div');
            col.appendChild(newDiv);
            newDiv.innerHTML = i * j;
            newDiv.classList.add('row_' + j);
        };
    };
};

createRow();
populateRow();