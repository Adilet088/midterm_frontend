"use strict";

const TOTAL_SKILL_POINTS = 20;
const STORAGE_KEY = "sopranosCustomCharacters";

const TAKEN_NAMES = [
    "Tony Soprano", "Carmela Soprano", "Christopher Moltisanti",
    "Paulie Gualtieri", "Silvio Dante", "Junior Soprano",
    "Meadow Soprano", "Anthony Soprano", "Adriana La Cerva", "Jennifer Melfi"
];

const CLASS_REQUIREMENTS = {
    boss: { skill: "leadership", minimum: 5 },
    underboss: { skill: "intelligence", minimum: 5 },
    enforcer: { skill: "strength", minimum: 5 },
    consigliere: { skill: "loyalty", minimum: 5 }
};

const COLOR_NAMES = { crimson: "Crimson", gold: "Gold", black: "Black", ivory: "Ivory" };

const CREST_PALETTES = {
    crimson: { bg: "#2b0d11", accent: "#e03c49", tie: "#c9202e", ring: "#e03c49" },
    gold: { bg: "#261f0d", accent: "#e8b447", tie: "#c9962c", ring: "#e8b447" },
    ivory: { bg: "#24221d", accent: "#dfd6c5", tie: "#b5aa96", ring: "#dfd6c5" },
    black: { bg: "#141418", accent: "#a82430", tie: "#8b1c26", ring: "#c79a3b" }
};

const CLASS_EMBLEMS = {
    boss: '<path d="M84 26 L90 16 L96 23 L102 16 L108 26 Z" fill="__ACCENT__"/>',
    underboss: '<polygon points="96,14 99,21 107,21 101,26 103,33 96,29 89,33 91,26 85,21 93,21" fill="__ACCENT__"/>',
    enforcer: '<path d="M96 15 L106 19 L106 27 C106 32 96 36 96 36 C96 36 86 32 86 27 L86 19 Z" fill="__ACCENT__"/>',
    consigliere: '<circle cx="96" cy="25" r="9" fill="none" stroke="__ACCENT__" stroke-width="2.5"/><circle cx="96" cy="25" r="3" fill="__ACCENT__"/>'
};

