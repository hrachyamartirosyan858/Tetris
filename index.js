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

const tetrisArrLength = 20;
const tetrisArrLineLength = 10;
let playerScore = 0;
let currentBlock;
let previousBlock;
let fistLevel;
let blockIndexI = 0;
let blockIndexJTopLeft = 0;
let blockIndexJTopRight = 0;
let pauseClickCounter = 2;

function render() {
    renderGameStart();
    renderPieceRotate();
    renderPieceMove();
    renderGamePause();
}


function renderPieceRotate() {
    document.addEventListener("keydown", pieceRotate);
}

function renderPieceMove() {
    document.addEventListener("keydown", pieceMove);
}

function renderGameStart() {

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

        document.querySelector(".game-over").classList.remove("unhide");
        document.querySelector(".game-over").classList.add("hide");
        document.querySelector(".pause-button").classList.remove("hidden");
        playerScore = 0;
        document.querySelector(".score").innerText = `score: ${playerScore} pts`;
        importBlock();
        document.addEventListener("keydown", pieceMove);
        document.addEventListener("keydown", pieceRotate);
        blockIndexI = 0;
        clearInterval(fistLevel);
        fistLevel = setInterval(down, 1000);
        if (pauseClickCounter % 2 !== 0) {
            document.querySelector(".game-paused").classList.remove("unhide");
            document.querySelector(".game-paused").classList.add("hide");
            document.querySelector(".pause-button").value = "PAUSE";
            pauseClickCounter += 1;
        }
    }

    document.querySelector(".start-button").addEventListener("click", startNewGame);
}

function renderGamePause() {

    function gamePauseResume() {
        if (pauseClickCounter % 2 === 0) {
            clearInterval(fistLevel);
            document.removeEventListener("keydown", pieceMove);
            document.removeEventListener("keydown", pieceRotate);
            document.querySelector(".game-paused").classList.add("unhide");
            document.querySelector(".game-paused").classList.remove("hide");
            document.querySelector(".pause-button").value = "RESUME";
            pauseClickCounter += 1;
        } else {
            fistLevel = setInterval(down, 1000);
            document.addEventListener("keydown", pieceMove);
            document.addEventListener("keydown", pieceRotate);
            document.querySelector(".game-paused").classList.remove("unhide");
            document.querySelector(".game-paused").classList.add("hide");
            document.querySelector(".pause-button").value = "PAUSE";
            pauseClickCounter += 1;
        }
    }

    document.querySelector(".pause-button").addEventListener("click", gamePauseResume);
}

function gameOver() {
    document.querySelector(".game-over").classList.add("unhide");
    document.querySelector(".game-over").classList.remove("hide");
    document.querySelector(".pause-button").classList.add("hidden");
    clearInterval(fistLevel);
    document.removeEventListener("keydown", pieceMove);
    document.removeEventListener("keydown", pieceRotate);
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
        removeLineFromArr();
        importBlock();
    }
    return arr;
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

function renderItems(arr) {
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

function pieceMove(target) {
    if (target.code === "ArrowRight") {
        pieceGoesRight(tetrisArr);
        renderItems(tetrisArr);
        if (blockIndexJTopLeft + currentBlock[0].length < 10) {
            blockIndexJTopLeft += 1;
            blockIndexJTopRight += 1;
        }
    } else if (target.code === "ArrowLeft") {
        pieceGoesLeft(tetrisArr);
        renderItems(tetrisArr);
        if (blockIndexJTopLeft > 0) {
            blockIndexJTopLeft -= 1;
            blockIndexJTopRight -= 1;
        }
    } else if (target.code === "ArrowDown") {
        pieceGoesDown(tetrisArr);
        playerScore += 10;
        document.querySelector(".score").innerText = `score: ${playerScore} pts`;
        renderItems(tetrisArr);
        blockIndexI += 1;
    }
}

const allFirstBlocks = [iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock];

let randomBlockArrs = [];
let randomBlockArraysField = [];

randomBlockArrs[0] = (allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);
randomBlockArrs[1] = (allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);
randomBlockArrs[2] = (allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);

function chooseRandomBlock() {
    const randomBlock = randomBlockArrs[0];
    randomBlockArrs.shift();

    currentBlock = randomBlock;
    for (let i = 0; i < currentBlock.length; i++) {
        for (let j = 0; j < currentBlock[0].length; j++) {
            const index = Math.floor((tetrisArrLineLength - currentBlock[0].length) / 2);
            blockIndexJTopLeft = index;
            blockIndexJTopRight = index + currentBlock[0].length - 1;
            if (tetrisArr[i][j + index] === 2) {
                gameOver();
            } else {
                tetrisArr[i][j + index] = currentBlock[i][j];
            }
        }
    }
    randomBlockArrs.push(allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)]);
    inputRandomBlocks();
    renderFutureItems(randomBlockArraysField);
}

