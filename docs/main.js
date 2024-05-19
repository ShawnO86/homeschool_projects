import { createTimesTable } from "./timesTable.js";
import { createProblemArr } from "./problems.js";

function resetPage() {
    //resets all HTML added with JavaScript.
    const formulaSection = document.getElementById("tableFormula");
    const timesTableSection =  document.getElementById("timesTable");
    const problemsSection = document.getElementById("multiply");
    formulaSection.innerHTML = '';
    timesTableSection.innerHTML = '';
    problemsSection.innerHTML = '';
};

function main() {
    createTimesTable();

    const problems = createProblemArr();
    const form = document.querySelector("#multiply");
    const problemSection = document.querySelector("#problems");
    const completeProblems = [];

    //cycles through each problem to write and add event listeners
    problems.forEach((problem, index) => {
        const submitBtn = document.createElement("button");
        const problemContainer = document.createElement("div");
        submitBtn.classList.add("submitBtn");
        submitBtn.innerText = "Check " + problem.currStep;
        problemContainer.appendChild(problem.table);
        form.appendChild(problemContainer);
        problem.write();
        problem.table.classList.add("p_"+index);
        problemContainer.appendChild(submitBtn);
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            problem.validate(problem.table);
            submitBtn.innerText = "Check " + problem.currStep;
            if (problem.validated) {
                submitBtn.disabled = true;
                submitBtn.innerText = "Complete!";
                submitBtn.classList.add("correct");
                problemContainer.classList.add("shrink");
                completeProblems.push(problem);
                if (completeProblems.length == problems.length) {
                    const completedOut = document.createElement('div');
                    const resetBtn = document.createElement('button');
                    completedOut.classList.add('completedOut');
                    completedOut.innerText = "All Problems Complete!";
                    resetBtn.classList.add('resetBtn');
                    resetBtn.innerText = "Reset?";
                    problemSection.appendChild(completedOut);
                    completedOut.appendChild(resetBtn);
                    resetBtn.addEventListener("click", () => {
                        problemSection.removeChild(completedOut);
                        resetPage();
                        main();
                    })
                };
            };
        });
    });
};


main();