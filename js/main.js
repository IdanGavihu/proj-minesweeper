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
    gBoard = buildBoard(gLevel.SIZE, gLevel.MINES)
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
    //need to add hiding
    const boardElement = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) {
                strHTML += `<td class="cell" data-i="${i}" data-j="${j}" style="visibility: visible;">${MINE}</td>`
            } else {
                const minesAround = board[i][j].minesAround
                strHTML += `<td class="cell" data-i="${i}" data-j="${j}">${minesAround}</td>`
            }
        }
        strHTML += '</tr>'
    }
    boardElement.innerHTML = strHTML
}




function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return

    const cell = gBoard[i][j]
    if (cell.isShown) return 

    cell.isShown = true 

    if (cell.isMine) {
        elCell.innerHTML = MINE
        elCell.style.backgroundColor = 'red' 
    } else {
        elCell.innerHTML = cell.minesAround 
        elCell.style.backgroundColor = 'lightgrey' 
    }
}