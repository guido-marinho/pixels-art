// captura de elementos
const divColorPalette = document.querySelectorAll(".color");
const colorSelect = document.querySelector(".selected");
const buttonRandomColor = document.querySelector("#button-random-color");
const buttonClearBoard = document.querySelector("#clear-board");
const inputVqv = document.querySelector("#board-size");
const buttonVqv = document.querySelector("#generate-board");
const grid = document.querySelector("#pixel-board");

// gera cores aleatórias
const generateRandomColor = () => {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let index = 0; index < 6; index += 1) {
    color += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return color;
};

// aloca cores geradas na paleta de cores
const setAndApplyRandomColor = () => {
  const arrayColorsPalette = ["#000000"];
  for (let index = 2; index <= 4; index += 1) {
    const color = generateRandomColor();
    const divColor = document.getElementById(`color-${index}`);
    divColor.style.backgroundColor = color;
    arrayColorsPalette.push(color);
  }
  localStorage.setItem("colorPalette", JSON.stringify(arrayColorsPalette));
};

// evento que gera as cores aleatorias
buttonRandomColor.addEventListener("click", setAndApplyRandomColor);
// ativa botão vqv
buttonVqv.addEventListener("click", () => {
  const inputVqv = document.getElementById("board-size");
  createCellsInput(inputVqv.value);
});

// seleciona cor na paleta de cores
const selectColor = () => {
  for (let index = 0; index < divColorPalette.length; index += 1) {
    divColorPalette[index].addEventListener("click", (event) => {
      if (colorSelect) {
        colorSelect.classList.remove("selected");
      }
      event.target.classList.add("selected");
    });
  }
};
selectColor();

// gerador de divs 40px x 40px dentro da section borad size
const createCells = (size) => {
  for (let index = 0; index < size * size; index += 1) {
    const divPixelBoard = document.createElement("div");
    divPixelBoard.className = "pixel";
    divPixelBoard.id = index;
    grid.appendChild(divPixelBoard);
    divPixelBoard.style.backgroundColor = "white";
  }
};
createCells(5);

const createCellsInput = (size) => {
  grid.innerHTML = "white";
  if (size === "") {
    window.alert("Board inválido!");
    return;
  }
  if (size < 5) {
    return createCells(5);
  }
  if (size > 50) {
    return createCells(50);
  }
  createCells(size);
};

// colore os pixel de pixel board
const paintPixel = () => {
  grid.addEventListener("click", (event) => {
    const colorSelected = document.querySelector(".selected");
    // const index = event.target;
    const paint = colorSelected.style.backgroundColor;
    event.target.style.backgroundColor = paint;
  });
};
paintPixel();

// limpa o grid
const clearGrid = () => {
  const pixels = document.querySelectorAll(".pixel");
  buttonClearBoard.addEventListener("click", () => {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = "white";
    }
  });
};
clearGrid();

// salva o local storage da paleta de cores aleatorias
const localStoragePalette = () => {
  const colorInLocalStorage = localStorage.getItem("colorPalette");
  const colors = colorInLocalStorage
    ? JSON.parse(colorInLocalStorage)
    : ["black", "red", "blue", "green"];
  console.log(localStorage.colorPalette);
  for (let index = 0; index < divColorPalette.length; index += 1) {
    divColorPalette[index].style.backgroundColor = colors[index];
  }
};
localStoragePalette();
