let tetrisArr = [
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
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
        return pieceGoesDown(arr);
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

console.log(pieceGoesDown(tetrisArr));

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
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
];

const lBlock2 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
];

const sBlock1 = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
];

const sBlock2 = [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
];

const zBlock1 = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
];

const zBlock2 = [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0]
];

const tBlock1 = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
];

const tBlock2 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
];

const topLine = [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1];
