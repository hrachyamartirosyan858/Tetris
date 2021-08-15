let tetrisArr = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

function isPieceGoingDownOk(arr) {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
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
        for (let i = 19; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                if (arr[i][j] === 1) {
                    arr[i + 1][j] = 1;
                    arr[i][j] = 0;
                }
            }
        }
        return arr;
    } else {
        for (let i = 19; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                if (arr[i][j] === 1) {
                    arr[i][j] = 2;
                }
            }
        }
    }
    return arr;
}

function isPieceGoingRightOk(arr) {
    for (let i = 0; i < 20; i++) {
        for (let j = 9; j >= 0; j--) {
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
        for (let i = 0; i < 20; i++) {
            for (let j = 9; j >= 0; j--) {
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
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
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
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                if (arr[i][j] === 1) {
                    arr[i][j] = 0;
                    arr[i][j - 1] = 1;
                }
            }
        }
    }
    return arr;
}

const button = document.querySelector(".button");

function renderItems(arr) {
    document.querySelector(".tetris-field").innerHTML = "";
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
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

button.addEventListener("click", renderItems(tetrisArr));

document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowRight") {
        pieceGoesRight(tetrisArr);
        renderItems(tetrisArr);
    } else if (event.code === "ArrowLeft") {
        pieceGoesLeft(tetrisArr);
        renderItems(tetrisArr);
    } else if (event.code === "ArrowDown") {
        pieceGoesDown(tetrisArr);
        renderItems(tetrisArr);
    }
})


const iBlock1 = [[1, 1, 1, 1]];

const iBlock2 = [[1], [1], [1], [1]];

const jBlock1 = [
    [1, 0, 0],
    [1, 1, 1]
];

const jBlock2 = [
    [1, 1],
    [1, 0],
    [1, 0]
];

const jBlock3 = [
    [1, 1, 1],
    [0, 0, 1]
];

const jBlock4 = [
    [0, 1],
    [0, 1],
    [1, 1]
];
const jBlockRotations = {
    jBlock2: {
        right: jBlock3,
        left: jBlock1
    }
};

const lBlock1 = [
    [0, 0, 1],
    [1, 1, 1]
];

const lBlock2 = [
    [1, 0],
    [1, 0],
    [1, 1]
];

const lBlock3 = [
    [1, 1, 1],
    [1, 0, 0]
];

const lBlock4 = [
    [1, 1],
    [0, 1],
    [0, 1]
];

const oBlock1 = [
    [1, 1],
    [1, 1]
]

const sBlock1 = [
    [0, 1, 1],
    [1, 1, 0]
];

const sBlock2 = [
    [1, 0],
    [1, 1],
    [0, 1]
];


const tBlock1 = [
    [0, 1, 0],
    [1, 1, 1],
];

const tBlock2 = [
    [1, 0],
    [1, 1],
    [1, 0]
];

const zBlock1 = [
    [1, 1, 0],
    [0, 1, 1]
];

const zBlock2 = [
    [0, 1],
    [1, 1],
    [1, 0]
];

function randomNumber() {
    const num = Math.floor(Math.random() * 7);
    return num;
}

const allFirstBlocks = [iBlock1, jBlock1, lBlock1, oBlock1, sBlock1, tBlock1, zBlock1];

function chooseRandomBlock() {
    const randomBlock = allFirstBlocks[Math.floor(Math.random() * 7)];
    for (let i = 0; i < randomBlock.length; i++) {
        for (let j = 0; j < randomBlock[0].length; j++) {
            tetrisArr[i][j + Math.round((10 - randomBlock[0].length) / 2)] = randomBlock[i][j]
        }
    }
}

function isChoosenRancomBlockImported() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            if (tetrisArr[i][j] === 1) {
                return false;
            }
        }
    }
    return true;
}

function importBlock() {
    if (isChoosenRancomBlockImported) {
        chooseRandomBlock();
    }
}
