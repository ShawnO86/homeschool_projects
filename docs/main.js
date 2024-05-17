import { createTimesTable } from "./timesTable.js";
import { createProblemArr, writeProblemArr, validateProblem } from "./problems.js";

function main() {
    createTimesTable();
    const problems = createProblemArr();
    writeProblemArr(problems);

    //applies validateProblem to each submit button
    const buttons = document.querySelectorAll(".submitBtn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const problem = document.querySelector(".p_"+index)
            validateProblem(problems[index], problem);
        });
    });
};


main();
