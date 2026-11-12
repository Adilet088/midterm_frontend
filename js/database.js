const MAX_FAVORITES = 3;
const STORAGE_KEY = "sopranosCustomCharacters";
const FAVORITES_KEY = "sopranosFavoriteIds";

const baseCharacters = [
    {
        id: "tony-soprano",
        name: "Tony Soprano",
        role: "Crime Boss",
        family: "Soprano / DiMeo",
        seasons: 6,
        image: "images/tony.jpeg",
        status: "De facto Boss of the DiMeo Crime Family",
        bio: "Acting boss of the New Jersey crime family who balances ruthless leadership on the streets with panic attacks and therapy sessions with Dr. Melfi.",
        quote: "“A wrong decision is better than indecision.”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "carmela-soprano",
        name: "Carmela Soprano",
        role: "Tony's Wife",
        family: "Soprano",
        seasons: 6,
        image: "images/carmela.png",
        status: "Matriarch of the Soprano Household",
        bio: "Tony's devoted yet conflicted wife who enjoys the luxury of his criminal empire while struggling with her moral and religious conscience.",
        quote: "“You’re a captain, Tony. When you’re a captain, you’re responsible for everything.”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "christopher-moltisanti",
        name: "Christopher Moltisanti",
        role: "Made Man",
        family: "DiMeo",
        seasons: 6,
        image: "images/cristofer.jpeg",
        status: "Capo & Tony's Protege",
        bio: "Tony's ambitious nephew groomed to lead the family into the future, torn between loyalty to the mob, Hollywood dreams, and personal demons.",
        quote: "“I loyle to my capo.”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "paulie-gualtieri",
        name: "Paulie Gualtieri",
        role: "Capo",
        family: "DiMeo",
        seasons: 6,
        image: "images/polly.jpeg",
        status: "Veteran Capo",
        bio: "Old-school enforcer fiercely loyal to Tony, notorious for his eccentric habits, superstition, and ruthless survival instinct.",
        quote: "“Heh-heh. Did you hear what I said, Tone?”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "silvio-dante",
        name: "Silvio Dante",
        role: "Consigliere",
        family: "DiMeo",
        seasons: 6,
        image: "images/silvio.jpeg",
        status: "Consigliere & Owner of Bada Bing!",
        bio: "Tony's calm, pragmatic advisor and manager of the Bada Bing! club—the voice of reason inside the inner circle.",
        quote: "“Just when I thought I was out, they pull me back in!”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "junior-soprano",
        name: "Junior Soprano",
        role: "Former Boss",
        family: "Soprano",
        seasons: 6,
        image: "images/junior.webp",
        status: "Official Boss (in name)",
        bio: "Tony's proud, calculating uncle who resents his nephew's real power and navigates years of house arrest and federal trials.",
        quote: "“Some people are so far behind in a race that they actually believe they’re leading.”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "meadow-soprano",
        name: "Meadow Soprano",
        role: "Tony's Daughter",
        family: "Soprano",
        seasons: 6,
        image: "images/meadow.jpeg",
        status: "Columbia Law Student",
        bio: "Intelligent and outspoken daughter who gradually reconciles her idealistic worldview with the reality of her family's business.",
        quote: "“You’re not gonna get away with this forever, Dad.”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "aj-soprano",
        name: "A.J. Soprano",
        role: "Tony's Son",
        family: "Soprano",
        seasons: 6,
        image: "images/aj.jpeg",
        status: "Heir to the Soprano Name",
        bio: "Tony's sensitive and directionless son who struggles under the weight of his father's expectations and existential anxiety.",
        quote: "“So what, no fuckin’ ziti now?”",
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "adriana-lacerva",
        name: "Adriana La Cerva",
        role: "Christopher's Fiancée",
        family: "DiMeo",
        seasons: 5,
        image: "images/adriana.jpeg",
        status: "Manager of The Crazy Horse",
        bio: "Christopher's devoted fiancée who gets trapped between her love for Chris and relentless pressure from the FBI.",
        quote: "“I love you, Christopher. I’d do anything for you.”",
        isLeadCharacter: false,
        isCustom: false
    },
    {
        id: "dr-melfi",
        name: "Dr. Jennifer Melfi",
        role: "Psychiatrist",
        family: "Independent",
        seasons: 6,
        image: "images/melfi.jpeg",
        status: "Tony's Psychiatrist",
        bio: "Principled psychiatrist who treats Tony's panic attacks while wrestling with the ethical danger of advising a mob boss.",
        quote: "“You’re a captain of industry type, aren’t you?”",
        isLeadCharacter: true,
        isCustom: false
    }
];

