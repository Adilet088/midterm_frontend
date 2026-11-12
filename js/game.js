const BEST_STREAK_KEY = "sopranos_best_streak";
const MAX_LIVES = 3;

const episodes = [
    // SEASON 1
    {
        code: "S01 • E01",
        title: "The Sopranos (Pilot)",
        rating: 8.6,
        image: "images/season1.jpeg",
        desc: "Panic attacks send mob boss Tony Soprano to Dr. Melfi's office for the very first time."
    },
    {
        code: "S01 • E04",
        title: "Meadowlands",
        rating: 8.5,
        image: "images/soprano1.webp",
        desc: "Jackie Aprile's death leaves a power vacuum as Tony maneuvers Junior into becoming lightning-rod boss."
    },
    {
        code: "S01 • E05",
        title: "College",
        rating: 9.4,
        image: "images/soprano2.avif",
        desc: "While touring Maine colleges with Meadow, Tony spots a former mob informant in witness protection."
    },
    {
        code: "S01 • E06",
        title: "Pax Soprana",
        rating: 8.5,
        image: "images/soprano9.jpg",
        desc: "Junior celebrates becoming official boss while Hesh and the capos quietly resent his heavy taxation."
    },
    {
        code: "S01 • E10",
        title: "A Hit Is a Hit",
        rating: 7.8,
        image: "images/soprano6.webp",
        desc: "Christopher and Adriana try their hand at the music business with rapper Massive Genius."
    },
    {
        code: "S01 • E12",
        title: "Isabella",
        rating: 8.9,
        image: "images/soprano4.jpg",
        desc: "Deeply depressed and overmedicated, Tony hallucinates a charming Italian neighbor before an ambush."
    },
    {
        code: "S01 • E13",
        title: "I Dream of Jeannie Cusamano",
        rating: 9.1,
        image: "images/soprano10.jpeg",
        desc: "Tony strikes back against Junior's conspirators as a fierce storm hits New Jersey."
    },

    // SEASON 2
    {
        code: "S02 • E04",
        title: "Commendatori",
        rating: 8.7,
        image: "images/soprano3.webp",
        desc: "Tony, Paulie, and Christopher travel to Naples to negotiate a car-smuggling deal with the Camorra."
    },
    {
        code: "S02 • E08",
        title: "Full Leather Jacket",
        rating: 8.7,
        image: "images/soprano6.webp",
        desc: "Richie gifts Tony a prized jacket while two ambitious associates make a reckless move on Christopher."
    },
    {
        code: "S02 • E12",
        title: "The Knight in White Satin Armor",
        rating: 9.3,
        image: "images/soprano5.jpg",
        desc: "Richie Aprile plots against Tony, only for Janice to take matters into her own hands."
    },
    {
        code: "S02 • E13",
        title: "Funhouse",
        rating: 9.5,
        image: "images/season2.webp",
        desc: "Fever dreams on the Jersey shore lead Tony to a painful truth about one of his closest friends."
    },

    // SEASON 3
    {
        code: "S03 • E02",
        title: "Proshai, Livushka",
        rating: 8.8,
        image: "images/soprano5.jpg",
        desc: "Livia passes away, prompting Janice to organize an awkward, alcohol-fueled remembrance at the house."
    },
    {
        code: "S03 • E04",
        title: "Employee of the Month",
        rating: 9.2,
        image: "images/soprano4.jpg",
        desc: "Dr. Melfi faces a profound moral dilemma after suffering a brutal attack."
    },
    {
        code: "S03 • E06",
        title: "University",
        rating: 9.1,
        image: "images/soprano7.jpeg",
        desc: "Meadow's freshman life at Columbia contrasts darkly with Ralphie's cruelty at the Bada Bing!"
    },
    {
        code: "S03 • E11",
        title: "Pine Barrens",
        rating: 9.7,
        image: "images/season3.jpeg",
        desc: "Paulie and Christopher get stranded in the freezing woods of South Jersey after a botched collection."
    },
    {
        code: "S03 • E12",
        title: "Amour Fou",
        rating: 9.2,
        image: "images/soprano1.webp",
        desc: "Tony's volatile affair with Gloria Trillo spirals out of control as Jackie Jr. robs a card game."
    },
    {
        code: "S03 • E13",
        title: "Army of One",
        rating: 9.0,
        image: "images/soprano8.jpg",
        desc: "Ralphie makes a fatal decision regarding Jackie Jr. while A.J. faces expulsion from school."
    },

    // SEASON 4
    {
        code: "S04 • E03",
        title: "Christopher",
        rating: 7.9,
        image: "images/soprano3.webp",
        desc: "Tensions boil over in Newark during Columbus Day protests while Silvio takes charge."
    },
    {
        code: "S04 • E04",
        title: "The Weight",
        rating: 8.8,
        image: "images/soprano8.jpg",
        desc: "Johnny Sack demands a hit on Ralphie over an insulting joke, nearly triggering a mob war."
    },
    {
        code: "S04 • E09",
        title: "Whoever Did This",
        rating: 9.4,
        image: "images/season4.jpg",
        desc: "A devastating stable fire pushes Tony and Ralphie into a violent kitchen showdown."
    },
    {
        code: "S04 • E13",
        title: "Whitecaps",
        rating: 9.5,
        image: "images/soprano2.avif",
        desc: "Long-buried secrets explode into an unforgettable confrontation between Tony and Carmela."
    },

    // SEASON 5
    {
        code: "S05 • E04",
        title: "All Happy Families...",
        rating: 8.5,
        image: "images/soprano9.jpg",
        desc: "Carmine Lupertazzi's death sparks a bloody succession struggle in New York."
    },
    {
        code: "S05 • E07",
        title: "In Camelot",
        rating: 8.3,
        image: "images/soprano7.jpeg",
        desc: "Tony meets his late father's charismatic former mistress and uncovers uncomfortable family truths."
    },
    {
        code: "S05 • E10",
        title: "Cold Cuts",
        rating: 8.7,
        image: "images/soprano4.jpg",
        desc: "Tony Soprano and Tony Blundetto dig up dark secrets on Uncle Pat's upstate farm."
    },
    {
        code: "S05 • E11",
        title: "The Test Dream",
        rating: 9.1,
        image: "images/season5.webp",
        desc: "Unable to sleep at the Plaza Hotel, Tony confronts his guilt in a surreal dream sequence."
    },
    {
        code: "S05 • E12",
        title: "Long Term Parking",
        rating: 9.6,
        image: "images/soprano5.jpg",
        desc: "Adriana faces an impossible ultimatum between FBI cooperation and loyalty to Christopher."
    },

    // SEASON 6
    {
        code: "S06 • E02",
        title: "Join the Club",
        rating: 8.8,
        image: "images/soprano9.jpg",
        desc: "Fighting for his life in a coma, Tony experiences an alternate identity in Costa Mesa."
    },
    {
        code: "S06 • E18",
        title: "Kennedy and Heidi",
        rating: 9.3,
        image: "images/soprano6.webp",
        desc: "A late-night car crash changes the future of the family forever, sending Tony to Las Vegas."
    },
    {
        code: "S06 • E20",
        title: "The Blue Comet",
        rating: 9.5,
        image: "images/soprano10.jpeg",
        desc: "Phil Leotardo orders a ruthless strike against the DiMeo leadership, forcing Tony into hiding."
    },
    {
        code: "S06 • E21",
        title: "Made in America",
        rating: 9.4,
        image: "images/season6.jpg",
        desc: "The war with New York reaches its climax before a final family dinner at Holsten's."
    }
];

