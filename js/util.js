'use strict'
//creating the board
function createBoard(size, mines) {
    const board = []
    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            row.push({
                isMine: false,
                isShown: false,
                isMarked: false,
                minesAround: 0
            })
        }
        board.push(row)
    }

    let minesPlaced = 0
    while (minesPlaced < mines) {
        const i = Math.floor(Math.random() * size)
        const j = Math.floor(Math.random() * size)
        if (!board[i][j].isMine) {
            board[i][j].isMine = true
            minesPlaced++
        }
    }
    
    return board
}

//copy mat
function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = {
                isMine: mat[i][j].isMine,
                isShown: mat[i][j].isShown,
                isMarked: mat[i][j].isMarked,
                minesAround: mat[i][j].minesAround
            }  
        }
    }
    return newMat
}

// placing mines randomaly
function placeMines(board, numMines) {
    var minesPlaced = 0
    while (minesPlaced < numMines) {
        const i = Math.floor(Math.random() * board.length)
        const j = Math.floor(Math.random() * board[0].length)
        if (!board[i][j].isMine) {
            board[i][j].isMine = true
            minesPlaced++
        }
    }
}

//counting the neighboring mines
function setMinesNegsCount(board) {
    const numRows = board.length
    const numCols = board[0].length

    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            if (!board[i][j].isMine) {
                var count = 0
                // Check neighboring cells
                for (var row = i - 1; row <= i + 1; row++) {
                    for (var col = j - 1; col <= j + 1; col++) {
                        if (row >= 0 && row < numRows && col >= 0 && col < numCols && board[row][col].isMine) {
                            count++
                        }
                    }
                }
                board[i][j].minesAround = count
            }
        }
    }
    return board
}

function setLevel(level) {
    if (level === 'beginner') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
    } else if (level === 'medium') {
        gLevel.SIZE = 8
        gLevel.MINES = 14
    } else if (level === 'expert') {
        gLevel.SIZE = 12
        gLevel.MINES = 32
    }
    onInit()
}