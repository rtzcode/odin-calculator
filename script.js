let operation = "";
let resultOpe;
let nums = ["", ""];

const num0ToDisplay = document.querySelector("#num1");
const num1ToDisplay = document.querySelector("#num2");
const signToDisplay = document.querySelector("#actual-sign");

const operationBtnContainer = document.querySelector(".wrapper");
const numbersBtnContainer = document.querySelector(".numbers");
const allButtons = document.querySelector(".buttons-container");

document
	.querySelectorAll("button")
	.forEach((button) =>
		button.addEventListener("mousedown", (e) => e.preventDefault()),
	);

operationBtnContainer.addEventListener("click", (e) => {
	const pressedOperation = e.target.textContent;
	const isItContainer =
		e.target.classList.contains("buttons") ||
		e.target.classList.contains("wrapper");
	if (!isItContainer) {
		if (!operation && !nums[0]) {
			displayReset();
			num0ToDisplay.textContent = "Enter some digits";
		}
		if (
			nums[0] &&
			!nums[1] &&
			pressedOperation !== "Ac" &&
			pressedOperation !== "="
		) {
			operation = e.target.textContent;
			displayDigits("sign");
		}
		if (
			nums[0] &&
			nums[1] &&
			operation &&
			pressedOperation !== "Ac" &&
			pressedOperation !== "="
		) {
			let result = calculate(operation, nums);
			if (typeof result !== "undefined") {
				if (Number.isInteger(result)) {
					nums = [`${result}`, ""];
				} else {
					nums = [`${result.toFixed(2)}`, ""];
				}
				displayReset();
				displayDigits("sign");
				operation = e.target.textContent;
			} else if (typeof result === "undefined") {
				operation = "";
				nums = ["", ""];
				displayReset();
				num0ToDisplay.textContent = `You can't divide by 0`;
			}
		} else if (pressedOperation === "=" && nums[1]) {
			resultOpe = calculate(operation, nums);
			if (typeof resultOpe !== "undefined") {
				operation = "";
				nums = ["", ""];
				displayReset();
				if (Number.isInteger(resultOpe)) {
					num0ToDisplay.textContent = `${resultOpe}`;
				} else {
					num0ToDisplay.textContent = `${resultOpe.toFixed(2)}`;
				}
			} else if (typeof resultOpe === "undefined") {
				operation = "";
				nums = ["", ""];
				displayReset();
				num0ToDisplay.textContent = `You can't divide by 0`;
			}
		} else if (pressedOperation === "Ac") {
			nums = ["", ""];
			operation = "";
			displayReset();
			num0ToDisplay.textContent = "0";
		}
	}
});

numbersBtnContainer.addEventListener("click", (e) => {
	const id = e.target.id;
	if (id !== "float" && id !== "backspace") {
		const isItContainer = e.target.classList.contains("numbers");
		let pressedNumber = e.target.textContent;
		if (!isItContainer && !operation) {
			nums[0] += pressedNumber;
			displayDigits("num0");
		} else if (!isItContainer && operation) {
			nums[1] += pressedNumber;
			displayDigits("num1");
		}
	} else if (id === "backspace") {
		deleteNumber();
	} else if (id === "float") {
		if (!operation && !nums[1] && !nums[0].includes(".")) {
			if (nums[0].length === 0) {
				nums[0] += "0.";
				displayDigits("num0");
			} else {
				nums[0] += ".";
				displayDigits("num0");
			}
		}
		if (operation && !nums[1].includes(".")) {
			if (nums[1].length === 0) {
				nums[1] += "0.";
				displayDigits("num1");
			} else {
				nums[1] += ".";
				displayDigits("num1");
			}
		}
	}
});

document.addEventListener("keydown", (e) => {
	const possibleOperations = "+-*/";
	const pressedOperation = e.key;
	if (!nums[0] && !operation && !nums[1]) {
		displayReset();
		num0ToDisplay.textContent = "Enter some digits";
	}
	if (
		nums[0] !== "" &&
		!nums[1] &&
		possibleOperations.includes(pressedOperation)
	) {
		operation = pressedOperation;
		displayDigits("sign");
	}
	if (pressedOperation === "Backspace") {
		deleteNumber();
	}
	if (nums[0] && nums[1] && possibleOperations.includes(pressedOperation)) {
		let result = calculate(operation, nums);
		if (typeof result !== "undefined") {
			if (Number.isInteger(result)) {
				nums = [`${result}`, ""];
			} else {
				nums = [`${result.toFixed(2)}`, ""];
			}

			operation = pressedOperation;
			displayReset();
			displayDigits("sign");
		} else if (typeof result === "undefined") {
			operation = "";
			nums = ["", ""];
			displayReset();
			num0ToDisplay.textContent = `You can't divide by 0`;
		}
	}
	if (pressedOperation === "Enter" && nums[1] && operation) {
		nums = nums.map((string) => +string);
		resultOpe = calculate(operation, nums);
		if (typeof resultOpe !== "undefined") {
			operation = "";
			nums = ["", ""];
			displayReset();
			if (Number.isInteger(resultOpe)) {
				num0ToDisplay.textContent = `${resultOpe}`;
			} else {
				num0ToDisplay.textContent = `${resultOpe.toFixed(2)}`;
			}
		} else if (typeof resultOpe === "undefined") {
			operation = "";
			nums = ["", ""];
			displayReset();
			num0ToDisplay.textContent = `You can't divide by 0`;
		}
	}
	if (pressedOperation === ".") {
		if (!operation && !nums[1] && !nums[0].includes(".")) {
			if (nums[0].length === 0) {
				nums[0] += "0.";
				displayDigits("num0");
			} else {
				nums[0] += ".";
				displayDigits("num0");
			}
		}
		if (operation && !nums[1].includes(".")) {
			if (nums[1].length === 0) {
				nums[1] += "0.";
				displayDigits("num1");
			} else {
				nums[1] += ".";
				displayDigits("num1");
			}
		}
	}
});

document.addEventListener("keydown", (e) => {
	const possibleNums = "1234567890";
	const pressedNumber = e.key;
	if (!operation && possibleNums.includes(pressedNumber)) {
		nums[0] += pressedNumber;
		displayDigits("num0");
	} else if (operation && possibleNums.includes(pressedNumber)) {
		nums[1] += pressedNumber;
		displayDigits("num1");
	}
});

function deleteNumber() {
	if (nums[1]) {
		nums[1] = nums[1].slice(0, nums[1].length - 1);
		displayDigits("num1");
	} else if (!nums[1] && operation) {
		operation = "";
		displayDigits("sign");
	} else if (!operation && !nums[1]) {
		nums[0] = nums[0].slice(0, nums[0].length - 1);
		displayDigits("num0");
		if (nums[0] === "") {
			num0ToDisplay.textContent = "0";
		}
	}
}

function displayDigits(change) {
	if (change === "num0") num0ToDisplay.textContent = nums[0];
	else if (change === "num1") num1ToDisplay.textContent = nums[1];
	else if (change === "sign") signToDisplay.textContent = operation;
}

function displayReset() {
	num0ToDisplay.textContent = nums[0];
	num1ToDisplay.textContent = "";
	signToDisplay.textContent = "";
}

function calculate(operation, nums) {
	nums = nums.map((string) => +string);
	if (nums[1]) {
		switch (operation) {
			case "+":
				return nums.reduce((res, next) => res + next);
				break;
			case "-":
				return nums.reduce((res, next) => res - next);
				break;
			case "*":
				return nums.reduce((res, next) => res * next);
				break;
			case "/":
				return nums.reduce((res, next) => res / next);
				break;
		}
	}
}
