'use strict'

// icons
const MINE = '💣'
const FLAG = '🚩'

// The Model
var gBoard = []
var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// on game start
function onInit() {
    gGame.isOn = true;
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
    const boardElement = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            strHTML += `<td class="cell" data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellRightClicked(event, this, ${i}, ${j})"></td>`
        }
        strHTML += '</tr>'
    }
    boardElement.innerHTML = strHTML
}

function placeMines(board, numMines) {
    var minesPlaced = 0
    while (minesPlaced < numMines) {
        const i = Math.floor(Math.random() * board.length)
        const j = Math.floor(Math.random() * board[0].length)
        if (!board[i][j].isMine) {
            board[i][j].isMine = true
            minesPlaced++
            console.log(`Mine placed at (${i}, ${j})`)
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
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return

    const cell = gBoard[i][j]
    if (cell.isShown || cell.isMarked) return // Ignore if the cell is already shown or flagged

    cell.isShown = true // Mark the cell as shown

    if (cell.isMine) {
        elCell.innerHTML = MINE // Show mine
        elCell.style.backgroundColor = 'red' 
        elCell.classList.add('shown')
        gameOver(false)
    } else {
        elCell.innerHTML = cell.minesAround === 0 ? '' : cell.minesAround 
        elCell.style.backgroundColor = 'lightgrey' 

        if (cell.minesAround === 0) {
            // Expand all first-degree neighbors
            expandShown(i, j)
        }

        elCell.classList.add('shown')
        checkWin()
    }
}

function onCellRightClicked(event, elCell, i, j) {
    event.preventDefault()
    
    if (!gGame.isOn) return // Check if the game is still on

    const cell = gBoard[i][j]
    if (cell.isShown) return // Ignore if the cell is already shown

    cell.isMarked = !cell.isMarked // Toggle flag
    elCell.innerHTML = cell.isMarked ? FLAG : '' // Show or remove flag
    elCell.classList.toggle('flagged', cell.isMarked)

    checkWin()
}

function expandShown(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            // Skip the cell itself
            if (i === cellI && j === cellJ) continue
            if (i >= 0 && i < gBoard.length && j >= 0 && j < gBoard[0].length) {
                const cell = gBoard[i][j]
                // Skip if the cell is already shown or is a mine
                if (!cell.isShown && !cell.isMine) {
                    cell.isShown = true
                    const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                    elCell.innerHTML = cell.minesAround === 0 ? '' : cell.minesAround
                    elCell.style.backgroundColor = 'lightgrey'
                    elCell.classList.add('shown')
                    // expand if the cell has no neighboring mines
                    if (cell.minesAround === 0) {
                        expandShown(i, j)
                    }
                }
            }
        }
    }
}

function revealAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {
                const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.innerHTML = MINE
                elCell.classList.add('shown')
            }
        }
    }
}

function checkWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if ((cell.isMine && !cell.isMarked) || (!cell.isMine && !cell.isShown)) {
                return false
            }
        }
    }
    gameOver(true)
}

function gameOver(isWin) {
    gGame.isOn = false
    if (isWin) {
        alert('ניצחת!')
    } else {
        revealAllMines()
        alert('איי את הפלי')
    }
}