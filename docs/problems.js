
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
        const table = document.getElementById("multTable");

        const onesHTML = `
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
                <td><sub>ones</sub></td>
                <td colspan="2"><input type="text" class="onesInput"></td>
            </tr>`;

        const tensHTML = `
            <tr>
                <td><sub>+tens</sub></td>
                <td colspan="2"><input type="text" class="tensInput"></td>
                </tr>
            <tr>`;

        const finalHTML = `
            <tr>
                <td><sub>=</sub></td>
                <td colspan="2"><input type="text" class="finalInput"></td>
            </tr>`;

        if (this.currStep == 'ones') {
            table.innerHTML = onesHTML;
        } else if (this.currStep == 'tens') {
            table.innerHTML += tensHTML;
            table.querySelector(".onesInput").parentElement.innerHTML = this.onesAnswer;
        } else if (this.currStep == 'final') {
            table.innerHTML += finalHTML;
            table.querySelector(".tensInput").parentElement.innerHTML = this.tensAnswer;
        };
       


    };

    validate(problemEl) {
        console.log(problemEl)
        const onesInput = problemEl.querySelector('.onesInput');
        const tensInput = problemEl.querySelector('.tensInput');
        const finalInput = problemEl.querySelector('.finalInput');
        const toInt = (val) => Number.parseInt(val);
        console.log("validate method", this.onesAnswer, this.tensAnswer, this.finalAnswer)
        if (this.currStep == 'ones') {
            if (toInt(onesInput.value) === this.onesAnswer) {
                onesInput.classList.remove('wrong');
                this.currStep = 'tens';
                this.write();
            } else {
                onesInput.classList.add('wrong');
            }
        }   else if (this.currStep == 'tens') {
                console.log('moved to tens')

                if (toInt(tensInput.value) === this.tensAnswer) {
                    tensInput.classList.remove('wrong');
                    this.currStep = 'final';
                    this.write();
                } else {
                    tensInput.classList.add('wrong');
                };
        }   else if (this.currStep == 'final') {
                if (toInt(finalInput.value) === this.finalAnswer) {
                    finalInput.classList.remove('wrong');
                    problemEl.querySelector(".finalInput").parentElement.innerHTML = this.finalAnswer;
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