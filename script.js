let operation = "";
let nums = ["", ""];

const operationBtnContainer = document.querySelector(".wrapper");
const numbersBtnContainer = document.querySelector(".numbers");
const allButtons = document.querySelector(".buttons-container");

const num0ToDisplay = document.querySelector("#num1");
const num1ToDisplay = document.querySelector("#num2");
const signToDisplay = document.querySelector("#actual-sign");

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
// To get operation, there are two event handlers for readability
document.addEventListener("keydown", (e) => {
	const possibleOperations = "+-*/";
	const pressedOperation = e.key;
	if (nums[0] !== "" && possibleOperations.includes(pressedOperation)) {
		operation = pressedOperation;
	}
});

document.addEventListener("keydown", (e) => {
	const possibleNums = "1234567890";
	const pressedNumber = e.key;
	if (possibleNums.includes(pressedNumber)) {
		nums[0] += pressedNumber;
	}
});
