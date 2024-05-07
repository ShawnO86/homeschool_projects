/* TO DO:
Mess around with building 2+ digit problems using HTML forms,
Find way to validate each part (ones, tens, carry overs, etc..)

*/

/* <form class="multiply">
    <input type="text" class="carry">
        <div class="defProblem">
            <p><br>x</p>
            <p>48 <br> 15</p>
        </div>
    <input type="text" class="ones solution">
    <input type="text" class="tens solution">
</form> */

function createProblem() {
    //Math.random 0 inclusive to 1 exclusive runs first then regular order of operations on math then takes the floor of the result.
    const num1 = Math.floor(Math.random() * 90 + 10);
    const num2 = Math.floor(Math.random() * 90 + 10);
    //multiplies num1 by ones digit of num2
    const onesAnswer = num1 * (num2 % 10);
    //calculates carry over value for onesAnswer by multiplying ones digit in each num. then, if there is a value with a tens digit, that is the carry value, otherwise its 0.
    const onesCarry = Math.floor((((num1 % 10) * (num2 % 10)) / 10) % 10);
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

function validateProblems() {
    const problemSection = document.getElementById("problems");

}


writeProblemArr(createProblemArr());

const num1 = Math.floor(Math.random() * 90 + 10);
const num2 = Math.floor(Math.random() * 90 + 10);
const onesAnswer = num1 * (num2 % 10);
const onesCarry = Math.floor((((num1 % 10) * (num2 % 10)) / 10) % 10);

console.log(num1, num2, onesCarry)
