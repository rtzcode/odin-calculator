let operation = "";
let nums = ["", ""];

const num0ToDisplay = document.querySelector("#num1");
const num1ToDisplay = document.querySelector("#num2");
const signToDisplay = document.querySelector("#actual-sign");

const operationBtnContainer = document.querySelector(".wrapper");
const numbersBtnContainer = document.querySelector(".numbers");
const allButtons = document.querySelector(".buttons-container");

operationBtnContainer.addEventListener("click", (e) => {
	const id = e.target.id;
	// num[0] can't be empty before selecting a operation
	if (nums[0] !== "" && id !== "ac" && id !== "equal") {
		return (operation = id);
	}
	// id === ac and equal are gonna have a function
});

numbersBtnContainer.addEventListener("click", (e) => {
	const id = e.target.id;
	if (id !== "float" && id !== "backspace") {
		const isItContainer = e.target.classList.contains("numbers");
		if (!isItContainer) {
			let pressedNumber = e.target.textContent;
			nums[0] += pressedNumber;
		}
	}
});

document.addEventListener("keydown", (e) => {
	const possibleOperations = "+-*/";
	const pressedOperation = e.key;
	if (
		nums[0] !== "" &&
		!nums[1] &&
		possibleOperations.includes(pressedOperation)
	) {
		operation = pressedOperation;
		displayDigits("sign");
	}
});

document.addEventListener("keydown", (e) => {
	const possibleNums = "1234567890";
	const pressedNumber = e.key;
	if (!operation && possibleNums.includes(pressedNumber)) {
		nums[0] += pressedNumber;
		displayDigits("num0");
	}
	if (operation && possibleNums.includes(pressedNumber)) {
		nums[1] += pressedNumber;
		displayDigits("num1");
	}
});

function displayDigits(change) {
	if (change === "num0") num0ToDisplay.textContent = nums[0];
	if (change === "num1") num1ToDisplay.textContent = nums[1];
	if (change === "sign") signToDisplay.textContent = operation;
}