const ranks = [
    { minStreak: 0, title: "Associate", nextGoal: 3 },
    { minStreak: 3, title: "Soldier", nextGoal: 6 },
    { minStreak: 6, title: "Capo", nextGoal: 10 },
    { minStreak: 10, title: "Underboss", nextGoal: 14 },
    { minStreak: 14, title: "Boss of NJ", nextGoal: 18 }
];

let deck = [];
let currentIndex = 0;
let streak = 0;
let lives = MAX_LIVES;
let bestStreak = Number(localStorage.getItem(BEST_STREAK_KEY)) || 0;
let isAnimating = false;

const livesHeartsEl = document.getElementById("lives-hearts");
const streakEl = document.getElementById("streak");
const bestStreakEl = document.getElementById("best-streak");
const rankEl = document.getElementById("family-rank");
const progressFillEl = document.getElementById("rank-progress-fill");

const leftImgEl = document.getElementById("left-img");
const leftCodeEl = document.getElementById("left-code");
const leftTitleEl = document.getElementById("left-title");
const leftDescEl = document.getElementById("left-desc");
const leftRatingEl = document.getElementById("left-rating");

const rightCardEl = document.getElementById("right-episode-card");
const rightImgEl = document.getElementById("right-img");
const rightCodeEl = document.getElementById("right-code");
const rightTitleEl = document.getElementById("right-title");
const rightDescEl = document.getElementById("right-desc");
const revealBoxEl = document.getElementById("challenger-reveal-box");
const rightRatingEl = document.getElementById("right-rating");

const higherBtn = document.getElementById("higher-btn");
const lowerBtn = document.getElementById("lower-btn");
const restartBtn = document.getElementById("restart-btn");
const feedbackEl = document.getElementById("feedback");

