

export class Problem {
    constructor() {
        //generate two random numbers between 10 and 99
        this.num1 = Math.floor(Math.random() * 90 + 10);
        this.num2 = Math.floor(Math.random() * 90 + 10);
        //calculates ones, tens and final answers
        this.onesAnswer = this.num1 * (this.num2 % 10);
        this.tensAnswer = (this.num1 * Math.floor(this.num2 / 10)) * 10;
        this.finalAnswer = this.onesAnswer + this.tensAnswer;
        //steps include ones, tens, addition
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
                <td colspan="3"><sub>+carry</sub></td>
                <td class=carryCell>
                    <input type="text" class="multCarry">
                </td>
            </tr>
            <tr>
                <td colspan="3"></td>
                <td id="num1Tens">${num1Tens}</td>
                <td id="num1Ones">${num1Ones}</td>
            </tr>
            <tr>
                <td colspan="3" class="bottomBorder">x</td>
                <td id="num2Tens" class="bottomBorder">${num2Tens}</td>
                <td id="num2Ones" class="bottomBorder">${num2Ones}</td>
            </tr>
            <tr class="onesOutput">
                <td colspan="2"></td>
                <td><input type="text" class="multInput onesInput" id="onesHun"></td>
                <td><input type="text" class="multInput onesInput" id="onesTen"></td>
                <td><input type="text" class="multInput onesInput" id="onesOne"></td>
            </tr>`;

        const tensHTML = `
            <tr>
                <td></td>
                <td><input type="text" class="multInput tensInput" id="tensThou"></td>
                <td><input type="text" class="multInput tensInput" id="tensHun"></td>
                <td><input type="text" class="multInput tensInput" id="tensTen"></td>
                <td><input type="text" class="multInput tensInput" id="tensOne" value="0"></td>
            <tr>`;

        const finalHTML = `
            <tr class="shrink">
                <td colspan="3"></td>
                <td>${num1Tens}</td>
                <td>${num1Ones}</td>
            </tr>
            <tr class="shrink">
                <td colspan="3">x</td>
                <td>${num2Tens}</td>
                <td>${num2Ones}</td>
            </tr>
            <tr>
                <td><sub>+carry</sub></td>
                <td class=carryCell>
                <input type="text" class="addCarry" id="addCarryThou">
                </td>
                <td class=carryCell>
                <input type="text" class="addCarry" id="addCarryHun">
                </td>
                <td class=carryCell>
                <input type="text" class="addCarry" id="addCarryTen">
                </td>
                <td class="spacer"></td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td id="onesAnsHun">${onesAnswerHundreds}</td>
                <td id="onesAnsTen">${onesAnswerTens}</td>
                <td id="onesAnsOne">${onesAnswerOnes}</td>
            </tr>
            <tr>
                <td class="bottomBorder">+</td>
                <td id="tensAnsThou" class="bottomBorder">${tensAnswerThousands}</td>
                <td id="tensAnsHun" class="bottomBorder">${tensAnswerHundreds}</td>
                <td id="tensAnsTen" class="bottomBorder">${tensAnswerTens}</td>
                <td id="tensAnsOne" class="bottomBorder">${tensAnswerOnes}</td>
            </tr>
            <tr>
                <td>=</td>
                <td>
                <input type="text" class="addInput" id="addThou">
                </td>
                <td>
                <input type="text" class="addInput" id="addHun">
                </td>
                <td>
                <input type="text" class="addInput" id="addTen">
                </td>
                <td>
                <input type="text" class="addInput" id="addOne">
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
        this.setFocusHighlights();
    };

    setFocusHighlights() {
        const num1OnesOut = this.table.querySelector("#num1Ones");
        const num1TensOut = this.table.querySelector("#num1Tens");
        const num2OnesOut = this.table.querySelector("#num2Ones");
        const num2TensOut = this.table.querySelector("#num2Tens");
    
        const addHighlightListeners = (input, highlights) => {
                input.addEventListener("mouseover", () => highlights.forEach(el => el.classList.add("highlight")));
                input.addEventListener("mouseout", () => highlights.forEach(el => el.classList.remove("highlight")));
        };
    
        if (this.currStep == "ones") {
            const onesOneInput = this.table.querySelector("#onesOne");
            const onesTenInput = this.table.querySelector("#onesTen");
            const onesHunInput = this.table.querySelector("#onesHun");
    
            addHighlightListeners(onesOneInput, [num1OnesOut, num2OnesOut]);
            addHighlightListeners(onesTenInput, [num2OnesOut, num1TensOut]);
            addHighlightListeners(onesHunInput, [num2OnesOut, num1TensOut]);
        } else if (this.currStep == "tens") {
            const tensTenInput = this.table.querySelector("#tensTen");
            const tensHunInput = this.table.querySelector("#tensHun");
            const tensThouInput = this.table.querySelector("#tensThou");
    
            addHighlightListeners(tensTenInput, [num1OnesOut, num2TensOut]);
            addHighlightListeners(tensHunInput, [num1TensOut, num2TensOut]);
            addHighlightListeners(tensThouInput, [num1TensOut, num2TensOut]);
        } else if (this.currStep == "addition") {
            const addOneInput = this.table.querySelector("#addOne");
            const addTenInput = this.table.querySelector("#addTen");
            const addHunInput = this.table.querySelector("#addHun");
            const addThouInput = this.table.querySelector("#addThou");
    
            const onesAnsOne = this.table.querySelector("#onesAnsOne");
            const onesAnsTen = this.table.querySelector("#onesAnsTen");
            const onesAnsHun = this.table.querySelector("#onesAnsHun");
    
            const tensAnsOne = this.table.querySelector("#tensAnsOne");
            const tensAnsTen = this.table.querySelector("#tensAnsTen");
            const tensAnsHun = this.table.querySelector("#tensAnsHun");
            const tensAnsThou = this.table.querySelector("#tensAnsThou");
    
            addHighlightListeners(addOneInput, [onesAnsOne, tensAnsOne]);
            addHighlightListeners(addTenInput, [onesAnsTen, tensAnsTen]);
            addHighlightListeners(addHunInput, [onesAnsHun, tensAnsHun]);
            addHighlightListeners(addThouInput, [tensAnsThou]);
        };
    };

    validate() {
        const onesInput = this.table.querySelectorAll('.onesInput');
        const tensInput = this.table.querySelectorAll('.tensInput');
        const addInput = this.table.querySelectorAll('.addInput');
        console.log("validate method", this.onesAnswer, this.tensAnswer, this.finalAnswer)

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