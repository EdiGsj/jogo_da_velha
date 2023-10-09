

let currentPlayer = 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']
let playerXScore = 0
let playerOScore = 0
let drawScore = 0

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//Delimitanndo as jogadas vencedoras

const board = document.getElementById('board')
const status = document.getElementById('status')
//Trazendo o tabuleiro e texto para aplicar lógica

function updateScore() {
    document.getElementById('playerXScore').textContent = playerXScore
    document.getElementById('playerOScore').textContent = playerOScore
    document.getElementById('drawScore').textContent = drawScore
}
//Lançamento do placar

function handleWin(winner) {
    if (winner === 'X') {
        playerXScore++
    } else if (winner === 'O') {
        playerOScore++
    } else {
        drawScore++
    }
    updateScore()
}

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            const winnerSymbol = gameBoard[a]
            document.getElementById(a).classList.add('winner', `player-${winnerSymbol}`)
            document.getElementById(b).classList.add('winner', `player-${winnerSymbol}`)
            document.getElementById(c).classList.add('winner', `player-${winnerSymbol}`)
            handleWin(winnerSymbol)
            return gameBoard[a]
        }
    }
    return null
}
//Checagem do vencedor


function checkDraw() {
    if (gameBoard.includes('')) {
        return false
    } else if (!checkWinner()) {
        handleWin(null)
        return true
    }
    return false
}
//Analisa as casas e se todas estiverem preenchidas e olha se nenhuma condição de vitória foi atingida

function handleClick(index) {
    if (gameBoard[index] === '' && !checkWinner() && !checkDraw()) {
        gameBoard[index] = currentPlayer
        const square = document.getElementById(index)
        square.textContent = currentPlayer
        square.classList.add('rotate-animation') 
        setTimeout(() => {
            square.classList.remove('rotate-animation')
        }, 500)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        status.textContent = `É a vez do Jogador ${currentPlayer}`
    }
    const winner = checkWinner();
    if (winner) {
        status.textContent = `O Jogador ${winner} venceu!`
    } else if (checkDraw()) {
        status.textContent = 'Deu velha!'
    }
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', '']
    currentPlayer = 'X'
    status.textContent = 'É a vez do Jogador X'
    const squares = document.querySelectorAll('.square')
    squares.forEach(square => {
        square.textContent = ''
        square.classList.remove('winner', 'player-X', 'player-O'); // Remova todas as classes adicionadas
    })
}
//Reseta o tabuleiro

function resetScore() {
    playerXScore = 0
    playerOScore = 0
    drawScore = 0
    updateScore()
}
//Reseta o placar

for (let i = 0; i < 9; i++) {
    const square = document.getElementById(i)
    square.classList.add('square')
    square.addEventListener('click', () => handleClick(i))
}
//Faz a leitura e declaração das casas

// class Game {
//     constructor() {
//       this.currentPlayer = 'X'
//       this.gameBoard = new Board()
//       this.status = new Status()
//       this.initialize()
//     }
  
//     initialize() {
//       for (let i = 0; i < 9; i++) {
//         const square = document.getElementById(i)
//         square.classList.add('square')
//         square.addEventListener('click', () => this.handleClick(i))
//       }
//     }
  
//     handleClick(index) {
//         if (this.gameBoard.isEmpty(index) && !this.gameBoard.checkWinner() && !this.gameBoard.checkDraw()) {
//           this.gameBoard.placeSymbol(index, this.currentPlayer)
//           const square = document.getElementById(index)
//           square.textContent = this.currentPlayer
//           square.classList.add('rotate-animation')
    
//           // Remova a classe após a animação terminar (0.5 segundos)
//           setTimeout(() => {
//             square.classList.remove('rotate-animation')
//           }, 500)
    
//           this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
//           this.status.updateStatus(`É a vez do Jogador ${this.currentPlayer}`)
//           square.classList.add(`player-${this.currentPlayer}`) // Adicione a classe de cor do jogador atual
//         }
    
//         const winner = this.gameBoard.checkWinner()
//         if (winner) {
//           this.status.updateStatus(`O Jogador ${winner} venceu!`)
//         } else if (this.gameBoard.checkDraw()) {
//           this.status.updateStatus('Deu velha!')
//         }
//       }
    
  
//     reset() {
//       this.gameBoard.reset()
//       this.status.reset()
//       this.currentPlayer = 'X'
//       for (let i = 0; i < 9; i++) {
//         const square = document.getElementById(i)
//         square.textContent = ''
//         square.classList.remove('winner', 'player-X', 'player-O')
//       }
//     }
//   }
  
//   class Board {
//     constructor() {
//       this.board = ['', '', '', '', '', '', '', '', '']
//       this.winningCombos = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//       ]
//     }
  
//     isEmpty(index) {
//       return this.board[index] === ''
//     }
  
//     placeSymbol(index, symbol) {
//       this.board[index] = symbol
//     }
  
//     checkWinner() {
//       for (const combo of this.winningCombos) {
//         const [a, b, c] = combo
//         if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
//           return this.board[a]
//         }
//       }
//       return null
//     }
  
//     checkDraw() {
//       if (this.board.includes('')) {
//         return false
//       } else if (!this.checkWinner()) {
//         return true
//       }
//       return false
//     }
  
//     reset() {
//       this.board = ['', '', '', '', '', '', '', '', '']
//     }
//   }
  
//   class Status {
//     constructor() {
//       this.statusElement = document.getElementById('status')
//       this.currentPlayer = 'X'
//       this.updateStatus(`É a vez do Jogador ${this.currentPlayer}`)
//     }
  
//     updateStatus(text) {
//       this.statusElement.textContent = text
//     }
  
//     reset() {
//       this.currentPlayer = 'X'
//       this.updateStatus(`É a vez do Jogador ${this.currentPlayer}`)
//     }
//   }
  
//   const game = new Game()
//   const resetButton = document.getElementById('reset')
//   resetButton.addEventListener('click', () => game.reset())


/////////////////////////////////////////////////////////////////////////////////