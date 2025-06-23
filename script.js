document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6]             // diagonais
    ];
    
    function initGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        message.textContent = '';
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
    }
    
    function checkWin() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
                
                return gameBoard[a];
            }
        }
        
        if (!gameBoard.includes('')) {
            return 'draw';
        }
        
        return null;
    }
    
    function computerMove() {
        if (!gameActive) return;
        
        setTimeout(() => {
            const emptyCells = [];
            gameBoard.forEach((cell, index) => {
                if (cell === '') emptyCells.push(index);
            });
            
            if (emptyCells.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const cellIndex = emptyCells[randomIndex];
                
                gameBoard[cellIndex] = 'O';
                cells[cellIndex].textContent = 'O';
                cells[cellIndex].classList.add('o');
                
                const winner = checkWin();
                
                if (winner === 'O') {
                    message.textContent = 'O computador (O) venceu! 😢';
                    gameActive = false;
                } else if (winner === 'draw') {
                    message.textContent = 'Empate! Ninguém venceu. 🤝';
                    gameActive = false;
                } else {
                    currentPlayer = 'X';
                }
            }
        }, 500);
    }

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));
        
        if (gameBoard[cellIndex] !== '' || !gameActive || currentPlayer !== 'X') {
            return;
        }
        
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('x');
        
        const winner = checkWin();
        
        if (winner === 'X') {
            message.textContent = 'Você venceu! Parabéns! 🎉';
            gameActive = false;
            return;
        } else if (winner === 'draw') {
            message.textContent = 'Empate! Ninguém venceu. 🤝';
            gameActive = false;
            return;
        }
        
        currentPlayer = 'O';
        message.textContent = 'Vez do computador...';
        
        computerMove();
    }
    
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', initGame);
    
    initGame();
});