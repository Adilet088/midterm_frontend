"use strict";

const STORAGE_KEY = "sopranosCustomCharacters";

const defaultCharacters = [
    {
        id: "tony-soprano",
        name: "Tony Soprano",
        role: "Crime Boss",
        family: "DiMeo / Soprano Family",
        seasons: 6,
        image: "images/tony.jpeg",
        status: "Deceased (Holsten's)",
        quote: "Even in this day and age, we got a thing called social club? He's gotta go!",
        bio: "The boss of the DiMeo crime family, balancing a brutal criminal empire with crippling panic attacks and complex family dynamics.",
        skills: { strength: 8, intelligence: 9, leadership: 10, loyalty: 6 },
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "carmela-soprano",
        name: "Carmela Soprano",
        role: "Tony's Wife",
        family: "Soprano Family",
        seasons: 6,
        image: "images/carmela.png",
        status: "Active",
        quote: "You route a little bit of cash to me, you let me manage the birdfeeders, and everyone is happy.",
        bio: "Tony's sharp, deeply conflicted wife who navigates the luxurious perils of mob wealth while struggling with her Catholic faith.",
        skills: { strength: 5, intelligence: 8, leadership: 7, loyalty: 7 },
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "christopher-moltisanti",
        name: "Christopher Moltisanti",
        role: "Made Man / Capo",
        family: "DiMeo Family",
        seasons: 6,
        image: "images/cristofer.jpeg",
        status: "Deceased",
        quote: "My f*ckin' temper... I gotta take a look at that.",
        bio: "Tony's volatile protandry and cousin-by-marriage with cinematic ambitions, struggling constantly with addiction and loyalty.",
        skills: { strength: 7, intelligence: 6, leadership: 5, loyalty: 8 },
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "silvio-dante",
        name: "Silvio Dante",
        role: "Consigliere",
        family: "DiMeo Family",
        seasons: 6,
        image: "images/silvio.jpeg",
        status: "Comatose",
        quote: "Just when I thought I was out... they pull me back in.",
        bio: "Tony's level-headed right hand, owner of the Bada Bing! strip club, and master of diplomatic mediation.",
        skills: { strength: 6, intelligence: 8, leadership: 8, loyalty: 10 },
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "paulie-gualtieri",
        name: "Paulie Gualtieri",
        role: "Capo",
        family: "DiMeo Family",
        seasons: 6,
        image: "images/polly.jpeg",
        status: "Active",
        quote: "He was an interior decorator? His house looked like shit!",
        bio: "A superstitious, germophobic, and fiercely loyal veteran soldier known for his eccentric humor and ruthless business sense.",
        skills: { strength: 8, intelligence: 5, leadership: 6, loyalty: 9 },
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "junior-soprano",
        name: "Corrado 'Junior' Soprano",
        role: "Boss Emeritus",
        family: "Soprano Family / DiMeo",
        seasons: 6,
        image: "images/junior.webp",
        status: "Institutionalized",
        quote: "Cazzata Malanga!",
        bio: "Tony's cynical uncle who nominally led the family before a bitter turf war and subsequent legal troubles.",
        skills: { strength: 4, intelligence: 8, leadership: 7, loyalty: 5 },
        isLeadCharacter: true,
        isCustom: false
    },
    {
        id: "adriana-la-cerva",
        name: "Adriana La Cerva",
        role: "Supporting Character",
        family: "Soprano / La Cerva",
        seasons: 5,
        image: "images/adriana.jpeg",
        status: "Deceased (FBI Informant)",
        quote: "My name is Adriana La Cerva, and I'm the manager of the Crazy Horse.",
        bio: "Christopher's tragic fiancée caught in the crosshairs of federal investigation and mob brutality.",
        skills: { strength: 3, intelligence: 6, leadership: 4, loyalty: 9 },
        isLeadCharacter: false,
        isCustom: false
    },
    {
        id: "furio-giunta",
        name: "Furio Giunta",
        role: "Enforcer / Made Man",
        family: "DiMeo Family (Naples)",
        seasons: 4,
        image: "images/furio.jpeg",
        status: "Fled to Italy",
        quote: "Stupida fcking game.",
        bio: "A stoic, fearless enforcer imported directly from Naples who proved to be one of Tony's most lethal soldiers.",
        skills: { strength: 10, intelligence: 6, leadership: 6, loyalty: 9 },
        isLeadCharacter: false,
        isCustom: false
    },
    {
        id: "ralph-cifaretto",
        name: "Ralph Cifaretto",
        role: "Capo",
        family: "DiMeo Family",
        seasons: 3,
        image: "images/ralph.webp",
        status: "Deceased",
        quote: "Tomorrow I can be on time, but you'll be stupid forever.",
        bio: "Brilliant, sadistic, and a massive earner for the family, Ralphie's volatile nature alienated almost everyone.",
        skills: { strength: 7, intelligence: 9, leadership: 7, loyalty: 4 },
        isLeadCharacter: false,
        isCustom: false
    },
    {
        id: "salvatore-bonpensiero",
        name: "Sal 'Big Pussy' Bonpensiero",
        role: "Soldier / Informant",
        family: "DiMeo Family",
        seasons: 3,
        image: "images/Pus.jpeg",
        status: "Deceased",
        quote: "Anyway, I'm glad we're all together. Ain't it good to be home?",
        bio: "Tony's lifelong friend and trusted soldier whose secret cooperation with the FBI broke Tony's heart.",
        skills: { strength: 8, intelligence: 7, leadership: 6, loyalty: 3 },
        isLeadCharacter: false,
        isCustom: false
    },
    {
        id: "johnny-sack",
        name: "Johnny Sack (Sacrimoni)",
        role: "New York Underboss",
        family: "Lupertazzi Crime Family",
        seasons: 6,
        image: "images/Sack.jpeg",
        status: "Deceased",
        quote: "What is this, the UN now?",
        bio: "The polished, calculating underboss of the New York family who clashed with Tony over turf and respect.",
        skills: { strength: 5, intelligence: 10, leadership: 9, loyalty: 8 },
        isLeadCharacter: false,
        isCustom: false
    },
    {
        id: "meadow-soprano",
        name: "Meadow Soprano",
        role: "Supporting Character",
        family: "Soprano Family",
        seasons: 6,
        image: "images/meadow.jpeg",
        status: "Active",
        quote: "You guys, you act like butter wouldn't melt in your mouths.",
        bio: "Tony and Carmela's intelligent eldest daughter whose path evolves from Columbia pre-law toward criminal defense.",
        skills: { strength: 4, intelligence: 9, leadership: 6, loyalty: 8 },
        isLeadCharacter: false,
        isCustom: false
    },
    {
        id: "jennifer-melfi",
        name: "Dr. Jennifer Melfi",
        role: "Supporting Character",
        family: "Medical / Therapy",
        seasons: 6,
        image: "images/melfi.jpeg",
        status: "Active",
        quote: "What are your symptoms, Anthony?",
        bio: "Tony's psychiatrist who maintains a fragile professional boundary while treating his panic disorder.",
        skills: { strength: 2, intelligence: 10, leadership: 5, loyalty: 9 },
        isLeadCharacter: false,
        isCustom: false
    }
];

