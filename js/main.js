const parentDiv = document.querySelector("#parentDiv");
const resetButton = document.querySelector('#resetButton');

let rowNum = 16;
let colNum = 16;

function createGrid(rows, cols) {
	parentDiv.style.cssText = `grid-template-rows: repeat(${rows}, minmax(5px, 1fr))`;
	parentDiv.style.cssText = `grid-template-columns: repeat(${cols}, minmax(5px, 1fr))`;
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			let newGridDiv = document.createElement("div");
			newGridDiv.classList.add("grid-div");
			parentDiv.appendChild(newGridDiv);
		}
	}

	const divs = document.querySelectorAll(".grid-div");

	divs.forEach(div => {
		div.addEventListener('mouseover', changeBackground);
	})
}

// Creates randomized hex code for a color. All color possibilities are covered by this
function createRandomColor() {
	const hexParts = '0123456789ABCDEF';
	let color = '#';
	for (let i =0; i < 6; i++) {
		color += hexParts[Math.floor(Math.random() * 16)];
	}
	return color;
}

function changeBackground(e) {
	// e.currentTarget.classList.add("hover-div");
	let color = createRandomColor();
	let thisBackground = e.currentTarget.style.cssText;
	// If there's no background css Text at all
	if (!thisBackground) {
		// give this element a random color
		e.currentTarget.style.cssText = `background-color:${color};`;
		// else if it already has some random color
	} else {
		// if the background css text also has filter in it
		if (thisBackground.includes('filter')) {
			let brightnessLevel = Number(thisBackground.slice(-5,-2));
			//If there is a brightness value applied to the filter and it's not 0
			if (brightnessLevel) {
				brightnessLevel -= 0.1;
				// decrement the filter brightness by 0.1
				e.currentTarget.style.cssText += `filter:brightness(${brightnessLevel});`;
			}
			// else it hasn't been given a brightness filter yet, so apply the first level 
		} else {
			e.currentTarget.style.cssText += 'filter:brightness(0.9);';
		}
	}
}

function changeGrid(e) {
	while(parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.lastChild);
	}
	
	let newRows = prompt("Please provide a new number of grid rows <= 100:");
	let newCols = prompt("Please provide a new number of grid columns <= 100:");
	
	createGrid(newRows, newCols);
}

createGrid(rowNum, colNum)

resetButton.addEventListener('click', changeGrid);