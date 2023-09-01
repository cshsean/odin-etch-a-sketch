const grid = document.querySelector('#grid');
const resizeBtn = document.querySelector('#resize');
const RGBBtn = document.querySelector('#RGB');
const dmBtn = document.querySelector('#darkmode');
const clearBtn = document.querySelector('#clear');
var DARKMODE = false;
var isRGB = false;
var size = 16;

// Adding functions to buttons
resizeBtn.addEventListener('click', resizeGrid);
RGBBtn.addEventListener('click', toggleRGB);
dmBtn.addEventListener('click', toggleDM);
clearBtn.addEventListener('click', resetGrid);

// Changes entire website into dark mode
function toggleDM() {
    if (!DARKMODE) {
        DARKMODE = true;
        dmBtn.style.backgroundColor = '#0e3c88';
        document.querySelector('#bg').style.backgroundColor = 'black';
        document.querySelector('.container').style.border = '1px solid white';
        document.querySelector('.heading').style.color = 'white';
        document.querySelector('.copyright').style.color = 'white';
        let gridelement = document.querySelectorAll('.grid-element');
        for (let i = 0; i < gridelement.length; i++) {
            if (gridelement[i].style.backgroundColor == 'black') {
                gridelement[i].style.backgroundColor = 'white';
            }
            if (isRGB == false) {
                gridelement[i].removeEventListener('mouseover', darkenColor);
                gridelement[i].addEventListener('mouseover', whitenColor);
            } 
        }
    } else {
        DARKMODE = false;
        dmBtn.style.backgroundColor = '#3882f6';
        document.querySelector('#bg').style.backgroundColor = 'white';
        document.querySelector('.container').style.border = '1px solid black';
        document.querySelector('.heading').style.color = 'black';
        document.querySelector('.copyright').style.color = 'black';
        let gridelement = document.querySelectorAll('.grid-element');
        for (let i = 0; i < gridelement.length; i++) {
            if (gridelement[i].style.backgroundColor == 'white') {
                gridelement[i].style.backgroundColor = 'black';
            }
            if (isRGB == false) {
                gridelement[i].removeEventListener('mouseover', whitenColor);
                gridelement[i].addEventListener('mouseover', darkenColor);
            } 
        }
    }
}

// Toggle on/off for RGB
function toggleRGB() {
    clearGrid();
    if (!isRGB) {
        isRGB = true;
        RGBBtn.style.backgroundColor = '#0e3c88';
    } else {
        isRGB = false;
        RGBBtn.style.backgroundColor = '#3882f6';
    }
    createGrid(size);
}

// Resets the canvas
function resetGrid() {
    clearGrid();
    createGrid(size);
}

// Changes the size of grid
function resizeGrid() {
    var sizeInput = prompt('Size?');
    while (!(sizeInput <= 100) || !(sizeInput >= 4)) {
        var sizeInput = prompt('Size?');
    }
    size = sizeInput
    clearGrid();
    createGrid(size);
}

// Generates a random color for each div
function RGB() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.style.backgroundColor = color;
}

// Clear grid only
function clearGrid() {
    grid.innerHTML = '';
}

// Create grids
function createGrid(size) {
    grid.style.display = 'grid'
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0 ; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        if (isRGB == false && DARKMODE == false) {
            gridElement.removeEventListener('mouseover', RGB);
            gridElement.addEventListener('mouseover', darkenColor);
        } else if (isRGB == true && DARKMODE == false) {
            gridElement.removeEventListener('mouseover', darkenColor);
            gridElement.addEventListener('mouseover', RGB);
        } else if (isRGB == false && DARKMODE == true) {
            gridElement.removeEventListener('mouseover', RGB);
            gridElement.addEventListener('mouseover', whitenColor)
        } else if (isRGB == true && DARKMODE == true) {
            gridElement.removeEventListener('mouseover', whitenColor);
            gridElement.addEventListener('mouseover', RGB);
        }
        grid.appendChild(gridElement);
    }
}

// Darkens color of each square
function darkenColor() {
    this.style.backgroundColor = 'black';
}

// Whitens color of each square
function whitenColor() {
    this.style.backgroundColor = 'white';
}

// Creates grid when page is first loaded
createGrid(size);