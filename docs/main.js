import { createTimesTable } from "./timesTable.js";
import { createProblemArr } from "./problems.js";

function main() {
    createTimesTable();

    const problems = createProblemArr();

    problems[0].write()

    //applies validateProblem to each submit button
    const buttons = document.querySelectorAll(".submitBtn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const problem = document.querySelector(".problem");
            problems[index].validate(problem);
        });
    });
};


main();