function buildSilhouetteDataUri(selectedClass, selectedColor) {
    const palette = CREST_PALETTES[selectedColor] || CREST_PALETTES.black;
    const emblemRaw = CLASS_EMBLEMS[selectedClass] || "";
    const emblem = emblemRaw.replaceAll("__ACCENT__", palette.accent);

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" fill="${palette.bg}"/>
  <circle cx="60" cy="60" r="56" fill="none" stroke="${palette.ring}" stroke-width="2" stroke-opacity="0.45"/>
  <path d="M18 118 C21 91 38 82 60 82 C82 82 99 91 102 118 Z" fill="#0b0b0d"/>
  <polygon points="50,82 60,103 70,82" fill="#e6e1d6"/>
  <polygon points="57,84 63,84 65,112 60,118 55,112" fill="${palette.tie}"/>
  <rect x="53" y="68" width="14" height="16" rx="4" fill="#1d1d22"/>
  <path d="M44 48 C44 37 76 37 76 48 C76 62 69 72 60 72 C51 72 44 62 44 48 Z" fill="#18181d"/>
  <ellipse cx="60" cy="43" rx="34" ry="6" fill="#09090b"/>
  <path d="M39 42 C41 25 49 21 60 22 C71 21 79 25 81 42 Z" fill="#0f0f12"/>
  <rect x="40" y="37" width="40" height="4" rx="1.5" fill="${palette.accent}"/>
  ${emblem}
</svg>`.trim();

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

const form = document.getElementById("character-form");
const nameInput = document.getElementById("character-name");
const classInput = document.getElementById("character-class");
const colorInput = document.getElementById("character-color");
const imageInput = document.getElementById("character-image");
const quoteInput = document.getElementById("character-quote");
const fileCustomLabel = document.getElementById("file-custom-label");

const skillInputs = {
    strength: document.getElementById("strength"),
    intelligence: document.getElementById("intelligence"),
    leadership: document.getElementById("leadership"),
    loyalty: document.getElementById("loyalty")
};

const pointsUsedElement = document.getElementById("points-used");
const pointsRemainingElement = document.getElementById("points-remaining");
const skillPointsError = document.getElementById("skill-points-error");

const previewAvatar = document.getElementById("preview-avatar");
const previewName = document.getElementById("preview-name");
const previewClass = document.getElementById("preview-class");
const previewColor = document.getElementById("preview-color");
const previewTotal = document.getElementById("preview-total");

const previewStrength = document.getElementById("preview-strength");
const previewIntelligence = document.getElementById("preview-intelligence");
const previewLeadership = document.getElementById("preview-leadership");
const previewLoyalty = document.getElementById("preview-loyalty");

const barStrength = document.getElementById("bar-strength");
const barIntelligence = document.getElementById("bar-intelligence");
const barLeadership = document.getElementById("bar-leadership");
const barLoyalty = document.getElementById("bar-loyalty");

const characterPreview = document.getElementById("character-preview");
const creationResult = document.getElementById("creation-result");

let uploadedImageBase64 = "";

imageInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        if (fileCustomLabel) {
            fileCustomLabel.textContent = "✔ Selected: " + file.name;
            fileCustomLabel.style.borderColor = "#57bd87";
            fileCustomLabel.style.color = "#80e2ac";
        }
        const reader = new FileReader();
        reader.onload = function(uploadEvent) {
            uploadedImageBase64 = uploadEvent.target.result;
            previewAvatar.src = uploadedImageBase64;
        };
        reader.readAsDataURL(file);
    } else {
        uploadedImageBase64 = "";
        if (fileCustomLabel) {
            fileCustomLabel.textContent = "📁 Choose image from device...";
            fileCustomLabel.style.borderColor = "";
            fileCustomLabel.style.color = "";
        }
        updatePreview();
    }
});

function getSkillTotal() {
    return Object.values(skillInputs).reduce((total, input) => total + Number(input.value || 0), 0);
}

function getSkillValues() {
    return {
        strength: Number(skillInputs.strength.value || 0),
        intelligence: Number(skillInputs.intelligence.value || 0),
        leadership: Number(skillInputs.leadership.value || 0),
        loyalty: Number(skillInputs.loyalty.value || 0)
    };
}

function updatePreview() {
    const name = nameInput.value.trim();
    const selectedClass = classInput.value;
    const selectedColor = colorInput.value;
    const skills = getSkillValues();
    const total = getSkillTotal();

    pointsUsedElement.textContent = `${total} / ${TOTAL_SKILL_POINTS}`;
    pointsRemainingElement.textContent = TOTAL_SKILL_POINTS - total;

    if (!uploadedImageBase64) {
        previewAvatar.src = buildSilhouetteDataUri(selectedClass, selectedColor);
    }

    previewName.textContent = name || "Your Character";
    previewClass.textContent = selectedClass ? selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1) : "Not selected";
    previewColor.textContent = selectedColor ? COLOR_NAMES[selectedColor] || selectedColor : "Not selected";
    previewTotal.textContent = `${total} / ${TOTAL_SKILL_POINTS}`;

    previewStrength.textContent = skills.strength;
    previewIntelligence.textContent = skills.intelligence;
    previewLeadership.textContent = skills.leadership;
    previewLoyalty.textContent = skills.loyalty;

    if (barStrength) barStrength.style.width = `${Math.min(100, skills.strength * 10)}%`;
    if (barIntelligence) barIntelligence.style.width = `${Math.min(100, skills.intelligence * 10)}%`;
    if (barLeadership) barLeadership.style.width = `${Math.min(100, skills.leadership * 10)}%`;
    if (barLoyalty) barLoyalty.style.width = `${Math.min(100, skills.loyalty * 10)}%`;
}

document.querySelectorAll("#character-form input, #character-form select").forEach(el => {
    if (el !== imageInput) {
        el.addEventListener("input", updatePreview);
        el.addEventListener("change", updatePreview);
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const total = getSkillTotal();
    if (total !== TOTAL_SKILL_POINTS) {
        alert(`You must allocate exactly ${TOTAL_SKILL_POINTS} skill points (currently ${total}).`);
        return;
    }

    const roleTitle = classInput.value ? classInput.value.charAt(0).toUpperCase() + classInput.value.slice(1) : "Associate";
    const colorTitle = COLOR_NAMES[colorInput.value] || "Black";
    const avatarImg = uploadedImageBase64 || buildSilhouetteDataUri(classInput.value, colorInput.value);

    const newCharacter = {
        id: "custom-" + Date.now(),
        name: nameInput.value.trim(),
        role: roleTitle,
        family: "DiMeo / Custom",
        seasons: 1,
        image: avatarImg,
        status: `Active ${roleTitle} (${colorTitle} Crest)`,
        quote: quoteInput.value.trim() || "Loyalty and respect keep the family running.",
        bio: `Custom ${roleTitle} created in the Family Workshop with ${TOTAL_SKILL_POINTS} allocated skill points.`,
        skills: getSkillValues(),
        isLeadCharacter: classInput.value === "boss" || classInput.value === "underboss",
        isCustom: true
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const customChars = stored ? JSON.parse(stored) : [];
    customChars.push(newCharacter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customChars));

    creationResult.innerHTML = `
        <div class="result-character-card">
            <h3>✔ ${newCharacter.name} Added to Archive</h3>
            <p>Class: ${roleTitle} • Crest: ${colorTitle}</p>
            <a href="family-database.html" class="result-archive-link">View in DiMeo Family Archive →</a>
        </div>
    `;
    creationResult.hidden = false;
    form.reset();
    uploadedImageBase64 = "";
    if (fileCustomLabel) {
        fileCustomLabel.textContent = "📁 Choose image from device...";
        fileCustomLabel.style.borderColor = "";
        fileCustomLabel.style.color = "";
    }
    updatePreview();
});

updatePreview();