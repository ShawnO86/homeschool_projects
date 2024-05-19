

/* TO DO:
    Highlight table cell for each respective step?
    Fix tab indexing of inputs?
*/

export class Problem {
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
        //writes HTML table structure filled with values of this problem
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
                <td colspan="3"><sub>carry</sub></td>
                <td class=carryCell>
                    <input type="text" class="multCarry">
                </td>
            </tr>
            <tr>
                <td colspan="3"></td>
                <td>${num1Tens}</td>
                <td>${num1Ones}</td>
            </tr>
            <tr>
                <td colspan="3">x</td>
                <td>${num2Tens}</td>
                <td>${num2Ones}</td>
            </tr>
            <tr class="onesOutput">
                <td colspan="2"></td>
                <td><input type="text" class="multInput onesInput"></td>
                <td><input type="text" class="multInput onesInput"></td>
                <td><input type="text" class="multInput onesInput"></td>
            </tr>`;

        const tensHTML = `
            <tr>
                <td></td>
                <td><input type="text" class="multInput tensInput"></td>
                <td><input type="text" class="multInput tensInput"></td>
                <td><input type="text" class="multInput tensInput"></td>
                <td><input type="text" class="multInput tensInput"></td>
            <tr>`;

        const finalHTML = `
            <tr>
                <td colspan="3"></td>
                <td>${num1Tens}</td>
                <td>${num1Ones}</td>
            </tr>
            <tr>
                <td colspan="3">x</td>
                <td>${num2Tens}</td>
                <td>${num2Ones}</td>
            </tr>
            <tr>
                <td></td>
                <td class=carryCell>
                <input type="text" class="addCarry">
                </td>
                <td class=carryCell>
                <input type="text" class="addCarry">
                </td>
                <td class=carryCell>
                <input type="text" class="addCarry">
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
                <td>=</td>
                <td>
                <input type="text" class="addInput">
                </td>
                <td>
                <input type="text" class="addInput">
                </td>
                <td>
                <input type="text" class="addInput">
                </td>
                <td>
                <input type="text" class="addInput">
                </td>
            </tr>
            `;

        if (this.currStep == 'ones') {
            this.table.innerHTML = onesHTML;
        } else if (this.currStep == 'tens') {
            this.table.innerHTML = onesHTML + tensHTML;
            this.table.querySelector(".onesOutput").innerHTML = `
            <td colspan="2"></td>
            <td>${onesAnswerHundreds}</td>
            <td>${onesAnswerTens}</td>
            <td>${onesAnswerOnes}</td>`;
        } else if (this.currStep == 'addition') {
            this.table.innerHTML = finalHTML;
        };
    };

    validate(problemEl) {
        const onesInput = problemEl.querySelectorAll('.onesInput');
        const tensInput = problemEl.querySelectorAll('.tensInput');
        const addInput = problemEl.querySelectorAll('.addInput');
        //console.log("validate method", this.onesAnswer, this.tensAnswer, this.finalAnswer)

        if (this.currStep == 'ones') {
            let onesVal = parseInputValues(onesInput);

            if (onesVal === this.onesAnswer) {
                setNodesRight(onesInput);
                this.currStep = 'tens';
                this.write();
            } else {
                setNodesWrong(onesInput);
            };

        } else if (this.currStep == 'tens') {
            const tensVal = parseInputValues(tensInput);

            if (tensVal === this.tensAnswer) {
                setNodesRight(tensInput);
                this.currStep = 'addition';
                this.write();
            } else {
                setNodesWrong(tensInput);
            };

        } else if (this.currStep == 'addition') {
            const finalVal = parseInputValues(addInput);

            if (finalVal === this.finalAnswer) {
                setNodesRight(addInput);
                this.validated = true;
            } else {
                setNodesWrong(addInput);
            };
        };
    };

};


function parseInputValues(nodeArr) {
    //combines each string value from inputs of same selectors from querySelectorAll
    //returns combined values as an integer
    let inputVal = '';

    nodeArr.forEach((val) => {
        inputVal += val.value;
    });

    return Number.parseInt(inputVal);
};


function setNodesWrong(nodeArr) {
    //sets each node from querySelectorAll to have class "wrong" 
    nodeArr.forEach((node) => {
        node.classList.remove('correct');
        node.classList.add('wrong');
    });
};


function setNodesRight(nodeArr) {
    //sets each node from querySelectorAll to have class "right" 
    nodeArr.forEach((node) => {
        node.classList.add('correct');
        node.classList.remove('wrong');
    });
};