let allCharacters = [...defaultCharacters];
let favorites = JSON.parse(localStorage.getItem("sopranosFavorites")) || [];

function getStoredCustomCharacters() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function loadCharacters() {
    const custom = getStoredCustomCharacters();
    allCharacters = [...defaultCharacters, ...custom];
}

const searchInput = document.getElementById("character-search");
const filterSelect = document.getElementById("character-filter");
const characterList = document.getElementById("character-list");
const noResults = document.getElementById("no-results");
const resetCustomBtn = document.getElementById("reset-custom-btn");
const databaseMessage = document.getElementById("database-message");

const totalCharactersEl = document.getElementById("total-characters");
const leadCharactersEl = document.getElementById("lead-characters");
const averageSeasonsEl = document.getElementById("average-seasons");
const favoriteCountEl = document.getElementById("favorite-count");

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

function updateStatistics() {
    totalCharactersEl.textContent = allCharacters.length;
    const leads = allCharacters.filter(c => c.isLeadCharacter).length;
    leadCharactersEl.textContent = leads;

    const totalSeasons = allCharacters.reduce((acc, c) => acc + (Number(c.seasons) || 1), 0);
    const avg = allCharacters.length ? (totalSeasons / allCharacters.length).toFixed(1) : 0;
    averageSeasonsEl.textContent = avg;

    favoriteCountEl.textContent = `${favorites.length} / 3`;
}

