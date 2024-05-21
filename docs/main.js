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


//TO DO setup way to show next problem after current one solved.
//Can use completeProblems array or an increment 
//Instead of looping over each problem, use a while loop to write next problem as previous are solved...

function main() {
    createTimesTable();

    const problems = createProblemArr();
    const form = document.querySelector("#multiply");
    const problemSection = document.querySelector("#problems");
    const completeProblems = [];

    //cycles through each problem to write table and add event listeners
    problems.forEach((problem) => {
        const submitBtn = document.createElement("button");
        const problemContainer = document.createElement("div");
        submitBtn.classList.add("submitBtn");
        submitBtn.innerText = "Next Step  ~>";
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
};


main();