import { createTimesTable } from "./timesTable.js";
import { createProblemArr, writeProblemArr, validateProblem } from "./problems.js";

function main() {
    createTimesTable();
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