function inputRandomBlocks() {
    randomBlockArraysField = [];
    for (let i = 0; i < 3; i++) {
        randomBlockArraysField.push(0, 0, 0, 0, 0);
        for (let j = 0; j < randomBlockArrs[i].length; j++) {
            randomBlockArraysField.push(0);
            for (let k = 0; k < 4; k++) {
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

function renderFutureItems(arr) {
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

function isRotateOk() {
    if (blockIndexJTopLeft < 7) {
        for (let i = 0; i < currentBlock.length; i++) {
            for (let j = 0; j < currentBlock[0].length; j++) {
                if (tetrisArr[i + blockIndexI][j + blockIndexJTopLeft] === 2) {
                    currentBlock = previousBlock.reverse();
                    return false;
                }
            }
        }
    } else {
        for (let i = 0; i < currentBlock.length; i++) {
            for (let j = currentBlock[0].length - 1; j >= 0; j--) {
                if (tetrisArr[i + blockIndexI][blockIndexJTopRight - j] === 2) {
                    currentBlock = previousBlock.reverse();
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
        if (blockIndexJTopLeft < 7) {
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
    if (blockIndexJTopRight > 6) {
        blockIndexJTopLeft = blockIndexJTopRight - (currentBlock[0].length - 1);
    } else {
        blockIndexJTopRight = blockIndexJTopLeft + currentBlock[0].length - 1;
    }
}

function pieceRotate(target) {
    if (target.code === "ArrowUp") {
        rotateCurrentBlock();
        isRotateOk();
        clearTetrisArr();
        imputNewCurrentBlock();
        renderItems(tetrisArr);
    }
}

function isChoosenRancomBlockImported() {
    for (let i = 0; i < tetrisArrLength; i++) {
        for (let j = 0; j < tetrisArrLineLength; j++) {
            if (tetrisArr[i][j] === 1) {
                return false;
            }
        }
    }
    return true;
}

function importBlock() {
    if (isChoosenRancomBlockImported()) {
        chooseRandomBlock();
        renderItems(tetrisArr);
    }
}

function removeLineFromArr() {
    const emptyTopLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = tetrisArrLength - 1; i >= 0; i--) {
        let jLineSum = 0;
        for (let j = 0; j < tetrisArrLineLength; j++) {
            jLineSum += tetrisArr[i][j];
        }
        if (jLineSum === 20) {
            tetrisArr.splice(i, 1);
            playerScore += 100;
            document.querySelector(".score").innerText = `score: ${playerScore} pts`;
        }
    }
    while (tetrisArr.length < tetrisArrLength) {
        tetrisArr.unshift(emptyTopLine);
    }
    return tetrisArr;
}

function down() {
    pieceGoesDown(tetrisArr);
    renderItems(tetrisArr);
    blockIndexI += 1;
    // debbugerFunc();
};

function debbugerFunc() {
    let innerBlockCount = 0;
    let currentBlockCount = 0;
    for (let i = 0; i < tetrisArrLength; i++) {
        for (let j = 0; j < tetrisArrLineLength; j++) {
            if (tetrisArr[i][j] === 1) {
                innerBlockCount++;
            }
        }
    }
    for (let i = 0; i < currentBlock.length; i++) {
        for (let j = 0; j < currentBlock[i].length; j++) {
            if (tetrisArr[i][j] === 1) {
                currentBlockCount++;
            }
        }
    }
    if (innerBlockCount !== currentBlockCount) {
        debugger;
    }
}

render();
