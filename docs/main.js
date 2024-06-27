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
    for (let i = 0; i < 5; i++) {
        problems.push(new Problem());
    };
    return problems;
};


//TO DO setup way to show next problem after current one solved. -WIP
//Can use completeProblems array or an increment 

function main() {
    createTimesTable();

    const problems = createProblemArr();
    const completedProblems = [];
    let problemIndex = 0;
    const form = document.querySelector("#multiply");
    const completedDisplay = document.querySelector("#problemCount")
    completedDisplay.innerText = completedProblems.length + ' out of ' + problems.length;

    function displayCurrentProblem() {
        //recursivly calls itself as problems are completed.
        const currProblem = problems[problemIndex];
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submitBtn");
        submitBtn.innerText = "Next Step ->";
        currProblem.write();
        form.appendChild(currProblem.table);
        form.appendChild(submitBtn);

        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            currProblem.validate();

            if (currProblem.validated) {
                completedProblems.push(currProblem);
                form.removeChild(currProblem.table);
                form.removeChild(submitBtn);
                problemIndex += 1;
                completedDisplay.innerText = completedProblems.length + ' out of ' + problems.length;

                if (problemIndex < problems.length) {
                    displayCurrentProblem();
                } else {
                    //all problems complete
                    completedDisplay.innerHTML += `<br>`;
                    for (let i = 0; i < completedProblems.length; i++) {
                        let currProblem = `${completedProblems[i].num1} x ${completedProblems[i].num2} = ${completedProblems[i].finalAnswer}`;
                        completedDisplay.innerHTML += `Problem ${i + 1}:  ${currProblem}`;
                        if (i != completedProblems.length - 1) {
                            completedDisplay.innerHTML += `<br>`;
                        };
                    };
                };
            };
        });
    };

    displayCurrentProblem();
};
 
main();