function loadCharacters() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const customChars = JSON.parse(stored);
            return [...baseCharacters, ...customChars];
        }
    } catch (e) {
        console.error("Could not load custom characters", e);
    }
    return [...baseCharacters];
}

function loadFavorites() {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            return new Set(JSON.parse(stored));
        }
    } catch (e) {
        // Ignore
    }
    return new Set();
}

function saveFavorites(favSet) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favSet]));
    } catch (e) {
        // Ignore
    }
}

let characters = loadCharacters();
const favoriteIds = loadFavorites();

const searchInput = document.getElementById("character-search");
const filterSelect = document.getElementById("character-filter");
const resetCustomBtn = document.getElementById("reset-custom-btn");
const characterList = document.getElementById("character-list");
const databaseMessage = document.getElementById("database-message");
const noResults = document.getElementById("no-results");

const totalCharactersElement = document.getElementById("total-characters");
const leadCharactersElement = document.getElementById("lead-characters");
const averageSeasonsElement = document.getElementById("average-seasons");
const favoriteCountElement = document.getElementById("favorite-count");

const dossierModal = document.getElementById("dossier-modal");
const dossierClose = document.getElementById("dossier-close");
const dossierAvatar = document.getElementById("dossier-avatar");
const dossierRole = document.getElementById("dossier-role");
const dossierName = document.getElementById("dossier-name");
const dossierFamily = document.getElementById("dossier-family");
const dossierStatus = document.getElementById("dossier-status");
const dossierSeasons = document.getElementById("dossier-seasons");
const dossierBio = document.getElementById("dossier-bio");
const dossierQuote = document.getElementById("dossier-quote");
const dossierSkills = document.getElementById("dossier-skills");

let searchTerm = "";
let currentFilter = "all";
let statusMessage = "";

function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
}

function openDossier(character) {
    if (!dossierModal) return;

    if (dossierAvatar) {
        if (character.image) {
            dossierAvatar.src = character.image;
            dossierAvatar.alt = character.name;
            dossierAvatar.hidden = false;
        } else {
            dossierAvatar.hidden = true;
        }
    }

    dossierRole.textContent = character.role;
    dossierName.textContent = character.name;
    dossierFamily.textContent = character.family || "Custom Family";
    dossierStatus.textContent = character.status || `${character.role} in New Jersey`;
    dossierSeasons.textContent = `${character.seasons || 1} season(s)`;
    dossierBio.textContent = character.bio || "Custom operative recruited via the Family Workshop.";

    if (character.quote) {
        dossierQuote.textContent = character.quote;
        dossierQuote.hidden = false;
    } else {
        dossierQuote.hidden = true;
    }

    if (character.skills) {
        dossierSkills.innerHTML = `
            <div><strong>Strength:</strong> ${character.skills.strength}/10</div>
            <div><strong>Intelligence:</strong> ${character.skills.intelligence}/10</div>
            <div><strong>Leadership:</strong> ${character.skills.leadership}/10</div>
            <div><strong>Loyalty:</strong> ${character.skills.loyalty}/10</div>
        `;
        dossierSkills.hidden = false;
    } else {
        dossierSkills.hidden = true;
    }

    dossierModal.hidden = false;
    dossierClose.focus();
}

function closeDossier() {
    if (dossierModal) {
        dossierModal.hidden = true;
    }
}

if (dossierClose) {
    dossierClose.addEventListener("click", closeDossier);
}

