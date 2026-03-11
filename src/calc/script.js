"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const navigationModeButtonElements = document.querySelectorAll(
        ".navigation-mode-button",
    );
    const operationModeCardContainers = document.querySelectorAll(
        ".operation-mode-card-container",
    );

    function switchActiveOperationMode(modeIdentifier) {
        operationModeCardContainers.forEach((modeCard) => {
            modeCard.style.display = "none";
        });
        const activeModeContainer = document.getElementById(
            modeIdentifier + "-mode-container",
        );
        if (activeModeContainer) {
            activeModeContainer.style.display = "block";
        }
    }

    navigationModeButtonElements.forEach((navigationButton) => {
        navigationButton.addEventListener("click", function () {
            navigationModeButtonElements.forEach((buttonElement) => {
                buttonElement.classList.remove("active");
            });
            this.classList.add("active");
            const selectedModeIdentifier = this.dataset.selectedMode;
            switchActiveOperationMode(selectedModeIdentifier);
        });
    });

    switchActiveOperationMode("basic-operations");

    const defaultActiveNavigationButton = document.querySelector(
        '[data-selected-mode="basic-operations"]',
    );
    if (defaultActiveNavigationButton) {
        defaultActiveNavigationButton.classList.add("active");
    }

    const firstNumber = document.getElementById(
        "basic-operations-first-number-input-field",
    );
    const secondNumber = document.getElementById(
        "basic-operations-second-number-input-field",
    );
    const operatorSelect = document.getElementById(
        "basic-operations-mathematical-operator-selector",
    );
    const resultButton = document.getElementById(
        "basic-operations-calculate-result-button",
    );
    const resultDiv = document.getElementById(
        "basic-operations-result-display-container",
    );
    const negationInput = document.getElementById("negation-input-field");
    const negationButton = document.getElementById("negation-calculate-button");
    const negationResult = document.getElementById(
        "negation-result-display-container",
    );
    const arrayFirstInput = document.getElementById("array-first-input-field");
    const arraySecondInput = document.getElementById(
        "array-second-input-field",
    );
    const arraysButton = document.getElementById("arrays-calculate-button");
    const arraysResult = document.getElementById(
        "arrays-result-display-container",
    );
    const meanCountInput = document.getElementById("mean-field-count-input");
    const meanGenerateButton = document.getElementById(
        "mean-generate-fields-button",
    );
    const meanFieldsContainer = document.getElementById(
        "mean-fields-container",
    );
    const meanCalculateButton = document.getElementById(
        "mean-calculate-button",
    );
    const meanResult = document.getElementById("mean-result-display-container");

    function calculator() {
        const alpha = parseFloat(firstNumber.value);
        const beta = parseFloat(secondNumber.value);
        const oper = operatorSelect.value;

        if (isNaN(alpha) || isNaN(beta)) {
            resultDiv.textContent = "ERROR: NaN";

            return;
        }

        let result;

        switch (oper) {
            case "+":
                result = alpha + beta;
                break;
            case "-":
                result = alpha - beta;
                break;
            case "*":
                result = alpha * beta;
                break;
            case "/":
                if (beta === 0) {
                    resultDiv.textContent = "ERROR: Second Number is 0";

                    return;
                }
                result = alpha / beta;
                break;
            default:
                result = "ERROR: Unknown Operation";
        }

        resultDiv.textContent = `RESULT: ${result}`;
    }

    resultButton.addEventListener("click", calculator);

    function calculateNegation() {
        const value = parseFloat(negationInput.value);

        if (isNaN(value)) {
            negationResult.textContent = "ERROR: NaN";
        }

        const result = -value;
        negationResult.textContent = `RESULT: ${result}`;
    }

    negationButton.addEventListener("click", calculateNegation);

    function parserString(inputString) {
        if (!inputString.trim()) {
            return [];
        }

        return inputString
            .split(",")
            .map((item) => parseFloat(item.trim()))
            .filter((item) => !isNaN(item));
    }

    function addArrays(arr1, arr2) {
        const maxLength = Math.max(arr1.length, arr2.length);
        const result = [];

        for (let i = 0; i < maxLength; i++) {
            const value1 = i < arr1.length ? arr1[i] : 0;
            const value2 = i < arr2.length ? arr2[i] : 0;

            result.push(value1 + value2);
        }

        return result;
    }
    function calculateArrays() {
        const array1 = parserString(arrayFirstInput.value);
        const array2 = parserString(arraySecondInput.value);

        if (array1.length === 0 || array2.length === 0) {
            arraysResult.textContent = "ERROR: Invalid Array";

            return;
        }

        const sumArray = addArrays(array1, array2);

        arraysResult.textContent = `RESULT: ${sumArray}`;
    }

    arraysButton.addEventListener("click", calculateArrays);

    function generateNumberFields(count) {
        meanFieldsContainer.innerHTML = "";

        for (let i = 1; i <= count; i++) {
            const fieldWrapper = document.createElement("div");
            fieldWrapper.className = "mean-number-field";

            const label = document.createElement("label");
            label.textContent = `Number ${i}:`;
            label.htmlFor = `mean-number-${i}`;

            const input = document.createElement("input");
            input.type = "number";
            input.id = `mean-number-${i}`;
            input.className = "mean-number-input";
            input.placeholder = `Enter number ${i}`;
            input.step = "any";

            fieldWrapper.appendChild(label);
            fieldWrapper.appendChild(input);

            meanFieldsContainer.appendChild(fieldWrapper);
        }
    }

    meanGenerateButton.addEventListener("click", function () {
        let fieldCount = parseInt(meanCountInput.value);
        if (isNaN(fieldCount) || fieldCount < 2) {
            fieldCount = 2;
            meanCountInput.value = 2;
        } else if (fieldCount > 10) {
            fieldCount = 10;
            meanCountInput.value = 10;
        }
        generateNumberFields(fieldCount);
    });

    function calculateMean() {
        const inputs = document.querySelectorAll(".mean-number-input");

        let sum = 0;
        let cnt = 0;

        inputs.forEach((input) => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                sum += value;
                cnt++;
            }
        });
        if (cnt === 0) {
            meanResult.textContent = "ERROR: Fields 2 - 10";
            return;
        }

        const mean = sum / cnt;
        meanResult.textContent = `RESULT: ${mean}`;
    }

    meanCalculateButton.addEventListener("click", calculateMean);
});
