const MAX_FAVORITES = 3;
const INITIAL_FAVORITES = [];

const characters = [
    {
        id: "tony-soprano",
        name: "Tony Soprano",
        role: "Crime Boss",
        family: "Soprano",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "carmela-soprano",
        name: "Carmela Soprano",
        role: "Tony's Wife",
        family: "Soprano",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "christopher-moltisanti",
        name: "Christopher Moltisanti",
        role: "Made Man",
        family: "DiMeo",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "paulie-gualtieri",
        name: "Paulie Gualtieri",
        role: "Capo",
        family: "DiMeo",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "silvio-dante",
        name: "Silvio Dante",
        role: "Consigliere",
        family: "DiMeo",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "junior-soprano",
        name: "Junior Soprano",
        role: "Former Boss",
        family: "Soprano",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "meadow-soprano",
        name: "Meadow Soprano",
        role: "Tony's Daughter",
        family: "Soprano",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "aj-soprano",
        name: "A.J. Soprano",
        role: "Tony's Son",
        family: "Soprano",
        seasons: 6,
        isLeadCharacter: true
    },
    {
        id: "adriana-lacerva",
        name: "Adriana La Cerva",
        role: "Christopher's Fiancée",
        family: "DiMeo",
        seasons: 5,
        isLeadCharacter: false
    },
    {
        id: "dr-melfi",
        name: "Dr. Jennifer Melfi",
        role: "Psychiatrist",
        family: "Independent",
        seasons: 6,
        isLeadCharacter: true
    }
];

const searchInput = document.getElementById("character-search");
const characterList = document.getElementById("character-list");
const databaseMessage = document.getElementById("database-message");
const noResults = document.getElementById("no-results");

const totalCharactersElement =
    document.getElementById("total-characters");

const leadCharactersElement =
    document.getElementById("lead-characters");

const averageSeasonsElement =
    document.getElementById("average-seasons");

const favoriteCountElement =
    document.getElementById("favorite-count");

let searchTerm = "";
let statusMessage = "";

const favoriteIds = new Set(INITIAL_FAVORITES);

function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);

    element.className = className;
    element.textContent = text;

    return element;
}

function updateStatistics() {
    let totalSeasons = 0;
    let leadCount = 0;

    for (const character of characters) {
        totalSeasons += character.seasons;

        if (character.isLeadCharacter === true) {
            leadCount++;
        }
    }

    const averageSeasons = characters.length > 0
        ? totalSeasons / characters.length
        : 0;

    totalCharactersElement.textContent = characters.length;
    leadCharactersElement.textContent = leadCount;
    averageSeasonsElement.textContent = averageSeasons.toFixed(1);

    favoriteCountElement.textContent =
        `${favoriteIds.size} / ${MAX_FAVORITES}`;
}

function getFilteredCharacters() {
    return characters.filter(function (character) {
        const searchableText = (
            character.name + " " +
            character.role + " " +
            character.family
        ).toLowerCase();

        return searchableText.includes(searchTerm);
    });
}

function createCharacterCard(character) {
    const card = document.createElement("article");
    card.classList.add("character-card");

    const roleBadge = createTextElement(
        "span",
        "character-role",
        character.role
    );

    const name = createTextElement(
        "h2",
        "character-name",
        character.name
    );

    const family = createTextElement(
        "p",
        "character-detail",
        "Family: " + character.family
    );

    const seasons = createTextElement(
        "p",
        "character-detail",
        "Seasons: " + character.seasons
    );

    const characterType = character.isLeadCharacter
        ? "Main Character"
        : "Supporting Character";

    const type = createTextElement(
        "p",
        "character-detail",
        characterType
    );

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

    card.append(
        roleBadge,
        name,
        family,
        seasons,
        type,
        favoriteButton
    );

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

searchInput.addEventListener("input", function () {
    searchTerm = searchInput.value.trim().toLowerCase();

    statusMessage = "";

    render();
});

characterList.addEventListener("click", function (event) {
    const button = event.target.closest(
        'button[data-action="toggle-favorite"]'
    );

    if (!button || !characterList.contains(button)) {
        return;
    }

    const characterId = button.dataset.id;

    const characterExists = characters.some(function (character) {
        return character.id === characterId;
    });

    if (!characterExists) {
        statusMessage = "This character could not be found.";
        render();
        return;
    }

    if (favoriteIds.has(characterId)) {
        favoriteIds.delete(characterId);

        statusMessage = "Character removed from favorites.";

        render();
        return;
    }

    if (favoriteIds.size >= MAX_FAVORITES) {
        statusMessage =
            "You can select only 3 favorites. Remove one before adding another.";

        render();
        return;
    }

    favoriteIds.add(characterId);

    statusMessage = "Character added to favorites.";

    render();
});

render();