if (dossierModal) {
    dossierModal.addEventListener("click", function (event) {
        if (event.target === dossierModal) {
            closeDossier();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dossierModal && !dossierModal.hidden) {
        closeDossier();
    }
});

function updateStatistics() {
    let totalSeasons = 0;
    let leadCount = 0;

    for (const character of characters) {
        totalSeasons += (character.seasons || 6);
        if (character.isLeadCharacter === true) {
            leadCount++;
        }
    }

    const averageSeasons = characters.length > 0 ? totalSeasons / characters.length : 0;

    totalCharactersElement.textContent = characters.length;
    leadCharactersElement.textContent = leadCount;
    averageSeasonsElement.textContent = averageSeasons.toFixed(1);
    favoriteCountElement.textContent = `${favoriteIds.size} / ${MAX_FAVORITES}`;
}

function getFilteredCharacters() {
    return characters.filter(function (character) {
        const searchableText = (
            character.name + " " +
            character.role + " " +
            (character.family || "")
        ).toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm);

        let matchesFilter = true;
        if (currentFilter === "lead") {
            matchesFilter = character.isLeadCharacter === true;
        } else if (currentFilter === "supporting") {
            matchesFilter = character.isLeadCharacter === false;
        } else if (currentFilter === "custom") {
            matchesFilter = character.isCustom === true;
        }

        return matchesSearch && matchesFilter;
    });
}

function createCharacterCard(character) {
    const card = document.createElement("article");
    card.classList.add("character-card");
    card.dataset.id = character.id;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open dossier for ${character.name}`);

    const header = document.createElement("div");
    header.className = "archive-card-header";

    if (character.image) {
        const avatar = document.createElement("img");
        avatar.src = character.image;
        avatar.alt = character.name;
        avatar.className = "archive-avatar";
        header.appendChild(avatar);
    }

    const roleBadge = createTextElement("span", "character-role", character.role);
    header.appendChild(roleBadge);

    const name = createTextElement("h2", "character-name", character.name);
    const family = createTextElement("p", "character-detail", "Family: " + (character.family || "Custom"));
    const seasons = createTextElement("p", "character-detail", "Seasons: " + (character.seasons || 6));
    const type = createTextElement(
        "p",
        "character-detail",
        character.isLeadCharacter ? "Main Character" : "Supporting Character"
    );
    const hint = createTextElement("span", "card-hint", "Click to view dossier →");

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.classList.add("favorite-button");
    favoriteButton.dataset.action = "toggle-favorite";
    favoriteButton.dataset.id = character.id;

    if (favoriteIds.has(character.id)) {
        favoriteButton.textContent = "Remove from Favorites";
        favoriteButton.classList.add("is-favorite");
    } else {
        favoriteButton.textContent = "Add to Favorites";
    }

    card.append(header, name, family, seasons, type, hint, favoriteButton);
    return card;
}

function render() {
    characterList.replaceChildren();

    const filteredCharacters = getFilteredCharacters();

    for (const character of filteredCharacters) {
        const card = createCharacterCard(character);
        characterList.append(card);
    }

    noResults.hidden = filteredCharacters.length !== 0;
    databaseMessage.textContent = statusMessage;
    updateStatistics();
}

if (searchInput) {
    searchInput.addEventListener("input", function () {
        searchTerm = searchInput.value.trim().toLowerCase();
        statusMessage = "";
        render();
    });
}

if (filterSelect) {
    filterSelect.addEventListener("change", function () {
        currentFilter = filterSelect.value;
        statusMessage = "";
        render();
    });
}

if (resetCustomBtn) {
    resetCustomBtn.addEventListener("click", function () {
        localStorage.removeItem(STORAGE_KEY);
        characters = loadCharacters();
        statusMessage = "Created characters have been cleared.";
        render();
    });
}

characterList.addEventListener("click", function (event) {
    const button = event.target.closest('button[data-action="toggle-favorite"]');

    if (button && characterList.contains(button)) {
        const characterId = button.dataset.id;

        if (favoriteIds.has(characterId)) {
            favoriteIds.delete(characterId);
            saveFavorites(favoriteIds);
            statusMessage = "Character removed from favorites.";
            render();
            return;
        }

        if (favoriteIds.size >= MAX_FAVORITES) {
            statusMessage = "You can select only 3 favorites. Remove one before adding another.";
            render();
            return;
        }

        favoriteIds.add(characterId);
        saveFavorites(favoriteIds);
        statusMessage = "Character added to favorites.";
        render();
        return;
    }

    const card = event.target.closest(".character-card");
    if (card && characterList.contains(card)) {
        const character = characters.find(c => c.id === card.dataset.id);
        if (character) {
            openDossier(character);
        }
    }
});

characterList.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
        const card = event.target.closest(".character-card");
        if (card && event.target === card) {
            event.preventDefault();
            const character = characters.find(c => c.id === card.dataset.id);
            if (character) {
                openDossier(character);
            }
        }
    }
});

render();