
function createProblem() {
    //generate two random numbers between 10 and 99
    const num1 = Math.floor(Math.random() * 90 + 10);
    const num2 = Math.floor(Math.random() * 90 + 10);

    //multiplies num1 by ones digit of num2
    const onesAnswer = num1 * (num2 % 10);
    //calculates carry over value -- (num1 % 10) * (num2 % 10) selects the ones place digits and multiplies them,
    //dividing that product by 10 moves decimal to the tens place, Math.floor() ensures it's an integer by removing everything after decimal.
    const onesCarry = Math.floor((((num1 % 10) * (num2 % 10)) / 10));

    //multiplies num1 by tens digit of num2 and mulitplies result by 10 
    const tensAnswer = (num1 * Math.floor(num2 / 10)) * 10;

    //sums onesAnswers and tensAnswers
    const finalAnswer = onesAnswer + tensAnswer;

    return [num1, num2, onesAnswer, tensAnswer, finalAnswer, onesCarry];
};

function createProblemArr() {
    let problems = [];
    for(let i = 0; i < 10; i++) {
        problems.push(createProblem());
    };
    return problems;
};

function writeProblemArr(problems) {
    const problemSection = document.getElementById("problems");
    const form = document.createElement("form");
    form.classList.add("multiply");
    problemSection.appendChild(form);
    let i = 1
    problems.forEach(problem => {
        const div = document.createElement("div");
        form.appendChild(div);
        div.innerHTML = `
        <label for="carry">carry</label>
        <input type="text" class="carry" placeholder=` + problem[5] + `>
            <div class="defProblem">
                <p><br>x</p>
                <p>`+ problem[0] +`<br>` + problem[1] + `</p>
            </div>
        <input type="text" class="ones solution" placeholder=`+ problem[2] +`>
        <input type="text" class="tens solution"placeholder=`+ problem[3] +`>
        <input type="text" class="final solution" placeholder=` + problem[4] + `>
        `;
        div.classList.add("problem", "p_"+i);
        i++
    });
};

/* TO DO:
Mess around with building 2+ digit problems using HTML forms,
Find way to validate each part (ones, tens, carry overs, etc..)
*/
function validateProblems() {
    const problemSection = document.getElementById("problems");

}


writeProblemArr(createProblemArr());
