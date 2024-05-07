
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
    const form = document.getElementById("multiply");
    let i = 0
    problems.forEach(problem => {
        const div = document.createElement("div");
        form.appendChild(div);
        div.innerHTML = `
        <label for="carry">carry</label>
        <input type="text" class="carry">
            <div class="defProblem">
                <p><br>x</p>
                <p>`+ problem[0] +`<br>` + problem[1] + `</p>
            </div>
        <input type="text" class="ones solution">
        <input type="text" class="tens solution">
        <input type="text" class="final solution">
        <button type="submit" class="submit_btn">Submit</button>
        `;
        div.classList.add("problem", "p_"+i);
        i++
    });
};


/* TO DO:
Mess around with building 2+ digit problems using HTML forms,
Find way to validate each part (ones, tens, carry overs, etc..)
*/
function validateProblem(problemAns, problemDiv) {
    //problem is an array of integers given by clicking submit and getting the target parent class to specify index of problems array,
    //problem array structure = [num1, num2, onesAns, tensAns, finalAns, carry]
    console.log("[num1, num2, onesAns, tensAns, finalAns, carry]", problemAns);

    const carryInput = problemDiv.querySelector('.carry').value;
    const onesInput = problemDiv.querySelector('.ones').value;
    const tensInput = problemDiv.querySelector('.tens').value;
    const finalInput = problemDiv.querySelector('.final').value;
    
    console.log("ones- " + onesInput, "tens- " + tensInput, "final- " + finalInput, "carry- " + carryInput)
};


function main() {
    const problems = createProblemArr();
    writeProblemArr(problems);

    //applies validateProblem to each submit button
    const buttons = document.querySelectorAll(".submit_btn");
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            //returns problem number that was added to class
            const problemNum = e.target.parentElement.classList[1][2]
            //calls validateProblem with parameters - problem answer and problem div
            validateProblem(problems[problemNum], e.target.parentElement);
        });
    });

};

main();