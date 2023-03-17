// gera uma cor aleatoria que não seja branco(funcionando)
const randomColorPalette = () => {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let index = 0; index < 6; index += 1) {
    color += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  if (color !== "#FFFFFF" && color !== "#000000") {
    return color;
  }
};
randomColorPalette();

// aloca cores aleatorias de forma automatica já na iniciaçização do browser em suas respectivas divs
const setColors = () => {
  // array que vai armanezar as cores recebidas em cada div
  const arrayColors = ["#000000"];
  for (let index = 2; index <= 4; index += 1) {
    const color = randomColorPalette();
    const divColors = document.getElementById(`color-${index}`);
    divColors.style.backgroundColor = color;
    arrayColors.push(color);
  }
  // transforma o array em string e armazena esse array dentro do local storage
  localStorage.setItem("colorPalette", JSON.stringify(arrayColors));
};

// aloca as cores geradas em suas respectivas divs a partir do evento click no botao cores aleatorias
const getButtonEvent = () => {
  const getButton = document.getElementById("button-random-color");
  getButton.addEventListener("click", setColors);
};
getButtonEvent();

// função que que gera um array com as cores iniciais brancas, usada pra salvar o local storage dentro de outras funçoẽs
const createEmptyBoard = (size) => {
  const array = [];
  for (let index = 0; index < size; index += 1) {
    array[index] = "white";
  }
  return array;
};

// captura o local onde quero criar minha grade
const grid = document.getElementById("pixel-board");
// cria grade de pixels 5x5
const createCells = (size) => {
  let array = [];
  const test = localStorage.getItem("pixelBoard");
  if (test !== null) {
    array = JSON.parse(test);
  } else {
    array = createEmptyBoard(size * size);
  }
  for (let index = 0; index < size * size; index += 1) {
    const elem = document.createElement("div");
    elem.className = "pixel";
    elem.id = index;
    grid.appendChild(elem);
    elem.style.backgroundColor = array[index];
  }
  const gridWidth = `${Math.ceil(Math.sqrt(array.length) * 42)}px`;
  grid.style.width = gridWidth;
  localStorage.setItem("boardSize", size);
};
createCells(localStorage.getItem("boardSize") || 5);
localStorage.getItem("boardSize");

const createCellsInput = (size) => {
  grid.innerHTML = "";
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

const buttonVqv = document.getElementById("generate-board");
// ativa botão vqv
buttonVqv.addEventListener("click", () => {
  const inputVqv = document.getElementById("board-size");
  createCellsInput(inputVqv.value);
});

//  função para selecionar uma cor na paleta de cores
const selectColor = () => {
  // captura os elementos de classe color na variavel color
  const color = document.getElementsByClassName("color");
  for (let index = 0; index < color.length; index += 1) {
    color[index].addEventListener("click", (event) => {
      const colorSelect = document.querySelector(".selected");
      if (colorSelect) {
        colorSelect.classList.remove("selected");
      }
      event.target.classList.add("selected");
    });
  }
};
selectColor();

// captura os elementos de clase pixel na varivel pixel
const pixel = document.querySelector("#pixel-board");
// função para selecionar pixel a ser pintado
const selectPixel = () => {
  pixel.addEventListener("click", (event) => {
    let arrayPixel = [];
    const test = localStorage.getItem("pixelBoard");
    if (test !== null) {
      arrayPixel = JSON.parse(test);
    } else {
      arrayPixel = createEmptyBoard(25);
    }
    console.log(arrayPixel);
    console.log(test);
    const pixelSelected = event.target;
    const colorSelected = document.querySelector(".selected");
    const colorPixel = window.getComputedStyle(colorSelected).backgroundColor;
    pixelSelected.style.backgroundColor = colorPixel;
    const index = event.target.id;
    arrayPixel[index] = colorPixel;
    localStorage.setItem("pixelBoard", JSON.stringify(arrayPixel));
  });
};
selectPixel();

// função para evento de click do  botão limpar, devolve a cor dos pixels de grid para branco
const clearButtonEvent = () => {
  const getClearButton = document.getElementById("clear-board");
  getClearButton.addEventListener("click", () => {
    const arrayWhite = createEmptyBoard(25);
    localStorage.setItem("pixelBoard", JSON.stringify(arrayWhite));
    const pixels = document.querySelectorAll(".pixel");
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.background = "white";
    }
  });
};
clearButtonEvent();

window.onload = () => {
  const getColorInLocalStorage = localStorage.getItem("colorPalette");
  const colors = getColorInLocalStorage
    ? JSON.parse(getColorInLocalStorage)
    : ["black", "red", "blue", "green"];
  const saveColorPalette = document.querySelectorAll(".color");
  console.log(localStorage.colorPalette);
  for (let index = 0; index < saveColorPalette.length; index += 1) {
    saveColorPalette[index].style.backgroundColor = colors[index];
  }
};
