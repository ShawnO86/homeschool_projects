
//TO DO: get ones and tens answers and calculate carry overs for the addition step. 

//TO DO: create carry inputs for addition step.

//TO DO: Show only one problem at a time, after validation show next problem. Move valid problems to a completed area which are shrinked.

//TO DO: At addition step, if all multiplication inputs are correct, reduce size of multiplication elements and move up to move focus to addition?

/* TO DO:
Mess around with building 2+ digit problems using HTML forms,
Find way to validate each part (ones, tens, carry overs, etc..)
Should validate each step seperatly, then clear the carry for the one's step?
REPLICATE https://mrnussbaum.com/multiplication-pal-online-multiplication-simulation
and others
*/

class Problem {
    constructor() {
        //generate two random numbers between 10 and 99
        this.num1 = Math.floor(Math.random() * 90 + 10);
        this.num2 = Math.floor(Math.random() * 90 + 10);
        //calculates ones, tens and final answers
        this.onesAnswer = this.num1 * (this.num2 % 10);
        this.tensAnswer = (this.num1 * Math.floor(this.num2 / 10)) * 10;
        this.finalAnswer = this.onesAnswer + this.tensAnswer;
        //steps include ones, tens, final
        this.currStep = 'ones';
    };

    write() {
        const num1Ones = this.num1 % 10;
        const num1Tens = Math.floor(this.num1 / 10);
        const num2Ones = this.num2 % 10;
        const num2Tens = Math.floor(this.num2 / 10);

        console.log("num1:", this.num1, "num2:", this.num2);
        console.log("num2 Tens", num1Tens, "num1 Ones:", num1Ones);

        //TO DO: set up way to write problem as it gets verified.

        return `
            <tr>
                <td><sub>carry</sub></td>
                <td class=carryCell>
                    <input type="text" class="carry">
                </td>
            </tr>
            <tr>
                <td></td>
                <td>${num1Tens}</td>
                <td>${num1Ones}</td>
            </tr>
            <tr>
                <td>x</td>
                <td>${num2Tens}</td>
                <td>${num2Ones}</td>
            </tr>
            <tr>
                <td></td>
                <td colspan="2"><input type="text" class="onesInput"></td>
            </tr>
            <tr>
                <td><sub>+</sub></td>
                <td colspan="2"><input type="text" class="tensInput"></td>
            </tr>
            <tr>
            <td><sub>=</sub></td>
                <td colspan="2"><input type="text" class="finalInput"></td>
            </tr>
            <tr>
                <td colspan="3">
                    <button class="submitBtn">Check Answers</button>
                </td>
        `;
    };

    validate(problemEl) {
        console.log("validate method");
        const onesInput = problemEl.querySelector('.onesInput');
        const tensInput = problemEl.querySelector('.tensInput');
        const finalInput = problemEl.querySelector('.finalInput');
        const toInt = (val) => Number.parseInt(val);
        console.log(this.onesAnswer, this.tensAnswer, this.finalAnswer)
        switch (this.currStep) {
            case 'ones':
                console.log(onesInput.value)
                if (toInt(onesInput.value) === this.onesAnswer) {
                    onesInput.classList.remove('wrong');
                    onesInput.classList.add('correct');
                    this.currStep = 'tens';
                } else {
                    onesInput.classList.add('wrong');
                };
            case 'tens':
                if (toInt(tensInput.value) === this.tensAnswer) {
                    tensInput.classList.remove('wrong');
                    tensInput.classList.add('correct');
                    this.currStep = 'final'
                } else {
                    tensInput.classList.add('wrong');
                };
            case 'final':
                if (toInt(finalInput.value) === this.finalAnswer) {
                    finalInput.classList.remove('wrong');
                    finalInput.classList.add('correct');
                } else {
                    finalInput.classList.add('wrong');
                };
        };
    };

};


export function createProblemArr() {
    const problems = [];
    for (let i = 0; i < 1; i++) {
        problems.push(new Problem());
    };
    return problems;
};


export function writeProblemArr(problems) {
    const form = document.getElementById("multiply");
    problems.forEach((problem, index) => {
        const table = document.createElement("table");
        table.classList.add("problem", "p_" + index);
        table.innerHTML = problem.write();
        form.appendChild(table)
    });
};


export function validateProblem(problemAns, problemEl) {
    //problem is an array of integers given by clicking submit and getting the target parent class to specify index of problems array,
    //problem array structure = [num1, num2, onesAns, tensAns, finalAns, carry]
    const onesCarryInput = problemEl.querySelector('.carry');
    const tensCarryInput = problemEl.querySelector('.tensCarry');
    const onesInput = problemEl.querySelector('.ones');
    const tensInput = problemEl.querySelector('.tens');
    const finalInput = problemEl.querySelector('.final');
    const toInt = (val) => Number.parseInt(val);

    /*     if (onesCarryInput.value == problemAns.onesCarry) {
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
        }; */

    console.log("ones- " + problemAns.onesAnswer, "tens- " + problemAns.tensAnswer, "final- " + problemAns.finalAnswer, "ones carry- " + problemAns.onesCarry, "tens carry- " + problemAns.tensCarry)
    //console.log("ones- " + onesInput.value, "tens- " + tensInput.value, "final- " + finalInput.value, "ones carry- " + onesCarryInput.value, "tens carry-" + tensCarryInput.value)
};

