'use strict'

// icons
const MINE = '💣'


// The Model
var gBoard = {
    minesAround: false,
    isShown: false,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// on game start
function onInit() {
    gBoard = createBoard(gLevel.SIZE, gLevel.MINES)
    renderBoard(gBoard)
}


function buildBoard(size, mines) {
    const board = createBoard(size)
    placeMines(board, mines)
    setMinesNegsCount(board)
    return board
}

// rendering board
function renderBoard(board) {
    const boardElement = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            strHTML += `<td class="cell" data-i="${i}" data-j="${j}"></td>`
        }
        strHTML += '</tr>'
    }
    boardElement.innerHTML = strHTML
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