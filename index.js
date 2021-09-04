let tetrisArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const iBlock = [[1, 1, 1, 1]];

const jBlock = [
    [1, 0, 0],
    [1, 1, 1]
];

const lBlock = [
    [0, 0, 1],
    [1, 1, 1]
];

const oBlock = [
    [1, 1],
    [1, 1]
]

const sBlock = [
    [0, 1, 1],
    [1, 1, 0]
];

const tBlock = [
    [0, 1, 0],
    [1, 1, 1],
];

const zBlock = [
    [1, 1, 0],
    [0, 1, 1]
];

const allFirstBlocks = [iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock];
const tetrisArrLength = 20;
const tetrisArrLineLength = 10;
const tetrisArrRightPartIndex = 7;
const rotateButton = document.querySelector(".rotate-button");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const downButton = document.querySelector(".down-button");
let playerScore = 0;
let currentBlock;
let previousBlock;
let fistLevel;
let blockIndexI = 0;
let blockIndexJTopLeft = 0;
let blockIndexJTopRight = 0;
let isPlaying = false;
let randomBlockArrs = [];
let randomBlockArraysField = [];

function startNewGame() {
    tetrisArr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    isPlaying = true;
    renderGameUnpaused();
    playerScore = 0;
    renderScoring();
    blockIndexI = 0;
    importBlock();
    clearInterval(fistLevel);
    fistLevel = setInterval(down, 1000);
    renderGameStart();
    renderPauseButton();
}

function gamePauseResume() {
    if (isPlaying) {
        clearInterval(fistLevel);
        renderGamePaused();
        isPlaying = false;
    } else {
        fistLevel = setInterval(down, 1000);
        renderGameUnpaused();
        isPlaying = true;
    }
}

function gameOver() {
    clearInterval(fistLevel);
    renderGameOver();
}

