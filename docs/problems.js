class Problem {
    constructor() {
        //generate two random numbers between 10 and 99
        //highest possible problem - 99 * 99 
        this.num1 = Math.floor(Math.random() * 90 + 10);
        this.num2 = Math.floor(Math.random() * 90 + 10);
        //multiplies num1 by ones digit of num2
        this.onesAnswer = this.num1 * (this.num2 % 10);
        //calculates carry over value -- (num1 % 10) * (num2 % 10) selects the ones place digits and multiplies them,
        //dividing that product by 10 moves decimal to the tens place, Math.floor() ensures it's an integer by removing everything after decimal.
        this.onesCarry = Math.floor((((this.num1 % 10) * (this.num2 % 10)) / 10));
        this.tensCarry = Math.floor((this.num2 / 10) * (this.num1 % 10) / 10);
        //multiplies num1 by tens digit of num2 and mulitplies result by 10 
        this.tensAnswer = (this.num1 * Math.floor(this.num2 / 10)) * 10;
        this.finalAnswer = this.onesAnswer + this.tensAnswer;
        //steps are - multiplication (M)-: ones, tens - addition (A)-: ones, tens, hundreds, thousands if needed 
        this.step = "M-ones";
    };

    write() {
        //Make problem generate as it's solved? 
        //Start with whole problem, but only allow ones digit step and ones carry for step one,
        //Then, allow tens digit, starts with a 0
        //Next, addition step - have carry overs for addition. 
    };

    validate(step) {

    }
};


export function createProblemArr() {
    let problems = [];

    for(let i = 0; i < 4; i++) {
        problems.push(new Problem());
    };

    return problems;
};


export function writeProblemArr(problems) {
    const form = document.getElementById("multiply");
    let i = 0
    problems.forEach(problem => {
        const div = document.createElement("div");
        form.appendChild(div);
        div.innerHTML = `
        <label for="carry">carry overs:</label>
        <label for="tensCarry">tens</label>
        <input type="text" class="tensCarry carry">
        <label for="onesCarry">ones</label>
        <input type="text" class="onesCarry carry">
            <div class="defProblem">
                <p><br>x</p>
                <p>`+ problem.num1 +`<br>` + problem.num2 + `</p>
            </div>
        <input type="text" class="ones solution">
        <p class="operator">+</p>
        <input type="text" class="tens solution">
        <p class="operator">=</p>
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

Should validate each step seperatly, then clear the carry for the one's step.
*/
export function validateProblem(problemAns, problemDiv) {
    //problem is an array of integers given by clicking submit and getting the target parent class to specify index of problems array,
    //problem array structure = [num1, num2, onesAns, tensAns, finalAns, carry]
    const onesCarryInput = problemDiv.querySelector('.onesCarry');
    const tensCarryInput = problemDiv.querySelector('.tensCarry');
    const onesInput = problemDiv.querySelector('.ones');
    const tensInput = problemDiv.querySelector('.tens');
    const finalInput = problemDiv.querySelector('.final');
    const toInt = (val) => Number.parseInt(val);

    if (onesCarryInput.value == problemAns.onesCarry) {
        onesCarryInput.classList.add('correct');
    } else {
        onesCarryInput.classList.add('wrong');
    };
    if (tensCarryInput.value == problemAns.tensCarry) {
        tensCarryInput.classList.add('correct');
    } else {
        tensCarryInput.classList.add('wrong');
    };
    if (toInt(onesInput.value) === problemAns.onesAnswer) {
        onesInput.classList.add('correct');
    } else {
        onesInput.classList.add('wrong');
    };
    if (toInt(tensInput.value) === problemAns.tensAnswer) {
        tensInput.classList.add('correct');
    } else {
        tensInput.classList.add('wrong');
    };
    if (toInt(finalInput.value) === problemAns.finalAnswer) {
        finalInput.classList.add('correct');
    } else {
        finalInput.classList.add('wrong');
    };

    console.log("ones- " + problemAns.onesAnswer, "tens- " + problemAns.tensAnswer, "final- " + problemAns.finalAnswer, "ones carry- " +  problemAns.onesCarry, "tens carry- " + problemAns.tensCarry)
    console.log("ones- " + onesInput.value, "tens- " + tensInput.value, "final- " + finalInput.value, "ones carry- " + onesCarryInput.value, "tens carry-" + tensCarryInput.value)
};

