document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.querySelector('.reset');
    const player1Score = document.querySelector('.score1');
    const player2Score = document.querySelector('.score2');
    const draw = document.querySelector('.draw');
    const messageContent = document.querySelector('.content');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close');
    const computerButton = document.querySelector('.computer .btn');

    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let computer = true;
    let usedCells = [];
    let emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let winner = false;
    let player1ScoreValue = 0;
    let player2ScoreValue = 0;
    let ties = 0;
    let isComputerTurn = false;

    function toggleComputer() {
        computer = !computer;
        computerButton.innerHTML = computer ? '<i class="fa fa-desktop"></i>' : '<i class="fa fa-user"></i>';
        // Reset scores when switching modes
        player1ScoreValue = 0;
        player2ScoreValue = 0;
        ties = 0;
        showScore();
        reset();
    }
    resetBtn.addEventListener('click', reset);
    computerButton.addEventListener('click', toggleComputer);

    let player1 = {
        Symbol: '<i class="fa fa-close"></i>' ,
        played: [],
        score: 0,
    }
    let player2 = {
        Symbol: '<i class="fa fa-circle-o"></i>' ,
        played: [],
        score: 0,
    }
    

    function addSymbol(player, i) {
        cells[i].innerHTML = player.Symbol;
        player.played.push(i);
        usedCells.push(i);
        emptyCells.splice(emptyCells.indexOf(i), 1);
    }

    function checkWin(player) {
        if (!winner) {
            winCombinations.some(combo => {
                if (combo.every(index => player.played.includes(index))) {
                    winner = true;
                    if (player === player1) {
                        player1ScoreValue++;
                    } else {
                        player2ScoreValue++;
                    }
                    showScore();
                    setTimeout(() => {
                        showMsg(player, true);
                        reset();  // Reset the board here
                    }, 400);
                    return true;  // Stop checking other combinations
                }
            });
        }
        if (!winner && usedCells.length === 9) {
            ties++;
            showScore();
            setTimeout(() => {
                showMsg(null, false);
                reset();  // Reset the board here
            }, 400);
        }
    }
    
    
    

    function isEmpty(i) {
        return !usedCells.includes(i);
    }

    function reset() {
        cells.forEach(cell => {
            cell.innerHTML = '';
        });
        winner = false;
        usedCells = [];
        player1.played = [];
        player2.played = [];
        emptyCells = [0,1,2,3,4,5,6,7,8];
        isComputerTurn = false;
        // Do not reset scores here
    }

    resetBtn.addEventListener('click', reset);

    function showScore() {
        player1Score.innerHTML = player1ScoreValue;
        player2Score.innerHTML = player2ScoreValue;
        draw.innerHTML = ties;
    }

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    function showMsg(player, winner) {
        if (winner) {
            messageContent.innerHTML = (player === player1 ? player1.Symbol : player2.Symbol) + ' IS THE <h2>WINNER !</h2>';
        } else {
            messageContent.innerHTML = ' IT IS A <h2>DRAW !</h2>';
        }
        overlay.style.display = 'flex';
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (!isComputerTurn && isEmpty(index)) {
                addSymbol(player1, index);
                checkWin(player1);
                isComputerTurn = true;
                if (computer) {
                    setTimeout(cEasy, 400);
                }
            } else if (isComputerTurn) {
                
            } else {
                
            }
        });
    });
    
    function enableCellClick() {
        cells.forEach(cell => {
            cell.addEventListener('click', cellClickHandler);
        });
    }
    
    function cellClickHandler(event) {
        let index = Array.from(cells).indexOf(event.target);
        if (isEmpty(index)) {
            if (computer && !isComputerTurn) {
                // Human player's turn
                addSymbol(player1, index);
                checkWin(player1);
                isComputerTurn = true;
                cEasy();
            } else if (!computer) {
                // If it's not computer mode, alternate turns between player 1 and player 2
                if (player1.played.length > player2.played.length) {
                    addSymbol(player2, index);
                    checkWin(player2);
                } else {
                    addSymbol(player1, index);
                    checkWin(player1);
                }
            }
        }
    }
    
    
    cells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });
    

    function cEasy() {
        if (computer && !winner && isComputerTurn) {
            if (emptyCells.length > 0) {
                let randomIndex = Math.floor(Math.random() * emptyCells.length);
                let randomEmptyCell = emptyCells[randomIndex];
                addSymbol(player2, randomEmptyCell);
                checkWin(player2);
            } else {
                showMsg(null, false);
            }
            isComputerTurn = false;
        }
        
    }
});
