
//TO DO: seperate input cells.

/* TO DO:
REPLICATE https://mrnussbaum.com/multiplication-pal-online-multiplication-simulation
and others?
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
        this.validated = false;
        this.table = document.createElement("table");
    };

    write() {
        const num1Ones = this.num1 % 10;
        const num1Tens = Math.floor(this.num1 / 10);
        const num2Ones = this.num2 % 10;
        const num2Tens = Math.floor(this.num2 / 10);

        this.table.classList.add("problem");
        //These are for seperating and putting each digit into a cell for the addition step.
        const onesAnswerOnes = this.onesAnswer % 10;
        const onesAnswerTens = Math.floor(this.onesAnswer % 100 / 10);
        const onesAnswerHundreds = Math.floor(this.onesAnswer % 1000 / 100) > 0 ? Math.floor(this.onesAnswer % 1000 / 100) : '';
        const tensAnswerOnes = this.tensAnswer % 10;
        const tensAnswerTens = Math.floor(this.tensAnswer % 100 / 10);
        const tensAnswerHundreds = Math.floor(this.tensAnswer % 1000 / 100);
        const tensAnswerThousands = Math.floor(this.tensAnswer % 10000 / 1000) > 0 ? Math.floor(this.tensAnswer % 10000 / 1000) : '';

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
                <td></td>
                <td colspan="3" class="onesOutput"><input type="text" class="onesInput"></td>
            </tr>`;

        const tensHTML = `
            <tr>
                <td>+</td>
                <td colspan="3" class="tensOutput"><input type="text" class="tensInput"></td>
                </tr>
            <tr>`;

        const finalHTML = `
            <tr class="shrink">
                <td></td>
                <td>${num1Tens}</td>
                <td>${num1Ones}</td>
            </tr>
            <tr class="shrink">
                <td>x</td>
                <td>${num2Tens}</td>
                <td>${num2Ones}</td>
            </tr>
            <tr>
                <td></td>
                <td class=carryCell>
                <input type="text" class="carry">
                </td>
                <td class=carryCell>
                <input type="text" class="carry">
                </td>
                <td class=carryCell>
                <input type="text" class="carry">
                </td>
                <td class="spacer"></td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td>${onesAnswerHundreds}</td>
                <td>${onesAnswerTens}</td>
                <td>${onesAnswerOnes}</td>
            </tr>
            <tr>
                <td>+</td>
                <td>${tensAnswerThousands}</td>
                <td>${tensAnswerHundreds}</td>
                <td>${tensAnswerTens}</td>
                <td>${tensAnswerOnes}</td>
            </tr>
            <tr>
                <td><sub>=</sub></td>
                <td colspan="5" class="finalOutput"><input type="text" class="finalInput"></td>
            </tr>
            `;

        if (this.currStep == 'ones') {
            this.table.innerHTML = onesHTML;
        } else if (this.currStep == 'tens') {
            this.table.innerHTML = onesHTML + tensHTML;
            this.table.querySelector(".onesOutput").innerHTML = this.onesAnswer;
        } else if (this.currStep == 'final') {
            this.table.innerHTML = finalHTML;
        };
    };

    validate(problemEl) {
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
        } else if (this.currStep == 'tens') {
            if (toInt(tensInput.value) === this.tensAnswer) {
                tensInput.classList.remove('wrong');
                this.currStep = 'final';
                this.write();
            } else {
                tensInput.classList.add('wrong');
            };
        } else if (this.currStep == 'final') {
            if (toInt(finalInput.value) === this.finalAnswer) {
                const finalOutput = problemEl.querySelector(".finalOutput");
                finalInput.classList.remove('wrong');
                finalOutput.innerHTML = this.finalAnswer;
                finalOutput.classList.add('correct');
                this.validated = true;
            } else {
                finalInput.classList.add('wrong');
            };
        };
    };
};


export function createProblemArr() {
    const problems = [];
    for (let i = 0; i < 3; i++) {
        problems.push(new Problem());
    };
    return problems;
};
