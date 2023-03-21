// captura de elementos
const divColorPalette = document.querySelectorAll(".color");
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
  const arrayColors = ["#000000"];
  for (let index = 2; index <= 4; index += 1) {
    const color = generateRandomColor();
    const divColor = document.getElementById(`color-${index}`);
    divColor.style.backgroundColor = color;
    arrayColors.push(color);
  }
  localStorage.setItem("colorPalette", JSON.stringify(arrayColors));
};

// evento que gera as cores aleatorias
buttonRandomColor.addEventListener("click", setAndApplyRandomColor);

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

// seleciona cor na paleta de cores
const selectColor = () => {
  for (let index = 0; index < divColorPalette.length; index += 1) {
    divColorPalette[index].addEventListener("click", (event) => {
      const colorSelect = document.querySelector(".selected");
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
  }
};
createCells(5);
