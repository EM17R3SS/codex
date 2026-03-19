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
    const textInput = document.getElementById("text-input-area");
    const textFindInput = document.getElementById("text-find-input");
    const textReplaceInput = document.getElementById("text-replace-input");
    const textReplaceButton = document.getElementById("text-replace-button");
    const textResult = document.getElementById("text-result-display-container");
    const imageFirstInput = document.getElementById("image-first-input");
    const imageSecondInput = document.getElementById("image-second-input");
    const imageOperationSelect = document.getElementById(
        "image-operation-select",
    );
    const imageProcessButton = document.getElementById("image-process-button");
    const imageCanvas = document.getElementById("image-canvas");
    const imageResult = document.getElementById(
        "image-result-display-container",
    );
    const thresholdSlider = document.getElementById("threshold-slider");
    const thresholdValue = document.getElementById("threshold-value");
    if (thresholdSlider) {
        thresholdSlider.addEventListener("input", function () {
            thresholdValue.textContent = this.value;
        });
    }

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
            return;
        }

        const result = -value;

        negationResult.textContent = `RESULT: ${result}`;
    }

    negationButton.addEventListener("click", calculateNegation);

    function parserString(inputString) {
        if (!inputString.trim()) {
            return { values: [], isValid: false, error: "Empty input" };
        }

        const items = inputString.split(",").map((item) => item.trim());
        const values = [];
        const invalidItems = [];

        items.forEach((item, index) => {
            const num = parseFloat(item);
            if (isNaN(num)) {
                invalidItems.push(`"${item}" at position ${index + 1}`);
            } else {
                values.push(num);
            }
        });

        if (invalidItems.length > 0) {
            return {
                values: values,
                isValid: false,
                error: `Invalid numbers: ${invalidItems.join(", ")}`,
            };
        }

        return { values: values, isValid: true, error: null };
    }
    function addArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            arraysResult.textContent = `WARNING: Different lengths (${arr1.length} vs ${arr2.length}), missing elements treated as 0`;
        }

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
        const result1 = parserString(arrayFirstInput.value);
        const result2 = parserString(arraySecondInput.value);

        if (!result1.isValid || !result2.isValid) {
            arraysResult.textContent = `ERROR: ${result1.error || result2.error}`;
            return;
        }

        if (result1.values.length === 0 || result2.values.length === 0) {
            arraysResult.textContent = "ERROR: Arrays cannot be empty";
            return;
        }

        const sumArray = addArrays(result1.values, result2.values);
        arraysResult.textContent = `RESULT: [${sumArray.join(", ")}]`;
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

    function replaceCharacters() {
        const originalText = textInput.value;
        const findChar = textFindInput.value;
        const replaceChar = textReplaceInput.value;

        if (!originalText.trim()) {
            textResult.textContent = "ERROR: Enter Some Text";
            return;
        }

        if (!findChar) {
            textResult.textContent = "RESULT: Enter Char to Find";
            return;
        }

        let resultText;

        if (replaceChar === "") {
            resultText = originalText.split(findChar).join("");
        } else {
            resultText = originalText.split(findChar).join(replaceChar);
        }

        // const replaceCnt = (originalText.match(new RegExp(findChar, "g")) || [])
        //     .length;

        textResult.textContent = `RESULT: ${resultText}`;
    }

    textReplaceButton.addEventListener("click", replaceCharacters);

    let ctx = imageCanvas.getContext("2d");

    function loadImage(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("ERROR: No File");
                return;
            }

            const reader = new FileReader();
            const img = new Image();

            reader.onload = function (e) {
                img.onload = function () {
                    resolve(img);
                };
                img.src = e.target.result;
            };

            reader.onerror = function () {
                reject("ERROR: Loading File");
            };

            reader.readAsDataURL(file);
        });
    }

    function drawImageOnCanvas(img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }

    function addImages(img1, img2) {
        const canvasWidth = Math.min(img1.width, img2.width);
        const canvasHeight = Math.min(img1.height, img2.height);

        imageCanvas.width = canvasWidth;
        imageCanvas.height = canvasHeight;

        ctx.drawImage(img1, 0, 0, canvasWidth, canvasHeight);
        const image1Data = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        ctx.drawImage(img2, 0, 0, canvasWidth, canvasHeight);
        const image2Data = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        const resultData = ctx.createImageData(canvasWidth, canvasHeight);

        for (let i = 0; i < image1Data.data.length; i += 4) {
            resultData.data[i] = Math.min(
                255,
                image1Data.data[i] + image2Data.data[i],
            );
            resultData.data[i + 1] = Math.min(
                255,
                image1Data.data[i + 1] + image2Data.data[i + 1],
            );
            resultData.data[i + 2] = Math.min(
                255,
                image1Data.data[i + 2] + image2Data.data[i + 2],
            );
            resultData.data[i + 3] = 255;
        }

        ctx.putImageData(resultData, 0, 0);
    }

    //const threshold = document.getElementById("threshold-slider").value;

    function createMask(img, thresholdValue) {
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            const brightness =
                (imageData.data[i] +
                    imageData.data[i + 1] +
                    imageData.data[i + 2]) /
                3;

            if (brightness > thresholdValue) {
                imageData.data[i + 3] = 0;
            } else {
                imageData.data[i] = 0;
                imageData.data[i + 1] = 0;
                imageData.data[i + 2] = 0;
                imageData.data[i + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    imageProcessButton.addEventListener("click", async function () {
        const file1 = imageFirstInput.files[0];
        const file2 = imageSecondInput.files[0];
        const operation = imageOperationSelect.value;

        if (!file1) {
            imageResult.textContent = "ERROR: Please Select First Image";
            return;
        }

        imageResult.textContent = "RESULT: Processing...";

        try {
            if (operation === "add") {
                if (!file2) {
                    imageResult.textContent =
                        "ERROR: Please Select Second Image";
                    return;
                }

                const img1 = await loadImage(file1);
                const img2 = await loadImage(file2);

                addImages(img1, img2);
                imageResult.textContent = "RESULT: Images Added Successfully";
            } else if (operation === "mask") {
                const img = await loadImage(file1);

                const currentThreshold = thresholdSlider
                    ? parseInt(thresholdSlider.value)
                    : 128;

                createMask(img, currentThreshold);
                imageResult.textContent = `RESULT: Mask Created Successfully (threshold: ${currentThreshold})`;
            }
        } catch (error) {
            imageResult.textContent = "ERROR: Failed to Process Image";
            console.error(error);
        }
    });
});
