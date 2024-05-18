import { createTimesTable } from "./timesTable.js";
import { createProblemArr } from "./problems.js";

function main() {
    createTimesTable();

    const problems = createProblemArr();
    const form = document.querySelector("#multiply");

    problems.forEach((problem, index) => {
        const submitBtn = document.createElement("button");
        const problemContainer = document.createElement("div");
        submitBtn.classList.add("submitBtn");
        submitBtn.innerText = "Check Answer";
        problemContainer.appendChild(problem.table)
        form.appendChild(problemContainer)
        problem.write();
        problem.table.classList.add("p_"+index);
        problemContainer.appendChild(submitBtn);
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            problem.validate(problem.table);
            if (problem.validated) {
                submitBtn.disabled = true;
                submitBtn.innerText = "Complete!"
                submitBtn.classList.add("correct");
                problemContainer.classList.add("shrink")
            }
        })
    });
};


main();