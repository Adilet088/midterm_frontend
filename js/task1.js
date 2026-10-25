const MIN_RATING_TENTHS = 50;
const MAX_RATING_TENTHS = 100;
const RATING_SCALE = 10;
const RATING_DECIMAL_PLACES = 1;
const RANDOM_RANGE_ADJUSTMENT = 1;

const INITIAL_LIVES = 3;
const INITIAL_STREAK = 0;
const STREAK_INCREMENT = 1;
const NO_LIVES = 0;

const BEST_STREAK_KEY = "sopranosBestStreak";

const currentRatingElement = document.getElementById("current-rating");
const livesElement = document.getElementById("lives");
const streakElement = document.getElementById("streak");
const bestStreakElement = document.getElementById("best-streak");
const questionElement = document.getElementById("question");
const feedbackElement = document.getElementById("feedback");
const nextRatingArea = document.getElementById("next-rating-area");
const nextRatingElement = document.getElementById("next-rating");

const higherButton = document.getElementById("higher-btn");
const lowerButton = document.getElementById("lower-btn");
const restartButton = document.getElementById("restart-btn");

let currentRating;
let lives;
let streak;
let bestStreak;
let gameOver;

function getRandomRating() {
    const randomInteger = Math.floor(
        Math.random() * (
            MAX_RATING_TENTHS -
            MIN_RATING_TENTHS +
            RANDOM_RANGE_ADJUSTMENT
        )
    ) + MIN_RATING_TENTHS;

    return randomInteger / RATING_SCALE;
}

function updateDisplay() {
    currentRatingElement.textContent =
        currentRating.toFixed(RATING_DECIMAL_PLACES);

    livesElement.textContent = lives;
    streakElement.textContent = streak;
    bestStreakElement.textContent = bestStreak;
}

function startGame() {
    lives = INITIAL_LIVES;
    streak = INITIAL_STREAK;
    gameOver = false;
    currentRating = getRandomRating();

    higherButton.disabled = false;
    lowerButton.disabled = false;

    questionElement.textContent =
        "Will the next rating be higher or lower?";

    feedbackElement.textContent = "Make your prediction!";
    feedbackElement.className = "feedback";

    nextRatingArea.hidden = true;

    updateDisplay();
}

function makeGuess(guess) {
    if (gameOver) {
        return;
    }

    if (guess !== "higher" && guess !== "lower") {
        feedbackElement.textContent =
            "Invalid move! Choose Higher or Lower.";

        feedbackElement.className = "feedback error";
        return;
    }

    const nextRatingValue = getRandomRating();

    const isCorrect =
        nextRatingValue === currentRating ||
        (guess === "higher" && nextRatingValue > currentRating) ||
        (guess === "lower" && nextRatingValue < currentRating);

    nextRatingElement.textContent =
        nextRatingValue.toFixed(RATING_DECIMAL_PLACES);

    nextRatingArea.hidden = false;

    if (isCorrect) {
        streak += STREAK_INCREMENT;

        if (streak > bestStreak) {
            bestStreak = streak;

            try {
                localStorage.setItem(BEST_STREAK_KEY, bestStreak);
            } catch (error) {
                feedbackElement.textContent =
                    "Correct prediction! Your best streak could not be saved.";
            }
        }

        if (nextRatingValue === currentRating) {
            feedbackElement.textContent =
                "Correct! The ratings are equal.";
        } else {
            feedbackElement.textContent = "Correct prediction!";
        }

        feedbackElement.className = "feedback success";
    } else {
        lives--;
        streak = INITIAL_STREAK;

        feedbackElement.textContent =
            "Wrong prediction! You lost one life.";

        feedbackElement.className = "feedback error";
    }

    currentRating = nextRatingValue;

    updateDisplay();

    if (lives === NO_LIVES) {
        endGame();
        return;
    }

    questionElement.textContent = "Predict the next rating!";
}

function endGame() {
    gameOver = true;

    higherButton.disabled = true;
    lowerButton.disabled = true;

    questionElement.textContent = "Game over!";

    feedbackElement.textContent =
        `Your best streak is ${bestStreak}. Press Restart Game to play again.`;

    feedbackElement.className = "feedback game-over";
}

higherButton.addEventListener("click", function () {
    makeGuess("higher");
});

lowerButton.addEventListener("click", function () {
    makeGuess("lower");
});

restartButton.addEventListener("click", startGame);

let savedBestStreak = INITIAL_STREAK;

try {
    const storedValue = localStorage.getItem(BEST_STREAK_KEY);

    if (storedValue !== null) {
        const parsedValue = Number(storedValue);

        if (Number.isFinite(parsedValue) && parsedValue >= INITIAL_STREAK) {
            savedBestStreak = parsedValue;
        }
    }
} catch (error) {
    savedBestStreak = INITIAL_STREAK;
}

bestStreak = savedBestStreak;

startGame();