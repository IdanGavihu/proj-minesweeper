'use strict'

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