function renderCharacters() {
    loadCharacters();
    updateStatistics();

    const query = (searchInput?.value || "").toLowerCase().trim();
    const filter = filterSelect?.value || "all";

    const filtered = allCharacters.filter(character => {
        const matchesQuery = 
            character.name.toLowerCase().includes(query) ||
            character.role.toLowerCase().includes(query) ||
            character.family.toLowerCase().includes(query);

        if (!matchesQuery) return false;

if (filter === "lead") return character.isLeadCharacter && !character.isCustom;
        if (filter === "supporting") return !character.isLeadCharacter && !character.isCustom;
        if (filter === "custom") return character.isCustom;
        return true;
    });

    characterList.replaceChildren();

    if (filtered.length === 0) {
        noResults.hidden = false;
        return;
    }
    noResults.hidden = true;

    filtered.forEach(character => {
        const card = document.createElement("article");
        card.className = "character-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View dossier for ${character.name}`);

        const isFav = favorites.includes(character.id);

        card.innerHTML = `
            <div class="archive-card-header">
                <img src="${character.image}" alt="${character.name}" class="archive-avatar">
                <div>
                    <span class="character-role">${character.role}</span>
                </div>
            </div>
            <h3 class="character-name">${character.name}</h3>
            <p class="character-detail"><strong>Family:</strong> ${character.family}</p>
            <p class="character-detail"><strong>Seasons:</strong> ${character.seasons}</p>
            <p class="card-hint">Click to view dossier</p>
            <button type="button" class="favorite-button btn btn-sm ${isFav ? 'is-favorite' : 'btn-outline-light'}" data-id="${character.id}">
                ${isFav ? '★ Pinned to Favorites' : '☆ Pin to Favorites'}
            </button>
        `;

        card.addEventListener("click", (e) => {
            if (e.target.closest(".favorite-button")) return;
            openDossier(character);
        });

        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDossier(character);
            }
        });

        const favBtn = card.querySelector(".favorite-button");
        favBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFavorite(character.id);
        });

        characterList.appendChild(card);
    });
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
        databaseMessage.textContent = "Character removed from favorites.";
    } else {
        if (favorites.length >= 3) {
            databaseMessage.textContent = "Maximum 3 favorites allowed.";
            return;
        }
        favorites.push(id);
        databaseMessage.textContent = "Character pinned to favorites!";
    }
    localStorage.setItem("sopranosFavorites", JSON.stringify(favorites));
    renderCharacters();
}

function openDossier(character) {
    dossierAvatar.src = character.image;
    dossierAvatar.hidden = false;
    dossierRole.textContent = character.role;
    dossierName.textContent = character.name;
    dossierFamily.textContent = character.family;
    dossierStatus.textContent = character.status || "Active";
    dossierSeasons.textContent = `${character.seasons} season(s)`;
    dossierBio.textContent = character.bio || "No additional records available in the archive.";
    
    if (character.quote) {
        dossierQuote.textContent = `"${character.quote}"`;
        dossierQuote.hidden = false;
    } else {
        dossierQuote.hidden = true;
    }

    if (character.skills) {
        dossierSkills.innerHTML = `
            <div>Strength: <strong>${character.skills.strength}/10</strong></div>
            <div>Intelligence: <strong>${character.skills.intelligence}/10</strong></div>
            <div>Leadership: <strong>${character.skills.leadership}/10</strong></div>
            <div>Loyalty: <strong>${character.skills.loyalty}/10</strong></div>
        `;
        dossierSkills.hidden = false;
    } else {
        dossierSkills.hidden = true;
    }

    dossierModal.hidden = false;
}

function closeDossier() {
    dossierModal.hidden = true;
}

dossierClose.addEventListener("click", closeDossier);
dossierModal.addEventListener("click", (e) => {
    if (e.target === dossierModal) closeDossier();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dossierModal.hidden) closeDossier();
});

searchInput.addEventListener("input", renderCharacters);
filterSelect.addEventListener("change", renderCharacters);

resetCustomBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    databaseMessage.textContent = "Custom created characters cleared from archive.";
    renderCharacters();
});

renderCharacters();