function isPieceGoingDownOk(arr) {
    for (let i = 0; i < tetrisArrLength; i++) {
        for (let j = 0; j < tetrisArrLineLength; j++) {
            if (arr[i][j] === 1) {
                if (arr[i + 1] === undefined || arr[i + 1][j] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function pieceGoesDown(arr) {
    if (isPieceGoingDownOk(arr)) {
        for (let i = tetrisArrLength - 1; i >= 0; i--) {
            for (let j = 0; j < tetrisArrLineLength; j++) {
                if (arr[i][j] === 1) {
                    arr[i][j] = 0;
                    arr[i + 1][j] = 1;
                }
            }
        }
        return arr;
    } else {
        for (let i = tetrisArrLength - 1; i >= 0; i--) {
            for (let j = 0; j < tetrisArrLineLength; j++) {
                if (arr[i][j] === 1) {
                    arr[i][j] = 2;
                    blockIndexI = 0;
                }
            }
        }
    }
}

function isPieceGoingRightOk(arr) {
    for (let i = 0; i < tetrisArrLength; i++) {
        for (let j = tetrisArrLineLength - 1; j >= 0; j--) {
            if (arr[i][j] === 1) {
                if (arr[i][j + 1] === undefined || arr[i][j + 1] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function pieceGoesRight(arr) {
    if (isPieceGoingRightOk(arr)) {
        for (let i = 0; i < tetrisArrLength; i++) {
            for (let j = tetrisArrLineLength - 1; j >= 0; j--) {
                if (arr[i][j] === 1) {
                    arr[i][j] = 0;
                    arr[i][j + 1] = 1;
                }
            }
        }
    }
    return arr;
}

function isPieceGoingLeftOk(arr) {
    for (let i = 0; i < tetrisArrLength; i++) {
        for (let j = 0; j < tetrisArrLineLength; j++) {
            if (arr[i][j] === 1) {
                if (arr[i][j - 1] === undefined || arr[i][j - 1] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function pieceGoesLeft(arr) {
    if (isPieceGoingLeftOk(arr)) {
        for (let i = 0; i < tetrisArrLength; i++) {
            for (let j = 0; j < tetrisArrLineLength; j++) {
                if (arr[i][j] === 1) {
                    arr[i][j] = 0;
                    arr[i][j - 1] = 1;
                }
            }
        }
    }
    return arr;
}

function moveLeft() {
    pieceGoesLeft(tetrisArr);
    renderTetrisArr(tetrisArr);
    if (blockIndexJTopLeft > 0) {
        blockIndexJTopLeft -= 1;
        blockIndexJTopRight -= 1;
    }
}

function moveRight() {
    pieceGoesRight(tetrisArr);
    renderTetrisArr(tetrisArr);
    if (blockIndexJTopLeft + currentBlock[0].length < 10) {
        blockIndexJTopLeft += 1;
        blockIndexJTopRight += 1;
    }
}

function moveDown() {
    pieceGoesDown(tetrisArr);
    if (!isImportChoosenRandomBlock()) {
        playerScore += 10;
    }
    renderScoring();
    renderTetrisArr(tetrisArr);
    blockIndexI += 1;
}

function pieceMove(event) {
    if (event.code === "ArrowRight") {
        moveRight();
    } else if (event.code === "ArrowLeft") {
        moveLeft();
    } else if (event.code === "ArrowDown") {
        moveDown();
    }
}

function rotate() {
    rotateCurrentBlock();
    isRotateOk();
    clearTetrisArr();
    imputNewCurrentBlock();
    renderTetrisArr(tetrisArr);
}

function pieceRotate(event) {
    if (event.code === "ArrowUp") {
        rotate();
    }
}

randomBlockArrs[0] = (allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);
randomBlockArrs[1] = (allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);
randomBlockArrs[2] = (allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);

function inputRandomBlocks() {
    randomBlockArraysField = [];
    const anyStartBlockMaxLength = 3;
    const anyStartBlockMaxWidth = 4;
    for (let i = 0; i < anyStartBlockMaxLength; i++) {
        randomBlockArraysField.push(0, 0, 0, 0, 0);
        for (let j = 0; j < randomBlockArrs[i].length; j++) {
            randomBlockArraysField.push(0);
            for (let k = 0; k < anyStartBlockMaxWidth; k++) {
                if (randomBlockArrs[i][j][k] === undefined) {
                    randomBlockArraysField.push(0);
                } else {
                    randomBlockArraysField.push(randomBlockArrs[i][j][k]);
                }
            }
        }
    }
    randomBlockArraysField.push(0, 0, 0, 0, 0);
}

function isRotateOk() {
    if (blockIndexJTopLeft < tetrisArrRightPartIndex) {
        for (let i = 0; i < currentBlock.length; i++) {
            for (let j = 0; j < currentBlock[0].length; j++) {
                if (tetrisArr[i + blockIndexI][j + blockIndexJTopLeft] === 2) {
                    return false;
                }
            }
        }
    } else {
        for (let i = 0; i < currentBlock.length; i++) {
            for (let j = currentBlock[0].length - 1; j >= 0; j--) {
                if (tetrisArr[i + blockIndexI][blockIndexJTopRight - j] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
}

function clearTetrisArr() {
    if (isRotateOk()) {
        for (let i = tetrisArrLength - 1; i >= 0; i--) {
            for (let j = 0; j < tetrisArrLineLength; j++) {
                if (tetrisArr[i][j] === 1) {
                    tetrisArr[i][j] = 0;
                }
            }
        }
    }
}

function imputNewCurrentBlock() {
    if (isRotateOk()) {
        if (blockIndexJTopLeft < tetrisArrRightPartIndex) {
            for (let i = 0; i < currentBlock.length; i++) {
                for (let j = 0; j < currentBlock[0].length; j++) {
                    tetrisArr[i + blockIndexI][j + blockIndexJTopLeft] = currentBlock[i][j];
                }
            }
        } else {
            for (let i = 0; i < currentBlock.length; i++) {
                for (let j = currentBlock[0].length - 1; j >= 0; j--) {
                    tetrisArr[i + blockIndexI][blockIndexJTopRight - j] = currentBlock[i][currentBlock[0].length - 1 - j];
                }
            }
        }
    } else {
        currentBlock = previousBlock.reverse();
    }

}

function rotateCurrentBlock() {
    currentBlock.reverse();
    let resultArr = [];
    for (let i = 0; i < currentBlock[0].length; i++) {
        resultArr.push([]);
        for (let j = 0; j < currentBlock.length; j++) {
            resultArr[i][j] = currentBlock[j][i];
        }
    }
    previousBlock = currentBlock;
    currentBlock = resultArr;
    const blockIndexTopCorrectorIndex = 6;
    const currentBlockWidth = currentBlock[0].length - 1;
    if (blockIndexJTopRight > blockIndexTopCorrectorIndex) {
        blockIndexJTopLeft = blockIndexJTopRight - currentBlockWidth;
    } else {
        blockIndexJTopRight = blockIndexJTopLeft + currentBlockWidth;
    }
}

function isImportChoosenRandomBlock() {
    for (let i = 0; i < tetrisArrLength; i++) {
        for (let j = 0; j < tetrisArrLineLength; j++) {
            if (tetrisArr[i][j] === 1 || tetrisArr.length !== tetrisArrLength) {
                return false;
            }
        }
    }
    return true;
}

function chooseRandomBlock() {
    const randomBlock = randomBlockArrs[0];
    randomBlockArrs.shift();
    currentBlock = randomBlock;
    const blockImportIndex = Math.floor((tetrisArrLineLength - currentBlock[0].length) / 2);
    for (let i = 0; i < currentBlock.length; i++) {
        for (let j = 0; j < currentBlock[0].length; j++) {
            blockIndexJTopLeft = blockImportIndex;
            blockIndexJTopRight = blockImportIndex + currentBlock[0].length - 1;
            if (tetrisArr[i][j + blockImportIndex] === 2) {
                gameOver();
            } else {
                tetrisArr[i][j + blockImportIndex] = currentBlock[i][j];
                blockIndexI = 0;
            }
        }
    }
    randomBlockArrs.push(allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);
    inputRandomBlocks();
    renderNextItems(randomBlockArraysField);
}

function importBlock() {
    if (isImportChoosenRandomBlock()) {
        chooseRandomBlock();
        renderTetrisArr(tetrisArr);
    }
}

function removeLineFromArr() {
    const jLineMaxSum = 20;
    let jLineSum = 0;
    for (let i = 0; i < tetrisArrLength; i++) {
        const emptyTopLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let j = 0; j < tetrisArrLineLength; j++) {
            jLineSum += tetrisArr[i][j];
        }
        if (jLineSum === jLineMaxSum) {
            tetrisArr.splice(i, 1);
            tetrisArr.unshift(emptyTopLine);
            playerScore += 100;
            renderScoring();
            jLineSum = 0;
        }
        jLineSum = 0;
    }
}

function down() {
    pieceGoesDown(tetrisArr);
    removeLineFromArr();
    importBlock();
    renderTetrisArr(tetrisArr);
    blockIndexI += 1;

};

function renderPauseButton() {
    document.querySelector(".pause-button").classList.remove("hidden");
}

function renderScoring() {
    document.querySelector(".score").innerText = `score: ${playerScore} pts`;
}

function renderGameStart() {
    document.querySelector(".start-button").addEventListener("click", startNewGame);
    document.querySelector(".game-over").classList.remove("unhide");
    document.querySelector(".game-over").classList.add("hide");
    rotateButton.addEventListener("click", rotate);
    leftButton.addEventListener("click", moveLeft);
    rightButton.addEventListener("click", moveRight);
    downButton.addEventListener("click", moveDown);
    document.querySelector(".pause-button").addEventListener("click", gamePauseResume);
    document.addEventListener("keydown", pieceMove);
    document.addEventListener("keydown", pieceRotate);
}

function renderGamePaused() {
    document.removeEventListener("keydown", pieceMove);
    document.removeEventListener("keydown", pieceRotate);
    rotateButton.removeEventListener("click", rotate);
    leftButton.removeEventListener("click", moveLeft);
    rightButton.removeEventListener("click", moveRight);
    downButton.removeEventListener("click", moveDown);
    document.querySelector(".game-paused").classList.add("unhide");
    document.querySelector(".game-paused").classList.remove("hide");
    document.querySelector(".pause-button").value = "RESUME";
}

function renderGameUnpaused() {
    document.addEventListener("keydown", pieceMove);
    document.addEventListener("keydown", pieceRotate);
    rotateButton.addEventListener("click", rotate);
    leftButton.addEventListener("click", moveLeft);
    rightButton.addEventListener("click", moveRight);
    downButton.addEventListener("click", moveDown);
    document.querySelector(".game-paused").classList.remove("unhide");
    document.querySelector(".game-paused").classList.add("hide");
    document.querySelector(".pause-button").value = "PAUSE";
}

function renderGameOver() {
    document.querySelector(".game-over").classList.add("unhide");
    document.querySelector(".game-over").classList.remove("hide");
    document.querySelector(".pause-button").classList.add("hidden");
    rotateButton.removeEventListener("click", rotate);
    leftButton.removeEventListener("click", moveLeft);
    rightButton.removeEventListener("click", moveRight);
    downButton.removeEventListener("click", moveDown);
    document.removeEventListener("keydown", pieceMove);
    document.removeEventListener("keydown", pieceRotate);
}

function renderTetrisArr(arr) {
    document.querySelector(".tetris-field").innerHTML = "";
    for (let i = 0; i < tetrisArrLength; i++) {
        for (let j = 0; j < tetrisArrLineLength; j++) {
            if (arr[i][j] === 0) {
                const div = document.createElement("div");
                div.classList.add("white");
                document.querySelector(".tetris-field").append(div);
            } else if (arr[i][j] === 1) {
                const div = document.createElement("div");
                div.classList.add("red");
                document.querySelector(".tetris-field").append(div);
            } else if (arr[i][j] === 2) {
                const div = document.createElement("div");
                div.classList.add("black");
                document.querySelector(".tetris-field").append(div);
            }
        }
    }
}

function renderNextItems(arr) {
    document.querySelector(".future-blocks-field").innerHTML = "";
    for (let i = 0; i < randomBlockArraysField.length; i++) {
        if (arr[i] === 0) {
            const div = document.createElement("div");
            div.classList.add("white");
            document.querySelector(".future-blocks-field").append(div);
        } else if (arr[i] === 1) {
            const div = document.createElement("div");
            div.classList.add("red");
            document.querySelector(".future-blocks-field").append(div);
        }
    }
}


renderGameStart();