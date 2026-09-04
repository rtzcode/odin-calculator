let operation = "";
let nums = ["", ""];

const operationBtnContainer = document.querySelector(".wrapper");
operationBtnContainer.addEventListener("click", (e) => {
	const id = e.target.id;
	if (id !== "ac" && id !== "equal") {
		return (operation = id);
	}
	// id === ac and equal are gonna have a function
});

const numbersBtnContainer = document.querySelector(".numbers");
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