function shuffleDeck(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function getRankInfo(currentStreak) {
    let activeRank = ranks[0];
    for (const rank of ranks) {
        if (currentStreak >= rank.minStreak) {
            activeRank = rank;
        }
    }
    const span = activeRank.nextGoal - activeRank.minStreak;
    const progress = span > 0 ? Math.min(100, ((currentStreak - activeRank.minStreak) / span) * 100) : 100;
    return { title: activeRank.title, progress };
}

function renderHearts() {
    if (!livesHeartsEl) return;
    const hearts = livesHeartsEl.querySelectorAll(".heart");
    hearts.forEach((heart, idx) => {
        heart.classList.toggle("active", idx < lives);
    });
    livesHeartsEl.setAttribute("aria-label", `${lives} lives remaining`);
}

function updateHUD() {
    renderHearts();
    streakEl.textContent = streak;
    bestStreakEl.textContent = bestStreak;

    const rankInfo = getRankInfo(streak);
    rankEl.textContent = rankInfo.title;
    if (progressFillEl) {
        progressFillEl.style.width = `${rankInfo.progress}%`;
    }
}

function renderRound() {
    if (currentIndex + 1 >= deck.length) {
        const currentEp = deck[currentIndex];
        const remaining = shuffleDeck(episodes.filter(ep => ep.title !== currentEp.title));
        deck = [currentEp, ...remaining];
        currentIndex = 0;
    }

    const leftEp = deck[currentIndex];
    const rightEp = deck[currentIndex + 1];

    leftImgEl.src = leftEp.image;
    leftImgEl.alt = leftEp.title;
    leftCodeEl.textContent = leftEp.code;
    leftTitleEl.textContent = leftEp.title;
    leftDescEl.textContent = leftEp.desc;
    leftRatingEl.textContent = `★ ${leftEp.rating.toFixed(1)}`;

    rightImgEl.src = rightEp.image;
    rightImgEl.alt = rightEp.title;
    rightCodeEl.textContent = rightEp.code;
    rightTitleEl.textContent = rightEp.title;
    rightDescEl.textContent = rightEp.desc;

    revealBoxEl.classList.add("is-hidden");
    rightRatingEl.textContent = "★ ?.?";
    rightCardEl.classList.remove("is-correct", "is-wrong");

    higherBtn.disabled = false;
    lowerBtn.disabled = false;
    isAnimating = false;
}

function handleGuess(direction) {
    if (isAnimating || lives <= 0) return;
    isAnimating = true;

    higherBtn.disabled = true;
    lowerBtn.disabled = true;

    const leftEp = deck[currentIndex];
    const rightEp = deck[currentIndex + 1];

    revealBoxEl.classList.remove("is-hidden");
    rightRatingEl.textContent = `★ ${rightEp.rating.toFixed(1)}`;

    const isHigher = rightEp.rating > leftEp.rating;
    const isLower = rightEp.rating < leftEp.rating;
    const isTie = rightEp.rating === leftEp.rating;

    const guessedRight =
        isTie ||
        (direction === "higher" && isHigher) ||
        (direction === "lower" && isLower);

    if (guessedRight) {
        streak++;
        if (streak > bestStreak) {
            bestStreak = streak;
            localStorage.setItem(BEST_STREAK_KEY, String(bestStreak));
        }

        rightCardEl.classList.add("is-correct");
        feedbackEl.className = "feedback success";
        feedbackEl.textContent = isTie
            ? `Tie! Both "${leftEp.title}" and "${rightEp.title}" hold ★ ${rightEp.rating.toFixed(1)}. Streak continues!`
            : `Spot on! "${rightEp.title}" (★ ${rightEp.rating.toFixed(1)}) vs "${leftEp.title}" (★ ${leftEp.rating.toFixed(1)}).`;

        updateHUD();

        setTimeout(() => {
            currentIndex++;
            feedbackEl.className = "feedback";
            feedbackEl.textContent = "Make your next call!";
            renderRound();
        }, 1450);
    } else {
        lives--;
        rightCardEl.classList.add("is-wrong");
        updateHUD();

        if (lives <= 0) {
            feedbackEl.className = "feedback game-over";
            feedbackEl.textContent = `Whacked! "${rightEp.title}" is rated ★ ${rightEp.rating.toFixed(1)}. Final Streak: ${streak}.`;
            restartBtn.classList.add("is-prominent");
        } else {
            feedbackEl.className = "feedback error";
            feedbackEl.textContent = `Wrong call! "${rightEp.title}" is rated ★ ${rightEp.rating.toFixed(1)}. ${lives} ${lives === 1 ? "life" : "lives"} left.`;

            setTimeout(() => {
                currentIndex++;
                feedbackEl.className = "feedback";
                feedbackEl.textContent = "Stay sharp — make your next call!";
                renderRound();
            }, 1600);
        }
    }
}

function startNewGame() {
    deck = shuffleDeck(episodes);
    currentIndex = 0;
    streak = 0;
    lives = MAX_LIVES;

    restartBtn.classList.remove("is-prominent");
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "Does the challenger have a Higher or Lower rating?";

    updateHUD();
    renderRound();
}

if (higherBtn && lowerBtn && restartBtn) {
    higherBtn.addEventListener("click", () => handleGuess("higher"));
    lowerBtn.addEventListener("click", () => handleGuess("lower"));
    restartBtn.addEventListener("click", startNewGame);

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            handleGuess("higher");
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            handleGuess("lower");
        }
    });

    startNewGame();
}