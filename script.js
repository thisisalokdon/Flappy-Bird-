const bird = document.getElementById('bird');
const gameContainer = document.getElementById('gameContainer');
const pipeContainer = document.getElementById('pipeContainer');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('startButton');

let birdTop = 250;
let gravity = 2;
let isGameOver = false;
let pipes = [];
let score = 0;

// Start Game Event
startButton.addEventListener('click', startGame);

// Flap Event
document.addEventListener('keydown', flap);
gameContainer.addEventListener('click', flap);

function startGame() {
    startButton.classList.add('hidden');
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    birdTop = 250;
    bird.style.top = birdTop + 'px';
    pipes = [];
    pipeContainer.innerHTML = '';
    isGameOver = false;
    createPipe();
    gameLoop();
}

// Bird Flap Function
function flap() {
    if (!isGameOver) {
        birdTop -= 50; // Make the bird jump
    }
}

// Main Game Loop
function gameLoop() {
    if (!isGameOver) {
        birdTop += gravity;
        bird.style.top = birdTop + 'px';

        // Check collision with ground
        if (birdTop >= 560 || birdTop <= 0) {
            endGame();
        }

        // Move pipes and check for collision
        pipes.forEach((pipe, index) => {
            pipe.xPos -= 5;
            pipe.element.style.left = pipe.xPos + 'px';

            // Check if bird hits a pipe
            if (pipe.xPos < 90 && pipe.xPos > 50) {
                if (birdTop < pipe.topHeight || birdTop > 600 - pipe.bottomHeight) {
                    endGame();
                }
            }

            // Remove pipe if off screen and add new pipe
            if (pipe.xPos < -60) {
                pipeContainer.removeChild(pipe.element);
                pipes.splice(index, 1);
                score++;
                scoreBoard.textContent = `Score: ${score}`;
                createPipe();
            }
        });

        requestAnimationFrame(gameLoop);
    }
}

// Create Pipes
function createPipe() {
    const pipeTopHeight = Math.floor(Math.random() * (400 - 200)) + 100;
    const pipeBottomHeight = 600 - pipeTopHeight - 150; // Gap of 150px

    const pipeTop = document.createElement('div');
    pipeTop.classList.add('pipe', 'top');
    pipeTop.style.height = pipeTopHeight + 'px';
    pipeTop.style.left = '400px';
    
    const pipeBottom = document.createElement('div');
    pipeBottom.classList.add('pipe', 'bottom');
    pipeBottom.style.height = pipeBottomHeight + 'px';
    pipeBottom.style.left = '400px';

    const pipe = {
        topHeight: pipeTopHeight,
        bottomHeight: pipeBottomHeight,
        xPos: 400,
        element: pipeTop
    };

    const pipeBottomElement = {
        topHeight: pipeTopHeight,
        bottomHeight: pipeBottomHeight,
        xPos: 400,
        element: pipeBottom
    };

    pipeContainer.appendChild(pipeTop);
    pipeContainer.appendChild(pipeBottom);
    pipes.push(pipe);
    pipes.push(pipeBottomElement);
}

// End Game Function
function endGame() {
    isGameOver = true;
    startButton.classList.remove('hidden');
    scoreBoard.textContent = `Game Over! Final Score: ${score}`;
}
