import { createTimesTable } from "./timesTable.js";
import { Problem } from "./problems.js";

function resetPage() {
    //resets all HTML added with JavaScript.
    const formulaSection = document.getElementById("tableFormula");
    const timesTableSection =  document.getElementById("timesTable");
    const problemsSection = document.getElementById("multiply");
    formulaSection.innerHTML = '';
    timesTableSection.innerHTML = '';
    problemsSection.innerHTML = '';
};


function createProblemArr() {
    //creates and returns an array of Problem objects 
    const problems = [];
    for (let i = 0; i < 3; i++) {
        problems.push(new Problem());
    };
    return problems;
};


function main() {
    createTimesTable();

    const problems = createProblemArr();
    const form = document.querySelector("#multiply");
    const problemSection = document.querySelector("#problems");
    const completeProblems = [];

    //cycles through each problem to write table and add event listeners
    problems.forEach((problem, index) => {
        const submitBtn = document.createElement("button");
        const problemContainer = document.createElement("div");
        submitBtn.classList.add("submitBtn");
        submitBtn.innerText = "Check " + problem.currStep;
        problemContainer.appendChild(problem.table);
        form.appendChild(problemContainer);
        //writes each problem using objects method
        problem.write();
        //adds submit button to each problem
        problemContainer.appendChild(submitBtn);
        //adds event listener to each problems submit button
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            //calls objects validate method using objects table property
            problem.validate(problem.table);
            //changes submit button text to inform of current step
            submitBtn.innerText = "Check " + problem.currStep;
            //if problem is correct, disables submit button and informs of correct answer
            if (problem.validated) {
                submitBtn.disabled = true;
                submitBtn.innerText = "Complete!";
                submitBtn.classList.add("correct");
                problemContainer.classList.add("shrink");
                completeProblems.push(problem);
                //compares amount of completed problems with amount of generated problems and gives feedback if all are complete
                if (completeProblems.length == problems.length) {
                    const completedOut = document.createElement('div');
                    const resetBtn = document.createElement('button');
                    completedOut.classList.add('completedOut');
                    completedOut.innerText = "All Problems Complete!";
                    resetBtn.classList.add('resetBtn');
                    resetBtn.innerText = "Reset?";
                    problemSection.appendChild(completedOut);
                    completedOut.appendChild(resetBtn);
                    //resets problems if clicked and all are complete 
                    resetBtn.addEventListener("click", () => {
                        problemSection.removeChild(completedOut);
                        resetPage();
                        main();
                    })
                };
            };
        });
    });
    //TO DO: add help button functionality - provide an animation showing how to complete each step
    const helpBtn = document.querySelector(".helpBtn");
    helpBtn.addEventListener("click", () => {
        alert("😂 help button not done yet! 😂");
    });
};


main();