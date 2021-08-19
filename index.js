
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

// renderItems(tetrisArr);
document.querySelector(".start-button").addEventListener("click", function () {
    const tetrisArrLength = 20;
    const tetrisArrLineLength = 10;
    let playerScore = 0;

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
                        arr[i + 1][j] = 1;
                        arr[i][j] = 0;
                    }
                }
            }
            return arr;
        } else {
            for (let i = tetrisArrLength - 1; i >= 0; i--) {
                for (let j = 0; j < tetrisArrLineLength; j++) {
                    if (arr[i][j] === 1) {
                        arr[i][j] = 2;
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

    function pieseMove(target) {
        if (target.code === "ArrowRight") {
            pieceGoesRight(tetrisArr);
            renderItems(tetrisArr);
        } else if (target.code === "ArrowLeft") {
            pieceGoesLeft(tetrisArr);
            renderItems(tetrisArr);
        } else if (target.code === "ArrowDown") {
            pieceGoesDown(tetrisArr);
            playerScore += 10;
            document.querySelector(".score").innerText = `score: ${playerScore} pts`;
            renderItems(tetrisArr);
        }
    }

    document.addEventListener("keydown", pieseMove);


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
        const randomBlock = allFirstBlocks[Math.floor(Math.random() * allFirstBlocks.length)];
        for (let i = 0; i < randomBlock.length; i++) {
            for (let j = 0; j < randomBlock[0].length; j++) {
                const index = Math.floor((tetrisArrLineLength - randomBlock[0].length) / 2);
                if (tetrisArr[i][j + index] === 2) {
                    document.querySelector(".game-over").classList.add("unhide");
                    document.querySelector(".game-over").classList.remove("hide");
                    document.removeEventListener("keydown", pieseMove);
                    clearInterval(fistLevel);
                } else {
                    tetrisArr[i][j + index] = randomBlock[i][j];
                }
            }
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

    importBlock();

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

    // document.querySelector(".start-button").addEventListener("click", function () {
    //     window.location.reload();
    // });

    let pauseClick = 2;

    document.querySelector(".pause-button").addEventListener("click", function () {
        if (pauseClick % 2 === 0) {
            clearInterval(fistLevel);
            document.removeEventListener("keydown", pieseMove);
            pauseClick += 1;
            document.querySelector(".pause-button").value = "RESUME";
        } else {
            fistLevel = setInterval(down, 1000);
            document.addEventListener("keydown", pieseMove);
            pauseClick += 1;
            document.querySelector(".pause-button").value = "PAUSE";
        }
    });

    function down() {
        pieceGoesDown(tetrisArr);
        renderItems(tetrisArr);
    };

    let fistLevel = setInterval(down, 1000);
});